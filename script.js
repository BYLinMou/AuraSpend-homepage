// ===========================
// Picture-in-Picture for Hero Video & Auto Unmute
// ===========================
const heroVideoContainer = document.querySelector('#hero-video-container');
const pipCloseButton = document.querySelector('.pip-close');
const heroYtIframe = document.querySelector('#hero-yt');

/*
// Auto unmute on first user interaction
//
// NOTE: Disabled per UX request — this feature caused the video to become audible on *any*
// user gesture (click/keydown/touch/pointer). Keeping the code here commented-out so it
// can be restored or feature-flagged later if needed.
//
// To re-enable: remove the surrounding comment block and ensure you handle browser
// autoplay policies and provide an explicit opt-in (recommended: only unmute on an
// explicit "Unmute" button click).

let hasUnmuted = false;

const removeAutoUnmuteListeners = () => {
    ['click', 'keydown', 'touchend', 'pointerdown'].forEach(evt =>
        document.removeEventListener(evt, autoUnmute)
    );
};

const autoUnmute = (evt) => {
    if (hasUnmuted) return;

    // Try using global ytPlayer object first (best method)
    if (window.ytPlayer && typeof window.ytPlayer.unMute === 'function') {
        try {
            window.ytPlayer.unMute();
            // Try to start playback; we only mark success if player actually transitions to PLAYING
            if (typeof window.ytPlayer.playVideo === 'function') {
                window.ytPlayer.playVideo();
                setTimeout(() => {
                    try {
                        if (window.ytPlayer.getPlayerState && window.ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                            hasUnmuted = true;
                            removeAutoUnmuteListeners();
                            updateHeroControls();
                        }
                    } catch (err) {}
                }, 250);
            }
        } catch (err) {}
    } 
    // Fallback to postMessage (if API not fully ready or variable not exposed)
    else if (heroYtIframe && heroYtIframe.contentWindow) {
        try {
            heroYtIframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            heroYtIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            // Can't reliably detect play state for cross-origin iframe via postMessage fallback,
            // so do NOT mark hasUnmuted here; keep listeners so a later interaction (e.g., click) can succeed.
        } catch (err) {}
    }
};

// Listen for user gestures that are more reliably considered "user interaction" by browsers.
// Exclude 'scroll' because passive scroll events often don't qualify for unmuting in some browsers.
// Do NOT use { once: true } — only remove listeners after we confirm playback starts.
['click', 'keydown', 'touchend', 'pointerdown'].forEach(evt =>
    document.addEventListener(evt, autoUnmute, { passive: true })
);
*/

// Picture-in-Picture functionality
if (heroVideoContainer && pipCloseButton) {
    let pipEnabled = true;

    // Observe the PARENT element (.hero-visual) instead of the video container itself
    // This prevents layout thrashing/infinite loops when the child becomes fixed
    const parentContainer = heroVideoContainer.parentElement;
    
    if (parentContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!pipEnabled) return;
                
                // When parent container is scrolled out of view (less than 10% visible)
                // We activate PiP mode on the child
                if (entry.intersectionRatio < 0.1 && !entry.isIntersecting) {
                    heroVideoContainer.classList.add('pip-mode');
                } 
                // When parent comes back into view (more than 10% visible)
                else if (entry.intersectionRatio > 0.1 && entry.isIntersecting) {
                    heroVideoContainer.classList.remove('pip-mode');
                }
            });
        }, {
            threshold: [0, 0.1, 0.2, 0.5, 1.0]
        });
        
        observer.observe(parentContainer);
    }
    
    // Close button functionality
    pipCloseButton.addEventListener('click', () => {
        heroVideoContainer.classList.remove('pip-mode');
        pipEnabled = false;
        
        // Re-enable PiP after 1.5 seconds
        setTimeout(() => {
            pipEnabled = true;
        }, 1500);
    });
}



// ===========================
// Navigation & Mobile Menu
// ===========================
const navbar = document.querySelector('.navbar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scrolling down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scrolling up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});


// ===========================
// 3D Screenshots Carousel (真正的無限循環)
// Features: 3s autoplay, pause-on-hover, 中間最大、兩側較小且模糊
// ===========================
const carouselEl = document.querySelector('.screenshots-carousel');
const screenshotsTrackEl = document.querySelector('.screenshots-track');
const prevButtonEl = document.querySelector('.carousel-button.prev');
const nextButtonEl = document.querySelector('.carousel-button.next');

function initCarousel() {
    if (!carouselEl || !screenshotsTrackEl || !prevButtonEl || !nextButtonEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interval = parseInt(carouselEl.dataset.interval ?? '3000', 10) || 3000;
    const autoplayAttr = String(carouselEl.dataset.autoplay ?? 'true');
    const autoplay = autoplayAttr === 'force' || (autoplayAttr === 'true' && !prefersReducedMotion);

    let slides = Array.from(screenshotsTrackEl.querySelectorAll('.screenshot-item'));
    if (!slides.length) return;

    let currentIndex = 0;
    let isAnimating = false;
    let autoplayTimer = null;

    // Create pagination dots
    const dotsEl = carouselEl.querySelector('.carousel-dots');
    const announcer = carouselEl.querySelector('.carousel-announcer');
    const slideCount = slides.length;

    const createDots = () => {
        if (!dotsEl) return;
        dotsEl.innerHTML = '';
        for (let i = 0; i < slideCount; i++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.setAttribute('aria-label', `顯示第 ${i + 1} 張`);
            btn.setAttribute('role', 'tab');
            btn.dataset.index = i;
            if (i === 0) btn.setAttribute('aria-selected', 'true');
            dotsEl.appendChild(btn);
            btn.addEventListener('click', () => goTo(i));
        }
    };

    // 更新卡片位置和樣式
    const updateSlides = () => {
        slides.forEach((slide, index) => {
            // 移除所有狀態類
            slide.classList.remove('active', 'prev', 'next', 'hidden');

            // 計算相對位置
            let diff = index - currentIndex;

            // 處理循環（例如：從最後一張到第一張）
            if (diff > slideCount / 2) diff -= slideCount;
            if (diff < -slideCount / 2) diff += slideCount;

            // 添加對應的類
            if (diff === 0) {
                slide.classList.add('active');
            } else if (diff === -1) {
                slide.classList.add('prev');
            } else if (diff === 1) {
                slide.classList.add('next');
            } else {
                slide.classList.add('hidden');
            }
        });
    };

    const updateUI = () => {
        // 更新點點
        const dots = Array.from(dotsEl?.children || []);
        dots.forEach((d, i) => {
            d.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
        });

        // 更新螢幕閱讀器提示
        if (announcer) {
            announcer.textContent = `第 ${currentIndex + 1} 張，共 ${slideCount} 張`;
        }
    };

    // 確保可見圖片已加載
    const ensureVisibleImages = () => {
        // 加載當前和相鄰的圖片
        [-1, 0, 1].forEach(offset => {
            let index = (currentIndex + offset + slideCount) % slideCount;
            const slide = slides[index];
            if (!slide) return;
            const img = slide.querySelector('img[loading="lazy"][data-src]');
            if (img && img.dataset.src && img.src !== img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    };

    const goTo = (targetIndex) => {
        if (isAnimating) return;

        // 正規化索引
        targetIndex = (targetIndex + slideCount) % slideCount;

        if (targetIndex === currentIndex) return;

        isAnimating = true;
        currentIndex = targetIndex;

        ensureVisibleImages();
        updateSlides();
        updateUI();

        // 等待動畫完成
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    };

    const next = () => {
        goTo(currentIndex + 1);
    };

    const prev = () => {
        goTo(currentIndex - 1);
    };

    // Autoplay
    const startAutoplay = () => {
        if (!autoplay || autoplayTimer) return;
        autoplayTimer = setInterval(next, interval);
    };

    const stopAutoplay = () => {
        if (!autoplayTimer) return;
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    };

    // 觸控/滑動支援
    let touchStart = { x: 0, y: 0 };
    let touchEnd = { x: 0, y: 0 };

    const handleTouchStart = (e) => {
        touchStart.x = e.touches[0].clientX;
        touchStart.y = e.touches[0].clientY;
        stopAutoplay();
    };

    const handleTouchMove = (e) => {
        touchEnd.x = e.touches[0].clientX;
        touchEnd.y = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
        const diffX = touchStart.x - touchEnd.x;
        const diffY = touchStart.y - touchEnd.y;

        // 只在水平滑動明顯時觸發
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                next();
            } else {
                prev();
            }
        }

        startAutoplay();
    };

    // Keyboard navigation
    const handleKeydown = (e) => {
        if (e.key === 'ArrowLeft') {
            prev();
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            next();
            e.preventDefault();
        }
    };

    // 點擊側邊卡片也可以切換
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (index !== currentIndex) {
                goTo(index);
            }
        });
    });

    // Event listeners
    prevButtonEl.addEventListener('click', (e) => {
        e.stopPropagation();
        prev();
        stopAutoplay();
        startAutoplay();
    });

    nextButtonEl.addEventListener('click', (e) => {
        e.stopPropagation();
        next();
        stopAutoplay();
        startAutoplay();
    });

    // Pause on hover/focus
    carouselEl.addEventListener('mouseenter', stopAutoplay);
    carouselEl.addEventListener('mouseleave', startAutoplay);
    carouselEl.addEventListener('focusin', stopAutoplay);
    carouselEl.addEventListener('focusout', startAutoplay);

    // Touch events
    screenshotsTrackEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    screenshotsTrackEl.addEventListener('touchmove', handleTouchMove, { passive: true });
    screenshotsTrackEl.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Keyboard
    carouselEl.addEventListener('keydown', handleKeydown);

    // Init
    createDots();
    ensureVisibleImages();
    updateSlides();
    updateUI();

    if (autoplay) {
        startAutoplay();
    }

    console.debug('✅ 3D Carousel initialized with', slideCount, 'slides');
}

// Initialize the carousel
initCarousel();


// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.feature-card, .step, .screenshot-item, .roadmap-item, .highlight-card'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .navbar.scroll-down {
        transform: translateY(-100%);
    }
    
    .navbar.scroll-up {
        transform: translateY(0);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// ===========================
// Language Switcher
// ===========================
const langButtons = document.querySelectorAll('.lang-switch');

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Here you would typically load different language content
        // For now, just show an alert
        const lang = button.textContent.includes('English') ? 'en' : 'zh-TW';
        console.log(`Language switched to: ${lang}`);
        // TODO: Implement actual language switching logic
    });
});

// ===========================
// Form Handling (Beta Sign-up)
// ===========================
// If you add a beta sign-up form later, you can handle it here
const betaForm = document.querySelector('.beta-form');

if (betaForm) {
    betaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = betaForm.querySelector('input[type="email"]').value;
        
        // TODO: Send to backend
        console.log('Beta sign-up:', email);
        
        // Show success message
        alert('感謝您的註冊！我們會盡快與您聯繫。');
        betaForm.reset();
    });
}

// ===========================
// Download Button Analytics
// ===========================
const downloadButtons = document.querySelectorAll('.download-btn, .store-badge');

downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const platform = button.alt || button.querySelector('img')?.alt || 'unknown';
        console.log(`Download clicked: ${platform}`);
        
        // TODO: Send analytics event
        // Example: gtag('event', 'download_click', { platform });
    });
});

// ===========================
// Performance: Lazy Loading Images
// ===========================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===========================
// Initialize
// ===========================
console.log('AuraSpend website initialized');
console.log('Version: 1.0.0');

// YouTube player + controls
let ytPlayer = null;
function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
        onYouTubeIframeAPIReady();
        return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
}

window.onYouTubeIframeAPIReady = function () {
    const el = document.getElementById('hero-yt');
    if (!el) return;
    ytPlayer = new YT.Player('hero-yt', {
        events: {
            'onReady': (e) => {
                // Try to play immediately (muted) to ensure autoplay works
                try { 
                    e.target.mute(); 
                    e.target.playVideo();
                } catch (err) {}
                updateHeroControls();
            },
            'onStateChange': () => updateHeroControls()
        }
    });
};

function updateHeroControls() {
    const playBtn = document.querySelector('.hero-play');
    const muteBtn = document.querySelector('.hero-mute');
    if (!ytPlayer || !window.YT || !playBtn || !muteBtn) return;
    try {
        const state = ytPlayer.getPlayerState();
        playBtn.textContent = (state === YT.PlayerState.PLAYING) ? '⏸' : '▶';
        muteBtn.textContent = (ytPlayer.isMuted()) ? '🔈' : '🔊';
    } catch (err) {}
}

// Wire buttons (DOM ready)
document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.querySelector('.hero-play');
    const muteBtn = document.querySelector('.hero-mute');

    if (playBtn) playBtn.addEventListener('click', () => {
        if (!ytPlayer) return;
        try {
            const state = ytPlayer.getPlayerState();
            if (state === YT.PlayerState.PLAYING) ytPlayer.pauseVideo(); else ytPlayer.playVideo();
            updateHeroControls();
        } catch (err) {}
    });

    if (muteBtn) muteBtn.addEventListener('click', () => {
        if (!ytPlayer) return;
        try {
            if (ytPlayer.isMuted()) { ytPlayer.unMute(); ytPlayer.playVideo(); } else { ytPlayer.mute(); }
            updateHeroControls();
        } catch (err) {}
    });

    loadYouTubeAPI();
});

// Add loading animation removal
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

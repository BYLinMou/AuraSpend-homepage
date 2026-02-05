// ===========================
// Language Switcher
// ===========================

// Get current language from localStorage or default to zh-TW
function getCurrentLanguage() {
    return localStorage.getItem('auraspend-lang') || 'zh-TW';
}

// Set current language
function setCurrentLanguage(lang) {
    localStorage.setItem('auraspend-lang', lang);
}

// Get current year for dynamic replacement
function getCurrentYear() {
    return new Date().getFullYear();
}

// Update page content based on language
function updatePageLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language '${lang}' not found in translations`);
        return;
    }

    // Get current year for dynamic replacement
    const currentYear = getCurrentYear();

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaTitle = document.querySelector('title');
    
    if (metaDescription && translations[lang]['meta.description']) {
        metaDescription.setAttribute('content', translations[lang]['meta.description']);
    }
    if (metaTitle && translations[lang]['meta.title']) {
        metaTitle.textContent = translations[lang]['meta.title'];
    }

    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            let text = translations[lang][key];
            // Replace {year} placeholder with current year
            text = text.replace('{year}', currentYear);
            
            // Check if the element has HTML content (like <span> tags)
            if (text.includes('<')) {
                element.innerHTML = text;
            } else {
                // Check if element has HTML children (like <b>, <span>, etc.)
                // If yes, preserve the HTML structure and only update text nodes
                if (element.children.length > 0) {
                    // Element has HTML children - preserve structure
                    // Find all text nodes and update them
                    const textNodes = [];
                    const walker = document.createTreeWalker(
                        element,
                        NodeFilter.SHOW_TEXT,
                        null,
                        false
                    );
                    
                    let node;
                    while (node = walker.nextNode()) {
                        if (node.textContent.trim()) {
                            textNodes.push(node);
                        }
                    }
                    
                    // Update the first text node with the translation
                    if (textNodes.length > 0) {
                        textNodes[0].textContent = text;
                    }
                } else {
                    // No HTML children - use textContent
                    element.textContent = text;
                }
            }
        }
    });

    // Update aria-label for PiP close button
    const pipCloseButton = document.querySelector('.pip-close');
    if (pipCloseButton && translations[lang]['hero.pip-close']) {
        pipCloseButton.setAttribute('aria-label', translations[lang]['hero.pip-close']);
    }

    // Update carousel announcer text
    const announcer = document.querySelector('.carousel-announcer');
    if (announcer) {
        const currentSlide = document.querySelector('.screenshot-item.active');
        const slideCount = document.querySelectorAll('.screenshot-item').length;
        if (currentSlide) {
            const currentIndex = Array.from(document.querySelectorAll('.screenshot-item')).indexOf(currentSlide) + 1;
            announcer.textContent = translations[lang]['screenshots.announcer']
                .replace('{current}', currentIndex)
                .replace('{total}', slideCount);
        }
    }

    // Update carousel dots aria-label
    const dots = document.querySelectorAll('.carousel-dots button');
    dots.forEach((dot, index) => {
        dot.setAttribute('aria-label', translations[lang]['screenshots.show-slide'].replace('{index}', index + 1));
    });

    // Update lang buttons active state
    const langButtons = document.querySelectorAll('.lang-switch');
    langButtons.forEach(btn => {
        const btnLang = btn.getAttribute('data-lang');
        if (btnLang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Initialize language on page load
function initLanguage() {
    const currentLang = getCurrentLanguage();
    updatePageLanguage(currentLang);
    
    // Language switcher event listeners
    const langButtons = document.querySelectorAll('.lang-switch');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setCurrentLanguage(lang);
            updatePageLanguage(lang);
        });
    });
}

// Initialize language on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}

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
    // 強制啟用自動播放，忽略 prefers-reduced-motion
    const autoplay = true;

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
        const currentLang = getCurrentLanguage();
        for (let i = 0; i < slideCount; i++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.setAttribute('aria-label', translations[currentLang]['screenshots.show-slide'].replace('{index}', i + 1));
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
            const currentLang = getCurrentLanguage();
            announcer.textContent = translations[currentLang]['screenshots.announcer']
                .replace('{current}', currentIndex + 1)
                .replace('{total}', slideCount);
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
        if (!autoplay || autoplayTimer) {
            return;
        }
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

    // Touch events
    carouselEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    carouselEl.addEventListener('touchmove', handleTouchMove, { passive: true });
    carouselEl.addEventListener('touchend', handleTouchEnd);

    // Keyboard events
    carouselEl.addEventListener('keydown', handleKeydown);

    // Pause on hover
    carouselEl.addEventListener('mouseenter', stopAutoplay);
    carouselEl.addEventListener('mouseleave', startAutoplay);

    // Pause on focus
    carouselEl.addEventListener('focusin', stopAutoplay);
    carouselEl.addEventListener('focusout', startAutoplay);

    // Initialize
    createDots();
    updateSlides();
    updateUI();
    ensureVisibleImages();
    startAutoplay();
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}


// ===========================
// Smooth Scroll for Navigation Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
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
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
    animationObserver.observe(el);
});


// ===========================
// Lazy Loading Images
// ===========================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                lazyImageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
    });
}


// ===========================
// Video Background Control
// ===========================
const videoBackground = document.querySelector('.video-background');
const videoToggle = document.querySelector('.video-toggle');

if (videoToggle && videoBackground) {
    videoToggle.addEventListener('click', () => {
        if (videoBackground.paused) {
            videoBackground.play();
            videoToggle.classList.remove('paused');
        } else {
            videoBackground.pause();
            videoToggle.classList.add('paused');
        }
    });
}


// ===========================
// Form Validation
// ===========================
const forms = document.querySelectorAll('form[data-validate]');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Remove error class on input
                field.addEventListener('input', () => {
                    field.classList.remove('error');
                }, { once: true });
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
});


// ===========================
// Copy to Clipboard
// ===========================
document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
        const textToCopy = button.getAttribute('data-copy');
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            button.classList.add('copied');
            
            setTimeout(() => {
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
});


// ===========================
// Modal/Dialog Management
// ===========================
const modals = document.querySelectorAll('[data-modal]');
const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
const modalCloses = document.querySelectorAll('[data-modal-close]');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal-trigger');
        const modal = document.querySelector(`[data-modal="${modalId}"]`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        const modal = close.closest('[data-modal]');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('[data-modal].active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});


// ===========================
// Tooltip Management
// ===========================
const tooltips = document.querySelectorAll('[data-tooltip]');

tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', () => {
        const tooltipText = tooltip.getAttribute('data-tooltip');
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip';
        tooltipEl.textContent = tooltipText;
        document.body.appendChild(tooltipEl);
        
        const rect = tooltip.getBoundingClientRect();
        tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 10}px`;
        tooltipEl.style.left = `${rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2)}px`;
        
        tooltip.addEventListener('mouseleave', () => {
            tooltipEl.remove();
        }, { once: true });
    });
});


// ===========================
// Accordion/Collapse
// ===========================
const accordions = document.querySelectorAll('[data-accordion]');

accordions.forEach(accordion => {
    const trigger = accordion.querySelector('[data-accordion-trigger]');
    const content = accordion.querySelector('[data-accordion-content]');
    
    if (trigger && content) {
        trigger.addEventListener('click', () => {
            const isOpen = accordion.classList.contains('active');
            
            // Close all other accordions in the same group
            const group = accordion.closest('[data-accordion-group]');
            if (group) {
                group.querySelectorAll('[data-accordion].active').forEach(other => {
                    if (other !== accordion) {
                        other.classList.remove('active');
                        const otherContent = other.querySelector('[data-accordion-content]');
                        if (otherContent) {
                            otherContent.style.maxHeight = '';
                        }
                    }
                });
            }
            
            // Toggle current accordion
            accordion.classList.toggle('active');
            
            if (!isOpen) {
                content.style.maxHeight = `${content.scrollHeight}px`;
            } else {
                content.style.maxHeight = '';
            }
        });
    }
});


// ===========================
// Tab System
// ===========================
const tabGroups = document.querySelectorAll('[data-tab-group]');

tabGroups.forEach(group => {
    const tabs = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-tab-panel]');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Update tab states
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update panel visibility
            panels.forEach(panel => {
                const panelId = panel.getAttribute('data-tab-panel');
                if (panelId === tabId) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
});


// ===========================
// Progress Bar Animation
// ===========================
const progressBars = document.querySelectorAll('[data-progress]');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const target = parseInt(progressBar.getAttribute('data-progress'), 10);
            
            progressBar.style.width = `${target}%`;
            progressObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    bar.style.width = '0%';
    progressObserver.observe(bar);
});


// ===========================
// Counter Animation
// ===========================
const counters = document.querySelectorAll('[data-counter]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-counter'), 10);
            const duration = parseInt(counter.getAttribute('data-counter-duration') || '2000', 10);
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);
                
                counter.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});


// ===========================
// Scroll Progress Indicator
// ===========================
const scrollProgress = document.querySelector('[data-scroll-progress]');

if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = `${progress}%`;
    });
}


// ===========================
// Back to Top Button
// ===========================
const backToTop = document.querySelector('[data-back-to-top]');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ===========================
// Reading Progress
// ===========================
const readingProgress = document.querySelector('[data-reading-progress]');
const article = document.querySelector('article');

if (readingProgress && article) {
    window.addEventListener('scroll', () => {
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        const progress = ((scrollTop - articleTop + windowHeight) / articleHeight) * 100;
        const clampedProgress = Math.max(0, Math.min(100, progress));
        
        readingProgress.style.width = `${clampedProgress}%`;
    });
}


// ===========================
// Theme Toggle
// ===========================
const themeToggle = document.querySelector('[data-theme-toggle]');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function getTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
}

// Initialize theme
setTheme(getTheme());

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});


// ===========================
// Print Handler
// ===========================
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});


// ===========================
// Performance Monitoring
// ===========================
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log(`LCP: ${entry.startTime}ms`);
            } else if (entry.entryType === 'first-input') {
                console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
            }
        });
    });
    
    perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
}


// ===========================
// Service Worker Registration
// ===========================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}


// ===========================
// Error Handling
// ===========================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});


// ===========================
// Console Welcome Message
// ===========================
console.log('%c🎉 Welcome to AuraSpend!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ for smart expense tracking', 'color: #8b5cf6; font-size: 14px;');

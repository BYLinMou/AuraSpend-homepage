// ===========================
// Picture-in-Picture for Hero Video & Auto Unmute
// ===========================
const heroVideoContainer = document.querySelector('#hero-video-container');
const pipCloseButton = document.querySelector('.pip-close');
const heroYtIframe = document.querySelector('#hero-yt');

// Auto unmute on first user interaction
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
        
        // Re-enable PiP after 3 seconds
        setTimeout(() => {
            pipEnabled = true;
        }, 3000);
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
// Screenshots Carousel
// ===========================
const screenshotsTrack = document.querySelector('.screenshots-track');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

if (screenshotsTrack && prevButton && nextButton) {
    const scrollAmount = 320; // width of screenshot item + gap
    
    prevButton.addEventListener('click', () => {
        screenshotsTrack.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextButton.addEventListener('click', () => {
        screenshotsTrack.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Hide/show buttons based on scroll position
    const updateCarouselButtons = () => {
        const maxScroll = screenshotsTrack.scrollWidth - screenshotsTrack.clientWidth;
        
        if (screenshotsTrack.scrollLeft <= 0) {
            prevButton.style.opacity = '0.3';
            prevButton.style.pointerEvents = 'none';
        } else {
            prevButton.style.opacity = '1';
            prevButton.style.pointerEvents = 'auto';
        }
        
        if (screenshotsTrack.scrollLeft >= maxScroll - 10) {
            nextButton.style.opacity = '0.3';
            nextButton.style.pointerEvents = 'none';
        } else {
            nextButton.style.opacity = '1';
            nextButton.style.pointerEvents = 'auto';
        }
    };
    
    screenshotsTrack.addEventListener('scroll', updateCarouselButtons);
    updateCarouselButtons(); // Initial state
}

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

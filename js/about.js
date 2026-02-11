/* ===================================
   ABOUT PAGE JAVASCRIPT - REDESIGNED
   Capital Innovation Fund
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    initAboutPage();
});

function initAboutPage() {
    // Initialize parallax effect
    initParallaxScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Navigation scroll effects
    initNavigationScroll();
    
    // Smooth scroll
    addSmoothScroll();
    
    console.log('About page - Infrastructure Intelligence Platform initialized');
}

/* ==================================
   PARALLAX SCROLL EFFECT
   ================================== */
function initParallaxScroll() {
    const layerBack = document.querySelector('.layer-back');
    const layerMid = document.querySelector('.layer-mid');
    const layerFront = document.querySelector('.layer-front');
    
    if (!layerBack || !layerMid || !layerFront) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.about-hero').offsetHeight;
        
        if (scrolled <= heroHeight) {
            // Different parallax speeds for each layer
            layerBack.style.transform = `translateY(${scrolled * 0.5}px)`;
            layerMid.style.transform = `translateY(${scrolled * 0.3}px)`;
            layerFront.style.transform = `translateY(${scrolled * 0.15}px) scale(${1 + scrolled * 0.0001})`;
        }
    });
}

/* ==================================
   SCROLL ANIMATIONS
   ================================== */
function initScrollAnimations() {
    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for stagger effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Animate other elements on scroll
    const animateOnScroll = document.querySelectorAll(
        '.stat-item, .mission-card, .vision-card, .advantage-card, .case-card, .matter-item, .cta-option'
    );
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateOnScroll.forEach(element => {
        fadeInObserver.observe(element);
    });
}

/* ==================================
   NAVIGATION SCROLL EFFECTS
   ================================== */
function initNavigationScroll() {
    const nav = document.getElementById('mainNav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ==================================
   SMOOTH SCROLL
   ================================== */
function addSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ==================================
   UTILITY FUNCTIONS
   ================================== */

// Throttle function for scroll events
function throttle(func, wait) {
    let waiting = false;
    return function() {
        if (!waiting) {
            func.apply(this, arguments);
            waiting = true;
            setTimeout(() => {
                waiting = false;
            }, wait);
        }
    };
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ==================================
   INITIALIZE ON RESIZE
   ================================== */
window.addEventListener('resize', debounce(() => {
    // Recalculate any position-dependent elements
    console.log('Window resized - recalculating layouts');
}, 250));

/* ==================================
   ACCESSIBILITY ENHANCEMENTS
   ================================== */
function enhanceAccessibility() {
    // Add keyboard navigation for cards
    const interactiveCards = document.querySelectorAll(
        '.advantage-card, .case-card, .cta-option'
    );
    
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                card.click();
            }
        });
    });
}

// Uncomment to enable accessibility features
// enhanceAccessibility();
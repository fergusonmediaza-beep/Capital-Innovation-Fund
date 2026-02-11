/* ===================================
   SOLUTIONS PAGE JAVASCRIPT - CREATIVE NO-STATS REDESIGN
   Capital Innovation Fund
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    initSolutionsPage();
});

function initSolutionsPage() {
    // Initialize scroll indicator
    initScrollIndicator();
    
    // Initialize pipeline hover reveals
    initPipelineStages();
    
    // Initialize technology layers
    initTechLayers();
    
    // Initialize hexagon animations
    initHexagonGrid();
    
    // Initialize flip cards
    initFlipCards();
    
    // Navigation scroll effects
    initNavigationScroll();
    
    // Smooth scroll
    addSmoothScroll();
    
    console.log('Solutions page - Creative Platform Interface loaded');
}

/* ==================================
   SCROLL INDICATOR
   ================================== */
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const architectureSection = document.querySelector('.architecture-section');
            if (architectureSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = architectureSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

/* ==================================
   PIPELINE STAGES - HOVER REVEALS
   ================================== */
function initPipelineStages() {
    const stages = document.querySelectorAll('.pipeline-stage');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });
    
    stages.forEach(stage => {
        observer.observe(stage);
    });
}

/* ==================================
   TECHNOLOGY LAYERS - EXPAND/COLLAPSE
   ================================== */
function initTechLayers() {
    const toggleButtons = document.querySelectorAll('.layer-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const layer = button.closest('.tech-layer');
            
            // Close all other layers
            document.querySelectorAll('.tech-layer').forEach(otherLayer => {
                if (otherLayer !== layer) {
                    otherLayer.classList.remove('expanded');
                }
            });
            
            // Toggle current layer
            layer.classList.toggle('expanded');
            
            // Update button text
            if (layer.classList.contains('expanded')) {
                button.textContent = 'Collapse Details';
            } else {
                button.textContent = 'Expand Details';
            }
        });
    });
    
    // Animate layers on scroll
    const layers = document.querySelectorAll('.tech-layer');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 100);
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1
    });
    
    layers.forEach(layer => {
        observer.observe(layer);
    });
}

/* ==================================
   HEXAGON GRID ANIMATIONS
   ================================== */
function initHexagonGrid() {
    const hexItems = document.querySelectorAll('.hex-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.3
    });
    
    hexItems.forEach(item => {
        observer.observe(item);
    });
}

/* ==================================
   FLIP CARDS
   ================================== */
function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
    
    // Animate flip cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.9) translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1) translateY(0)';
                    }, 100);
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });
    
    flipCards.forEach(card => {
        observer.observe(card);
    });
}

/* ==================================
   NAVIGATION SCROLL EFFECTS
   ================================== */
function initNavigationScroll() {
    const nav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
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
   INTERSECTION OBSERVER HELPER
   ================================== */
function observeElements(selector, callback, options = {}) {
    const elements = document.querySelectorAll(selector);
    
    const defaultOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observerOptions = { ...defaultOptions, ...options };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
            }
        });
    }, observerOptions);
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

/* ==================================
   UTILITY FUNCTIONS
   ================================== */
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

/* ==================================
   PARALLAX HERO EFFECT
   ================================== */
function initParallaxHero() {
    const gridOverlay = document.querySelector('.grid-overlay');
    
    if (gridOverlay) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const heroHeight = document.querySelector('.solutions-hero-immersive').offsetHeight;
            
            if (scrolled <= heroHeight) {
                gridOverlay.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
            }
        }, 10));
    }
}

/* ==================================
   ACCESSIBILITY ENHANCEMENTS
   ================================== */
function enhanceAccessibility() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll(
        '.pipeline-stage, .flip-card, .layer-toggle, .hex-item'
    );
    
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        element.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Add ARIA labels
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.setAttribute('aria-label', 'Scroll to explore platform');
    }
}

/* ==================================
   LOADING ANIMATIONS
   ================================== */
function initLoadingAnimations() {
    // Stagger animations for grid items
    const gridItems = document.querySelectorAll('.hex-item, .flip-card');
    
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

/* ==================================
   INITIALIZE ON RESIZE
   ================================== */
window.addEventListener('resize', debounce(() => {
    console.log('Window resized - recalculating layouts');
}, 250));

/* ==================================
   ERROR HANDLING
   ================================== */
window.addEventListener('error', (e) => {
    console.error('Page error:', e.message);
});

/* ==================================
   INITIALIZE OPTIONAL FEATURES
   ================================== */
initParallaxHero();
initLoadingAnimations();
enhanceAccessibility();

/* ==================================
   PERFORMANCE MONITORING
   ================================== */
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`Solutions Page Load Time: ${pageLoadTime}ms`);
    });
}
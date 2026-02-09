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
    
    // Initialize comparison animations
    initComparisonAnimations();
    
    // Navigation scroll effects
    initNavigationScroll();
    
    // Smooth scroll
    addSmoothScroll();
    
    console.log('About page - Infrastructure Intelligence Platform');
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
            layerFront.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0002})`;
        }
    });
}

/* ==================================
   COMPARISON SCROLL ANIMATIONS
   ================================== */
function initComparisonAnimations() {
    const comparisonSides = document.querySelectorAll('.comparison-side');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    comparisonSides.forEach(side => {
        observer.observe(side);
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
            
            if (href !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

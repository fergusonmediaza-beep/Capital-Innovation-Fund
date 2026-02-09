/* ===================================
   SOLUTIONS PAGE JAVASCRIPT - REDESIGNED
   Capital Innovation Fund
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    initSolutionsPage();
});

function initSolutionsPage() {
    // Initialize architecture pipeline animations
    initPipelineAnimations();
    
    // Initialize tech card animations
    initTechCardAnimations();
    
    // Initialize comparison bars
    initComparisonBars();
    
    // Navigation scroll effects
    initNavigationScroll();
    
    // Smooth scroll
    addSmoothScroll();
    
    console.log('Solutions page - Platform Architecture loaded');
}

/* ==================================
   PIPELINE ANIMATIONS
   ================================== */
function initPipelineAnimations() {
    const blocks = document.querySelectorAll('.pipeline-block');
    
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
    
    blocks.forEach(block => {
        observer.observe(block);
    });
}

/* ==================================
   TECH CARD ANIMATIONS
   ================================== */
function initTechCardAnimations() {
    const cards = document.querySelectorAll('.tech-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

/* ==================================
   COMPARISON BARS ANIMATIONS
   ================================== */
function initComparisonBars() {
    const rows = document.querySelectorAll('.advantage-row');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Animate bars
                    const fills = entry.target.querySelectorAll('.bar-fill');
                    fills.forEach(fill => {
                        const width = fill.dataset.width;
                        fill.style.width = width + '%';
                    });
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3
    });
    
    rows.forEach(row => {
        observer.observe(row);
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

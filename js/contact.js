/* ===================================
   CONTACT PAGE JAVASCRIPT - REDESIGNED
   Capital Innovation Fund
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    initContactPage();
});

function initContactPage() {
    // Initialize button interactions
    initButtonInteractions();
    
    // Initialize card click tracking
    initCardTracking();
    
    // Navigation scroll effects
    initNavigationScroll();
    
    // Smooth scroll
    addSmoothScroll();
    
    console.log('Contact page - Get In Touch loaded');
}

/* ==================================
   BUTTON INTERACTIONS
   ================================== */
function initButtonInteractions() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading animation
            const progress = this.querySelector('.button-progress');
            progress.style.transition = 'width 2s ease';
            progress.style.width = '100%';
            
            // Reset after animation
            setTimeout(() => {
                progress.style.transition = 'width 0.3s ease';
                progress.style.width = '0';
            }, 2000);
            
            console.log('Consultation request initiated');
        });
    }
}

/* ==================================
   CARD CLICK TRACKING
   ================================== */
function initCardTracking() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            console.log('Contact card clicked:', title);
            
            // Optional: Copy contact info to clipboard
            const text = this.querySelector('p').textContent;
            copyToClipboard(text);
        });
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
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

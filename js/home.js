/* ===================================
   HOME PAGE JAVASCRIPT - UPDATED
   No Stats - Mobile Sidebar
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    initHomePage();
});

function initHomePage() {
    // Initialize mobile sidebar
    initMobileSidebar();
    
    // Initialize network animation
    initNetworkCanvas();
    
    // Initialize sector selector
    initSectorSelector();
    
    // Initialize timeline animations
    initTimelineAnimations();
    
    // Add navigation scroll effects
    initNavigationScroll();
    
    // Add smooth scroll
    addSmoothScroll();
    
    console.log('Infrastructure Intelligence Platform loaded');
}

/* ==================================
   MOBILE SIDEBAR
   ================================== */
function initMobileSidebar() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.mobile-sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    
    if (!menuToggle || !sidebar) return;
    
    // Open sidebar
    menuToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close sidebar function
    function closeSidebar() {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close on button click
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    // Close on overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Close on link click
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
}

/* ==================================
   NETWORK CANVAS ANIMATION
   ================================== */
function initNetworkCanvas() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Network nodes
    const nodes = [];
    const nodeCount = 40;
    const connectionDistance = 150;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            pulse: Math.random() * Math.PI * 2
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach((node, i) => {
            // Move nodes
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Update pulse
            node.pulse += 0.02;
            
            // Draw connections
            nodes.forEach((otherNode, j) => {
                if (i === j) return;
                
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.3;
                    ctx.strokeStyle = `rgba(0, 168, 232, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.stroke();
                }
            });
            
            // Draw node
            const pulseSize = Math.sin(node.pulse) * 0.5 + 1.5;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 136, ${0.6 + Math.sin(node.pulse) * 0.4})`;
            ctx.fill();
            
            // Draw glow
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * pulseSize * 2, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * pulseSize * 2);
            gradient.addColorStop(0, 'rgba(0, 255, 136, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ==================================
   SECTOR SELECTOR INTERACTION
   ================================== */
function initSectorSelector() {
    const tabs = document.querySelectorAll('.sector-tab');
    const sectorImage = document.getElementById('sectorImage');
    const sectorTitle = document.getElementById('sectorTitle');
    const sectorText = document.getElementById('sectorText');
    
    // Sector data without stats
    const sectorData = {
        water: {
            image: 'images/water.png',
            title: 'Water Infrastructure',
            description: 'Comprehensive monitoring of water distribution networks, treatment facilities, and irrigation systems across Africa. Our platform provides real-time visibility into water quality, flow rates, and infrastructure performance to ensure sustainable water management and attract investment in critical water projects.'
        },
        energy: {
            image: 'images/energy.png',
            title: 'Energy Infrastructure',
            description: 'Advanced tracking of renewable energy installations, power grids, and distribution networks. We provide investors with transparent data on energy generation, grid stability, and performance metrics to accelerate the deployment of sustainable energy solutions across the continent.'
        },
        logistics: {
            image: 'images/logistics.png',
            title: 'Logistics Infrastructure',
            description: 'Real-time monitoring of ports, highways, railways, and cargo handling facilities. Our intelligence platform delivers comprehensive visibility into transportation networks, enabling data-driven investment decisions in Africa\'s critical logistics infrastructure.'
        },
        agriculture: {
            image: 'images/agriculture.png',
            title: 'Agriculture Infrastructure',
            description: 'Integrated monitoring of irrigation systems, storage facilities, and agricultural processing infrastructure. We provide investors with verified data on agricultural productivity, resource utilization, and infrastructure efficiency to support sustainable food security investments.'
        },
        gas: {
            image: 'images/gas.png',
            title: 'Gas Infrastructure',
            description: 'Comprehensive tracking of gas pipelines, storage facilities, and distribution networks. Our platform offers transparent monitoring of gas infrastructure performance, safety metrics, and operational efficiency to facilitate investment in energy infrastructure development.'
        }
    };
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get sector data
            const sector = this.dataset.sector;
            const data = sectorData[sector];
            
            // Update image with fade effect
            sectorImage.style.opacity = '0';
            setTimeout(() => {
                sectorImage.src = data.image;
                sectorImage.alt = data.title;
                sectorImage.style.opacity = '1';
            }, 300);
            
            // Update text content
            sectorTitle.textContent = data.title;
            sectorText.textContent = data.description;
        });
    });
}

/* ==================================
   TIMELINE SCROLL ANIMATIONS
   ================================== */
function initTimelineAnimations() {
    const steps = document.querySelectorAll('.timeline-step');
    const pathFill = document.getElementById('timelinePathFill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3
    });
    
    steps.forEach(step => {
        observer.observe(step);
    });
    
    // Animate path on scroll
    const timelineSection = document.querySelector('.why-timeline');
    if (timelineSection && pathFill) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    pathFill.classList.add('active');
                }
            });
        }, {
            threshold: 0.2
        });
        
        timelineObserver.observe(timelineSection);
    }
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

/* ==================================
   SCROLL REVEAL FOR SECTIONS
   ================================== */
function initScrollReveal() {
    const sections = document.querySelectorAll('.solutions-interactive, .why-timeline, .cta-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Initialize scroll reveal
setTimeout(initScrollReveal, 100);
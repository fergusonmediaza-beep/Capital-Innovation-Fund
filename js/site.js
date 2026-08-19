/* ===================================
   SHARED FUNCTIONS
   Capital Innovation Fund
   =================================== */

function initNavigationScroll() {
    const nav = document.getElementById('main_nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

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

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const heroSection = scrollIndicator.closest('section');
            const nextSection = heroSection ? heroSection.nextElementSibling : null;

            if (nextSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = nextSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

function initMobileSidebar() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.mobile-sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

    if (!menuToggle || !sidebar) return;

    menuToggle.addEventListener('click', function() {
        const isOpen = sidebar.classList.toggle('active');
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    function closeSidebar() {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    sidebarLinks.forEach(link => link.addEventListener('click', closeSidebar));

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) closeSidebar();
    });
}

/* Shared behaviors that must run exactly once per page load, regardless of which page.
   (Each page-specific init function below only handles page-specific elements.) */
document.addEventListener('DOMContentLoaded', function() {
    initMobileSidebar();
    initNavigationScroll();
    addSmoothScroll();
    initScrollIndicator();
});

/* ===================================
   HOME PAGE
   =================================== */

/* ==================================
   NETWORK CANVAS ANIMATION
   ================================== */
function initNetworkCanvas() {
    const canvas = document.getElementById('network_canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes = [];
    const nodeCount = 40;
    const connectionDistance = 150;

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

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            node.pulse += 0.02;

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

            const pulseSize = Math.sin(node.pulse) * 0.5 + 1.5;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 136, ${0.6 + Math.sin(node.pulse) * 0.4})`;
            ctx.fill();

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
   SECTOR SELECTOR
   Expanded descriptions for all 5 sectors
   ================================== */
function initSectorSelector() {
    const tabs = document.querySelectorAll('.sector-tab');
    const select = document.getElementById('sector_select');
    const sectorImage = document.getElementById('sector_image');
    const sectorTitle = document.getElementById('sector_title');
    const sectorText = document.getElementById('sector_text');

    /*
     * Each sector now includes specific sensor/drone tracking details
     * to match the depth achieved in the Water description.
     */
    const sectorData = {
        water: {
            image: 'images/water.webp',
            title: 'Water Infrastructure',
            description: 'Comprehensive monitoring of water distribution networks, treatment facilities, and irrigation systems across Africa. IoT sensors track water quality (pH, turbidity, chlorine levels), flow rates, pipe pressure, and infrastructure integrity in real time — enabling early leak detection, predictive maintenance of pumping stations, and verified compliance reporting that attracts institutional investment.'
        },
        energy: {
            image: 'images/energy.webp',
            title: 'Energy Infrastructure',
            description: 'Advanced monitoring of solar installations, wind farms, and power distribution grids. Sensors track panel-level generation output, inverter efficiency, battery storage cycles, and grid voltage stability. Drone inspections identify hotspots, panel degradation, and structural wear on transmission towers. AI models predict generation shortfalls days in advance, enabling optimised dispatch and protecting investor revenue forecasts.'
        },
        logistics: {
            image: 'images/logistics.webp',
            title: 'Logistics Infrastructure',
            description: 'Real-time intelligence across ports, road corridors, rail networks, and cold-chain facilities. GPS and weight sensors on vehicles track load capacity, route deviations, and fuel consumption. Checkpoint scanners record cargo throughput and dwell times. Drone surveillance monitors road surface conditions and bridge structural integrity. Combined, these data streams cut transit delays and give funders a transparent view of throughput performance.'
        },
        agriculture: {
            image: 'images/agriculture.webp',
            title: 'Agriculture Infrastructure',
            description: 'Integrated monitoring of irrigation systems, grain storage facilities, and agri-processing plants. Soil moisture and salinity sensors optimise water delivery to the crop root zone. Temperature and humidity loggers in silos prevent post-harvest spoilage. Drone multispectral imagery identifies crop stress, pest pressure, and yield estimates at field level. This granular data supports bankable feasibility studies and ongoing investor reporting.'
        },
        gas: {
            image: 'images/gas.webp',
            title: 'Gas Infrastructure',
            description: 'Comprehensive monitoring of natural gas pipelines, compression stations, and LPG distribution networks. Pressure and flow sensors detect micro-leaks and anomalous consumption patterns across the full pipeline network. Methane detection sensors and acoustic monitoring track corrosion and joint integrity. Drone patrols of right-of-way corridors supplement satellite thermal imagery to catch surface disturbances early — reducing safety risk and maintaining the regulatory compliance record that institutional investors require.'
        }
    };

    function switchSector(sector) {
        const data = sectorData[sector];
        if (!data) return;

        tabs.forEach(t => t.classList.toggle('active', t.dataset.sector === sector));
        if (select) select.value = sector;

        sectorImage.style.opacity = '0';
        setTimeout(() => {
            sectorImage.src = data.image;
            sectorImage.alt = data.title;
            sectorImage.style.opacity = '1';
        }, 300);

        sectorTitle.textContent = data.title;
        sectorText.textContent = data.description;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchSector(this.dataset.sector);
        });
    });

    if (select) {
        select.addEventListener('change', function() {
            switchSector(this.value);
        });
    }
}

/* ==================================
   TIMELINE SCROLL ANIMATIONS
   ================================== */
function initTimelineAnimations() {
    const steps = document.querySelectorAll('.timeline-step');
    const pathFill = document.getElementById('timeline_path_fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    steps.forEach(step => observer.observe(step));

    const timelineSection = document.querySelector('.why-timeline');
    if (timelineSection && pathFill) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) pathFill.classList.add('active');
            });
        }, { threshold: 0.2 });
        timelineObserver.observe(timelineSection);
    }
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
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

function initHomePage() {
    initNetworkCanvas();
    initSectorSelector();
    initTimelineAnimations();
    initScrollReveal();
}

document.addEventListener('DOMContentLoaded', function() {
    initHomePage();
});
/* ===================================
   ABOUT PAGE
   =================================== */

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
   ACCESSIBILITY ENHANCEMENTS
   ================================== */
function enhanceAboutAccessibility() {
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

function initAboutPage() {
    // Initialize parallax effect
    initParallaxScroll();

    // Initialize scroll animations
    initScrollAnimations();

    // Keyboard accessibility for interactive cards
    enhanceAboutAccessibility();
}

document.addEventListener('DOMContentLoaded', function() {
    initAboutPage();
});

/* ===================================
   SOLUTIONS PAGE
   =================================== */

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
            const wasFlipped = card.classList.contains('flipped');

            // Close all other cards
            flipCards.forEach(c => {
                if (c !== card) c.classList.remove('flipped');
            });

            card.classList.toggle('flipped', !wasFlipped);
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
function enhanceSolutionsAccessibility() {
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

function initSolutionsPage() {
    // Initialize pipeline hover reveals
    initPipelineStages();

    // Initialize technology layers
    initTechLayers();

    // Initialize hexagon animations
    initHexagonGrid();

    // Initialize flip cards
    initFlipCards();

    // Parallax hero effect
    initParallaxHero();

    // Loading animation stagger
    initLoadingAnimations();

    // Keyboard accessibility for interactive elements
    enhanceSolutionsAccessibility();
}

document.addEventListener('DOMContentLoaded', function() {
    initSolutionsPage();
});

/* ==================================
   ERROR HANDLING
   ================================== */
window.addEventListener('error', (e) => {
    console.error('Page error:', e.message);
});

/* ===================================
   CONTACT PAGE
   =================================== */

/* ==================================
   FORM SUBMISSION - EMAIL REDIRECT
   ================================== */
function initFormSubmission() {
  const form = document.getElementById('contact_form');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('full_name').value;
    const company = document.getElementById('company').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Compose email
    const recipientEmail = 'info@capitalinnovation.fund';
    const subject = `Strategic Inquiry from ${fullName} - ${company}`;
    
    const body = `
Full Name: ${fullName}
Company/Institution: ${company}
Phone: ${phone}
Email: ${email}

Message:
${message}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Optional: Show confirmation message
    showNotification('Opening your email client...', 'success');
    
    // Reset form after short delay
    setTimeout(() => {
      form.reset();
    }, 1000);
  });
}

function showNotification(message, type = 'info') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  const colors = {
    success: '#00d98e',
    error: '#ff4757',
    info: '#00a8cc'
  };
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: ${colors[type]};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-size: 14px;
    font-weight: 600;
    max-width: 400px;
    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

/* ==================================
   FORM INTERACTIONS
   ================================== */
function initFormInteractions() {
  // Auto-resize textarea
  const textarea = document.querySelector('textarea');
  if (textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }
  
  // Input focus effects
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      const formGroup = this.closest('.form-group');
      if (formGroup) {
        formGroup.style.transform = 'translateY(-2px)';
        formGroup.style.transition = 'transform 0.3s ease';
      }
    });
    
    input.addEventListener('blur', function() {
      const formGroup = this.closest('.form-group');
      if (formGroup) {
        formGroup.style.transform = 'translateY(0)';
      }
    });
  });
}

/* ==================================
   CONTACT CARD INTERACTIONS
   ================================== */
function initContactCardInteractions() {
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach(item => {
    item.style.cursor = 'pointer';
    
    item.addEventListener('click', function() {
      const contactValue = this.querySelector('.contact-value');
      if (contactValue) {
        const text = contactValue.textContent.trim();
        copyToClipboard(text);
        
        // Visual feedback
        const label = this.querySelector('.contact-label');
        const originalText = label.textContent;
        label.textContent = 'Copied!';
        label.style.color = '#00ffa3';
        
        setTimeout(() => {
          label.textContent = originalText;
          label.style.color = '';
        }, 2000);
      }
    });
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Copied to clipboard', 'success');
    }).catch(err => {
      console.error('Copy failed:', err);
      fallbackCopyToClipboard(text);
    });
  } else {
    fallbackCopyToClipboard(text);
  }
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand('copy');
    showNotification('Copied to clipboard', 'success');
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }

  document.body.removeChild(textArea);
}

/* ==================================
   MAIN INITIALIZATION
   ================================== */
function initContactPage() {
  initFormSubmission();
  initFormInteractions();
  initContactCardInteractions();
}

document.addEventListener('DOMContentLoaded', function() {
  initContactPage();
});

/* ==================================
   CSS ANIMATIONS
   ================================== */
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

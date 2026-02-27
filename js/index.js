/* ===================================
   HOME PAGE JAVASCRIPT - UPDATED
   Capital Innovation Fund
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    initHomePage();
});

function initHomePage() {
    initMobileSidebar();
    initNetworkCanvas();
    initSectorSelector();
    initTimelineAnimations();
    initNavigationScroll();
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

    menuToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function closeSidebar() {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    sidebarLinks.forEach(link => link.addEventListener('click', closeSidebar));

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) closeSidebar();
    });
}

/* ==================================
   NETWORK CANVAS ANIMATION
   ================================== */
function initNetworkCanvas() {
    const canvas = document.getElementById('networkCanvas');
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
    const sectorImage = document.getElementById('sectorImage');
    const sectorTitle = document.getElementById('sectorTitle');
    const sectorText = document.getElementById('sectorText');

    /*
     * Each sector now includes specific sensor/drone tracking details
     * to match the depth achieved in the Water description.
     */
    const sectorData = {
        water: {
            image: 'images/water.png',
            title: 'Water Infrastructure',
            description: 'Comprehensive monitoring of water distribution networks, treatment facilities, and irrigation systems across Africa. IoT sensors track water quality (pH, turbidity, chlorine levels), flow rates, pipe pressure, and infrastructure integrity in real time — enabling early leak detection, predictive maintenance of pumping stations, and verified compliance reporting that attracts institutional investment.'
        },
        energy: {
            image: 'images/energy.png',
            title: 'Energy Infrastructure',
            description: 'Advanced monitoring of solar installations, wind farms, and power distribution grids. Sensors track panel-level generation output, inverter efficiency, battery storage cycles, and grid voltage stability. Drone inspections identify hotspots, panel degradation, and structural wear on transmission towers. AI models predict generation shortfalls days in advance, enabling optimised dispatch and protecting investor revenue forecasts.'
        },
        logistics: {
            image: 'images/logistics.png',
            title: 'Logistics Infrastructure',
            description: 'Real-time intelligence across ports, road corridors, rail networks, and cold-chain facilities. GPS and weight sensors on vehicles track load capacity, route deviations, and fuel consumption. Checkpoint scanners record cargo throughput and dwell times. Drone surveillance monitors road surface conditions and bridge structural integrity. Combined, these data streams cut transit delays and give funders a transparent view of throughput performance.'
        },
        agriculture: {
            image: 'images/agriculture.png',
            title: 'Agriculture Infrastructure',
            description: 'Integrated monitoring of irrigation systems, grain storage facilities, and agri-processing plants. Soil moisture and salinity sensors optimise water delivery to the crop root zone. Temperature and humidity loggers in silos prevent post-harvest spoilage. Drone multispectral imagery identifies crop stress, pest pressure, and yield estimates at field level. This granular data supports bankable feasibility studies and ongoing investor reporting.'
        },
        gas: {
            image: 'images/gas.png',
            title: 'Gas Infrastructure',
            description: 'Comprehensive monitoring of natural gas pipelines, compression stations, and LPG distribution networks. Pressure and flow sensors detect micro-leaks and anomalous consumption patterns across the full pipeline network. Methane detection sensors and acoustic monitoring track corrosion and joint integrity. Drone patrols of right-of-way corridors supplement satellite thermal imagery to catch surface disturbances early — reducing safety risk and maintaining the regulatory compliance record that institutional investors require.'
        }
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const sector = this.dataset.sector;
            const data = sectorData[sector];

            sectorImage.style.opacity = '0';
            setTimeout(() => {
                sectorImage.src = data.image;
                sectorImage.alt = data.title;
                sectorImage.style.opacity = '1';
            }, 300);

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
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
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
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

setTimeout(initScrollReveal, 100);
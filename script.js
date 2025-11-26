// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Typing animation for hero title
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = "Hi, I'm Chanupa";
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            typingText.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation when page loads
    setTimeout(() => {
        typingText.textContent = '';
        typeWriter();
    }, 500);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.style.width || '0%';
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .stat-item, .contact-method').forEach(el => {
    observer.observe(el);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-color)' : type === 'error' ? 'var(--secondary-color)' : 'var(--accent-bg)'};
        color: ${type === 'success' || type === 'error' ? 'var(--primary-bg)' : 'var(--text-primary)'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize animations for visible elements
    const visibleElements = document.querySelectorAll('.hero-content, .about-content');
    visibleElements.forEach(el => {
        el.classList.add('fade-in-up');
    });
});

// Theme toggle functionality (bonus feature)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: var(--primary-bg);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px var(--glow-color);
    `;
    
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1)';
    });
    
    // Color scheme variants
    const colorSchemes = [
        {
            primary: '#00ff88',
            secondary: '#ff6b35',
            glow: 'rgba(0, 255, 136, 0.3)'
        },
        {
            primary: '#00d4ff',
            secondary: '#ff00ff',
            glow: 'rgba(0, 212, 255, 0.3)'
        },
        {
            primary: '#ff6b35',
            secondary: '#00ff88',
            glow: 'rgba(255, 107, 53, 0.3)'
        }
    ];
    
    let currentScheme = 0;
    
    themeToggle.addEventListener('click', () => {
        currentScheme = (currentScheme + 1) % colorSchemes.length;
        const scheme = colorSchemes[currentScheme];
        
        document.documentElement.style.setProperty('--primary-color', scheme.primary);
        document.documentElement.style.setProperty('--secondary-color', scheme.secondary);
        document.documentElement.style.setProperty('--glow-color', scheme.glow);
        
        showNotification('Color scheme updated!', 'success');
    });
    
    document.body.appendChild(themeToggle);
}

// Initialize theme toggle
createThemeToggle();

// Add CSS for loaded state
const loadedCSS = document.createElement('style');
loadedCSS.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded) * {
        animation-play-state: paused !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        line-height: 1;
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(loadedCSS);

// Star and Shooting Star Animation for Hero Section
function createStarsAndShootingStars() {
    const container = document.querySelector('.star-animation-container');
    if (!container) return;

    // Clear previous stars if any
    container.innerHTML = '';

    // Create blinking stars
    const numStars = 60;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        // Random position within the container (right half of hero)
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${30 + Math.random() * 70}%`;
        // Random animation delay for twinkling
        star.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(star);
    }

    // Shooting star logic
    function spawnShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        // Random vertical position in upper 70% of container
        shootingStar.style.top = `${Math.random() * 70}%`;
        shootingStar.style.left = `${40 + Math.random() * 50}%`;
        container.appendChild(shootingStar);
        setTimeout(() => {
            shootingStar.remove();
        }, 1200);
    }

    // Randomly spawn shooting stars every 2-5 seconds
    function shootingStarLoop() {
        const interval = 2000 + Math.random() * 3000;
        setTimeout(() => {
            spawnShootingStar();
            shootingStarLoop();
        }, interval);
    }
    shootingStarLoop();
}

// Only run on homepage
window.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.star-animation-container')) {
        createStarsAndShootingStars();
    }
    
    // Initialize events countdown preview if on homepage
    if (document.getElementById('preview-days')) {
        updateEventsCountdown();
        setInterval(updateEventsCountdown, 1000);
    }
});

// Events section countdown preview
function updateEventsCountdown() {
    const targetDate = new Date('2025-11-26T17:00:00-08:00');
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) {
        document.getElementById('preview-days').textContent = '0';
        document.getElementById('preview-hours').textContent = '0';
        document.getElementById('preview-mins').textContent = '0';
        document.getElementById('preview-secs').textContent = '0';
        return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('preview-days').textContent = days.toString();
    document.getElementById('preview-hours').textContent = hours.toString();
    document.getElementById('preview-mins').textContent = minutes.toString();
    document.getElementById('preview-secs').textContent = seconds.toString();
}

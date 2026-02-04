// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Menu Functionality
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const body = document.body;

// Toggle mobile menu with hamburger animation
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

function toggleMobileMenu() {
    const isActive = mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Animate hamburger to X
    const bars = hamburger.querySelectorAll('.bar');
    if (isActive) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        // Prevent body scroll when menu is open
        body.style.overflow = 'hidden';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
        body.style.overflow = '';
    }
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        toggleMobileMenu();
    }
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Add animation class to elements
document.querySelectorAll('.section-title, .about-content, .stat-card, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0'; // Initial state for JS-enabled browsers
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add css class for animation via JS to keep CSS clean if JS fails
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Fix for mobile viewport height issues (100vh problem on mobile browsers)
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set on load
setViewportHeight();

// Update on resize (with debounce for performance)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setViewportHeight, 100);
}, { passive: true });

// Prevent default touch behavior on buttons for better mobile UX
document.querySelectorAll('.btn, .btn-link').forEach(button => {
    button.addEventListener('touchstart', function () {
        this.style.transform = 'scale(0.96)';
    }, { passive: true });

    button.addEventListener('touchend', function () {
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    }, { passive: true });
});

// ============================================
// WhatsApp Contact Form Integration
// ============================================
// CONFIGURATION: Update this number with your WhatsApp number 
// Format: Country code + number (no spaces, no + sign)
// Example for India: '919876543210'
// Example for US: '11234567890'
const WHATSAPP_NUMBER = '91930944157'; // UPDATE THIS WITH YOUR NUMBER

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Format message for WhatsApp
        const whatsappMessage = `*New Portfolio Contact Message*\n\n` +
            `*Name:* ${name}\n` +
            `*Email:* ${email}\n\n` +
            `*Message:*\n${message}\n\n` +
            `---\nSent from Portfolio Contact Form`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Create WhatsApp URL (works on mobile and desktop)
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');

        // Optional: Clear form after sending
        setTimeout(() => {
            contactForm.reset();
        }, 500);

        // Show success message
        showNotification('Opening WhatsApp... Please send the message to complete!');
    });
}

// Simple notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #10B981, #06B6D4);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;

    // Add animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Add to page
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

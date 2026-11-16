/**
 * ==========================================================================
 * Portfolio JavaScript - Dhruv Vala
 * Features implemented:
 *  1. Dark / Light Mode Switcher with LocalStorage persistence
 *  2. Responsive Mobile Hamburger Menu (Toggle & Auto-close)
 *  3. Interactive Contact Form Validation with real-time feedback
 *  4. Active Navigation Link Highlighting on Scroll
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // Feature 1: Dark / Light Mode Toggle
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Check for saved theme in localStorage or system preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            themeIcon.textContent = '🌙';
            themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
        } else {
            themeIcon.textContent = '☀️';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
        }
    }

    // ----------------------------------------------------------------------
    // Feature 2: Mobile Navigation Menu (Hamburger Toggle)
    // ----------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-item');

    if (mobileMenuBtn && navbar) {
        // Toggle menu when clicking hamburger button
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navbar.classList.toggle('mobile-active');
        });

        // Close mobile menu automatically when any nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navbar.classList.remove('mobile-active');
            });
        });
    }

    // ----------------------------------------------------------------------
    // Feature 3: Interactive Contact Form Validation
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formAlert = document.getElementById('form-alert');

    // Email validation regex helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    // Clear error message when user starts typing
    function setupInputClear(input, errorElement) {
        input.addEventListener('input', () => {
            if (input.classList.contains('input-error')) {
                input.classList.remove('input-error');
                errorElement.textContent = '';
            }
            formAlert.className = 'form-alert';
            formAlert.style.display = 'none';
        });
    }

    setupInputClear(nameInput, nameError);
    setupInputClear(emailInput, emailError);
    setupInputClear(messageInput, messageError);

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop normal form submit

            let isValid = true;

            // Reset previous alerts
            formAlert.className = 'form-alert';
            formAlert.style.display = 'none';
            formAlert.textContent = '';

            // 1. Validate Full Name
            if (!nameInput.value.trim()) {
                nameInput.classList.add('input-error');
                nameError.textContent = 'Please enter your full name.';
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                nameInput.classList.add('input-error');
                nameError.textContent = 'Name must be at least 2 characters long.';
                isValid = false;
            }

            // 2. Validate Email
            if (!emailInput.value.trim()) {
                emailInput.classList.add('input-error');
                emailError.textContent = 'Please enter your email address.';
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                emailInput.classList.add('input-error');
                emailError.textContent = 'Please enter a valid email address (e.g. name@domain.com).';
                isValid = false;
            }

            // 3. Validate Message
            if (!messageInput.value.trim()) {
                messageInput.classList.add('input-error');
                messageError.textContent = 'Please write a message before sending.';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageInput.classList.add('input-error');
                messageError.textContent = 'Message must be at least 10 characters long.';
                isValid = false;
            }

            // If all checks pass
            if (isValid) {
                formAlert.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been received. I'll get back to you soon.`;
                formAlert.classList.add('success');
                formAlert.style.display = 'block';

                // Reset form fields
                contactForm.reset();
            } else {
                formAlert.textContent = 'Please correct the highlighted errors above.';
                formAlert.classList.add('error');
                formAlert.style.display = 'block';
            }
        });
    }

    // ----------------------------------------------------------------------
    // Feature 4: Active Navigation Item on Scroll
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});

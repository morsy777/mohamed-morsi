/**
 * Core JS logic for Backend Engineer Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. Theme Management (Dark / Light Mode)
       ========================================================================= */
       
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or use system preference (defaulting to dark if none)
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Application logic favors Dark mode initially based on design prompt
    if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
    } else if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        // Default to dark, though we already have class="dark" hardcoded in HTML
        htmlElement.classList.add('dark');
    }

    // Toggle theme on click
    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    /* =========================================================================
       2. Smooth Scrolling for Navigation Links
       ========================================================================= */
       
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty anchors
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust for fixed header offset
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================================================================
       3. Intersection Observer (Scroll Animations)
       ========================================================================= */
       
    const revealElements = document.querySelectorAll('.reveal');

    // Options for the observer
    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // We only want to animate in, not out
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

    if (mobileMenuBtn && mobileMenu) {
        // Toggle menu open/close
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }
    
    function openMobileMenu() {
        mobileMenu.classList.add('open');
        if (menuIcon) {
            menuIcon.setAttribute('data-lucide', 'x');
            lucide.createIcons();
        }
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        if (menuIcon) {
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    }

});

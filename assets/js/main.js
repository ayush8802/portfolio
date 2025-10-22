/* ========================================
   MAIN JAVASCRIPT - FIXED VERSION
======================================== */

(function() {
    'use strict';

    // ========== PAGE LOADER (FIXED) ==========
    window.addEventListener('load', function() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(function() {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                loader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 1000);
        }
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
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

    // ========== HEADER SCROLL EFFECT ==========
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ========== ACTIVE NAVIGATION LINK ==========
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav__link');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(function(link) {
                link.classList.remove('active-link');
                if (current && link.getAttribute('href').includes(current)) {
                    link.classList.add('active-link');
                }
            });
        });
    }

    // ========== SCROLL TO TOP BUTTON ==========
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    console.log('✅ Portfolio loaded successfully!');
})();

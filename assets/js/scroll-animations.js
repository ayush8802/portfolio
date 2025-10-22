/* ========================================
   SCROLL-ANIMATIONS.JS - AOS Alternative
======================================== */

(function() {
    'use strict';

    // ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==========
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (animatedElements.length) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, parseInt(delay));
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => observer.observe(element));
    }

    // ========== SCROLL PROGRESS BAR ==========
    function updateScrollProgress() {
        const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const progressBar = document.querySelector('.scroll-progress');
        
        if (progressBar) {
            progressBar.style.width = scrollProgress + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // ========== PARALLAX SECTIONS ==========
    const parallaxSections = document.querySelectorAll('[data-parallax]');
    
    if (parallaxSections.length) {
        window.addEventListener('scroll', () => {
            parallaxSections.forEach(section => {
                const speed = section.getAttribute('data-parallax') || 0.5;
                const yPos = -(window.scrollY * speed);
                section.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    console.log('✅ Scroll-animations.js loaded');
})();

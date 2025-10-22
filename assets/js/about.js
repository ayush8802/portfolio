/* ========================================
   ABOUT.JS - About Section Functionality
======================================== */

(function() {
    'use strict';

    // ========== COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    }

    // ========== INTERSECTION OBSERVER FOR COUNTERS ==========
    const aboutSection = document.querySelector('.about');
    
    if (aboutSection && statNumbers.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    statNumbers.forEach(stat => animateCounter(stat));
                    hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        observer.observe(aboutSection);
    }

    // ========== IMAGE HOVER EFFECT ==========
    const aboutImage = document.querySelector('.about__img');
    const imageCard = document.querySelector('.about__image-card');
    
    if (aboutImage && imageCard) {
        imageCard.addEventListener('mousemove', (e) => {
            const rect = imageCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateX = (y - rect.height / 2) / 20;
            const rotateY = (rect.width / 2 - x) / 20;
            
            aboutImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        imageCard.addEventListener('mouseleave', () => {
            aboutImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }

    console.log('✅ About.js loaded');
})();

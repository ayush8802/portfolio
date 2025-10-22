/* ========================================
   EDUCATION.JS - Education Section
======================================== */

(function() {
    'use strict';

    // ========== CARD HOVER EFFECT ==========
    const educationCards = document.querySelectorAll('.education-card');
    
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========== SCROLL REVEAL ANIMATION ==========
    if (educationCards.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        educationCards.forEach(card => observer.observe(card));
    }

    console.log('✅ Education.js loaded');
})();

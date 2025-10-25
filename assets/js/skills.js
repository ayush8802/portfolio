/* ========================================
   SKILLS.JS - Progress Bar Animations
======================================== */

(function() {
    'use strict';

    console.log('✅ Skills section loaded');

    // Simple animation trigger on scroll
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill__progress');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.opacity = '1';
                    observer.unobserve(bar);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => {
            bar.style.opacity = '0';
            bar.style.transition = 'opacity 1s ease';
            observer.observe(bar);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animateSkillBars);
    } else {
        animateSkillBars();
    }

})();

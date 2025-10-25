/* ========================================
   SKILLS.JS - Animated Progress Bars
======================================== */

(function() {
    'use strict';

    // Animate skill bars when they come into view
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
                    const width = bar.style.width;
                    
                    // Reset width to 0 first
                    bar.style.width = '0';
                    
                    // Animate to target width
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    
                    // Only animate once
                    observer.unobserve(bar);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animateSkillBars);
    } else {
        animateSkillBars();
    }

    console.log('✅ Skills animations loaded');

})();

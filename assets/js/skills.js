/* ========================================
   SKILLS.JS - Fixed Progress Bar Animation
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
                    
                    // Get the target width from inline style
                    const targetWidth = bar.style.width;
                    
                    // Store it as CSS variable
                    bar.style.setProperty('--progress-width', targetWidth);
                    
                    // Reset to 0
                    bar.style.width = '0';
                    
                    // Trigger animation after a small delay
                    setTimeout(() => {
                        bar.classList.add('animate');
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

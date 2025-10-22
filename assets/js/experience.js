/* ========================================
   EXPERIENCE.JS - Experience Timeline
======================================== */

(function() {
    'use strict';

    // ========== TIMELINE ANIMATION ON SCROLL ==========
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => observer.observe(item));
    }

    // ========== TIMELINE LINE PROGRESS ==========
    const timelineLine = document.querySelector('.timeline-line');
    const experienceSection = document.querySelector('.experience');
    
    if (timelineLine && experienceSection) {
        window.addEventListener('scroll', () => {
            const sectionTop = experienceSection.offsetTop;
            const sectionHeight = experienceSection.offsetHeight;
            const scrollY = window.scrollY;
            
            if (scrollY > sectionTop - window.innerHeight / 2 && scrollY < sectionTop + sectionHeight) {
                const progress = ((scrollY - sectionTop + window.innerHeight / 2) / sectionHeight) * 100;
                timelineLine.style.height = Math.min(progress, 100) + '%';
            }
        });
    }

    console.log('✅ Experience.js loaded');
})();

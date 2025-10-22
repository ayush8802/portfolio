/* ========================================
   PROJECTS.JS - Projects Section
======================================== */

(function() {
    'use strict';

    // ========== PROJECT CARDS HOVER EFFECT ==========
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', function() {
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });

    // ========== PROJECT FILTER (IF NEEDED IN FUTURE) ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ========== SCROLL REVEAL ANIMATION ==========
    if (projectCards.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        projectCards.forEach(card => observer.observe(card));
    }

    console.log('✅ Projects.js loaded');
})();

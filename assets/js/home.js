/* ========================================
   HOME.JS - Home Section Animations
======================================== */

(function() {
    'use strict';

    // ========== TYPING ANIMATION ==========
    const subtitleElement = document.querySelector('.home__subtitle');
    
    if (subtitleElement) {
        const roles = ['Software Developer', 'AI Enthusiast', 'Prompt Engineer', 'Full Stack Developer'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeRole() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                subtitleElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                subtitleElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            setTimeout(typeRole, typingSpeed);
        }

        // Start typing animation after page load
        setTimeout(typeRole, 1000);
    }

    // ========== FLOATING ELEMENTS ANIMATION ==========
    const floatingElements = document.querySelectorAll('.float-element');
    
    floatingElements.forEach((element, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
    });

    // ========== PARALLAX EFFECT ON MOUSE MOVE ==========
    const homeSection = document.querySelector('.home');
    const profileImage = document.querySelector('.home__img');
    
    if (homeSection && profileImage) {
        homeSection.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            
            profileImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    console.log('✅ Home.js loaded');
})();

/* ========================================
   HEADER.JS - Navigation Functionality
   ======================================== */

(function() {
  'use strict';

  // ========== MOBILE MENU TOGGLE ==========
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');

  // Show menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
  }

  // Hide menu
  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = ''; // Restore scrolling
    });
  }

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside (optional)
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    }
  });

  // ========== HEADER SCROLL EFFECT ==========
  const header = document.getElementById('header');
  
  function headerScroll() {
    if (window.scrollY >= 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', headerScroll);

  // ========== ACTIVE LINK ON SCROLL ==========
  const sections = document.querySelectorAll('.section[id]');

  function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector('.nav__link[href*=' + sectionId + ']');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add('active-link');
      } else {
        navLink?.classList.remove('active-link');
      }
    });
  }

  window.addEventListener('scroll', scrollActive);

  console.log('✅ Header.js loaded');

})();

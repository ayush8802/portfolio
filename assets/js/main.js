/* ========================================
   MAIN JAVASCRIPT - CLEAN VERSION
   ======================================== */

(function() {
  'use strict';

  // Page Loader
  window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      setTimeout(function() {
        loader.classList.add('hidden');
      }, 1000);
    }
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Header Scroll Effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Active Navigation Link
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav__link');

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(function(link) {
        link.classList.remove('active-link');
        if (current && link.getAttribute('href').includes(current)) {
          link.classList.add('active-link');
        }
      });
    });
  }

  // Scroll to Top Button
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  console.log('✅ Portfolio loaded successfully!');

})();

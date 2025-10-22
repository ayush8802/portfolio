/* ========================================
   CERTIFICATIONS.JS - Certifications Modal
======================================== */

(function() {
    'use strict';

    // ========== CERTIFICATE MODAL FUNCTIONALITY ==========
    const certCards = document.querySelectorAll('.cert-card');
    const modal = document.getElementById('cert-modal');
    const modalImage = modal?.querySelector('.modal-image');
    const modalClose = modal?.querySelector('.modal-close');
    const modalOverlay = modal?.querySelector('.modal-overlay');

    // Open modal
    certCards.forEach(card => {
        const viewBtn = card.querySelector('.view-cert-btn');
        const certImage = card.querySelector('.cert-image img');
        
        if (viewBtn && certImage) {
            viewBtn.addEventListener('click', () => {
                const imageSrc = certImage.getAttribute('src');
                const imageAlt = certImage.getAttribute('alt');
                
                if (modal && modalImage) {
                    modalImage.setAttribute('src', imageSrc);
                    modalImage.setAttribute('alt', imageAlt);
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });

    // Close modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    // ========== CARD HOVER EFFECTS ==========
    certCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('✅ Certifications.js loaded');
})();

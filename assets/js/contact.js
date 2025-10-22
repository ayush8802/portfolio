/* ========================================
   CONTACT.JS - Contact Form Functionality
======================================== */

(function() {
    'use strict';

    // ========== FORM VALIDATION & SUBMISSION ==========
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.querySelector('.form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validate
            if (!validateForm(formData)) {
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.form-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                btnText.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
            
            // For real implementation, use:
            /*
            try {
                const response = await fetch('YOUR_API_ENDPOINT', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    showStatus('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    showStatus('Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                showStatus('Network error. Please try again.', 'error');
            } finally {
                btnText.textContent = originalText;
                submitBtn.disabled = false;
            }
            */
        });
    }
    
    // ========== FORM VALIDATION ==========
    function validateForm(data) {
        let isValid = true;
        
        // Name validation
        if (data.name.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        } else {
            clearError('name');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        } else {
            clearError('email');
        }
        
        // Subject validation
        if (data.subject.length < 3) {
            showError('subject', 'Subject must be at least 3 characters');
            isValid = false;
        } else {
            clearError('subject');
        }
        
        // Message validation
        if (data.message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        } else {
            clearError('message');
        }
        
        return isValid;
    }
    
    // ========== ERROR HANDLING ==========
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorSpan = field.parentElement.querySelector('.form-error');
        
        field.classList.add('error');
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }
    }
    
    function clearError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorSpan = field.parentElement.querySelector('.form-error');
        
        field.classList.remove('error');
        if (errorSpan) {
            errorSpan.style.display = 'none';
        }
    }
    
    // ========== STATUS MESSAGE ==========
    function showStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            formStatus.style.display = 'block';
            
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
    
    // ========== REAL-TIME VALIDATION ==========
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const data = {};
            data[this.id] = this.value.trim();
            
            if (this.id === 'name' && this.value.length > 0) {
                if (this.value.length < 2) {
                    showError(this.id, 'Name must be at least 2 characters');
                } else {
                    clearError(this.id);
                }
            }
            
            if (this.id === 'email' && this.value.length > 0) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    showError(this.id, 'Please enter a valid email');
                } else {
                    clearError(this.id);
                }
            }
        });
        
        input.addEventListener('focus', function() {
            clearError(this.id);
        });
    });

    console.log('✅ Contact.js loaded');
})();

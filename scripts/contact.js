// contact.js
// Handles contact form submission UI behavior.
// Exports:
// - initContact(): attaches a submit handler to `.contact-form` that
//   currently shows a confirmation alert and resets the form.
// Usage: import initContact from './contact.js'; call on DOMContentLoaded.

export function initContact() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const submitButton = contactForm.querySelector('button[type="submit"]');

    const feedback = contactForm.querySelector('.contact-form-feedback');

    const showFeedback = (message, type = 'success') => {
        if (!feedback) return;

        feedback.textContent = message;
        feedback.classList.remove('contact-form-feedback--success', 'contact-form-feedback--error');
        feedback.classList.add(`contact-form-feedback--${type}`, 'contact-form-feedback--visible');

        clearTimeout(feedback.hideTimeout);
        feedback.hideTimeout = window.setTimeout(() => {
            feedback.classList.remove('contact-form-feedback--visible');
        }, 6000);
    };

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        if (formData.get('botcheck')) {
            return;
        }

        const originalButtonText = submitButton?.textContent || 'Send Message';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending…';
        }

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.message || response.statusText || 'Unable to send message.';
                throw new Error(errorMessage);
            }

            showFeedback('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Contact form submission failed:', error);
            showFeedback(`Sorry, your message could not be sent. ${error.message || 'Please try again later.'}`, 'error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}

export default initContact;

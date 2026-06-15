// cta.js
// Handles the primary Call-To-Action button behavior.
// Exports:
// - initCTA(): wires the `.cta-button` to smooth-scroll to `#contact`.
// Usage: import initCTA from './cta.js'; call on DOMContentLoaded.

export function initCTA() {
    const ctaButton = document.querySelector('.cta-button');

    if (!ctaButton) return;

    ctaButton.addEventListener('click', () => {
        const contact = document.querySelector('#contact');
        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });
}

export default initCTA;

// animations.js
// Sets up simple reveal animations for `.skill-item` and `.project-card` using
// the Intersection Observer API.
// Exports:
// - initAnimations(): initializes observer and applies inline transition styles.
// Usage: import initAnimations from './animations.js'; call on DOMContentLoaded.

export function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-item, .project-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

export default initAnimations;

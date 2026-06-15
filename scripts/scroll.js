// scroll.js
// Handles smooth scrolling for internal anchor links and updates the active
// navigation link color based on scroll position.
// Exports:
// - initSmoothScrollAndActiveNav(): attaches click handlers for smooth scroll
//   and a scroll listener to set the active nav link.
// Usage: import initSmoothScrollAndActiveNav from './scroll.js'; call on DOMContentLoaded.

export function initSmoothScrollAndActiveNav() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const sectionId = href.substring(1);
            const section = document.getElementById(sectionId);

            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    document.querySelectorAll('.nav-link').forEach(l => l.style.color = 'var(--text-dark)');
                    link.style.color = 'var(--primary-color)';
                }
            }
        });
    });

    // If the page was opened with a hash (e.g. file://.../index.html#home),
    // browsers may jump to the anchor before JS runs. Re-scroll smoothly
    // after load to override the jump and provide a consistent experience.
    if (window.location.hash) {
        // Delay slightly to ensure browser jump has completed.
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                try {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } catch (err) {
                    // Some older engines may not support smooth in this call; fall back.
                    target.scrollIntoView();
                }
            }
        }, 60);
    }
}

export default initSmoothScrollAndActiveNav;

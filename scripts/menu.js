// menu.js
// Responsible for mobile navigation menu behavior.
// Exports:
// - initMenu(): sets up the hamburger toggle and ensures the
//   nav menu closes when a nav link is clicked.
// Usage: import initMenu from './menu.js'; call on DOMContentLoaded.

export function initMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

export default initMenu;

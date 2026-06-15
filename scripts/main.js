// main.js
// Module entrypoint: imports smaller modules and initializes them on
// DOMContentLoaded. Keeps bootstrapping logic in a single place.
// No exports — this file is intended to be loaded as an app entry module.

import initMenu from './menu.js';
import initCTA from './cta.js';
import initContact from './contact.js';
import initAnimations from './animations.js';
import initSmoothScrollAndActiveNav from './scroll.js';

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initCTA();
    initContact();
    initAnimations();
    initSmoothScrollAndActiveNav();
});

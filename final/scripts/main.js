import { setupFooter, setupHamburgerMenu, setActiveNav } from './utils.js';
import { initHomePage } from './home.js';
import { initJoinPage } from './join.js';

document.addEventListener('DOMContentLoaded', () => {
    // Functions that run on every page
    setupFooter();
    setupHamburgerMenu();
    setActiveNav();

    // Page-specific initializations
    if (document.querySelector('.img-container')) {
        initHomePage();
    }
    
    if (document.querySelector('.join-placeholder')) {
        initJoinPage();
    }
});
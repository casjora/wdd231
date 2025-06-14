export function setupFooter() {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
}

export function setupHamburgerMenu() {
    const mainnav = document.querySelector('.navigation');
    const hammbutton = document.querySelector('#menu');

    hammbutton.addEventListener('click', () => {
        mainnav.classList.toggle('show');
        hammbutton.classList.toggle('show');
    });
}

export function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navigation a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}
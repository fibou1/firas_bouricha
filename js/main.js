document.addEventListener("DOMContentLoaded", function () {
    const components = [
        { id: 'nav-container', url: 'templates/nav.html' },
        { id: 'hero-container', url: 'templates/hero.html' },
        { id: 'about-container', url: 'templates/about.html' },
        { id: 'skills-container', url: 'templates/skills.html' },
        { id: 'projects-container', url: 'templates/projects.html' },
        { id: 'contact-container', url: 'templates/contact.html' },
        { id: 'footer-container', url: 'templates/footer.html' }
    ];

    const fetchPromises = components.map(component =>
        fetch(component.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const container = document.getElementById(component.id);
                if (!container) {
                    throw new Error(`Missing container #${component.id}`);
                }
                container.innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${component.url}:`, error))
    );

    function setupMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (!menuButton || !mobileMenu) {
            return;
        }

        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!isExpanded));
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    Promise.all(fetchPromises).then(() => {
        setupMobileMenu();

        if (window.AOS) {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        }
    });
});

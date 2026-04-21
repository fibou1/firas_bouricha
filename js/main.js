document.addEventListener("DOMContentLoaded", function () {
    const components = [
        { id: 'nav-container', url: 'templates/nav.html' },
        { id: 'hero-container', url: 'templates/hero.html' },
        { id: 'about-container', url: 'templates/about.html' },
        { id: 'skills-container', url: 'templates/skills.html' },
        { id: 'projects-container', url: 'templates/projects.html' },
        { id: 'contact-container', url: 'templates/contact.html' },
        { id: 'footer-container', url: 'templates/footer.html' },
        { id: 'toast-container', url: 'templates/toast.html' }
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

    function setupMentorToast() {
        const toast = document.getElementById('mentor-toast');
        if (!toast) {
            return;
        }

        const discussButton = document.getElementById('toast-discuss');
        const ignoreButton = document.getElementById('toast-ignore');
        const closeButton = document.getElementById('toast-close');
        let isClosing = false;

        const hideToast = () => {
            if (isClosing) {
                return;
            }

            isClosing = true;
            toast.classList.remove('opacity-100', 'translate-y-0');
            toast.classList.add('opacity-0', 'translate-y-6');

            window.setTimeout(() => {
                toast.classList.add('hidden');
            }, 500);
        };

        window.setTimeout(() => {
            toast.classList.remove('hidden');

            requestAnimationFrame(() => {
                toast.classList.remove('opacity-0', 'translate-y-6');
                toast.classList.add('opacity-100', 'translate-y-0');
            });
        }, 2000);

        [ignoreButton, closeButton].forEach(button => {
            if (!button) {
                return;
            }

            button.addEventListener('click', event => {
                event.preventDefault();
                hideToast();
            });
        });

        if (discussButton) {
            discussButton.addEventListener('click', event => {
                event.preventDefault();
                hideToast();

                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return;
                }

                window.location.hash = 'contact';
            });
        }
    }

    Promise.all(fetchPromises).then(() => {
        setupMobileMenu();
        setupMentorToast();

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

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

    components.forEach(component => {
        fetch(component.url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(component.id).innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${component.url}:`, error));
    });
});

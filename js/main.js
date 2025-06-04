// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation and footer links
    document.querySelectorAll('nav a, .footer-legal a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle language switching
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('href');
            if (lang) {
                window.location.href = lang;
            }
        });
    });
}); 
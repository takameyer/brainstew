// Smooth scrolling and navigation handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation and footer links
    document.querySelectorAll('nav a, .footer-legal a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a hash link (section), do smooth scroll
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 60, // Offset for fixed header
                        behavior: 'smooth'
                    });
                    // Update URL hash without scrolling
                    history.pushState(null, null, href);
                }
            }
            // Otherwise, let the browser handle the navigation (for imprint page)
        });
    });

    // Handle language switching
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('href');
            const currentHash = window.location.hash;
            
            // If we're on the imprint page
            if (window.location.pathname.includes('imprint')) {
                window.location.href = lang + 'imprint/';
            } else {
                // For main page, preserve the section
                window.location.href = lang + (currentHash || '');
            }
        });
    });

    // Highlight current section in navigation
    function updateActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
    // Update active section on page load
    updateActiveSection();

    // If there's a hash in the URL on page load, scroll to it
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

    // Photo gallery lightbox functionality
    const galleryImages = document.querySelectorAll('.photo-gallery-item img');

    if (galleryImages.length > 0) {
        // Create lightbox element
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-content" alt="">
            <div class="lightbox-nav">
                <button class="lightbox-prev">&#10094;</button>
                <button class="lightbox-next">&#10095;</button>
            </div>
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('.lightbox-content');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        let currentIndex = 0;

        // Open lightbox on image click
        galleryImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                currentIndex = index;
                openLightbox(img.src, img.alt);
            });
        });

        function openLightbox(src, alt) {
            lightbox.style.display = 'flex';
            lightboxImg.src = src;
            lightboxImg.alt = alt;
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
            lightboxImg.alt = galleryImages[currentIndex].alt;
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
            lightboxImg.alt = galleryImages[currentIndex].alt;
        }

        // Close lightbox
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Navigation
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrev();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNext();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') showPrev();
                if (e.key === 'ArrowRight') showNext();
            }
        });
    }
}); 
document.addEventListener('DOMContentLoaded', () => {
    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Theme switcher functionality
    const themeSwitcher = document.getElementById('theme-switcher');
    function setTheme(theme) {
        document.body.classList.remove('theme-turquoise', 'theme-purple', 'theme-pink', 'theme-dark-black', 'theme-neon-green');
        document.body.classList.add(`theme-${theme}`);
    }
    setTheme(themeSwitcher.value);
    themeSwitcher.addEventListener('change', (e) => setTheme(e.target.value));

    // Smooth scroll for hero button
    const accessButton = document.querySelector('.hero-content button');
    if (accessButton) {
        accessButton.addEventListener('click', () => {
            document.querySelector('#personal').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Accomplishment Gallery Functionality
    const folders = document.querySelectorAll('.folder');
    const galleryPages = document.querySelectorAll('.gallery-page');
    const backButtons = document.querySelectorAll('.back-button');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeLightbox = document.querySelector('#lightbox .close');
    const prevLightboxButton = document.querySelector('#lightbox .prev');
    const nextLightboxButton = document.querySelector('#lightbox .next');
    const certificateViewer = document.getElementById('certificate-viewer');
    const certificateViewerImage = document.querySelector('.certificate-viewer-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const images = document.querySelectorAll('#image-gallery img');
    let currentImageIndex = 0;

    // Open Gallery Pages
    folders.forEach(folder => {
        folder.addEventListener('click', () => {
            const targetId = folder.getAttribute('data-target');
            galleryPages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Back Button Functionality
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            galleryPages.forEach(page => page.classList.remove('active'));
            lightbox.classList.add('hidden');
            certificateViewer.classList.add('hidden');
        });
    });

    // Open lightbox on image click
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            lightbox.classList.remove('hidden');
            updateLightboxImage();
        });
    });

    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });

    // Previous image in lightbox
    prevLightboxButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    });

    // Next image in lightbox
    nextLightboxButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
    });

    // Update lightbox content
    function updateLightboxImage() {
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
        lightboxCaption.textContent = images[currentImageIndex].getAttribute('data-caption') || images[currentImageIndex].alt;
    }

    // Certificate Gallery Viewer
    let currentCertIndex = 0;
    const certificates = document.querySelectorAll('#certificate-gallery img');
    certificates.forEach((cert, index) => {
        cert.addEventListener('click', () => {
            currentCertIndex = index;
            certificateViewer.classList.remove('hidden');
            updateCertificateImage();
        });
    });

    const closeCertificate = document.querySelector('#certificate-viewer .close');
    const certPrevButton = document.querySelector('#certificate-viewer .prev');
    const certNextButton = document.querySelector('#certificate-viewer .next');

    closeCertificate.addEventListener('click', () => {
        certificateViewer.classList.add('hidden');
    });

    certPrevButton.addEventListener('click', () => {
        currentCertIndex = (currentCertIndex - 1 + certificates.length) % certificates.length;
        updateCertificateImage();
    });

    certNextButton.addEventListener('click', () => {
        currentCertIndex = (currentCertIndex + 1) % certificates.length;
        updateCertificateImage();
    });

    function updateCertificateImage() {
        certificateViewerImage.src = certificates[currentCertIndex].src;
        certificateViewerImage.alt = certificates[currentCertIndex].alt;
    }

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.add('hidden');
            certificateViewer.classList.add('hidden');
        }
    });

    // Video Carousel
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevVidButton = document.querySelector('.carousel-control.prev');
    const nextVidButton = document.querySelector('.carousel-control.next');
    let carouselIndex = 0; // Renamed to avoid conflict

    function updateCarousel() {
        const offset = -carouselIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }

    prevVidButton.addEventListener('click', () => {
        carouselIndex = (carouselIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    });

    nextVidButton.addEventListener('click', () => {
        carouselIndex = (carouselIndex + 1) % carouselItems.length;
        updateCarousel();
    });

// Typing Animation for Future Interface
const visionItems = document.querySelectorAll('.vision-list li');
console.log('Vision items found:', visionItems.length); // Debug log
const typingSpeed = 15;
let delay = 0;

visionItems.forEach((item) => {
    const textLength = item.textContent.length;
    const duration = textLength * typingSpeed;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const animationName = isMobile ? 'typing-mobile' : 'typing';
    item.style.animation = `${animationName} ${duration}ms steps(${textLength}, end) forwards, blink 0.75s step-end infinite`;
    item.style.animationDelay = `${delay}ms`;
    item.style.clipPath = 'inset(0 100% 0 0)'; // Ensure text is hidden initially
    delay += duration + 500;
});

// Reapply animation on window resize
window.addEventListener('resize', () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    let delay = 0;
    visionItems.forEach((item) => {
        const textLength = item.textContent.length;
        const duration = textLength * typingSpeed;
        const animationName = isMobile ? 'typing-mobile' : 'typing';
        // Reset clip-path to hide text before reapplying animation
        item.style.clipPath = 'inset(0 100% 0 0)';
        item.style.animation = 'none'; // Clear previous animation
        // Force reflow to restart animation
        item.offsetHeight;
        item.style.animation = `${animationName} ${duration}ms steps(${textLength}, end) forwards, blink 0.75s step-end infinite`;
        item.style.animationDelay = `${delay}ms`;
        delay += duration + 500;
    });
});
});
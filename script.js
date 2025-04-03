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


    const accessButton = document.querySelector('.hero-content button');
    if (accessButton) {
        accessButton.addEventListener('click', () => {
            document.querySelector('#personal').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

    // Accomplishment Gallery Functionality
    const folders = document.querySelectorAll('.folder');
    const galleryPages = document.querySelectorAll('.gallery-page');
    const backButtons = document.querySelectorAll('.back-button');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeLightbox = document.querySelector('.close');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const certificateViewer = document.getElementById('certificate-viewer');
    const certificateViewerImage = document.querySelector('.certificate-viewer-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');  // Select caption element
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
    
        // Previous image
        prevButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        });
    
        // Next image
        nextButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateLightboxImage();
        });
    
        // Update lightbox content
        function updateLightboxImage() {
            lightboxImage.src = images[currentImageIndex].src;
            lightboxImage.alt = images[currentImageIndex].alt;
            // Set caption to data-caption if available, otherwise use alt
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

    const closeCertificate = document.querySelector('.certificate-viewer .close');
    closeCertificate.addEventListener('click', () => {
        certificateViewer.classList.add('hidden');
    });

    const certPrevButton = document.querySelector('.certificate-viewer .prev');
    const certNextButton = document.querySelector('.certificate-viewer .next');
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
    document.addEventListener('DOMContentLoaded', () => {
        const carouselInner = document.querySelector('.carousel-inner');
        const carouselItems = document.querySelectorAll('.carousel-item');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        let currentIndex = 0;
    
        // Update carousel position
        function updateCarousel() {
            const offset = -currentIndex * 100; // Shift by 100% per slide
            carouselInner.style.transform = `translateX(${offset}%)`;
        }
    
        // Previous button
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            updateCarousel();
        });
    
        // Next button
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            updateCarousel();
        });
    
    });

    document.addEventListener('DOMContentLoaded', () => {
    // Initial goals array
    let goals = [
        { text: 'Learn React', status: 'pending' },
        { text: 'Build a portfolio', status: 'completed' },
        { text: 'Master JavaScript', status: 'in-progress' }
    ];

    const goalList = document.querySelector('.goal-list');

    // Render goals to the page
    function renderGoals() {
        goalList.innerHTML = '';
        goals.forEach((goal, index) => {
            const li = document.createElement('li');
            li.className = `goal-item ${goal.status}`;
            li.innerHTML = `
                <span>${goal.text}</span>
                <button class="edit">Edit</button>
                <button class="status">Mark as ${goal.status === 'completed' ? 'pending' : 'completed'}</button>
            `;
            goalList.appendChild(li);
        });
    }

    renderGoals();

    // Handle clicks on the goal list
    goalList.addEventListener('click', (e) => {
        const li = e.target.parentElement;
        const index = Array.from(goalList.children).indexOf(li);

        if (e.target.classList.contains('edit')) {
            const span = li.querySelector('span');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            input.style.fontFamily = 'Caveat, cursive';
            input.style.fontSize = '1.5em';
            li.replaceChild(input, span);
            input.focus();

            input.addEventListener('blur', () => {
                goals[index].text = input.value.trim() || goals[index].text; // Prevent empty text
                renderGoals();
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') input.blur();
            });
        } else if (e.target.classList.contains('status')) {
            goals[index].status = goals[index].status === 'completed' ? 'pending' : 'completed';
            renderGoals();
        }
    });

    // Back button navigation
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', () => {
        window.history.back();
    });
});

 // Typing Animation for Future Interface
 const visionItems = document.querySelectorAll('.vision-list li');
 const typingSpeed = 12; // Milliseconds per character (approx. 5-6 chars/sec)
 let delay = 0;

 visionItems.forEach((item, index) => {
     const textLength = item.textContent.length;
     const duration = textLength * typingSpeed; // Duration based on text length

     // Set animation properties
     item.style.animation = `typing ${duration}ms steps(${textLength}, end) forwards, blink 0.75s step-end infinite`;
     item.style.animationDelay = `${delay}ms`;

     // Increase delay for the next item
     delay += duration + 500; // Add a 500ms pause between items
 });
// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Section with ID ${sectionId} not found.`);
    }
}

// Input and Textarea Focus Effects
document.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.boxShadow = '0 0 10px #00ff99';
    });
    element.addEventListener('blur', () => {
        element.style.boxShadow = 'none';
    });
});
// Function to load gallery items for a specific page
function loadGalleryPage(galleryElement, items, page, itemsPerPage) {
    galleryElement.innerHTML = ''; // Clear the gallery

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = items.slice(startIndex, endIndex);

    pageItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${item.src}" alt="${item.alt}">
                    <div class="learn-more">Learn More</div>
                </div>
                <div class="card-back">
                    <h3>${item.title}</h3>
                    <p>${item.description.replace(/\n/g, '<br>')}</p>
                    <p class="price">${item.price}</p>
                </div>
            </div>
        `;
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        galleryElement.appendChild(card);
    });
}

// Function to initialize pagination
function initializePagination(galleryElement, paginationElement, items, itemsPerPage) {
    const pageButtons = paginationElement.querySelectorAll('.page-btn');
    let currentPage = 1;

    // Load the first page by default
    loadGalleryPage(galleryElement, items, currentPage, itemsPerPage);
    pageButtons[0].classList.add('active');

    // Add click event listeners to pagination buttons
    pageButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentPage = index + 1;
            loadGalleryPage(galleryElement, items, currentPage, itemsPerPage);

            // Update active button
            pageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Initialize Galleries with Pagination
document.addEventListener('DOMContentLoaded', () => {
    const portraitGallery = document.getElementById('portrait-gallery');
    const sketchGallery = document.getElementById('sketch-gallery');
    const portraitPagination = document.getElementById('portrait-pagination');
    const sketchPagination = document.getElementById('sketch-pagination');

    if (portraitGallery && sketchGallery && portraitPagination && sketchPagination) {
        // Portrait Data
        const portraits = [
            {
                src: 'Images/Portraites/Art1.jpg',
                alt: 'Art 1',
                title: 'Din avec la main dans le miroir et jupe rouge',
                description: 'Editions: Edition of 50\nDimensions: 20 x 24in. (50.8 x 61cm)',
                price: '$7,500.00 USD'
            },
            {
                src: 'Images/Portraites/Art2.jpg',
                alt: 'Art 2',
                title: 'Another Artwork',
                description: 'Editions: Edition of 100\nDimensions: 24 x 36in. (61 x 91.4cm)',
                price: '$5,000.00 USD'
            },
            {
                src: 'Images/Portraites/Art3.jpg',
                alt: 'Art 3',
                title: 'Third Artwork',
                description: 'Editions: Edition of 75\nDimensions: 18 x 24in. (45.7 x 61cm)',
                price: '$6,000.00 USD'
            },
            {
                src: 'Images/Portraites/Art4.jpg',
                alt: 'Art 4',
                title: 'Fourth Artwork',
                description: 'Editions: Edition of 50\nDimensions: 20 x 24in. (50.8 x 61cm)',
                price: '$7,500.00 USD'
            },
            {
                src: 'Images/Portraites/Art4.jpg',
                alt: 'Art 4',
                title: 'Fourth Artwork',
                description: 'Editions: Edition of 50\nDimensions: 20 x 24in. (50.8 x 61cm)',
                price: '$7,500.00 USD'
            },
            // Add more portraits as needed
        ];

        // Sketch Data
        const sketches = [
            {
                src: 'Images/Sketches/Sketch1.jpg',
                alt: 'Sketch 1',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch2.jpg',
                alt: 'Sketch 2',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch3.jpg',
                alt: 'Sketch 3',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch4.jpg',
                alt: 'Sketch 4',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch5.jpg',
                alt: 'Sketch 4',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            // Add more sketches as needed
        ];

        // Initialize pagination for portraits and sketches
        initializePagination(portraitGallery, portraitPagination, portraits, 4);
        initializePagination(sketchGallery, sketchPagination, sketches, 4);
    } else {
        console.error('Gallery or pagination elements not found.');
    }
});

// Function to load gallery items for a specific page
function loadGalleryPage(galleryElement, items, page, itemsPerPage) {
    galleryElement.innerHTML = ''; // Clear the gallery

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = items.slice(startIndex, endIndex);

    pageItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${item.src}" alt="${item.alt}">
                    <div class="learn-more">Learn More</div>
                </div>
                <div class="card-back">
                    <h3>${item.title}</h3>
                    <p>${item.description.replace(/\n/g, '<br>')}</p>
                    <p class="price">${item.price}</p>
                </div>
            </div>
        `;
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        galleryElement.appendChild(card);
    });
}

// Function to initialize pagination
function initializePagination(galleryElement, paginationElement, items, itemsPerPage) {
    const pageButtons = paginationElement.querySelectorAll('.page-btn');
    let currentPage = 1;

    // Load the first page by default
    loadGalleryPage(galleryElement, items, currentPage, itemsPerPage);
    pageButtons[0].classList.add('active');

    // Add click event listeners to pagination buttons
    pageButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentPage = index + 1;
            loadGalleryPage(galleryElement, items, currentPage, itemsPerPage);

            // Update active button
            pageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Initialize Galleries with Pagination
document.addEventListener('DOMContentLoaded', () => {
    const portraitGallery = document.getElementById('portrait-gallery');
    const sketchGallery = document.getElementById('sketch-gallery');
    const portraitPagination = document.getElementById('portrait-pagination');
    const sketchPagination = document.getElementById('sketch-pagination');

    if (portraitGallery && sketchGallery && portraitPagination && sketchPagination) {
        // Portrait Data
        const portraits = [
            {
                src: 'Images/Portraites/Art1.jpg',
                alt: 'Art 1',
                title: 'Din avec la main dans le miroir et jupe rouge',
                description: 'Editions: Edition of 50\nDimensions: 20 x 24in. (50.8 x 61cm)',
                price: '$7,500.00 USD'
            },
            {
                src: 'Images/Portraites/Art2.jpg',
                alt: 'Art 2',
                title: 'Another Artwork',
                description: 'Editions: Edition of 100\nDimensions: 24 x 36in. (61 x 91.4cm)',
                price: '$5,000.00 USD'
            },
            {
                src: 'Images/Portraites/Art3.jpg',
                alt: 'Art 3',
                title: 'Third Artwork',
                description: 'Editions: Edition of 75\nDimensions: 18 x 24in. (45.7 x 61cm)',
                price: '$6,000.00 USD'
            },
            {
                src: 'Images/Portraites/art4.jpg',
                alt: 'Art 4',
                title: 'Fourth Artwork',
                description: 'Editions: Edition of 50\nDimensions: 20 x 24in. (50.8 x 61cm)',
                price: '$7,500.00 USD'
            },
            {
                src: 'Images/Portraites/Art5.jpg',
                alt: 'Art 5',
                title: 'Third Artwork',
                description: 'Editions: Edition of 75\nDimensions: 18 x 24in. (45.7 x 61cm)',
                price: '$6,000.00 USD'
            },
            {
                src: 'Images/Portraites/Art6.jpg',
                alt: 'Art 6',
                title: 'Fourth Artwork',
                description: 'Editions: Edition of 50\nDimensions: 20 x 24in. (50.8 x 61cm)',
                price: '$7,500.00 USD'
            },
            {
                src: 'Images/Portraites/Art7.jpg',
                alt: 'Art 7',
                title: 'Third Artwork',
                description: 'Editions: Edition of 75\nDimensions: 18 x 24in. (45.7 x 61cm)',
                price: '$6,000.00 USD'
            },
            {
                src: 'Images/Portraites/Art8.jpg',
                alt: 'Art 8',
                title: 'Fourth Artwork',
                description: 'Editions: Edition of 50\nDimensions: 20 x 24in. (50.8 x 61cm)',
                price: '$7,500.00 USD'
            },
            // Add more portraits as needed
        ];

        // Sketch Data
        const sketches = [
            {
                src: 'Images/Sketches/Sketch1.jpg',
                alt: 'Sketch 1',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch2.jpg',
                alt: 'Sketch 2',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch3.jpg',
                alt: 'Sketch 3',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch4.jpg',
                alt: 'Sketch 4',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch5.jpg',
                alt: 'Sketch 5',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch6.jpg',
                alt: 'Sketch 6',
                title: 'Setting The Captives Free',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch7.jpg',
                alt: 'Sketch 7',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch8.jpg',
                alt: 'Sketch 8',
                title: 'Sketch Title',
                description: 'Editions: Edition of 50\nDimensions: 12 x 16in. (30.5 x 40.6cm)',
                price: 'R250.00 ZAR'
            },
            // Add more sketches as needed
        ];

        // Initialize pagination for portraits and sketches
        initializePagination(portraitGallery, portraitPagination, portraits, 2);
        initializePagination(sketchGallery, sketchPagination, sketches, 2);
    } else {
        console.error('Gallery or pagination elements not found.');
    }
});


// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Send the form data using EmailJS
        emailjs.sendForm('service_84ipqde', 'template_cplsco9', this)
            .then(() => {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            }, (error) => {
                console.error('Failed to send message:', error);
                alert('Something went wrong. Please try again. Error: ' + error.text);
            });
    });
} else {
    console.error('Contact form element not found.');
}

// Three.js Particle Animation
let particleCamera; // Declare particleCamera in the global scope
const particleCanvas = document.getElementById('particle-animation');
if (particleCanvas) {
    const particleScene = new THREE.Scene();
    particleCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Assign to global variable
    const particleRenderer = new THREE.WebGLRenderer({ alpha: true });
    particleRenderer.setSize(window.innerWidth, window.innerHeight);
    particleCanvas.appendChild(particleRenderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;

    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

        colors[i * 3] = Math.random();
        colors[i * 3 + 1] = Math.random();
        colors[i * 3 + 2] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particleScene.add(particles);

    particleCamera.position.z = 5;

    // Animation loop for particles
    function animateParticles() {
        requestAnimationFrame(animateParticles);

        particles.rotation.x += 0.001;
        particles.rotation.y += 0.001;

        particleRenderer.render(particleScene, particleCamera);
    }
    animateParticles();
} else {
    console.error('Particle animation canvas element not found.');
}

// Three.js 3D Cube Animation
let cubeCamera; // Declare cubeCamera in the global scope
const cubeCanvas = document.getElementById('3d-animation');
if (cubeCanvas) {
    const cubeScene = new THREE.Scene();
    cubeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Assign to global variable
    const cubeRenderer = new THREE.WebGLRenderer({ alpha: true });
    cubeRenderer.setSize(window.innerWidth, window.innerHeight);
    cubeCanvas.appendChild(cubeRenderer.domElement);

    // Add a futuristic geometry (e.g., a rotating cube)
    const cubeGeometry = new THREE.BoxGeometry();
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cubeScene.add(cube);

    cubeCamera.position.z = 5;

    // Animation loop for cube
    function animateCube() {
        requestAnimationFrame(animateCube);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cubeRenderer.render(cubeScene, cubeCamera);
    }
    animateCube();
}

// Handle window resize for both animations
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update particle animation
    if (particleCamera && particleRenderer) {
        particleCamera.aspect = width / height;
        particleCamera.updateProjectionMatrix();
        particleRenderer.setSize(width, height);
    }

    // Update cube animation
    if (cubeCamera && cubeRenderer) {
        cubeCamera.aspect = width / height;
        cubeCamera.updateProjectionMatrix();
        cubeRenderer.setSize(width, height);
    }
});

// Toggle Menu Function
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const burger = document.getElementById('burger');

    if (navLinks && burger) {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    } else {
        console.error('Navigation links or burger element not found.');
    }
}

// Add Event Listener to Burger Icon
const burger = document.getElementById('burger');
if (burger) {
    burger.addEventListener('click', toggleMenu);
} else {
    console.error('Burger element not found.');
}

// Function to handle the fixed background and fade-out effect
function handleFixedBackground() {
    const aboutSection = document.querySelector('.about');
    const aboutBackground = document.querySelector('.about-background');
    const gallerySection = document.querySelector('.portfolio');

    if (aboutSection && aboutBackground && gallerySection) {
        const aboutHeight = aboutSection.offsetHeight;
        const galleryOffset = gallerySection.offsetTop;

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;

            // Calculate opacity based on scroll position
            const opacity = 1 - (scrollPosition / aboutHeight);

            // Ensure opacity stays between 0 and 1
            aboutBackground.style.opacity = Math.max(0, Math.min(1, opacity));

            // Fix the background to the About section
            if (scrollPosition <= aboutHeight) {
                aboutBackground.style.position = 'fixed';
                aboutBackground.style.top = '0';
            } else {
                aboutBackground.style.position = 'absolute';
                aboutBackground.style.top = `${aboutHeight}px`;
            }
        });
    }
}

// Initialize the fixed background effect
document.addEventListener('DOMContentLoaded', handleFixedBackground);

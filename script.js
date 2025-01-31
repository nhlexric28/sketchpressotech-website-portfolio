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
// Dynamic Content Loading
const portraitGallery = document.getElementById('portrait-gallery');
const sketchGallery = document.getElementById('sketch-gallery');

if (portraitGallery && sketchGallery) {
const portraits = [
    { src: 'Images/Portraites/Art1.jpg', alt: 'Art 1' },
    { src: 'Images/Portraites/Art2.jpg', alt: 'Art 2' },
    { src: 'Images/Portraites/Art3.jpg', alt: 'Art 3' },
    { src: 'Images/Portraites/art4.jpg', alt: 'Art 4' },
];
    const sketches = [
        { src: 'Images/Sketches/Sketch1.jpg', alt: 'Sketch 1' },
        { src: 'Images/Sketches/Sketch2.jpg', alt: 'Sketch 2' },
        { src: 'Images/Sketches/Sketch3.jpg', alt: 'Sketch 3' },
        { src: 'Images/Sketches/Sketch4.jpg', alt: 'Sketch 4' },
    ];

    // Load Portraits
    portraits.forEach(art => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${art.src}" alt="${art.alt}">`;
        card.addEventListener('click', () => openLightbox(art.src, art.alt));
        portraitGallery.appendChild(card);
    });

    // Load Sketches
    sketches.forEach(sketch => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${sketch.src}" alt="${sketch.alt}">`;
        card.addEventListener('click', () => openLightbox(sketch.src, sketch.alt));
        sketchGallery.appendChild(card);
    });
} else {
    console.error('Portrait or Sketch gallery element not found.');
}

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close');

function openLightbox(src, alt) {
    lightbox.style.display = 'block';
    lightboxImg.src = src;
    lightboxCaption.textContent = alt;
}

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg && e.target !== lightboxCaption) {
        lightbox.style.display = 'none';
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
                alert('Something went wrong. Please try again.');
            });
    });
} else {
    console.error('Contact form element not found.');
}

// Three.js Particle Animation
const particleCanvas = document.getElementById('particle-animation');
if (particleCanvas) {
    const particleScene = new THREE.Scene();
    const particleCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
const cubeCanvas = document.getElementById('3d-animation');
if (cubeCanvas) {
    const cubeScene = new THREE.Scene();
    const cubeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
} else {
    console.error('3D animation canvas element not found.');
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

        // Animate burger icon
        burger.classList.toggle('toggle');
    } else {
        console.error('Navigation links or burger element not found.');
    }
    toggleMenu();
}

// Add Event Listener to Burger Icon
const burger = document.getElementById('burger');
if (burger) {
    burger.addEventListener('click', toggleMenu);
} else {
    console.error('Burger element not found.');
}

// JavaScript for Particle Animation
const aboutParticlesCanvas = document.getElementById('about-particles');
if (aboutParticlesCanvas) {
    const ctx = aboutParticlesCanvas.getContext('2d');
    aboutParticlesCanvas.width = window.innerWidth;
    aboutParticlesCanvas.height = document.querySelector('.about').offsetHeight;

    let particles = [];

    class Particle {
        constructor(x, y, size, color, velocity) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.velocity = velocity;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            if (this.size > 0.2) this.size -= 0.1;
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * aboutParticlesCanvas.width;
            const y = Math.random() * aboutParticlesCanvas.height;
            const color = '#00ffcc';
            const velocity = {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5
            };
            particles.push(new Particle(x, y, size, color, velocity));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, aboutParticlesCanvas.width, aboutParticlesCanvas.height);
        particles.forEach((particle, index) => {
            particle.draw();
            particle.update();
            if (particle.size <= 0.2) {
                particles.splice(index, 1);
            }
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        aboutParticlesCanvas.width = window.innerWidth;
        aboutParticlesCanvas.height = document.querySelector('.about').offsetHeight;
        init();
    });
} else {
    console.error('About particles canvas element not found.');
}

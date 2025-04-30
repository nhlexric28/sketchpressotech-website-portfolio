// Global Variables
let particleCamera, particleRenderer;
let cubeCamera, cubeRenderer;
const setupNavigation = () => {
    document.addEventListener('DOMContentLoaded', function() {
        // Navigation Setup
        const header = document.querySelector('header');
        const burger = document.getElementById('burger');
        const navLinks = document.getElementById('nav-links');
        const navItems = document.querySelectorAll('.nav-links li');
        const aboutSection = document.getElementById('about');
        
        // Check if elements exist
        if (!header || !burger || !navLinks || !aboutSection) return;
    
        // Enhanced toggle menu function (combining old and new functionality)
        const toggleMenu = () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            burger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
            
            // From old code - handle body scroll and item animations
            if (window.innerWidth <= 768) {
                document.body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
                
                if (!navLinks.classList.contains('active')) {
                    navItems.forEach(item => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(0px)';
                        item.style.transitionDelay = '0s';
                    });
                }
            }
        };
    
        // Close menu when clicking outside (combined functionality)
        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    
        // Burger click event
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    
        // Close menu on link click (mobile) - from old code
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMenu();
                }
            });
        });
    
        // Enhanced scroll behavior (combining old and new functionality)
        window.addEventListener('scroll', () => {
            const isScrolled = window.scrollY > 50;
            header.classList.toggle('scrolled', isScrolled);
    
            if (window.innerWidth > 768) {
                // New functionality - check if we've scrolled past about section
                const aboutPosition = aboutSection.getBoundingClientRect().top;
                const showBurger = isScrolled && aboutPosition < window.innerHeight * 0.5;
                
                burger.style.display = showBurger ? 'flex' : 'none';
                navLinks.style.display = showBurger ? 'none' : 'flex';
                
                // Ensure menu is closed when scrolling
                if (isScrolled) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    
        // Combined responsive behavior function
        const handleResponsiveBehavior = () => {
            if (window.innerWidth <= 768) {
                // Mobile behavior (from old code)
                burger.style.display = 'flex';
                navLinks.style.display = 'none';
                document.body.style.overflow = '';
            } else {
                // Desktop behavior (enhanced with about section detection)
                const isScrolled = window.scrollY > 50;
                const aboutPosition = aboutSection.getBoundingClientRect().top;
                const showBurger = isScrolled && aboutPosition < window.innerHeight * 0.5;
                
                burger.style.display = showBurger ? 'flex' : 'none';
                navLinks.style.display = showBurger ? 'none' : 'flex';
                
                // Reset menu state on resize
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        };
    
        // Resize behavior
        window.addEventListener('resize', handleResponsiveBehavior);
    
        // Initial load
        handleResponsiveBehavior();
    });
    
    // Smooth scrolling function (unchanged)
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error(`Section with ID ${sectionId} not found.`);
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', setupNavigation);


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Section with ID ${sectionId} not found.`);
    }
}

// Input and Textarea Focus Effects
function setupFormFocusEffects() {
    document.querySelectorAll('input, textarea').forEach(element => {
        element.addEventListener('focus', () => {
            element.style.boxShadow = '0 0 10px #00ff99';
        });
        element.addEventListener('blur', () => {
            element.style.boxShadow = 'none';
        });
    });
}

// Gallery Functions
function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${item.src}" alt="${item.alt}">
                <div class="image-overlay"></div>
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
    return card;
}

function loadGalleryPage(galleryElement, items, page, itemsPerPage) {
    galleryElement.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = items.slice(startIndex, endIndex);

    pageItems.forEach(item => {
        galleryElement.appendChild(createCard(item));
    });
}

function initializePagination(galleryElement, paginationElement, items, itemsPerPage) {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const pageButtons = paginationElement.querySelectorAll('.page-btn');

    // Hide empty page buttons
    pageButtons.forEach((button, index) => {
        if (index >= totalPages) {
            button.classList.add('empty-page');
        }
    });

    let currentPage = 1;
    loadGalleryPage(galleryElement, items, currentPage, itemsPerPage);

    // Activate first page button if it exists
    if (pageButtons.length > 0 && !pageButtons[0].classList.contains('empty-page')) {
        pageButtons[0].classList.add('active');
    }

    pageButtons.forEach((button, index) => {
        if (index < totalPages) {
            button.addEventListener('click', () => {
                currentPage = index + 1;
                loadGalleryPage(galleryElement, items, currentPage, itemsPerPage);
                pageButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        }
    });
}

function setupGalleries() {
    const portraitGallery = document.getElementById('portrait-gallery');
    const sketchGallery = document.getElementById('sketch-gallery');
    const portraitPagination = document.getElementById('portrait-pagination');
    const sketchPagination = document.getElementById('sketch-pagination');

    if (portraitGallery && sketchGallery && portraitPagination && sketchPagination) {
        const portraits = [
            {
                src: 'Images/Portraites/Art1.jpg',
                alt: 'Art 1',
                title: 'Din avec la main dans le miroir et jupe rouge',
                description: 'Editions: Edition of 50\nDimensions: 20 x 24in. (50.8 x 61cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Portraites/Art2.jpg',
                alt: 'Art 2',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
            },
            {
                src: 'Images/Portraites/Art3.jpg',
                alt: 'Art 3',
                title: 'Din avec la main dans le miroir et jupe rouge',
                description: 'Editions: Edition of 50\nDimensions: 20 x 24in. (50.8 x 61cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Portraites/Art4.jpg',
                alt: 'Art 4',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
            }, {
                src: 'Images/Portraites/Art5.jpg',
                alt: 'Art 5',
                title: 'Din avec la main dans le miroir et jupe rouge',
                description: 'Editions: Edition of 50\nDimensions: 20 x 24in. (50.8 x 61cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Portraites/Art6.jpg',
                alt: 'Art 6',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
            }, {
                src: 'Images/Portraites/Art7.jpg',
                alt: 'Art 7',
                title: 'Din avec la main dans le miroir et jupe rouge',
                description: 'Editions: Edition of 50\nDimensions: 20 x 24in. (50.8 x 61cm)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Portraites/Art8.jpg',
                alt: 'Art 8',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
            },
            // Add all your portrait data here
        ];

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
                title: 'Sketch Title',
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

            // Add all your sketch data here
        ];

        initializePagination(portraitGallery, portraitPagination, portraits, 2);
        initializePagination(sketchGallery, sketchPagination, sketches, 2);
    }
}

// Form Submission
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            emailjs.sendForm('service_84ipqde', 'template_cplsco9', this)
                .then(() => {
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset();
                }, (error) => {
                    console.error('Failed to send message:', error);
                    alert('Something went wrong. Please try again. Error: ' + error.text);
                });
        });
    }
}

// Three.js Animations
function setupParticleAnimation() {
    const particleCanvas = document.getElementById('particle-animation');
    if (particleCanvas) {
        const particleScene = new THREE.Scene();
        particleCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        particleRenderer = new THREE.WebGLRenderer({ alpha: true });
        particleRenderer.setSize(window.innerWidth, window.innerHeight);
        particleCanvas.appendChild(particleRenderer.domElement);

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

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            particles.rotation.x += 0.001;
            particles.rotation.y += 0.001;
            particleRenderer.render(particleScene, particleCamera);
        }
        animateParticles();
    }
}

function setupCubeAnimation() {
    const cubeCanvas = document.getElementById('3d-animation');
    if (cubeCanvas) {
        const cubeScene = new THREE.Scene();
        cubeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        cubeRenderer = new THREE.WebGLRenderer({ alpha: true });
        cubeRenderer.setSize(window.innerWidth, window.innerHeight);
        cubeCanvas.appendChild(cubeRenderer.domElement);

        const cubeGeometry = new THREE.BoxGeometry();
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubeScene.add(cube);
        cubeCamera.position.z = 5;

        function animateCube() {
            requestAnimationFrame(animateCube);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cubeRenderer.render(cubeScene, cubeCamera);
        }
        animateCube();
    }
}

// Handle window resize for animations
function handleWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (particleCamera && particleRenderer) {
        particleCamera.aspect = width / height;
        particleCamera.updateProjectionMatrix();
        particleRenderer.setSize(width, height);
    }

    if (cubeCamera && cubeRenderer) {
        cubeCamera.aspect = width / height;
        cubeCamera.updateProjectionMatrix();
        cubeRenderer.setSize(width, height);
    }
}

// Navigation Functions
function setupBurgerMenu() {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');
    const sideNav = document.getElementById('side-nav');

    if (burger && navLinks && sideNav) {
        burger.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
            // console.log('Burger menu clicked!');
            sideNav.style.display = burger.classList.contains('toggle') ? 'flex' : 'none';
        });


        // Close menu when clicking outside
        document.addEventListener('click', function () {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
            sideNav.style.display = 'none';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                sideNav.style.display = 'none';
            });
        });

    }
}

// Scroll Functions
function handleScroll() {
    const homeSection = document.getElementById('home');
    const homeSectionHeight = homeSection.offsetHeight;
    const header = document.querySelector('header');
    const scrollToTopButton = document.getElementById('scroll-to-top');
    const footerScrollTop = document.querySelector('footer .scroll-to-top');

    if (window.scrollY > homeSectionHeight) {
        header.classList.add('scrolled');
        if (scrollToTopButton) scrollToTopButton.style.display = 'block';
        if (footerScrollTop) footerScrollTop.style.display = 'inline-block';
    } else {
        header.classList.remove('scrolled');
        if (scrollToTopButton) scrollToTopButton.style.display = 'none';
        if (footerScrollTop) footerScrollTop.style.display = 'none';
    }
}

function setupScrollToTop() {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Fixed Background Effect
function handleFixedBackground() {
    const aboutSection = document.querySelector('.about');
    const aboutBackground = document.querySelector('.about-background');
    const gallerySection = document.querySelector('.portfolio');

    if (aboutSection && aboutBackground && gallerySection) {
        const aboutHeight = aboutSection.offsetHeight;
        const galleryOffset = gallerySection.offsetTop;

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const opacity = 1 - (scrollPosition / aboutHeight);
            aboutBackground.style.opacity = Math.max(0, Math.min(1, opacity));

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

// Initialize connection menu
function setupConnectionMenu() {
    const connectFloat = document.getElementById('connect-float');
    if (connectFloat) {
        connectFloat.addEventListener('click', function (e) {
            e.stopPropagation();
            const links = document.getElementById('connect-links');
            if (links) {
                links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
            }
        });

        // Close when clicking outside
        document.addEventListener('click', function () {
            const links = document.getElementById('connect-links');
            if (links) {
                links.style.display = 'none';
            }
        });
    }

    // Footer scroll-to-top button
    const footerScrollTop = document.querySelector('footer .scroll-to-top');
    if (footerScrollTop) {
        footerScrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Remove empty page buttons
function removeEmptyPages() {
    document.querySelectorAll('.empty-page').forEach(btn => {
        btn.style.display = 'none';
    });
}

// Main Initialization Function
function init() {
    setupFormFocusEffects();
    removeEmptyPages();
    setupGalleries();
    setupContactForm();
    setupParticleAnimation();
    setupCubeAnimation();
    setupBurgerMenu();
    setupScrollToTop();
    handleFixedBackground();
    setupConnectionMenu();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleWindowResize);

    // Initial check
    handleScroll();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', init, setupNavigation);

document.addEventListener('DOMContentLoaded', function () {
    // Set up Three.js scene
    const container = document.getElementById('cube-container');
    const aboutSection = document.getElementById('about');
    const closeBtn = document.querySelector('.close-btn');

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Create cube with different colored faces
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0x00cc99, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0x0099cc, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0x00cccc, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0x00aacc, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0x00bbcc, transparent: true, opacity: 0.8 })
    ];

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Position camera
    camera.position.z = 5;

    // Animation variables
    let isAnimating = false;
    let isAboutOpen = false;

    // Animation function
    function animate() {
        requestAnimationFrame(animate);

        if (!isAnimating) {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', function () {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });

    // Cube click handler
    container.addEventListener('click', function () {
        toggleAbout();
    });

    // Close button handler
    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleAbout();
    });

    function toggleAbout() {
        if (isAnimating) return;

        isAnimating = true;

        if (isAboutOpen) {
            // Close about section
            gsap.to(cube.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            });

            gsap.to(aboutSection, {
                opacity: 0,
                duration: 0.5,
                onComplete: function () {
                    aboutSection.classList.remove('visible');
                    isAnimating = false;
                }
            });
        } else {
            // Open about section
            gsap.to(cube.scale, {
                x: 0.1,
                y: 0.1,
                z: 0.1,
                duration: 0.8,
                ease: "back.in(1.2)",
                onComplete: function () {
                    aboutSection.classList.add('visible');
                    gsap.to(aboutSection, {
                        opacity: 1,
                        duration: 0.5,
                        onComplete: function () {
                            isAnimating = false;
                        }
                    });
                }
            });
        }

        isAboutOpen = !isAboutOpen;
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

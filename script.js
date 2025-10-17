(function () {
    emailjs.init("FZrBrnusKTV0ryBEj");
})();

// Global Variables
let particleCamera, particleRenderer;
let cubeCamera, cubeRenderer;

// Main Initialization Function
function init() {
    setupContactForm();
    setupTechSymbols();
    setupNavigation();
    setupFormFocusEffects();
    setupGalleries();
    setupParticleAnimation();
    setupBurgerMenu();
    setupScrollToTop();
    setupConnectionMenu();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleWindowResize);

    // Initial check
    handleScroll();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            emailjs.sendForm("service_kh0o3v5", "template_b1ghizq", this)
                .then(() => {
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset();
                }, (error) => {
                    console.error('Failed to send message:', error);
                    alert('Something went wrong. Please try again.');
                });
        });
    }
}

function setupTechSymbols() {
    const symbolCanvas = document.getElementById('symbol-container');
    if (symbolCanvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, symbolCanvas.offsetWidth / symbolCanvas.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(symbolCanvas.offsetWidth, symbolCanvas.offsetHeight);
        symbolCanvas.appendChild(renderer.domElement);

           // Handle window resize for centering
        function handleResize() {
            camera.aspect = symbolCanvas.offsetWidth / symbolCanvas.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(symbolCanvas.offsetWidth, symbolCanvas.offsetHeight);
            
            // Center content on mobile
            if (window.innerWidth <= 768) {
                symbolCanvas.style.display = 'flex';
                symbolCanvas.style.justifyContent = 'center';
                symbolCanvas.style.alignItems = 'center';
            }
        }
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Create a group to hold the laptop and symbols
        const group = new THREE.Group();
        scene.add(group);

        // Create laptop
        const laptopBase = new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.3, 2),
            new THREE.MeshPhongMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.8 })
        );
        laptopBase.position.y = -0.5;

        const laptopScreen = new THREE.Mesh(
            new THREE.BoxGeometry(2.8, 0.1, 1.8),
            new THREE.MeshPhongMaterial({ color: 0x00cc99, transparent: true, opacity: 0.8 })
        );

        laptopScreen.position.set(0, 0.3, 0.9);
        laptopScreen.rotation.x = -Math.PI / 4;

        group.add(laptopBase);
        group.add(laptopScreen);

        // Array to hold symbols
        let symbols = [];

        // Function to create a symbol
        const createSymbol = (char, position) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 100;
            canvas.height = 64;
            context.fillStyle = '#009999';
            context.font = '40px Arial';
            context.fillText(char, 10, 60);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide
            });
            const plane = new THREE.Mesh(
                new THREE.PlaneGeometry(0.5, 0.5),
                material
            );
            plane.position.copy(position);
            group.add(plane);
            symbols.push(plane);
        };

        // Create coding symbols
        const symbolChars = ['{', '🌐', '<', '🛜', '/', ';', '⚙️', '</>', '🧑🏼‍💻', '</>'];
        for (let i = 0; i < 10; i++) {
            const position = new THREE.Vector3(
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6
            );
            createSymbol(symbolChars[i], position);
        }

        // Position camera
        camera.position.z = 6;

        // Animation variables
        let isAnimating = false;
        let isAboutOpen = false;

        // Animation function
        function animate() {
            requestAnimationFrame(animate);
            if (!isAnimating) {
                group.rotation.y += 0.01;
                symbols.forEach(symbol => {
                    symbol.rotation.z += 0.02;
                });
            }
            renderer.render(scene, camera);
        }
        animate();

        const aboutSection = document.getElementById('about');

        function toggleAbout() {
            if (isAnimating) return;
            isAnimating = true;

            isAboutOpen = !isAboutOpen;

            if (isAboutOpen) {
                gsap.to(group.scale, {
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
            } else {
                gsap.to(group.scale, {
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
            }
        }

        // Symbol click handler
        symbolCanvas.addEventListener('click', function () {
            toggleAbout();
        });

        // Close button handler
        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                toggleAbout();
            });
        }
    }
}

function setupNavigation() {
    document.addEventListener('DOMContentLoaded', function () {
        // Navigation Setup
        const header = document.querySelector('header');
        const burger = document.getElementById('burger');
        const navLinks = document.getElementById('nav-links');
        const navItems = document.querySelectorAll('.nav-links li');
        const aboutSection = document.getElementById('about');
        const sideNav = document.getElementById('side-nav');

        // Enhanced toggle menu function
        const toggleMenu = () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            burger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
            
            if (window.innerWidth <= 768) {
                document.body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
            }
        };

        // Close menu when clicking outside
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

        // Close menu on link click (mobile)
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMenu();
                }
            });
        });

        // Enhanced scroll behavior
        window.addEventListener('scroll', () => {
            const isScrolled = window.scrollY > 50;
            header.classList.toggle('scrolled', isScrolled);

            if (window.innerWidth > 768) {
                // Desktop behavior
                burger.style.display = isScrolled ? 'flex' : 'none';
                navLinks.style.display = isScrolled ? 'none' : 'flex';
                sideNav.style.display = isScrolled ? 'flex' : 'none';

                // Toggle side nav on burger click
                burger.addEventListener('click', () => {
                    if (isScrolled) {
                        sideNav.classList.toggle('active');
                    }
                });
            }
        });

        // Combined responsive behavior function
        const handleResponsiveBehavior = () => {
            if (window.innerWidth <= 768) {
                // Mobile behavior
                burger.style.display = 'flex';
                navLinks.style.display = 'none';
                sideNav.style.display = 'none';
                document.body.style.overflow = '';
            } else {
                // Desktop behavior
                const isScrolled = window.scrollY > 50;
                burger.style.display = isScrolled ? 'flex' : 'none';
                navLinks.style.display = isScrolled ? 'none' : 'flex';
                sideNav.style.display = isScrolled ? 'flex' : 'none';
            }
        };

        // Resize behavior
        window.addEventListener('resize', handleResponsiveBehavior);

        // Initial load
        handleResponsiveBehavior();
    });

    // Smooth scrolling function
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error(`Section with ID ${sectionId} not found.`);
        }
    }
}

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

// UPDATED createCard function with individual buttons
function createCard(item) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-front">
            <img src="${item.src}" alt="${item.alt}">
        </div>
        <div class="card-back">
            <h3>${item.title}</h3>
            <p>${item.description.replace(/\n/g, '<br>')}</p>
            <p class="price">${item.price}</p>
        </div>
    `;
    
    const flipButton = document.createElement('button');
    flipButton.className = 'flip-btn';
    flipButton.textContent = 'Learn More';
    
    // Add click event to flip the specific card
    flipButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        card.classList.toggle('flipped');
        
        // Update button text and style
        if (card.classList.contains('flipped')) {
            flipButton.textContent = 'Go Back';
            flipButton.classList.add('go-back');
        } else {
            flipButton.textContent = 'Learn More';
            flipButton.classList.remove('go-back');
        }
    });
    
    cardContainer.appendChild(card);
    cardContainer.appendChild(flipButton);
    
    return cardContainer;
}

// UPDATED setupGalleries function
function setupGalleries() {
    const portraitGallery = document.getElementById('portrait-gallery');
    const sketchGallery = document.getElementById('sketch-gallery');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const portraitPagination = document.getElementById('portrait-pagination');
    const sketchPagination = document.getElementById('sketch-pagination');
    
    const itemsPerPage = 2;

    if (portraitGallery && sketchGallery && tabButtons.length > 0) {
        const portraits = [
            {
                src: 'Images/Portraites/Art1.jpg',
                alt: 'Art 1',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Portraites/Art2.jpg',
                alt: 'Art 2',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Portraites/Art3.jpg',
                alt: 'Art 3',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Portraites/Art4.jpg',
                alt: 'Art 4',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
                price: 'R250.00 ZAR'
            }, {
                src: 'Images/Portraites/Art5.jpg',
                alt: 'Art 5',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Portraites/Art6.jpg',
                alt: 'Art 6',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
                price: 'R250.00 ZAR'
            }, {
                src: 'Images/Portraites/Art7.jpg',
                alt: 'Art 7',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Portraites/Art8.jpg',
                alt: 'Art 8',
                title: 'Custom Sketch Portrait',
                description: 'Hand-drawn, personalized, and made with love(Get Yourself your own just for R250)',
                price: 'R250.00 ZAR'
            },
        ];

        const sketches = [
            {
                src: 'Images/Sketches/Sketch1.jpg',
                alt: 'Sketch 1',
                title: 'Recycling',
                description: 'Doodling the sweet symphony of a stick figure mastering recycling goals while enjoying chocolate serenity',
                price: 'R200.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch2.jpg',
                alt: 'Sketch 2',
                title: 'Motherly love',
                description: "Nature's beauty revealed in each gentle pencil stroke.",
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch3.jpg',
                alt: 'Sketch 3',
                title: 'Emptiness',
                description: 'Empty headed? Nah, just empty bottled! What do you fill your head with for inspiration?',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch4.jpg',
                alt: 'Sketch 4',
                title: 'Birds Chirping',
                description: 'Nature in rythm',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch5.jpg',
                alt: 'Sketch 5',
                title: 'Hope',
                description: 'You Are My Only Hope HASHEM KING OF THE UNIVERSE',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch6.jpg',
                alt: 'Sketch 6',
                title: 'Break Free',
                description: 'For the peace of Israel',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch7.jpg',
                alt: 'Sketch 7',
                title: 'Switch On',
                description: 'Just switch on the light in you!',
                price: 'R250.00 ZAR'
            },
            {
                src: 'Images/Sketches/Sketch8.jpg',
                alt: 'Sketch 8',
                title: 'Eye',
                description: 'A glimpse into my eye!',
                price: 'R300.00 ZAR'
            },
        ];

        // Function to render gallery with pagination
        function renderGallery(gallery, items, page) {
            gallery.innerHTML = '';
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageItems = items.slice(startIndex, endIndex);
            
            pageItems.forEach(item => {
                const card = createCard(item);
                gallery.appendChild(card);
            });
        }
        
        // Function to set active page
        function setActivePage(pagination, page) {
            const buttons = pagination.querySelectorAll('.page-btn');
            buttons.forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.page) === page);
            });
        }
        
        // Initialize galleries
        renderGallery(portraitGallery, portraits, 1);
        renderGallery(sketchGallery, sketches, 1);
        setActivePage(portraitPagination, 1);
        setActivePage(sketchPagination, 1);
        
        // Pagination event handlers
        portraitPagination.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-btn')) {
                const page = parseInt(e.target.dataset.page);
                renderGallery(portraitGallery, portraits, page);
                setActivePage(portraitPagination, page);
            }
        });
        
        sketchPagination.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-btn')) {
                const page = parseInt(e.target.dataset.page);
                renderGallery(sketchGallery, sketches, page);
                setActivePage(sketchPagination, page);
            }
        });
        
        // Tab switching
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active tab
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Show the corresponding gallery
                const category = button.dataset.category;
                const galleries = document.querySelectorAll('.gallery-container');
                
                if (category === 'portrait') {
                    galleries[0].style.display = 'flex';
                    galleries[1].style.display = 'none';
                } else if (category === 'sketch') {
                    galleries[0].style.display = 'none';
                    galleries[1].style.display = 'flex';
                }
            });
        });
    }
}

function setupParticleAnimation() {
    const particleCanvas = document.getElementById('particle-animation');
    if (particleCanvas) {
        const particleScene = new THREE.Scene();
        particleCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        particleRenderer = new THREE.WebGLRenderer({ alpha: true });
        particleRenderer.setSize(window.innerWidth, window.innerHeight);
        particleCanvas.appendChild(particleRenderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 9000;
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

function setupBurgerMenu() {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');
    const sideNav = document.getElementById('side-nav');

    if (burger && navLinks && sideNav) {
        burger.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            
            if (window.innerWidth > 768) {
                sideNav.classList.toggle('active');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!burger.contains(e.target) && !navLinks.contains(e.target) && !sideNav.contains(e.target)) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                sideNav.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a, .side-nav a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                sideNav.classList.remove('active');
            });
        });
    }
}

function handleScroll() {
    const homeSection = document.getElementById('home');
    const homeSectionHeight = homeSection.offsetHeight;
    const header = document.querySelector('header');
    const scrollToTopButton = document.getElementById('scroll-to-top');

    if (window.scrollY > homeSectionHeight) {
        header.classList.add('scrolled');
        if (scrollToTopButton) scrollToTopButton.style.display = 'block';
    } else {
        header.classList.remove('scrolled');
        if (scrollToTopButton) scrollToTopButton.style.display = 'none';
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
}

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

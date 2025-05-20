// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // ===== Intersection Observer for Scroll Animations =====
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // ===== Smooth Scrolling for Navigation =====
    const smoothScroll = () => {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const yOffset = -80; // Header height + small buffer
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
                        mobileMenu.classList.add('translate-x-full');
                        document.body.classList.remove('overflow-hidden');
                    }
                }
            });
        });
    };
    
    // ===== Animated Counter for Stats =====
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-counter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const units = entry.target.getAttribute('data-units') || '';
                    const duration = 1500; // Animation duration in ms
                    const frameRate = 1000 / 60; // 60fps
                    const totalFrames = Math.round(duration / frameRate);
                    let frame = 0;
                    
                    const counter = setInterval(() => {
                        frame++;
                        const progress = frame / totalFrames;
                        const currentCount = Math.round(progress * target);
                        
                        if (frame === totalFrames) {
                            entry.target.textContent = target.toLocaleString() + units;
                            clearInterval(counter);
                        } else {
                            entry.target.textContent = currentCount.toLocaleString();
                        }
                    }, frameRate);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    };
    
    // ===== Portfolio Hover Effect =====
    const portfolioHoverEffect = () => {
        const portfolioItems = document.querySelectorAll('#portfolio-section .bg-white');
        
        portfolioItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                item.addEventListener('mouseenter', function() {
                    img.style.transform = 'scale(1.05)';
                    img.style.transition = 'transform 0.5s ease';
                });
                
                item.addEventListener('mouseleave', function() {
                    img.style.transform = 'scale(1)';
                });
            }
        });
    };
    
    // ===== Testimonial Slider =====
    const testimonialSlider = () => {
        const testimonialsContainer = document.querySelector('#testimonials-section .grid');
        if (!testimonialsContainer) return;
        
        // Get testimonials
        const testimonials = testimonialsContainer.querySelectorAll('.bg-white');
        if (testimonials.length <= 1) return;
        
        let currentIndex = 0;
        let autoSlideInterval;
        
        // Create navigation buttons
        const navContainer = document.createElement('div');
        navContainer.className = 'flex justify-center mt-8 space-x-2';
        
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.className = 'bg-white text-purple-600 hover:bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors';
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.className = 'bg-white text-purple-600 hover:bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors';
        
        navContainer.appendChild(prevButton);
        navContainer.appendChild(nextButton);
        testimonialsContainer.parentNode.appendChild(navContainer);
        
        const updateSlide = (index) => {
            // Only implement slider on mobile
            if (window.innerWidth < 768) {
                testimonials.forEach(testimonial => {
                    testimonial.style.display = 'none';
                });
                testimonials[index].style.display = 'block';
                testimonials[index].classList.add('testimonial-enter');
            } else {
                // Display all on larger screens
                testimonials.forEach(testimonial => {
                    testimonial.style.display = 'block';
                    testimonial.classList.remove('testimonial-enter');
                });
            }
        };
        
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlide(currentIndex);
        };
        
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateSlide(currentIndex);
        };
        
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
        
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
        
        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            if (window.innerWidth < 768) {
                autoSlideInterval = setInterval(nextSlide, 5000);
            }
        };
        
        // Check screen size and initialize accordingly
        const checkScreenSize = () => {
            if (window.innerWidth < 768) {
                updateSlide(currentIndex);
                resetAutoSlide();
                navContainer.style.display = 'flex';
            } else {
                testimonials.forEach(testimonial => {
                    testimonial.style.display = 'block';
                });
                clearInterval(autoSlideInterval);
                navContainer.style.display = 'none';
            }
        };
        
        // Initial check
        checkScreenSize();
        
        // Listen for window resize
        window.addEventListener('resize', checkScreenSize);
    };
    
    // ===== Sticky Header Animation =====
    const stickyHeaderAnimation = () => {
        const header = document.querySelector('header');
        let lastScrollY = 0;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 150) {
                header.classList.add('shadow-md', 'py-2', 'bg-white');
                header.classList.remove('bg-white/80');
            } else {
                header.classList.remove('shadow-md', 'py-2');
                header.classList.add('bg-white/80');
            }
            
            // Hide header when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 300) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            header.style.transition = 'transform 0.3s ease, background-color 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease';
            lastScrollY = currentScrollY;
        });
    };
    
    // ===== CTA Button Pulse Animation =====
    const ctaButtonAnimation = () => {
        const ctaButtons = document.querySelectorAll('#cta-section a, #hero-section a.bg-purple-500');
        
        ctaButtons.forEach(button => {
            button.classList.add('animate-pulse-slow');
        });
    };
    
    // ===== Add CSS for Animations =====
    const addAnimationStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .animate-on-scroll.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .delay-200 { transition-delay: 0.2s; }
            .delay-400 { transition-delay: 0.4s; }
            .delay-600 { transition-delay: 0.6s; }
            .delay-800 { transition-delay: 0.8s; }
            
            .animate-pulse-slow {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
            
            header {
                transition: transform 0.3s ease;
            }
            
            .testimonial-enter {
                animation: slideIn 0.5s ease forwards;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            /* Add image transitions */
            #portfolio-section img {
                transition: transform 0.5s ease;
            }

            /* Responsive placeholder for missing images */
            .missing-img {
                background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    };
    
    // ===== Apply animate-on-scroll classes to elements =====
    const applyAnimationClasses = () => {
        // Hero Section
        const heroContent = document.querySelector('#hero-section .md\\:w-1\\/2:first-child');
        if (heroContent) {
            heroContent.classList.add('animate-on-scroll');
        }
        
        // Portfolio Items
        const portfolioItems = document.querySelectorAll('#portfolio-section .bg-white');
        portfolioItems.forEach((item, index) => {
            item.classList.add('animate-on-scroll');
            item.classList.add(`delay-${Math.min(index * 200, 800)}`);
        });
        
        // How It Works Steps
        const howItWorksSteps = document.querySelectorAll('#how-it-works .text-center');
        howItWorksSteps.forEach((step, index) => {
            step.classList.add('animate-on-scroll');
            step.classList.add(`delay-${Math.min(index * 200, 800)}`);
        });
        
        // Testimonials
        const testimonials = document.querySelectorAll('#testimonials-section .bg-white');
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.add('animate-on-scroll');
            testimonial.classList.add(`delay-${Math.min(index * 200, 800)}`);
        });
        
        // CTA Section
        const ctaSection = document.querySelector('#cta-section .container');
        if (ctaSection) {
            ctaSection.classList.add('animate-on-scroll');
        }
    };
    
    // ===== Convert stats to animated counters =====
    const setupStatCounters = () => {
        const statElements = document.querySelectorAll('#hero-section h2.text-4xl');
        
        statElements.forEach(stat => {
            const value = stat.textContent.trim();
            
            // Extract numeric value and units
            let numericValue;
            let units = '';
            
            if (value.includes('+')) {
                const parts = value.split('+');
                numericValue = parts[0].trim();
                units = '+';
            } else if (value.includes('%')) {
                const parts = value.split('%');
                numericValue = parts[0].trim();
                if (numericValue.startsWith('up to ')) {
                    numericValue = numericValue.replace('up to ', '');
                    units = '%';
                } else {
                    units = '%';
                }
            } else if (value.includes('jt')) {
                const parts = value.split('jt');
                numericValue = parts[0].trim();
                units = 'jt+';
            } else {
                numericValue = value;
            }
            
            // Remove any commas or non-numeric characters for parsing
            numericValue = numericValue.replace(/[^0-9.]/g, '');
            
            // Set up for animation
            stat.setAttribute('data-target', numericValue);
            stat.classList.add('stat-counter');
            stat.textContent = '0';
            
            // Add units back
            stat.setAttribute('data-units', units);
        });
    };

    // ===== Add preloader animation =====
    const addPreloader = () => {
        const preloader = document.createElement('div');
        preloader.className = 'fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-500';
        preloader.id = 'preloader';
        
        const spinner = document.createElement('div');
        spinner.className = 'w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin';
        
        preloader.appendChild(spinner);
        document.body.appendChild(preloader);
        
        // Hide preloader after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.pointerEvents = 'none';
                    // Remove after animation completes
                    setTimeout(() => {
                        preloader.remove();
                    }, 500);
                }, 500);
            }, 500);
        });
    };

    // ===== Handle missing images =====
    const handleMissingImages = () => {
        const imgElements = document.querySelectorAll('img');
        
        imgElements.forEach(img => {
            img.onerror = function() {
                // Create a placeholder div
                const placeholder = document.createElement('div');
                placeholder.className = 'missing-img';
                placeholder.textContent = 'Image';
                placeholder.style.height = img.height ? `${img.height}px` : '100%';
                
                // Replace the img with the placeholder
                if (img.parentNode) {
                    img.parentNode.replaceChild(placeholder, img);
                }
            };
        });
    };
    
    // Initialize all animations
    addAnimationStyles();
    applyAnimationClasses();
    setupStatCounters();
    addPreloader();
    handleMissingImages();
    
    // Run animations
    animateOnScroll();
    smoothScroll();
    portfolioHoverEffect();
    testimonialSlider();
    stickyHeaderAnimation();
    ctaButtonAnimation();
    animateCounters();
});
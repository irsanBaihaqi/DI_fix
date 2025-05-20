// animations.js - Handling animations and special effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll) effect
    initScrollAnimations();
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Initialize image hover effects
    initImageHoverEffects();
    
    // Initialize floating elements animation
    initFloatingElements();
    
    // Initialize typing animation if element exists
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        initTypingAnimation(typingElement, typingElement.dataset.text || 'Undangan Digital Mewah');
    }
});

// Scroll Animation Function
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-right, .slide-left, .zoom-in');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add specific animation classes based on data attributes
                if (entry.target.dataset.delay) {
                    entry.target.style.animationDelay = `${entry.target.dataset.delay}s`;
                }
                
                if (entry.target.dataset.duration) {
                    entry.target.style.animationDuration = `${entry.target.dataset.duration}s`;
                }
                
                // Unobserve after animating
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Parallax Effect Function
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Image Hover Effects Function
function initImageHoverEffects() {
    const hoverImages = document.querySelectorAll('.hover-zoom');
    
    hoverImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.classList.add('zoomed');
        });
        
        image.addEventListener('mouseleave', function() {
            this.classList.remove('zoomed');
        });
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        // Add different animation delays to create natural effect
        const delay = index * 0.2;
        element.style.animationDelay = `${delay}s`;
        element.classList.add('animate-float');
    });
}

// Typing Animation Function
function initTypingAnimation(element, text) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            
            // Add blinking cursor effect
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            element.appendChild(cursor);
            
            // Start cursor blinking
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }, 100);
}

// Add CSS animation classes for various effects
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS styles for animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            opacity: 1 !important;
            transition: all 0.8s ease;
        }
        
        .fade-in.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .slide-up.animated {
            transform: translateY(0);
        }
        
        .slide-right.animated {
            transform: translateX(0);
        }
        
        .slide-left.animated {
            transform: translateX(0);
        }
        
        .zoom-in.animated {
            transform: scale(1);
        }
        
        .slide-up {
            transform: translateY(50px);
        }
        
        .slide-right {
            transform: translateX(-50px);
        }
        
        .slide-left {
            transform: translateX(50px);
        }
        
        .zoom-in {
            transform: scale(0.9);
        }
        
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        
        .hover-zoom {
            transition: transform 0.5s ease;
            overflow: hidden;
        }
        
        .hover-zoom.zoomed {
            transform: scale(1.05);
        }
        
        .typing-cursor {
            transition: opacity 0.5s;
        }
    `;
    
    document.head.appendChild(style);
    
    // Add animation classes to elements on load
    setTimeout(() => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            // Add staggered animation to each section
            section.style.opacity = '0';
            section.classList.add('fade-in');
            section.dataset.delay = index * 0.2;
            
            // Add animation classes to children elements
            const headings = section.querySelectorAll('h1, h2, h3');
            headings.forEach((heading, i) => {
                heading.classList.add('slide-up');
                heading.dataset.delay = 0.2 + (i * 0.1);
            });
            
            const paragraphs = section.querySelectorAll('p');
            paragraphs.forEach((p, i) => {
                p.classList.add('fade-in');
                p.dataset.delay = 0.4 + (i * 0.1);
            });
            
            const buttons = section.querySelectorAll('a.btn, button');
            buttons.forEach((button, i) => {
                button.classList.add('zoom-in');
                button.dataset.delay = 0.6 + (i * 0.1);
            });
            
            const images = section.querySelectorAll('img');
            images.forEach((image, i) => {
                image.classList.add('fade-in');
                image.dataset.delay = 0.3 + (i * 0.1);
                image.classList.add('hover-zoom');
            });
        });
        
        // Trigger initial animations
        initScrollAnimations();
    }, 200);
});

// Gallery Image Animation
function initGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('gallery-hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('gallery-hover');
        });
    });
}

// Execute gallery animations if gallery exists
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery-grid');
    if (gallery) {
        initGalleryAnimations();
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
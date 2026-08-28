/* =========================================================
   STACKLY SECURITY — VIEWPORT ANIMATIONS TRIGGER
   animations.js
========================================================= */

// Global trigger function to animate all hero elements after preloader exits
function triggerHeroAnimations() {
    const heroSection = document.querySelector('.hero-section, .career-hero, .contact-hero, .services-hero, .about-hero');
    if (heroSection) {
        const reveals = heroSection.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-security-card, .letter-reveal, .image-reveal');
        reveals.forEach(element => {
            element.classList.add('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. STAGGERED LETTER REVEAL INITIALIZATION
    // ---------------------------------------------------------
    function initLetterReveal() {
        const elements = document.querySelectorAll('.letter-reveal');
        elements.forEach(element => {
            const text = element.textContent.trim();
            element.innerHTML = '';
            
            // Split into words to prevent breaking layout flow
            const words = text.split(/\s+/);
            words.forEach((word, wordIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.classList.add('reveal-word');
                wordSpan.style.display = 'inline-block';
                wordSpan.style.whiteSpace = 'nowrap';
                
                // Wrap each letter in a span
                const letters = Array.from(word);
                letters.forEach((char, charIndex) => {
                    const letterSpan = document.createElement('span');
                    letterSpan.classList.add('reveal-char');
                    letterSpan.textContent = char;
                    letterSpan.style.display = 'inline-block';
                    
                    // Stagger: add delays based on word & character position
                    const delay = (wordIndex * 120) + (charIndex * 35);
                    letterSpan.style.transitionDelay = `${delay}ms`;
                    wordSpan.appendChild(letterSpan);
                });
                
                element.appendChild(wordSpan);
                
                // Reinsert spaces between words
                if (wordIndex < words.length - 1) {
                    element.appendChild(document.createTextNode(' '));
                }
            });
        });
    }

    initLetterReveal();

    // ---------------------------------------------------------
    // 2. INTERSECTION OBSERVER FOR SECTION REVEALS
    // ---------------------------------------------------------
    function initSectionReveals() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.12
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Reveal only once
                }
            });
        }, options);

        const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-security-card, .image-reveal, .letter-reveal');
        revealElements.forEach(element => {
            // Hero section animations are triggered explicitly in main.js, so we bypass them here
            const isInHero = element.closest('.hero-section, .career-hero, .contact-hero, .services-hero, .about-hero');
            if (!isInHero) {
                observer.observe(element);
            }
        });
    }

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        initSectionReveals();
    } else {
        // Fallback for older browsers: make everything active immediately
        document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .image-reveal, .letter-reveal').forEach(el => {
            el.classList.add('active');
        });
    }
});

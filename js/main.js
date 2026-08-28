/* =========================================================
   STACKLY SECURITY — ENTRY SCRIPT
   main.js
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. SCROLL PROGRESS & BACK TO TOP BUTTON
    // ---------------------------------------------------------
    const backToTop = document.getElementById('backToTop');
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollEffects() {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Update top scroll progress indicator bar
        if (scrollProgress && documentHeight > 0) {
            const scrollPercent = (scrollTop / documentHeight) * 100;
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        // Handle back-to-top button visibility transition class
        if (backToTop) {
            if (scrollTop > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    // Scroll listener wrapper utilizing requestAnimationFrame for maximum efficiency
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateScrollEffects();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    // Click trigger scroll-up action
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize layout positions
    updateScrollEffects();
});

// ---------------------------------------------------------
// 2. PRELOADER HIDE TRIGGER & ENTRANCE SEQUENCE
// ---------------------------------------------------------
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    function hidePreloader() {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            
            // Allow preloader transition duration (600ms) before introducing hero sections
            setTimeout(() => {
                document.body.classList.add('page-loaded');
                // Trigger hero elements staggered reveals
                if (typeof triggerHeroAnimations === 'function') {
                    triggerHeroAnimations();
                }
            }, 600);
        }
    }

    // Delay a tiny bit for preloader scan visuals to register premium feel
    setTimeout(hidePreloader, 400);
});

// Fail-safe load timeout (prevents website lockouts in case a layout resource hangs)
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
        document.body.classList.add('page-loaded');
        if (typeof triggerHeroAnimations === 'function') {
            triggerHeroAnimations();
        }
    }
}, 2500);



document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = Number(counter.getAttribute("data-target"));
        let current = 0;

        const duration = 1500;
        const increment = target / (duration / 20);

        const updateCounter = () => {

            current += increment;

            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }

        };

        updateCounter();

    });

});

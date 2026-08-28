/* =========================================================
   STACKLY SECURITY — NAVIGATION LOGIC
   navigation.js
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. FIXED HEADER SCROLL STATE
    // ---------------------------------------------------------
    const siteHeader = document.getElementById('siteHeader');
    
    function handleHeaderScroll() {
        if (siteHeader) {
            if (window.scrollY > 20) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Run immediately to establish initial state

    // ---------------------------------------------------------
    // 2. ACTIVE NAVIGATION LINKS HIGHLIGHT
    // ---------------------------------------------------------
    function highlightActiveLinks() {
        const currentPath = window.location.pathname;
        let currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
        
        // Normalize paths (e.g. root '/' resolves to 'index.html')
        if (currentPage === '' || currentPage === '/') {
            currentPage = 'index.html';
        }
        
        // Helper to check if a link matches the current page
        function isLinkActive(href) {
            if (!href) return false;
            const linkPage = href.split('#')[0].split('/').pop();
            return linkPage === currentPage || (currentPage === 'index.html' && linkPage === './');
        }

        // Highlight Desktop Links
        document.querySelectorAll('.desktop-navigation .nav-link').forEach(link => {
            if (isLinkActive(link.getAttribute('href'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Highlight Mobile Sidebar Links
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            if (isLinkActive(link.getAttribute('href'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    highlightActiveLinks();

    // ---------------------------------------------------------
    // 3. MOBILE MENU SIDEBAR CONTROLLER
    // ---------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');

    function openMobileMenu() {
        if (mobileSidebar && mobileOverlay && menuToggle) {
            mobileSidebar.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.classList.add('menu-open');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
    }

    function closeMobileMenu() {
        if (mobileSidebar && mobileOverlay && menuToggle) {
            mobileSidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileSidebar && mobileSidebar.classList.contains('active');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Dismiss mobile menu on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Automatically close mobile menu when a navigation item is clicked
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
});

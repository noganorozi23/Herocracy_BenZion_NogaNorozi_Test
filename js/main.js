/**
 * Main JavaScript for Herocracy
 * Handles accessibility interactions and smooth scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
    initFlipCardsAccessibility();
    initSmoothScroll();
});

/**
 * Ensures flip cards are accessible via keyboard
 * Adds 'flipped' class on click or keyboard activation
 */
function initFlipCardsAccessibility() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Toggle flip on click (especially useful for touch devices)
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
            updateAriaPressed(this);
        });

        // Toggle flip on keyboard activation (Enter or Space)
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent default page scroll on Space
                this.classList.toggle('flipped');
                updateAriaPressed(this);
            }
        });
        
        // Remove flipped state when losing focus
        card.addEventListener('blur', function() {
            this.classList.remove('flipped');
            updateAriaPressed(this);
        });
    });
}

function updateAriaPressed(element) {
    const isFlipped = element.classList.contains('flipped');
    element.setAttribute('aria-pressed', isFlipped);
}

/**
 * Initializes smooth scrolling for anchor links, adjusting for fixed header
 */
function initSmoothScroll() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navbarCollapse = document.getElementById('mainNavbar');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
                
                // Calculate scroll position
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                // Perform scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

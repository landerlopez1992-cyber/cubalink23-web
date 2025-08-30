// ===== GLOBAL VARIABLES =====
let isUserLoggedIn = false;
let currentUser = null;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZE APP =====
function initializeApp() {
    setupNavigation();
    setupSearchTabs();
    setupSmoothScrolling();
    setupMobileMenu();
    checkAuthStatus();
    setupFormSubmissions();
}

// ===== NAVIGATION SETUP =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SEARCH TABS FUNCTIONALITY =====
function setupSearchTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchForms = document.querySelectorAll('.search-form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and forms
            tabButtons.forEach(btn => btn.classList.remove('active'));
            searchForms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            const targetForm = document.getElementById(targetTab);
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// ===== AUTHENTICATION FUNCTIONS =====
function checkAuthStatus() {
    // Check if user is logged in (you can implement your own logic here)
    const token = localStorage.getItem('cubalink23_token');
    
    if (token) {
        isUserLoggedIn = true;
        updateAuthUI();
    } else {
        isUserLoggedIn = false;
        updateAuthUI();
    }
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const accountBtn = document.getElementById('accountBtn');
    
    if (isUserLoggedIn) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (accountBtn) accountBtn.style.display = 'flex';
    } else {
        if (loginBtn) loginBtn.style.display = 'flex';
        if (accountBtn) accountBtn.style.display = 'none';
    }
}

function login(email, password) {
    // Implement your login logic here
    // This is a placeholder for the actual authentication
    console.log('Logging in with:', email, password);
    
    // Simulate successful login
    localStorage.setItem('cubalink23_token', 'dummy_token');
    isUserLoggedIn = true;
    updateAuthUI();
    
    // Redirect to account page or show success message
    window.location.href = 'account.html';
}

function logout() {
    localStorage.removeItem('cubalink23_token');
    isUserLoggedIn = false;
    updateAuthUI();
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// ===== FORM SUBMISSIONS =====
function setupFormSubmissions() {
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // Travel search forms
    const flightForm = document.querySelector('.flight-form');
    if (flightForm) {
        flightForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFlightSearch(this);
        });
    }
    
    const hotelForm = document.querySelector('.hotel-form');
    if (hotelForm) {
        hotelForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleHotelSearch(this);
        });
    }
    
    const carForm = document.querySelector('.car-form');
    if (carForm) {
        carForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCarSearch(this);
        });
    }
}

function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Contact form submitted:', data);
    
    // Show success message
    showNotification('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
    
    // Reset form
    form.reset();
}

function handleFlightSearch(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Flight search:', data);
    
    // Here you would typically make an API call to search flights
    showNotification('Buscando vuelos...', 'info');
}

function handleHotelSearch(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Hotel search:', data);
    
    // Here you would typically make an API call to search hotels
    showNotification('Buscando hoteles...', 'info');
}

function handleCarSearch(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Car search:', data);
    
    // Here you would typically make an API call to search cars
    showNotification('Buscando autos disponibles...', 'info');
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===== PRODUCT INTERACTIONS =====
function addToCart(productId, productName, price) {
    // Implement cart functionality
    console.log('Adding to cart:', productId, productName, price);
    
    // Get existing cart or create new one
    let cart = JSON.parse(localStorage.getItem('cubalink23_cart') || '[]');
    
    // Add product to cart
    cart.push({
        id: productId,
        name: productName,
        price: price,
        quantity: 1,
        addedAt: new Date().toISOString()
    });
    
    // Save cart
    localStorage.setItem('cubalink23_cart', JSON.stringify(cart));
    
    showNotification(`${productName} agregado al carrito`, 'success');
}

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.service-card, .product-card, .car-card, .category-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// ===== LAZY LOADING =====
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== INITIALIZE ADDITIONAL FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    setupScrollEffects();
    setupLazyLoading();
});

// ===== API INTEGRATION PLACEHOLDERS =====
// These functions would be implemented to connect with your backend

async function searchFlights(searchData) {
    try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/flights/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error searching flights:', error);
        throw error;
    }
}

async function searchHotels(searchData) {
    try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/hotels/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error searching hotels:', error);
        throw error;
    }
}

async function searchCars(searchData) {
    try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/cars/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error searching cars:', error);
        throw error;
    }
}

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.Cubalink23 = {
    login,
    logout,
    addToCart,
    showNotification,
    searchFlights,
    searchHotels,
    searchCars
};

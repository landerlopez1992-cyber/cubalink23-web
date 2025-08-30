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
    setupLocationModal();
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

// ===== LOCATION MODAL DATA =====
const cubanProvinces = {
    'pinar-del-rio': {
        name: 'Pinar del Río',
        municipalities: ['Pinar del Río', 'Consolación del Sur', 'San Juan y Martínez', 'San Luis', 'Mantua', 'Minas de Matahambre', 'Viñales', 'La Palma', 'Los Palacios', 'Sandino', 'Guane', 'Candelaria', 'Bahía Honda', 'Artemisa', 'Guanajay', 'Mariel', 'Bauta', 'San Antonio de los Baños', 'Güira de Melena', 'Alquízar', 'Caimito', 'San Cristóbal']
    },
    'artemisa': {
        name: 'Artemisa',
        municipalities: ['Artemisa', 'Bahía Honda', 'Candelaria', 'Mariel', 'Guanajay', 'Bauta', 'San Antonio de los Baños', 'Güira de Melena', 'Alquízar', 'Caimito', 'San Cristóbal']
    },
    'mayabeque': {
        name: 'Mayabeque',
        municipalities: ['San José de las Lajas', 'Batabanó', 'Bejucal', 'Güines', 'Jaruco', 'Madruga', 'Melena del Sur', 'Nueva Paz', 'Quivicán', 'San Nicolás de Bari', 'Santa Cruz del Norte']
    },
    'la-habana': {
        name: 'La Habana',
        municipalities: ['Playa', 'Plaza de la Revolución', 'Centro Habana', 'La Habana Vieja', 'Regla', 'La Habana del Este', 'Guanabacoa', 'San Miguel del Padrón', 'Diez de Octubre', 'Cerro', 'Marianao', 'La Lisa', 'Boyeros', 'Arroyo Naranjo', 'Cotorro']
    },
    'matanzas': {
        name: 'Matanzas',
        municipalities: ['Matanzas', 'Cárdenas', 'Colón', 'Perico', 'Jovellanos', 'Pedro Betancourt', 'Limonar', 'Unión de Reyes', 'Ciénaga de Zapata', 'Jagüey Grande', 'Calimete', 'Los Arabos', 'Martí', 'Varadero']
    },
    'villa-clara': {
        name: 'Villa Clara',
        municipalities: ['Santa Clara', 'Sagua la Grande', 'Placetas', 'Camajuaní', 'Caibarién', 'Remedios', 'Quemado de Güines', 'Encrucijada', 'Cifuentes', 'Santo Domingo', 'Ranchuelo', 'Manicaragua', 'Corralillo']
    },
    'cienfuegos': {
        name: 'Cienfuegos',
        municipalities: ['Cienfuegos', 'Aguada de Pasajeros', 'Rodas', 'Palmira', 'Lajas', 'Cruces', 'Cumanayagua', 'Abreus']
    },
    'sancti-spiritus': {
        name: 'Sancti Spíritus',
        municipalities: ['Sancti Spíritus', 'Trinidad', 'Cabaiguán', 'Fomento', 'Yaguajay', 'Jatibonico', 'La Sierpe']
    },
    'ciego-de-avila': {
        name: 'Ciego de Ávila',
        municipalities: ['Ciego de Ávila', 'Morón', 'Chambas', 'Majagua', 'Ciro Redondo', 'Florencia', 'Venezuela', 'Baraguá', 'Primero de Enero', 'Bolivia']
    },
    'camaguey': {
        name: 'Camagüey',
        municipalities: ['Camagüey', 'Florida', 'Vertientes', 'Esmeralda', 'Sierra de Cubitas', 'Minas', 'Najasa', 'Guáimaro', 'Carlos Manuel de Céspedes', 'Sibanicú', 'Nuevitas', 'Santa Cruz del Sur']
    },
    'las-tunas': {
        name: 'Las Tunas',
        municipalities: ['Las Tunas', 'Puerto Padre', 'Jesús Menéndez', 'Majibacoa', 'Jobabo', 'Colombia', 'Amancio']
    },
    'holguin': {
        name: 'Holguín',
        municipalities: ['Holguín', 'Banes', 'Antilla', 'Báguanos', 'Cacocum', 'Calixto García', 'Cueto', 'Frank País', 'Gibara', 'Mayarí', 'Moa', 'Rafael Freyre', 'Sagua de Tánamo', 'Urbano Noris']
    },
    'granma': {
        name: 'Granma',
        municipalities: ['Bayamo', 'Manzanillo', 'Campechuela', 'Media Luna', 'Niquero', 'Pilón', 'Bartolomé Masó', 'Buey Arriba', 'Guisa', 'Jiguaní', 'Yara']
    },
    'santiago-de-cuba': {
        name: 'Santiago de Cuba',
        municipalities: ['Santiago de Cuba', 'Palma Soriano', 'San Luis', 'Songo-La Maya', 'El Cobre', 'Guamá', 'El Salvador', 'Mella', 'Tercer Frente', 'Contramaestre']
    },
    'guantanamo': {
        name: 'Guantánamo',
        municipalities: ['Guantánamo', 'Baracoa', 'Imías', 'Maisí', 'El Salvador', 'Yateras', 'San Antonio del Sur', 'Manuel Tames', 'Caimanera', 'Niceto Pérez']
    },
    'isla-de-la-juventud': {
        name: 'Isla de la Juventud',
        municipalities: ['Nueva Gerona', 'Isla de la Juventud']
    }
};

// ===== LOCATION MODAL FUNCTIONALITY =====
function setupLocationModal() {
    const locationModal = document.getElementById('locationModal');
    const provinceSelect = document.getElementById('provinceSelect');
    const municipalitySelect = document.getElementById('municipalitySelect');
    const updateLocationBtn = document.getElementById('updateLocationBtn');

    // Check if location is already set
    const savedProvince = localStorage.getItem('selectedProvince');
    const savedMunicipality = localStorage.getItem('selectedMunicipality');
    
    if (!savedProvince || !savedMunicipality) {
        // Show modal on page load
        locationModal.style.display = 'flex';
    }

    // Handle province selection
    provinceSelect.addEventListener('change', function() {
        const selectedProvince = this.value;
        municipalitySelect.innerHTML = '<option value="">Seleccione Municipio</option>';
        municipalitySelect.disabled = true;
        updateLocationBtn.disabled = true;

        if (selectedProvince && cubanProvinces[selectedProvince]) {
            municipalitySelect.disabled = false;
            cubanProvinces[selectedProvince].municipalities.forEach(municipality => {
                const option = document.createElement('option');
                option.value = municipality.toLowerCase().replace(/\s+/g, '-');
                option.textContent = municipality;
                municipalitySelect.appendChild(option);
            });
        }
    });

    // Handle municipality selection
    municipalitySelect.addEventListener('change', function() {
        updateLocationBtn.disabled = !this.value;
    });

    // Handle update button
    updateLocationBtn.addEventListener('click', function() {
        const selectedProvince = provinceSelect.value;
        const selectedMunicipality = municipalitySelect.value;
        
        if (selectedProvince && selectedMunicipality) {
            // Store location in localStorage
            localStorage.setItem('selectedProvince', selectedProvince);
            localStorage.setItem('selectedMunicipality', selectedMunicipality);
            localStorage.setItem('selectedProvinceName', cubanProvinces[selectedProvince].name);
            localStorage.setItem('selectedMunicipalityName', municipalitySelect.options[municipalitySelect.selectedIndex].text);
            
            // Hide modal
            locationModal.style.display = 'none';
            
            // Show success message
            showNotification('Ubicación actualizada correctamente', 'success');
        }
    });
}

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.Cubalink23 = {
    login,
    logout,
    addToCart,
    showNotification,
    searchFlights,
    searchHotels,
    searchCars,
    setupLocationModal
};

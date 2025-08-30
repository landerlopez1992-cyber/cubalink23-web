// Cubalink23 Web Application
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Form submissions
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }

    const flightSearch = document.querySelector('.flight-search');
    if (flightSearch) {
        flightSearch.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFlightSearch(this);
        });
    }

    const hotelSearch = document.querySelector('.hotel-search');
    if (hotelSearch) {
        hotelSearch.addEventListener('submit', function(e) {
            e.preventDefault();
            handleHotelSearch(this);
        });
    }

    // Service card animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .store-card, .travel-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Initialize tooltips and popovers
    initializeTooltips();
});

// Contact form handler
function handleContactForm(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
    submitBtn.disabled = true;

    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Flight search handler
function handleFlightSearch(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<span class="loading"></span> Buscando...';
    submitBtn.disabled = true;

    // Simulate flight search (replace with actual API call to your backend)
    setTimeout(() => {
        showNotification('Búsqueda completada. Redirigiendo a resultados...', 'info');
        // Here you would redirect to flight results page or show results modal
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 3000);
}

// Hotel search handler
function handleHotelSearch(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<span class="loading"></span> Buscando...';
    submitBtn.disabled = true;

    // Simulate hotel search (replace with actual API call to your backend)
    setTimeout(() => {
        showNotification('Búsqueda completada. Redirigiendo a resultados...', 'info');
        // Here you would redirect to hotel results page or show results modal
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 3000);
}

// Notification system
function showNotification(message, type = 'info') {
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
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
}

// Initialize tooltips
function initializeTooltips() {
    // Add tooltip functionality to service buttons
    document.querySelectorAll('.service-btn, .store-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.textContent;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 100);
            
            this.tooltip = tooltip;
        });
        
        btn.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (this.tooltip && this.tooltip.parentNode) {
                        this.tooltip.parentNode.removeChild(this.tooltip);
                    }
                }, 300);
            }
        });
    });
}

// API Integration Functions (to be connected to your backend)
function connectToBackend() {
    // This function will handle the connection to your existing backend
    // at cubalink23-backend.onrender.com
    
    const API_BASE_URL = 'https://cubalink23-backend.onrender.com';
    
    return {
        // Flight search API
        searchFlights: async (searchData) => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/flights/search`, {
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
        },
        
        // Hotel search API
        searchHotels: async (searchData) => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/hotels/search`, {
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
        },
        
        // Contact form API
        submitContact: async (contactData) => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contactData)
                });
                return await response.json();
            } catch (error) {
                console.error('Error submitting contact:', error);
                throw error;
            }
        }
    };
}

// Initialize API connection
const api = connectToBackend();

// Export for use in other modules
window.Cubalink23API = api;

// Authentication Functions
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    
    const loginBtn = document.getElementById('loginBtn');
    const accountBtn = document.getElementById('accountBtn');
    
    if (token && user.id) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (accountBtn) {
            accountBtn.style.display = 'inline-flex';
            accountBtn.innerHTML = `<i class="fas fa-user"></i> ${user.name || 'Mi Cuenta'}`;
        }
    } else {
        // User is not logged in
        if (loginBtn) loginBtn.style.display = 'inline-flex';
        if (accountBtn) accountBtn.style.display = 'none';
    }
}

// Check auth status on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});

// Logout function
function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
    }
}

// API Integration for Authentication
const authAPI = {
    login: async (email, password) => {
        try {
            const response = await fetch('https://cubalink23-backend.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            throw error;
        }
    },
    
    register: async (userData) => {
        try {
            const response = await fetch('https://cubalink23-backend.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Error en el registro');
            }
        } catch (error) {
            throw error;
        }
    },
    
    updateProfile: async (userData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://cubalink23-backend.onrender.com/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Error actualizando perfil');
            }
        } catch (error) {
            throw error;
        }
    }
};

// Export for use in other pages
window.authAPI = authAPI;
window.checkAuthStatus = checkAuthStatus;
window.logout = logout;

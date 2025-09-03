// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav ul');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });

    // Counter animation for stats
    animateCounters();

    // Search functionality
    initializeSearch();

    // Student portal login simulation
    initializeStudentPortal();
});

// Form validation function
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        } else {
            clearError(field);
            
            // Email validation
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showError(field, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation
            if (field.type === 'tel' && !isValidPhone(field.value)) {
                showError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showError(field, message) {
    clearError(field);
    field.style.borderColor = '#ff6b6b';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearError(field) {
    field.style.borderColor = '#e0e0e0';
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current).toLocaleString() + 
                        (counter.textContent.includes('+') ? '+' : '') +
                        (counter.textContent.includes('%') ? '%' : '');
                }, 20);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            if (query.length > 2) {
                performSearch(query);
            } else {
                if (searchResults) {
                    searchResults.innerHTML = '';
                    searchResults.style.display = 'none';
                }
            }
        });
    }
}

function performSearch(query) {
    // Simulated search data
    const searchData = [
        { title: 'Computer Science Program', url: 'academics.html#cs', type: 'Academic Program' },
        { title: 'Medicine Program', url: 'academics.html#med', type: 'Academic Program' },
        { title: 'Engineering Program', url: 'academics.html#eng', type: 'Academic Program' },
        { title: 'Business Program', url: 'academics.html#business', type: 'Academic Program' },
        { title: 'Admissions Requirements', url: 'admissions.html', type: 'Information' },
        { title: 'Faculty Directory', url: 'faculty.html', type: 'Directory' },
        { title: 'Student Portal', url: 'student-portal.html', type: 'Service' },
        { title: 'Campus Events', url: 'news.html', type: 'News' },
        { title: 'Contact Information', url: 'contact.html', type: 'Information' }
    ];
    
    const results = searchData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.type.toLowerCase().includes(query)
    );
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.querySelector('#search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found</p>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item">
                <h4><a href="${result.url}">${result.title}</a></h4>
                <span class="result-type">${result.type}</span>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

// Student portal simulation
function initializeStudentPortal() {
    const loginForm = document.querySelector('#student-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = this.querySelector('#username').value;
            const password = this.querySelector('#password').value;
            
            // Simulate login process
            if (username && password) {
                showLoginSuccess();
                setTimeout(() => {
                    showStudentDashboard();
                }, 1500);
            }
        });
    }
}

function showLoginSuccess() {
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        loginContainer.innerHTML = `
            <div class="success-message">
                <h3>✅ Login Successful!</h3>
                <p>Redirecting to your dashboard...</p>
            </div>
        `;
    }
}

function showStudentDashboard() {
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (dashboardContainer) {
        dashboardContainer.style.display = 'block';
        dashboardContainer.innerHTML = `
            <div class="dashboard-header">
                <h2>Welcome back, John Doe!</h2>
                <p>Student ID: CS2024001</p>
            </div>
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h3>📚 Current Courses</h3>
                    <ul>
                        <li>Advanced Algorithms - CS 401</li>
                        <li>Database Systems - CS 345</li>
                        <li>Software Engineering - CS 320</li>
                        <li>Computer Networks - CS 410</li>
                    </ul>
                </div>
                <div class="dashboard-card">
                    <h3>📊 GPA</h3>
                    <div class="gpa-display">3.85</div>
                    <p>Cumulative GPA</p>
                </div>
                <div class="dashboard-card">
                    <h3>📝 Upcoming Assignments</h3>
                    <ul>
                        <li>CS 401 - Algorithm Analysis (Due: Dec 20)</li>
                        <li>CS 345 - Database Project (Due: Dec 22)</li>
                        <li>CS 320 - Software Design (Due: Dec 25)</li>
                    </ul>
                </div>
                <div class="dashboard-card">
                    <h3>🎓 Graduation Progress</h3>
                    <div class="progress-bar">
                        <div class="progress" style="width: 75%"></div>
                    </div>
                    <p>75% Complete - 30 credits remaining</p>
                </div>
            </div>
        `;
    }
}

// Gallery image modal
function openImageModal(imageSrc, caption) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imageSrc}" alt="${caption}">
            <p>${caption}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// News filtering
function filterNews(category) {
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Faculty search and filter
function initializeFacultySearch() {
    const searchInput = document.querySelector('#faculty-search');
    const departmentFilter = document.querySelector('#department-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterFaculty);
    }
    
    if (departmentFilter) {
        departmentFilter.addEventListener('change', filterFaculty);
    }
}

function filterFaculty() {
    const searchTerm = document.querySelector('#faculty-search')?.value.toLowerCase() || '';
    const selectedDepartment = document.querySelector('#department-filter')?.value || 'all';
    const facultyCards = document.querySelectorAll('.faculty-card');
    
    facultyCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const department = card.dataset.department;
        
        const matchesSearch = name.includes(searchTerm);
        const matchesDepartment = selectedDepartment === 'all' || department === selectedDepartment;
        
        if (matchesSearch && matchesDepartment) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .program-card, .news-item, .faculty-card').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeScrollAnimations);

// Utility function for showing notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// CSS for notifications and modals (will be injected)
const dynamicStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
    }
    
    .notification-info {
        background-color: #667eea;
    }
    
    .notification-success {
        background-color: #4CAF50;
    }
    
    .notification-error {
        background-color: #ff6b6b;
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
    }
    
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 10px;
        overflow: hidden;
    }
    
    .modal-content img {
        width: 100%;
        height: auto;
        display: block;
    }
    
    .modal-content p {
        padding: 1rem;
        text-align: center;
        background: white;
    }
    
    .close-modal {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 2rem;
        color: white;
        cursor: pointer;
        background: rgba(0,0,0,0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .dashboard-card {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .gpa-display {
        font-size: 3rem;
        font-weight: bold;
        color: #4CAF50;
        text-align: center;
        margin: 1rem 0;
    }
    
    .progress-bar {
        width: 100%;
        height: 20px;
        background-color: #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
        margin: 1rem 0;
    }
    
    .progress {
        height: 100%;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        transition: width 0.3s ease;
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
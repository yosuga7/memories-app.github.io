// ========================================
// MAIN APP JAVASCRIPT
// Core functionality and utilities
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize floating hearts
    createFloatingHearts();

    // Initialize navigation
    initNavigation();

    // Update stats on homepage
    updateHomeStats();

    // Load recent photos on homepage
    loadRecentPhotos();
});

// Create floating hearts background
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;

    const hearts = ['💕', '❤️', '💗', '💖', '💘', '💝'];
    const numHearts = 15;

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        container.appendChild(heart);
    }
}

// Initialize mobile navigation
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
            });
        });
    }

    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update homepage statistics
function updateHomeStats() {
    const daysElement = document.getElementById('daysTogether');
    const photoElement = document.getElementById('photoCount');
    const placeElement = document.getElementById('placeCount');

    if (daysElement) {
        animateNumber(daysElement, getDaysTogether());
    }

    if (photoElement) {
        animateNumber(photoElement, getPhotos().length);
    }

    if (placeElement) {
        animateNumber(placeElement, getLocations().length);
    }
}

// Animate number counting up
function animateNumber(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current;
    }, 30);
}

// Load recent photos on homepage
function loadRecentPhotos() {
    const container = document.getElementById('recentPhotos');
    if (!container) return;

    const photos = getPhotos().slice(-4).reverse();

    photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item fade-in';
        item.style.animationDelay = (index * 0.1) + 's';
        item.innerHTML = `
      <img src="${photo.url}" alt="${photo.caption}" loading="lazy">
      <div class="gallery-overlay">
        <div class="gallery-caption">${photo.caption}</div>
        <div class="gallery-date">${formatDate(photo.date)}</div>
      </div>
    `;
        item.addEventListener('click', () => {
            window.location.href = 'gallery.html';
        });
        container.appendChild(item);
    });
}

// Format date utility
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format time utility
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Calculate countdown
function calculateCountdown(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);

    // If the date has passed this year, use next year
    if (target < now) {
        target.setFullYear(target.getFullYear() + 1);
    }

    const diff = target - now;

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };
}

// Check if user is logged in
function isLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

// Login function
function login(username, password) {
    if (username === MemoriesData.admin.username && password === MemoriesData.admin.password) {
        sessionStorage.setItem('isLoggedIn', 'true');
        return true;
    }
    return false;
}

// Logout function
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'admin.html';
}

// Show notification toast
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#4CAF50' : '#ff6b6b'};
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideIn 0.3s ease;
    font-family: 'Quicksand', sans-serif;
    font-weight: 500;
  `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

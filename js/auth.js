// ========================================
// AUTHENTICATION JAVASCRIPT
// Login and session management
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Check if already logged in
    if (isLoggedIn() && window.location.pathname.includes('admin.html')) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Initialize login form
    initLoginForm();
});

// Initialize login form
function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');

        if (login(username, password)) {
            window.location.href = 'dashboard.html';
        } else {
            errorDiv.style.display = 'block';
            document.getElementById('password').value = '';

            // Shake animation
            const card = document.querySelector('.login-card');
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'shake 0.5s ease';
            }, 10);
        }
    });
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);

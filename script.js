// Toggle Password Visibility
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    // Change eye icon
    const eyeIcon = this.querySelector('.eye-icon');
    eyeIcon.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Form Submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validation
    if (!username) {
        showError('username', 'Please enter your username or email');
        return;
    }
    
    if (!password) {
        showError('password', 'Please enter your password');
        return;
    }
    
    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        return;
    }
    
    // Simulate login
    const loginButton = loginForm.querySelector('.login-button');
    const originalText = loginButton.textContent;
    
    loginButton.textContent = 'Logging in...';
    loginButton.disabled = true;
    
    setTimeout(() => {
        // Simulate successful login
        showSuccess();
        
        // Store remember me preference
        if (rememberMe) {
            localStorage.setItem('roblox_username', username);
            localStorage.setItem('roblox_rememberMe', true);
        } else {
            localStorage.removeItem('roblox_username');
            localStorage.removeItem('roblox_rememberMe');
        }
        
        // Reset button
        loginButton.textContent = originalText;
        loginButton.disabled = false;
        
        // Clear form
        loginForm.reset();
        
    }, 1500);
});

// Show Error Message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.style.borderColor = '#e74c3c';
    field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
    
    // Create error message
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    errorMsg.style.cssText = `
        color: #e74c3c;
        font-size: 12px;
        margin-top: 5px;
        font-weight: 500;
    `;
    
    formGroup.appendChild(errorMsg);
    
    // Clear error on input
    field.addEventListener('input', function() {
        this.style.borderColor = '#ddd';
        this.style.boxShadow = 'none';
        const error = formGroup.querySelector('.error-message');
        if (error) error.remove();
    }, { once: true });
}

// Show Success Message
function showSuccess() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
    `;
    message.textContent = '✓ Login successful! Welcome back!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Load Remember Me
window.addEventListener('DOMContentLoaded', function() {
    const rememberMe = localStorage.getItem('roblox_rememberMe');
    const savedUsername = localStorage.getItem('roblox_username');
    
    if (rememberMe && savedUsername) {
        document.getElementById('username').value = savedUsername;
        document.getElementById('rememberMe').checked = true;
    }
});

// Signup Button
const signupButton = document.querySelector('.signup-button');
signupButton.addEventListener('click', function() {
    alert('Redirecting to signup page... (This is a replica demo)');
});

// Forgot Password Link
const forgotLink = document.querySelector('.forgot-link');
forgotLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Redirecting to password recovery... (This is a replica demo)');
});

// Footer Links
const footerLinks = document.querySelectorAll('.footer-link');
footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const text = this.textContent;
        alert(`Navigating to ${text}... (This is a replica demo)`);
    });
});

// Language Selector
const languageSelect = document.getElementById('language');
languageSelect.addEventListener('change', function() {
    const language = this.value;
    console.log(`Language changed to: ${language}`);
    // In a real app, this would change the page language
    alert(`Language changed to: ${language}`);
});

// Add keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.activeElement.closest('.login-form')) {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

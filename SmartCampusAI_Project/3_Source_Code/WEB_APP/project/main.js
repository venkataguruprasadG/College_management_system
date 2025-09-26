// College Management System Login
class CollegeLogin {
    constructor() {
        this.currentRole = 'student';
        this.isLoading = false;
        
        // DOM Elements
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.rememberMeCheckbox = document.getElementById('rememberMe');
        this.loginBtn = document.getElementById('loginBtn');
        this.passwordToggle = document.getElementById('passwordToggle');
        
        // Error elements
        this.usernameError = document.getElementById('usernameError');
        this.passwordError = document.getElementById('passwordError');
        
        // Role tabs
        this.roleTabs = document.querySelectorAll('.role-tab');
        
        // Social login buttons
        this.googleBtn = document.getElementById('googleLogin');
        this.microsoftBtn = document.getElementById('microsoftLogin');
        
        // Help links
        this.forgotPasswordLink = document.getElementById('forgotPassword');
        this.needHelpLink = document.getElementById('needHelp');
        this.contactSupportLink = document.getElementById('contactSupport');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupAnimations();
        this.loadSavedCredentials();
    }
    
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleLogin(e));
        
        // Role selection
        this.roleTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.handleRoleChange(e));
        });
        
        // Password toggle
        this.passwordToggle.addEventListener('click', () => this.togglePassword());
        
        // Real-time validation
        this.usernameInput.addEventListener('input', () => this.validateUsername());
        this.passwordInput.addEventListener('input', () => this.validatePassword());
        this.usernameInput.addEventListener('blur', () => this.validateUsername());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        
        // Social login
        this.googleBtn.addEventListener('click', () => this.handleSocialLogin('google'));
        this.microsoftBtn.addEventListener('click', () => this.handleSocialLogin('microsoft'));
        
        // Help links
        this.forgotPasswordLink.addEventListener('click', (e) => this.handleForgotPassword(e));
        this.needHelpLink.addEventListener('click', (e) => this.handleNeedHelp(e));
        this.contactSupportLink.addEventListener('click', (e) => this.handleContactSupport(e));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Input focus effects
        this.setupInputEffects();
    }
    
    setupAnimations() {
        // Stagger animation for form elements
        const formElements = document.querySelectorAll('.form-container > *');
        formElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
            element.classList.add('fade-in');
        });
        
        // Floating icons animation
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 1.6}s`;
        });
    }
    
    setupInputEffects() {
        const inputs = [this.usernameInput, this.passwordInput];
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
                this.clearError(input);
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
            
            // Add ripple effect on focus
            input.addEventListener('focus', (e) => {
                this.createRipple(e.target, e);
            });
        });
    }
    
    handleRoleChange(e) {
        const clickedTab = e.currentTarget;
        const role = clickedTab.dataset.role;
        
        // Update active tab
        this.roleTabs.forEach(tab => tab.classList.remove('active'));
        clickedTab.classList.add('active');
        
        // Update current role
        this.currentRole = role;
        
        // Update username placeholder based on role
        this.updateUsernamePlaceholder(role);
        
        // Add bounce animation
        clickedTab.classList.add('bounce-in');
        setTimeout(() => clickedTab.classList.remove('bounce-in'), 600);
        
        // Clear form
        this.clearForm();
        
        this.showToast(`Switched to ${role} login`, 'info');
    }
    
    updateUsernamePlaceholder(role) {
        const label = this.usernameInput.nextElementSibling;
        const placeholders = {
            student: 'Student ID / Email',
            faculty: 'Faculty ID / Email',
            admin: 'Admin ID / Email'
        };
        
        label.textContent = placeholders[role] || 'ID / Email';
    }
    
    validateUsername() {
        const username = this.usernameInput.value.trim();
        const wrapper = this.usernameInput.parentElement;
        
        if (!username) {
            this.showError(this.usernameError, 'Username is required');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        // Role-specific validation
        let isValid = false;
        let errorMessage = '';
        
        switch (this.currentRole) {
            case 'student':
                isValid = this.validateStudentId(username) || this.validateEmail(username);
                errorMessage = 'Enter valid Student ID (e.g., STU2024001) or email';
                break;
            case 'faculty':
                isValid = this.validateFacultyId(username) || this.validateEmail(username);
                errorMessage = 'Enter valid Faculty ID (e.g., FAC2024001) or email';
                break;
            case 'admin':
                isValid = this.validateAdminId(username) || this.validateEmail(username);
                errorMessage = 'Enter valid Admin ID (e.g., ADM2024001) or email';
                break;
        }
        
        if (!isValid) {
            this.showError(this.usernameError, errorMessage);
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError(this.usernameError);
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    validateStudentId(id) {
        return /^STU\d{7}$/.test(id);
    }
    
    validateFacultyId(id) {
        return /^FAC\d{7}$/.test(id);
    }
    
    validateAdminId(id) {
        return /^ADM\d{7}$/.test(id);
    }
    
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        const wrapper = this.passwordInput.parentElement;
        
        if (!password) {
            this.showError(this.passwordError, 'Password is required');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        if (password.length < 6) {
            this.showError(this.passwordError, 'Password must be at least 6 characters');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError(this.passwordError);
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    clearError(input) {
        const errorElement = input === this.usernameInput ? this.usernameError : this.passwordError;
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    togglePassword() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        this.passwordToggle.classList.toggle('active');
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        
        const isUsernameValid = this.validateUsername();
        const isPasswordValid = this.validatePassword();
        
        if (!isUsernameValid || !isPasswordValid) {
            this.shakeForm();
            return;
        }
        
        this.setLoading(true);
        
        try {
            const credentials = {
                username: this.usernameInput.value.trim(),
                password: this.passwordInput.value,
                role: this.currentRole,
                rememberMe: this.rememberMeCheckbox.checked
            };
            
            const result = await this.authenticateUser(credentials);
            
            if (result.success) {
                this.handleLoginSuccess(result);
            } else {
                this.handleLoginError(result.message);
            }
        } catch (error) {
            this.handleLoginError('Network error. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }
    
    async authenticateUser(credentials) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Demo credentials for different roles
                const demoCredentials = {
                    student: { username: 'STU2024001', password: 'student123' },
                    faculty: { username: 'FAC2024001', password: 'faculty123' },
                    admin: { username: 'ADM2024001', password: 'admin123' }
                };
                
                const demo = demoCredentials[credentials.role];
                const isValidDemo = credentials.username === demo.username && credentials.password === demo.password;
                const isValidEmail = this.validateEmail(credentials.username) && credentials.password.length >= 6;
                
                if (isValidDemo || isValidEmail) {
                    resolve({
                        success: true,
                        user: {
                            id: credentials.username,
                            role: credentials.role,
                            name: this.generateUserName(credentials.role)
                        },
                        token: 'demo-jwt-token'
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Invalid credentials. Try demo accounts or any email with 6+ char password.'
                    });
                }
            }, 2000);
        });
    }
    
    generateUserName(role) {
        const names = {
            student: 'Alex Johnson',
            faculty: 'Dr. Sarah Wilson',
            admin: 'Michael Brown'
        };
        return names[role] || 'User';
    }
    
    handleLoginSuccess(result) {
        // Save credentials if remember me is checked
        if (this.rememberMeCheckbox.checked) {
            this.saveCredentials();
        }
        
        this.showToast(`Welcome back, ${result.user.name}!`, 'success');
        
        // Simulate redirect to dashboard
        setTimeout(() => {
            this.redirectToDashboard(result.user.role);
        }, 1500);
    }
    
    handleLoginError(message) {
        this.showToast(message, 'error');
        this.shakeForm();
    }
    
    redirectToDashboard(role) {
        const dashboards = {
            student: 'Student Dashboard - View courses, grades, and assignments',
            faculty: 'Faculty Dashboard - Manage courses and student grades',
            admin: 'Admin Dashboard - System administration and reports'
        };
        
        this.showToast(`Redirecting to ${dashboards[role]}...`, 'info');
        
        // In a real app, you would redirect to the actual dashboard
        // window.location.href = `/dashboard/${role}`;
    }
    
    setLoading(loading) {
        this.isLoading = loading;
        this.loginBtn.disabled = loading;
        this.loginBtn.classList.toggle('loading', loading);
        
        const formContainer = document.querySelector('.form-container');
        formContainer.classList.toggle('loading', loading);
    }
    
    shakeForm() {
        this.form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.form.style.animation = '';
        }, 500);
    }
    
    clearForm() {
        this.usernameInput.value = '';
        this.passwordInput.value = '';
        this.clearError(this.usernameInput);
        this.clearError(this.passwordInput);
        
        // Remove validation classes
        document.querySelectorAll('.input-wrapper').forEach(wrapper => {
            wrapper.classList.remove('success', 'error');
        });
    }
    
    handleSocialLogin(provider) {
        this.showToast(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login integration would be implemented here`, 'info');
        
        // Simulate social login
        setTimeout(() => {
            this.showToast(`${provider} login successful! Redirecting...`, 'success');
        }, 1500);
    }
    
    handleForgotPassword(e) {
        e.preventDefault();
        this.showToast('Password reset link would be sent to your registered email', 'info');
    }
    
    handleNeedHelp(e) {
        e.preventDefault();
        this.showToast('Help documentation and tutorials would open here', 'info');
    }
    
    handleContactSupport(e) {
        e.preventDefault();
        this.showToast('Support ticket system would open here', 'info');
    }
    
    handleKeyboardShortcuts(e) {
        // Enter key to submit form
        if (e.key === 'Enter' && !e.shiftKey) {
            if (document.activeElement === this.usernameInput || document.activeElement === this.passwordInput) {
                e.preventDefault();
                this.handleLogin(e);
            }
        }
        
        // Escape key to clear form
        if (e.key === 'Escape') {
            this.clearForm();
        }
        
        // Tab navigation for role selection
        if (e.key === 'Tab' && e.shiftKey && document.activeElement === this.usernameInput) {
            e.preventDefault();
            this.roleTabs[this.roleTabs.length - 1].focus();
        }
    }
    
    saveCredentials() {
        const credentials = {
            username: this.usernameInput.value.trim(),
            role: this.currentRole
        };
        localStorage.setItem('collegeLoginCredentials', JSON.stringify(credentials));
    }
    
    loadSavedCredentials() {
        const saved = localStorage.getItem('collegeLoginCredentials');
        if (saved) {
            try {
                const credentials = JSON.parse(saved);
                this.usernameInput.value = credentials.username;
                this.currentRole = credentials.role;
                
                // Update role tab
                this.roleTabs.forEach(tab => {
                    tab.classList.toggle('active', tab.dataset.role === credentials.role);
                });
                
                this.updateUsernamePlaceholder(credentials.role);
                this.rememberMeCheckbox.checked = true;
            } catch (error) {
                console.error('Error loading saved credentials:', error);
            }
        }
    }
    
    showToast(message, type = 'info') {
        // Remove existing toasts
        document.querySelectorAll('.toast').forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
    
    createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(37, 99, 235, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// Additional animations and effects
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
        20%, 40%, 60%, 80% { transform: translateX(8px); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .input-wrapper {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(additionalStyles);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new CollegeLogin();
    
    // Add some interactive enhancements
    addInteractiveEnhancements();
});

function addInteractiveEnhancements() {
    // Parallax effect for background shapes
    window.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Add hover effects to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(5px) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('role-tab')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Add typing effect to brand title
    const brandTitle = document.querySelector('.brand-title');
    if (brandTitle) {
        const text = brandTitle.textContent;
        brandTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                brandTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}
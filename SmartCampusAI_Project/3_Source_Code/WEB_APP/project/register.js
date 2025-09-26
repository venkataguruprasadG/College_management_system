import { createFloatingShapes } from './main.js';

class RegistrationForm {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.registerBtn = document.getElementById('registerBtn');
        this.selectedRole = 'student';
        
        // Form fields
        this.fields = {
            fullName: document.getElementById('fullName'),
            email: document.getElementById('email'),
            password: document.getElementById('password'),
            confirmPassword: document.getElementById('confirmPassword'),
            phone: document.getElementById('phone'),
            terms: document.getElementById('terms')
        };

        // Password strength elements
        this.passwordStrength = document.getElementById('passwordStrength');
        this.strengthFill = document.getElementById('strengthFill');
        this.strengthText = document.getElementById('strengthText');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupRoleTabs();
        this.setupFloatingShapes();
        this.validateForm();
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field && fieldName !== 'terms') {
                field.addEventListener('input', () => this.validateField(fieldName));
                field.addEventListener('blur', () => this.validateField(fieldName));
            }
        });

        // Terms checkbox
        this.fields.terms.addEventListener('change', () => this.validateForm());

        // Password strength check
        this.fields.password.addEventListener('input', () => this.checkPasswordStrength());

        // Confirm password check
        this.fields.confirmPassword.addEventListener('input', () => this.checkPasswordMatch());

        // Social signup buttons
        document.getElementById('googleSignup').addEventListener('click', () => this.handleSocialSignup('google'));
        document.getElementById('microsoftSignup').addEventListener('click', () => this.handleSocialSignup('microsoft'));
    }

    setupRoleTabs() {
        const roleTabs = document.querySelectorAll('.role-tab');
        roleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                roleTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Update selected role
                this.selectedRole = tab.dataset.role;
                
                console.log('Selected role:', this.selectedRole);
            });
        });
    }

    setupFloatingShapes() {
        // Import and create floating shapes animation
        createFloatingShapes();
    }

    validateField(fieldName) {
        const field = this.fields[fieldName];
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'fullName':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Full name is required';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Full name must be at least 2 characters';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Full name can only contain letters and spaces';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email address is required';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'password':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Password is required';
                } else {
                    const strength = this.getPasswordStrength(value);
                    if (strength.score < 2) {
                        isValid = false;
                        errorMessage = 'Password is too weak. Please choose a stronger password.';
                    }
                }
                break;

            case 'confirmPassword':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please confirm your password';
                } else if (value !== this.fields.password.value) {
                    isValid = false;
                    errorMessage = 'Passwords do not match';
                }
                break;

            case 'phone':
                if (value) { // Optional field
                    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                    if (!phoneRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number (e.g., 123-456-7890)';
                    }
                }
                break;
        }

        this.showFieldError(fieldName, isValid, errorMessage);
        this.validateForm();
        
        return isValid;
    }

    showFieldError(fieldName, isValid, errorMessage) {
        const field = this.fields[fieldName];
        const errorElement = document.getElementById(`${fieldName}Error`);

        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
    }

    checkPasswordStrength() {
        const password = this.fields.password.value;
        const strength = this.getPasswordStrength(password);

        if (password.length === 0) {
            this.passwordStrength.classList.remove('show');
            return;
        }

        this.passwordStrength.classList.add('show');
        this.strengthFill.className = `strength-fill ${strength.level}`;
        this.strengthText.textContent = `${strength.level.charAt(0).toUpperCase() + strength.level.slice(1)} password`;
        this.strengthText.className = `strength-text ${strength.level}`;
    }

    getPasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        let level = 'weak';
        if (score >= 4) level = 'medium';
        if (score >= 5) level = 'strong';

        return { score, level };
    }

    checkPasswordMatch() {
        const password = this.fields.password.value;
        const confirmPassword = this.fields.confirmPassword.value;

        if (confirmPassword && password !== confirmPassword) {
            this.showToast('Passwords do not match', 'error');
        }

        this.validateField('confirmPassword');
    }

    validateForm() {
        const requiredFields = ['fullName', 'email', 'password', 'confirmPassword'];
        let allValid = true;

        // Check required fields
        requiredFields.forEach(fieldName => {
            const field = this.fields[fieldName];
            if (!field.value.trim()) {
                allValid = false;
            }
        });

        // Check terms agreement
        if (!this.fields.terms.checked) {
            allValid = false;
        }

        // Check password strength
        if (this.fields.password.value) {
            const strength = this.getPasswordStrength(this.fields.password.value);
            if (strength.score < 2) {
                allValid = false;
            }
        }

        // Check password match
        if (this.fields.password.value !== this.fields.confirmPassword.value) {
            allValid = false;
        }

        // Enable/disable register button
        this.registerBtn.disabled = !allValid;
        
        return allValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showToast('Please fill in all required fields correctly', 'error');
            return;
        }

        // Show loading state
        const originalText = this.registerBtn.textContent;
        this.registerBtn.textContent = 'Creating Account...';
        this.registerBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateRegistration();
            
            // Success
            this.showToast('Account created successfully! Welcome to CampusG!', 'success');
            
            // Reset form or redirect
            setTimeout(() => {
                // In a real app, you would redirect to login or dashboard
                window.location.href = 'login.html';
            }, 2000);

        } catch (error) {
            this.showToast(error.message || 'Registration failed. Please try again.', 'error');
        } finally {
            this.registerBtn.textContent = originalText;
            this.registerBtn.disabled = false;
        }
    }

    async simulateRegistration() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Get form data
        const formData = {
            fullName: this.fields.fullName.value.trim(),
            email: this.fields.email.value.trim(),
            password: this.fields.password.value,
            phone: this.fields.phone.value.trim() || null,
            role: this.selectedRole
        };

        // Simulate potential errors
        if (formData.email === 'test@example.com') {
            throw new Error('Email already exists. Please use a different email address.');
        }

        console.log('Registration successful:', formData);
        
        // In a real application, you would send this data to your backend
        return { success: true, user: formData };
    }

    handleSocialSignup(provider) {
        this.showToast(`${provider.charAt(0).toUpperCase() + provider.slice(1)} signup will be implemented soon`, 'warning');
        
        // In a real application, you would initiate OAuth flow
        console.log(`Social signup with ${provider}`);
    }

    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toastContainer.removeChild(toast), 300);
        }, 4000);
    }
}

// Initialize the registration form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RegistrationForm();
});
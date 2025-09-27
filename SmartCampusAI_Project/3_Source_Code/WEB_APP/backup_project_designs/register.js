// College Management System Registration
class CollegeRegistration {
    constructor() {
        this.currentRole = 'student';
        this.isLoading = false;
        this.passwordStrength = 0;
        
        // DOM Elements
        this.form = document.getElementById('registerForm');
        this.roleTabs = document.querySelectorAll('.role-tab');
        
        // Input elements
        this.firstNameInput = document.getElementById('firstName');
        this.lastNameInput = document.getElementById('lastName');
        this.emailInput = document.getElementById('email');
        this.phoneInput = document.getElementById('phone');
        this.dateOfBirthInput = document.getElementById('dateOfBirth');
        this.passwordInput = document.getElementById('password');
        this.confirmPasswordInput = document.getElementById('confirmPassword');
        this.agreeTermsCheckbox = document.getElementById('agreeTerms');
        
        // Student-specific elements
        this.departmentSelect = document.getElementById('department');
        this.yearSelect = document.getElementById('year');
        this.studentIdInput = document.getElementById('studentId');
        
        // Faculty-specific elements
        this.facultyDepartmentSelect = document.getElementById('facultyDepartment');
        this.positionSelect = document.getElementById('position');
        this.employeeIdInput = document.getElementById('employeeId');
        
        // Button elements
        this.registerBtn = document.getElementById('registerBtn');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
        
        // Social buttons
        this.googleBtn = document.getElementById('googleRegister');
        this.microsoftBtn = document.getElementById('microsoftRegister');
        
        // Password strength elements
        this.strengthBar = document.querySelector('.strength-fill');
        this.strengthText = document.querySelector('.strength-text');
        
        // Form sections
        this.studentSection = document.querySelector('.student-only');
        this.facultySection = document.querySelector('.faculty-only');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupAnimations();
        this.setMaxDate();
    }
    
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleRegistration(e));
        
        // Role selection
        this.roleTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.handleRoleChange(e));
        });
        
        // Password toggles
        this.passwordToggle.addEventListener('click', () => this.togglePassword('password'));
        this.confirmPasswordToggle.addEventListener('click', () => this.togglePassword('confirmPassword'));
        
        // Real-time validation
        this.setupValidation();
        
        // Password strength
        this.passwordInput.addEventListener('input', () => this.checkPasswordStrength());
        
        // Social registration
        this.googleBtn.addEventListener('click', () => this.handleSocialRegistration('google'));
        this.microsoftBtn.addEventListener('click', () => this.handleSocialRegistration('microsoft'));
        
        // Input focus effects
        this.setupInputEffects();
        
        // Phone number formatting
        this.phoneInput.addEventListener('input', (e) => this.formatPhoneNumber(e));
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
            icon.style.animationDelay = `${index * 1.2}s`;
        });
    }
    
    setupInputEffects() {
        const inputs = [
            this.firstNameInput, this.lastNameInput, this.emailInput, 
            this.phoneInput, this.dateOfBirthInput, this.passwordInput, 
            this.confirmPasswordInput, this.studentIdInput, this.employeeIdInput
        ];
        
        inputs.forEach(input => {
            if (input) {
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
            }
        });
    }
    
    setupValidation() {
        // Real-time validation for all inputs
        this.firstNameInput.addEventListener('input', () => this.validateFirstName());
        this.firstNameInput.addEventListener('blur', () => this.validateFirstName());
        
        this.lastNameInput.addEventListener('input', () => this.validateLastName());
        this.lastNameInput.addEventListener('blur', () => this.validateLastName());
        
        this.emailInput.addEventListener('input', () => this.validateEmail());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        
        this.phoneInput.addEventListener('input', () => this.validatePhone());
        this.phoneInput.addEventListener('blur', () => this.validatePhone());
        
        this.dateOfBirthInput.addEventListener('change', () => this.validateDateOfBirth());
        
        this.passwordInput.addEventListener('input', () => this.validatePassword());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        
        this.confirmPasswordInput.addEventListener('input', () => this.validateConfirmPassword());
        this.confirmPasswordInput.addEventListener('blur', () => this.validateConfirmPassword());
        
        // Role-specific validation
        if (this.departmentSelect) {
            this.departmentSelect.addEventListener('change', () => this.validateDepartment());
        }
        
        if (this.yearSelect) {
            this.yearSelect.addEventListener('change', () => this.validateYear());
        }
        
        if (this.facultyDepartmentSelect) {
            this.facultyDepartmentSelect.addEventListener('change', () => this.validateFacultyDepartment());
        }
        
        if (this.positionSelect) {
            this.positionSelect.addEventListener('change', () => this.validatePosition());
        }
    }
    
    setMaxDate() {
        // Set max date to 18 years ago
        const today = new Date();
        const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        this.dateOfBirthInput.max = maxDate.toISOString().split('T')[0];
    }
    
    handleRoleChange(e) {
        const clickedTab = e.currentTarget;
        const role = clickedTab.dataset.role;
        
        // Update active tab
        this.roleTabs.forEach(tab => tab.classList.remove('active'));
        clickedTab.classList.add('active');
        
        // Update current role
        this.currentRole = role;
        
        // Show/hide role-specific sections
        if (role === 'student') {
            this.studentSection.style.display = 'block';
            this.facultySection.style.display = 'none';
        } else {
            this.studentSection.style.display = 'none';
            this.facultySection.style.display = 'block';
        }
        
        // Add bounce animation
        clickedTab.classList.add('bounce-in');
        setTimeout(() => clickedTab.classList.remove('bounce-in'), 600);
        
        this.showToast(`Switched to ${role} registration`, 'info');
    }
    
    // Validation Methods
    validateFirstName() {
        const firstName = this.firstNameInput.value.trim();
        const wrapper = this.firstNameInput.parentElement;
        
        if (!firstName) {
            this.showError('firstNameError', 'First name is required');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        if (firstName.length < 2) {
            this.showError('firstNameError', 'First name must be at least 2 characters');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(firstName)) {
            this.showError('firstNameError', 'First name can only contain letters');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError('firstNameError');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    validateLastName() {
        const lastName = this.lastNameInput.value.trim();
        const wrapper = this.lastNameInput.parentElement;
        
        if (!lastName) {
            this.showError('lastNameError', 'Last name is required');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        if (lastName.length < 2) {
            this.showError('lastNameError', 'Last name must be at least 2 characters');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(lastName)) {
            this.showError('lastNameError', 'Last name can only contain letters');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError('lastNameError');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const wrapper = this.emailInput.parentElement;
        
        if (!email) {
            this.showError('emailError', 'Email address is required');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError('emailError');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    validatePhone() {
        const phone = this.phoneInput.value.trim();
        const wrapper = this.phoneInput.parentElement;
        
        if (!phone) {
            this.showError('phoneError', 'Phone number is required');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            this.showError('phoneError', 'Please enter a valid phone number');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError('phoneError');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    validateDateOfBirth() {
        const dateOfBirth = this.dateOfBirthInput.value;
        const wrapper = this.dateOfBirthInput.parentElement;
        
        if (!dateOfBirth) {
            this.showError('dateOfBirthError', 'Date of birth is required');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (age < 16) {
            this.showError('dateOfBirthError', 'You must be at least 16 years old');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError('dateOfBirthError');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        const wrapper = this.passwordInput.parentElement;
        
        if (!password) {
            this.showError('passwordError', 'Password is required');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        if (password.length < 8) {
            this.showError('passwordError', 'Password must be at least 8 characters');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
            this.showError('passwordError', 'Password must contain uppercase, lowercase, number, and special character');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError('passwordError');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    validateConfirmPassword() {
        const password = this.passwordInput.value;
        const confirmPassword = this.confirmPasswordInput.value;
        const wrapper = this.confirmPasswordInput.parentElement;
        
        if (!confirmPassword) {
            this.showError('confirmPasswordError', 'Please confirm your password');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        if (password !== confirmPassword) {
            this.showError('confirmPasswordError', 'Passwords do not match');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError('confirmPasswordError');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    validateDepartment() {
        const department = this.departmentSelect.value;
        const wrapper = this.departmentSelect.parentElement;
        
        if (!department) {
            this.showError('departmentError', 'Please select a department');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError('departmentError');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    validateYear() {
        const year = this.yearSelect.value;
        const wrapper = this.yearSelect.parentElement;
        
        if (!year) {
            this.showError('yearError', 'Please select academic year');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError('yearError');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    validateFacultyDepartment() {
        const department = this.facultyDepartmentSelect.value;
        const wrapper = this.facultyDepartmentSelect.parentElement;
        
        if (!department) {
            this.showError('facultyDepartmentError', 'Please select a department');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError('facultyDepartmentError');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    validatePosition() {
        const position = this.positionSelect.value;
        const wrapper = this.positionSelect.parentElement;
        
        if (!position) {
            this.showError('positionError', 'Please select a position');
            wrapper.classList.add('error');
            wrapper.classList.remove('success');
            return false;
        }
        
        this.clearError('positionError');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        return true;
    }
    
    checkPasswordStrength() {
        const password = this.passwordInput.value;
        let strength = 0;
        let strengthText = 'Very Weak';
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Character variety checks
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update strength display
        switch (strength) {
            case 0:
            case 1:
                strengthText = 'Very Weak';
                this.strengthBar.className = 'strength-fill weak';
                break;
            case 2:
            case 3:
                strengthText = 'Weak';
                this.strengthBar.className = 'strength-fill fair';
                break;
            case 4:
            case 5:
                strengthText = 'Good';
                this.strengthBar.className = 'strength-fill good';
                break;
            case 6:
                strengthText = 'Strong';
                this.strengthBar.className = 'strength-fill strong';
                break;
        }
        
        this.strengthText.textContent = strengthText;
        this.passwordStrength = strength;
    }
    
    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        
        e.target.value = value;
    }
    
    togglePassword(field) {
        const input = field === 'password' ? this.passwordInput : this.confirmPasswordInput;
        const toggle = field === 'password' ? this.passwordToggle : this.confirmPasswordToggle;
        
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        toggle.classList.toggle('active');
    }
    
    async handleRegistration(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        
        // Validate all fields
        const validations = [
            this.validateFirstName(),
            this.validateLastName(),
            this.validateEmail(),
            this.validatePhone(),
            this.validateDateOfBirth(),
            this.validatePassword(),
            this.validateConfirmPassword()
        ];
        
        // Role-specific validations
        if (this.currentRole === 'student') {
            validations.push(this.validateDepartment());
            validations.push(this.validateYear());
        } else {
            validations.push(this.validateFacultyDepartment());
            validations.push(this.validatePosition());
        }
        
        // Terms validation
        if (!this.agreeTermsCheckbox.checked) {
            this.showError('agreeTermsError', 'You must agree to the terms and conditions');
            validations.push(false);
        } else {
            this.clearError('agreeTermsError');
        }
        
        const isValid = validations.every(validation => validation === true);
        
        if (!isValid) {
            this.shakeForm();
            return;
        }
        
        this.setLoading(true);
        
        try {
            const formData = this.collectFormData();
            const result = await this.registerUser(formData);
            
            if (result.success) {
                this.handleRegistrationSuccess(result);
            } else {
                this.handleRegistrationError(result.message);
            }
        } catch (error) {
            this.handleRegistrationError('Network error. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }
    
    collectFormData() {
        const baseData = {
            firstName: this.firstNameInput.value.trim(),
            lastName: this.lastNameInput.value.trim(),
            email: this.emailInput.value.trim(),
            phone: this.phoneInput.value.trim(),
            dateOfBirth: this.dateOfBirthInput.value,
            password: this.passwordInput.value,
            role: this.currentRole
        };
        
        if (this.currentRole === 'student') {
            return {
                ...baseData,
                department: this.departmentSelect.value,
                year: this.yearSelect.value,
                studentId: this.studentIdInput.value.trim() || this.generateStudentId()
            };
        } else {
            return {
                ...baseData,
                department: this.facultyDepartmentSelect.value,
                position: this.positionSelect.value,
                employeeId: this.employeeIdInput.value.trim() || this.generateEmployeeId()
            };
        }
    }
    
    generateStudentId() {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `STU${year}${random}`;
    }
    
    generateEmployeeId() {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `FAC${year}${random}`;
    }
    
    async registerUser(formData) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Check if email already exists (simulation)
                const existingEmails = ['test@example.com', 'admin@college.edu'];
                
                if (existingEmails.includes(formData.email)) {
                    resolve({
                        success: false,
                        message: 'An account with this email already exists'
                    });
                } else {
                    resolve({
                        success: true,
                        user: {
                            id: formData.studentId || formData.employeeId,
                            name: `${formData.firstName} ${formData.lastName}`,
                            email: formData.email,
                            role: formData.role
                        },
                        message: 'Account created successfully!'
                    });
                }
            }, 2500);
        });
    }
    
    handleRegistrationSuccess(result) {
        this.showToast(`Welcome ${result.user.name}! Account created successfully.`, 'success');
        
        // Simulate redirect to login or dashboard
        setTimeout(() => {
            this.showToast('Redirecting to login page...', 'info');
            // In a real app: window.location.href = 'index.html';
        }, 2000);
    }
    
    handleRegistrationError(message) {
        this.showToast(message, 'error');
        this.shakeForm();
    }
    
    handleSocialRegistration(provider) {
        this.showToast(`${provider.charAt(0).toUpperCase() + provider.slice(1)} registration would be implemented here`, 'info');
    }
    
    setLoading(loading) {
        this.isLoading = loading;
        this.registerBtn.disabled = loading;
        this.registerBtn.classList.toggle('loading', loading);
        
        const formContainer = document.querySelector('.form-container');
        formContainer.classList.toggle('loading', loading);
    }
    
    shakeForm() {
        this.form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.form.style.animation = '';
        }, 500);
    }
    
    showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    clearError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
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
`;
document.head.appendChild(additionalStyles);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new CollegeRegistration();
    
    // Add interactive enhancements
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
}
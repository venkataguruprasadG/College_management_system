class StaffProfile {
    constructor() {
        this.currentTab = 'personal';
        this.editingField = null;
        this.profileData = {
            name: 'Dr. Sarah Elizabeth Johnson',
            designation: 'Professor, Computer Science',
            department: 'Department of Computer Science & Engineering',
            email: 'sarah.johnson@campusg.edu',
            phone: '+1 (555) 123-4567',
            status: 'active'
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTabs();
        this.setupEditableFields();
        this.setupPhotoUpload();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Edit profile button
        document.getElementById('editProfileBtn').addEventListener('click', () => {
            this.toggleEditMode();
        });

        // Download PDF button
        document.getElementById('downloadPdfBtn').addEventListener('click', () => {
            this.downloadPDF();
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Modal events
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('modalCancel').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('modalSave').addEventListener('click', () => {
            this.saveFieldEdit();
        });

        // Close modal on overlay click
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.closeModal();
            }
        });

        // Sidebar links
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSidebarClick(e.target);
            });
        });
    }

    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Remove active class from all tabs and panels
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                btn.classList.add('active');
                document.getElementById(tabId).classList.add('active');
                
                this.currentTab = tabId;
            });
        });
    }

    setupEditableFields() {
        document.querySelectorAll('.field-edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const fieldRow = e.target.closest('.info-row');
                const label = fieldRow.querySelector('label').textContent;
                const currentValue = fieldRow.querySelector('.field-value').textContent;
                
                this.openEditModal(label, currentValue, fieldRow);
            });
        });

        // Edit name button in header
        document.getElementById('editNameBtn').addEventListener('click', () => {
            const currentName = document.getElementById('profileName').textContent;
            this.openEditModal('Full Name', currentName, document.getElementById('profileName'));
        });
    }

    setupPhotoUpload() {
        const photoUploadBtn = document.getElementById('photoUploadBtn');
        const photoInput = document.getElementById('photoInput');
        const profilePhoto = document.getElementById('profilePhoto');

        photoUploadBtn.addEventListener('click', () => {
            photoInput.click();
        });

        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePhoto.src = e.target.result;
                    this.showToast('Profile photo updated successfully!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    switchTab(tabId) {
        if (!tabId) return;

        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        // Remove active class from all tabs and panels
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to selected tab and panel
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(tabId).classList.add('active');

        this.currentTab = tabId;
    }

    toggleEditMode() {
        const editBtn = document.getElementById('editProfileBtn');
        const isEditing = editBtn.textContent === 'Save Changes';

        if (isEditing) {
            // Save changes
            this.saveProfile();
            editBtn.textContent = 'Edit Profile';
            this.showToast('Profile updated successfully!', 'success');
        } else {
            // Enter edit mode
            editBtn.textContent = 'Save Changes';
            this.showToast('Edit mode enabled. Click on any field to modify.', 'info');
        }
    }

    openEditModal(label, currentValue, targetElement) {
        const modal = document.getElementById('editModal');
        const modalLabel = document.getElementById('modalLabel');
        const modalInput = document.getElementById('modalInput');

        modalLabel.textContent = label;
        modalInput.value = currentValue;
        this.editingField = { label, currentValue, targetElement };

        modal.classList.add('show');
        modalInput.focus();
    }

    closeModal() {
        const modal = document.getElementById('editModal');
        modal.classList.remove('show');
        this.editingField = null;
    }

    saveFieldEdit() {
        if (!this.editingField) return;

        const newValue = document.getElementById('modalInput').value.trim();
        if (!newValue) {
            this.showToast('Field cannot be empty', 'error');
            return;
        }

        // Update the field value
        if (this.editingField.targetElement.classList.contains('profile-name')) {
            this.editingField.targetElement.textContent = newValue;
        } else {
            this.editingField.targetElement.querySelector('.field-value').textContent = newValue;
        }

        this.showToast(`${this.editingField.label} updated successfully!`, 'success');
        this.closeModal();
    }

    saveProfile() {
        // In a real application, this would send data to the server
        console.log('Saving profile data:', this.profileData);
    }

    downloadPDF() {
        this.showToast('PDF download will be implemented soon', 'info');
        // In a real application, this would generate and download a PDF
    }

    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            this.showToast('Logging out...', 'info');
            setTimeout(() => {
                window.location.href = './index.html';
            }, 1500);
        }
    }

    handleSidebarClick(link) {
        // Remove active class from all sidebar links
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');

        const linkText = link.textContent.trim();
        
        switch (linkText) {
            case 'Profile Overview':
                // Already on profile page
                break;
            case 'My Courses':
                this.showToast('Redirecting to courses...', 'info');
                break;
            case 'Leave Application':
                this.showToast('Redirecting to leave application...', 'info');
                break;
            case 'Messages':
                this.showToast('Redirecting to messages...', 'info');
                break;
            case 'Resources':
                this.showToast('Redirecting to resources...', 'info');
                break;
            case 'Settings':
                this.switchTab('settings');
                break;
        }
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
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }
}

// Initialize the staff profile when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StaffProfile();
});
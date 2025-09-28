document.addEventListener('DOMContentLoaded', () => {
    // --- Profile Image Upload ---
    const profileImage = document.getElementById('profileImage');
    const uploadAvatar = document.getElementById('uploadAvatar');

    uploadAvatar.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // --- Edit Profile Modal ---
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeButton = editProfileModal.querySelector('.close-button');
    const editProfileForm = document.getElementById('editProfileForm');
    const changePasswordBtn = document.getElementById('changePasswordBtn');

    // Get current profile data
    const studentNameSpan = document.getElementById('studentName');
    const studentIdSpan = document.getElementById('studentId');
    const studentProgramSpan = document.getElementById('studentProgram');
    const studentYearSpan = document.getElementById('studentYear');
    const studentEmailSpan = document.getElementById('studentEmail');
    const studentPhoneSpan = document.getElementById('studentPhone');

    // Get modal input fields
    const editNameInput = document.getElementById('editName');
    const editEmailInput = document.getElementById('editEmail');
    const editPhoneInput = document.getElementById('editPhone');
    const editProgramInput = document.getElementById('editProgram');
    const editYearInput = document.getElementById('editYear');

    editProfileBtn.addEventListener('click', () => {
        // Populate modal with current data
        editNameInput.value = studentNameSpan.textContent;
        editEmailInput.value = studentEmailSpan.textContent;
        editPhoneInput.value = studentPhoneSpan.textContent;
        editProgramInput.value = studentProgramSpan.textContent;
        editYearInput.value = studentYearSpan.textContent;
        editProfileModal.style.display = 'flex'; // Use flex to center
    });

    closeButton.addEventListener('click', () => {
        editProfileModal.style.display = 'none';
    });

    // Close modal if clicked outside content
    window.addEventListener('click', (event) => {
        if (event.target === editProfileModal) {
            editProfileModal.style.display = 'none';
        }
    });

    editProfileForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Update profile information on the page
        studentNameSpan.textContent = editNameInput.value;
        studentEmailSpan.textContent = editEmailInput.value;
        studentPhoneSpan.textContent = editPhoneInput.value;
        studentProgramSpan.textContent = editProgramInput.value;
        studentYearSpan.textContent = editYearInput.value;

        // In a real application, you would send this data to a server
        alert('Profile updated successfully!');
        editProfileModal.style.display = 'none';
    });

    changePasswordBtn.addEventListener('click', () => {
        alert('Navigating to change password page/modal...');
        // In a real application, you would open a separate password change modal or redirect
    });

    // --- Placeholder for other dynamic features (e.g., fetching data) ---
    function fetchAcademicData() {
        // This is where you'd typically make an AJAX request to your backend
        // and populate elements like GPA, credits, attendance dynamically.
        // For now, they are hardcoded in HTML.
        console.log("Fetching academic data...");
    }

    fetchAcademicData();
});
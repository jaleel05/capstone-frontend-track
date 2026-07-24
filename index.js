document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settingsForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const successMessage = document.getElementById('successMessage');

    const showError = (input, message) => {
        const errorElement = document.getElementById(`${input.id}Error`);
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    };

    const clearError = (input) => {
        const errorElement = document.getElementById(`${input.id}Error`);
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
    };

    const validateUsername = () => {
        const value = usernameInput.value.trim();
        if (!value) {
            showError(usernameInput, 'Username is required');
            return false;
        } else if (value.length < 3) {
            showError(usernameInput, 'Username must be at least 3 characters');
            return false;
        }
        clearError(usernameInput);
        return true;
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            showError(emailInput, 'Email is required');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(emailInput, 'Please enter a valid email address');
            return false;
        }
        clearError(emailInput);
        return true;
    };

    const validatePassword = () => {
        const value = passwordInput.value.trim();
        if (!value) {
            showError(passwordInput, 'Password is required');
            return false;
        } else if (value.length < 8) {
            showError(passwordInput, 'Password must be at least 8 characters');
            return false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            showError(passwordInput, 'Password must contain uppercase, lowercase, and a number');
            return false;
        }
        clearError(passwordInput);
        return true;
    };

    // Real-time validation
    usernameInput.addEventListener('blur', validateUsername);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);

    usernameInput.addEventListener('input', () => clearError(usernameInput));
    emailInput.addEventListener('input', () => clearError(emailInput));
    passwordInput.addEventListener('input', () => clearError(passwordInput));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isUsernameValid && isEmailValid && isPasswordValid) {
            // Simulate saving data
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Saving...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                successMessage.classList.remove('hidden');
                
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 3000);
            }, 1000);
        }
    });
});

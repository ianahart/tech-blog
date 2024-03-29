const signUpForm = document.getElementById('signup-form');
const signUpError = document.querySelector('.signup-error');

const displayError = (error) => {
  signUpError.classList.remove('hidden');
  signUpError.textContent = error;
};

const clearError = () => {
  signUpError.textContent = '';
  signUpError.classList.add('hidden');
};

const signUpFormHandler = async (event) => {
  event.preventDefault();
  clearError();
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

  if (!username || !password || !confirmPassword) {
    signUpError.classList.remove('hidden');
    displayError('Please make sure to fill out all fields');
    return;
  }

  if (password !== confirmPassword) {
    displayError('Passwords do not match');
    return;
  }

  try {
    const response = await fetch('/api/v1/users/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    } else {
      document.location.replace('/');
    }
  } catch (err) {
    const errObj = JSON.parse(err.message);
    displayError(errObj.error);
  }
};

signUpForm.addEventListener('submit', signUpFormHandler);

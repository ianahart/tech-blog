const loginForm = document.getElementById('login-form');
const loginError = document.querySelector('.login-error');

const displayLoginError = (error) => {
  loginError.classList.remove('hidden');
  loginError.textContent = error;
};

const clearLoginError = () => {
  loginError.textContent = '';
  loginError.classList.add('hidden');
};

const loginFormHandler = async (event) => {
  event.preventDefault();
  clearError();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!username || !password) {
    loginError.classList.remove('hidden');
    displayLoginError('Please make sure to fill out all fields');
    return;
  }

  try {
    const response = await fetch('/api/v1/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    } else {
      document.location.replace('/dashboard');
    }
  } catch (err) {
    const errObj = JSON.parse(err.message);
    displayLoginError(errObj.error);
  }
};

loginForm.addEventListener('submit', loginFormHandler);

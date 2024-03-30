const loginForm = document.getElementById('login-form');
const loginError = document.querySelector('.login-error');

// displays a error when an error occurs logging the user in
const displayLoginError = (error) => {
  loginError.classList.remove('hidden');
  loginError.textContent = error;
};

// clears the login error
const clearLoginError = () => {
  loginError.textContent = '';
  loginError.classList.add('hidden');
};

// request for logging a user into the application
const loginFormHandler = async (event) => {
  event.preventDefault();
  clearLoginError();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  // check to see if username or password is empty
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

    // if response is not ok throw an error so it bubbles into the catch block
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    } else {
      document.location.replace('/');
    }
  } catch (err) {
    const errObj = JSON.parse(err.message);
    displayLoginError(errObj.error);
  }
};

loginForm.addEventListener('submit', loginFormHandler);

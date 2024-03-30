const signUpForm = document.getElementById('signup-form');
const signUpError = document.querySelector('.signup-error');

// display a signup error if an error occurs in the sign up process
const displaySignUpError = (error) => {
  signUpError.classList.remove('hidden');
  signUpError.textContent = error;
};

// clear sign up error
const clearSignUpError = () => {
  signUpError.textContent = '';
  signUpError.classList.add('hidden');
};

// make request to create/register user
const signUpFormHandler = async (event) => {
  event.preventDefault();
  clearSignUpError();
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

  // make sure all necessary fields are present
  if (!username || !password || !confirmPassword) {
    signUpError.classList.remove('hidden');
    displaySignUpError('Please make sure to fill out all fields');
    return;
  }

  // make sure password matches confirm password
  if (password !== confirmPassword) {
    displaySignUpError('Passwords do not match');
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
    // if an error occurs on the server display it
    if (errObj.message.toLowerCase() === 'internal server error') {
      displaySignUpError(errObj.error.errors[0].message);
      return;
    }
    displaySignUpError(errObj.error);
  }
};

signUpForm.addEventListener('submit', signUpFormHandler);

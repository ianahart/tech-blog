const logoutButton = document.getElementById('log-out');

const logout = async () => {
  try {
    const response = await fetch('/api/v1/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      throw new Error('Could not logout');
    }
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

logoutButton.addEventListener('click', logout);

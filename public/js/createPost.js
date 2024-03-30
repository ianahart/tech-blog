const createPostForm = document.getElementById('create-blog-post-form');
const formError = document.querySelector('.form-error');

const displayCreatePostError = (error) => {
  formError.textContent = error;
  formError.classList.remove('hidden');
};

const clearCreatePostError = () => {
  formError.textContent = '';
  formError.classList.add('hidden');
};

const createPostHandler = async (event) => {
  try {
    event.preventDefault();
    clearCreatePostError();

    const title = document.getElementById('create-post-title').value.trim();
    const postText = document.getElementById('create-post-body').value.trim();

    if (!title.length || !postText.length) {
      displayCreatePostError('Please make sure to provide all fields');
    }

    const response = await fetch('/api/v1/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, postText }),
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errObj = JSON.parse(error.message);
    if (errObj.message.toLowerCase() === 'internal server error') {
      displayCreatePostError(errObj.error.errors[0].message);
      return;
    }
    displayCreatePostError(errObj.error);
  }
};

createPostForm.addEventListener('submit', createPostHandler);

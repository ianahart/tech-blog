const updatePostError = document.querySelector('.form-error');

// show error if something occurs wrong in updating post
const displayUpdatePostError = (error) => {
  updatePostError.classList.remove('hidden');
  updatePostError.textContent = error;
};

// clear post error
const clearUpdateError = () => {
  updatePostError.textContent = '';
  updatePostError.classList.add('hidden');
};

// make request to update post
const updatePostHandler = async (event) => {
  event.preventDefault();
  try {
    const postId = event.target.dataset.id;
    const userId = event.target.dataset.user;
    const title = document.getElementById('update-blog-title').value.trim();
    const postText = document.getElementById('update-blog-body').value.trim();

    // make sure title and post text are present
    if (!title.length || !postText.length) {
      displayUpdatePostError('Please provide a title and a body');
    }

    const response = await fetch(`/api/v1/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, title, postText }),
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
      displayUpdatePostError(errObj.error.errors[0].message);
      return;
    }
    displayUpdatePostError(errObj.error);
  }
};

document.getElementById('update-blog-post-form').addEventListener('submit', updatePostHandler);

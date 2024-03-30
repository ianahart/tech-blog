const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const formError = document.querySelector('.form-error');
const modal = document.getElementById('modal');
const commentForm = document.getElementById('comment-form');

// display a comment error when something goes wrong creating a comment
const displayPostCommentError = (error) => {
  formError.textContent = error;
  formError.classList.remove('hidden');
};

// clears the comment error
const clearPostCommentError = () => {
  formError.textContent = '';
  formError.classList.add('hidden');
};

// close the model and clear errors
const closeModal = () => {
  modal.classList.add('hidden');
  clearPostCommentError();
};
// open the modal
const openModal = () => {
  const loggedIn = modal.dataset.loggedin === 'true' ? true : false;
  // if not logged in send the user to the login page
  if (!loggedIn) {
    document.location.replace('/login');
    return;
  }
  // show modal
  modal.classList.remove('hidden');
};

openModalBtn.addEventListener('click', openModal);

// make a request to create a comment
const postCommentHandler = async (event) => {
  try {
    event.preventDefault();
    clearPostCommentError();
    const postId = event.target.dataset.id;
    const commentText = commentForm.comment.value.trim();

    // if no comment text raise an error
    if (!commentText.length) {
      displayPostCommentError('Please make sure to fill out the text field');
    }

    const response = await fetch('/api/v1/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, commentText }),
    });

    if (response.ok) {
      document.location.reload();
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errObj = JSON.parse(error.message);
    if (errObj.message.toLowerCase() === 'internal server error') {
      displayPostCommentError(errObj.error.errors[0].message);
      return;
    }
    displayPostCommentError(errObj.error);
  }
};

// make sure commentForm and closeModalBtn are on loaded on the page
if (commentForm && closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
  commentForm.addEventListener('submit', postCommentHandler);
}

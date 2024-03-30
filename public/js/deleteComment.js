const deleteCommentBtns = document.querySelectorAll('#delete-comment-btn');

// delete request for deleting a comment
deleteCommentHandler = async (event) => {
  try {
    const commentId = event.target.dataset.id;

    const response = await fetch(`/api/v1/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    // if response is good, reload the page for the user
    if (response.ok) {
      document.location.reload();
    }
  } catch (error) {
    throw new Error(error);
  }
};

if (deleteCommentBtns) {
  deleteCommentBtns.forEach((deleteCommentBtn) => deleteCommentBtn.addEventListener('click', deleteCommentHandler));
}

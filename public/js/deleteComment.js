const deleteCommentBtn = document.getElementById('delete-comment-btn');

const deleteCommentHandler = async (event) => {
  try {
    const commentId = event.target.dataset.id;

    const response = await fetch(`/api/v1/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    }
  } catch (error) {
    throw new Error(error);
  }
};

if (deleteCommentBtn) {
  deleteCommentBtn.addEventListener('click', deleteCommentHandler);
}

const deleteBtn = document.getElementById('delete-btn');

// delete a post request
const deletePostHandler = async (event) => {
  event.stopPropagation();
  try {
    const postId = event.target.dataset.id;
    const response = await fetch(`/api/v1/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    // if response is good sent user to the dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    }
  } catch (error) {
    throw new Error(error);
  }
};

deleteBtn.addEventListener('click', deletePostHandler);

const goToSingleView = (event) => {
  window.location.href = `/posts/${event.currentTarget.dataset.id}`;
};

const posts = document.querySelectorAll('#single-view');
posts.forEach((post) => post.addEventListener('click', goToSingleView));

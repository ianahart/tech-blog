// add event listeners to all the posts, if one is clicked it will go to it's invdidual page

const goToSingleView = (event) => {
  window.location.href = `/posts/${event.currentTarget.dataset.id}`;
};

const posts = document.querySelectorAll('#single-view');
posts.forEach((post) => post.addEventListener('click', goToSingleView));

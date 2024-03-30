const { Post, User, Comment } = require('../models');

class PostService {
  // check to see if user has permission to delete a post
  static canDeletePost(postData, userId) {
    const post = postData.get({ plain: true });
    console.log(post.user);
    return userId && userId === post.user.id;
  }

  // get post by id
  static async getPostWithUserById(postId) {
    return Post.findByPk(postId, { include: [{ model: User, attributes: { exclude: ['password'] } }] });
  }

  // add owner property if the current post belongs to the current user
  static placeOwnership(post, userId) {
    post['owner'] = post.user.id === userId;
    post['comments'] = post.comments.map((comment) => {
      if (comment.user_id === userId) {
        return { ...comment, owner: true };
      }
      return { ...comment, owner: false };
    });

    return post;
  }

  // get post by id with user and comments
  static async getPostWithUserAndCommentsById(postId) {
    const postData = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['id', 'username'],
          },
          order: [['created_at', 'DESC']],
        },
      ],
    });

    return postData.get({ plain: true });
  }

  // get all posts with user and comments
  static async getAllPostsWithUserAndComments() {
    return await Post.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['id', 'username'],
          },
        },
      ],
      order: [['updated_at', 'DESC']],
    });
  }

  // get all posts that belong to the user with user and comments
  static async getAllUserPosts(userId) {
    return await Post.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['id', 'username'],
          },
        },
      ],
      order: [['updated_at', 'DESC']],
    });
  }
}

module.exports = PostService;

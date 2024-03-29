const { Post, User, Comment } = require('../models');

class PostService {
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

  static async getPostById(postId, userId) {
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

  static async getAllPosts() {
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

const { Post, User, Comment } = require('../models');

class PostService {
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

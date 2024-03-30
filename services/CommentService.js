const { Comment } = require('../models');

class CommentService {
  // delete comment by id
  static async deleteCommentById(commentId) {
    return await Comment.destroy({
      where: {
        id: commentId,
      },
    });
  }

  // get comment by id
  static async getCommentById(commentId) {
    return await Comment.findByPk(commentId);
  }

  // check to see if comment user is equal to session user
  static canActionComment(comment, userId) {
    return comment.user_id === userId;
  }

  // create a new comment
  static async createComment(data) {
    await Comment.create(data);
  }
}

module.exports = CommentService;

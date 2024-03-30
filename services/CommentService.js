const { Comment } = require('../models');

class CommentService {
  static async deleteCommentById(commentId) {
    return await Comment.destroy({
      where: {
        id: commentId,
      },
    });
  }

  static async getCommentById(commentId) {
    return await Comment.findByPk(commentId);
  }

  static canActionComment(comment, userId) {
    return comment.user_id === userId;
  }
}

module.exports = CommentService;

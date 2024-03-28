const sequelize = require('../config/connection');
const { Comment } = require('../models');

const commentSeeds = [
  {
    comment_text: 'Ultrices in iaculis nunc sed augue lacus viverra.',
    post_id: 1,
    user_id: 3,
  },
  {
    comment_text: 'Vulputate ut pharetra sit amet aliquam id diam.',
    post_id: 2,
    user_id: 5,
  },
  {
    comment_text: 'Posuere ac ut consequat semper.',
    post_id: 3,
    user_id: 4,
  },
  {
    comment_text: 'Fringilla est ullamcorper eget nulla facilisi etiam.',
    post_id: 4,
    user_id: 1,
  },
  {
    comment_text: 'Nulla pellentesque dignissim enim sit amet venenatis.',
    post_id: 5,
    user_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentSeeds, { returning: true });

module.exports = seedComments;

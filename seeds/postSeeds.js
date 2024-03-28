const { Post } = require('../models');

const postSeeds = [
  {
    title: 'Lorem ipsum dolor',
    post_text:
      'sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user_id: 1,
  },
  {
    title: 'Et ultrices neque',
    post_text:
      'Venenatis urna cursus eget nunc scelerisque viverra. Mattis pellentesque id nibh tortor id aliquet lectus proin.',
    user_id: 2,
  },
  {
    title: 'Ullamcorper sit amet',
    post_text:
      'Auctor elit sed vulputate mi sit amet mauris. Pharetra pharetra massa massa ultricies. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper.',
    user_id: 3,
  },
  {
    title: 'Eget duis at tellus',
    post_text:
      'Nunc eget lorem dolor sed viverra ipsum nunc. Morbi tristique senectus et netus. Etiam non quam lacus suspendisse faucibus interdum posuere.',
    user_id: 4,
  },
  {
    title: 'Purus in massa',
    post_text: 'Amet est placerat in egestas erat imperdiet sed. Ullamcorper morbi tincidunt ornare massa.',
    user_id: 5,
  },
];

const seedPosts = () => Post.bulkCreate(postSeeds, { returning: true });

module.exports = seedPosts;

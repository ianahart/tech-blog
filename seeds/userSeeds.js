const { User } = require('../models');
const userSeeds = [
  {
    username: 'millieblue',
    password: 'Test12345%',
  },
  {
    username: 'danred',
    password: 'Test12345%',
  },
  {
    username: 'edabityellow',
    password: 'Test12345%',
  },
  {
    username: 'poolorange',
    password: 'Test12345%',
  },
  {
    username: 'sandragreen',
    password: 'Test12345%',
  },
];

const seedUsers = () => User.bulkCreate(userSeeds, { individualHooks: true, returning: true });

module.exports = seedUsers;

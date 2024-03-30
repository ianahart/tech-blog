const { User } = require('../models');

class UserService {
  // create a new user
  static async createUser(data) {
    let userData = await User.create(data);
    return userData;
  }

  // get user by username
  static async getUserByUserName(username) {
    const userData = await User.findOne({
      where: { username },
    });

    return userData;
  }

  // remove password field from user
  static detachPasswordField = (data) => {
    const exclude = ['password'];
    const includedFields = {};

    for (let prop in data) {
      if (!exclude.includes(prop)) {
        includedFields[prop] = data[prop];
      }
    }
    return includedFields;
  };
}

module.exports = UserService;

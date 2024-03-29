const { User } = require('../models');

class UserService {
  static async createUser(data) {
    let userData = await User.create(data);
    return userData;
  }

  static async getUserByUserName(username) {
    const userData = await User.findOne({
      where: { username },
    });

    return userData;
  }

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

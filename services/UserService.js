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

    return !(userData === null);
  }
}

module.exports = UserService;

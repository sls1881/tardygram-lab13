const { exchangeCodeForToken, getUserProfile } = require('../utils/github');
const User = require('../models/User');

module.exports = class UserService {
  static async create(code) {
    console.log(code, 'Code');
    const token = await exchangeCodeForToken(code);
    console.log(token, 'Token');

    const profile = await getUserProfile(token);
    console.log(profile, 'Profile');

    const user = await User.findByUsername(profile.username);
    console.log(user, 'User');

    if (!user) {
      return User.insert(profile);
    } else {
      return user;
    }
  }
};

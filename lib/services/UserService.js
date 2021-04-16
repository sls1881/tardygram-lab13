const { exchangeCodeForToken, getUserProfile } = require('../utils/github')
const User = require('../models/User');

module.exports = class UserService {
  static async create(code) {
  
    const token = await exchangeCodeForToken(code);

    const profile = await getUserProfile(token);

    const user = await User.findByUsername(profile.username);

    if(!user) {
      return User.insert(profile)
    
  } else {
    return user;
  }
  }
}
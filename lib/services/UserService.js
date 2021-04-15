const { exchangeCodeForToken } = require('../utils/github')

module.exports = class UserService {
  static async create(code) {
    const token = await exchangeCodeForToken(code);
  }
}
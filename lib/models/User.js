const pool = require('../utils/pool')

module.exports = class USER {
  username;
  photoUrl;

  constructor(row) {
    this.username = row.github_username;
    this.photoUrl = row.github_photo_url;
  }

  static async insert({ username, photoUrl }) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO users (github_username, git_photo_url) VALUES ($1, $2) RETURNING *',
      [username, photoUrl]
    );
    return new User(rows[0]);
  }
};
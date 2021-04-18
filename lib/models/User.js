const pool = require('../utils/pool');

module.exports = class User {
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
      'INSERT INTO users (github_username, github_photo_url) VALUES ($1, $2) RETURNING *',
      [username, photoUrl]
    );
    return new User(rows[0]);
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      `
    SELECT *
    FROM users
    WHERE github_username = $1
    `,
      [username]
    );

    if (rows.length < 1) return null;
    return new User(rows[0]);
  }

  static async findByUserWithPost(username) {
    const { rows } = await pool.query(
      `SELECT
        username,
        json_agg(post_photo, post_caption, post_tags) as posts
    FROM
        users
    INNER JOIN posts
    ON users.github_username = posts.username
    WHERE username=$1 
    GROUP by username`,
      [username]
    );
    return rows[0];
  }
};

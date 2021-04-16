const pool = require('../utils/pool');

module.exports = class Post {
  id;
  username;
  photo;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.username = row.github_username;
    this.photo = row.post_photo;
    this.caption = row.post_caption;
    this.tags = row.post_tags;
  }

  static async insert({ username, photo, caption, tags }) {
    const { rows } = await pool.query(
      `
      INSERT INTO posts (username, post_photo, post_caption, post_tags) VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, photo, caption, tags]
    );
    return new Post(rows[0]);
  }

  static async select() {
    const { rows } = await pool.query(`SELECT * FROM posts`);
    return rows.map((row) => new Post(row));
  }
};

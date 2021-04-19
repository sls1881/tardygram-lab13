const pool = require('../utils/pool');
const Comment = require('../models/Comment');

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

  //TODO update the test
  static async selectId(id) {
    const { rows } = await pool.query(
      `SELECT p.*,
      json_agg(c) AS comments
      FROM posts p
      JOIN comments c
      ON p.id = c.post
      WHERE p.id =$1
      GROUP BY 1 `,
      [id]
    );

    return {
      ...new Post(rows[0]),
      comments: rows[0].comments.map((comment) => new Comment(comment)),
    };
  }

  static async update(id, { caption }) {
    const { rows } = await pool.query(
      `
    UPDATE posts 
    SET post_caption = $1 
    WHERE id = $2 
    RETURNING *`,
      [caption, id]
    );

    return new Post(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM posts
    WHERE id = $1
    RETURNING *`,
      [id]
    );

    return new Post(rows[0]);
  }

  static async selectPopular() {
    const { rows } = await pool.query(`
    SELECT COUNT(*),
		comment
		FROM posts p
		JOIN comments c
		ON p.id = c.post
		GROUP BY 2
		ORDER BY 1 DESC
		LIMIT 10
    RETURNING *`);

    return rows.map((row) => new Post(row));
  }
};

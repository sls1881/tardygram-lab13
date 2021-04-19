//TODO create Comment class for POST and DELETE by ID
const pool = require('../utils/pool');

module.exports = class Comment {
  id;
  post;
  commentBy;
  comment;

  constructor(row) {
    this.id = row.id;
    this.post = row.post;
    this.commentBy = row.comment_by;
    this.comment = row.comment;
  }

  static async insert({ post, commentBy, comment }) {
    const { rows } = await pool.query(
      `
        INSERT INTO comments (post, comment_by, comment) VALUES ($1, $2, $3) RETURNING *`,
      [post, commentBy, comment]
    );
    return new Comment(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM comments WHERE id = $1 RETURNING *`,
      [id]
    );
    return new Comment(rows[0]);
  }
};

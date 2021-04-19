 
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE users (
  github_username TEXT NOT NULL PRIMARY KEY,
  github_photo_url TEXT NOT NULL
);

CREATE TABLE posts (
  id  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT REFERENCES users(github_username),
  post_photo TEXT NOT NULL,
  post_caption TEXT NOT NULL,
  post_tags TEXT NOT NULL
);

CREATE TABLE comments (
  id  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  comment_by TEXT REFERENCES users(github_username),
  comment TEXT NOT NULL
);


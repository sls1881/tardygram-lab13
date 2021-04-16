 
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
  github_username TEXT NOT NULL PRIMARY KEY,
  github_photo_url TEXT NOT NULL
);
CREATE TABLE posts (
  id  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  github_username TEXT NOT NULL,
  post_photo TEXT NOT NULL,
  post_caption TEXT NOT NULL,
  post_tags TEXT NOT NULL
);



const { Router } = require('express');
const { restart } = require('nodemon');
const ensureAuth = require('../middleware/ensureAuth');
const Post = require('../models/Post');

module.exports = Router().get('/', (req, res, next) => {
  Post.selectPopular()
    .then((popularPosts) => res.send(popularPosts))
    .catch(next);
});

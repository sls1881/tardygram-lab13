const { Router } = require('express');
const { restart } = require('nodemon');
const ensureAuth = require('../middleware/ensureAuth');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Post.insert({
      ...req.body,
      username: req.user.username,
    })
      .then((post) => res.send(post))
      .catch(next);
  })

  //   .get('/', async (req, res, next) => {
  //     try {
  //       const posts = await Post.select();
  //       res.send(posts);
  //     } catch (err) {
  //       next(err);
  //     }
  //   });

  .get('/', (req, res, next) => {
    Post.select()
      .then((post) => res.send(post))
      .catch(next);
  });

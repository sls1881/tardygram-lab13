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

  .get('/', (req, res, next) => {
    Post.select()
      .then((posts) => res.send(posts))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Post.selectId(req.params.id)
      .then((post) => res.send(post))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Post.update(req.params.id, {
      ...req.body,
      username: req.user.username,
    })
      .then((change) => res.send(change))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Post.delete(req.params.id, {
      ...req.body,
      username: req.user.username,
    })
      .then((remove) => res.send(remove))
      .catch(next);
  });

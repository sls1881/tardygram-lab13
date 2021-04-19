const { Router } = require('express');
const { restart } = require('nodemon');
const ensureAuth = require('../middleware/ensureAuth');
const Comment = require('../models/Comment')

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Comment.insert({
      ...req.body,
      username: req.user.username,
    })
      .then((comment) => res.send(comment))
      .catch(next);
  })

.delete('/:id', ensureAuth, (req, res, next) =>{
    Comment.delete(req.params.id, {
        ...req.body,
        username: req.user.username,
    })
    .then((remove) => res.send(remove))
    .catch(next);
})

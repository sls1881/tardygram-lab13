const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const UserService = require('../services/UserService');
const { sign } = require('../utils/jwt');


const twentyFourHrs = 1000 * 60 * 60 * 24;


module.exports = Router()
.get('/login', (req, res, next) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=read:user`)
})

.get('/login/callback', (req, res, next) => {
   UserService.create(req.query.code)
    .then((user) => {
        res.cookie('session', sign(user), {
          httpOnly: true,
          maxAge: twentyFourHrs,
          sameSite: 'strict',
        });
        res.redirect('/');
      })
      .catch(next); 
})
.get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
})

// .patch('/login:id', async (req, res, next) => {
// try {
//     const newPhoto = await User.update(req.body)
//     res.send(newPhoto)
// } catch (err) {
//     next(err);
// }
// })

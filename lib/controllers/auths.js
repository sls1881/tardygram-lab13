const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router()
.get('/login', (req, res, next) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=read:user`)
})

.get('/login/callback', (req, res, next) => {
   UserService.create(req.query.code)
    .then((user) => res.send(user))
    .catch(next)
    // console.log(res.body)
    // res.send('Welcome') 
})

// .patch('/login:id', async (req, res, next) => {
// try {
//     const newPhoto = await User.update(req.body)
//     res.send(newPhoto)
// } catch (err) {
//     next(err);
// }
// })
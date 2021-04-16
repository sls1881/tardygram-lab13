const { verify } = require('../utils/jwt');

module.exports = (req, res, next) => {
    try{
        const session = req.cookies;
        const user = verify(session);
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

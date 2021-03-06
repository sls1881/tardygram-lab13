const express = require('express');
const app = express();
app.use(require('cookie-parser')());
app.use(express.json());

app.use('/api/v1/auth', require('./controllers/auths'));
app.use('/api/v1/post', require('./controllers/posts'));
app.use('/api/v1/comment', require('./controllers/comments'));
app.use('/api/v1/popular', require('./controllers/populars'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

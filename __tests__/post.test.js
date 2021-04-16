const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => {
  req.user = {
    username: 'test_user',
    photoUrl: 'http://image.com/image.png',
  };

  next();
});

describe('tardygram routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  let post;
  beforeEach(async () => {
    post = await Post.insert({
      photo: 'http://pic.com/pic.png',
      caption: 'My cool pic',
      tags: 'fun',
    });
  });

  it('Creates a post from test-user', async () => {
    await User.insert({
      username: 'test_user',
      photoUrl: 'http://pic.com/pic.png',
    });

    return request(app)
      .post('/api/v1/post')
      .send(post)
      .then((res) => {
        expect(res.body).toEqual({
          id: '2',
          photo: 'http://pic.com/pic.png',
          caption: 'My cool pic',
          tags: 'fun',
        });
      });
  });

  it('Gets all posts', async () => {
    const res = await request(app).get('/api/v1/post');

    expect(res.body).toEqual([post]);
  });
});

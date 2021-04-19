const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment')

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

  let user;
 let comment;
  let post;
  beforeEach(async () => {
user = await User.insert({
    username: 'test_user',
    photoUrl: 'http://image.com/image.png'
})

    post = await Post.insert({
      photo: 'http://pic.com/pic.png',
      caption: 'My cool pic',
      tags: 'fun',
      username: user.username
    });

    comment = await Comment.insert({
      post:post.id,
      commentBy: user.username,
      comment:'Looks great!',
    });
  })

  it('Creates a post from test-user', async () => {
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

  it('Gets a post by ID', async () => {
    const res = await request(app).get(`/api/v1/post/${post.id}`);

    expect(res.body).toEqual({ 
      id: '1',
      photo: 'http://pic.com/pic.png',
      caption: 'My cool pic',
      tags: 'fun',
      comments: [{
        id: 1,
        comment: 'Looks great!',
        commentBy: 'test_user',
        post: 1
      }]});

  });

  it('Updates a post by ID', async () => {
    const newPost = { caption: 'My no fun pic' };

    const res = await request(app)
      .patch(`/api/v1/post/${post.id}`)
      .send(newPost);

    expect(res.body).toEqual({
      id: '1',
      photo: 'http://pic.com/pic.png',
      caption: 'My no fun pic',
      tags: 'fun',
    });
  });

  it('Delete a post by ID', async () => {
    const res = await request(app)
      .delete(`/api/v1/post/${post.id}`)

    expect(res.body).toEqual({
      id: '1',
      photo: 'http://pic.com/pic.png',
      caption: 'My cool pic',
      tags: 'fun',
    });
  });
});


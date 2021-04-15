//TODO create util functions
const fetch = require('node-fetch')

const exchangeCodeForToken = (code) => {
  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    })
  })
  .then((res) => res.json())
  .then(({ access_token }) => access_token);
};

const getUserProfile = (token) => {
  return fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`,
    },
  })
  .then((res) => res.json())
  .then(({ login, avatar_url }) => ({
    username: login,
    photoUrl: avatar_url,
  }));
};

module.exports = { exchangeCodeForToken 
};
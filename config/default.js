require('dotenv').config()

const configs = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWTSECRET,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET
};

module.exports = configs;
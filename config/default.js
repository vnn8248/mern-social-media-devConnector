require('dotenv').config()

const configs = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWTSECRET
};

module.exports = configs;
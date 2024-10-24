const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email
  }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
}

module.exports = generateAccessToken;
const jwt = require('jsonwebtoken');

module.exports =  {
  generateToken: (payload)=>  {
    const accessToken =  jwt.sign(payload, process.env.JWT_SECRET_ACCESS, { expiresIn: '1y' });
    return {accessToken}
  },

  verifyAccessToken: async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_ACCESS);
  },

}
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = {
  login: async (req, res) => {
    const { token } = req.body;
    const userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const { sub:providerId, name, email, picture:avatar } = userInfo.data;
    const user = await userService.findUserByProviderId({ providerId, name, email, avatar });
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1y' });
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.json({ user, accessToken });
  },
  logout: async (_, res) => {
    res.clearCookie("accessToken");
    res.json({});
  },
};

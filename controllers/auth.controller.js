const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = {
  login: async (req, res) => {
    try {
      const { token } = req.body;
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { sub: providerId, name, email, picture: avatar } = userInfo.data;
      const user = await userService.findUserByProviderId({
        providerId,
        name,
        email,
        avatar,
      });
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1y" }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.DOMAIN
            : "localhost",
      });
      res.json({ user, accessToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  logout: async (_, res) => {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.DOMAIN
            : "localhost",
      });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserData: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await userService.findUserById(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

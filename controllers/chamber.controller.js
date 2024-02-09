const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const chamberService = require("../services/chamber.service");
const userService = require("../services/user.service");

module.exports = {
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const { id: admin } = req.user;
      const adminUser = await userService.findUserById(admin);
      const whitelisted_emails = [adminUser.email];
      const chamber = chamberService.create(name, admin, whitelisted_emails);
      res.status(201).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

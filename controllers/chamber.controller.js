const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const chamberService = require("../services/chamber.service");

module.exports = {
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const { id: admin } = req.user;
      const adminUser = await userService.findUserById(admin);
      const whitelisted_emails = [adminUser.email];
      const chamber = chamberService.create(name, admin, whitelisted_emails);
      res.status(201).json(chamber);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  inactiveChambers: async (req, res) => {
    const { id } = req.user;

    try {
      const chambers = await chamberService.getChambers({admin: id});
      res.json(chambers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  chamberById: async (req, res) => {
    try {
      const { id } = req.params;
      const chamber = await chamberService.getChamberById(id);
      res.json(chamber);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deactivate: async (req, res) => {
    try {
      const { id } = req.params;
      const chamber = await chamberService.deactivate(id);
      res.json(chamber);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

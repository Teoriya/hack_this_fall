const Chamber = require('../models/chamber.model');

module.exports = { 
    create: async (name, adminId, whitelisted_emails) => {
        const chamber = await Chamber.create({ name, admin:adminId, whitelisted_emails });
        return chamber;
    }
}
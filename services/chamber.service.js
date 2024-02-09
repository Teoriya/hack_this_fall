const Chamber = require('../models/chamber.model');

module.exports = { 
    create: async (name, adminId, whitelisted_emails) => {
        const chamber = await Chamber.create({ name, admin:adminId, whitelisted_emails });
        return chamber;
    },
    getChambers: async (querry) => {
        const chambers = await Chamber.find(querry).populate('admin', 'name email avatar');
        return chambers;
    },
    getChamberById: async (id) => {
        const chamber = await Chamber.findById(id).populate('admin', 'name email avatar');
        return chamber;
    },
    deactivate: async (id) => {
        const chamber = await Chamber.findByIdAndUpdate(id, {status: 'inactive'}, {new: true});
        return chamber;
    }
}
const User = require('../models/user.model');

module.exports = {
    findUserByProviderId: async (userData) => {
        const user = await User.findOneAndUpdate({ providerId:userData.providerId },  userData , { new: true, upsert: true });
        return user;
    }
}
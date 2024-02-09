const mongoose = require('mongoose');

const chamberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: mongoose.Schema.ObjectId, required: true , ref: 'User' },
  whitelisted_emails: { type: [String], default: [] },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  endedAt: { type: Date },
},
{
    timestamps: true
});

const Chamber = mongoose.model('Chamber', chamberSchema);

module.exports = Chamber;

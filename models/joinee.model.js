const mongoose = require('mongoose');

const joineeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, required: true , ref: 'User' },
  chamber: { type: [String], default: [] },
},
{
    timestamps: true
});

const Joinee = mongoose.model('Joinee', joineeSchema);

module.exports = Joinee;

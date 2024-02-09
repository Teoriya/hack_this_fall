const mongoose = require('mongoose');

const fileAccessSchema = new mongoose.Schema({
  interviewee: { type: mongoose.Schema.ObjectId, required: true , ref: 'Joinee' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  endedAt: { type: Date },
},
{
    timestamps: true
});

const fileAccess = mongoose.model('fileAccess', fileAccessSchema);

module.exports = fileAccess;

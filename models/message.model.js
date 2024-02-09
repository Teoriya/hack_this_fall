const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  chamber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chamber',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  execution: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Execution'
  }
},
{
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

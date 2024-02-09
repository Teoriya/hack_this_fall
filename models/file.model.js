const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  chamber: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Chamber'
  },
  header_text: {
    type: String,
  }
},
{
    timestamps: true
});

const File = mongoose.model('File', fileSchema);

module.exports = File;

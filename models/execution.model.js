const mongoose = require("mongoose");

const executionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ["c", "cpp", "cs", "go", "java", "js", "ts", "kt", "py", "rs"],
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  time_taken: {
    type: Number,
    required: true,
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },
},
{
    timestamps: true
});

const Execution = mongoose.model("Execution", executionSchema);

module.exports = Execution;

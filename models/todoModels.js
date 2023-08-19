const mongoose = require("mongoose");
// Create a Todo schema
const todoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    id: { type: Number, required: false },
    purpose: { type: String, required: false },
    commit: { type: String, required: false },
    important: { type: String, required: false },
  },
  {
    versionKey: "__v",
  }
);

// Create a Todo model
const todosModel = mongoose.model("Todo", todoSchema);

module.exports = todosModel;

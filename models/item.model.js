const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Item = new Schema(
  {
    user: {
      type: String
    },
    item: {
      type: String,
      required: true,
      minlength: 1
    },
    completed: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Item", Item);

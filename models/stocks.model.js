const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let stockSchema =  Schema(
  {
    stocks: {
      type: Array,
      required: true,
    },
    time: {
      type: String,
      required: true,
      minlength: 1
    }
}
);

module.exports = mongoose.model("Stocks", stockSchema);
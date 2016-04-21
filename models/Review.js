var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

mongoose.model("Review", schema);
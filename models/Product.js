var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photoUrl: {
    type: String,
    required: true,
    default: "http://i.imgur.com/EZaTQeD.jpg"
  }
});

mongoose.model("Product", schema);
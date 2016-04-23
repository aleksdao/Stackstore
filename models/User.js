var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  }
});

mongoose.model("User", schema);

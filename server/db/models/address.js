var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = Schema ({
  address: {
    type: String,
    required: true
  },
  address2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  lat:  {
    type: Number
  },
  long:  {
    type: Number
  }
});

mongoose.model('Address', addressSchema);

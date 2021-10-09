const mongoose = require('../mongodb')
const { Schema } = mongoose;

const schema = new Schema({
  name:  String, // String is shorthand for {type: String}
  password: String
});

module.exports = mongoose.model('User', schema)
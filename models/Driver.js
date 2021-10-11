const mongoose = require('../mongodb')
const { Schema } = mongoose;

const schema = new Schema({
  name:  String,
  type: Number,
  interval: Number, // 20s: twenty seconds; 1h: one hour
  config: Map
});

module.exports = mongoose.model('Driver', schema)
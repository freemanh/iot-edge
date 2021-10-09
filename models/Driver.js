import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  name:  String, // String is shorthand for {type: String}
});

module.exports = mongoose.model('Driver', schema)
const mongoose = require('../mongodb')
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    props: [{
        name: String,
        unit: String,
        extra: Map
    }],
    driverId: ObjectId
});

module.exports = mongoose.model('Device', schema)
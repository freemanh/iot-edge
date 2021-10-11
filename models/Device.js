const mongoose = require('../mongodb')
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    props: [{
        name: String,
        unit: String,
        updatedAt: Date,
        value: Number,
        ratio: Number,
        extra: Map
    }],
    config: Map,
    driverId: String
});

module.exports = mongoose.model('Device', schema)
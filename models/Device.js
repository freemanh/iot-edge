const mongoose = require('../mongodb')
const { Schema } = mongoose;

const schema = new Schema({
    iotId: String, // IoT platform id
    code: String,
    name: String,
    props: {
        type: Map,
        of: new Schema({
            value: String,
            updatedAt: Date
        })
    },
    status: String,
    lastOnlineAt: Date, //上次上线时间
    productId: String,
    driverId: String
});

module.exports = mongoose.model('Device', schema)
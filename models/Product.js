const mongoose = require('../mongodb')
const { Schema } = mongoose;

const schema = new Schema({
    code: String,
    name: String,
    props: {
        type: Map,
        of: new Schema({
            name: String,
            dataType: String,
            unit: String,
            mode: String,
            ratio: Number,
            extra: Map
        })
    },
});

module.exports = mongoose.model('Product', schema)
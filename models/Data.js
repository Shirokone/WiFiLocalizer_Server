const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    sensorId: {
        type: String,
        required: true
    },
    ssid: {
        type: String,
        required: true
    },
    rssi: {
        type: Number,
        required: true
    }
});

module.exports = Data = mongoose.model("data", DataSchema);
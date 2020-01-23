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

const DataSchema2 = new Schema({

    sensorId: {
        type: String,
        required: true
    },
    measurements: [{
        ssid: {
            type: String,
            required: true
        },
        rssi: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        }
    }]
    
});

const SSID = new Schema({
    ssid: {
        type: String,
        required: true
    },
    measurements: [{
        sensorId: {
            type: String,
            required: true
        },
        rssi: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        }
    }]
})

module.exports = Data = mongoose.model("data", SSID);
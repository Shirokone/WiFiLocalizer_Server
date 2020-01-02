const express = require("express");
const router = express.Router();

// Models
const Data = require("../../models/Data");

// @route POST api/sensors
// @desc New Sensor Data
// @access Public
router.post("/", (req, res) => {
    console.log(req.body);
    const { SensorId, APs } = req.body;

    APs.forEach(element => {
        var newData = new Data({
            sensorId: SensorId,
            ssid: element.SSID,
            rssi: element.RSSI
        })

        newData.save();
    });

    res.status(200).json(req.body);
});

// @route GET api/sensors // @desc New Sensor Data // @access Public 
router.get("/all/", (req, res) => {
    Data.find({}).sort({sensorId: "asc", ssid: "asc", date: -1}).limit(200).exec((err, data) => {
        if(err){ 
            res.status(500) 
        } 
        if(data){ 
            res.status(200).json(data) 
        } 
    }) 
})

module.exports = router;
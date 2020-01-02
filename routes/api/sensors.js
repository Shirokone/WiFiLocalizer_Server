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
router.get("/", (req, res) => {
    Data.find({}).distinct("sensorId").sort({sensorId: "asc"}).exec((err, data) => {
        if(err){ 
            res.status(500).send(err) 
        } 
        if(!data){ 
            res.status(404).send()
        } 
        let result = []
        let itemsProcessed = 0
        data.forEach(sensor => {
            Data.find({sensorId: sensor.sensorId}).distinct("ssid").sort({date: -1}).exec((err, _data) => {
                if(err){ 
                    res.status(500).send(err) 
                } 
                result.push(_data)
                itemsProcessed++
                if(itemsProcessed == data.length){
                    return res.status(200).json(reslut)
                }
            })
        })
    }) 
})

module.exports = router;
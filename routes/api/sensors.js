const express = require("express");
const router = express.Router();

// Models
const Data = require("../../models/Data");

// @route POST api/sensors
// @desc New Sensor Data
// @access Public
router.post("/", (req, res) => {
    const { SensorId, APs } = req.body;
    Data.findOne({sensorId: SensorId}).exec((err,data) => {
        if(err){
            console.error(err)
        }
        if(!data){
            let newData = new Data({sensorId: SensorId})
            APs.forEach(element => {
                newData.measurements.push({
                    ssid: element.SSID,
                    rssi: element.RSSI
                })
        
            });
            newData.save((err) => {
                if(err){
                    console.error(err)
                }
                res.status(201).json(newData);
            });
        }else{//sensor exists
            APs.forEach(element => {
                let exists = false
                data.measurements.forEach((measure, ind) => {
                    if(measure.ssid == element.SSID){
                        exists = true
                        data.measurements[ind] = {
                            ssid: element.SSID,
                            rssi: element.RSSI,
                            date: Date.now()
                        }
                    }                    
                })
                if(!exists){
                    data.measurements.push({
                        ssid: element.SSID,
                        rssi: element.RSSI
                    })
                }
                
            })
            data.save((err) => {
                if(err){
                    console.error(err)
                }
                res.status(201).json(data);
            });
        }
    })
    

});

// @route GET api/sensors // @desc New Sensor Data // @access Public 
router.get("/", (req, res) => {
    Data.find({}).sort({sensorId: "asc"}).exec((err, data) => {
        if(err){ 
            res.status(500).send(err) 
        } 
        if(!data){ 
            res.status(404).send()
        } 
        console.log(data[0].measurements)
        return res.status(200).json(data)
                
    }) 
})

module.exports = router;
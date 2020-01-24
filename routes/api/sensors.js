const express = require("express");
const router = express.Router();
var mysql = require('mysql')

// Models
//const Data = require("../../models/Data");

//MYSQL

  var connection = mysql.createConnection({
    host: 'hosting1900584.online.pro',
    user: '00263908_wifi_trilaterator',
    password: 'wifi_trilaterator',
    database: '00263908_wifi_trilaterator'
  })

connection.connect(function(err) {
  if (err) {
    console.log('Connection is asleep (time to wake it up): ', err);
    handleDisconnect();
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

setInterval(() => {
  connection.query('SELECT 1', (err, rows) => {
      if (err) throw err;
  });   
}, 1000);

// @route POST api/sensors
// @desc New Sensor Data
// @access Public
router.post("/", (req, res) => {
  
      const { SensorId, APs } = req.body;
      APs.forEach(ap=>{
        connection.query("INSERT INTO readings (SSID, SensorID, Rssi) VALUES ('"+ap.SSID+"','"+SensorId+"','"+ap.RSSI+"')", (err, result)=>{
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        })
      })
      
      return res.status(201).send("OK");
});

// @route GET api/sensors 
// @desc Get all sensors
// @access Public 
router.get("/", (req, res) => {

    let sql = "SELECT * FROM All_Full_Readings";

    connection.query(sql,(err, result, fields)=>{
        if(err){
            return res.status(500).json(err);
        }
        return res.status(200).json(result)
    })
    
})

module.exports = router;
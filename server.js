const express = require('express');
const app = express();
app.use(express.json())
require('dotenv').config();

const http = require('http').createServer(app);
const port = process.env.PORT || 5000;

//DB:

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useCreateIndex: true, useNewUrlParser: true}).then(()=>console.log("Connected to DB"))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-auth-token, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

//Use Routes
app.use("/api/sensors", require("./routes/api/sensors.js"));


http.listen(port, () => console.log(`App running on port ${port}!`))

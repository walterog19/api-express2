const express = require('express');
require('dotenv').config();
const config = require('./config');
const mongoose = require("mongoose");
//const log = require('./middleware/log');
const app = express();

const api=require("./api");

const mongooseConfig =
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };

mongoose.connect(config.connectionDB,mongooseConfig)
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err));



app.use(express.json()); // recibir informaciòn en formato json
app.use("/api",api);
app.use("/api/v1",api);

app.listen(config.port, () => {
    console.log("Servicio iniciado");

});


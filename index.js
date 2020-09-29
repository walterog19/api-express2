const express = require("express");
require('dotenv').config();
const config = require('./config');
//const log = require('./middleware/log');
const app = express();

const api=require("./api");

//app.use(log.logMiddleware);
app.use(express.json()); // recibir informaciòn en formato json
app.use("/api",api);
app.use("/api/v1",api);

app.listen(config.port, () => {
    console.log("Servicio iniciado");

});


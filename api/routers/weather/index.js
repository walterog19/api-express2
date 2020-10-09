const express  = require("express");

const controller = require("./../../controllers/weather");

const router = express.Router();

router.route("/:city")
    .get(controller.getWeather);
  


module.exports = router;
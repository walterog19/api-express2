const express  = require("express");

const controller = require("./../../controllers/tweets");

const router = express.Router();

router.route("/")
    .post(controller.createTweet)
    .get(controller.getTweets);

router.route("/:indexTweet")
    .get(controller.getTweet);



module.exports = router;
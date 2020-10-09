const express  = require("express");

const controller = require("./../../controllers/tweets");
const authentication = require("./../../middleware/authentication");

const router = express.Router();

router.route("/")
    .post(authentication,controller.createTweet)
    .get(controller.getTweets);

router.route("/:indexTweet")
    .get(controller.getTweet);



module.exports = router;
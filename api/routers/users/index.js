const express  = require("express");

const controller = require("./../../controllers/users");

const router = express.Router();
const authentication = require("./../../middleware/authentication");
const authorization  = require("./../../middleware/authorization");
const audits  = require("./../../middleware/audits");

router.route("/")
    .post(controller.createUser)
    .get(authentication,audits,controller.getUsers);

router.route("/login")
    .post(controller.login);

router.route("/:username")
    .get(authentication,audits,controller.getUsers)
    .put(authentication, authorization,audits,controller.updateUser)
    .delete(authentication,authorization,audits,controller.deleteUser);

module.exports = router;
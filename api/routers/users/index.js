const express  = require("express");

const controller = require("./../../controllers/users");

const router = express.Router();

router.route("/")
    .post(controller.createUser)
    .get(controller.getUsers);

router.route(":/username")
    .get(controller.getUsers)
    .put(controller.updateUser)
    .delete(controller.deleteUser);

module.exports = router;
const express = require("express");
const users  = require("./routers/users");
const log  = require("./middleware/log");

const router = express.Router();

router.use(log);
router.use("/users", users);

module.exports = router;
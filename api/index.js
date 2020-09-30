const express = require("express");
const users  = require("./routers/users");
const tweets  = require("./routers/tweets");
const log  = require("./middleware/log");

const router = express.Router();

router.use(log);
router.use("/users", users);
router.use("/tweets",tweets);

module.exports = router;
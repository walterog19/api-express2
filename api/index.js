const express = require("express");
const morgan  = require("morgan");
const path   =  require("path");
const fs = require("fs");
const users  = require("./routers/users");
const tweets  = require("./routers/tweets");
const weather  = require("./routers/weather");

const { route } = require("./routers/users");

const file =  fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });




const router = express.Router();

router.use(morgan("combined",{stream:file}));
router.use("/users", users);
router.use("/tweets",tweets);
router.use("/weather",weather);


module.exports = router;
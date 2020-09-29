const fs = require("fs");

const log = (req, res, next) => {
    console.log(`${new Date(Date.now()).toLocaleString()}`);
    const archivo = fs.createWriteStream("./access.log", { 'flags': 'a' });
    const log = `${new Date(Date.now()).toLocaleString()} ${req.method} ${req.path} ${req.query} ${req.ip}\n`;
    archivo.write(log);
    console.log('log');

    next();
};

module.exports = log;

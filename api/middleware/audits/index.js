
const fs = require("fs");
const path   =  require("path");

const audits = (req, res, next) => {
    
    
    console.log(`${new Date(Date.now()).toLocaleString()}`);
    
    const archivo = fs.createWriteStream(path.join(__dirname, './../../../logs/audits.log'), { 'flags': 'a' });
    const username = req.username;   
    const log = `${new Date(Date.now()).toLocaleString()} ${username} ${req.method} ${req.path}  ${req.ip}\n`;
    archivo.write(log);
   

    next();
};

module.exports = audits;

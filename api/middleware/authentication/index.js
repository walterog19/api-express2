const jwt = require("jsonwebtoken");
const response = require("../../lib/response");
const config=require("./../../../config");

const authentication = (req, res,next)=> {

console.log(req.headers["x-access-token"]);
const token =req.headers["x-access-token"];

try{
const decoded = jwt.verify(token,config.jwTKey);
const username =decoded.username;
req.username = username;

next();

}
catch( e){
    res.json(response(false,undefined,"No autorizados")); 
}  

  
}

module.exports = authentication;

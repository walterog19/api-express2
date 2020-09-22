const express = require("express");
const fs = require('fs');

const app = express();

const port =3002;

// definir rutas

app.get("/", (request,response)=>{
    response.send("my home");
    

});

const logMiddleware = (req ,res,next)=>{
    console.log(`${new Date(Date.now()).toLocaleString()}`);
    

    next();
}

const logMiddlewareUser = (req ,res,next)=>{
    console.log(`${new Date(Date.now()).toLocaleString()}`);
    const archivo = fs.createWriteStream("./access.log",{'flags':'a'});
    const log =`${new Date(Date.now()).toLocaleString()} ${req.method} ${req.path} ${req.query} ${req.ip}\n`;
    archivo.write(log);

    next();
}


app.get("/users",logMiddleware,logMiddlewareUser, (request,response)=>{
   
    response.send(`Ruta de usuario fecha :${new Date(Date.now()).toLocaleString()}`);
    

});

app.get("/users/:id", logMiddleware,(request,response)=>{
   
    response.send(`Ruta de usuario : ${request.params.id} fecha :${new Date(Date.now()).toLocaleString()}`);
    

});

app.get("/tweets", logMiddleware,(request,response)=>{
    //const id  =request.query.id;
    //const user  = request.query.user;
    const{id,user}=request.query;

    response.send(` Twwet id :${id} del usuario :${user}`);


});

app.listen(port,()=>{
    console.log("Servicio iniciado");

});


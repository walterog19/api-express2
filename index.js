const express = require("express");
const fs = require('fs');

const app = express();

const port = 3002;

// definir rutas

app.get("/", (request, response) => {
    response.send("my home");


});



const logMiddleware = (req, res, next) => {
    console.log(`${new Date(Date.now()).toLocaleString()}`);
    const archivo = fs.createWriteStream("./access.log", { 'flags': 'a' });
    const log = `${new Date(Date.now()).toLocaleString()} ${req.method} ${req.path} ${req.query} ${req.ip}\n`;
    archivo.write(log);
    console.log('log');

    next();
}

app.use(logMiddleware);
app.use(express.json()); // recibir informaciòn en formato json



app.get("/users",  (request, response) => {

    response.send(`Ruta de usuario fecha :${new Date(Date.now()).toLocaleString()}`);


});

let users = [];

app.route("/users/:username")
.get((req,res)=>{
    const  username =req.params.username;
    console.log(users);
    const findUser = users.find(u=>u.username === username);
    if (findUser == undefined){
       
        res.status(500).send(`El usaurio  :${username} no existe existe!!`);
    }else{
             
        res.status(200).send(findUser);
    }   
})
.delete((req,res) =>{
    const  username =req.params.username;
    const find = users.find(u=>u.username === username);
    if (find == undefined){

        res.status(500).send(`El usaurio  :${username} no existe!!`);      
        
    }else{
    const findUsers = users.filter(u => u.username != username);
    users  = findUsers;
    res.status(200).send(users);
    }
     

})
.put((req,res) =>{
    const  username =req.params.username;
    const user ={
        name: req.body.name,
        username :req.body.username,
        email :req.body.email,
        passw :req.body.passw,
    }

    const find = users.find(u=>u.username === username)
    if (find == undefined){

        res.status(500).send(`El usaurio  :${username} no existe!!`)
        
        
    }else{
        const findUsers = users.filter(u => u.username !== username)
        console.log(findUsers)
        users  = findUsers
        users.push(user)
        res.status(200).send(users);
    }   

});






app.route("/users")
    .get((req,res)=>{
        res.send(users);
    })
    .post((req,res)=>{
        const user ={
            name: req.body.name,
            username :req.body.username,
            email :req.body.email,
            passw :req.body.passw,
        }
        console.log(users);

        const find = users.find(u=>u.email === user.email);
        console.log(find);
        if (find == undefined){
            users.push(user);
           
            res.status(200).send(` Se creo el  usuario :${user.name}`);
            
        }else{
            res.status(500).send(`El usaurio  :${user.name} ya existe!!`);
        }   
    })
    .put((req,res)=>{

    })
    .delete((req,res)=>{

    });


app.get("/tweets",  (request, response) => {
    //const id  =request.query.id;
    //const user  = request.query.user;
    const { id, user } = request.query;

    response.send(` Twwet id :${id} del usuario :${user}`);


});

app.listen(port, () => {
    console.log("Servicio iniciado");

});


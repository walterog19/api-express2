let users = require("./../../models/users");
const jwt  = require("jsonwebtoken");
const bcrypt = require("bcryptjs");// bcrypt / bcryptjs
const config = require('./../../../config');
const response  = require("./../../lib/response");


const login = (req,res)=>{
    const {username, password} = req.body;
    console.log(req.body);

    const user  = users.find(user=>user.username=== username  );

    if (user) {
        const findUser  =bcrypt.compareSync(password,user.passw);
        
        if (findUser){
            // firmar Token
            const token = jwt.sign({ username: username }, config.jwTKey);
            res.json(response(true,[{token}]));


        }else{
            req.send(response(false,undefined,"Datos inválidos"));

        }
    }else{
        req.send(response(false,undefined,"Datos inválidos"));

    }

   

};

const getUser = (req,res)=>{
    const  username =req.params.username;
    console.log(users);
    const findUser = users.find(u=>u.username === username);
    if (findUser == undefined){
       
        res.json(reponse(false,undefined,`El usaurio  :${username} no existe existe!!`));
    }else{
             
        res.json(response(true,[findUser]));
    }   
};

const deleteUser = (req,res) =>{
    const  username =req.params.username;
    const find = users.find(u=>u.username === username);
    if (find == undefined){

        res.json(response(false,undefined,`El usuario  :${username} no existe!!`));      
        
    }else{
    const findUsers = users.filter(u => u.username != username);
    users  = findUsers;
    res.json(response(true, users));
    }
     

};

const updateUser = (req,res) =>{
    const  username =req.params.username;
    const user ={
        name: req.body.name,
        username :req.body.username,
        email :req.body.email,
        passw :req.body.passw,
    }

    const find = users.find(u=>u.username === username)
    if (find == undefined){

        res.json(response(false,undefined,`El usuario  :${username} no existe!!`))
        
        
    }else{
        const findUsers = users.filter(u => u.username !== username)
        console.log(findUsers);
        users  = findUsers;
        users.push(user);
        res.json(response(true, users));
    }   

};

const getUsers = (req,res)=>{
    res.json(response(true,users));
};

const createUser = (req,res)=>{
    console.log(Number(config.saltRounds))
    console.log(req.body.passw)
    const salt = bcrypt.genSaltSync(Number(config.saltRounds));
    const claveEncriptada = bcrypt.hashSync(req.body.passw, salt);

    const user ={
        name: req.body.name,
        username :req.body.username,
        email :req.body.email,
        passw :claveEncriptada,
    }
    console.log(users);

    const find = users.find(u=>u.username === user.username);
    if (find == undefined){
        users.push(user);
       
        res.json(response(true, [user]));
        
    }else{
        res.json(response(false,undefine, `El usuario  :${user.username} ya existe!!`));
    }   
};

module.exports = {getUser ,deleteUser, updateUser ,getUsers,createUser,login};
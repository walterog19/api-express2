const users = require("./../../models/users");

const getUser = (req,res)=>{
    const  username =req.params.username;
    console.log(users);
    const findUser = users.find(u=>u.username === username);
    if (findUser == undefined){
       
        res.status(500).send(`El usaurio  :${username} no existe existe!!`);
    }else{
             
        res.status(200).send(findUser);
    }   
};

const deleteUser = (req,res) =>{
    const  username =req.params.username;
    const find = users.find(u=>u.username === username);
    if (find == undefined){

        res.status(500).send(`El usuario  :${username} no existe!!`);      
        
    }else{
    const findUsers = users.filter(u => u.username != username);
    users  = findUsers;
    res.status(200).send(users);
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

        res.status(500).send(`El usaurio  :${username} no existe!!`)
        
        
    }else{
        const findUsers = users.filter(u => u.username !== username)
        console.log(findUsers)
        users  = findUsers
        users.push(user)
        res.status(200).send(users);
    }   

};

const getUsers = (req,res)=>{
    res.send(users);
};

const createUser = (req,res)=>{
    const user ={
        name: req.body.name,
        username :req.body.username,
        email :req.body.email,
        passw :req.body.passw,
    }
    console.log(users);

    const find = users.find(u=>u.username === user.username);
    console.log(find);
    if (find == undefined){
        users.push(user);
       
        res.status(200).send(` Se creo el  usuario :${user.username}`);
        
    }else{
        res.status(500).send(`El usaurio  :${user.username} ya existe!!`);
    }   
};

module.exports = {getUser ,deleteUser, updateUser ,getUsers,createUser};
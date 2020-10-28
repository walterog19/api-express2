const User = require("./../../models/users");
const jwt  = require("jsonwebtoken");
const bcrypt = require("bcryptjs");// bcrypt / bcryptjs
const config = require('./../../../config');
const response  = require("./../../lib/response");



const login = (req,res)=>{
    const {username, password} = req.body;
    console.log(req.body);


    User.find({username : username},["password"])
    .then((users)=>{
        const user = users[0];

        const findUser  =bcrypt.compareSync(password,user.password);        
        if (findUser){
            // firmar Token
            const token = jwt.sign({ id:user._id }, config.jwTKey);
            res.status(200).json(response(true,[{token}]));


        }else{
            res.status(501).json(response(false,undefined,"Datos inválidos"));

        }
    })
    .catch((err) =>{

        res.json(response(false,undefined, [{message:err}]));

    });

     

};

const getUser = (req,res)=>{
    const  username =req.params.username;
   /* console.log(users);
    const findUser = users.find(u=>u.username === username);
    if (findUser == undefined){
       
        res.json(reponse(false,undefined,`El usaurio  :${username} no existe existe!!`));
    }else{
             
        res.json(response(true,[findUser]));
    }   */

    User.find({username : username}, ["name","userName"])
    .then((user)=>{
        res.json(response(true, user));

    })
    .catch((err) =>{

        res.json(response(false,undefined, [{message:err}]));

    });

};

const deleteUser = (req,res) =>{
    const  username =req.params.username;
   /* const find = users.find(u=>u.username === username);
    if (find == undefined){

        res.json(response(false,undefined,`El usuario  :${username} no existe!!`));      
        
    }else{
    const findUsers = users.filter(u => u.username != username);
    users  = findUsers;
    res.json(response(true, users));
    }*/

    User.remove({username:username})
    .then(()=>{
        res.json(response(true,undefined,"Se eliminó el usuario"))
    }) .catch((err) =>{

        res.json(response(false,undefined, [{message:err}]));

    });


};

const updateUser = (req,res) =>{
    const  username =req.params.username;
    const user ={
        name: req.body.name,
        email :req.body.email,
       
    }

    User.findByIdAndUpdate({username :username},user)
    .then((user)=>{
        res.json(response(true, user));
    })
    .catch((err) =>{

        res.json(response(false,undefined, [{message:err}]));

    });

   /* const find = users.find(u=>u.username === username)
    if (find == undefined){

        res.json(response(false,undefined,`El usuario  :${username} no existe!!`))
        
        
    }else{
        const findUsers = users.filter(u => u.username !== username)
        console.log(findUsers);
        users  = findUsers;
        users.push(user);
        res.json(response(true, users));
    }   */

    

};

const getUsers = async (req,res)=>{
  /* res.json(response(true,users));*/  
 try{
    const users = await User.find({}, ["name","userName"]);
    res.json(response(true, users));
    }catch(err){

        res.json(response(false,undefined, [{message:err}]));

    };

};

const createUser = (req,res)=>{
    console.log(Number(config.saltRounds))
    console.log(req.body.password)
    const salt = bcrypt.genSaltSync(Number(config.saltRounds));
    const claveEncriptada = bcrypt.hashSync(req.body.password, salt);

    const user ={
        name: req.body.name,
        userName :req.body.username,
        email :req.body.email,
        password :claveEncriptada,
    }
   

  /* const find = users.find(u=>u.username === user.username);
    if (find == undefined){
        users.push(user);
       
        res.json(response(true, [user]));
        
    }else{
        res.json(response(false,undefine, `El usuario  :${user.username} ya existe!!`));
    }  */

    User.find({username: user.username})
    .then((users)=>{

        if (users.lenght > 0){
            res.json(response(false,undefine, `El usuario  :${user.username} ya existe!!`));

        }else{

            const obj  = new User(user);
            obj.save()
            .then((user)=>{

                res.json(response(true, [user]))

            })
            .catch((err)=>{
                res.json(response(false,undefined, [{message:err}]));
            })   

        }
    });

};

module.exports = {getUser ,deleteUser, updateUser ,getUsers,createUser,login};
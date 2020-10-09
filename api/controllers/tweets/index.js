const tweets = require("./../../models/tweets");

const createTweet = (req,res)=>{
    const tweet ={
        text: req.body.text,
        fecha : new Date(Date.now()).toLocaleString(),
        username : req.username,
      
    }
    console.log(tweet);
    tweets.push(tweet);
    res.status(200).send(` Se creo el tweet :${tweet.fecha}`);
        
};

const getTweets = (req,res)=>{
    res.send(tweets);
};

const getTweet = (req,res)=>{
    const  index  =req.params.indexTweet;
    console.log(index);
    const findTweet = tweets[index];
    if (findTweet){
       
        res.status(500).send(`El tweet  :${index} no existe !!`);
    }else{
             
        res.status(200).send(findTweet);
    }   
};

module.exports = {createTweet , getTweets, getTweet};


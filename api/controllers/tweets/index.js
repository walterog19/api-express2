const Twitter = require("twitter");
const Tweet = require("./../../models/tweets");
const config = require("../../../config");
const response = require("./../../lib/response");

const createTweet = (req,res)=>{
    const tweet ={
        text: req.body.text,       
        username : req.username,
        dateTime : new Date(Date.now())
      
    }
    console.log(tweet);    
    const obj  = new Tweet(tweet);
    obj.save()
    .then((tweet)=>{

        res.json(response(true, [tweet]))

    })
    .catch((err)=>{
        res.json(response(false,undefined, [{message:err}]));
    })   

        
};

const getTweets = (req,res)=>{
    Tweet.find({})
    .then((tweets)=>{
        res.json(response(true, tweets));
    })
    .catch((err) =>{

        res.json(response(false,undefined, [{message:err}]));

    });
   
};

const getTweet = (req,res)=>{
    const  index  =req.params.indexTweet;
    console.log(index);
    Tweet.find({_id : index})
    .then((tweet)=>{
        res.json(response(true, tweet));

    })
    .catch((err) =>{

        res.json(response(false,undefined, [{message:err}]));

    });
};

const getTweetsStream = (req, res) => {
    const username = req.params.username;
    const client = new Twitter({
        consumer_key: config.twitter.consumerKey,
        consumer_secret: config.twitter.consumerSecret,
        access_token_key: config.twitter.accessTokenKey,
        access_token_secret: config.twitter.accessTokenSecret
      });
    client.get("statuses/user_timeline", {screen_name: username}, (err, tweets, reponse) => {
        if (err) 
            res.status(500).json(response(false, undefined, [ {message: "Ocurrió un error:"+err}]));
        else
            res.status(200).json(response(true, tweets));
    });  
};

module.exports = {createTweet , getTweets, getTweet,getTweetsStream};



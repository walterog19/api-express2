const Twitter = require("twitter");
const Tweet = require("./../../models/tweets");
const config = require("../../../config");
const response = require("./../../lib/response");

const createTweet = (req,res)=>{
    const tweet ={
        text: req.body.text,       
        user : req.id,
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

    const {page =1, limit =10}= req.query;
    const skip  = (page - 1 ) * limit;

    Tweet
    .find({}, ["text","createdAt","user","likes","comments"])
    .populate("user",["name","username"])
    .populate("comments.user",["name","username"])
    .sort({createdAt:-1})
    .limit(Number(limit))
    .skip(Number(skip))
    .then((tweets)=>{
        Tweet.countDocuments((err,total)=>{
            const totalPage = Math.ceil(total/limit);
            const hasMore  = page<totalPage;
            res.json(response(true, [{tweets,total,totalPage,hasMore}]));
        });
       
       
    })
    .catch((err) =>{
        console.log(err);
        res.json(response(false,undefined, err));

    });
   
};

const newLike = (req, res) => {
    const id = req.body.id;
    Tweet.updateOne({ _id: id}, { $inc: { likes: 1 } } ) 
    .then((tweets)=>{
        res.status(200).json(response(true, tweets));
    })
    .catch((err)=>{
        res.json(response(false, undefined, err));
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

const newComment = (req,res) =>{

    const id = req.body.id;
    const comment = {
        comment: req.body.comment,
        user: req.id
    };
    Tweet.updateOne({_id:id}, {$addToSet: {comments:comment}})
    .then((tweet)=>{
     
        res.json(response(true, tweet));

    })
    .catch((err) =>{

        res.json(response(false,undefined, [{message:err}]));

    });

   




};

module.exports = {createTweet , getTweets, getTweet,getTweetsStream,newComment,newLike};



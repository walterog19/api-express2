const config={
    port : process.env.PORT,
    saltRounds : process.env.SALTROUNDS,
    apiWeatherKey: process.env.API_WEATHER_KEY,
    jwTKey : process.env.JWT_KEY,

    twitter: {
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        accessTokenKey: process.env.ACCESS_TOKEN_KEY,
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
    },
    connectionDB: process.env.DB_CONNECTION_STRING


}

module.exports=config;




var Twit = require('twit')
var T = new Twit({
    consumer_key:         'Insert key for Twitter API here'
  , consumer_secret:      'Insert secret here'
  , access_token:         'Insert access token'
  , access_token_secret:  'Insert access token secret'
})
var stream = T.stream('statuses/filter', { track: 'GameOfThrones' })

var say = require('say'),
sys = require('sys');
var speak = require("node-speak");

var tweetArray=[];
var googleIsReading = false;

//Stream tweets using Twit
var twitterStream= stream.on('tweet', function (tweet) {
  var tweet = tweet.text;
  console.log(tweet)
  //Put tweets in an array as they come in
  tweetArray.push(tweet);
    if (!googleIsReading) {
      sayTweet();
    }

});


function sayTweet() {
  googleIsReading = true;
  //Take out the first tweet of the array
  var tweetToRead = tweetArray.shift();
  //Use a callback so that it doesn't read multiple tweets at the same time
  say.speak('Ralph', tweetToRead, function () {
      if (tweetArray.length > 0) {
          sayTweet();
      } 
      else {
        googleIsReading = false;
      }
  });
}
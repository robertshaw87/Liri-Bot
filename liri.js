require('dotenv').config();
var keys = require("./keys.js");
// var weather = require("weather-js");
var TwitterReq = require('twitter');
var SpotifyReq = require('node-spotify-api');
var inquirer = require('inquirer');
var request = require('request');

var spotify = new SpotifyReq(keys.spotify);
var twitter = new TwitterReq(keys.twitter);

start();

function start() {
    console.log("\n==============================\n\n   Hello! My name is Liri. \n\n==============================");
    var userInput = process.argv;
    userInput.splice(0, 2);
    if (userInput.length === 0) {
        userChoose();
    } else {
        console.log("COMMAND LINE ARGUMENTS");
    }
}

function pause(callback) {
    inquirer.prompt([
        {
            type: "input",
            message: "Please press ENTER to continue.",
            name: "userInput",
        }
    ]).then(callback);
}

function end() {
    console.log("\n\n==============================\n\n           Goodbye!\n\n==============================\n");
}

function userChoose() {
    console.log("\n")
    inquirer.prompt([
        {
            type: "list",
            message: "How can I help you today?",
            choices: ["Check out my Tweets", "Spotify a song", "Look up a movie", "Do what it says", "Nothing for now"],
            name: "userChoice"
        }
    ]).then(function(response){
        switch (response.userChoice){
            case "Check out my Tweets":
                chooseTwitter();
                break;
            case "Spotify a song":
                chooseSpotify();
                break;
            case "Look up a movie":
                chooseMovie();
                break;
            case "Do what it says":
                chooseText();
                break;
            default:
                end();
                break;
        }
    })
}

function chooseTwitter() {
    console.log("Twitter")
}

function chooseSpotify() {
    console.log("Spotify")
}

function chooseMovie() {
    console.log("\n");
    inquirer.prompt({
        type: "input",
        message: "Which movie would you like for me to look up?",
        name: "userMovie",
    }).then((response) => {
        if (response.userMovie){
            lookUpMovie(response.userMovie);
        } else {
            lookUpMovie("Mr. Nobody");
        }
    })
}

function lookUpMovie(movieName) {
    var requestName = movieName.replace(" ", "+");
    var requestURL = "http://www.omdbapi.com/?t=" + requestName + "&y=&plot=short&apikey=trilogy";
    request(requestURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            displayMovie(JSON.parse(response.body));
            pause(userChoose);
        } else {
            console.log(error)
        }
    });
}

function displayMovie (movieObj) {
    console.log("\n==============================\n");
    console.log(movieObj.Title);
    console.log(movieObj.Released);
    console.log("");
    console.log("Country: " + movieObj.Country);
    console.log("Language: " + movieObj.Language);
    console.log("Starring: " + movieObj.Actors);
    console.log("Plot: " + movieObj.Plot);
    console.log("");
    console.log("IMDB: " + movieObj.imdbRating);
    var tomatoObj = movieObj.Ratings.find(function (elem) {
        return (elem.Source === "Rotten Tomatoes")
    })
    console.log("Rotten Tomatoes: " + tomatoObj.Value);
    console.log("\n==============================\n");
}

function chooseText() {
    console.log("Text")
}
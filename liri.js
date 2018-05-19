require('dotenv').config();
var keys = require("./keys.js");
// var weather = require("weather-js");
var TwitterReq = require('twitter');
var SpotifyReq = require('node-spotify-api');

var inquirer = require('inquirer');
var request = require('request');
var fs = require("fs");

var spotify = new SpotifyReq(keys.spotify);
var twitter = new TwitterReq(keys.twitter);
var counter = 0;
start();

function start() {
    console.log("\n==============================\n");
    console.log("   Hello! My name is Liri. ");
    console.log("\n==============================");
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
    console.log("\n\n==============================");
    console.log("           Goodbye!");
    console.log("\n==============================\n");
}

function error(errorMessage) {
    console.log("\n\n==============================\n");
    console.log("            Error:");
    console.log(errorMessage);
    console.log("\n==============================\n");
}

// returns a random integer between 0 and the argument (inclusive)
function randInt(x) {
    return Math.floor(Math.random() * (x + 1));
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
                chooseRandom();
                break;
            default:
                end();
                break;
        }
    })
}

function chooseTwitter() {
    console.log("\n");
    inquirer.prompt({
        type: "input",
        message: "Whose twitter would you like to see?",
        name: "userTwitter",
    }).then(function (response) {
        lookUpTwitter(response.userTwitter);
    })
}

function lookUpTwitter(twitterName) {
    if (!twitterName)
        twitterName = "jph_anderson";
    console.log(twitterName);
}

function chooseSpotify() {
    console.log("\n");
    inquirer.prompt({
        type: "input",
        message: "Which song would you like for me to look up?",
        name: "userSpotify",
    }).then(function (response) {
        lookUpSpotify(response.userSpotify);
    })
}

function lookUpSpotify(songName) {
    if (!songName)
        songName = "My Heart Will Go On";
    spotify.search({
        type: "track",
        query: songName
    }, function(error, data){
        if (error)
            error(error);
        else {
            displaySong(data.tracks.items[0]);
            pause(userChoose);
        }
    })
}

function displaySong(songObj) {
    var songContent = "\n\n==============================\n";
    if (!songObj) {
        songContent +="\nI'm sorry. I couldn't find that song"
    } else {
        songContent += ("\n" + songObj.name);
        songContent += ("\n(" + songObj.album.name + ")")
        songContent += "\n";
        songContent += ("\nBy: " + songObj.artists[0].name);
        for (var i = 1; i < songObj.artists.length; i++) {
            songContent += ("\n    " + songObj.artists[i].name);    
        }
        songContent += "\n";
        songContent += ("\nPreview: " + songObj.preview_url);
    }
    songContent += "\n\n==============================\n";
    console.log(songContent);
    liriLog(songContent);
}

function chooseMovie() {
    console.log("\n");
    inquirer.prompt({
        type: "input",
        message: "Which movie would you like for me to look up?",
        name: "userMovie",
    }).then(function (response) {
        lookUpMovie(response.userMovie);
    })
}

function lookUpMovie(movieName) {
    if (!movieName)
        movieName = "Forrest Gump";
    var requestName = movieName.replace(" ", "+");
    var requestURL = "http://www.omdbapi.com/?t=" + requestName + "&y=&plot=short&apikey=trilogy";
    request(requestURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            displayMovie(JSON.parse(response.body));
            pause(userChoose);
        } else
            error(error);
    });
}

function displayMovie (movieObj) {
    var movieContent = "";
    movieContent += "\n\n==============================\n";
    movieContent += ("\n" + movieObj.Title + "\n" + movieObj.Released);
    movieContent += "\n";
    movieContent += ("\nCountry: " + movieObj.Country + "\nLanguage: " + movieObj.Language);
    movieContent += ("\nPlot: " + movieObj.Plot);
    movieContent += "\n";
    movieContent += ("\nIMDB: " + movieObj.imdbRating);
    var tomatoObj = movieObj.Ratings.find(function (elem) {
        return (elem.Source === "Rotten Tomatoes");
    })
    if (tomatoObj) {
        movieContent += ("\nRotten Tomatoes: " + tomatoObj.Value);
    }
    movieContent += ("\n\n==============================\n");
    console.log(movieContent);
    liriLog(movieContent);
}

function chooseRandom() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (!error) {
            var commandList = data.split(/\r\n|\n/);
            var command = commandList[randInt(commandList.length - 1)];
            command = command.split(" ")
            parse(command);
        } else
            error(error);
      });
}

function chooseUnknown() {
    console.log("unrecognized command");
}

function parse(commandArray) {
    var command = commandArray[0];
    commandArray.splice(0, 1);
    var input = commandArray.join(" ");
    switch (command) {
        case "my-tweets":
            lookUpTwitter(input);
            break;
        case "spotify-this-song":
            lookUpTwitter(input);
            break;
        case "movie-this":
            lookUpTwitter(input);
            break;
        case "do-what-it-says":
            chooseRandom();
            break;
        default:
            chooseUnknown(command);
    }
    console.log(command);
    console.log(typeof input);
    console.log(input === "");
}

function liriLog(str) {
    fs.appendFile("log.txt", str, function(error){
        if (error)
            error(error)});
}
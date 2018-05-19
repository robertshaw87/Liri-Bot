require('dotenv').config();
var keys = require("keys");
// var weather = require("weather-js");
var TwitterReq = require('twitter');
var SpotifyReq = require('node-spotify-api');
var inquirer = require('inquirer');
var request = require('request');

var spotify = new SpotifyReq(keys.spotify);
var twitter = new TwitterReq(keys.twitter);

function UserChoose() {
    inquirer.prompt([
        {
            type: "list",
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
    console.log("Movie")
}

function chooseText() {
    console.log("Text")
}
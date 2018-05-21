# Liri-Bot

Siri's Little Sister. This is a Language Interpretation and Recognition Interface. Tell it what you want to do, and it will execute your request to the best of its ability.


## Getting Started

Download the repository. Then, navigate to the folder and run install from your node package manager. You will need to make a .env file with your own API keys for twitter and spotify. If everything is installed, when you run liri.js, you should get a screen like this:

![Liri](assets/images/readme.gif "Liri")

Select what you want Liri to do and then follow the on screen instructions. If there's any issues, Liri will let you know!

### Prerequisites

You must have node installed in your terminal with support for the Node Package Manager.

### Installing

[Node.js](https://nodejs.org/en/)

Navigate to the Node.js website and follow the instructions to install Node. Then navigate to the project folder in your terminal. 

## Built With

* Html

* CSS

* [Javascript](https://www.javascript.com/) - The scripting language used

* [BootstrapCDN v4.1.0](https://getbootstrap.com/docs/4.1/getting-started/introduction/) - The web framework used

* [jQuery v3.3.1](http://jquery.com/) - Java library for DOM and CSS manipulation

* [Google Firebase 4.13.0](https://firebase.google.com/) - Online database

* [Google Fonts](https://fonts.google.com/) - Font repository

## Challenges

This was my first time working extensively with Firebase, so I had some issues with the logic flow neccesary to make my app do everything I wanted it to do. Thankfully, I managed to work through it by leaning heavily on the documentation and other online resources. This was a great challenge!

![Ready Token](assets/images/ready-token.PNG "Ready Token")

In order to handle the asynchronous nature of two different people playing, I ended up using a ready token to indicate whether a player has chosen a play. I listened for changes to the ready state of both players and when they had each selected a play, then I went into the logic behind the wins and losses.

![Queue](assets/images/queue.PNG "Queue")

I created a list of connected players to track the queue. Each time a new player enters or leaves, I have the players check to see if someone needs to moved up into the game room. If one of the players leave, the remaining player evaluates the queue and populates the game room with him or herself and the first person in the queue. In the case of there not being anyone in the queue (and thus no players in the game room running the queue logic) the first person to enter the queue automatically gets placed in the game room.

## Authors

* **Robert Shaw** - *Initial work* - [robertshaw87](https://github.com/robertshaw87)

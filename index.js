const questions = ["What is your GitHub username?",
    "Would you like your background to be blue, green, red, or pink?"
];
const Axios = require("./api.js")
var fs = require('fs');
//var github = require("github");
var inquirer = require('inquirer');
//get username and favorite color from user
inquirer
    .prompt([
        {
          type: "input",
          message: "What is your user name?",
          name: "username"
        },
        {
          type: "input",
          message: "What color would you like background?",
          name: "favoritecolor"
        }
      ])
    .then(function(response) {
        // If username isn't empty, Success!
        if (!(response.username) === "" && response.favoritecolor === "red" || "blue" || "green" || "pink") {
            console.log("Success!");
            console.log("Username: " + response.username);
            console.log("Color : " + response.favoritecolor);
            //write the color to colors.txt file
            fs.writeFile("colors.txt", response.favoritecolor,  function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
              Axios(response.username);

        } else {
            console.log("Invalid responses. Make sure user name is correct and either red, pink, clue, or green color has been inputed.")
        }
    });

    


//function writeToFile(colors.txt, data) {}


function init() {

}
//init();

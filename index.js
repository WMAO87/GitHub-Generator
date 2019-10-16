const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "whats your name?"
    },
    {
      type: "input",
      name: "location",
      message: "Where do you live?"
    },
    {
      type: "checkbox",
      name: "color",
      message: "whats your favorite color?",
      choices: ["green", "blue", "pink", "red", "yellow"]
    },
    {
      type: "input",
      name: "gituser",
      message: "whats your github username?"
    },
  ])
}

function gitHubInfo(username) {
  const queryUrl = `https://api.github.com/users/${username}`;
  console.log(queryUrl);
  axios.get(queryUrl)
  .then(response => {
    const user = response.data;
    const github = {
      name: user.name,
      company: user.company,
      blog: user.blog,
      bioImg: user.avatar_url,
      location: user.location,
      link: user.html_url,
      numRepos: user.public_repos,
      stars: user.starred_url,
      followers: user.followers,
      email: user.email
    }
    console.log(github);
    return github;
  })
}

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Node Generate</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid" style = background-color:${answers.color};>
  <div class="container">
    <h1 class="display-4">Hello! This is ${answers.name} speaking</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3 span class="badge badge-secondary">Contact Me </span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.gituser}</li>
      <div> </div>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
  .then(function (answers) {
    const gotGitHub = gitHubInfo();
    const html = generateHTML(answers);
    return writeFileAsync("index.html", html);
  })
  .then(function () {
    console.log("wrote to index.html");
  });


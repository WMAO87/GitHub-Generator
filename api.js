const axios = require('axios');
const fs = require('fs');
const generateHTML = require("./generateHTML")

function Axios(username) {
axios.get('https://api.github.com/users/' + username, {
  })
  .then(function (response) {
    console.log(response);
    console.log("------------------");
    //generate html here
   // console.log(response.data.following);
    //console.log(generateHTML(response.data));

fs.writeFile('index.html', generateHTML(response.data), function (err) {
  if (err) throw err;
  console.log('Saved');
});
    console.log("working?");
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  
}

module.exports = Axios;
// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const serverpass = process.env.Server_password;
var numbers;
fs.readFile("numbers.json", "utf-8", (err, data) => {
  if (err){
    console.error(err);
  } else {
    numbers = JSON.parse(data);
  }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static("public"));


app.get("/numbers.json", (req, res) => {
  res.sendFile(__dirname+"/numbers.json");
});

app.post("/control/update", (req, res) => {
  console.log(req.body.boxes);
  numbers = req.body
  fs.writeFile("./numbers.json", JSON.stringify(numbers), err => console.error(err));
  res.sendStatus(200);
});

// helper function that prevents html/css/script malice
const cleanseString = function(string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});;
var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
const { text } = require("body-parser");
const { interactionSettingsStore } = require("fullcalendar");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/final");
var nameSchema = new mongoose.Schema({
    firstName: String,
    USN: String,
    sem: String,
    div:String,
    event:String 
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addinfo", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("<h1>Your Details has been stored successfully...\nGet ready for the Event.......</h1>");
        })
        .catch(err => {
            res.status(400).send("Unable to save your details...");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
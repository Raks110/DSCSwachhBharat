const express = require('express');
const app = express();
const path = require('path');
var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyABlVTa0CGlNQjM7OQXwj5QlFUYaLvhaMw",
    authDomain: "swachh-bharat-a25be.firebaseapp.com",
    databaseURL: "https://swachh-bharat-a25be.firebaseio.com",
    projectId: "swachh-bharat-a25be",
    storageBucket: "swachh-bharat-a25be.appspot.com",
    messagingSenderId: "503016910028"
  };

firebase.initializeApp(config);
var database = firebase.database();

function writeQuestions(id,questions){
  firebase.database().ref('questions/' + id).set({
    title:questions[id].title,
    option1:questions[id].option1,
    option2:questions[id].option2,
    option3:questions[id].option3,
    option4:questions[id].option4,
    markedForReview:questions[id].markedForReview,
    checked:questions[id].checked,
    visited:questions[id].visited
  });
}

var ref = database.ref('questions/').on('value',function(snapshot){
  questions = snapshot.val();
});

app.use('/static', express.static('static'));

app.get('/addQuests',function(req,res) {

  var questionsImp = require("./variables/questions");
  var questions = questionsImp.questions;

  for(var i =0;i<questions.length;i++)
    writeQuestions(i,questions);

  res.send("Questions added.");
});

app.get('/getQuests', function(req,res) {
  var ref = database.ref('questions/').on('value',function(snapshot){
    questions = snapshot.val();
  });
  res.send(questions);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/rendered.html'));
});

app.listen(8080);

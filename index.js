const express = require('express');
const app = express();
const path = require('path');
var firebase = require("firebase");
const bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: 'DSC jumped over the brown fox', cookie: { maxAge: 60000 }}))


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

function addUser(user){
  firebase.database().ref('users/' + user.reg).set({
    registrationNum:user.reg,
    name:user.name,
    email:user.email
    });
}

function addUserLogin(reg,now){
  firebase.database().ref('userLogin/').push({
    registrationNum:reg,
    timeLogin: now.getTime()
    });
}

function addUserScore(reg,score){
  firebase.database().ref('userScore/' + reg).set({
    registrationNum:reg,
    timeDone: new Date().getTime(),
    score:score
    });
}

var ref = database.ref('questions/').once('value').then((snapshot) => {
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
  var ref = database.ref('questions/').once('value').then((snapshot) => {
    questions = snapshot.val();
    res.send(questions);
  });
});

app.get('/', function (req, res) {

  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  if(!req.session.loggedin){
    req.session.destroy();
    res.sendFile(path.join(__dirname+'/views/register.html'));
  }
  else{

    var ref = database.ref('userScore/' + req.session.userID).once('value').then((snapshot) => {
      users = snapshot.val();

        if(users == null)
          res.sendFile(path.join(__dirname+'/views/rendered.html'));
        else{
          req.session.skipGet = users.score;
          res.redirect('/done');
        }
    });
  }

});

app.get('/done',function(req,res){
  if(req.session.skipGet != null){
    res.send("You scored " + req.session.skipGet);
  }
  else{
    res.sendFile(path.join(__dirname+'/views/register.html'));
  }
})

app.post('/done',function(req,res) {

    const reqJson = req.body.checked;

    var score = 0;

    var questionsImp = require("./variables/answers");
    var answers = questionsImp.answers;

    const results = JSON.parse(reqJson);

    for(var i=0;i<results.length;i++){
      if(results[i].checked == answers[i]){
        score++;
      }
    }

    addUserScore(req.session.userID,score);

    res.send("You scored " + score);

})

app.post('/registering',function(req,res) {
  const reg = req.body.regNum;
  const email = req.body.email;
  const name = req.body.name;

  var ref = database.ref('users/' + reg).once('value').then((snapshot) => {
      users = snapshot.val();
      if(users == null){
          var user={
          'name':name,
          'reg':reg,
          'email':email,
          }

        addUser(user);

        var now = new Date();

        addUserLogin(reg,now);

        req.session.loggedin = true;
        req.session.userID = reg;

        res.redirect('/');

      }
      else{
        req.session.loggedin = true;
        req.session.userID = reg;
        res.redirect('/');
      }
  });

})

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/register.html'));
});

var port = process.env.PORT;

app.listen(port);

const express = require('express');
const app = express();
const path = require('path');
var firebase = require("firebase");
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('DSC jumped over the brown fox 110');
var session = require('express-session');

var regG;

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
    password:user.pass,
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
  console.log(req.session.loggedin);
  if(!req.session.loggedin)
    res.sendFile(path.join(__dirname+'/views/login.html'));

  var ref = database.ref('userScore/' + regG).on('value',function(snapshot){
    users = snapshot.val();
    if(users == null)
      res.sendFile(path.join(__dirname+'/views/rendered.html'));
    else{

      req.session.loggedin = false;
      req.session.skipGet = users.score;

      res.writeHead(302 , {
          'Location' : '/done'
      });
      res.end();
    }

  });

});

app.get('/done',function(req,res){
    if(req.session.skipGet != null){
          res.send("You scored " + req.session.skipGet);
    }
})

app.post('/done',function(req,res) {

    const reqJson = req.body.checked;
    console.log(reqJson);

    var score = 0;

    var questionsImp = require("./variables/answers");
    var answers = questionsImp.answers;

    const results = JSON.parse(reqJson);

    for(var i=0;i<results.length;i++){
      if(results[i].checked == answers[i]){
        score++;
      }
    }

    addUserScore(regG,score);

    res.send("You scored " + score);

})

app.post('/logging', function (req,res) {
  const reg = req.body.regNum;
  const pass = req.body.pass;

  regG = reg;

  var users;

  var ref = database.ref('users/' + reg + '/password/').on('value',function(snapshot){
    users = snapshot.val();

    if(users == null){
          req.session.loggedin = false;
    }

    if(pass == cryptr.decrypt(users)){
      var now = new Date();
      addUserLogin(reg,now);

      req.session.loggedin = true;

    }

    else{
      req.session.loggedin = false;
    }

    res.writeHead(302 , {
        'Location' : '/'
    });
    res.end();

  });

})

app.post('/registering',function(req,res) {
  const reg = req.body.regNum;
  const pass = req.body.pass;
  const email = req.body.email;
  const name = req.body.name;

  regG = reg;

  var encPass = cryptr.encrypt(pass);

  var user={
    'name':name,
    'reg':reg,
    'email':email,
    'pass':encPass
  }

  addUser(user);

  var now = new Date();

  addUserLogin(reg,now);

  req.session.loggedin = true;

  res.writeHead(302 , {
           'Location' : '/'
        });
  res.end();

})

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/login.html'));
});

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/register.html'));
});

var port = process.env.PORT;

app.listen(port);

const express = require('express');
const app = express();
const path = require('path');
var firebase = require("firebase");
const bodyParser = require('body-parser');
var session = require('express-session');
var MemoryStore = require('memorystore')(session)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session(
  { secret: "secret", store: new MemoryStore(), expires: new Date(Date.now() + (86400 * 1000))
  }));


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
  firebase.database().ref('userLogin/' + reg).set({
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
app.use('/assets', express.static('assets'));

app.get('/',function(req,res) {
  if(new Date().getTime() - new Date("April 14 2019 13:00") < 0)
    res.sendFile(path.join(__dirname+'/index.html'));
  else
    res.redirect('/register')
})

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

app.get('/quiz', function (req, res) {

  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');


  if(new Date().getTime() - new Date("April 14 2019 13:00") < 0)
    res.redirect('/');

  else{

  if(!req.session.loggedin){
    req.session.destroy();
    res.sendFile(path.join(__dirname+'/views/register.html'));
  }
  else{

    var ref = database.ref('userScore/' + req.session.userID).once('value').then((snapshot) => {
      users = snapshot.val();

        if(users != null){
          req.session.skipGet = users.score;
          req.session.score = req.session.skipGet;
          res.redirect('/done');
        }
        else{
          var ref = database.ref('userLogin/' + req.session.userID).once('value').then((snapshot) => {
            users = snapshot.val();
            req.session.remainingTime = 1800 - ((new Date().getTime() - users.timeLogin)/1000);
            if((new Date().getTime() - users.timeLogin)/1000 > 1800){

                console.log((new Date().getTime() - users.timeLogin)/1000);
                req.session.skipGet = 0;
                req.session.score = req.session.skipGet;
                addUserScore(req.session.userID,0);
                res.redirect('/done');
            }
            else{
                res.sendFile(path.join(__dirname+'/views/rendered.html'));
            }
          });
        }
    });
  }
  }

});

app.get('/done',function(req,res){

  if(new Date().getTime() - new Date("April 14 2019 13:00") < 0)
    res.redirect('/');

  else{

  if(req.session.skipGet != null){
    req.session.score = req.session.skipGet;
    res.sendFile(path.join(__dirname+'/views/done.html'));
  }
  else{
    res.sendFile(path.join(__dirname+'/views/register.html'));
  }
  }
})

app.post('/done',function(req,res) {


  if(new Date().getTime() - new Date("April 14 2019 13:00") < 0)
    res.redirect('/');

  else{
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

    req.session.score = score;

    addUserScore(req.session.userID,score);

    res.sendFile(path.join(__dirname+'/views/done.html'));
  }

})

app.post('/registering',function(req,res) {

  if(new Date().getTime() - new Date("April 14 2019 13:00") < 0)
    res.redirect('/');

  else{

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

        var ref = database.ref('userLogin/' + reg).once('value').then((snapshot) => {
            users = snapshot.val();

            if(users == null){
              addUserLogin(reg,now);
            }


            req.session.loggedin = true;
            req.session.userID = reg;

            res.redirect('/quiz');

        });

      }
      else{
        req.session.loggedin = true;
        req.session.userID = reg;
        res.redirect('/quiz');
      }
  });
  }

});

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/register.html'));
});

app.get('/getScore',function(req,res) {
  var score = req.session.score;
  res.send(score.toString());
})

app.get('/getTime',function(req,res) {
  var time = req.session.remainingTime;
  res.send(time.toString());
})

var port = process.env.PORT;

app.listen(port);

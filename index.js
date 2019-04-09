const express = require('express');
const app = express();
const path = require('path');
var firebase = require("firebase");
const bodyParser = require('body-parser');
var session = require('express-session');
var MemoryStore = require('memorystore')(session);
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dscmanipal.mit@gmail.com',
    pass: 'dscmanipal110'
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session(
  { secret: "secret",
    store: new MemoryStore(),
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    cookie:{
      maxAge:30*86400*1000
    }
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
    email:user.email,
    phone:user.phone,
    password:user.password,
    subscribed:user.subscribed,
    referral:user.referral,
    points:user.points
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

app.get('/getLogged',function(req,res){

  if(req.session.loggedin == true){
    var ref = database.ref('users/' + req.session.userID).once('value').then((snapshot) => {
      users = snapshot.val();
      var data = [];
      data.push(users.points);
      data.push(users.registrationNum);
      res.send(data);
    });
  }
  else{
    var data = [];
    data.push("false");
    data.push(0);
    res.send(data);
  }
})

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
            req.session.remainingTime = 900 - ((new Date().getTime() - users.timeLogin)/1000);
            if((new Date().getTime() - users.timeLogin)/1000 > 900){

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

  const reg = req.body.regNum;
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const password = req.body.pass;
  var subscribed = req.body.subscribe;
  var referral = req.body.ref;
  var points = 0;

  var ref = database.ref('users/' + reg).once('value').then((snapshot) => {
      users = snapshot.val();
      if(users == null){
        if(subscribed != "on")
          subscribed = "off";

        if(referral == ""){
          referral = "Not Applied.";

                  var user={
                  'name':name,
                  'reg':reg,
                  'email':email,
                  'phone':phone,
                  'password':password,
                  'subscribed':subscribed,
                  'referral':referral,
                  'points':points
                  }

                addUser(user);


                var now = new Date();

                var ref = database.ref('userLogin/' + reg).once('value').then((snapshot) => {
                    users = snapshot.val();

                    if(users == null){
                      if(new Date().getTime() - new Date("April 14 2019 13:00") >= 0)
                        addUserLogin(reg,now);
                    }


                    req.session.loggedin = true;
                    req.session.userID = reg;


                    if(new Date().getTime() - new Date("April 14 2019 13:00") < 0)
                      res.redirect('/');
                    else
                      res.redirect('/quiz');

                });
        }
        else{
                  if(referral != reg){
                  var ref = database.ref('users/' + referral).once('value').then((snapshot) => {
                    users = snapshot.val();
                    if(users != null){
                    var pointsRef = users.points + 1;
                    var ref = database.ref('users/' + referral).set({
                      registrationNum:users.registrationNum,
                      name:users.name,
                      email:users.email,
                      phone:users.phone,
                      password:users.password,
                      subscribed:users.subscribed,
                      referral:users.referral,
                      points:pointsRef
                    });

                      var mailOptions = {
                      from: 'dscmanipal.mit@gmail.com',
                      to: users.email,
                      subject: 'New Referral just signed up!',
                      text: name + " just signed up using your referral, and here's your referral point! You now have " + pointsRef + " referral points. Keep referring and stay ahead of your game! Your referral code is " + users.registrationNum + "."
                      };

                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                      var mailOptions = {
                      from: 'dscmanipal.mit@gmail.com',
                      to: email,
                      subject: 'You signed up with a referral!',
                      text: "Thanks for signing up, " + name+"! You signed up using " + users.name + "'s referral. You earned 1 referral point. Keep referring and stay ahead of the race! Your referral code is " + reg + "."
                      };

                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                          var user={
                          'name':name,
                          'reg':reg,
                          'email':email,
                          'phone':phone,
                          'password':password,
                          'subscribed':subscribed,
                          'referral':referral,
                          'points':points
                          }

                        addUser(user);


                        var now = new Date();

                        var ref = database.ref('userLogin/' + reg).once('value').then((snapshot) => {
                            users = snapshot.val();

                            if(users == null){
                              if(new Date().getTime() - new Date("April 14 2019 13:00") >= 0)
                                addUserLogin(reg,now);
                            }


                            req.session.loggedin = true;
                            req.session.userID = reg;


                            if(new Date().getTime() - new Date("April 14 2019 13:00") < 0)
                              res.redirect('/');
                            else
                              res.redirect('/quiz');

                        });
                        } else {
                          console.log('Email sent: ' + info.response);

                                points = points + 1;

                                  var user={
                                  'name':name,
                                  'reg':reg,
                                  'email':email,
                                  'phone':phone,
                                  'password':password,
                                  'subscribed':subscribed,
                                  'referral':referral,
                                  'points':points
                                  }

                                addUser(user);


                                var now = new Date();

                                var ref = database.ref('userLogin/' + reg).once('value').then((snapshot) => {
                                    users = snapshot.val();

                                    if(users == null){
                                      if(new Date().getTime() - new Date("April 14 2019 13:00") >= 0)
                                        addUserLogin(reg,now);
                                    }


                                    req.session.loggedin = true;
                                    req.session.userID = reg;


                                    if(new Date().getTime() - new Date("April 14 2019 13:00") < 0)
                                      res.redirect('/');
                                    else
                                      res.redirect('/quiz');

                                });
                        }
                      });
                    }
                  })
                }
                else{
                  var user={
                  'name':name,
                  'reg':reg,
                  'email':email,
                  'phone':phone,
                  'password':password,
                  'subscribed':subscribed,
                  'referral':referral,
                  'points':points
                  }

                addUser(user);


                var now = new Date();

                var ref = database.ref('userLogin/' + reg).once('value').then((snapshot) => {
                    users = snapshot.val();

                    if(users == null){
                      if(new Date().getTime() - new Date("April 14 2019 13:00") >= 0)
                        addUserLogin(reg,now);
                    }


                    req.session.loggedin = true;
                    req.session.userID = reg;


                    if(new Date().getTime() - new Date("April 14 2019 13:00") < 0)
                      res.redirect('/');
                    else
                      res.redirect('/quiz');

                });
                }

        }

      }
      else{
        res.redirect('/login')
      }
  });

});

app.post('/logging',function(req,res) {

  const reg = req.body.regNum;
  const password = req.body.pass;

  var ref = database.ref('users/' + reg).once('value').then((snapshot) => {
      users = snapshot.val();
      if(users == null){
          res.redirect('/register');
      }
      else{
        if(users.password != password){
          req.session.mismatch = true;
          res.redirect('/login');
        }
        else{

          var now = new Date();

          var ref = database.ref('userLogin/' + reg).once('value').then((snapshot) => {
              users = snapshot.val();

              if(users == null){
                if(new Date().getTime() - new Date("April 14 2019 13:00") >= 0)
                  addUserLogin(reg,now);
              }


              req.session.loggedin = true;
              req.session.userID = reg;


              if(new Date().getTime() - new Date("April 14 2019 13:00") < 0)
                res.redirect('/');
              else
                res.redirect('/quiz');

          });
        }
      }
  });


});

app.get('/mismatch',function(req,res) {
  if(req.session.mismatch)
    res.send('true');
  else
    res.send('false');
});


app.get('/register', function (req, res) {
  if(req.session.loggedin)
    res.redirect("/login");
  else
    res.sendFile(path.join(__dirname+'/views/register.html'));
});

app.get('/login', function (req, res) {
  if(req.session.loggedin)
    res.redirect("/quiz");
  else
    res.sendFile(path.join(__dirname+'/views/login.html'));
});

app.get('/getScore',function(req,res) {
  var score = req.session.score;
  res.send(score.toString());
})

app.get('/getTime',function(req,res) {
  var time = req.session.remainingTime;
  res.send(time.toString());
})

app.get('/forgot',function(req,res) {
    res.sendFile(path.join(__dirname+'/views/forgot.html'));
})

app.post('/forgotten',function(req,res){

  const reg = req.body.regNum;

  var ref = database.ref('users/' + reg).once('value').then((snapshot) => {
      users = snapshot.val();
      if(users == null){
          res.redirect('/register');
      }
      else{
        var mailOptions = {
        from: 'dscmanipal.mit@gmail.com',
        to: users.email,
        subject: 'Password Reset',
        text: 'Your Swachh Bharat Quiz password is: ' + users.password
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.redirect('/login');
      }

  });
})

app.post('/leaderJson',function(req,res) {
  const username = req.body.username;
  const password = req.body.password;
  if(username == "dscmanipal.mit.secure" && password == "desc.manipal.secure"){
    var numPeeps;
    var topRef = database.ref('users/').orderByChild('points').once('value').then((snapshot) => {
      var jsonOb = snapshot.val();
      numPeeps = Object.keys(jsonOb).length;
        var regNums = Object.keys(jsonOb);
        var dataArr = [];
        for(var i = 0; i < numPeeps; i++){
          dataArr.push(jsonOb[regNums[i]]);
        }
        dataArr.sort(function(a,b){
            return b.points - a.points;
          }
        );
        for(var i = 0; i < dataArr.length; i++) {
          delete dataArr[i]['password'];
          delete dataArr[i]['phone'];
          delete dataArr[i]['email'];
        }
        var output = {
          numReg:"",
          dataJson:[]
        }
        output.numReg = numPeeps;
        output.dataJson = dataArr;
        res.send(output);
    })
  }
  else{
    var output = {
      numReg:"-1",
      dataJson:[]
    }
    res.send(output);
  }
})

app.get('/leaderboard',function(req,res){
    res.sendFile(path.join(__dirname+'/leaderboard.html'));
})

var port = process.env.PORT;

app.listen(port);

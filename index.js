const express = require('express');
const app = express();
const path = require('path');

//var questionsImp = require('./variables/questions.js');
//var questions = questionsImp.questions;

app.set('view engine','pug');
app.use('/static', express.static('static'));

app.get('/', function (req, res) {
  //console.log(questions);
  //res.render('index', { questions : questions });
  res.sendFile(path.join(__dirname+'/views/rendered.html'));
});

app.listen(8080);

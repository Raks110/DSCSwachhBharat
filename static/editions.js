var questions;

$.ajaxSetup({async:false});

$.get("/getQuests",function(Array) {
  questions = Array;
  console.log(questions);
})

var i = 1;

function setData(i){
  document.getElementById('question').innerText = questions[i].title;
  if(questions[i].markedForReview){
    document.getElementById("markedSymbol").style.visibility = 'visible';
  }
  else{
    document.getElementById("markedSymbol").style.visibility = 'hidden';
  }
  questions[i].visited = true;
  document.getElementById('option1').value = questions[i].option1;
  document.getElementById('option1').style.backgroundColor = 'rgba(255,255,255,0.8)';
  document.getElementById('option2').value = questions[i].option2;
  document.getElementById('option2').style.backgroundColor = 'rgba(255,255,255,0.8)';
  document.getElementById('option3').value = questions[i].option3;
  document.getElementById('option3').style.backgroundColor = 'rgba(255,255,255,0.8)';
  document.getElementById('option4').value = questions[i].option4;
  document.getElementById('option4').style.backgroundColor = 'rgba(255,255,255,0.8)';
  marking();
  if(!(questions[i].checked == false)){
    document.getElementById(questions[i].checked).style.backgroundColor = 'rgb(208, 121, 113)';
  }
  if(questions[i].markedForReview){
    unMarking();
  }
}

function marking(){
  document.getElementById('markRev').innerText = "Mark for Review";
  document.getElementById('marked').style.visibility = 'visible';
  document.getElementById('unmarked').style.visibility = 'hidden';
  document.getElementById('unmarked').style.paddingRight = '0px';
}

function unMarking(){
  document.getElementById('markRev').innerText = "Unmark";
  document.getElementById('marked').style.visibility = 'hidden';
  document.getElementById('unmarked').style.visibility = 'visible';
  document.getElementById('unmarked').style.paddingRight = '10px';
}

function nextQuestion(){
  i++;
  if(i>questions.length - 1){
    i = 0;
  }
  setData(i);
}

function prevQuestion(){
  i--;
  if(i<0){
    i = questions.length - 1;
  }
  setData(i);
}

function markQuestion(){
  if(!questions[i].markedForReview){
    questions[i].markedForReview = true;
    document.getElementById("markedSymbol").style.visibility = 'visible';
    unMarking();
  }
  else{
      questions[i].markedForReview = false;
      document.getElementById("markedSymbol").style.visibility = 'hidden';
      marking();
  }
}

function selectedOption(id){
  if(!(questions[i].checked == false || questions[i].checked == id)){
    document.getElementById(questions[i].checked).style.backgroundColor = 'rgba(255,255,255,0.8)';
  }
  if(id != questions[i].checked){
    questions[i].checked = id;
    document.getElementById(questions[i].checked).style.backgroundColor = 'rgb(137, 50, 42)';
  }
  else{
    questions[i].checked = false;
    document.getElementById(id).style.backgroundColor = 'rgba(0,0,0,0.9)';
  }
}

function hovereffect(id){
  if(questions[i].checked == false || questions[i].checked != id)
    document.getElementById(id).style.backgroundColor = 'rgba(0,0,0,0.9)';
  else
    document.getElementById(id).style.backgroundColor = 'rgb(137, 50, 42)';
}

function dehover(id){
  if(questions[i].checked == false || questions[i].checked != id)
    document.getElementById(id).style.backgroundColor = 'rgba(255,255,255,0.8)';
  else
    document.getElementById(id).style.backgroundColor = 'rgb(208, 121, 113)';
}

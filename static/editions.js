var questions;
var i = 1;
var legendVisible = false;
var questionsVisible = false;
var intervalVar;
var base_url = window.location.origin;

$.ajaxSetup({async:false});

$.get("/getQuests",function(Array) {
  questions = Array;
  console.log(questions);
})

function initQuests(){
  for(var i =0;i<questions.length;i++)
    $("#innerPane").append("<button class='questionBlocks' id=q" + i + " onclick='jumpQuest(this.id)'>" + parseInt(i+1) + "</button>");
}

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
    if(!questions[i].checked)
      document.getElementById("q" + i).style.backgroundColor = 'rgb(247, 206, 85)';
    else
      document.getElementById("q" + i).style.backgroundColor = 'rgb(143, 61, 143)';
    unMarking();
  }
  else{
      questions[i].markedForReview = false;
      document.getElementById("markedSymbol").style.visibility = 'hidden';if(!questions[i].checked);
      if(!questions[i].checked)
        document.getElementById("q" + i).style.backgroundColor = 'white';
      else
        document.getElementById("q" + i).style.backgroundColor = 'rgb(83, 172, 83)';
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
    if(questions[i].markedForReview){
      document.getElementById("q" + i).style.backgroundColor = 'rgb(143, 61, 143)';
    }
    else{
      document.getElementById("q" + i).style.backgroundColor = 'rgb(83, 172, 83)';
    }
  }
  else{
    questions[i].checked = false;
    document.getElementById(id).style.backgroundColor = 'rgba(0,0,0,0.9)';
    if(questions[i].markedForReview){
      document.getElementById("q" + i).style.backgroundColor = 'rgb(247, 206, 85)';
    }
    else{
      document.getElementById("q" + i).style.backgroundColor = 'white';
    }
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

function jumpQuest(id){
  i = parseInt(id.substring(1));
  setData(i);
}

function viewLegend(){
  if(!legendVisible){
    document.getElementById("profile").style.display = "block";
    document.getElementById("legendViewer").innerText = "Hide Legend"
    legendVisible = true;
  }
  else{
    document.getElementById("profile").style.display = "none";
    document.getElementById("legendViewer").innerText = "View Legend"
    legendVisible = false;
  }
}

function viewQuestion(){
  if(!questionsVisible){
    document.getElementById("questionPane").style.display = "block";
    document.getElementById("questionsViewer").innerText = "Hide Questions"
    questionsVisible = true;
  }
  else{
    document.getElementById("questionPane").style.display = "none";
    document.getElementById("questionsViewer").innerText = "View Questions"
    questionsVisible = false;
  }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        if(minutes == 0 && seconds == 0){
          submit();
        }

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var thirtyMinutes = 60 * 30,
    display = document.querySelector('#time');
    startTimer(thirtyMinutes, display);
};

function submit(){
  window.clearInterval(intervalVar);
  document.getElementById("hiddenVal").value = JSON.stringify(questions);
  document.getElementById("finalSubmit").submit();
  //window.location.replace(base_url + "/done");
}

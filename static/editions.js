  var questions = [
    {
      'title':'Question 1',
      'option1':'Option 1',
      'option2':'Option 2',
      'option3':'Option 3',
      'option4':'Option 4',
      'markedForReview':false,
      'checked':false,
      'visited':false
    },
    {
      'title':'Question 2',
      'option1':'Option 1',
      'option2':'Option 2',
      'option3':'Option 3',
      'option4':'Option 4',
      'markedForReview':false,
      'checked':false,
      'visited':false
    },
    {
      'title':'Question 3',
      'option1':'Option 1',
      'option2':'Option 2',
      'option3':'Option 3',
      'option4':'Option 4',
      'markedForReview':false,
      'checked':false,
      'visited':false
    },
    {
      'title':'Question 4',
      'option1':'Option 1',
      'option2':'Option 2',
      'option3':'Option 3',
      'option4':'Option 4',
      'markedForReview':false,
      'checked':false,
      'visited':false
    },
    {
      'title':'Question 5',
      'option1':'Option 1',
      'option2':'Option 2',
      'option3':'Option 3',
      'option4':'Option 4',
      'markedForReview':false,
      'checked':false,
      'visited':false
    },
    {
      'title':'Question 6',
      'option1':'Option 1',
      'option2':'Option 2',
      'option3':'Option 3',
      'option4':'Option 4',
      'markedForReview':false,
      'checked':false,
      'visited':false
    },
    {
      'title':'Question 7',
      'option1':'Option 1',
      'option2':'Option 2',
      'option3':'Option 3',
      'option4':'Option 4',
      'markedForReview':false,
      'checked':false,
      'visited':false
    },
    {
      'title':'Question 8',
      'option1':'Option 1',
      'option2':'Option 2',
      'option3':'Option 3',
      'option4':'Option 4',
      'markedForReview':false,
      'checked':false,
      'visited':false
    },
    {
      'title':'Question 9',
      'option1':'Option 1',
      'option2':'Option 2',
      'option3':'Option 3',
      'option4':'Option 4',
      'markedForReview':false,
      'checked':false,
      'visited':false
    },
    {
      'title':'Question 10',
      'option1':'Option 1',
      'option2':'Option 2',
      'option3':'Option 3',
      'option4':'Option 4',
      'markedForReview':false,
      'checked':false,
      'visited':false
    }
  ]

var i = 1;

function setData(i){
  document.getElementById('question').innerText = questions[i].title;
  if(questions[i].markedForReview){
    document.getElementById('question').style.color = 'violet';
  }
  else{
    document.getElementById('question').style.color = 'red';
  }
  questions[i].visited = true;
  document.getElementById('option1').value = questions[i].option1;
  document.getElementById('option1').style.backgroundColor = 'blue';
  document.getElementById('option2').value = questions[i].option2;
  document.getElementById('option2').style.backgroundColor = 'blue';
  document.getElementById('option3').value = questions[i].option3;
  document.getElementById('option3').style.backgroundColor = 'blue';
  document.getElementById('option4').value = questions[i].option4;
  document.getElementById('option4').style.backgroundColor = 'blue';
  document.getElementById('markRev').value = "Mark for Review";
  if(!(questions[i].checked == false)){
    document.getElementById(questions[i].checked).style.backgroundColor = 'green';
  }
  if(questions[i].markedForReview){
    document.getElementById('markRev').value = "Unmark this Question";
  }
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
    document.getElementById('question').style.color = 'violet';
    document.getElementById('markRev').value = "Unmark this Question";
  }
  else{
      questions[i].markedForReview = false;
      document.getElementById('question').style.color = 'red';
      document.getElementById('markRev').value = "Mark for Review";
  }
}

function selectedOption(id){
  if(!(questions[i].checked == false)){
    document.getElementById(questions[i].checked).style.backgroundColor = 'blue';
  }
  if(id != questions[i].checked){
    questions[i].checked = id;
    document.getElementById(questions[i].checked).style.backgroundColor = 'green';
  }
  else{
    questions[i].checked = false;
  }
}

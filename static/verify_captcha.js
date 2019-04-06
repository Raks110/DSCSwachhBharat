/*
function checkCaptcha(){
  var v = grecaptcha.getResponse();
  if(v.length == 0)
  {
      document.getElementById('captcha').innerHTML="You can't leave Captcha Code empty";
      return false;
  }
  else
  {
      document.getElementById('captcha').innerHTML="Captcha completed";
      return true;
  }
}

function buttonClick(){
  if(checkCaptcha){
    $("#regForm").submit();
  }
}
*/

//window.onload = function(){


//}

window.onload = function(){

$("#regForm").submit(function(event) {
  document.getElementById("endQuizDiv").style.display = "block";
  document.getElementById("accept").addEventListener("click",function(){
      return true;
  });
  document.getElementById("reject").addEventListener("click",function(){
    document.getElementById("endQuizDiv").style.display = "none";
    return false;
  });
  event.preventDefault();
});
}


window.onload = function(){

  var logged;

  $.ajaxSetup({async:false});

  $.get("/mismatch",function(text) {
    logged = text;
  })

  if(logged == "true"){
    document.getElementById("passiebaba").style.border = "2px solid #990000";
  }
  else{
    document.getElementById("passiebaba").style.border = "0px solid white";
  }

  var keepLoading = true;

  $("#regForm").submit(function(e){
    if(new Date().getTime() - new Date("April 14 2019 13:00") >= 0){
      if(keepLoading){
        e.preventDefault();
        document.getElementById("endQuizDiv").style.display = "block";
        document.getElementById("accept").addEventListener("click",function(){
          document.getElementById("endQuizDiv").style.display = "none";
          keepLoading = false;
          $("#regForm").submit();
        });
        document.getElementById("reject").addEventListener("click",function(){
          document.getElementById("endQuizDiv").style.display = "none";
          return false;
        });
      }
    }

  })

}

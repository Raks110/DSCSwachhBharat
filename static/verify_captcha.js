
window.onload = function(){

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

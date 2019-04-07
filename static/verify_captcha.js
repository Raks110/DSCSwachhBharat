
window.onload = function(){

$("#continueLog").click(function(e){
  e.preventDefault();
  document.getElementById("endQuizDiv").style.display = "block";
  document.getElementById("accept").addEventListener("click",function(){
    document.getElementById("endQuizDiv").style.display = "none";
      $("#regForm").submit();
  });
  document.getElementById("reject").addEventListener("click",function(){
    document.getElementById("endQuizDiv").style.display = "none";
  });

})
}

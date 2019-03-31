
function initScore(){

  $.ajaxSetup({async:false});
  var score;

  $.get("/getScore",function(text) {
    score = text;
    console.log("AJAX: " + score);
  })

  document.getElementById("scoreDis").innerHTML = "You scored "+score+"! That's great!<br/>Results will be announced soon.";
}

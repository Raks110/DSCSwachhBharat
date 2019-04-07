
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

}

var base_url = window.location.origin;

function loginCall(){
  window.location.replace(base_url + "/login");
}

function registerCall(){
  window.location.replace(base_url + "/register");
}

function validatePass(){
  return document.getElementById(passW).value == document.getElementById(passC).value;
}

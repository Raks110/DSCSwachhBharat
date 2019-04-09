window.onload = function(){

  var logged;

  $.ajaxSetup({async:false});

  $.get("/getLogged",function(Array) {
    logged = Array;
  })

  if(logged[0] != "false"){
    if(new Date().getTime() - new Date("April 14 2019 14:00") < 0)
      document.getElementById("RegisterDSCManipal").style.display = "none";
    else
      document.getElementById("RegisterDSCManipal").innerText = "Start Quiz";
    if(logged[0] > 1)
      document.getElementById("referral").innerText = "You have scored " + logged[0] + " referral points. Your referral code is " + logged[1] + ". Share this with your friends to earn more points and stay ahead of the race!";
    else {
      document.getElementById("referral").innerText = "You have scored " + logged[0] + " referral point. Your referral code is " + logged[1] + ". Share this with your friends to earn more points and stay ahead of the race!";
    }
  }
}

(function($) {

  "use strict";

  $(window).on('load', function() {



     /* Page Loader active
    ========================================================*/
    $('#preloader').fadeOut();

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
    });



    /* ==========================================================================
    countdown timer
    ========================================================================== */
     jQuery('#clock').countdown('2019/04/14 13:00',function(event){
      var $this=jQuery(this).html(event.strftime(''
      +'<div class="time-entry days"><span>%-D</span> Days</div> '
      +'<div class="time-entry hours"><span>%H</span> Hours</div> '
      +'<div class="time-entry minutes"><span>%M</span> Minutes</div> '
      +'<div class="time-entry seconds"><span>%S</span> Seconds</div> '));
    });


    // one page navigation
    $('.onepage-nev').onePageNav({
            currentClass: 'active'
    });

    /* Back Top Link active
    ========================================================*/
      var offset = 200;
      var duration = 500;
      $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
          $('.back-to-top').fadeIn(400);
        } else {
          $('.back-to-top').fadeOut(400);
        }
      });

      $('.back-to-top').on('click',function(event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 600);
        return false;
      });

  });

}(jQuery));

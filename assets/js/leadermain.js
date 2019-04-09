window.onload = function(){

  var logged;
  var dataJsonMain;

  $.ajaxSetup({async:false});

  console.log("Entering 1");


  $.get("/getLogged",function(Array) {
    logged = Array;
  })

  $.post("/leaderJson",
    {
      username:"dscmanipal.mit.secure",
      password:"desc.manipal.secure"
    },
    function(data,status){
      dataJsonMain = data;
        var elements = $();
        for(var i = 0; i < 10 ; i++){
          if(i ==  0)
            elements = elements.add("<tr><td><i class='fas fa-trophy' style='color:gold;float:left;padding-top:5px'></i>&nbsp&nbsp" + data.dataJson[i].name + "</td><td class='hideCol'>" + data.dataJson[i].registrationNum + "</td><td>" + data.dataJson[i].points + "</td></tr>");
          if(i ==  1)
            elements = elements.add("<tr><td><i class='fas fa-trophy' style='color:silver;float:left;padding-top:5px'></i>&nbsp&nbsp" + data.dataJson[i].name + "</td><td class='hideCol'>" + data.dataJson[i].registrationNum + "</td><td>" + data.dataJson[i].points + "</td></tr>");
          if(i ==  2)
            elements = elements.add("<tr><td><i class='fas fa-trophy' style='color:#cd7f32;float:left;padding-top:5px'></i>&nbsp&nbsp" + data.dataJson[i].name + "</td><td class='hideCol'>" + data.dataJson[i].registrationNum + "</td><td>" + data.dataJson[i].points + "</td></tr>");
          if(i>=3)
            elements = elements.add("<tr><td>" + data.dataJson[i].name + "</td><td class='hideCol'>" + data.dataJson[i].registrationNum + "</td><td>" + data.dataJson[i].points + "</td></tr>");
        }
        $("#firstrank").append(data.dataJson[0].name + ": " + data.dataJson[0].points + " points");
        $("#secondrank").append(data.dataJson[1].name + ": " + data.dataJson[1].points + " points");
        $("#leaderboardCont").append(elements);


          var rank = -1;

          console.log(logged);

          if(logged[0] != "false"){

            console.log("Not false.");

            for(var i = 0;i<data.numReg;i++){
              if(data.dataJson[i].registrationNum == logged[1]){
                rank = parseInt(i+1);
              }
            }
            if(logged[0] > 1)
              $("#yourRank").append("You have scored " + logged[0] + " points! Your rank is " + rank + ".");
            else
              $("#yourRank").append("You have scored " + logged[0] + " point! Your rank is " + rank + ".");
          }
    }
  );

  $("#onClickShowLoads").click(function() {

          var elements = $();
          for(var i = 10; i < dataJsonMain.numReg ; i++){
            elements = elements.add("<tr><td>" + dataJsonMain.dataJson[i].name + "</td><td class='hideCol'>" + dataJsonMain.dataJson[i].registrationNum + "</td><td>" + dataJsonMain.dataJson[i].points + "</td></tr>");
          }
          $("#leaderboardCont").append(elements);
          document.getElementById("onClickShowLoads").style.display = "none";
  });
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

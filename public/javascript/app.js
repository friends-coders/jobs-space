'use strict'
// work.ejs  


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
// /* Demo purposes only */
// for hire me page
$(".hover").mouseleave(
  function() {
    $(this).removeClass("hover");
  }
);
$( document ).ready(function() {
let user;
let pass;
let spass;



  $('#SIO').on('click', function(event){
    signOut();
  })
  
  function signOut(){
    user = 'guest';
    pass = 'guest';
    spass = 'guest';

    set();
  }

  $('.update').on('click', function(){
    $('.updateFo').toggle();
  })

  $('.updateHi').on('click', function(){
    $('.updateHiFo').toggle();
  })
  


  function get(){
    let uu= localStorage.getItem('user');
    let pp= localStorage.getItem('pass');
    let ss= localStorage.getItem('spass');
    if(uu && pp){
      user = JSON.parse(uu);
      pass = JSON.parse(pp);
      spass = JSON.parse(ss);
    }else{
      user = 'guest';
      pass = 'guest';
      spass = 'guest';
    }
  }

  get();
  
  $('#SIForm').on('submit', function(event){
    // event.preventDefault();
    // console.log(event)
    spass = event.target[1].value;
    set();
  })
  
  if($('#ST').text() == "true"){
    user = $('#UN').text();
    pass = spass;
    set();
  }

  if($('#te').text() == 'Congraidlation !!'){
    window.location.reload();
  }
  $('#SUForm').on('submit', function(event){
    // event.preventDefault();
    user = event.target[0].value;
    pass = event.target[2].value;
    spass = event.target[2].value;
    // console.log(event.target[2].value)
    set();
  })

  if(user != 'guest'){
    $('#SIO').html('<a href="/signOut" onclick="signOut()">Sign out</a>')
  }else{
    $('#SIO').html('<a href="/sign">Sign in</a>')
  }
  
  function set(){
    let uu = JSON.stringify(user);
    let pp = JSON.stringify(pass);
    let ss = JSON.stringify(spass);
    localStorage.setItem('user', uu);
    localStorage.setItem('pass', pp);
    localStorage.setItem('spass', ss);
  }

  // console.log($('#ST').text() )


  var xhr = new XMLHttpRequest();
  var data = {
      param: user,
      param2: pass,
  };
  xhr.open('POST', '/data');
  xhr.onload = function(data) {
      console.log('loaded', this.responseText);
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));


  
});

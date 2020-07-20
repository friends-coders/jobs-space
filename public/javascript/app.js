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
//   signI/Up Start
  //Tabs Layout Code
  // $("#tabs").tabs({
  //   activate: function (event, ui) {
  //     var active = $("#tabs").tabs("option", "active");
  //     $("#tabid").html(
  //       "the tab id is " + $("#tabs ul>li a").eq(active).attr("href")
  //     );
  //   },
  // });
  //   signI/Up End

// console.log('hiiiiiiiiiiiiiiiiiiiiiii thehtererer')

// $('#ahhaha').on("submit", function(event){
    // event.preventDefault();
    // location.reload();
    // console.log($('input[type="radio"]:checked').val())
// })

// $('input[type="radio"]').on('change', function() {
//     $('input[type="radio"]').not(this).prop('checked', false);
//  });
let user;
let pass;

$( document ).ready(function() {
  function get(){
    let uu= localStorage.getItem('user');
    let pp= localStorage.getItem('pass');
    if(uu && pp){
      user = JSON.parse(uu);
      pass = JSON.parse(pp);
    }else{
      user = 'guest';
      pass = 'guest'
    }
  }
  
  get();

  $('#SUForm').on('submit', function(event){
    // event.preventDefault();
    user = event.target[0].value;
    pass = event.target[2].value;
    // console.log(event.target[2].value)
    set();
  })

  function set(){
    let uu = JSON.stringify(user);
    let pp = JSON.stringify(pass);
    localStorage.setItem('user', uu);
    localStorage.setItem('pass', pp);
  }

  // console.log($('#ST').text() )
  if($('#ST').text() == "true"){
    user = $('#UN').text();
    set();
  }

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

function signOut(){
  user = 'guest';
  pass = 'guest'; 
}

  
});

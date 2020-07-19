'use strict'

//   signI/Up Start
  //Tabs Layout Code
  $("#tabs").tabs({
    activate: function (event, ui) {
      var active = $("#tabs").tabs("option", "active");
      $("#tabid").html(
        "the tab id is " + $("#tabs ul>li a").eq(active).attr("href")
      );
    },
  });
  //   signI/Up End

// console.log('hiiiiiiiiiiiiiiiiiiiiiii thehtererer')

$('#ahhaha').on("submit", function(event){
    // event.preventDefault();
    // location.reload();
    // console.log($('input[type="radio"]:checked').val())
})

// $('input[type="radio"]').on('change', function() {
//     $('input[type="radio"]').not(this).prop('checked', false);
//  });

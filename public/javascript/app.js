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

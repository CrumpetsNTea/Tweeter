$(document).ready(function() {
  $("#tweet-text").on('input', function(event) {
    let $numberOfChars = this.value.length;
    let $counter = $(this).closest("form").find(".counter").text(140 - $numberOfChars);
    if ($numberOfChars > 140) {
      $counter.css("color", "red");
    }
    if ($numberOfChars <= 140) {
      $counter.css("color", "#545149");
      $("#too-many-characters").slideUp();
    }
  });

});


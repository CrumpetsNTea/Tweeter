/* eslint-disable no-undef */
$(document).ready(function() {
  $("#tweet-text").on('input', function(event) {
    let $numberOfChars = this.value.length;
    // console.log(event.target.value);
    let $counter = $(this).closest("form").find(".counter").text(140 - $numberOfChars);
    // console.log(counter);
    if ($numberOfChars === 0) {
      $counter.text(140);
    }
    if ($numberOfChars > 140) {
      $counter.css("color", "red");
      $("#too-many-characters").slideDown();
    }
    if ($numberOfChars < 140) {
      $counter.css("color", "#545149");
      $("#too-many-characters").slideUp();
    }
  });
  $("#submitTweet").submit(function(event) {
    $(this).closest("form").find(".counter").text(140);
  }
  );
});

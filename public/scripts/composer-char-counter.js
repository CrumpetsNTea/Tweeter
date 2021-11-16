$(document).ready(function() {
  $("#tweet-text").on('keyup', function(event) {
    let $numberOfChars = this.value.length;
    // console.log(event.target.value);
    let $counter = $(this).closest("form").find(".counter").text(140 - $numberOfChars);
    // console.log(counter);
    if ($numberOfChars > 140) {
      $counter.css("color", "red");
    }
    if ($numberOfChars < 140) {
      $counter.css("color", "#545149");
    }
  });

});

// const $input = $("#new-channel-input")
// $input.on("keypress", (event) => {
//   console.log(event.target.value)
// });
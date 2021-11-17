/* eslint-disable camelcase */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const createTweetElement = tweet => {
    let $tweet = $("<article>").addClass('tweet');
    let html = `
  <header class="username-area">
    <p>${tweet.user.name}</p>
    <p class="username">${tweet.user.handle}</p> 
  </header>
  <p class="content">${tweet.content.text}</p>
  <footer class="date-and-time-icons">
    <p class= "date">${tweet.created_at}</p>
    <div class="icons">
    <i id="flag" class="fas fa-flag"></i>
    <i id="retweet" class="fas fa-retweet"></i>
    <i id="heart" class="fas fa-heart"></i>
  </div>
  </footer>
`;
    $tweet.append(html);
    return $tweet;
  };

  const $tweet = createTweetElement(tweetData[1]);
  console.log($tweet); // to see what it looks like
  $('.posted-tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});


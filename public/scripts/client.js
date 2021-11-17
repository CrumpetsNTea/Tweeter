/* eslint-disable no-undef */
/* eslint-disable camelcase */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  const renderTweets = function(tweets) {
    tweets = tweets.reverse(); //renders from newest to oldest
    for (const tweet of tweets) {
      $('.posted-tweets').append(createTweetElement(tweet)); //append the tweet to our posted tweets area
    }
  };

  const createTweetElement = tweet => {
    let $tweet = $("<article>").addClass('tweet'); //sets $tweet equal to a new article with the class of tweet
    let html = `
  <header class="username-area">
  <div class="name-and-pic">
  <img src="${tweet.user.avatars}">
    <p class="name">${tweet.user.name}</p>
    </div>
    <p class="username">${tweet.user.handle}</p> 
  </header>
  <p class="content">${tweet.content.text}</p>
  <footer class="date-and-time-icons">
    <p class= "date">${timeago.format(new Date(tweet.created_at))};</p>
    <div class="icons">
    <i id="flag" class="fas fa-flag"></i>
    <i id="retweet" class="fas fa-retweet"></i>
    <i id="heart" class="fas fa-heart"></i>
  </div>
  </footer>
`;
    $tweet.append(html); //appends our html here to the article we declared
    return $tweet;
  };

  $("#submitTweet").submit(function(event) {
    event.preventDefault();
    let values = $(this).serialize();
    if (values.length > 140) {
      alert(`Too many characters you silly goose - trim it down and try again.`);
      return;
    }
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: values,
      success: () => {
        loadNewTweet();
      },
      error: () => {
        alert("You can't post an empty tweet you silly goose");
      }
    });
  });
  


  const loadNewTweet = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (responseJSON) => {
        renderTweets(responseJSON);
      }

    });
  };
  loadNewTweet();
});
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  const renderTweets = function(tweets) {
    tweets = tweets.reverse();
    for (const tweet of tweets) {
      $('.posted-tweets').append(createTweetElement(tweet));
    }
  };

  const createTweetElement = tweet => {
    let $tweet = $("<article>").addClass('tweet');
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
    $tweet.append(html);
    return $tweet;
  };

  const postTweet = function() {
  //Posts a tweet to /tweets and loads it on the page
    $("#submitTweet").submit(function(event) {
      event.preventDefault();
      let values = $(this).serialize();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: values,
        success: () => {
          console.log(values);

        }
      });
    });
  };


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

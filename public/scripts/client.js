/* eslint-disable no-undef */
/* eslint-disable camelcase */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  //CREATES NEW STRUCTURED TWEETS USING AN OBJECT
  const createTweetElement = tweet => {
    let $tweet = $("<article>").addClass('tweet'); //sets $tweet equal to a new article with the class of tweet
    
    //TEXT VALIDATION FUNCTION USED BELOW TO PREVENT XSS - CHANGES THINGS INTO HARMLESS TEXT
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    let html = `
  <header class="username-area">
  <div class="name-and-pic">
  <img src="${tweet.user.avatars}">
    <p class="name">${escape(tweet.user.name)}</p>
    </div>
    <p class="username">${escape(tweet.user.handle)}</p> 
  </header>
  <p class="content">${escape(tweet.content.text)}</p>
  <footer class="date-and-time-icons">
    <p class= "date">${timeago.format(tweet.created_at)};</p>
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

  //AJAX POST REQUEST FOR ADDING TWEETS
  $("#submitTweet").submit(function(event) {
    $("#empty-submission").slideUp();
    event.preventDefault();
    let values = $(this).serialize();
    if (values.length > 140) {
      $("#too-many-characters").slideDown();
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: values,
        success: () => {
          $('#tweet-text').val("");
          loadNewestTweet();
        },
        error: () => {
          $("#empty-submission").slideDown();
          setTimeout(() => {
            $("#empty-submission").slideUp();
          }, 4000);
        }
      });
    }
    
  });

  //INITIAL LOADING OF TWEETS
  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (responseJSON) => {
        renderTweets(responseJSON);
      }

    });
  };
  loadTweets();

  //INITIAL RENDERING OF TWEETS PASSED IN FROM LOADTWEETS
  const renderTweets = function(tweets) {
    tweets = tweets.reverse(); //renders from newest to oldest
    for (const tweet of tweets) {
      $('.posted-tweets').append(createTweetElement(tweet)); //append the tweet to our posted tweets area
    }
  };

  //MAKES A GET REQUEST FOR THE NEWEST TWEET WRITTEN AND PASSES IT ON
  const loadNewestTweet = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (tweets) => {
        let newTweet = tweets.slice(-1)[0];       //gets our newest tweet from the array of tweet objects
        renderNewestTweet(newTweet);              //passes it on to the next function which will render it by prepending it to our tweet area
      }
    });
  };

  //RENDERS THE NEWEST TWEET ADDED FROM PASSED ON TWEET ABOVE
  const renderNewestTweet = (tweet) => {
    $('.posted-tweets').prepend(createTweetElement(tweet));     //prepend the new tweet because appending it causes it to be placed at the bottom of our tweet feed
  };

});

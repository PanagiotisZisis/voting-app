'use strict';

$(document).ready(function() {
  $('#voteButton').click(function() {
    var vote = $(this).val()
    console.log(vote);
  });
});
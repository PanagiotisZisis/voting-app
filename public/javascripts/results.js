'use strict';

$(document).ready(function() {
  var ctx = $('#myChart');
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  var colors = [];
  for (var i = 0; i < $('#chartContainer').data('labels').length; i++) {
    colors.push(getRandomColor());
  }

  var data = {
    datasets: [{
        data: $('#chartContainer').data('votes'),
        backgroundColor: colors,
        label: $('#chartContainer').data('labels')
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: $('#chartContainer').data('labels')
  };
  var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data
  });
});
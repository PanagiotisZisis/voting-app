'use strict';

$(document).ready(function() {
  $('#createPoll').click(function() {
    var count = 2;
    $('#modalBody').html('');
    $('#modalFooter').html('');
    $('#modalBody').html(
      `<div id="errorContainer"></div>
       <div class="form-group">
         <label for="title">Poll Title</label>
         <input type="text" class="form-control" id="title">
       </div>
       <div class="form-group">
         <label for="label1">Label 1</label>
          <input type="text" class="form-control" id="label1">
        </div>
        <div class="form-group">
          <label for="label2">Label 2</label>
          <input type="text" class="form-control" id="label2">
        </div>
        <div id="newLabelsContainer"></div>
        <button type="button" class="btn btn-outline-info" id="addLabel">Add Label</button>`
    );
    $('#modalFooter').html(
      `<button type="button" class="btn btn-secondary" data-dismiss="modal" id="close">Close</button>
       <button type="button" class="btn btn-primary" data-user="<%= user.username %>" id="createPollButton">Save New Poll</button>`
    );

    $('#addLabel').click(function() {
      count++;
      $('#newLabelsContainer').append(
        '<div class="form-group"><label for="label' + count + '">Label ' + count + '</label><input type="text" class="form-control" id="label' + count + '"></div>'
      );
    });

    $('#createPollButton').click(function() {
      $('#errorContainer').children('div').remove();
      var pollTitle = $('#title').val();
      var labelsArray = [];
      var errors = [];

      if (pollTitle === '') {
        errors.push('The Poll Title field is required.');
      }
      for (var i = 1; i <= count; i++) {
        if ($('#label' + i).val() === '') {
          errors.push('The Labels fields are required.');
          break;
        }
      }
      if (errors.length > 0) {
        for (var i = 0; i < errors.length; i++) {
          $('#errorContainer').append(
            '<div class="alert alert-danger" role="alert">' + errors[i] + '</div>'
          );
        }
      } else {
        for (var i = 1; i <= count; i++) {
          labelsArray.push($('#label' + i).val().trim());
        }
      }
    });
  });

  $('#myModal').on('hide.bs.modal', function() {
    $('#newLabelsContainer').children('div').remove();
    $('#errorContainer').children('div').remove();
  });
});
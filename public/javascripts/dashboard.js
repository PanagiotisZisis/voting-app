'use strict';

$(document).ready(function() {
  $('#createPoll').click(function() {
    var count = 2;
    $('#modalBody').html('');
    $('#modalFooter').html('');
    $('#modalHeader').html('');

    $('#modalHeader').html(
      `<h5 class="modal-title" id="exampleModalLabel">Create New Poll</h5>
       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>`
    );
    $('#modalBody').html(
      `<div id="errorContainer"></div>
       <p class="text-muted">If you add an extra Label by mistake, reopen this window!</p>
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
       <button type="button" class="btn btn-primary" id="createPollButton">Save New Poll</button>`
    );

    $('#addLabel').click(function() {
      count++;
      $('#newLabelsContainer').append(
        '<div class="form-group"><label for="label' + count + '">Label ' + count + '</label><input type="text" class="form-control" id="label' + count + '"></div>'
      );
    });

    $('#createPollButton').click(function() {
      $('#errorContainer').children('div').remove();
      var pollTitle = $('#title').val().trim();
      var labelsArray = [];
      var errors = [];
      var titleRegex = /^[\w ?;"',!\.]{1,60}$/i;
      var labelRegex = /^[\w ?;"',!\.]{1,20}$/i;

      if (!titleRegex.test(pollTitle)) {
        errors.push('Invalid Poll Title - Please keep it under 60 characters long.');
      }
      for (var i = 1; i <= count; i++) {
        labelsArray.push($('#label' + i).val().trim());
      }
      for (var i = 0; i < labelsArray.length; i++) {
        if (!labelRegex.test(labelsArray[i])) {
          errors.push('Invalid Label - Please keep it under 20 characters long.');
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
        var data = {
          title: pollTitle,
          labels: labelsArray
        };
        $.ajax({
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
          url: 'http://localhost:3000/dashboard/' + $('#myModal').data('user') + '/create',
          success: function() {
            location.reload(true);
          }
        });
      }
    });
  });

  $('#myModal').on('hide.bs.modal', function() {
    $('#newLabelsContainer').children('div').remove();
    $('#errorContainer').children('div').remove();
  });
});
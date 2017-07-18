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
       <div class="alert alert-info text-center" role="alert">
         If you add an extra Label by mistake, reopen this window!
       </div>
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
       <button type="button" class="btn btn-primary" id="createPollButton">Create New Poll</button>`
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
      var titleRegex = /^[\w -\[\]\}\{\+=_?;"',!\.]{1,60}$/i;
      var labelRegex = /^[\w -\[\]\}\{\+=_?;"',!\.]{1,30}$/i;

      if (!titleRegex.test(pollTitle)) {
        errors.push('Invalid Poll Title - Please keep it under 60 characters long.');
      }
      for (var i = 1; i <= count; i++) {
        labelsArray.push($('#label' + i).val().trim());
      }
      for (var i = 0; i < labelsArray.length; i++) {
        if (!labelRegex.test(labelsArray[i])) {
          errors.push('Invalid Label - Please keep it under 30 characters long.');
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
          url: 'https://shielded-meadow-81038.herokuapp.com/dashboard/' + $('#myModal').data('user') + '/create',
          success: function() {
            location.reload(true);
          }
        });
      }
    });
  });

  $('.deletePoll').click(function() {
    var title = $(this).data('polltitle');
    var id = $(this).data('pollid');
    $('#modalBody').html('');
    $('#modalFooter').html('');
    $('#modalHeader').html('');

    $('#modalHeader').html(
      `<h5 class="modal-title" id="exampleModalLabel">Delete</h5>
       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>`
    );

    $('#modalBody').html(
      `<p class="text center lead">Are you sure you want to delete this post with title:</p>
       <p class="text-center">${title}</p>`
    );

    $('#modalFooter').html(
      `<button type="button" class="btn btn-secondary" data-dismiss="modal" id="close">Close</button>
       <button type="button" class="btn btn-danger" id="deleteButton">Delete</button>`
    );

    $('#deleteButton').click(function() {
      var data = { id: id };
      $.ajax({
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'https://shielded-meadow-81038.herokuapp.com/dashboard/' + $('#myModal').data('user') + '/delete',
        success: function() {
          location.reload(true);
        }
      });
    });
  });

  $('.editPoll').click(function() {
    var id = $(this).data('pollid');
    var title = $(this).data('polltitle');
    var labels = $(this).data('polllabels');
    var additionalLabelsCount = 0;
    $('#modalBody').html('');
    $('#modalFooter').html('');
    $('#modalHeader').html('');

    $('#modalHeader').html(
      `<h5 class="modal-title" id="exampleModalLabel">Edit</h5>
       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>`
    );

    $('#modalFooter').html(
      `<button type="button" class="btn btn-secondary" data-dismiss="modal" id="close">Close</button>
       <button type="button" class="btn btn-primary" id="editButton">Save Changes</button>`
    );

    $('#modalBody').html(
      `<div class="alert alert-info text-center" role="alert">
         If you add an extra Label by mistake, reopen this window!
       </div>
       <div id="errorContainer"></div>
       <p class="text-center lead">This Poll has the following Title:</p>
       <p class="text-center">${title}</p>
       <p class="text-center lead">and the following Labels:</p>
       <div id=labelsContainer></div>`
    );

    for (var i = 0; i < labels.length; i++) {
      $('#labelsContainer').append(
        `<p class="text-center">${labels[i]}</p>`
      );
    }

    $('#modalBody').append(
      `<p class="text-center lead">Would you like to add more Labels?</p>
       <div id="additionalLabelsContainer"></div>
       <button type="button" class="btn btn-outline-info offset-sm-4 col-sm-4" id="addAdditionalLabels">Add Label</button>`
    );

    $('#addAdditionalLabels').click(function() {
      additionalLabelsCount++;
      $('#additionalLabelsContainer').append(
        `<input type"text" class="form-control" id="label${additionalLabelsCount}">
         <br />`
      );
    });

    $('#editButton').click(function() {
      if (additionalLabelsCount > 0) {
        var labelRegex = /^[\w -\[\]\}\{\+=_?;"',!\.]{1,30}$/i;
        var additionalLabelsArray = [];
        var errors = '';

        for (var i = 1; i <= additionalLabelsCount; i++) {
          additionalLabelsArray.push($('#label' + [i]).val().trim());
        }
        for (var i = 0; i < additionalLabelsArray.length; i++) {
          if (!labelRegex.test(additionalLabelsArray[i])) {
            errors = 'Invalid Labels - Please keep it under 30 characters long.';
            break;
          }
        }
        if (errors.length > 0) {
          $('#errorContainer').html(
            `<div class="alert alert-danger text-center" role="alert">
               ${errors}
             </div>`
          );
        } else {
          var data = {
            id: id,
            labels: additionalLabelsArray
          };
          $.ajax({
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'https://shielded-meadow-81038.herokuapp.com/dashboard/' + $('#myModal').data('user') + '/edit',
            success: function() {
              location.reload(true);
            }
          });
        }
      }
    });
  });

  $('#myModal').on('hide.bs.modal', function() {
    $('#newLabelsContainer').children('div').remove();
    $('#errorContainer').children('div').remove();
  });
});
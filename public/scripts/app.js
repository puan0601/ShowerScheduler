$(document).ready(function(){
  console.log("app.js is loaded!");

// this is the ajax request that handles populating the times listed in seed.js onto the main page
  $.ajax({
    method: "GET",
    url: "/api/timeslots",
    data: $(this).serialize(),
    success: renderAllTimeSlotsSuccess,
    error: renderAllTimesSlotsError
  });

  // $(".save-user").on("click", function(e) {
  //   e.preventDefault();
  //   console.log("save button clicked!");
  //
  //   var formData = $(this).serialize();
  //   console.log("formData", formData);
  //   $.post("/api/users", formData, function(user) {
  //     console.log("user after POST", user);
  //     renderAlbum(user);  //render the server's response
  //   });
  //   $(this).trigger("reset");
  // });

    // catch and handle the click on an add song button
    $(".time-table").on("click", ".schedule-button", handleSelectTimeClick);

    // save user modal save button



}); //end of $(document).ready(function(){})



// need to work on styling these buttons later
function renderAllTimeSlotsSuccess(json) {
  for (var i = 0; i < json.length; i++){
    // var currentSelectedTime = $(this).closest('.schedule-button').data('time')

    $(".time-table").append(`
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary btn-lg col-xs-10 col-xs-offset-1 schedule-button" data-target="entry-form-modal">
        Time: ${json[i].time}
      </button>
      <div class="modal fade entry-form-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-time-id="${json[i]._id}">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title myModalLabel">Confirm your reservation for time ${json[i].time} </h4>
            </div>
            <div class="modal-body">
              <form id="${json[i]._id}" class="entry-form">
                <label for="userName">Name:</label>
                <input class="userName" type="text" name="name" placeholder="Your name" required="">
                <br>
                <label for="userEmail">Email:</label>
                <input class="userEmail" type="text" name="email" placeholder="Your email">
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary save-user"  data-dismiss="modal" data-form-number="${json[i]._id}">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    `);
  }


$("button.save-user").on("click",function(e) {
    e.preventDefault();
    var form_id = "#" + $(e.target).attr("data-form-number");
    var formData = $(form_id).serialize();
    // var formData = $('.entry-form').serialize();
    console.log("formData", formData);
    $.post("/api/users", formData, function(user) {
      console.log("user after POST", user);

      $(form_id).append(`<br><p><b>This time has already been reserved by: ${user.name}</b></p>`); // this replaces the form with a line of text that says who has reserved the time

    });
    $(this).trigger("reset");
  });
}

function renderAllTimesSlotsError(e) {
  $(".time-table").text("Failed to load schedule, is the server working?");
}



// when the time button is clicked, display the modal
function handleSelectTimeClick(e) {
  console.log("add-user clicked!");
  console.log( $(this)._id );
  var currentTimeSlotId = $(this).closest("form").data("time-id"); // "5665ff1678209c64e51b4e7b"
  console.log("time-id", currentTimeSlotId);
  $("#entry-form-modal").data("time-id", currentTimeSlotId);
  $(e.target).next().modal();  // display the modal!  **GOOD CODE SAMPLE FOR PROBLEMS (.next() is essential)
}



// when the song modal submit button is clicked:
function handleNewUserSubmit(e) {
  e.preventDefault();
  console.log("hi");
  console.log($(e.target).data);
  var $modal = $(e.target);
  var $userNameField = $modal.find(".userName");
  var $emailNumberField = $modal.find(".userEmail");

  // get data from modal fields
  // note the server expects the keys to be 'name', 'email' so we use those.
  var dataToPost = {
    name: $userNameField.val(),
    email: $emailNumberField.val()
  };
  var userId = $modal.data("userId");
  console.log('retrieved userName:', userName, ' and userEmail:', userEmail, ' for user w/ id: ', userId);
  // POST to SERVER
  var userPostToServerUrl = '/api/users/'+ userId;
  $.post(userPostToServerUrl, dataToPost, function(data) {
    console.log('received data from post to /users:', data);
    // clear form
    $userNameField.val("");
    $emailNumberField.val("");

    // close modal
    $modal.modal("hide");
    // update the correct album to show the new song
    $.get("/api/timeslots/" + timeId, function(data) {
      // remove the current instance of the album from the page
      $("[data-time-id=" + timeId + "]").remove();
      // re-render it with the new album data (including songs)
      renderAlbum(data);
    });
  }).error(function(err) {
    console.log("post to /api/user/:timeId/ resulted in error", err);
  });
}
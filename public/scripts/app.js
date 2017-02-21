var $usersList;
var allUsers= [];

$(document).ready(function(){
  console.log("app.js is loaded!");

  $usersList = $(".reserved-times-list");
  $.ajax({
    method: 'GET',
    url: '/api/users',
    success: handleUsersSuccess,
    error: handleUsersError
  });

// this is the ajax request that handles populating the times listed in seed.js onto the main page
  $.ajax({
    method: "GET",
    url: "/api/timeslots",
    data: $(this).serialize(),
    success: renderAllTimeSlotsSuccess,
    error: renderAllTimesSlotsError
  });



  $usersList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/users/'+$(this).attr("data-time-id"));
    $.ajax({
      method: 'DELETE',
      url: '/api/users/'+$(this).attr("data-time-id"),
      success: deleteUserSuccess,
      error: deleteUserError
    });
  });

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
        ${json[i].time}
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
      $(".reserved-times-list").prepend(`<br><p><b>Reservation successful</b></p>`); // this replaces the form with a line of text that says who has reserved the time
      $(form_id)[0].reset();
    });

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



// to delete users
function deleteUserSuccess(json) {
  var user = json;
  console.log(json);
  var userId = user._id;
  console.log('delete user', userId);
  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allUsers.length; index++) {
    if(allUsers[index]._id === userId) {
      allUsers.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteUserError(json) {
  console.log("Error with delete user button"); // THIS FUNCTION CAN BE DELETED
}


function getUserHtml(user) {
  return `<hr>
          <p>
            <b>TIME</b>
            has been reserved by ${user.name}
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-time-id=${user._id}>Delete</button>
          </p>`;
}


function getAllUsersHtml(users) {
  return users.map(getUserHtml).join("");
}


function handleUsersSuccess(json) {
  allUsers = json;
  render();
}

function handleUsersError(e) {
  console.log('uh oh');
  $('.reserved-times-list').text('Failed to load users, is the server working?');
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $usersList.empty();
  // pass `allBooks` into the template function
  var userHtml = getAllUsersHtml(allUsers);
  // append html to the view
  $usersList.append(userHtml);
};




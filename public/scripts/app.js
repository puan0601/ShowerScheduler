var $usersList;
var allUsers= [];

$(document).ready(function(){

  $usersList = $(".reserved-times-list");
  $.ajax({
    method: 'GET',
    url: '/api/users',
    success: handleUsersSuccess,
    error: handleUsersError
  });


  $.ajax({
    method: "GET",
    url: "/api/timeslots",
    data: $(this).serialize(),
    success: renderAllTimeSlotsSuccess,
    error: renderAllTimesSlotsError
  });



  $usersList.on('click', '.deleteBtn', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/users/'+$(this).attr("data-time-id"),
      success: deleteUserSuccess,
      error: deleteUserError
    });

  });

    $(".time-table").on("click", ".schedule-button", handleSelectTimeClick);

}); //end of $(document).ready(function(){})

function renderAllTimeSlotsSuccess(json) {

  for (var i = 0; i < json.length; i++){
    console.log(json);
    $(".time-table").append(`
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary btn-lg col-xs-10 col-xs-offset-1 schedule-button ${json[i]._id}" data-target="entry-form-modal">
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
                <input class="time" type="hidden" name="time" value="${json[i].time}">
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
    var button_id = "." + $(e.target).attr("data-form-number")
    $(button_id).css("background-color", "#D3D3D3");

    console.log("user, " + user);

    $.post("/api/users", formData, function(data) {
      $(".reserved-times-list").prepend(`
        <br>
        <p>
        <img class="green-check"src="/images/green-check.png"><b>Reservation successful</b></p>`);

      $(".reserved-times-list").prepend(`
        <hr>
        <p>
          <b>${data.time}</b>
          has been reserved by <b>${data.user.name}</b>
          <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-time-id=${data._id}>Delete</button>
        </p>
      `);

      $(form_id)[0].reset();
    });
  });
}

function renderAllTimesSlotsError(e) {
  $(".time-table").text("Failed to load schedule, is the server working?");
}

// when the time button is clicked, display the modal
function handleSelectTimeClick(e) {
  var currentTimeSlotId = $(this).closest("form").data("time-id");
  $("#entry-form-modal").data("time-id", currentTimeSlotId);
  $(e.target).next().modal();  // display the respective modal!
}

// to delete users
function deleteUserSuccess(json) {
  var user = json;
  var userId = user._id;

  for(var index = 0; index < allUsers.length; index++) {
    if(allUsers[index]._id === userId) {
      allUsers.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteUserError(json) {
  console.log("Error with delete user button");
}


function getUserHtml(data) {

  $(".reserved-times-list").prepend(`
    <hr>
    <p>
      <b>${data.time}</b>
      has been reserved by <b>${data.name}</b>
      <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-time-id=${data._id}>Delete</button>
    </p>
  `);
}


function getAllUsersHtml(users) {
  return users.map(getUserHtml).join("");
}


function handleUsersSuccess(json) {
  allUsers = json;
  render();
}

function handleUsersError(e) {
  $('.reserved-times-list').text('Failed to load users, is the server working?');
}

// note: we empty and re-render the collection each time our post data changes
function render () {
  $usersList.empty();
  var userHtml = getAllUsersHtml(allUsers);
  $usersList.prepend(userHtml);

};

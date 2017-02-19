

$(document).ready(function(){
  console.log("app.js is loaded!");

// this is the ajax request that handles populating the times listed in seed.js onto the main page
  $.ajax({
    method: "GET",
    url: "/api/timeSlots",
    data: $(this).serialize(),
    success: populateTimesSuccess,
    error: populateTimesError
  });


        $("#schedulerbuttons").on('click', 'button', function() {
            $("#entryform").toggleClass('hidden');
        });




});

// need to work on styling these buttons later
function populateTimesSuccess(json) {
  for (var i = 0; i < json.length; i++){
    $(".time-table").append(`
      <button class="col-xs-10 col-xs-offset-1">
          Time: ${json[i].time}
      </button>
    `);
  }
}

function populateTimesError(e) {
  $(".time-table").text("Failed to load schedule, is the server working?");
}
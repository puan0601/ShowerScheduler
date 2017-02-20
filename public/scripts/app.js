

$(document).ready(function(){
  console.log("app.js is loaded!");

// this is the ajax request that handles populating the times listed in seed.js onto the main page
  $.ajax({
    method: "GET",
    url: "/api/timeslots",
    data: $(this).serialize(),
    success: populateTimesSuccess,
    error: populateTimesError
  });


// modal form pops up when you click the button
//    $("#schedulerbuttons").on('submit', function(e) {
//     e.preventDefault();
//     var formData = $(this).serialize();
//     $.post('/api/timeSlots', formData, function(album) {
//       console.log('album after POST', album);
//       // renderAlbum(album);  //render the server's response
//     });
//     $(this).trigger("reset");
//   });

//   $("#albums").on("click", ".add-song", function(e){
//     var id = $(this).parents(".album").attr("data-album-id");
//     $("#songModal").attr("data-album-id", id);
//     $("#songModal").modal();
//   });

//   $("#saveSong").on("click", handleNewSongSubmit);

// });





    // $("#schedulerbuttons").on('click', 'button', function() {
    //     $("#entryform").toggleClass('hidden');
    // });




});

// need to work on styling these buttons later
function populateTimesSuccess(json) {
  for (var i = 0; i < json.length; i++){
    $(".time-table").append(`

      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary btn-lg col-xs-10 col-xs-offset-1" data-toggle="modal" data-target="#myModal">
        Time: ${json[i].time}
      </button>

      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">Confirm your reservation for time ${(this).time} (FIX THIS) </h4>
            </div>

            <div class="modal-body">
              <form class="entry-form">
                <label>Name:</label>
                <input type="text" name="name" placeholder="Your name">
                <br>
                <label>Email:</label>
                <input type="text" name="email" placeholder="Your email">
              </form>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    `);
  }
}

  /* <button type="submit" class="col-xs-10 col-xs-offset-1 btn-primary">
          Time: ${json[i].time}
      </button> */

function populateTimesError(e) {
  $(".time-table").text("Failed to load schedule, is the server working?");
}






// <!-- Modal -->
//       <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
//         <div class="modal-dialog" role="document">
//           <div class="modal-content">
//             <div class="modal-header">
//               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//               <h4 class="modal-title" id="myModalLabel">Please enter your information to confirm your selection</h4>
//             </div>
//             <div class="modal-body">

//             <form id="entryform" class="col-md-4 control-label">
//               <fieldset class='form-horizontal'>
//               <p>test</p>
//             <input class="form-control input-md" type="text" name="name" placeholder="Your name">
//             <br>
//             <input type="text" name="email" placeholder="Your email">

//             </div>
//             <div class="modal-footer">
//               <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
//               <button type="submit" class="btn btn-primary">Submit</button>
//             </div>
//           </div>
//         </div>

//       </div>
console.log("app.js is loaded!");

$(document).ready(function(){

        $("#schedulerbuttons").on('click', 'button', function() {
            $("#entryform").toggleClass('hidden');
        });
    });

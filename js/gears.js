/**
 * Created by championswimmer on 25/10/15.
 */
parseInit();

var refreshGears = function() {
    ParseWrapper.fetchGears({
        success: function(gears) {
            $("#table-gears").empty();
            //var gears = JSON.parse(sessionStorage.gears);
            for (var i = 0; i < gears.length; i++) {
                var object = gears[i];
                //console.log(object.id + ' - ' + object.get('name'));
                var row = $("<tr><td>" + object.get('name') +"</td></tr>");
                $("#table-gears").append(row);
            }

        }
    });
};

refreshGears();

$('.form-gear').on('submit', function(e) {

    // Prevent Default Submit Event
    e.preventDefault();

    // Get data from the form and put them into variables
    var data = $(this).serializeArray(),
        gearname = data[0].value;

    ParseWrapper.addGear(gearname, {
        success: function(gearname) {
            // Execute any logic that should take place after the object is saved.
            alert('New gear ' + gearname.get('name') + ' added with objectId: ' + gearname.id);
            refreshGears();
        }
    });

});

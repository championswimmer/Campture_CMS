/**
 * Created by championswimmer on 25/10/15.
 */
parseInit();

var refreshActivities = function() {
    ParseWrapper.fetchActivities({
        success: function(activities) {
            $("#table-activities").empty();
            //var activities = JSON.parse(sessionStorage.activities);
            for (var i = 0; i < activities.length; i++) {
                var object = activities[i];
                //console.log(object.id + ' - ' + object.get('name'));
                var row = $("<tr><td>" + object.get('name') +"</td></tr>");
                $("#table-activities").append(row);
            }

        }
    });
};

refreshActivities();

$('.form-activity').on('submit', function(e) {

    // Prevent Default Submit Event
    e.preventDefault();

    // Get data from the form and put them into variables
    var data = $(this).serializeArray(),
        activityname = data[0].value;

    ParseWrapper.addActivity(activityname, {
        success: function(activityname) {
            // Execute any logic that should take place after the object is saved.
            alert('New activity ' + activityname.get('name') + ' added with objectId: ' + activityname.id);
            refreshActivities();
        }
    });

});

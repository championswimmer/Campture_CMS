/**
 * Created by championswimmer on 25/10/15.
 */
parseInit();

var refreshResources = function() {
    ParseWrapper.fetchResources({
        success: function(resources) {
            $("#table-resources").empty();
            //var resources = JSON.parse(sessionStorage.resources);
            for (var i = 0; i < resources.length; i++) {
                var object = resources[i];
                //console.log(object.id + ' - ' + object.get('name'));
                var row = $("<tr><td>" + object.get('name') +"</td></tr>");
                $("#table-resources").append(row);
            }

        }
    });
};

refreshResources();

$('.form-resource').on('submit', function(e) {

    // Prevent Default Submit Event
    e.preventDefault();

    // Get data from the form and put them into variables
    var data = $(this).serializeArray(),
        resourcename = data[0].value;

    ParseWrapper.addResource(resourcename, {
        success: function(resourcename) {
            // Execute any logic that should take place after the object is saved.
            alert('New resource ' + resourcename.get('name') + ' added with objectId: ' + resourcename.id);
            refreshResources();
        }
    });

});

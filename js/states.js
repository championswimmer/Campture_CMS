/**
 * Created by championswimmer on 25/10/15.
 */
parseInit();

var refreshStates = function() {
    ParseWrapper.fetchStates(null, {
        success: function(states) {
            $("#table-states").empty();
            //var states = JSON.parse(sessionStorage.states);
            for (var i = 0; i < states.length; i++) {
                var object = states[i];
                //console.log(object.id + ' - ' + object.get('name') + ' - ' + object.get("country_pointer").get("name"));
                var row = $("<tr><td>" + object.get('name') + "</td><td>" + object.get("country_pointer").get("name") +"</td></tr>");
                $("#table-states").append(row);
            }

        }
    });
};

var updateCountryInForm = function() {
    ParseWrapper.fetchCountries({
        success: function(countries){
            for (var i = 0; i < countries.length; i++) {
                var option = $("<option value=" + countries[i].id + ">" + countries[i].get('name') + "</option>")
                $('#country-list').append(option);
            }
        }
    });
};

refreshStates();
updateCountryInForm();

$('.form-state').on('submit', function(e) {

    // Prevent Default Submit Event
    e.preventDefault();

    // Get data from the form and put them into variables
    var data = $(this).serializeArray(),
        statename = data[0].value;
        countryId = $('#country-list').val();


    ParseWrapper.addState(statename, countryId, {
        success: function(statename) {
            // Execute any logic that should take place after the object is saved.
            alert('New country ' + statename.get('name') + ' added with objectId: ' + statename.id);
            refreshStates();
        }
    });

});
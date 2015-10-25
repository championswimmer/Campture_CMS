/**
 * Created by championswimmer on 25/10/15.
 */
parseInit();

var refreshCities = function() {
    ParseWrapper.fetchCities({
        success: function(cities) {
            $("#table-cities").empty();
            //var states = JSON.parse(sessionStorage.states);
            for (var i = 0; i < cities.length; i++) {
                var object = cities[i];
                //console.log(object.id + ' - ' + object.get('name') + ' - ' + object.get("country_pointer").get("name"));
                var row = $(
                    "<tr>" +
                    "<td>" + object.get('name') + "</td>" +
                    "<td>" + object.get("state_pointer").get("name") +"</td>" +
                    "<td>" + object.get("country_pointer").get("name") +"</td>" +
                    "</tr>");
                $("#table-cities").append(row);
            }

        }
    });
};

var updateCountryInForm = function() {
    ParseWrapper.fetchCountries({
        success: function(countries){
            $('#country-list').empty();
            for (var i = 0; i < countries.length; i++) {
                var option = $("<option value=" + countries[i].id + ">" + countries[i].get('name') + "</option>");
                $('#country-list').append(option);
                if (i == 0) {
                    updateStatesInForm(countries[i].id);
                }
            }
        }
    });
};

var updateStatesInForm = function(countryId) {
    ParseWrapper.fetchStates(countryId, {
        success: function(states) {
            $('#state-list').empty();
            for (var i = 0; i < states.length; i++) {
                var option = $("<option value=" + states[i].id + ">" + states[i].get('name') + "</option>")
                $('#state-list').append(option)
            }
        }
    })
};

refreshCities();
updateCountryInForm();

$('.form-city').on('submit', function(e) {

    // Prevent Default Submit Event
    e.preventDefault();

    // Get data from the form and put them into variables
    var data = $(this).serializeArray(),
        cityName = data[0].value;
    countryId = $('#country-list').val();
    stateId = $('#state-list').val();


    ParseWrapper.addCity(cityName, stateId, countryId, {
        success: function(cityName) {
            // Execute any logic that should take place after the object is saved.
            alert('New state ' + cityName.get('name') + ' added with objectId: ' + cityName.id);
            refreshCities();
        }
    });

});
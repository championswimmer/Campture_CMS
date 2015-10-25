/**
 * Created by championswimmer on 25/10/15.
 */
parseInit();


var refreshCountries = function() {
    ParseWrapper.fetchCountries({
        success: function(countries) {
            $("#table-countries").empty();
            //var countries = JSON.parse(sessionStorage.countries);
            for (var i = 0; i < countries.length; i++) {
                var object = countries[i];
                //console.log(object.id + ' - ' + object.get('name'));
                var row = $("<tr><td>" + object.id + "</td><td>" + object.get('name') +"</td></tr>");
                $("#table-countries").append(row);
            }

        }
    });
};

refreshCountries();

$('.form-country').on('submit', function(e) {

    // Prevent Default Submit Event
    e.preventDefault();

    // Get data from the form and put them into variables
    var data = $(this).serializeArray(),
        countryname = data[0].value;

    ParseWrapper.addCountry(countryname, {
        success: function(countryname) {
            // Execute any logic that should take place after the object is saved.
            alert('New country ' + countryname.get('name') + ' added with objectId: ' + countryname.id);
            refreshCountries();
        }
    });

});
/**
 * Created by championswimmer on 25/10/15.
 */
parseInit();

var Country = Parse.Object.extend("Countries");
var query = new Parse.Query(Country);

var refreshCountries = function() {
    query.find({
        success: function(countries) {
            console.log("Successfully retrieved " + countries.length + " scores.");
            // Do something with the returned Parse.Object values
            $("#table-countries").empty();
            for (var i = 0; i < countries.length; i++) {
                var object = countries[i];
                //console.log(object.id + ' - ' + object.get('name'));
                var row = $("<tr><td>" + object.id + "</td><td>" + object.get('name') +"</td></tr>");
                $("#table-countries").append(row);
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
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

    var Country = Parse.Object.extend("Countries");
    var country = new Country();

    country.set('name', countryname);
    // Call Parse Login function with those variables
    country.save(null, {
        success: function(countryname) {
            // Execute any logic that should take place after the object is saved.
            alert('New country ' + countryname.get('name') + ' added with objectId: ' + countryname.id);
            refreshCountries();
        },
        error: function(countryname, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + countryname.message);
        }
    });

});
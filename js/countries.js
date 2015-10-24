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


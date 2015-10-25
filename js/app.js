/**
 * Created by championswimmer on 25/10/15.
 */

parseInit = function() {
    Parse.$ = jQuery;

    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("hqRCJWWJJhduQBOceJYMnKUh8rt5prJ2WyUfDkmp", "M7ZPrFMJoEopzBvOGCmynUbN5qwedkTeY32hFmpy");

    //var TestObject = Parse.Object.extend("TestObject");
    //var testObject = new TestObject();
    //testObject.save({foofoo: "barbar"}).then(function(object) {
    //    alert("yay! it worked");
    //});
};

$(function() {

    parseInit();

});

$(document).ready(function(){
    $.get("navigation.html", function(data) {
        $("#nav-container").html(data);
    });
});

var Country = Parse.Object.extend("Countries");
var State = Parse.Object.extend("States");
var City = Parse.Object.extend("Cities");

ParseWrapper = {
    fetchCountries : function(callback) {
        var query = new Parse.Query(Country);

        query.find({
            success: function(countries) {
                console.log("Successfully retrieved " + countries.length + " scores.");
                // Do something with the returned Parse.Object values
                sessionStorage.countries = JSON.stringify(countries);
                if (callback) {
                    callback.success(countries);
                }
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },

    addCountry: function(countryname, callback) {

        var country = new Country();

        country.set('name', countryname);
        // Call Parse Login function with those variables
        country.save(null, {
            success: function(countryname) {
                // Execute any logic that should take place after the object is saved.
                if (callback) {
                    callback.success(countryname);
                }
            },
            error: function(countryname, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + countryname.message);
            }
        });
    },

    fetchStates : function(countryId, callback) {

        var query = new Parse.Query(State);
        query.include("country_pointer");
        if (countryId != null) {
            var country = new Country(); country.id = countryId;
            query.equalTo("country_pointer", country);
        }
        query.find({
            success: function(states) {
                sessionStorage.states = JSON.stringify(states);
                if (callback) {
                    callback.success(states);
                }
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },


    addState: function(stateName, countryId, callback) {
        var state = new State();

        state.set('name', stateName);
        var country = new Country(); country.id = countryId;
        state.set("country_pointer", country);

        state.save(null, {
            success: function(stateName) {
                // Execute any logic that should take place after the object is saved.
                if (callback) {
                    callback.success(stateName);
                }
            },
            error: function(statename, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + statename.message);
            }
        });
    },

    fetchCities: function(callback) {
        var query = new Parse.Query(City);
        query.include("country_pointer");
        query.include("state_pointer");

        query.find({
            success: function(cities) {
                sessionStorage.cities = JSON.stringify(cities);
                if (callback) {
                    callback.success(cities);
                }
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },

    addCity: function(cityName, stateId, countryId, callback) {
        var city = new City();

        city.set('name', cityName);
        var country = new Country(); country.id = countryId;
        var state = new State(); state.id = stateId;
        city.set("state_pointer", state);
        city.set("country_pointer", country);

        city.save(null, {
            success: function(cityName) {
                // Execute any logic that should take place after the object is saved.
                if (callback) {
                    callback.success(cityName);
                }
            },
            error: function(cityName, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + statename.message);
            }
        });
    }
};
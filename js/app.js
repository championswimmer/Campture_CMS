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

    fetchStates : function(callback) {

        var query = new Parse.Query(State);
        query.include("country_pointer");
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

    addState: function(statename, countryId, callback) {
        var state = new State();

        state.set('name', statename);
        var country = new Country(); country.id = countryId;
        state.set("country_pointer", country);

        state.save(null, {
            success: function(statename) {
                // Execute any logic that should take place after the object is saved.
                if (callback) {
                    callback.success(statename);
                }
            },
            error: function(statename, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + statename.message);
            }
        });
    }
};
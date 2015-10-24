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
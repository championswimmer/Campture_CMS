/**
 * Created by championswimmer on 25/10/15.
 */
parseInit();


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
            for (var i = 0; i < states.length; i++) {
                var option = $("<option value=" + states[i].id + ">" + states[i].get('name') + "</option>")
                $('#state-list').append(option)
            }
        }
    })
};

updateCountryInForm();
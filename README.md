# Campture_CMS

## Structure

### Pages

Each page is in the root directory for example **countries.html**, **signin.html**, etc.
The scripts specific to the page are in `/js/{pagename}.js`

### Services

All the functions for fetching the classes and updating entries are inside the `ParseWrapper` class defined
in `app.js`

 - ParseWrapper
    - fetchCountries(callback: success(countries[]))
    - addCountry(countryName, callback: success(message))

    - fetchStates(countryId, callback: success(states[]))   
        _Fetches states in a country if countryId is given, else fetches all_
    - addState(stateName, countryId, callback: success(message))

    - fetchCities(callback: success(cities[]))
    - addCities(cityName, stateId, countryId, callback: success(message))

## Todo

For all todos, fixmes, pending features please check this issue.  
https://github.com/championswimmer/Campture_CMS/issues/1

## Demo
This is based on the SP Admin Bootstrap theme.

A demo of the features can be found inside the [demo](demo) folder. Please check out code snippets for tables,
forms, and other UI elements there,

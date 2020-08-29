// select the table body
var tbody = d3.select("tbody");

// select the user input form field for date
var dateSelect = d3.select("#datetime");

// retrieve the form select field for city
var citySelect = d3.select("#city");

// retrieve the form select field for state
var stateSelect = d3.select("#state");

// retrieve the form select field for country
var countrySelect = d3.select("#country");

// retrieve the form select field for shape
var shapeSelect = d3.select("#shape");

// select the 'Filter Table' button
var filterButton = d3.select("#filter-btn");

// select the 'Reset Table' button
var resetButton = d3.select("#reset-btn");

// function to clear the table body to prepare for new data display
function clearTable() {
    tbody.html("");
};

// function to clear previously chosen form filters
function resetForm() {
    document.getElementById('formFilter').reset();
}

// create a function to reset the table to default
function resetTable() {

    // clear the current data
    clearTable();

    //clear the current form filters
    resetForm();

    // use forEach and Object.values to populate the initial table
    data.forEach((ufoSighting) => {
        var row = tbody.append("tr");
        Object.values(ufoSighting).forEach(value => {
            var cell = row.append("td");
            cell.text(value);
            cell.attr("class", "table-style");
        }); // close second forEach
    }); // close first forEach

}; // close function resetTable()

// create a function to populate filter dropdown menus 
function populateDropdowns() {

    // create arrays to store cities, states, countries and shapes for option values, and sort in ascending order
    // using Set to get unique values and then making an array from the set
    var dates = Array.from(new Set(data.map(sighting => sighting.datetime)));
    var cities = Array.from(new Set(data.map(sighting => sighting.city))).sort(d3.ascending);
    var states = Array.from(new Set(data.map(sighting => sighting.state))).sort(d3.ascending);
    var countries = Array.from(new Set(data.map(sighting => sighting.country))).sort(d3.ascending);
    var shapes = Array.from(new Set(data.map(sighting => sighting.shape))).sort(d3.asending);

    // use a forEach to loop over elements in each array to populate dropdowns
    dates.forEach(date => {
        var option = dateSelect.append("option");
        option.text(date);
    });

    cities.forEach(city => {
        var option = citySelect.append("option");
        option.text(city);
    });

    states.forEach(state => {
        var option = stateSelect.append("option");
        option.text(state);
    });

    countries.forEach(country => {
        var option = countrySelect.append("option");
        option.text(country);
    });

    shapes.forEach(shape => {
        var option = shapeSelect.append("option");
        option.text(shape);
    });

} // end function populateDropdowns()

// create a function to update table according to the date input by the user
function filterTable() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // get the user input for filtering 
    var inputDate = $('#datetime').val();
    var inputCity = $('#city').val();
    var inputState = $('#state').val();
    var inputCountry = $('#country').val();
    var inputShape = $('#shape').val()

    // make a copy of the data for filtering
    var filteredData = data;

    // if there is a date input, check that the dates are present in the input array and filter
    if (inputDate.length) {
        filteredData = filteredData.filter(sighting => inputDate.includes(sighting.datetime));
    }

    // if there is a city input, check that the cities are present in the input array and filter
    if (inputCity.length) {
        filteredData = filteredData.filter(sighting => inputCity.includes(sighting.city));
    }

    // if there is a state input, check that the states are present in the input array and filter
    if (inputState.length) {
        filteredData = filteredData.filter(sighting => inputState.includes(sighting.state));
    }

    // if there is a country input, check that the countries are present in the input array and filter
    if (inputCountry.length) {
        filteredData = filteredData.filter(sighting => inputCountry.includes(sighting.country));
    }

    // if there is a shape input, check that the shapes are present in the input array and filter
    if (inputShape.length) {
        filteredData = filteredData.filter(sighting => inputShape.includes(sighting.shape));
    }

    // reset the table
    clearTable();

    // if the filteredData array is empty
    if (filteredData.length == 0) {
        var row = tbody.text("There are no sightings for your chosen filters.");
    }

    // if there is data in the filteredData array,
    // use forEach and Object.values to populate the tbody with filtered data
    else {
        filteredData.forEach((ufoSighting) => {

            // create a new row for every sighting object
            var row = tbody.append("tr");

            // iterate through each object's values to populate cells
            Object.values(ufoSighting).forEach(value => {

                // create a new cell for each item in the object
                var cell = row.append("td");

                // populate the td text with the value
                cell.text(value);
                cell.attr("class", "table-style");
            }); // close second forEach

        }); // close first forEach*/

    } // else

}; // close function filterTable()

// initially populate the table by default
resetTable();

// populate dropdowns in the filter forms
populateDropdowns();

// use the `on` function in d3 to attach a click event to the handler function for filterButton
filterButton.on("click", filterTable);

// use the `on` function in d3 to attach a click event to the handler function for resetButton
resetButton.on("click", resetTable);
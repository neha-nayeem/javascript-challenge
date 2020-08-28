// select the table body
var tbody = d3.select("tbody");

// select the user input form field
var dateSelect = d3.select("#datetime");

// select the 'Filter Table' button
var filterButton = d3.select("#filter-btn");

// select the 'Reset Table' button
var resetButton = d3.select("#reset-btn");

// function to clear the table body to prepare for new data display
function clearTable() {
    tbody.html("");
};

// create a function to reset the table to default
function resetTable() {

    // clear the current data
    clearTable();

    // use forEach and Object.values to populate the initial table
    data.forEach((ufoSighting) => {
        var row = tbody.append("tr");
        Object.values(ufoSighting).forEach(value => {
            var cell = row.append("td");
            cell.text(value);
            cell.attr("class", "table-style");
        }); // close second forEach
    }); // close first forEach

    // populate the filter date dropdown menu
    // create an array to store dates for option values
    // using Set to get unique values and then making an array from the set
    var dates = Array.from(new Set(data.map(sighting => sighting.datetime)));

    // use a forEach to loop over elements in each array to populate dropdowns
    dates.forEach(date => {
        var option = dateSelect.append("option");
        option.text(date);
    });
}; // close function resetTable()


// create a function to update table according to the date input by the user
function filterTable() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // get the user input for filtering 
    var inputDate = dateSelect.property("value")

    // make a copy of the data for filtering
    var filteredData = data;

    // if there is a date input, filter the table according to the date
    if (inputDate) {
        filteredData = filteredData.filter(sighting => sighting.datetime == inputDate);
    }

    // reset the table
    clearTable();

    // use forEach and Object.values to populate the tbody with filtered data
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

    }); // close first forEach

}; // close function filterTable()


// initially populate the table by default
resetTable();

// use the `on` function in d3 to attach a click event to the handler function for filterButton
filterButton.on("click", filterTable);

// use the `on` function in d3 to attach a click event to the handler function for resetButton
resetButton.on("click", resetTable);
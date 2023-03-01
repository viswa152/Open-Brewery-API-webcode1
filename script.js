const APIUrl = "https://api.openbrewerydb.org/breweries";

var brewpubList = [];

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    return queryItems.join("&");
}
//Display Functions below

function displayResults(responseJson) {
    $("#results").removeClass("hidden");
    $("#results-list").empty();
    brewpubList = [];
    let newVar = 0;
    for (let i = 0; i < responseJson.length; i++) {
      //Skips objects with no latitude value
      if (!responseJson[i].latitude) {
        continue;
      }

      responseJson[i].distance = null;
        $("#results-list").append(
            `<li>
            <hr>
            <p> <b> Brewery Name:  ${responseJson[i].name} </b> </p>            
            <p>Brewery type: ${responseJson[i].brewery_type}</p>
            <p>Address: ${responseJson[i].street}</p>
            <p>${responseJson[i].city}, ${responseJson[i].state} ${responseJson[i].postal_code}</p>
            <p>Website URL: ${responseJson[i].website_url}</p>
            <p>Phone:${responseJson[i].phone}</p>            
            </li>
            `
        );
        
      brewpubList.push(responseJson[i]);
      newVar = newVar+1;
      };

if ($("#results-list").is(":empty")) {
      $("#results-list").text("Sorry, we couldn't find anything in that area. Please enter a different city and try again.");}

}


//Takes the search parameters, input by the user, and calls the function to display the results on the page.
function getBrewList(city) {
    const params = {
        by_city: city        
        };

    const queryString = formatQueryParams(params)
    const url = APIUrl + "?" + queryString;

    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
            $("#js-error-message").text(`Something isn't right: ${err.message}`);
        });
}

//Submit Form function, enters the search criteria and calls the Get Brewpub List function
function SubmitForm() {
  $('form').submit(event => {
    event.preventDefault();
    const by_city = $("#js-search-city").val();
    //const by_state = $("#js-search-state").val();
    getBrewList(by_city);
  });
}

//Function to make sure the page is loaded.
$(function() {
  console.log('Page is loaded! Waiting for submit!');
  SubmitForm();
});
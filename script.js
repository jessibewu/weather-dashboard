var searchBtn = document.querySelector(".btn");
var cityInput = document.querySelector("#cityName");
var apiKey = "02a19a3f81c6935cc3484c6eeb936427";

var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInput.value.trim();

    if (city) {
        getCityInfo(city);

        // clear old content
        cityInput.textContent = "";
    } else {
        alert("Please enter a city name");
    }    
};

var getCityInfo = function() {
    
    var apiUrl = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric";

    // make a get request to url
    fetch(apiUrl)
        .then(function(response) {
        // request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
            console.log(data);
            displayRepos(data, user);
            });
        } else {
            alert("Error: " + response.statusText);
        }
        })
        .catch(function(error) {
        alert("Unable to connect to Open Weather");
        });

};

searchBtn.addEventListener("click", formSubmitHandler);
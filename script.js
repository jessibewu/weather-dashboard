var cityInfo = document.querySelector("#cityInfo");
var city = "";
var searchedCities = [];
var currentCity = $("#city-name").text(city);
var icon = $("img");
var apiKey = "02a19a3f81c6935cc3484c6eeb936427";


var searchHistory = function() {

    $(".list-group").empty();
    searchedCitiesString = localStorage.getItem("searchedCities");

    searchedCities = JSON.parse(searchedCitiesString);
    if (searchedCities === null) {
        searchedCities = [];
    }
    console.log(searchedCities);

    searchedCities.forEach(function (searchedCity) {
        var liElement = $("<li class=list-group-item>");
        liElement.addClass("city-list bg-light");
        liElement.text(searchedCity);
        $(".list-group").append(liElement);
    });

};

var getCityInfo = function(userCity) {

var apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + apiKey + "&units=metric";

    // make a get request to url
    fetch(apiCurrent)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
             //displayRepos(data, user);
        //     });
        // } else {
        //     alert("Error: " + response.statusText);
        // }
                
        var cityTime = moment(data.dt * 1000).format("MM/DD/YYYY");
        var cityInfoName = document.createElement("h3");
        var iconCode = data.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
        icon.attr('src', iconUrl);
        //$(cityInfoName).append(icon);

        cityInfoName.textContent = data.name + " (" + cityTime + ") ";

        var cityInfoList1 = document.createElement("h6");
        var cityInfoList2 = document.createElement("h6");
        var cityInfoList3 = document.createElement("h6");
        cityInfoList1.textContent = "Temp: " + data.main.temp + "°C";
        cityInfoList2.textContent = "Wind: " + data.wind.speed + " MPH";
        cityInfoList3.textContent = "Humidity: " + data.main.humidity + "%"; 
        
        $(cityInfo).append(cityInfoName, cityInfoList1, cityInfoList2, cityInfoList3);
          
        var uvIndexUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey;

        fetch(uvIndexUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                
                var cityInfoList4 = document.createElement("h6");
                var cityInfoList5 = document.createElement("span");
                cityInfoList4.textContent = "UV Index: "; 
                cityInfoList5.textContent = data.current.uvi; 

                if (data.current.uvi <= 2) {
                    cityInfoList5.setAttribute('style', 'background-color:green; padding: 2px 8px; color: white; border-radius: 5px;'); 
                }   
                if (data.current.uvi > 3) {
                    cityInfoList5.setAttribute('style', 'background-color:orange; padding: 2px 8px; color: white; border-radius: 5px;'); 
                }
                if (data.current.uvi > 8) {
                    cityInfoList5.setAttribute('style', 'background-color:red; padding: 2px 8px; color: white; border-radius: 5px;'); 
                }            

                $(cityInfo).append(cityInfoList4);
                $(cityInfoList4).append(cityInfoList5);

            })
        });
        
    //h3: 5-Day Forecast:

        // .catch(function(error) {
        // alert("Unable to connect to Open Weather");
        //});

};


$(".btn").click(function (event) {
    event.preventDefault();

    if ($("#city-name").val() != "") {
        // get the value of the user's search
        city = $("#city-name").val();

        // add searched city to searchedCities array
        searchedCities.push(city);
        localStorage.setItem("searchedCities", JSON.stringify(searchedCities));

        searchHistory();

        getCityInfo(city);
    }

    $("#city-name").val("");

});
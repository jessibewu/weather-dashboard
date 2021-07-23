var city = "";
var searchedCities = [];
var currentCity = $("#city-name").text(city);
var icon = $(".image");
var apiKey = "02a19a3f81c6935cc3484c6eeb936427";
var body = document.body;

body.onload = function() {
    searchHistory();
    $(".content").hide();
    
};

var searchHistory = function() {

    $(".list-group").empty();
    searchedCitiesString = localStorage.getItem("searchedCities");

    searchedCities = JSON.parse(searchedCitiesString);
    if (searchedCities === null) {
        searchedCities = [];
    }
    console.log(searchedCities);

    searchedCities.forEach(function (searchedCity) {
        var cityList = $("<li class=list-group-item>");
        cityList.addClass("city-list bg-light");
        cityList.text(searchedCity);
        $(".list-group").append(cityList);
    });
};

var getCityInfo = function(userCity) {

    $(".content").show();

var apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + apiKey + "&units=metric";

    // make a get request to url
    fetch(apiCurrent)
    .then(function(response) {

        if (response.status !== 200) {
            $(".city-title").text('Error ' + response.status + " : " + response.statusText);
            icon.hide();
            $(".city-temp").hide();
            $(".city-wind").hide();
            $(".city-humidity").hide();
            $(".city-uv").hide();
            $(".city-uv-class").hide();
            $(".5dayForecast").hide();       
            return false;
          }

        if (response.ok) {
            $(".city-title").show();
            icon.show();
            $(".city-temp").show();
            $(".city-wind").show();
            $(".city-humidity").show();
            $(".city-uv").show();
            $(".city-uv-class").show();     
            $(".5dayForecast").show();        
            return response.json();
    }})
        .then(function(data) {
        console.log(data);    
      
        var cityTime = moment(data.dt * 1000).format("MM/DD/YYYY");
        var iconCode = data.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
        icon.attr('src', iconUrl);

        $(".city-title").text(data.name + " (" + cityTime + ") ");
        $(".city-temp").text("Temp: " + data.main.temp + "°C");
        $(".city-wind").text("Wind: " + data.wind.speed + " MPH");
        $(".city-humidity").text("Humidity: " + data.main.humidity + "%"); 
                  
        var uvIndexUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey + "&units=metric";

        fetch(uvIndexUrl)
            .then(function(response) {
                if (response.ok) {
                return response.json();
            }})
            .then(function(data) {
                console.log(data);

                //UV Index:
                $(".city-uv").text("UV Index: "); 
                $(".city-uv-class").text(data.current.uvi); 

                if (data.current.uvi <= 2) {
                    $(".city-uv-class").css({"background-color": "green", "padding": "2px 8px", "color": "white", "border-radius": "5px"}); 
                }   
                if (data.current.uvi > 3) {
                    $(".city-uv-class").css({"background-color": "orange", "padding": "2px 8px", "color": "white", "border-radius": "5px"}); 
                }
                if (data.current.uvi > 8) {
                    $(".city-uv-class").css({"background-color": "red", "padding": "2px 8px", "color": "white", "border-radius": "5px"}); 
                }            

                //5-day Forecast:
                $(".forecast-header").text("5-Day Forecast:");

                var j = 1;
                for (var i = 0; i < data.daily.length; i++) {
                    $("#day-" + j).text(moment(data.daily[i].dt * 1000).format("MM/DD/YYYY"));
                    var iconCode = data.daily[i].weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
                    $("#icon-" + j).attr('src', iconUrl);
                    $("#city-temp-" + j).text("Temp: " + data.daily[i].temp.day + "°C");
                    $("#city-wind-" + j).text("Wind: " + data.daily[i].wind_speed + " MPH");
                    $("#city-humidity-" + j).text("Humidity: " + data.daily[i].humidity + "%");
                    j++;
                }
            });            
        });   
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
    else {(alert("Please enter a city name."));
        }  
    
    $("#city-name").val("");

});

$(document).on("click", ".city-list", function (event) {
    var searchedCityInfo = $(this).text();
    getCityInfo(searchedCityInfo);

});
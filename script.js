var searchBtn = document.querySelector(".btn");
var cityInput = document.querySelector("#cityName").value;
var cityInfo = document.querySelector("#cityInfo");
//var city = cityInput.value.trim();

var apiKey = "02a19a3f81c6935cc3484c6eeb936427";
var apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q=toronto" + "&appid=" + apiKey + "&units=metric";


 for (var i = 0; i < localStorage.length; i++) {

    cityInput = localStorage.getItem(i);
     // console.log(localStorage.getItem("cityInput"));
     var cityName = $(".list-group").addClass("list-group-item");

     cityName.append("<li>" + cityInput + "</li>");
 }

 var formSubmitHandler = function(event) {
     event.preventDefault();
     // clear old content
     cityInput.textContent = "";

     if (cityInput === "") {
         alert("Please enter a city name");

     } else {
         getCityInfo();
     }    
 };

var getCityInfo = function() {

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
        var cityTime = new Date(data.dt * 1000);

        var cityInfoName = document.createElement("p");
        cityInfoName.textContent = data.name + cityTime;
        //$(cityInfoName).addClass("card-title");
        cityInfo.appendChild(cityInfoName);

        var cityInfoList1 = document.createElement("p");
        var cityInfoList2 = document.createElement("p");
        var cityInfoList3 = document.createElement("p");
        cityInfoList1.textContent = "Temp: " + data.main.temp + "°C";
        cityInfoList2.textContent = "Wind: " + data.wind.speed + " MPH";
        cityInfoList3.textContent = "Humidity: " + data.main.humidity + "%"; 
        
        
        
        // {
        //     if (uvIndex >= 5) {
        //         cityInfoList3.setAttribute = ("style", "background-color: green");
        //     }
            
        // }
        cityInfo.appendChild(cityInfoList1);
        cityInfo.appendChild(cityInfoList2);
        cityInfo.appendChild(cityInfoList3);

    })
        // .catch(function(error) {
        // alert("Unable to connect to Open Weather");
        //});

};

getCityInfo();

searchBtn.addEventListener("click", getCityInfo);
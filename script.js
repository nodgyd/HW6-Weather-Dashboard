// input areas and dynamically created el
const cityinputEl = $("#cityInput");
const submitBtn = $("#submit");
const today = $("#today");
const forecast = $("#forecast");
const history = $("#cityHistory");
const currentDay = dayjs().format("dddd, MMMM D, YYYY");
const clearBtn = $("#clear")
cityChoiceAr = [];
cityArr = JSON.parse(localStorage.getItem("city"))

cityinputEl.keydown(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        inputValue = cityinputEl.val();
        finalCity = inputValue.split(" ").join("%20")
        console.log(finalCity)
        cityChoiceAr.push(inputValue); 
        if(!inputValue) {
        } else {
            history.append(`
            <li class="inputValue"><button id="cityBtn" class="cityBtn btn btn-primary w-75 m-2 text-white">${inputValue}</button></li>`)
        }
        $("input").val("");
    }
    localStorage.setItem('city', JSON.stringify(cityChoiceAr));
});

const findCityName = (finalCity) => {
    console.log(finalCity)
    $("#apiCall").innerHTML = '';
    var urlRequest = 'https://api.openweathermap.org/data/2.5/weather?q='+finalCity+'&appid=376b31c0d35b891d69be7dac3c604407'
    fetch(urlRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      console.log(lat);
      console.log(lon);
      var urlCall = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&APPID=376b31c0d35b891d69be7dac3c604407'
      fetch(urlCall)
      .then(function (response) {return response.json();}).then(function (data) {
            console.log(data)
            for (let i = 0; i < 1; i++) {
                $("#today").append(`
                <section id="today" class="mt-2 p-1 border border-2 border-dark">
                    <h2 id="card-title">${inputValue} | ${currentDay}
                        <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="">
                    </h2>
                    <p class="card-text">Temperature: ${data.current.temp} F</p>
                    <p class="card-text">Wind: ${data.current.wind_speed} MPH</p>
                    <p class="card-text">Humidity: ${data.current.humidity}</p>
                    <p class="card-text ${data.current.uvi < 2 ? 'green' : data.current.uvi >= 3 ? 'yellow' : data.current.uvi > 5 ? 'red' : ""}">UV Index: ${data.current.uvi}</p>
                </section>
                `)
            }
            for (let i = 0; i < 5; i++) {
                $("#forecast").append(`
                    </div class="col-md forecastCard">
                        <div class="five-day card bg-primary h-100 text-white m-1">
                            <div class="card-body p-2">
                                <h3>${ dayjs().add( i+1, 'day').format('dddd, MMMM D') }
                                <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" alt="">
                                </h3> 
                                <p>Temperature: ${data.daily[i].temp.day}</p>
                                <p>Wind: ${data.daily[i].wind_speed}</p>
                                <p>Humidity: ${data.daily[i].humidity}</p>
                                <p class="text-dark ${data.daily[i].uvi < 2 ? 'green' : data.daily[i].uvi >= 3 ? 'yellow' : data.daily[i].uvi > 5 ? 'red' : ""}">UV Index: ${data.daily[i].uvi}</p>
                            </div>
                        </div>
                    </div>
                `)
            }
        });
    });  
};


//local storage check and if there is content we append to page
storageCheck = () => {
    if (!cityArr) {
    } else {
        for (let i = 0; i < cityArr.length; i++) {
            history.append(`
            <li class="inputValue"><button class="cityBtn btn btn-primary w-75 m-2 text-white">${cityArr[i]}</button></li>
            `)
        }
    }
};
storageCheck();

submitBtn.on("click", onClick = () => {
    findCityName(finalCity)
    $("#forecast").append(`
    <h2 class="mt-3">5 Day Forecast |</h2>
    `)
});

$(".cityBtn").on("click", () => {
    findCityName()
})

$("#inputValue").on("click", () => {
    findCityName(final)
})

clearBtn.on("click", () => {
    localStorage.clear()
    location.reload()
})



// input areas and dynamically created el
const cityinputEl = $("#cityInput");
const submitBtn = $("#submit");
const today = $("#today");
const forecast = $("#forecast");
const history = $("#cityHistory");
const currentDay = dayjs().format("dddd, MMMM D, YYYY");
const clearBtn = $("#clear")
cityChoiceAr = [];


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
            <li class="inputValue"><button class="btn btn-primary w-75 m-2 text-white">${inputValue}</button></li>`)
        }
        $("input").val("");
    }
    localStorage.setItem('city', JSON.stringify(cityChoiceAr));
});

const findCityName = () => {
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
                <section id="today">
                    <h2 id="card-title">${inputValue} | ${currentDay}
                        <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="">
                    </h2>
                    <p class="card-text">Temperature: ${data.current.temp} F</p>
                    <p class="card-text">Wind: ${data.current.wind_speed} MPH</p>
                    <p class="card-text">Humidity: ${data.current.humidity}</p>
                    <p class="card-text">UV Index: ${data.current.uvi}</p>
                </section>
                `)
            }
            for (let i = 0; i < 5; i++) {
                $("#forecast").append(`
                <div class="col-12">
                    </div>
                        <div class="forecasetCard">
                            <div class="">
                                <div class="">
                                <h3>${ dayjs().add( i+1, 'day').format('dddd, MMMM D') }
                                <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" alt="">
                                </h3> 
                                <p>Temperature: ${data.daily[i].temp.day}</p>
                                <p>Wind: ${data.daily[i].wind_speed}</p>
                                <p>Humidity: ${data.daily[i].humidity}</p>
                                <p>UV Index: ${data.daily[i].uvi}</p>
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
    localStorage.getItem("city") ? JSON.parse(localStorage.getItem("city")) for (let i = 0: i < localStorage.length; i++) {
        history.append(`
        <li class="inputValue"><button class="btn btn-primary w-75 m-2 text-white">${localStorage[i]}</button></li>`)
    } : []
};




submitBtn.on("click", onClick = () => {
    findCityName(finalCity)
    $("#forecast").append(`
    <h2>5 Day Forecast |</h2>
    `)
});

$("#inputValue").on("click", () => {
    findCityName(final)
})

clearBtn.on("click", () => {
    localStorage.clear()
    location.reload
})



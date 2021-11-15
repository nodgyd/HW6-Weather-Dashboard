// input areas and dynamically created el
const cityinputEl = $("#cityInput");
const submitBtn = $("#submit");
const today = $("#today");
const forecast = $("#forecast");
const history = $("#cityHistory");
// const currentDay = day.js().format("dddd, MMMM D, YYYY [at] hh:mm:ss A");
cityChoiceAr = [];

cityinputEl.keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      const inputValue = cityinputEl.val();
      const finalValue = inputValue.split(" ").join("%20");
      cityChoiceAr.push(finalValue);
      console.log(cityChoiceAr);
      if(!inputValue) {
      } else {
        history.append(`
        <li><button>${inputValue}</button></li>`)
      }
      $("input").val("");
    }
});
  


const findCityName = (finalValue) => {
    $("#apiCall").innerHTML = '';
    localStorage.setItem('searchHistory', JSON.stringify(finalValue));
    console.log(finalValue);
    var urlRequest = 'https://api.openweathermap.org/data/2.5/weather?q='+finalValue+'&appid=376b31c0d35b891d69be7dac3c604407    '
    fetch(urlRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });  
    //   var lat = data.coord.lat;
    //   var lon = data.coord.lon;
    //   console.log(lat);
    //   console.log(lon);
    //   var urlCall = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&APPID=376b31c0d35b891d69be7dac3c604407'
    //     fetch(urlCall)
    //       .then(function (response) {
    //       return response.json();
    //       });
    //       .then(function (data) {
    //       console.log(data)
    //     });
};


submitBtn.on("click", onClick = () => {
    findCityName()
});
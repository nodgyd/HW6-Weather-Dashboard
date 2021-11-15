// input areas and dynamically created el
const cityinputEl = $("#cityInput")
const submitBtn = $("#submit")
const today = $("#today")
const forecast = $("#forecast")
const history = $("#cityHistory")
cityChoiceAr = [];


cityinputEl.keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      // gather value from input field
      let inputValue = cityinputEl.val();
      // push inputValue text into foodChoiceArr
      cityChoiceAr.push(inputValue);
      console.log(foodChoiceArr);
      // user input 
      if(!inputValue) {
      } else {
        history.append(`
        <li>${inputValue}</li>`)
        // clear the value
      }
      $("input").val("");
    }
  });
  
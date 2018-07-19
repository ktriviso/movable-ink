window.onload = function(){
  getLocation()
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      console.log("Geolocation is not supported by this browser.")
  }
}

function showPosition(position) {
  // this is for dynamically pulling user location
  const url = 'http://api.wunderground.com/api/6ea7cf3bc006012f/geolookup/q/' + position.coords.latitude + ',' + position.coords.longitude + '.json'
  fetch(url)
  .then(res => res.json())
  .then((data) => {
    getWeather(data.location.zip)
    const api_string = `${data.location.city} , ${data.location.state}`
    const location = document.getElementById('location')
    location.innerHTML = api_string
  })
  .catch(function() {
    console.log("error");
    window.location.href = "error.html";
  });
}

function getWeather(zip) {
  // this is for pulling the weather data from the api
  fetch(`http://api.wunderground.com/api/6ea7cf3bc006012f/conditions/forecast10day/geolookup/q/${zip}.json`)
  .then(res => res.json())
  .then((data) => {
    injectData(data.forecast.simpleforecast.forecastday)
  })
  .catch(function() {
    console.log("error");
    window.location.href = "error.html";
  });
}

function injectData(data){
  // // selected data from the api
  const today = data[0]
  const tomorrow = data[1]
  const dayAfterTomorrow = data[2]
  // weekday
  const today_weekday = document.getElementById('today-weekday')
  today_weekday.innerHTML = "Today:" //today.date.weekday
  const tomorrow_weekday = document.getElementById('tomorrow-weekday')
  tomorrow_weekday.innerHTML = `${tomorrow.date.weekday}:`
  const dayAfterTomorrow_weekday = document.getElementById('dayAfterTomorrow-weekday')
  dayAfterTomorrow_weekday.innerHTML = `${dayAfterTomorrow.date.weekday}:`
  // condition
  const today_condition = document.getElementById('today-condition')
  today_condition.innerHTML = today.conditions
  const tomorrow_condition = document.getElementById('tomorrow-condition')
  tomorrow_condition.innerHTML = tomorrow.conditions
  const dayAfterTomorrow_condition = document.getElementById('dayAfterTomorrow-condition')
  dayAfterTomorrow_condition.innerHTML = dayAfterTomorrow.conditions
  // temp
  const today_temp = document.getElementById('today-temp')
  today_temp.innerHTML = `${today.high.fahrenheit} / ${today.low.fahrenheit} ˚F`
  const tomorrow_temp = document.getElementById('tomorrow-temp')
  tomorrow_temp.innerHTML = `${tomorrow.high.fahrenheit} / ${tomorrow.low.fahrenheit} ˚F`
  const dayAfterTomorrow_temp = document.getElementById('dayAfterTomorrow-temp')
  dayAfterTomorrow_temp.innerHTML = `${dayAfterTomorrow.high.fahrenheit} / ${dayAfterTomorrow.low.fahrenheit} ˚F`
  // icon
  const today_icon = document.getElementById('today-icon')
  today_icon.src = today.icon_url
  const tomorrow_icon = document.getElementById('tomorrow-icon')
  tomorrow_icon.src = tomorrow.icon_url
  const dayAfterTomorrow_icon = document.getElementById('dayAfterTomorrow-icon')
  dayAfterTomorrow_icon.src = dayAfterTomorrow.icon_url
}

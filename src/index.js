import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

$(document).ready(function () {
  $("#weatherLocation").click(function () {
    const city = $("#location").val();
    $("#location").val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $(".showHumidity").text(
        `The humidity in ${city} is ${response.main.humidity}%`
      );
      $(".showTemp").text(
        `The temperature in Farenheit is ${response.main.temp} degrees.`
      );
      $(".showPressure").text(
        `The pressure is ${response.main.pressure} units.`
      );
      $(".showWindSpeed").text(`The wind speed is ${response.wind.speed} MPH.`);
      $(".showFeelsLike").text(
        `The temperature feels like ${response.main.feels_like} degrees.`
      );
    }
  });
  $("#seven-day-forcast").click(function () {
    const lat = $("#lat").val();
    const lon = $("#lon").val();
    $("#latitude").val("");
    $("#longitude").val("");

    let request = new XMLHttpRequest();
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $(".daily").html(
        `The seven day forcast for ${lat} and ${lon} is ${response.daily[0].temp.day}`
      );
    }
  });
});

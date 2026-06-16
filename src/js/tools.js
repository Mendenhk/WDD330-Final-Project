import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

//code for currencyl exchange
//fixed rate for if the fetch returns an error
const KHR_RATE = 4100;
const conversionButton = document.getElementById("convert-btn");
conversionButton.addEventListener("click", async () => { 
  const amount = parseFloat(document.getElementById("amount").value);
  //error handling if amount input value is null/empty
  if (!amount || amount <= 0) {
  document.getElementById("result").textContent = "Please enter a valid amount.";
  return;
}
  const from = document.getElementById("currency").value;
  //if from === "USD" then to = KHR, else to = USD
  const to = from === "USD" ? "KHR" : "USD";
  let converted;
  try {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/1a01856179408f52541ae26b/pair/${from}/${to}/${amount}`
  );
  const data = await response.json();
  if (data.conversion_result) {
    converted = data.conversion_result;
  } else {
    converted = from === "USD" ? amount * KHR_RATE : amount / KHR_RATE;
  }
} catch (error) {
  //if an error is returned then KHR will be calculated using a fixed rate
  converted = from === "USD" ? amount * KHR_RATE : amount / KHR_RATE;
}
  document.getElementById("result").textContent = `${converted.toFixed(2)} ${to}`;
  document.getElementById("dollar-riel").textContent =
    to === "KHR" ? "Cambodian Riel (KHR)" : "US Dollar (USD)";
});



//code for weather
//next: add api weather data to page

/*Visual crossing weather API for extracting temp, conditions, and wind speed*/
const API_KEY = "QFQWFF8ERZY3CTXNENCCGK6BF";
const LOCATION = "Phnom Penh,Cambodia";

const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
  LOCATION
)}?unitGroup=metric&include=current&key=${API_KEY}&contentType=json`;

//async fiunction allows other functions to run while it is processing - doesn't lock up the page
async function getWeather() {

  //try works together with catch to deal with errors rather than crashing the system
  try {
    //await pauses the function until data arrives.
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //await pauses the function until data arrives.
    const data = await response.json();

    const current = data.currentConditions;

    const vcTemperature = current.temp;
    const vcConditions = current.conditions;
    const vcWindSpeed = current.windspeed;

    console.log(`Temperature: ${vcTemperature} °C`);
    console.log(`Conditions: ${vcConditions}`);
    console.log(`Wind Speed: ${vcWindSpeed} km/h`);

    //adding above temp, cond, and windspeed to the HTML, and thus the page
    const temperature = document.querySelector('.temperature');
    const conditions = document.querySelector('.conditions');
    const windSpeed = document.querySelector('.windSpeed');
    const windChillElement = document.querySelector('.wind-chill');
    let windChill;

    temperature.textContent = `${vcTemperature}°C / ${((vcTemperature * 9/5) +35).toFixed(1)}°F`
    conditions.textContent = `${vcConditions}`;
    windSpeed.textContent = `${vcWindSpeed} km/h / ${(vcWindSpeed * 0.621371).toFixed(1)} mph`;

    if (vcTemperature <= 10 && vcWindSpeed > 4.8) {
    windChill = calculateWindChill(vcTemperature, vcWindSpeed);
    } else {
    windChill = vcTemperature;
    }
    windChillElement.textContent = `${windChill.toFixed(1)}°C`;

    const svgElement = document.querySelector('.weatherSVG');
    svgElement.src = getWeatherSVG(vcConditions);
    svgElement.alt = vcConditions;

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

getWeather();



function calculateWindChill(temperature, windSpeed) {
  return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
}

/*-------------------- Weather svg's ---------------------*/

const conditionsSVG = {
    thunder: "../images/weather-icons/thunder.svg",
    rain: "../images/weather-icons/rain.svg",
    partly: "../images/weather-icons/images/partly.svg",
    cloud: "../images/weather-icons/cloudy.svg",
    clear: "../images/weather-icons/clear.svg",
    fog: "../images/weather-icons/fog.svg",
    default: "../images/weather-icons/default.svg"
}

//in this function, "includes" is used because the weather api has many types of conditions.
//this serves to cover all types with as little code as possible.
function getWeatherSVG(conditions) {
  if (conditions.includes("Thunder")) return conditionsSVG.thunder;
  if (conditions.includes("Rain")) return conditionsSVG.rain;
  if (conditions.includes("Partly")) return conditionsSVG.partly;
  if (conditions.includes("Cloud") || conditions.includes("Overcast")) return conditionsSVG.cloud;
  if (conditions.includes("Clear") || (conditions.includes("Sun"))) return conditionsSVG.clear;
  if (conditions.includes("Fog") || conditions.includes("Mist")) return conditionsSVG.fog;
  return conditionsSVG.fog;
}
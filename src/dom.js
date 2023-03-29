import { dateFormatter, capitalizeWords, roundUp, isDay } from "./utils";



const DOM = (()=>{
    const importAll = require =>
    require.keys().reduce((acc, next) => {
        acc[next.replace("./", "")] = require(next);
        return acc;
    }, {});

    const images = importAll(
    require.context("./assets", false, /\.(png|jpe?g|svg)$/)
    );

    const body = document.querySelector('body');

    const cityName = document.querySelector('h2.city');
    const date = document.querySelector('span.date');
    const currTemp = document.querySelector('span.current-temp');
    const feelsLike = document.querySelector('span.feels-like');
    const descr = document.querySelector('span.description');

    const lowTemp = document.querySelector('span.lowest-temp > p');
    const highTemp = document.querySelector('span.highest-temp > p');
    const humidity = document.querySelector('span.humidity > p');
    const windSpeed = document.querySelector('span.wind-speed > p');
    const futureForecastsSpans = document.querySelectorAll('div.future-forecasts > span');
    const currentImg = document.querySelector('.current-forecast-img > img');

    function displayInfo(coreData){
        const { todayForecast, futureForecasts } = coreData;
        cityName.textContent = coreData.cityName;
        date.textContent = dateFormatter(todayForecast.timeStamp);
        currTemp.textContent = `${roundUp(todayForecast.temp)}°C`;
        feelsLike.textContent = `Feels like ${roundUp(todayForecast.feelsLike)}°C`;
        descr.textContent = capitalizeWords(todayForecast.description);

        lowTemp.textContent = `${roundUp(todayForecast.tempMin)}°`;
        highTemp.textContent = `${roundUp(todayForecast.tempMax)}°`;
        humidity.textContent = `${todayForecast.humidity}%`;
        windSpeed.textContent = `${roundUp(todayForecast.windSpeed)} km/h`;

        for(let [i, forecast] of futureForecastsSpans.entries()){
            displayFutureForecast(forecast, futureForecasts[i]);
        }

        currentImg.src = images[`${todayForecast.icon}.png`];
        changeBodyBackground(todayForecast.icon);
    }

    function displayFutureForecast(span, info){
        const date = span.querySelector('p.future-date');
        const temp = span.querySelector('p.future-temp');
        const img = span.querySelector('img');
        date.textContent = dateFormatter(info.timeStamp);
        temp.textContent = `${roundUp(info.temp)}°`;
        img.src = images[`${info.icon}.png`];
    }

    function changeBodyBackground(icon){
        if(isDay(icon)){
            body.classList.remove('night');
            body.classList.add('day');
        }else{
            body.classList.remove('day');
            body.classList.add('night');
        }
    }


    return {displayInfo};
})();

export default DOM;


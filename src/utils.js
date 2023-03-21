function extractCoreData(cityName, fullData){
    let coreData = {};
    coreData.cityName = cityName;
    const firstForecast = fullData.list[0];
    const { main, weather, wind } = firstForecast;
    coreData.todayForecast = {
        timeStamp: firstForecast.dt,
        temp: main.temp,
        feelsLike: main.feels_like,
        tempMin: main.temp_min,
        tempMax: main.temp_max,
        humidity: main.humidity,
        windSpeed: convertToKmh(wind.speed),
        description: weather[0].description,
        icon: weather[0].icon
    };
    coreData.futureForecasts = getFutureForecasts(fullData.list);
    console.log(coreData); 
}

function convertToKmh(speed){
    return speed*3.6;
}

function getFutureForecasts(list){
    let forecasts = [];
    for(let i=1; i<=4; i++){
        const forecast = getFutureForecastData(list[i*8]);
        forecasts.push(forecast);
    }
    return forecasts;
}

function getFutureForecastData(forecast){
    return {
        timeStamp: forecast.dt,
        temp: forecast.main.temp,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon
    }
}

function formatCityName(cityName){
    return cityName
      .replace(/(\s+$|^\s+)/g, '') // remove whitespace from begining and end of string
      .replace(/(,\s+)/g, ',') // remove any white space that follows a comma
      .replace(/(\s+,)/g, ',') // remove any white space that preceeds a comma
      .replace(/\s+/g, '+'); // replace any remaining white space with +, so it works in api call
}

export { extractCoreData, formatCityName };
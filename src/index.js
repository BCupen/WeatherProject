import weatherAPI from "./api";

let api = new weatherAPI();

const url = api.getBasicCallURL('Port+Of+Spain');

api.getBasicData(url).then((coordinates)=>{
    const forecastUrl = api.getAdvancedCallURL(coordinates.lat, coordinates.lon, 'metric');
    api.getFullForecastData(forecastUrl).then((data)=>{
        console.log(data);
    })
})


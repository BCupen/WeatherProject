import weatherAPI from "./api";
import { extractCoreData, formatCityName } from "./utils.js";
import "./style.css";

let api = new weatherAPI();

const url = api.getBasicCallURL(formatCityName(" Port-Of-Spain , Trinidad "));

api.getBasicData(url).then((coordinates)=>{
    const forecastUrl = api.getAdvancedCallURL(coordinates.lat, coordinates.lon, 'metric');
    api.getFullForecastData(forecastUrl).then((data)=>{
        console.log(data.list[0]);
        extractCoreData(coordinates.name, data);
    })
})


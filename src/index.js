import weatherAPI from "./api";
import { extractCoreData, formatCityName } from "./utils.js";
import DOM from "./dom.js";
import "./style.css";

let api = new weatherAPI();

const searchBar = document.querySelector('input[type="search"]');
const form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(searchBar.value){
        const formattedName = formatCityName(searchBar.value);
        const url = api.getBasicCallURL(formattedName);
        getForecastData(url).then((coreForecastData) =>{
            console.log(coreForecastData);
            DOM.displayInfo(coreForecastData);
        }).catch((err)=>{
            console.log(err);
        })
        
    }else {
        //error handling
    }
})


async function getForecastData(basicUrl){
    const coordinates = await api.getBasicData(basicUrl);
    const fullForecastUrl = api.getAdvancedCallURL(coordinates.lat, coordinates.lon, 'metric');
    const fullForecast = await api.getFullForecastData(fullForecastUrl);
    const coreForecastData = extractCoreData(coordinates.name,fullForecast);
    return coreForecastData;
}

// const url = api.getBasicCallURL(formatCityName(" Port-Of-Spain , Trinidad "));

// api.getBasicData(url).then((coordinates)=>{
//     const forecastUrl = api.getAdvancedCallURL(coordinates.lat, coordinates.lon, 'metric');
//     api.getFullForecastData(forecastUrl).then((data)=>{
//         console.log(data.list[0]);
//         extractCoreData(coordinates.name, data);
//     })
// })


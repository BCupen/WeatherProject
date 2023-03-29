import weatherAPI from "./api";
import { extractCoreData, formatCityName } from "./utils.js";
import DOM from "./dom.js";
import "./style.css";

let api = new weatherAPI();

const searchBar = document.querySelector('input[type="search"]');
const form = document.querySelector('form');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error-msg');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    error.style.display = 'none';
    loader.style.display = 'none';
    if(searchBar.value){
            getAndDisplay(searchBar.value);
    }
})


async function getForecastData(basicUrl){

    const coordinates = await api.getBasicData(basicUrl);
    const fullForecastUrl = api.getAdvancedCallURL(coordinates.lat, coordinates.lon, 'metric');
    const fullForecast = await api.getFullForecastData(fullForecastUrl);
    const coreForecastData = extractCoreData(coordinates.name,fullForecast);
    return coreForecastData;
}

function getAndDisplay(cityName){
    const formattedName = formatCityName(cityName);
    const url = api.getBasicCallURL(formattedName);
    loader.style.display = 'block';
    getForecastData(url).then((coreForecastData) =>{
        DOM.displayInfo(coreForecastData);
        loader.style.display = 'none';
    }).catch((err) =>{
        error.style.display = 'block';
    })
}

getAndDisplay('Port of Spain');


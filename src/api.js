class weatherAPI {
    _apiKey = '0acdadc54f11831d45863556db35e0d6';
   

    getBasicCallURL (cityName){
        return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${this._apiKey}`;
    }

    getAdvancedCallURL (lat, lon, units) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${this._apiKey}`;
    }

    async getBasicData (url) {
        const response = await fetch(url);
        const data = await response.json();
        const { coord } = data;
        coord.name = data.name;
        coord.country = data.sys.country;
        // console.log(coord);
        return coord;
    }

    async getFullForecastData(url){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

}

export default weatherAPI;
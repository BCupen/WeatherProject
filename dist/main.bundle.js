"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkweatherproject"] = self["webpackChunkweatherproject"] || []).push([["main"],{

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass weatherAPI {\n    _apiKey = '0acdadc54f11831d45863556db35e0d6';\n   \n\n    getBasicCallURL (cityName){\n        return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${this._apiKey}`;\n    }\n\n    getAdvancedCallURL (lat, lon, units) {\n        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${this._apiKey}`;\n    }\n\n    async getBasicData (url) {\n        const response = await fetch(url);\n        const data = await response.json();\n        const { coord } = data;\n        coord.name = data.name;\n        coord.country = data.sys.country;\n        console.log(coord);\n        return coord;\n    }\n\n    async getFullForecastData(url){\n        const response = await fetch(url);\n        const data = await response.json();\n        return data;\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weatherAPI);\n\n//# sourceURL=webpack://weatherproject/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\n\n\nlet api = new _api__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nconst url = api.getBasicCallURL((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatCityName)(\" Port-Of-Spain , Trinidad \"));\n\napi.getBasicData(url).then((coordinates)=>{\n    const forecastUrl = api.getAdvancedCallURL(coordinates.lat, coordinates.lon, 'metric');\n    api.getFullForecastData(forecastUrl).then((data)=>{\n        console.log(data.list[0]);\n        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.extractCoreData)(coordinates.name, data);\n    })\n})\n\n\n\n//# sourceURL=webpack://weatherproject/./src/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"extractCoreData\": () => (/* binding */ extractCoreData),\n/* harmony export */   \"formatCityName\": () => (/* binding */ formatCityName)\n/* harmony export */ });\nfunction extractCoreData(cityName, fullData){\n    let coreData = {};\n    coreData.cityName = cityName;\n    const firstForecast = fullData.list[0];\n    const { main, weather, wind } = firstForecast;\n    coreData.todayForecast = {\n        timeStamp: firstForecast.dt,\n        temp: main.temp,\n        feelsLike: main.feels_like,\n        tempMin: main.temp_min,\n        tempMax: main.temp_max,\n        humidity: main.humidity,\n        windSpeed: convertToKmh(wind.speed),\n        description: weather[0].description,\n        icon: weather[0].icon\n    };\n    coreData.futureForecasts = getFutureForecasts(fullData.list);\n    console.log(coreData); \n}\n\nfunction convertToKmh(speed){\n    return speed*3.6;\n}\n\nfunction getFutureForecasts(list){\n    let forecasts = [];\n    for(let i=1; i<=4; i++){\n        const forecast = getFutureForecastData(list[i*8]);\n        forecasts.push(forecast);\n    }\n    return forecasts;\n}\n\nfunction getFutureForecastData(forecast){\n    return {\n        timeStamp: forecast.dt,\n        temp: forecast.main.temp,\n        description: forecast.weather[0].description,\n        icon: forecast.weather[0].icon\n    }\n}\n\nfunction formatCityName(cityName){\n    return cityName\n      .replace(/(\\s+$|^\\s+)/g, '') // remove whitespace from begining and end of string\n      .replace(/(,\\s+)/g, ',') // remove any white space that follows a comma\n      .replace(/(\\s+,)/g, ',') // remove any white space that preceeds a comma\n      .replace(/\\s+/g, '+'); // replace any remaining white space with +, so it works in api call\n}\n\n\n\n//# sourceURL=webpack://weatherproject/./src/utils.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
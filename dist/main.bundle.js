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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n\n\nlet api = new _api__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nconst url = api.getBasicCallURL('Port+Of+Spain');\n\napi.getBasicData(url).then((coordinates)=>{\n    const forecastUrl = api.getAdvancedCallURL(coordinates.lat, coordinates.lon, 'metric');\n    api.getFullForecastData(forecastUrl).then((data)=>{\n        console.log(data);\n    })\n})\n\n\n\n//# sourceURL=webpack://weatherproject/./src/index.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
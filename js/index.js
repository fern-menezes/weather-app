"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#search-form > form');
const input = document.querySelector("#input-location");
const sectionWeatherInfo = document.querySelector('#weather-info');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    //indica que essa informação não pode ser nula
    if (!input || !sectionWeatherInfo)
        return;
    const location = input.value;
    if (location.length < 3) {
        alert("O local deve ter pelo menos 3 caracteres!");
        return;
    }
    //fazer uma requisição na API
    const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a21e7eed76c636f0190004c96585ccc2&units=metric`);
    //converter a resposta em um JSON
    const dados = yield response.json();
    const infos = {
        temperature: Math.round(dados.main.temp),
        local: dados.name,
        icon: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
        description: dados.weather[0].description
    };
    sectionWeatherInfo.innerHTML = `
            <div class="weather-dados">
                <h2>${infos.local}</h2>
                <span>${infos.temperature}°C</span>
                <p>${infos.description}</p>
            </div>
            <div class="weather-img">
                <img src="${infos.icon}" alt="" width="100px">
            </div>
    `;
}));

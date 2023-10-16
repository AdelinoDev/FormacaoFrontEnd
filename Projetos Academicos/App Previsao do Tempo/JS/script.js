//VARIÁVEIS E SELEÇÃO DE ELEMENTOS

const apiKey = ""; //Chave da API
const apiCountryRUL = "https://flagcdn.com/16x12/png/"; //**URL das bandeiras https://flagcdn.com/16x12/png"
const apiUnsplash = "https://source.unsplash.com/1600x900/?";//URL da imagem de fundo

const cityInput = document.querySelector("#city-input");//campo onde o usuario digita o nome da cidade
const searchBtn = document.querySelector("#search"); //botao para busca da cidade

const cityElement = document.querySelector("#city");//Nome da cidade
const tempElement = document.querySelector("#temperature span");//Decrição sobre a temperatura
const descElement = document.querySelector("#description");//Descrição dos elementos
const weatherIconElement = document.querySelector("#weather-icon");//Descrição do icone
const countryElement = document.querySelector("#country");//Descrição da bandeira
const humidityElement = document.querySelector("#humidity span");//Descrição da umidade
const windElement = document.querySelector("#wind span");//Descrição do vento

const weatherContainer = document.querySelector("#weather-data");


//FUNÇÕES

//consultar os dados dos elementos na API
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}


const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src", 
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryRUL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}Km/h`;

     // Altera a imagem de fundo
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove("hide");
}


//EVENTOS
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const city = e.target.value;
  
      showWeatherData(city);
    }
  });

const sideBarEl = document.querySelector('.side-bar-section');
const formEl = document.querySelector('.search');
const formInputEl = document.querySelector('.search__input');

const infoPanelEl = document.querySelector('.info-panel');

const OWapiKey = '0fbdfcb8133e2eb8d1805e0fe94c4b00';
const positionStackApiKey = '9d3279381be3abdc4bdb3626932f05c3'

async function renderData(weatherData, place) {
    let markup = `
                <div class="info-block">
                    <h2>${place.name}</h2>
                    <p>Temp: ${weatherData.current.temp}</p>
                    <p>Wind: ${weatherData.current.wind_speed}</p>
                    <p>Humidity: ${weatherData.current.humidity}</p>
                    <p>UV index: ${weatherData.current.uvi} </p>
                </div>`
    infoPanelEl.insertAdjacentHTML('afterbegin', markup)
}

formEl.addEventListener('submit', async function fetchAlldata(event) {
    event.preventDefault()
    infoPanelEl.innerHTML = '';
    let city = formInputEl.value;
    try {
        let res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${OWapiKey}`)
        let data = await res.json();
        let place = data[0]
        console.log(place)
        let coordinates = [place.lat, place.lon]
        console.log(coordinates)

        res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${OWapiKey}`)
        data = await res.json();

        await renderData(data, place)
    } catch (error) {
        console.log(error);
        console.log('There was an error!')
    }
});


//jshint esversion:6

const ipInput = document.getElementById('ipInput');
const button = document.querySelector('#ipForm');
const ipAdress = document.querySelector('#ipAdress');
const city = document.querySelector('#location');
const timezone = document.querySelector('#timezone');
const isp = document.querySelector('#isp');

const apiKey = 'at_cwAjFcVQ3ZbN0YJIPToolWcuGanzT';
let domain = '';
let ipFetch = '';
let api_url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipFetch}&domain=${domain}`;

window.addEventListener('load', (evt) => {
    getIp(api_url);
})

button.addEventListener('submit', (evt) => {

    const regex = /[a-zA-Z]+/g;
    console.log(ipInput.value);
    console.log(ipInput.value.match(regex))

    if (ipInput.value.match(regex)) {
        domain = ipInput.value;
        ipFetch = '';
    } else {
        ipFetch = ipInput.value;
        domain = '';
    };
    api_url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipFetch}&domain=${domain}`;
    getIp(api_url);

    evt.preventDefault();

})

const map = L.map('map', { zoomControl: false }).setView([0, 0], 5);

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=rdkFPPXE6QWu5b7QkDgF', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

const arrowIcon = L.icon({
    iconUrl: 'images/icon-location.svg',

    iconSize: [38, 50],
    iconAnchor: [10, 10]
});

const marker = L.marker([0, 0], { icon: arrowIcon }).addTo(map);

async function getIp(url){
  
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    try{
    let lat = data.location.lat;
    let lon = data.location.lng;
    console.log(lat,lon);
    
    marker.setLatLng([lat,lon]);
    map.setView([lat, lon],15);
    ipAdress.textContent = data.ip;
    city.textContent = data.location.city + ', ' + data.location.region + ' ' + data.location.postalCode;
    timezone.textContent = 'UTC' + data.location.timezone;
    isp.textContent = data.isp;
    } catch(e){
      alert(`Code: ${data.code},
    Message: ${data.messages}`);
    }
    };
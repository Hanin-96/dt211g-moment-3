import 'leaflet/dist/leaflet.css';
import L from 'leaflet';




//skapar karta med view med longitud o Latitud över Malmö som start karta
let map = L.map('map').setView([55.6, 13], 11);

let marker;

//Hämtar kartlager som rasterfil
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Importerar in positionsikonen som png då sidan inte lyckas hitta rätt sökväg
import markerIconUrl from '../img/marker-icon.png';

//Skapar positionsikon
const markerIcon = L.icon({
    iconUrl: markerIconUrl
});

//Hämtar sökknapp från html
let searchButtonEl = document.getElementById("btn-map");

//Lägger till eventlistener vid klick på knapp
searchButtonEl.addEventListener("click", search);


async function search() {
    //Hämtar sökfält från html
    let searchInput = document.getElementById("search-field").value;

    //Hämtar specifik plats mha api från nominatim
    const url = "https://nominatim.openstreetmap.org/search?format=json&limit=5&q=" + searchInput;

    //Kör fetch på url som returnerar en promise
    try {
        let response = await fetch(url);
        return await response.json(); //Returnerar json data
        
    } catch (error) {
        console.error(error); //Vid fel körs error meddelande i konsollen
    }
}









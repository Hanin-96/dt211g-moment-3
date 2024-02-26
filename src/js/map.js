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
searchButtonEl.addEventListener("click", displaySearch);


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


async function displaySearch() {
    let errorMessage = document.getElementById("error");
    errorMessage.innerHTML = ""; //Tömmer felmeddelande vid varje sökning

    //Hämtar data från funktionen search
    let data = await search();

    //if-sats som visar första resultat i arrayen
    if (data.length > 0) {
        let firstResult = data[0];


        //Hämtar longitud och latitud för första resultatet
        let lat = firstResult.lat;
        let lon = firstResult.lon;

        //Om positionsikonen redan finns på kartan ska den gamla tas bort
        if (marker) {
            map.removeLayer(marker);
        }

        //Lägger till positionsikon på kartan med specifik inzoomning på 13
        marker = L.marker([lat, lon], { icon: markerIcon }).addTo(map);
        map.setView([lat, lon], 13);
    } else {
        errorMessage.innerHTML = "<p>Inget resultat</p>" //Om platsen inte finns kommer felmeddelande dyka upp
    }

}








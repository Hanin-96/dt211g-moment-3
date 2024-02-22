"use strict"
//För att hämta verktyg mm från chart.js
import Chart from 'chart.js/auto'

//Kallar på init när sidan laddas
window.onload = init;

//Kallar på funktion som hämta api data
function init() {
    displayChartCourses();
}

//Hämtar data via url med async funktion
async function getData() {
    let url = "https://studenter.miun.se/~mallar/dt211g/";
    try {
        let response = await fetch(url);

        return await response.json();

    } catch (error) {
        console.log("Det gick inte att hämta data");
    }
}

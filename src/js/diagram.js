"use strict"
//För att hämta verktyg mm från chart.js
import Chart from 'chart.js/auto'

//Kallar på init när sidan laddas
window.onload = init;

//Kallar på funktion som hämta api data
function init() {
    displayChartCourses();
    displayChartPrograms();
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


async function displayChartCourses() {
    //Deklararar variabel som hämtas från html id element
    const coursesDisplay = document.getElementById("diagram-stapel");

    //Elementet töms
    coursesDisplay.innerHTML = "";


    //Data hämtas från getData funktion
    let coursesData = await getData();

    //Datan filtreras så vi får ut data som överensstämmer med kurs från api mha filter
    let filterCourses = coursesData.filter((admission) => admission.type == "Kurs");

    //Datan sorteras så vi får ut störst antal sökande mha sort
    const sortCourses = filterCourses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    //De 6 högsta värden plockas ut mha splice
    const topCourses = sortCourses.slice(0, 6);

    //Två tomma arrays skapas, här ska de nya värden för kurs och sökande sättas in
    const courseLabels = [];
    const courseCounts = [];

    //Loopar igenom
    for (let i = 0; i < topCourses.length; i++) {
        //Om textsträngen är längre än 35 så ska den kapas till 35 tecken + ... för att visa texten fortsätter
        if (topCourses[i].name.length > 25) {
            topCourses[i].name = topCourses[i].name.slice(0, 25) + "...";
        }

        //Lägger in värden i elementen mha push
        courseLabels.push(topCourses[i].name);
        courseCounts.push(topCourses[i].applicantsTotal);
    }

    //Använder chart.js för att lägga in värden i ett diagram
    new Chart(document.getElementById("diagram-stapel"), {
        type: 'bar',
        data: {
            labels: courseLabels,
            datasets: [
                {
                    label: "Kurser",
                    backgroundColor: [
                        "#F7996C",
                        "#AABFAC",
                        "#0A1F41",
                        "#6CAF89",
                        "#A6F4F7",
                        "#FFB434"],
                    data: courseCounts
                }
            ]
            
        }
    });

}

async function displayChartPrograms() {
    //Deklararar variabel som hämtas från html id element
    const programsDisplay = document.getElementById("diagram-cirkel");

    //Elementet töms
    programsDisplay.innerHTML = "";


    //Data hämtas från getData funktion
    let programsData = await getData();

    //Datan filtreras så vi får ut data som överensstämmer med kurs från api mha filter
    let filterPrograms = programsData.filter((admission) => admission.type == "Program");

    //Datan sorteras så vi får ut störst antal sökande mha sort
    const sortPrograms = filterPrograms.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    //De 6 högsta värden plockas ut mha splice
    const topPrograms = sortPrograms.slice(0, 5);

    //Två tomma arrays skapas, här ska de nya värden för kurs och sökande sättas in
    const programLabels = [];
    const programCounts = [];

    //Loopar igenom
    for (let i = 0; i < topPrograms.length; i++) {

        //Lägger in värden i elementen mha push
        programLabels.push(topPrograms[i].name);
        programCounts.push(topPrograms[i].applicantsTotal);
    }

    //Använder chart.js för att lägga in värden i ett diagram
    new Chart(document.getElementById("diagram-cirkel"), {
        type: 'pie',
        data: {
            labels: programLabels,
            datasets: [
                {
                    label: "Program",
                    backgroundColor: [
                        "#F7996C",
                        "#AABFAC",
                        "#0A1F41",
                        "#6CAF89",
                        "#A6F4F7"],
                    data: programCounts
                }
            ]
        }
    });

}


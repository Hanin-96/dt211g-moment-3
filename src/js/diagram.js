"use strict"
loadAdmissions();
let data = [];
let courses = [];
let programs = [];

async function loadAdmissions() {
    try {
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        data = await response.json();

        courses = data.filter((admission) => admission.type == "Kurs");
        programs = data.filter((admission) => admission.type == "Program");
        console.log(courses);
        console.log(programs);

        displayAdmissions(data);
    } catch {
        document.getElementById("diagram").innerHTML = " <p>Det går inte läsa av diagrammet</p>"
    }
}
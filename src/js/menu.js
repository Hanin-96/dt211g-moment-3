"use strict"

//Hamburgarmeny

//Hämta element från HTML
const hamburgerEl = document.querySelector(".hamburger");
const navMenuEl = document.querySelector(".nav-menu");

//Eventlistener för toggla menyn
hamburgerEl.addEventListener("click", toggleMenu);

//Kalla på funktion för klick på länk
closeDropDown();

//Aktivera hamburgarmenyn mha css klass
function toggleMenu() {
    hamburgerEl.classList.toggle("active");
    navMenuEl.classList.toggle("active");

    // Toggle meny text
    const menuTextEl = document.querySelector(".menu-text");
    if (menuTextEl.innerHTML === "Meny") {
        menuTextEl.innerHTML = "Stäng";
    } else {
        menuTextEl.innerHTML = "Meny";
    }
}

//vid klick på länk ska dropdown meny stängas
function closeDropDown() {
    const linksEl = document.querySelectorAll(".nav-link");
    for (let i = 0; i < linksEl.length; i++) {
        linksEl[i].addEventListener("click", toggleMenu);
    }
}
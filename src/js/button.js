"use strict"

let clickBtn = document.getElementById('click-btn');
let imageRotate = document.getElementById('img-rotate');


clickBtn.addEventListener('click', () => {
    imageRotate.classList.toggle('rotate');
});
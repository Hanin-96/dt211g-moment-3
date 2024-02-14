"use strict"

const clickBtn = document.getElementById('click-btn');
const imageRotate = document.getElementById('img-rotate');

clickBtn.addEventListener('click', () => {
    imageRotate.classList.toggle('rotate');
});
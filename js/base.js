'use strict';

const themeBtn = document.querySelectorAll('.theme-btn');

for (let i = 0; i < themeBtn.length; i++) {
    themeBtn[i].addEventListener('click', function () {
        console.log('hello');
    })
}
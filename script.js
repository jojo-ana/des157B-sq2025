(function(){
    'use strict'
    
    const bttn = document.querySelector('button');
    const texth1 = document.querySelector('h1');
    const texth2 = document.querySelector('h2');
    const sections = document.querySelectorAll('section');
    const texth3s = document.querySelectorAll('h3');
    const links = document.querySelectorAll('a');
    const divContainer = document.querySelector('div#container');
    const body = document.querySelector('body');
    let mode = 'light';

    bttn.addEventListener('click', function(){
        if (mode == 'light') {
            texth1.className = 'night';
            texth2.className = 'night';
            divContainer.className = 'night';
            body.className = 'night';
            bttn.className = 'night';
            bttn.innerHTML = 'on';
            for (const section of sections) {
                section.className = 'night';
            }
            for (const texth3 of texth3s) {
                texth3.className = 'night';
            }
            for (const link of links) {
                link.className = 'night';
            }

            mode = 'dark';
        } else {
            texth1.removeAttribute('class');
            texth2.removeAttribute('class');
            divContainer.removeAttribute('class');
            body.removeAttribute('class');
            bttn.removeAttribute('class');
            bttn.innerHTML = 'off';
            for (const section of sections) {
                section.removeAttribute('class');
            }
            for (const texth3 of texth3s) {
                texth3.removeAttribute('class');
            }
            for (const link of links) {
                link.removeAttribute('class');
            }
            mode = 'light';
        }
    });




})();
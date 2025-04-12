(function(){
    'use strict';

    const myVideo = document.querySelector('#myVideo');
    const fs = document.querySelector('.fa-expand');

    const loading = document.querySelector('.fa-water');
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const line4 = document.querySelector('#line4');

    const intervalID = setInterval(checkTime, 1000);

    const toggleFilter = document.getElementById('toggleFilter');


    toggleFilter.addEventListener('change', function () {
        const action = this.checked ? 'add' : 'remove';
        myVideo.classList[action]('squiggleVision');
    });

    //code for the loading icon
    myVideo.addEventListener('playing', function(){
        loading.style.display = 'none';
    });

    //fullscreen
    fs.addEventListener('click', function(){
        if(!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        }  else {
            document.exitFullscreen();
        }
    });

    //text section
    const mySection = {
        start: [2, 10, 20, 22, 26],
        stop: [9, 19, 26, 26, 29],
        line: [line1, line2, line3, line4, line5]
    }

    function checkTime() {
        for (let i = 0; i < mySection.start.length; i++){
            if (mySection.start[i] < myVideo.currentTime && myVideo.currentTime < mySection.stop[i]) {
                mySection.line[i].className = 'showing';
            } else {
                mySection.line[i].className = 'hidden';
            }
        }
    }
})();
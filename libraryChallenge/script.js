(function(){
    'use strict';

    // add your script here
    var map = L.map('map', {
        scrollWheelZoom: false
    }).setView([34.24, -118.426], 15);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var homeArea = L.circle([34.229, -118.428], {
        color: 'green',
        fillColor: '#84d188',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    homeArea.bindPopup("I am like, around here! <br><i>(Trying not to fully dox myself)</i>");

    var marker1 = L.marker([34.22, -118.43]).addTo(map);

    marker1.bindPopup("My fav local plaza <br><i>Specifically, love Seafood City</i>").openPopup();

    var marker2 = L.marker([34.23, -118.42]).addTo(map);

    marker2.bindPopup("I used to get picked up here to go to school everyday");

   ///Initialize AOS
   AOS.init();

}());
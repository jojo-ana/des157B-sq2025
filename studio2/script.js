let globalData;
async function getData() {
    const myDay = await fetch('data.json');
    const data = await myDay.json();
    console.log(data);
    globalData = data;
}

// targeting the img in the display section
const displayImg = document.querySelector('.displaySection img');


document.querySelector('#timeRange').addEventListener('change', function(event) {
    const selectedTime = event.target.value;

    if (selectedTime !== "Select a Time") {
        const timeData = globalData[selectedTime];
        
        // Updating the activity section
        document.getElementById('activity').textContent = timeData.activity;

        // Updating start and end times
        document.getElementById('startTime').textContent = timeData.start;
        document.getElementById('endTime').textContent = timeData.end;

        // Updating image based on Device
        updateImageSource(timeData.device);

        document.getElementById('activitySection').className = 'hoverOn';
    } else {
        document.getElementById('activitySection').className = 'hoverOff';
        displayImg.src = 'images/placeholder.png';
        displayImg.alt = 'No image';
        displayImg.dataset.hoverSrc = "images/placeholder.png";
         
    }
});

/// Function to update image based on device
function updateImageSource(device) {
    if (device === "Phone") {
        displayImg.src = "images/phoneMe.png";
        displayImg.alt = "Phone Image Set";
        displayImg.dataset.hoverSrc = "images/phoneMeHover.png";
    } else if (device === "PC") {
        displayImg.src = "images/computerMe.png";
        displayImg.alt = "PC Image Set";
        displayImg.dataset.hoverSrc = "images/computerMeHover.png";
    }
}

document.querySelector('.displaySection img').addEventListener('mouseover', function() {
    const img = this;
    img.src = img.dataset.hoverSrc || img.src;
});

document.querySelector('.displaySection img').addEventListener('mouseout', function() {
    const img = this;
    const selectedTime = document.getElementById('timeRange').value;
    const timeData = globalData[selectedTime];
    if (timeData) {
        updateImageSource(timeData.device);
    }
});

getData();
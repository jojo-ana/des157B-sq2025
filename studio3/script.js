/// Particles JS Code

document.addEventListener("DOMContentLoaded", function() {
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 67,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.312665351868777,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3.20,
      }
    }
  });
});



//Scroll listener
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  const yOffset = scrollY * 1.25;
  const yOffset2 = scrollY * 0.25;

  const glassLeft = document.querySelector('#glassLeft ');
  const glassRight = document.querySelector('#glassRight ');
  const barBack = document.querySelector('#barBack');

  glassLeft.style.transform = `translateY(-${yOffset}px)`;
  glassRight.style.transform = `translateY(-${yOffset}px)`;
  barBack.style.transform = `translateY(-${yOffset2}px)`;
});
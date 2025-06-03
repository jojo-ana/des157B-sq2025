(function(){
    "use strict";

    
    document.addEventListener("DOMContentLoaded", () => { 
        
        AOS.init();
        
        gsap.registerPlugin(SplitText, DrawSVGPlugin);
        // gsap.registerPlugin(DrawSVGPlugin);
        /// Script for Scene Changing
        const portal = document.querySelectorAll('.portal');
        const scene0 = document.querySelector('#opening');
        const scene1 = document.querySelector('#scene1');
        const scene2 = document.querySelector('#scene2');
        const scene3 = document.querySelector('#scene3');
        let sceneCounter = 0;

        window.addEventListener('load', () => {
            const overlay = document.getElementById('welcomeOverlay');
            const closeBtn = document.getElementById('closeOverlayBtn');

            overlay.style.display = 'flex';

            closeBtn.addEventListener('click', () => {
                overlay.style.display = 'none';
            });
        });

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const yOffset = scrollY * 0.55;

            let prePuzzleParagraphs = document.querySelectorAll('.prePuzzleContent div');
            prePuzzleParagraphs.forEach(paragraph => {
                paragraph.style.transform = `translateY(-${yOffset}px)`;
            });

        });

        document.querySelectorAll(".closeOverlay").forEach(button => {
            button.addEventListener("click", () => {
                const overlay = button.closest("[id^='puzzleInfo']");
                if (overlay) {
                    overlay.style.display = 'none';
                }
            });
        });


        function switchScenes() {
            if (sceneCounter == 0) {
                scene0.className = 'hidden';
                scene1.className = 'showing';
                window.scrollTo(0, 0);
                sceneCounter++;
                console.log(`scene counter: ${sceneCounter}`);
                AOS.refresh();
                initParticles();
                animateScene1();
            } else if (sceneCounter == 1) {
                scene1.className = 'hidden';
                scene2.className = 'showing';
                window.scrollTo(0, 0);
                sceneCounter++;
                console.log(`scene counter: ${sceneCounter}`);
                AOS.refresh();
                animateScene2();
            } else if (sceneCounter == 2) {
                scene2.className = 'hidden';
                scene3.className = 'showing';
                window.scrollTo(0, 0);
                sceneCounter++;
                console.log(`scene counter: ${sceneCounter}`);
                AOS.refresh();
                animateScene3();
            }
        }

        portal.forEach(portal => {
            portal.addEventListener('click', switchScenes);
        });
        
        
        if (scene0.classList.contains('showing')) {
            animateScene0();
        }

////////// OPENING: Animations
        function animateScene0() {
            ///// Title Animation
            document.fonts.ready.then(()=> {
                let split = SplitText.create(".title", { type: "words", mask: "words" });

                gsap.from(split.words, { y: 100,  ease: "expoScale", autoAlpha: 0,  stagger: 0.25 });
                console.log("animation 0 is playing now");
            });
            
            gsap.from(".visuals", { duration: 1, drawSVG: 0, delay: 0.5, stagger: 0.25 });

            gsap.fromTo("#headerBGIMG", 
                { rotationX: -90, opacity: 0, z: 50}, { rotationX: 0, opacity: 1, z: 0, duration: 2.2, delay: 0.25, ease: "power3.out" });

            gsap.fromTo("#headerBGSVG", 
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.6, delay: 0.5, ease: "bounce.out" });
        }

////////// SCENE 1: Animations
        function animateScene1() {
            document.fonts.ready.then(()=> {
                let split = SplitText.create(".title2", { type: "words", mask: "words" });

                gsap.from(split.words, {  y: 100, ease: "expoScale", autoAlpha: 0, stagger: 0.25 });
                console.log("animation 1 is playing now");
            }); 
        }

        function initParticles() {
            particlesJS ("particles-js", {
            "particles": {
                "number": { "value": 67, "density": { "enable": true, "value_area": 800 }},
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }},
                "opacity": { "value": 0.312665351868777, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false }},
                "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }},
                "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4,  "width": 1 },
                "move": { "enable": true, "speed": 3.20,}}
            });
        }


////////// SCENE 2: Title Animation
        function animateScene2() {
            ///// Title Animation
            let split = SplitText.create(".title3", {
                type: "words",
                mask: "words"
            });

            gsap.from(split.words, {
                y: 100,
                ease: "expoScale",
                autoAlpha: 0,
                stagger: 0.25
            });
            console.log("animation 2 is playing now");
        }

////////// SCENE 3: Title Animation
        function animateScene3() {
            ///// Title Animation
            let split = SplitText.create(".title4", {
                type: "chars",
                mask: "words"
            });

            gsap.from(split.chars, {
                y: 100,
                ease: "expoScale",
                autoAlpha: 0,
                stagger: 0.25
            });
            console.log("animation 3 is playing now");   
        }


////////// Puzzle Code
/*
  Multi-Scene Puzzle Game Logic: Drag-and-drop puzzle for each scene (#scene1, #scene2, #scene3); allows for iteration (and because I don't want my code to be 300 lines long from this alone)
    - Randomly distributes shuffled puzzle pieces into two side containers
    - Generate a grid of droppable slots (boardContainer) 
    - jQuery UI to enable drag-and-drop interactions: `draggable` & `droppable`
    - On clicking the "Done" button, the script checks if all slots are filled correctly
*/

        $(document).ready(function () {
            // Scene Object
            const scenes = [
                {id: "#scene1", grid: 2},
                {id: "#scene2", grid: 3},
                {id: "#scene3", grid: 4},
            ];


            scenes.forEach(scene => initializePuzzle(scene.id, scene.grid));

            function initializePuzzle(sceneId, gridSize) {
                /// Variables for calling Elements in the Scene
                const sceneElement = document.querySelector(sceneId);
                const pieceContainers = sceneElement.querySelectorAll(".pieceContainer");
                const boardContainer = sceneElement.querySelector(".boardContainer");
                const postContent = sceneElement.querySelector(".postPuzzleContent");
                const finishButton = sceneElement.querySelector("button");
                

                // Clear containers
                pieceContainers.forEach(container => container.innerHTML = "");
                boardContainer.innerHTML = "";

                //// Variables for calculating the total pieces
                const totalPieces = gridSize * gridSize;
                const puzzlePieces = generateShuffledPieces(totalPieces);
                const midPoint = Math.ceil(totalPieces / 2);

                // Distribute pieces to left and right containers
                puzzlePieces.forEach((num, index) => {
                    const piece = document.createElement("div");
                    piece.className = "piece";
                    piece.dataset.number = num;

                    const wrapper = document.createElement("div");
                    wrapper.classList.add("piece-wrapper");

                    const sceneName = sceneId.replace("#scene", "");
                    const img = document.createElement("img");
                    img.src = `images/puzzle${sceneName}/puzzle${num}.png`;
                    img.alt = `Puzzle piece ${num}`;

                    wrapper.appendChild(img);
                    piece.appendChild(wrapper);

                    piece.style.position = "absolute";
                    piece.style.top = Math.random() * 300 + "px";
                    piece.style.left = Math.random() * 50 + "px";

                    const targetContainer = index < midPoint ? pieceContainers[0] : pieceContainers[1];
                    targetContainer.style.position = "relative";
                    targetContainer.appendChild(piece);
                });

                // create droppable board
                for (let i = 1; i <= totalPieces; i++) {
                    const slot = document.createElement("div");
                    slot.className = "droppableSpace";
                    slot.dataset.location = i;
                    boardContainer.appendChild(slot);
                    
                }
                // calling on functions for the draggable and droppable from jquerry UI
                makeDraggable(sceneId);
                makeDroppable(sceneId);


                // checking to see if the elements are in the right place using a switch
                finishButton.addEventListener("click", function () {
                    const correctCount = checkAndUpdatePuzzle(sceneElement);
                    const totalSlots = sceneElement.querySelectorAll(".droppableSpace").length;
                    const isCorrect = correctCount === totalSlots;

                    if (isCorrect) {
                        revealCompletedPuzzle(sceneId, boardContainer, postContent);
                        
                    } else {
                        alert("Some pieces are missing or incorrectly placed!");
                    }
                });

                function revealCompletedPuzzle(sceneId, boardContainer, postContent) {
                    postContent.style.display = "flex";

                    const sceneName = sceneId.replace("#scene", "");
                    boardContainer.innerHTML = "";
                    boardContainer.style.display = "block";

                    const fullImage = document.createElement("img");
                    fullImage.src = `images/puzzle${sceneName}/puzzle-complete.png`;
                    fullImage.alt = "Completed puzzle illustration";
                    fullImage.style.width = "100%";
                    fullImage.style.height = "100%";
                    fullImage.style.objectFit = "contain";

                    boardContainer.appendChild(fullImage);
                    gsap.from(fullImage, {
                        // rotate: 60,
                        opacity: 0,
                        scale: 0.9,
                        duration: 1,
                        ease: "power2.out"
                    });
                }
            } 

            function checkAndUpdatePuzzle(sceneElement) {
                let correctCount = 0;
                const allSlots = sceneElement.querySelectorAll(".droppableSpace");
                const sceneId = sceneElement.id;

                allSlots.forEach(slot => {
                    const piece = slot.querySelector(".piece");
                    if (piece && piece.dataset.number == slot.dataset.location) {
                        correctCount++;
                    }
                });

                console.log(`we at ${correctCount}`);

                const infoBox = document.getElementById("puzzleInfo1");
                const infoBox2 = document.getElementById("puzzleInfo2");
                const infoBox3 = document.getElementById("puzzleInfo3");
                const infoBox4 = document.getElementById("puzzleInfo4");
                const infoBox5 = document.getElementById("puzzleInfo5");
                const infoBox6 = document.getElementById("puzzleInfo6");

                if (sceneId === "scene1") {
                    if (correctCount >= 2 && infoBox.classList.contains("hidden")) {
                        console.log("show overlay now");
                        infoBox.classList.remove("hidden");
                    }
                } else if (sceneId === "scene2") {
                    if (correctCount >= 3 && infoBox2.classList.contains("hidden")) {
                        infoBox2.classList.remove("hidden");
                    }
                    if (correctCount >= 6 && infoBox3.classList.contains("hidden")) {
                        infoBox3.classList.remove("hidden");
                    }
                } else if (sceneId === "scene3") {
                    if (correctCount >= 4 && infoBox4.classList.contains("hidden")) {
                        infoBox4.classList.remove("hidden");
                    }
                    if (correctCount >= 8 && infoBox5.classList.contains("hidden")) {
                        infoBox5.classList.remove("hidden");
                    }
                    if (correctCount >= 12 && infoBox6.classList.contains("hidden")) {
                        infoBox6.classList.remove("hidden");
                    }
                }

                return correctCount;
            }

            function generateShuffledPieces(count) {
                const pieces = [];
                for (let i = 1; i <= count; i++) {
                    pieces.push(i);
                }
                return pieces.sort(() => Math.random() - 0.5); //https://www.codemzy.com/blog/shuffle-array-javascript 
            }

            function makeDraggable(sceneId) {
                $(`${sceneId} .piece`).draggable({
                    revert: "invalid",
                    start: function () {
                        if ($(this).hasClass("droppedPiece")) {
                            $(this).removeClass("droppedPiece");
                            $(this).parent().removeClass("piecePresent");
                        }
                    }
                });
            }

            function makeDroppable(sceneId) {
                $(`${sceneId} .droppableSpace`).droppable({
                    hoverClass: "ui-state-highlight",
                    accept: function () {
                        return !$(this).hasClass("piecePresent");
                    },
                    drop: function (event, ui) {
                        const piece = ui.draggable;
                        $(this).addClass("piecePresent");
                        piece.addClass("droppedPiece").css({
                        top: 0,
                        left: 0,
                        position: "relative"
                        }).appendTo($(this));

                        const sceneElement = document.querySelector(sceneId);
                        checkAndUpdatePuzzle(sceneElement);
                    }
                });
            }
        });

    });
}());
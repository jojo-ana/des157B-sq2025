(function(){
    "use strict";
     window.addEventListener('load', () => {
        const overlay = document.getElementById('welcomeOverlay');
        const closeBtn = document.getElementById('closeOverlayBtn');

        overlay.style.display = 'flex';

        closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        });
    });
    
    document.addEventListener("DOMContentLoaded", (event) => {
        gsap.registerPlugin(SplitText);
        gsap.registerPlugin(DrawSVGPlugin);
        /// Script for Scene Changing
        const portal = document.querySelectorAll('.portal');
        const scene0 = document.querySelector('#opening');
        const scene1 = document.querySelector('#scene1');
        const scene2 = document.querySelector('#scene2');
        const scene3 = document.querySelector('#scene3');
        let sceneCounter = 0;


        function switchScenes() {
            if (sceneCounter == 0) {
                scene0.className = 'hidden';
                scene1.className = 'showing';
                window.scrollTo(0, 0);
                sceneCounter++;
                console.log(`scene counter: ${sceneCounter}`);
                animateScene1();
            } else if (sceneCounter == 1) {
                scene1.className = 'hidden';
                scene2.className = 'showing';
                window.scrollTo(0, 0);
                sceneCounter++;
                console.log(`scene counter: ${sceneCounter}`);
                animateScene2();
            } else if (sceneCounter == 2) {
                scene2.className = 'hidden';
                scene3.className = 'showing';
                window.scrollTo(0, 0);
                sceneCounter++;
                console.log(`scene counter: ${sceneCounter}`);
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
                let split = SplitText.create(".title", {
                    type: "words",
                    mask: "words"
                });

                gsap.from(split.words, {
                    y: 100,
                    ease: "expoScale",
                    autoAlpha: 0,
                    stagger: 0.25
                });
                console.log("animation 0 is playing now");
            });
            
            ///// SVG Animation
            gsap.from(".visuals", {
                duration: 1,
                drawSVG: 0,
                delay: 0.5,
                stagger: 0.25
            });
        }

////////// SCENE 1: Animations
        function animateScene1() {
            ///// Title Animation
            let split = SplitText.create(".title2", {
                type: "words",
                mask: "words"
            });

            gsap.from(split.words, {
                y: 100,
                ease: "expoScale",
                autoAlpha: 0,
                stagger: 0.25
            });
            console.log("animation 1 is playing now");
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
                {id: "#scene1", grid: 3},
                {id: "#scene2", grid: 4},
                {id: "#scene3", grid: 5},
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
                    piece.innerText = num; ///// Change out the content once you have visuals joanah

                    piece.style.position = "absolute";
                    piece.style.top = Math.random() * 300 + "px";
                    piece.style.left = Math.random() * 80 + "px";

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
                    const allSlots = sceneElement.querySelectorAll(".droppableSpace");
                    let isCorrect = true;

                    allSlots.forEach(slot => {
                        const piece = slot.querySelector(".piece");
                        if (!piece || piece.dataset.number != slot.dataset.location) {
                            isCorrect = false; //if piece # = slot #, return false
                        }
                    });

                    if (isCorrect) {
                        postContent.style.display = "flex";
                    } else {
                        alert("Some pieces are missing or incorrectly placed!");
                    }
                });
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

                        if (piece.data("number") == $(this).data("location")) {
                        piece.css("background-color", "#b3e6b3");
                        } else {
                        piece.css("background-color", "#f8d7da");
                        }
                    }
                });
            }

            
        });

    });
}());




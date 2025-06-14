(function(){
    "use strict";
    
    document.addEventListener("DOMContentLoaded", () => { 
        AOS.init();
        gsap.registerPlugin(SplitText, DrawSVGPlugin);
        /// Script for Scene Changing
        const portal = document.querySelectorAll('.portal');
        const scene0 = document.querySelector('#opening');
        const scene1 = document.querySelector('#scene1');
        const scene2 = document.querySelector('#scene2');
        const scene3 = document.querySelector('#scene3');
        let sceneCounter = 0;

        const blinkTop = document.getElementById('blinkTop');
        const blinkBottom = document.getElementById('blinkBottom');


        function switchScenes() {
            blinkTransition(() => {
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
            });
        }

        function blinkTransition(callback) {
            blinkTop.classList.add('blink-in');
            blinkBottom.classList.add('blink-in');

            setTimeout(() => {
                callback();
                setTimeout(() => {
                    blinkTop.classList.remove('blink-in');
                    blinkBottom.classList.remove('blink-in');
                }, 150); 
            }, 500); 
        }

        portal.forEach(portal => {
            portal.addEventListener('click', switchScenes);
        });   
        
        if (scene0.classList.contains('showing')) {
            animateScene0();
        }

        // closing the popups
        document.querySelectorAll(".closeOverlay").forEach(button => {
            button.addEventListener("click", () => {
                const overlay = button.closest("[id^='puzzleInfo']");
                if (overlay) {
                    overlay.style.display = 'none';
                }
            });
        });

        // hover animations 
        document.querySelectorAll('.hoverInfo').forEach((element) => {
            const hoverInfoText = element.querySelector('.hoverInfoText');
            let split = null;
            
            element.addEventListener('mouseenter', () => {
                gsap.to(element, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });

                split = SplitText.create(hoverInfoText, { type: "lines", linesClass: "lineChild" });

                gsap.from(split.lines, {
                    y: 50,
                    opacity: 0,
                    ease: "power3.out",
                    stagger: 0.1,
                    duration: 0.6
                });

                gsap.to(hoverInfoText, {
                    autoAlpha: 1,
                    duration: 0.2
                });

                console.log("line animation triggered");
            });

            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.in"
                });

                gsap.to(hoverInfoText, {
                    autoAlpha: 0,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.inOut"
                });
                if (split) split.revert();
            });
        });
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

        ///information container
        const infoOverlays = document.querySelectorAll('.infoContent');
        const infoButtons = document.querySelectorAll('.infoButton');

        infoButtons.forEach((button, i) => {
            const infoOverlay = infoOverlays[i];

            button.addEventListener("mouseover", () => {
                infoOverlay.classList.remove("hidden");
                button.classList.add("infoActive");
            });

            button.addEventListener("mouseout", () => {
                infoOverlay.classList.add("hidden");
                button.classList.remove("infoActive");
            });
        });

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


////////// SCENE 2: Animations
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

            ///// SVG animations
            gsap.from(".pop-svg", {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)"
            });
        }
        

////////// SCENE 3: Animations
        function animateScene3() {
            ///// Title Animation
            let split = SplitText.create(".title4", {
                type: "words",
                mask: "words"
            });

            gsap.from(split.words, {
                y: 100,
                ease: "expoScale",
                autoAlpha: 0,
                stagger: 0.25
            });
            console.log("animation 3 is playing now");   
        }

////////// Puzzle Code
        $(document).ready(function () {
            // Scene Object
            const scenes = [
                {id: "#scene1", grid: 2},
                {id: "#scene2", grid: 3},
                {id: "#scene3", grid: 4},
            ];


            scenes.forEach(scene => initializePuzzle(scene.id, scene.grid));

            function initializePuzzle(sceneId, gridSize) {
                const sceneElement = document.querySelector(sceneId);
                const pieceContainers = sceneElement.querySelectorAll(".pieceContainer");
                const boardContainer = sceneElement.querySelector(".boardContainer");
                const postContent = sceneElement.querySelector(".postPuzzleContent");
                const finishButton = sceneElement.querySelector(".puzzleContainer button");

                pieceContainers.forEach(c => c.innerHTML = "");
                boardContainer.innerHTML = "";

                const totalPieces = gridSize * gridSize;
                const puzzlePieces = generateShuffledPieces(totalPieces);
                const midPoint = Math.ceil(totalPieces / 2);
                const sceneName = sceneId.replace("#scene", "");

                puzzlePieces.forEach((num, i) => {
                    const piece = document.createElement("div");
                    piece.className = "piece";
                    piece.dataset.number = num;
                    const wrapper = document.createElement("div");
                    wrapper.classList.add("piece-wrapper");

                    if (sceneName === "3") {
                        wrapper.classList.add("flip-container");
                        ["front", "back"].forEach(side => {
                            const img = document.createElement("img");
                            img.src = `images/puzzle${sceneName}/${side === "front" ? "puzzle" : "alt"}${num}.png`;
                            img.alt = `${side === "front" ? "Puzzle" : "Alternate puzzle"} piece ${num}`;
                            img.classList.add(side);
                            wrapper.appendChild(img);
                        });
                    } else {
                        const img = document.createElement("img");
                        img.src = `images/puzzle${sceneName}/puzzle${num}.png`;
                        img.alt = `Puzzle piece ${num}`;
                        wrapper.appendChild(img);
                    }

                    piece.appendChild(wrapper);
                    piece.style.top = `${Math.random() * 400}px`;
                    piece.style.left = `${Math.random() * 100}px`;
                    const target = i < midPoint ? pieceContainers[0] : pieceContainers[1];
                    target.style.position = "relative";
                    target.appendChild(piece);
                });

                for (let i = 1; i <= totalPieces; i++) {
                    const slot = document.createElement("div");
                    slot.className = "droppableSpace";
                    slot.dataset.location = i;
                    boardContainer.appendChild(slot);
                }

                makeDraggable(sceneId);
                makeDroppable(sceneId);

                finishButton.addEventListener("click", () => {
                    const correctCount = checkAndUpdatePuzzle(sceneElement);
                    const totalSlots = sceneElement.querySelectorAll(".droppableSpace").length;
                    if (correctCount === totalSlots) {
                        const audioVic = new Audio('sounds/capstoneVic.wav');
                        audioVic.volume = 0.25;
                        audioVic.play();
                        revealCompletedPuzzle(sceneId, boardContainer, postContent);
                        AOS.refresh();

                        if (finishButton) {
                            finishButton.remove();
                        }

                        document.querySelectorAll('[id^="puzzleInfo"]:not(.hidden)').forEach(box => {
                            const overlay = box.querySelector(".overlayContent");
                            if (overlay) {
                                gsap.to(overlay, {
                                    autoAlpha: 0, y: -20, duration: 0.4, ease: "power1.inOut",
                                    onComplete: () => { box.classList.add("hidden"); gsap.set(overlay, { clearProps: "all" }); }
                                });
                            }
                        });
                    } else {
                        alert("Some pieces are missing or incorrectly placed!");
                        sceneElement.querySelectorAll(".droppableSpace").forEach(slot => {
                            const piece = slot.querySelector(".piece");
                            if (!piece || piece.dataset.number !== slot.dataset.location) {
                                slot.style.border = "2px solid red";
                                slot.style.backgroundColor = "#F09D9D";
                            } else {
                                slot.style.border = "";
                                slot.style.backgroundColor = "";
                            }
                        });
                    }
                });

                function revealCompletedPuzzle(sceneId, boardContainer, postContent) {
                    const sceneName = sceneId.replace("#scene", "");
                    postContent.style.display = "flex";
                    if (sceneName === "3") {
                        const scene = document.querySelector(sceneId);
                        const locationsToRemove = ["1", "2", "4", "5", "6", "7", "8", "9", "10", "16"];
                        locationsToRemove.forEach(loc => {
                            const square = scene.querySelector(`.droppableSpace[data-location="${loc}"]`);
                            if (square) {
                                const piece = square.querySelector(".piece");
                                if (piece) piece.remove();
                            }
                        });
                        [["3", "5"], ["11", "6"], ["14", "7"], ["15", "11"]].forEach(([num, loc]) => {
                            const piece = scene.querySelector(`[data-number="${num}"]`);
                            const target = scene.querySelector(`.droppableSpace[data-location="${loc}"]`);
                            if (piece && target) target.appendChild(piece);
                        });

                        scene.querySelectorAll(".droppableSpace").forEach(slot => {
                            slot.style.border = "";
                            slot.style.backgroundColor = "";
                        });

                        // finishButton.removeEventListener('click', onClickHandler);
                    } else {
                        boardContainer.innerHTML = "";
                        boardContainer.style.display = "block";
                        showPuzzleImage();
                    }

                    function showPuzzleImage() {
                        const fullImage = document.createElement("img");
                        fullImage.src = `images/puzzle${sceneName}/puzzle-complete.png`;
                        fullImage.alt = "Completed puzzle illustration";
                        fullImage.style.cssText = "width:100%;height:100%;object-fit:contain";
                        boardContainer.appendChild(fullImage);
                        fullImage.addEventListener("load", () => {
                            gsap.from(fullImage, { opacity: 0, scale: 0.9, duration: 1, ease: "power2.out" });
                        });
                    }
                }
            }

            function checkAndUpdatePuzzle(sceneElement) {
                let correctCount = 0;
                const allSlots = sceneElement.querySelectorAll(".droppableSpace");
                const sceneId = sceneElement.id;

                allSlots.forEach(slot => {
                    const piece = slot.querySelector(".piece");
                    if (piece && piece.dataset.number == slot.dataset.location) correctCount++;
                });

                if (sceneId === "scene1" && correctCount >= 2) showOverlay("puzzleInfo1");
                else if (sceneId === "scene2") {
                    if (correctCount >= 3) showOverlay("puzzleInfo2");
                    if (correctCount >= 6) showOverlay("puzzleInfo3");
                } else if (sceneId === "scene3") {
                    if (correctCount >= 4) showOverlay("puzzleInfo4");
                    if (correctCount >= 8) showOverlay("puzzleInfo5");
                    if (correctCount >= 12) showOverlay("puzzleInfo6");
                }

                function showOverlay(id) {
                    const box = document.getElementById(id);
                    if (box && box.classList.contains("hidden")) {
                        box.classList.remove("hidden");
                        const overlay = box.querySelector(".overlayContent");
                        if (overlay) gsap.fromTo(overlay,
                            { autoAlpha: 0, scale: 0.6, y: 100 },
                            { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "bounce.out" });
                    }
                }
                return correctCount;
            }

            function generateShuffledPieces(count) {
                const pieces = [];
                for (let i = 1; i <= count; i++) pieces.push(i);
                return pieces.sort(() => Math.random() - 0.5);
            }

            function makeDraggable(sceneId) {
                $(`${sceneId} .piece`).draggable({
                    revert: "invalid",
                    start() {
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
                    accept() { return !$(this).hasClass("piecePresent"); },
                    drop(event, ui) {
                        const piece = ui.draggable;
                        $(this).addClass("piecePresent");
                        piece.addClass("droppedPiece").css({ top: 0, left: 0, position: "relative" }).appendTo($(this));
                        checkAndUpdatePuzzle(document.querySelector(sceneId));
                    }
                });
            }
        });
    });
}());
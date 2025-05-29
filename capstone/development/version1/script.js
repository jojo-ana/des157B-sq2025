(function(){
    "use strict";
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
                sceneCounter++;
                console.log(`scene counter: ${sceneCounter}`);
                animateScene1();
            } else if (sceneCounter == 1) {
                scene1.className = 'hidden';
                scene2.className = 'showing';
                sceneCounter++;
                console.log(`scene counter: ${sceneCounter}`);
                animateScene2();
            } else if (sceneCounter == 2) {
                scene2.className = 'hidden';
                scene3.className = 'showing';
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

    });
}());
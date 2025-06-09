import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
gsap.registerPlugin(SplitText, DrawSVGPlugin);

(function(){
    "use strict";
    document.addEventListener("DOMContentLoaded", () => { 
        const canvas = document.querySelector('#canvas3D');
        let width = window.innerWidth;
        let height = window.innerHeight;
        let deskModel;
        let cameraTracking = [];

        const mouse = new THREE.Vector2();
        // update mouse position
        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        //// Creating the scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 10;
        
        //// Objects in the scene
        const objectLoader = new GLTFLoader();
        const deskURL = 'models/table2.gltf';
        objectLoader.load(deskURL, function(gltf) {
            deskModel = gltf.scene;
            deskModel.position.x = 0;
            deskModel.position.y = -4;
            deskModel.position.z = 9;
            deskModel.rotation.x = 0;

            scene.add(deskModel);

            deskModel.traverse((node) => {
                if (node instanceof THREE.Mesh && (/^Camera/i).test(node.name)) {
                    cameraTracking.push(node);
                }
            });
        });

        //// Lights to the Scene
        const light = new THREE.DirectionalLight(0x9CDBA6, 1);
        light.position.set(1, 1, 1); 
        scene.add(light);

        //// Renderer
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadows = true;
        renderer.shadowType = 1;
        renderer.shadowMap.enabled = true;
        renderer.toneMapping = 0;
        renderer.toneMappingExposure = 1;
        renderer.useLegacyLights = false;

        /// storing animation object
        let deskPositionModel = [
            {
                id: 'headerFuture',
                position: {y: -17, z: -10},
                rotation: {x: 0.5}
            }, 
            {
                id: 'puzzleFuture',
                position: {y: -2, z: 4},
                rotation: {x: 0.65}
            },
            {
                id: 'postPuzzleFuture',
                position: {y: -4, z: 9},
                rotation: {x: 0}
            }
        ]
        //// Animate and call renderer
        window.addEventListener('scroll', () => {
            if (deskModel) {
                const sectionsScene3 = document.querySelectorAll('#scene3 section');
                const isVisible = (element) => {
                    return window.getComputedStyle(element).display !== 'none';
                };
                let currentSection;
                sectionsScene3.forEach((section) => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 3 && isVisible(section)) {
                        currentSection = section.id;
                    }
                });
                let position_active = deskPositionModel.findIndex((val) => val.id == currentSection);

                if (position_active >= 0) {
                    let new_coordinates = deskPositionModel[position_active];
                    gsap.to(deskModel.position, {
                        y: new_coordinates.position.y,
                        z: new_coordinates.position.z,
                        duration: 1,
                        ease: "power1.out"
                    })
                    gsap.to(deskModel.rotation, {
                        x: new_coordinates.rotation.x
                    })

                }
                // console.log(currentSection);
            }
        });

        function animate() {
            requestAnimationFrame(animate);

            if (cameraTracking?.[0]) {
                const mesh = cameraTracking[0];
                const targetY = THREE.MathUtils.clamp(mouse.x, -1, 1) * Math.PI / 4;
                const targetX = THREE.MathUtils.clamp(-mouse.y, -1, 1) * Math.PI / 9;  

                mesh.rotation.y += (targetY - mesh.rotation.y) * 0.1;
                mesh.rotation.x += (targetX - mesh.rotation.x) * 0.1;
            }

            renderer.render(scene, camera);
        }

        //// Handling window resizing
        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });
        animate();
    });
}());


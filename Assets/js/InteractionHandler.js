import * as THREE from './build/three.module.js';
import {PetalEffect} from './PetalEffect.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function InteractionHandler(scene, camera, renderer) {
    window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        
        if (intersects.length > 0) {
            const { point } = intersects[0];
            PetalEffect(point, scene);
        }
    });
}
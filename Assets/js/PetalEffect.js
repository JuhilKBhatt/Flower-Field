import * as THREE from './build/three.module.js';
import { RandomColour } from './Utils.js';
import { RandomNumber } from './Utils.js';

const petals = [];

export function PetalEffect(MousePosition, scene) {
    const PetalCount = RandomNumber(5, 15);
    for (let i = 0; i < PetalCount; i++) {
        const PetalMaterial = new THREE.MeshBasicMaterial({ color: RandomColour() });
        const petal = new THREE.Mesh(
            new THREE.CircleGeometry(0.1, 5),
            PetalMaterial
        );
        petal.position.copy(MousePosition);
        petal.rotation.x = -Math.PI / 2;
        petal.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.2,
            0.1 + Math.random() * 0.2,
            (Math.random() - 0.5) * 0.2
        );

        petal.RenderTime = 1000; // 1 second
        petal.RenderedTime = Date.now();

        petals.push({mesh: petal, scene}); // Store each petal and scene for AnimationManager.js
        scene.add(petal);
    }
}

export function GetPetals() {
    return petals;
}
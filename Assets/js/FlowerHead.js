import * as THREE from './build/three.module.js';
import { RandomColour } from './Utils.js';
import { RandomNumber } from './Utils.js';

export function CreateFlowerHead(StemPosition, StemHeight, scene, flowerParams) {
    const FlowerHead = new THREE.Group();

    const PistilMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00 }); // Colour: yellow
    const pistil = new THREE.Mesh(new THREE.SphereGeometry(0.20, 8, 8), PistilMaterial);
    pistil.position.set(
        StemPosition.x,
        StemPosition.y + StemHeight/2 + 0.1,
        StemPosition.z
    );
    FlowerHead.add(pistil);

    const PetalMaterial = new THREE.MeshStandardMaterial({ color: RandomColour() });

    const PetalCount = RandomNumber(flowerParams.minPetalCount, flowerParams.maxPetalCount);

    for (let i = 0; i < PetalCount; i++) {
        const petalWidth = RandomNumber(0.05, 0.15);
        const petalHeight = RandomNumber(0.1, 0.3);
        const PetalGeometry = new THREE.CylinderGeometry(petalWidth, petalWidth * 1.5, petalHeight, 6);

        const petal = new THREE.Mesh(PetalGeometry, PetalMaterial);

        const angle = (i / PetalCount) * Math.PI * 2;
        petal.position.set(
            StemPosition.x + Math.cos(angle) * 0.3,
            StemPosition.y + StemHeight/2 + 0.1,
            StemPosition.z + Math.sin(angle) * 0.3
        );
        petal.rotation.x = Math.PI / 2;
        petal.rotation.z = angle;

        FlowerHead.add(petal);
    }

    scene.add(FlowerHead);
}
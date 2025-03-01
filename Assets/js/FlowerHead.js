import * as THREE from './build/three.module.js';

export function CreateFlowerHead(StemPosition, scene) {
    const FlowerHead = new THREE.Group();

    const pistilMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00 }); // Colour: yellow
    const pistil = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        pistilMaterial
    );
    pistil.position.set(0, 0.5, 0);
    FlowerHead.add(pistil);

    scene.add(FlowerHead);
}
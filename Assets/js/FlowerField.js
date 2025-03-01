import * as THREE from './build/three.module.js';

export function CreateFlowerField(scene) {
    const flowerMaterial = new THREE.MeshStandardMaterial({ color: 0xffc0cb }); // Colour: Pink
    for (let i = 0; i < 50; i++) {
        const flower = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 1, 6),
            flowerMaterial
        );
        flower.position.set(
            (Math.random() - 0.5) * 20,
            0.5,
            (Math.random() - 0.5) * 20
        );
        scene.add(flower);
    }
}
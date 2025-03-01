import * as THREE from './build/three.module.js';
import { CreateFlowerHead } from './FlowerHead.js';

export function CreateFlowerField(scene) {
    const flowerMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 }); // Colour: Pink
    for (let i = 0; i < 100; i++) {
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
        
        CreateFlowerHead(flower.position, scene)
    }
}
import * as THREE from './build/three.module.js';
import { CreateFlowerHead } from './FlowerHead.js';

export function CreateFlowerField(scene) {
    const FlowerMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 }); // Green Flower stem

    // Create a circular platform
    const PlatformGeometry = new THREE.CylinderGeometry(10, 10, 0.5, 32);
    const PlatformMaterial = new THREE.MeshStandardMaterial({ color: 0x7CFC00 }); // Grass colour
    const platform = new THREE.Mesh(PlatformGeometry, PlatformMaterial);
    platform.position.y = 0;
    scene.add(platform);

    const placedPositions = [];  // Store positions of placed flowers
    const minDistance = 1;     // Distance between flowers

    for (let i = 0; i < 200; i++) {
        let position;
        let isValidPosition = false;

        // Retry generating position until a valid spot is found
        while (!isValidPosition) {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.sqrt(Math.random()) * 9.5;

            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);
            position = new THREE.Vector3(x, 0.5, z);

            // Check for overlap with previously placed flowers
            isValidPosition = placedPositions.every((pos) => position.distanceTo(pos) >= minDistance);
        }

        // Create the flower at the validated position
        const flower = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 1, 6),
            FlowerMaterial
        );

        flower.position.copy(position);
        scene.add(flower);
        placedPositions.push(position);  // Save position

        CreateFlowerHead(flower.position, scene);
    }
}
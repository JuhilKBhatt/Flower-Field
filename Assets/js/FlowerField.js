import * as THREE from './build/three.module.js';
import { CreateFlowerHead } from './FlowerHead.js';
import { RandomNumber } from './Utils.js';

export function CreateFlowerField(scene, flowerParams) {
    const FlowerMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 }); // Green Flower stem

    // Create a circular platform
    const PlatformGeometry = new THREE.CylinderGeometry(10, 10, 0.75, 32);
    const PlatformMaterial = new THREE.MeshStandardMaterial({ color: 0x7CFC00 }); // Grass colour
    const platform = new THREE.Mesh(PlatformGeometry, PlatformMaterial);
    platform.position.y = 0;
    scene.add(platform);

    const placedPositions = [];  // Store positions of flowers
    const minDistance = 1;       // Distance between flowers

    // Use parameter for flower count
    for (let i = 0; i < flowerParams.count; i++) {
        let position;
        let isValidPosition = false;

        // Randomize stem height based on input params
        const StemHeight = RandomNumber(flowerParams.minStemHeight, flowerParams.maxStemHeight);

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
            new THREE.CylinderGeometry(0.1, 0.1, StemHeight, 6),
            FlowerMaterial
        );

        flower.position.copy(position);
        scene.add(flower);
        placedPositions.push(position);  // Save position

        // Pass flowerParams to CreateFlowerHead for customization
        CreateFlowerHead(flower.position, StemHeight, scene, flowerParams);
    }
}
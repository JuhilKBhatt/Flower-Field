import * as THREE from './build/three.module.js';
import { RandomNumber } from './Utils.js';

let grassInstances = [];  // Store references to grass blades

// Create the grass field
export function CreateGrassField(scene, grassParams) {
    const { count, height, width, areaRadius } = grassParams;

    // Grass blade geometry and material
    const bladeGeometry = new THREE.PlaneGeometry(width, height);
    const bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0x228B22,  // Forest green
        side: THREE.DoubleSide,
        transparent: true,
    });

    // Create grass blades
    for (let i = 0; i < count; i++) {
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);

        // Randomize position within a circular area
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.sqrt(Math.random()) * areaRadius;
        blade.position.set(
            Math.cos(angle) * radius,
            height, // Offset to avoid clipping through the ground
            Math.sin(angle) * radius
        );

        // Randomize rotation for natural look
        blade.rotation.y = Math.random() * Math.PI;

        // Save initial position for wind animation
        blade.userData = {
            initialPosition: blade.position.clone()
        };

        grassInstances.push(blade);
        scene.add(blade);
    }
}

// Animate grass swaying in the wind
export function animateGrass(time, grassParams) {
    const { windSpeed } = grassParams;

    grassInstances.forEach((blade, index) => {
        const swayAmount = Math.sin(time * windSpeed + index) * 0.1;
        blade.position.x = blade.userData.initialPosition.x + swayAmount;
        blade.position.z = blade.userData.initialPosition.z + swayAmount;
        blade.rotation.z = Math.sin(time * windSpeed + index) * 0.1;
    });
}
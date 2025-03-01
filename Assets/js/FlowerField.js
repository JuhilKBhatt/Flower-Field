import * as THREE from './build/three.module.js';
import { CreateFlowerHead } from './FlowerHead.js';

export function CreateFlowerField(scene) {
    const FlowerMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 }); // Green stem

    // Create a circular platform
    const PlatformGeometry = new THREE.CylinderGeometry(10, 10, 0.5, 32);
    const PlatformMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown color
    const platform = new THREE.Mesh(PlatformGeometry, PlatformMaterial);
    platform.position.y = 0;
    scene.add(platform);

    for (let i = 0; i < 250; i++) {
        // Generate random angle and radius for circular distribution
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.sqrt(Math.random()) * 9.5; // Adjust radius to fit within platform

        // Calculate flower position based on polar coordinates
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        const flower = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 1, 6),
            FlowerMaterial
        );

        flower.position.set(x, 0.5, z);
        scene.add(flower);

        // Create flower head on top of the stem
        CreateFlowerHead(flower.position, scene);
    }
}
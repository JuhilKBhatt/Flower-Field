import * as THREE from './build/three.module.js';
import { RandomColour } from './Utils.js';
import { RandomNumber } from './Utils.js';

const petals = [];
const raycaster = new THREE.Raycaster();  // For accurate 3D position
const mouse = new THREE.Vector2();         // Mouse position in normalized device coordinates

export function PetalEffect(event, camera, scene, renderer) {
    // Convert mouse coordinates to normalized device coordinates (-1 to +1)
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Use raycaster to find where the click intersects the ground/platform
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const MousePosition = intersects[0].point;  // Get the first intersected point

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

            petal.RenderTime = 500;  // 0.5 second
            petal.RenderedTime = Date.now();

            petals.push({ mesh: petal, scene });
            scene.add(petal);
        }
    }
}

export function GetPetals() {
    return petals;
}
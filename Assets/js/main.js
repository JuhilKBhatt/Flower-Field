import * as THREE from './build/three.module.js';
import { OrbitControls } from './build/OrbitControls.js';
import { CreateFlowerField } from './flowerField.js';
import { InteractionHandler } from './interactionHandler.js';
import { animatePetals } from './animationManager.js';

let camera, scene, renderer, controls;

// Create the scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue

// Create the camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.00001, 1000);
camera.position.set(5, 20, 20);
scene.add(camera);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(15, 20, 10);
light.castShadow = true;
scene.add(light);

const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.4);
scene.add(hemiLight);

// Create the flower field
window.regenerateFlowerField = () => {
    // Capture user inputs
    const flowerParams = {
        count: parseInt(document.getElementById('flowerCount').value),
        minStemHeight: parseFloat(document.getElementById('minStemHeight').value),
        maxStemHeight: parseFloat(document.getElementById('maxStemHeight').value),
        minPetalCount: parseInt(document.getElementById('minPetalCount').value),
        maxPetalCount: parseInt(document.getElementById('maxPetalCount').value)
    };

    // Clear previous flowers
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    // Regenerate flowers with new parameters
    CreateFlowerField(scene, flowerParams);
};
window.regenerateFlowerField();// Create the init flower field

InteractionHandler(scene, camera, renderer);

// Create the renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;         // Enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // Soft shadows
document.body.appendChild(renderer.domElement);

// Add OrbitControls
controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Smooth the camera movement
controls.dampingFactor = 0.25;
controls.maxPolarAngle = Math.PI / 2;  // Limit vertical rotation

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();  // Update orbit controls
    animatePetals();
    renderer.render(scene, camera);
}
animate();
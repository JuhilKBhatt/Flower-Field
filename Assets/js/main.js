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
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.set(5, 20, 20);
scene.add(camera);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);  // Soft white light for basic visibility
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
light.castShadow = true;  // Enable shadows if needed
scene.add(light);

const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.4);  // Sky and ground lighting
scene.add(hemiLight);

// Create the renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add grid helper for reference
const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

// Create the flower field
window.regenerateFlowerField = () => {
    const flowerParams = {
        count: parseInt(document.getElementById('flowerCount').value),
        minStemHeight: parseFloat(document.getElementById('minStemHeight').value),
        maxStemHeight: parseFloat(document.getElementById('maxStemHeight').value),
        minPetalCount: parseInt(document.getElementById('minPetalCount').value),
        maxPetalCount: parseInt(document.getElementById('maxPetalCount').value)
    };

    while (scene.children.length > 2) {  // Preserve camera, lights, and grid
        scene.remove(scene.children[2]);
    }

    CreateFlowerField(scene, flowerParams);
};
window.regenerateFlowerField();  // Create the initial flower field

InteractionHandler(scene, camera, renderer);

// Add OrbitControls
controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Smooth the camera movement
controls.dampingFactor = 0.25;
controls.maxPolarAngle = Math.PI / 1.8;  // Limit vertical rotation

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
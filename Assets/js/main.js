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
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Create the flower field
CreateFlowerField(scene);

InteractionHandler(scene, camera, renderer);

// Create the renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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
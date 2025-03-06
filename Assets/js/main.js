import * as THREE from './build/three.module.js';
import { OrbitControls } from './build/OrbitControls.js';
import { CreateFlowerField } from './flowerField.js';
import { animatePetals } from './animationManager.js';
import { PetalEffect } from './PetalEffect.js';

let camera, scene, renderer, controls;

// Create the scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);  // Sky blue

// Create the camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 20, 20);
scene.add(camera);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// Create the renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Add OrbitControls
controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.maxPolarAngle = Math.PI / 2;

// Handle mouse click for petal effect
window.addEventListener('click', (event) => {
    PetalEffect(event, camera, scene, renderer);
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Create the flower field
window.regenerateFlowerField = () => {
    const flowerParams = {
        count: parseInt(document.getElementById('flowerCount').value),
        minStemHeight: parseFloat(document.getElementById('minStemHeight').value),
        maxStemHeight: parseFloat(document.getElementById('maxStemHeight').value),
        minPetalCount: parseInt(document.getElementById('minPetalCount').value),
        maxPetalCount: parseInt(document.getElementById('maxPetalCount').value)
    };

    while (scene.children.length > 2) {
        scene.remove(scene.children[2]);
    }

    CreateFlowerField(scene, flowerParams);
};
window.regenerateFlowerField();  // Initial field

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    animatePetals();
    renderer.render(scene, camera);
}
animate();
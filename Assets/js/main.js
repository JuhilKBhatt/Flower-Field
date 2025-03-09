import * as THREE from './build/three.module.js';
import { OrbitControls } from './build/OrbitControls.js';
import { CreateFlowerField } from './flowerField.js';
import { animatePetals } from './animationManager.js';
import { PetalEffect } from './PetalEffect.js';
import { CreateGrassField, animateGrass } from './GrassField.js';

let camera, scene, renderer, controls;

// Create the scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

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
controls.maxPolarAngle = Math.PI / 1.8;

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

// Define max limits
const limits = {
    maxFlowers: 200,
    minFlowers: 1,
    minStem: 0.25,
    maxStem: 3,
    minPetals: 1,
    maxPetals: 20
};

// Grass parameters
const grassParams = {
    count: 1000,        // Number of grass blades
    height: 0.5,          // Height of each blade
    width: 0.1,         // Width of each blade
    windSpeed: 1.0,     // Speed of wind sway
    areaRadius: 10      // Area covered by grass
};

// Function to enforce input limits
function enforceLimits(value, min, max, name) {
    if (value < min) {
        alert(`${name} cannot be less than ${min}. Limit applied.`);
        return min;
    }
    if (value > max) {
        alert(`${name} cannot exceed ${max}. Limit applied.`);
        return max;
    }
    return value;
}

// Function to regenerate flower field
window.regenerateFlowerField = () => {
    const flowerCount = enforceLimits(parseInt(document.getElementById('flowerCount').value), limits.minFlowers, limits.maxFlowers, "Flower count");
    const minStemHeight = enforceLimits(parseFloat(document.getElementById('minStemHeight').value), limits.minStem, limits.maxStem, "Min stem height");
    const maxStemHeight = enforceLimits(parseFloat(document.getElementById('maxStemHeight').value), minStemHeight, limits.maxStem, "Max stem height");
    const minPetalCount = enforceLimits(parseInt(document.getElementById('minPetalCount').value), limits.minPetals, limits.maxPetals, "Min petal count");
    const maxPetalCount = enforceLimits(parseInt(document.getElementById('maxPetalCount').value), minPetalCount, limits.maxPetals, "Max petal count");

    const flowerParams = {
        count: flowerCount,
        minStemHeight: minStemHeight,
        maxStemHeight: maxStemHeight,
        minPetalCount: minPetalCount,
        maxPetalCount: maxPetalCount
    };

    // Remove existing flowers
    while (scene.children.length > 2) {
        scene.remove(scene.children[2]);
    }

    // Create new flower field
    CreateFlowerField(scene, flowerParams);

    // Create and add grass field to the scene
    CreateGrassField(scene, grassParams);
};

// Initial field generation
window.regenerateFlowerField();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    const time = performance.now() * 0.001;  // Time in seconds

    controls.update();
    animatePetals();
    animateGrass(time, grassParams);  // Animate grass sway
    renderer.render(scene, camera);
}
animate();
import * as THREE from './build/three.module.js';
import { OrbitControls } from './build/OrbitControls.js';
import { CreateFlowerField } from './flowerField.js';
import { animatePetals } from './animationManager.js';
import { PetalEffect } from './PetalEffect.js';

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

// Create the flower field
window.regenerateFlowerField = () => {
    // Define max limits
    const maxFlowers = 200;
    const minFlowers = 1;
    const minStem = 0.5;
    const maxStem = 5;
    const minPetals = 1;
    const maxPetals = 20;

    // Get input values and enforce limits
    let flowerCount = parseInt(document.getElementById('flowerCount').value);
    let minStemHeight = parseFloat(document.getElementById('minStemHeight').value);
    let maxStemHeight = parseFloat(document.getElementById('maxStemHeight').value);
    let minPetalCount = parseInt(document.getElementById('minPetalCount').value);
    let maxPetalCount = parseInt(document.getElementById('maxPetalCount').value);

    // Check and correct values if out of bounds
    if (flowerCount > maxFlowers) {
        flowerCount = maxFlowers;
        alert(`Maximum allowed flowers is ${maxFlowers}. Limit applied.`);
    } else if (flowerCount < minFlowers) {
        flowerCount = minFlowers;
        alert(`Minimum allowed flowers is ${minFlowers}. Limit applied.`);
    }

    if (minStemHeight < minStem) {
        minStemHeight = minStem;
        alert(`Minimum stem height is ${minStem}. Limit applied.`);
    } else if (minStemHeight > maxStem) {
        minStemHeight = maxStem;
        alert(`Maximum stem height is ${maxStem}. Limit applied.`);
    }

    if (maxStemHeight > maxStem) {
        maxStemHeight = maxStem;
        alert(`Maximum stem height is ${maxStem}. Limit applied.`);
    } else if (maxStemHeight < minStemHeight) {
        maxStemHeight = minStemHeight;
        alert(`Max stem height cannot be less than min stem height. Corrected.`);
    }

    if (minPetalCount < minPetals) {
        minPetalCount = minPetals;
        alert(`Minimum petal count is ${minPetals}. Limit applied.`);
    } else if (minPetalCount > maxPetals) {
        minPetalCount = maxPetals;
        alert(`Minimum petal count cannot exceed ${maxPetals}. Limit applied.`);
    }

    if (maxPetalCount > maxPetals) {
        maxPetalCount = maxPetals;
        alert(`Maximum petal count is ${maxPetals}. Limit applied.`);
    } else if (maxPetalCount < minPetalCount) {
        maxPetalCount = minPetalCount;
        alert(`Max petal count cannot be less than min petal count. Corrected.`);
    }

    const flowerParams = {
        count: flowerCount,
        minStemHeight: minStemHeight,
        maxStemHeight: maxStemHeight,
        minPetalCount: minPetalCount,
        maxPetalCount: maxPetalCount
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
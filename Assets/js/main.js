import * as THREE from './build/three.module.js';

var camera, scene, renderer;
			
scene = new THREE.Scene();

// Set background color
scene.background = new THREE.Color(0x87CEEB); 

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.00001, 1000);
camera.position.set(5, 5, 20);
camera.lookAt(0, 0, 1);
scene.add(camera);

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);
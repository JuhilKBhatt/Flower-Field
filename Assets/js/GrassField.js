import * as THREE from './build/three.module.js';

export function CreateGrassField(scene, grassParams) {
    const grassCount = grassParams.count;
    const grassHeight = grassParams.height;
    const grassWidth = grassParams.width;
    const areaRadius = grassParams.areaRadius;

    const grassMaterial = new THREE.MeshBasicMaterial({
        color: 0x228B22,   // Forest green
        side: THREE.DoubleSide
    });

    // Grass blade geometry
    const bladeGeometry = new THREE.PlaneGeometry(grassWidth, grassHeight, 1, 4);
    bladeGeometry.translate(0, grassHeight, 0);

    const grassMesh = new THREE.InstancedMesh(bladeGeometry, grassMaterial, grassCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < grassCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * areaRadius;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const yRotation = Math.random() * Math.PI * 2;

        dummy.position.set(x, 0, z);
        dummy.rotation.y = yRotation;
        dummy.updateMatrix();
        grassMesh.setMatrixAt(i, dummy.matrix);
    }

    scene.add(grassMesh);
    return () => {};
}
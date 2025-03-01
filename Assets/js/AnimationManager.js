import { GetPetals } from './PetalEffect.js';

export function animatePetals() {
    const TimeNow = Date.now();
    const petals = GetPetals();
    for (let i = petals.length - 1; i >= 0; i--) {
        const {mesh, scene} = petals[i];
        mesh.position.add(mesh.velocity);
        mesh.velocity.y -= 0.01; // Gravity

        if (TimeNow - mesh.RenderedTime > mesh.RenderTime) {
            scene.remove(mesh);
            petals.splice(i, 1);
        }
    }
}
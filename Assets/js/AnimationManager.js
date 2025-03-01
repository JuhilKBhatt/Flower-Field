import { GetPetals } from './PetalEffect.js';

export function animatePetals() {
    const petals = GetPetals();
    for (const petal of petals) {
        petal.position.add(petal.velocity);
        petal.velocity.y -= 0.01;  // Gravity
        
        if (petal.position.y < 0) {
            petal.position.y = 0;
        }
    }
}
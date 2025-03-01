// Description: Utility functions for the project

// Function to generate a random colour
export function RandomColour() {
    const randomColor = Math.floor(Math.random() * 16777215); // Generate random color
    return randomColor; // Return in the correct format for Three.js
}

// Function to generate a random number between a range
export function RandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
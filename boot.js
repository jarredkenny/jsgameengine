import Game from './lib/Game';

// Create game canvas and add to dom.
let canvas = document.createElement('canvas');
document.body.appendChild(canvas);

// Set game canvas size.
canvas.height = 320;
canvas.width = 480;

// Create debug canvas and append to dom.
let debugCanvas = document.createElement('canvas');
document.body.appendChild(debugCanvas);

// Set debug canvas size
debugCanvas.height = 200;
debugCanvas.width = canvas.width;

// Initialize game on canvas.
let game = new Game(canvas, debugCanvas);

// Start the game.
game.start();

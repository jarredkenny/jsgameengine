import Game from './Game';

class Driver {

  /**
   * Start
   * Creates a canvas. Sizes it to match the availible screen size.
   * Inserts the canvas into the dom and initializes the game on it.
   */
  start(){

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

  }

}

export default Driver;

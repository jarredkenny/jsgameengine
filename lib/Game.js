import Engine from '../engine';
import Player from './Player';

class Game {

  /**
   * Constructor
   * Initialize basic game components
   * then start the main game loop.
   */
  constructor(canvas, debugCanvas){

    // Use the supplied canvas as our rendering canvas.
    this.renderingCanvas  = canvas;
    this.renderingContext = canvas.getContext('2d');

    // Initialize scene manager.
    this.sceneManager = new Engine.SceneManager();

    // If a debugger canvas was provided. Set it up
    this.debugCanvas = debugCanvas || null;
    if(this.debugCanvas){
      this.debugger = new Engine.Debugger(this);
    }

    // Initialize last frame time.
    this.lastFrameTime = Date.now();

  }

  /**
   * Start
   * Begins running the game.
   */
  start(){
    this.boot();
    this.animate();
  }

  /**
   * Setup
   * Sets up a scene for testing. This will be moved into some kind of
   * level registration API that will work with the scene manager.
   */
  boot(){

    // Create Player Entity
    let playerSheet = new Engine.SpriteSheet('/assets/spritesheets/player.jpg', 32, 32);
    let player = new Player(playerSheet);
    this.debugger.setPlayer(player);

    let ground = new Engine.Entity();
    ground.body.position.y = 300;
    ground.body.position.x = 0;
    ground.body.size.x = 600;
    ground.body.size.y = 100;
    ground.body.mass = 0;

    let b1 = new Engine.Entity();
    b1.body.position.y = 10;
    b1.body.position.x = 100;
    b1.body.size.x = 42;
    b1.body.size.y = 42;
    b1.body.mass = 10;


    // Create scene and add entities
    let scene = new Engine.Scene();

    scene.addEntity(player);
    scene.addEntity(ground);
    scene.addEntity(b1);

    console.log(player, ground, b1);

    // Create map and add to scene.
    let map = new Engine.Map('test', 'assets/maps/test.tmx');
    scene.setMap(map);

    // Set up scene camera and set on scene.
    let camera = new Engine.Camera(0, 0, this.renderingCanvas.width, this.renderingCanvas.height, 100, player);
    scene.setCamera(camera);

    // Add scene to scene manager.
    this.sceneManager.addScene('main', scene);

    // Play the scene.
    this.sceneManager.play('main');

    // Initialize last frame time
    this.lastFrameTime = Date.now();

  }

  /**
   * Animate
   * Uses the browsers requestAnimationFrame API to call itself and
   * the games main loop everytime an animation frame is availible.
   */
  animate(){
    window.requestAnimationFrame(this.animate.bind(this));
    this.loop();
  }

  /**
   * Loop
   * Main game loop. Calls the update and render chains
   * aswell as tracks time since last loop for smooth updates.
   */
  loop(){
    let now = Date.now();
    let modifier = (now - this.lastFrameTime) / 1000;
    this.update(modifier);
    this.render();
    this.lastFrameTime = now;
  }

  /**
   * Update
   * Initial call in the update chain. Delegates
   * updates to the scene mananager.
   */
  update(modifier){
    this.sceneManager.getCurrentScene().update(modifier);
  }

  /**
   * Render
   * Initial call in the render chain. Delegates
   * renders to the scene manager.
   */
  render(){
    this.renderingContext.fillRect(0, 0, this.renderingCanvas.width, this.renderingCanvas.height);
    this.sceneManager.getCurrentScene().render(this.renderingContext);
    this.debugger.draw(this.debugCanvas.getContext('2d'));
  }

}

export default Game;

import Player from './Player';
import Scene from './Scene';
import SceneManager from './SceneManager';
import Entity from './Entity';
import SpriteSheet from './SpriteSheet';
import Map from './Map';

class Game {

  /**
   * Constructor
   * Initialize basic game components
   * then start the main game loop.
   */
  constructor(canvas){

    // Use supplied canvas as primary scene canvas.
    this.sceneCanvas = canvas;

    // Get rendering context.
    this.sceneContext = this.sceneCanvas.getContext('2d');

    // Initialize scene manager.
    this.sceneManager = new SceneManager();

  }

  /**
   * Start
   * Begins running the game.
   */
  start(){
    this.setup();
    this.animate();
  }

  /**
   * Setup
   * Sets up a scene for testing. This will be moved into some kind of
   * level registration API that will work with the scene manager.
   */
  setup(){

    let playerSheet = new SpriteSheet('/assets/spritesheets/player.jpg', 32, 32);

    // Create Entity
    let player = new Player(playerSheet);
    let other = new Entity();

    other.body.position.x = 124;
    other.body.position.y = 124;
    other.body.size.x = 62;
    other.body.size.y = 62;



    // Create scene and add entity
    let scene = new Scene();
    scene.size.x = 480;
    scene.size.y = 320;
    scene.addEntity(player);
    scene.addEntity(other);

    // Add scene to scene manager.
    this.sceneManager.addScene('main', scene);

    // Play the scene.
    this.sceneManager.play('main');

    // Load a map
    let map = new Map('test', 'assets/maps/test.tmx');

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

    // Clear the scene rendering context.
    this.sceneContext.clearRect(0, 0, this.sceneCanvas.width, this.sceneCanvas.height);

    // Render the current scene to the scene rendering context.
    this.sceneManager.getCurrentScene().render(this.sceneContext);

  }

}

export default Game;

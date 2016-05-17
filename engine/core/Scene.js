import Physics from '../physics';

/**
 * Scene
 * A Scene is a wrapper object which contains a Map and an array
 * of game objects. The scene handles updating and rendering the map
 * and objects when its respective methods are called.
 */
class Scene {

  constructor(){

    // Scene Rendering Target
    this.renderingCanvas  = document.createElement('canvas');
    this.renderingContext = this.renderingCanvas.getContext('2d');

    // Map
    this.map = null;

    // Entities
    this.entities = [];

    // Camera
    this.camera = null;

    this.physics = new Physics.Engine();

  }

  /**
   * Add Object
   * Adds an object to the scene.
   */
  addEntity(entity){
    this.entities.push(entity);
  }

  /**
   * Set Map
   * Sets the scenes map.
   */
  setMap(map){
    this.map = map;
  }

  /**
   * Set Camera
   * Sets the camera to use when rendering the scene.
   */
  setCamera(camera){
    this.camera = camera;
  }

  /**
   * Resize Scene to Map
   * Sets the scene redering canvas dimensions
   * to match the current maps dimensions.
   */
  resizeSceneToMap(map){
    this.renderingCanvas.width = map.width * map.tileWidth;
    this.renderingCanvas.height = map.height * map.tileHeight;
  }

  /**
   * Update
   * Updates all objects in scene.
   */
  update(modifier){

    // Ensure the rendering target size matches the map size.
    this.resizeSceneToMap(this.map);

    // Update Entities
    this.entities.forEach((e) => e.update(modifier) );

    // Handle Physics
    this.physics.tick(this.entities);

    // Update the scene camera
    this.camera.update(this);

  }

  /**
   * Render
   * Renders all of the map and all entities
   * within view of the scenes camera.
   */
  render(context){

    // If the scene has a map. Render visible map to the scene.
    if(this.map){
      this.map.render(this.renderingContext, this.camera);
    }

    // Render all scene entities.
    this.entities.forEach((entity) => {
      entity.render(this.renderingContext);
    });

    context.drawImage(
      this.renderingCanvas,
      this.camera.position.x,
      this.camera.position.y,
      this.camera.size.x * this.camera.zoom,
      this.camera.size.y * this.camera.zoom,
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );

  }

}

export default Scene;

/**
 * Scene Manager
 * Manages multiple scenes and controls which one
 * is currently being played.
 */
class SceneManager {

  constructor(){

    // Set up object to store all scenes.
    this.scenes = {};

    // Pointer to current scene.
    this.current = null;

  }

  /**
   * Add Scene
   * Adds a scene to the scene object.
   */
  addScene(name, scene){
    this.scenes[name] = scene;
  }

  /**
   * Remove Scene
   * Removes a scene from the scenes object by name.
   */
  removeScene(name){
    delete this.scenes[name];
  }

  /**
   * Get Current Scene
   * Returns the currently playing scene.
   */
  getCurrentScene(){
    return this.current;
  }

  /**
   * Play
   * Plays a scene by name.
   */
  play(name){

    // Ensure scene exists.
    if(!this.scenes[name]){
      throw new Error(`SceneManager: No scene registered with name '${name}'`);
    }

    // Set current pointer to the scene.
    this.current = this.scenes[name];

  }

}

export default SceneManager;

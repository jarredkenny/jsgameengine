import Collision from './Collision';

/**
 * Scene
 * A Scene is a wrapper object which contains a Map and an array
 * of game objects. The scene handles updating and rendering the map
 * and objects when its respective methods are called.
 */
class Scene {

  /**
   * Constructor
   * Sets initial scene properties.
   */
  constructor(options){
    let o = options || {};
    this.size     = {x: 0, y: 0};
    this.map      = o.map       || null;
    this.entities = o.entities  || [];
    this.context  = o.context   || null;
  }

  /**
   * Add Object
   * Adds an object to the scene.
   */
  addEntity(entity){
    this.entities.push(entity);
  }


  /**
   * Update
   * Updates all objects in scene.
   */
  update(modifier){

    // Update Each Entity
    this.entities.forEach((entity) => {
      entity.update(modifier);
    });

    // Check for scene edge collisions
    this.entities.forEach((entity) => {
      if(entity.body.position.x < 0){ entity.body.position.x = 0; }
      if(entity.body.position.x + entity.body.size.x > this.size.x){ entity.body.position.x = this.size.x - entity.body.size.x; }
      if(entity.body.position.y < 0){ entity.body.position.y = 0; }
      if(entity.body.position.y + entity.body.size.y > this.size.y){ entity.body.position.y = this.size.y - entity.body.size.x; }
    });

    // Check for Entity on Entity collisions between entities in motion and all other entities.
    this.entities.forEach((e1) => {
      this.entities.forEach((e2) => {
        if(e1 !== e2 && e1.body.inMotion && Collision.entityOnEntity(e1, e2)){
          e1.revertMove(modifier);
        }
      });
    });
  }

  /**
   * Render
   * Renders all objects in scene.
   */
  render(context){
    this.entities.forEach((entity) => {
      entity.render(context);
    });
  }

}

export default Scene;

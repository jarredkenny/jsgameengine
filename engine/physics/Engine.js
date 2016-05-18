import Vector from './Vector';
import Collision from './Collision';
import CollisionDetector from './CollisionDetector';

export default class Engine {

  /**
   * Physics Engine
   */
  constructor(){
    this.contacts   = [];
    this.iterations = 10;
    this.gravity    = new Vector(0, 1);
    this.objcount   = 0;
  }

  /**
   * Find Collisions
   * Finds collisions between entities and generates
   * manifolds containing the colliding entities to be solved
   */
  findCollisions(entities){
    entities.forEach((e1) => {
      entities.forEach((e2) => {
        if(e1 !== e2 && CollisionDetector.entityOnEntity(e1, e2)){
          const c = new Collision(e1, e2);
          if(c.solve()){
            this.contacts.push(c);
          }
        }
      });
    });
  }

  /**
   * Cull Collisions
   * Removes duplicate collisions pairs
   * from the array of detected collisions.
   */
  cullCollisions(){

  }

  /**
   * Integrate Forces
   * Integrates forces on all entities.
   */
  integrateForces(entities){
    entities.forEach((e) => {
      e.body.integrateForces();
    });
  }

  /**
   * Resolve Collisions
   * Resolves all detected collisions.
   */
  resolveCollisions(){
    for(let i = 0; i < this.iterations; i++){
      this.contacts.forEach((c) => {
        c.resolve();
      });
    }
  }

  /**
   * Integrate Velocities
   * Integrates velocities on all entities.
   */
  integrateVelocities(entities){
    entities.forEach((e) => {
      e.body.integrateVelocity();
    });
  }

  /**
   * Tick
   * Run the full physics engine loop on
   * the provided collection of entities.
   * @param Array<Entity> entities
   */
  tick(entities){
    //entities.forEach((e) => e.body.applyImpulse(this.gravity));
    this.findCollisions(entities);
    this.cullCollisions();
    this.integrateForces(entities);
    this.resolveCollisions();
    this.integrateVelocities(entities);
  }


}

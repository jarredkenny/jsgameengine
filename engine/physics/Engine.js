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
  cullCollisions(collisions){
    // TODO: Implement body uuid based culling of collision pairs.
    //       Track encountered collision pairs in a 2D array
    //       Do not track collision pairs who has been encountered.
    //       Do not track collisions pairs who's reverse has been encountered.

    // Track discovered pairs
    const pairs = [];

    // Track unique collisions
    const unique = [];

    // Consider each detected collisions
    collisions.forEach((collision) => {

      // Destructure bodys from collision
      let seen = [];
      const { a, b } = collision;

      // Determine if this collision has already been seen
      seen = pairs.filter((pair) => {
        return (
          (pair[0] === a.id && pair[1] === b.id) ||
          (pair[1] === a.id && pair[0] === b.id)
        );
      });

      // If collision is unique, IE. has not been seen
      // add it to the unique array, and track the pair.
      if(seen.length === 0) {
        pairs.push([a.id, b.id]);
        unique.push(collision);
      }
    });
    return unique;
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
      e.body.clearForces();
    });
  }

  /**
   * Postional Correction
   * Prevents bodys from sinking
   * into one another when resting.
   */
  positionalCorrection(){
    this.contacts.forEach((c) => c.positionalCorrection());
  }

  /**
   * Clear Collisions
   * Removes all contacts so that
   * they do not exist in the next tick.
   */
  clearCollisions(){
    this.contacts = [];
  }

  /**
   * Tick
   * Run the full physics engine loop on
   * the provided collection of entities.
   * @param Array<Entity> entities
   */
  tick(entities){
    entities.forEach((e) => e.body.applyForce(this.gravity));
    this.findCollisions(entities);
    this.contacts = this.cullCollisions(this.contacts);
    this.integrateForces(entities);
    this.resolveCollisions();
    this.integrateVelocities(entities);
    this.positionalCorrection();
    this.clearCollisions();
  }


}

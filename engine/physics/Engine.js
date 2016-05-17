import Vector from './Vector';
import Manifold from './Manifold';
import Collision from './Collision';

export default class Engine {

  /**
   * Physics Engine
   */
  constructor(){
    this.contacts   = [];
    this.iterations = 10;
    this.gravity    = new Vector(0, 1);
  }

  /**
   * Find Collisions
   * Finds collisions between entities and generates
   * manifolds containing the colliding entities to be solved
   */
  findCollisions(entities){
    entities.forEach((e1) => {
      entities.forEach((e2) => {
        if(e1 !== e2 && Collision.entityOnEntity(e1, e2)){
          const c = new Manifold(e1, e2);
          if(c.solve()){
            this.contacts.push(c);
          }
        }
      });
    });
  }

  integrateForces(entities){
    entities.forEach((e) => {
      e.body.integrateForces();
    });
  }

  initializeCollisions(){
    this.contacts.forEach((c) => {
      c.init(new Vector(0, 1));
    });
  }

  solveCollisions(){
    for(let i = 0; i < this.iterations; i++){
      this.contacts.forEach((c) => {
        c.resolve();
      });
    }
  }

  integrateVelocities(entities){
    entities.forEach((e) => {
      e.body.integrateVelocity();
    });
  }

  correctPositions(){
    this.contacts.forEach((c) => {
      c.positionalCorrection();
    });
  }

  tick(entities){
    this.findCollisions(entities);
    this.integrateForces(entities);
    this.initializeCollisions();
    this.solveCollisions();
    this.integrateVelocities(entities);
    this.correctPositions();
  }


}

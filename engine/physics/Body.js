import Vector from './Vector';

export default class Body {

  /**
   * Physics Body
   * Contains all information relevent to a body and
   * methods needed for interation with the physics engine.
   */
  constructor(){
    this.mass            = 0;
    this.restitution     = 0;
    this.staticFriction  = 0;
    this.dynamicFriction = 0;
    this.size            = new Vector();
    this.position        = new Vector();
    this.velocity        = new Vector();
    this.acceleration    = new Vector();
  }

  /**
   * Inverse mass
   * 0 is inifite mass.
   */
  get imass(){
    return this.mass === 0 ? 0 : 1 / this.mass;
  }

  /**
   * Integrate Forces
   * Sets volocity by integrating forces.
   * @param gravity Vector
   */
  integrateForces(gravity){
    if(this.imass !== 0){
      this.velocity.x += (this.force.x * this.imass + gravity.x) / 2;
      this.velocity.y += (this.force.y * this.imass + gravity.y) / 2;
    }
  }

  /**
   * Integerate Velocity
   * Sets position by integrating velocity
   * @param gravity Vector
   */
  integrateVelocity(gravity){
    if(this.imass !== 0){
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.integrateForces(gravity);
    }
  }

  /**
   * Apply Impulse
   * Applies an impulse to this body.
   * @param force Vector
   */
  applyImpulse(force){
    this.velocity.x += this.imass * force.x;
    this.velocity.y += this.imass * force.y;
  }

  /**
   * Apply Force
   * Applies a force to this body.
   * @param force Vector
   */
  applyForce(force){
    this.force.x += force.x;
    this.force.y += force.y;
  }

}

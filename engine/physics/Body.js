import Vector from './Vector';

export default class Body {

  /**
   * Physics Body
   * Contains all information relevent to a body and
   * methods needed for interation with the physics engine.
   */
  constructor(){
    this.density      = 0;
    this.restitution  = 0;
    this.shape        = false;
    this.position     = new Vector();
    this.velocity     = new Vector();
    this.acceleration = new Vector();
  }

  /**
   * Mass
   * Getter which calculates mass based
   * on the bodys volume and density.
   */
  get mass(){
    return this.volume * this.density;
  }

}

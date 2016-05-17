import Vector from './Vector';

export default class Manifold {

  /**
   * Manifold
   * Contains information about an individual collision.
   */
  constructor(e1, e2){
    this.a  = e1.body;
    this.b  = e2.body;
    this.sf = 0;
    this.df = 0;
    this.e  = Math.min(this.a.restitution, this.b.restitution);
    this.normal       = new Vector(0, 0);
    this.penetration  = 0;
  }

  /**
   * Init
   * Initializes manifold with with world data.
   */
  init(gravity, epsilon){

    // If this is a resting collision, apply no restituion.
    const rx = this.b.velocity.x - this.a.velocity.x;
    const ry = this.b.velocity.y - this.a.velocity.y;
    if((rx * rx + ry * ry) < (gravity.x * gravity.x + gravity.y * gravity.y) + epsilon){
      this.e = 0;
    }

    // Calculate friction between both bodys
    this.sf = Math.sqrt(this.a.staticFriction * this.b.staticFriction);
    this.df = Math.sqrt(this.a.dynamicFriction * this.b.dynamicFriction);

  }

  /**
   * Solve
   * Solves the collision between the two bodys.
   */
  solve(){
    
  }

}

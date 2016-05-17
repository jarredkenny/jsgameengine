import Vector from './Vector';
import { STICKY_THRESHOLD } from './Constants';

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
  init(gravity){

    // If this is a resting collision, apply no restituion.
    const rx = this.b.velocity.x - this.a.velocity.x;
    const ry = this.b.velocity.y - this.a.velocity.y;
    if((rx * rx + ry * ry) < (gravity.x * gravity.x + gravity.y * gravity.y) + STICKY_THRESHOLD){
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

    // Vector AB
    const nx = this.a.position.x - this.b.position.x;
    const ny = this.a.position.y - this.b.position.x;

    // 1/2 Extends on X Axis
    const aex = ((this.a.position.x + this.a.size.x) - this.a.position.x) / 2;
    const bex = ((this.b.position.x + this.b.size.x) - this.b.position.x) / 2;

    // Overlap on X Axis
    const xoverlap = aex + bex - Math.abs(nx);

    if(xoverlap > 0){

      // 1/2 Extends on Y Axis
      const aey = ((this.a.position.y + this.a.size.y) - this.a.position.y) / 2;
      const bey = ((this.b.position.y + this.b.size.y) - this.b.position.y) / 2;

      const yoverlap = aey + bey - Math.abs(ny);

      if(yoverlap){

        if(xoverlap < yoverlap){
          this.normal.x    = nx < 0 ? 1 : -1;
          this.normal.y    = 0;
          this.penetration = xoverlap;
          return true;
        }else{
          this.normal.x    = 0;
          this.normal.y    = ny < 0 ? 1 : -1;
          this.penetration = yoverlap;
          return true;
        }
      }

    }

    return false;

  }

  /**
   * Resolve
   * Resolves a collision by applying an impulse to each of the bodys.
   */
  resolve(){

    const rx = this.b.velocity.x - this.a.velocity.x;
    const ry = this.b.velocity.y - this.a.velocity.y;

    const vNormal = rx * this.normal.x + ry * this.normal.y;

    if(vNormal > 0){
      return;
    }else{

      let j = -(1.0 + this.e) * vNormal;
      j /= (this.a.imass + this.b.imass);

      this.a.applyImpulse(-j * this.normal.x, -j * this.normal.y);
      this.b.applyImpulse(j * this.normal.x, j * this.normal.y);

      let tx = rx - (this.normal.x * vNormal);
      let ty = ry - (this.normal.y * vNormal);
      const tl = Math.sqrt(tx * tx + ty * ty);

      if(tl > STICKY_THRESHOLD){
        tx /= tl;
        ty /= tl;
      }

      let jt = -(rx * tx + ry * ty);
      jt /= (this.a.imass + this.b.imass);

      if(Math.abs(jt) < STICKY_THRESHOLD){
        return;
      }

      if(Math.abs(jt) < j * this.sf){
        tx = tx * jt;
        ty = ty * jt;
      }else{
        tx = tx * -j * this.df;
        ty = ty * -j * this.df;
      }

      this.a.applyImpulse(-tx, -ty);
      this.b.applyImpulse(tx, ty);

    }
  }

  /**
   * Positional Correction
   * Prevents resting bodys from sinking into eachother.
   */
  positionalCorrection(){
    const slop = 0.05;
    const m    = Math.max(this.penetration - slop, 0.0) / (this.a.imass + this.b.imass);
    const cx   = m * this.normal.x * 0.7;
    const cy   = m * this.normal.y * 0.7;
    this.a.position.x -= cx * this.a.imass;
    this.a.position.y -= cy * this.a.imass;
    this.b.position.x -= cx * this.b.imass;
    this.b.position.y -= cy * this.b.imass;
  }

}

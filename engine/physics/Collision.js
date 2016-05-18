import Vector from './Vector';

export default class Collision {

  /**
   * Collision
   * Contains data pertaining to a body vs. body collision.
   * Calculates collision normal and resolves the collision
   * by applying impulses to each body.
   * @param Entity e1
   * @param Entity e2
   */
  constructor(e1, e2){
    this.a      = e1.body;
    this.b      = e2.body;
  }

  /**
   * Solve
   * Calculates collision normal and penetration depth.
   */
  solve(){

    // Get bodys
    const { a, b } = this;

    // Calculate normal vector AB
    const nv = b.velocity.subtract(a.velocity);

    // Calculate half extents along xaxis for each object.
    const aex = (a.bounds.r - a.bounds.l) / 2;
    const bex = (b.bounds.r - b.bounds.l) / 2;

    // Calculate overlap on xaxis
    const xoverlap = aex + bex - Math.abs(nv.x);

    // Stop if no overlap
    if(xoverlap < 0){ return false; }

    // Calculate half extends along yaxis for each object.
    const aey = (a.bounds.b - a.bounds.t) / 2;
    const bey = (b.bounds.b - b.bounds.t) / 2;

    // Calculate overlap on yaxis
    const yoverlap = aey + bey - Math.abs(nv.y);

    // Stop if no overlap
    if(yoverlap < 0){ return false; }

    // Determine axis of least penetration and set normal.
    if(xoverlap < yoverlap){
      this.normal = (nv.x < 0) ? new Vector(1, 0) : new Vector(-1, 0);
      this.penetration = xoverlap;
    }else{
      this.normal = (nv.y < 0) ? new Vector(0, -1) : new Vector(0, 1);
      this.penetration = yoverlap;
    }

    return true;

  }

  /**
   * Resolve
   * Resolves the collision by applying impulse to each body.
   */
  resolve(){

    // Get bodys
    const { a, b } = this;

    // Calculate relative velocity
    const rv = b.velocity.subtract(a.velocity);

    // Calculate relative velocity in terms of normal direction
    const rvn = rv.dot(this.normal);

    // Do not resolve if velocities are opposite in direction.
    if(rvn < 0){ return; }

    // Calculate restitution
    const e = Math.min(a.restitution, b.restitution);

    // Calculate impulse scaler
    let j = (-(1 + e) * rvn) / a.imass + b.imass;

    // Scale normal to get impulse vector
    const i = this.normal.scale(j);

    // Seperate and scale impulse vector by inverse mass.
    const ai = i.scale(a.imass);
    const bi = i.scale(b.imass);

    // Apply calculated impulse to bodys
    a.velocity.subtractFrom(ai);
    b.velocity.addTo(bi);

    //debugger;

  }

}

import { PHYSICS_DYNAMIC } from './Constants';

class Body {

  /**
   * Object representing a 2D game body.
   * Contains all physics and positioning data.
   */
  constructor(){
    this.rotation     = 0;
    this.restitution  = 1;
    this.visible      = true;
    this.inMotion     = false;
    this.size         = {x: 0, y: 0};
    this.position     = {x: 0, y: 0};
    this.velocity     = {x: 0, y: 0};
    this.acceleration = {x: 0, y: 0};
    this.type         = PHYSICS_DYNAMIC;
  }

  /**
   * Get Bounds
   * Returns a hash of the bodys bounds
   * as top, bottom, left, and right.
   * @returns Object {t, b, l, r}
   */
  getBounds(){
    return {
      l: this.position.x,
      t: this.position.y,
      r: this.position.x + this.size.x,
      b: this.position.y + this.size.y
    };
  }

  /**
   * Get Midpoint
   * Returns the bodys midpoint coordinates
   * @return Object {x, y}
   */
  getMidpoint(){
    return {
      x: this.position.x + (this.size.x * 0.5),
      y: this.position.y + (this.size.y * 0.5)
    };
  }

}

export default Body;

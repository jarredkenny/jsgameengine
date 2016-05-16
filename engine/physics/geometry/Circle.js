import Vector from '../Vector';
import Rectangle from './Rectangle';

export default class Circle {

  /**
   * Circle
   * @param x Number
   * @param y Number
   * @param radius Number
   */
  constructor(x, y, radius){
    this.radius   = radius;
    this.position = new Vector();
  }

  /**
   * Circumference
   * Getter which calculates the circles circumference
   */
  get circumference(){
    return 2 * (Math.PI * this.radius);
  }

  /**
   * Diameter
   * Getter which calcualtes the circles diameter.
   */
  get diameter(){
    return 2 * this.radius;
  }

  /**
   * Bounds
   * Getter which calculates a bounding rectangle
   * based on the circles current position and radius.
   */
  get bounds(){
    return new Rectangle(
      this.position.x - this.radius,
      this.position.y - this.radius,
      this.diameter,
      this.diameter
    );
  }


}

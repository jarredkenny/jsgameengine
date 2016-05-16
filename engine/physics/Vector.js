import Point from './Point';

export default class Vector extends Point {

  /**
   * Vector
   * @param x Number
   * @param y Number
   */
  constructor(x, y){
    super(x, y);
  }

  /**
   * Distance
   * Calculates the distance from this vector to another.
   * @param v Vector
   */
  distance(v){
    if(!v){ v = new Vector(0, 0); }
    return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
  }

  /**
   * Scale
   * Returns a new scaled vector scaled using the provided ratio.
   * @param s Number
   */
  scale(s){
    return new Vector(this.x * s, this.y * s);
  }

  /**
   * Add
   * Returns the result of vector addition with the provided vector.
   * @param v Vector
   */
  add(v){
    return new Vector(this.x + v.x, this.y + v.y);
  }

  /**
   * Subtract
   * Returns the result of vector subtraction with the provided vector.
   * @param v Vector
   */
  substract(v){
    return new Vector(this.x - v.x, this.y - v.y);
  }

  /**
   * Dot
   * Returns the dot product of this vector and the supplied vector.
   * @param v Vector
   */
  dot(v){
    return this.x * v.y + this.y * v.x;
  }

  /**
   * Cross
   * Returns the cross product of this vector and the supplied vector.
   * @param v Vector
   */
  cross(v){
    return this.x * v.y - this.y * v.x;
  }

}

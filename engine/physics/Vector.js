export default class Vector {

  /**
   * Vector
   * @param x Number
   * @param y Number
   */
  constructor(x, y){
    this.x = x || 0;
    this.y = y || 0;
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
   * Scale By
   * Scales this vector using the provided coefficient.
   * @param Number c
   */
  scaleBy(c){
    this.x *= c;
    this.y *= c;
  }

  /**
   * Add
   * Returns the result of vector addition between this
   * vector and the suppied vector as a new vector.
   * @param v Vector
   */
  add(v){
    return new Vector(this.x + v.x, this.y + v.y);
  }

  /**
   * Add To
   * Adds a vector to this vector.
   * @param Vector V
   */
  addTo(v){
    this.x += v.x;
    this.y += v.y;
  }

  /**
   * Subtract
   * Returns the result of vector substraction between this
   * vector and the supplied vector as a new vector.
   * @param v Vector
   */
  subtract(v){
    return new Vector(this.x - v.x, this.y - v.y);
  }

  /**
   * Substract From
   * Subtracts a vector from this vector.
   * @param Vector v
   */
  subtractFrom(v){
    this.x -= v.x;
    this.y -= v.y;
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

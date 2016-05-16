export default class Rectangle {

  /**
   * Rectangle
   * @param x Number
   * @param y Number
   * @param width Number
   * @param height Number
   */
  constructor(x, y, width, height){
    this.position = {x, y};
    this.size     = {x: width, y: height};
  }

  /**
   * box
   * Getter which returns the rectangle itself since
   * there is no need to produce a second one for the
   * bounding box. This is mostly just here to keep the API
   * consistent.
   */
  get bounds(){
    return this;
  }

}

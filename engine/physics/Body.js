class Body {

  /**
   * Object representing a 2D game body.
   */
  constructor(){

    // Basic Position and Size
    this.position = {x: 0, y: 0};
    this.size     = {x: 0, y: 0};
    this.speed    = 0;
    this.inMotion = false;
    this.rotation = 0;
    this.visible  = true;

  }

}

export default Body;

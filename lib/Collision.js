class Collision {

  /**
   * Entity On Entity
   * Checks for collisions between two entities.
   * @param Entity e1
   * @param Entity e2
   * @return Boolean isColliding
   */
  static entityOnEntity(e1, e2){
    return this.bodyOnBody(e1.body, e2.body);
  }

  /**
   * Body On Body
   * Checks any two bodys for collisions.
   * @param Body b1
   * @param Body b2
   * @return Boolean isColliding
   */
  static bodyOnBody(b1, b2){
    return (
      b1.position.x + b1.size.x > b2.position.x &&
      b1.position.x < b2.position.x + b2.size.x &&
      b1.position.y + b1.size.y > b2.position.y &&
      b1.position.y < b2.position.y + b2.size.y
    );
  }

}

export default Collision;

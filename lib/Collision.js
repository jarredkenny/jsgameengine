class Collision {

  /**
   * Entity On Entity
   * Checks for collisions between two entities.
   * @param Entity e1
   * @param Entity e2
   * @return Boolean isColliding
   */
  static entityOnEntity(e1, e2){
    return (
      e1.body.position.x + e1.body.size.x > e2.body.position.x &&
      e1.body.position.x < e2.body.position.x + e2.body.size.x &&
      e1.body.position.y + e1.body.size.y > e2.body.position.y &&
      e1.body.position.y < e2.body.position.y + e2.body.size.y
    );
  }

}

export default Collision;

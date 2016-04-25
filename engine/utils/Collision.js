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

  /**
   * Entity On Map Edge
   * Checks an entity for collisions with a maps edges.
   * @param Entity e
   * @param Map    m
   */
  static entityOnMapEdges(e, m){
    return (
      e.body.position.x < 0 ||
      e.body.position.y < 0 ||
      e.body.position.x + e.body.size.x > m.widthpx ||
      e.body.position.y + e.body.size.y > m.heightpx
    );
  }

}

export default Collision;

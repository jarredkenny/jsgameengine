export default class Collision {

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
  static bodyOnBody(body1, body2){
    const b1 = body1.getBounds();
    const b2 = body2.getBounds();
    return !(b1.b < b2.t || b1.t > b2.b || b1.r < b2.l || b1.l > b2.r);
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

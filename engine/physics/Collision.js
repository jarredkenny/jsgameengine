import { STICKY_THRESHOLD } from './Constants';

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

  /**
   * Resolve
   * Resolves a collision between two bodys
   * @param body1 Body
   * @param body2 Body
   */
  static resolve(b1, b2){

    const b1mid     = b1.getMidpoint();
    const b2mid     = b2.getMidpoint();
    const b2bounds  = b2.getBounds();

    const dx = Math.abs((b1mid.x - b2mid.x) / (b2.width * 0.5));
    const dy = Math.abs((b1mid.y - b2mid.y) / (b2.height * 0.5));

    if(Math.abs(dx - dy) < 0.1){

      if(dx < 0){ b1.position.x = b2bounds.x.r; }
      else      { b1.position.x = b2bounds.x.l - b1.size.x; }
      if(dy < 0){ b1.position.y = b2bounds.y.b; }
      else      { b1.position.y = b2bounds.y.t - b1.size.y; }

      const axis = (Math.random() < 0.5) ? 'x' : 'y';
      b1.velocity[axis] = -b1.velocity[axis] * b2.restitution;
      if(Math.abs(b1.velocity[axis]) < STICKY_THRESHOLD){
        b1.velocity[axis] = 0;
      }

    }else if(dx > dy){

      if(dx < 0){ b1.position.x = b2bounds.r; }
      else      { b1.position.x = b2bounds.l - b1.size.x; }

      b1.velocity.x = -b1.velocity.x * b2.restitution;
      if(Math.abs(b1.velocity.x) < STICKY_THRESHOLD){
        b1.velocity.x = 0;
      }

    }else{

      if(dy < 0){ b1.position.y = b2bounds.b; }
      else      { b1.position.y = b2bounds.t - b1.size.y; }

      b1.velocity.y = -b1.velocity.y * b2.restitution;
      if(Math.abs(b1.velocity.y) < STICKY_THRESHOLD){
        b1.velocity.y = 0;
      }

    }

  }

}

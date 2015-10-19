import Body from './Body';
import Sprite from './Sprite';

/**
 * Entity
 * Base class for all game objects.
 * Holds entity position, size, speed, sprite, and supported animations.
 */
class Entity {

  /**
   * Object representing a game entity.
   * An entity has a sprite and a physics body.
   *
   */
  constructor(spriteSheet){
    this.sprite = new Sprite(spriteSheet);
    this.body   = new Body();
  }

  /**
   * Move
   * Moves the entity in the provided direction.
   * @param String direction (angle from positive x-axis in radians)
   */
  move(direction, modifier){

    // Move Entity
    this.body.inMotion = true;
    this.body.position.x += this.body.speed * modifier * Math.cos(direction);
    this.body.position.y -= this.body.speed * modifier * Math.sin(direction);
    this.body._lastMoveDirection = direction;

  }



  /**
   * Revert Move
   * Reverts the move last made using the move method. This is intended
   * to be called after the entities update method, and then only after a
   * collision has been detected in which this entity was in motion.
   */
  revertMove(modifier){
    this.body.position.x -= this.body.speed * modifier * Math.cos(this.body._lastMoveDirection);
    this.body.position.y += this.body.speed * modifier * Math.sin(this.body._lastMoveDirection);
  }

  /**
   * Update
   * Base update logic for all game entities.
   */
  update(){

    // Set entity as stationary. Will be changed if moved this update.
    this.body.inMotion = false;

  }

  /**
   * Render
   * Base render logic for all game entities.
   */
  render(context){

    let animation = this.sprite.animations[this.sprite.state];

    if(animation && this.sprite.sheet.image){
      context.drawImage(
        this.sprite.sheet.image,
        animation.steps[animation.step][0] * this.sprite.sheet.size.x,
        animation.steps[animation.step][1] * this.sprite.sheet.size.y,
        this.sprite.sheet.size.x,
        this.sprite.sheet.size.y,
        this.body.position.x,
        this.body.position.y,
        this.body.size.x,
        this.body.size.y
      );
    }else{
      context.fillRect(this.body.position.x, this.body.position.y, this.body.size.x, this.body.size.y);
    }


  }

}

export default Entity;

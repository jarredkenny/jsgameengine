import Sprite from './Sprite';
import Body   from '../physics/Body';
import Vector from '../physics/Vector';

class Entity {

  /**
   * Object representing a game entity.
   * An entity has a sprite and a physics body.
   * @param SpriteSheet
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

    this.body.applyImpulse(
      new Vector(
        Math.cos(direction),
        -Math.sin(direction)
      )
    );

  }


  /**
   * Update
   * Base update logic for all game entities.
   */
  update(){

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

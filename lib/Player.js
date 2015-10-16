import Entity from './Entity';
import Keyboard from './Keyboard';
import Animation from './Animation';

class Player extends Entity {

  /**
   * Constructor
   * Sets initial player properties.
   */
  constructor(spriteSheet){
    super(spriteSheet);
    this.body.speed    = 120;
    this.body.size     = {x: 32, y: 32};
    this.body.position = {x: 24, y: 24};
    this.body.inMotion = false;

    this.sprite.addAnimation('default', new Animation([
      [1,0]
    ], 1000));

    this.sprite.addAnimation('walk-up', new Animation([
      [1,3],
      [2,3],
      [3,3]
    ], 200));

    this.sprite.addAnimation('walk-down', new Animation([
      [0,0],
      [1,0],
      [2,0]
    ], 200));

    this.sprite.addAnimation('walk-left', new Animation([
      [0,1],
      [1,1],
      [2,1]
    ], 200));

    this.sprite.addAnimation('walk-right', new Animation([
      [0,2],
      [1,2],
      [2,2],
    ], 200));

    this.sprite.addAnimation('walk-upright', new Animation([
      [3,3],
      [4,3],
      [5,3]
    ], 200));

    this.sprite.addAnimation('walk-upleft', new Animation([
      [3,1],
      [4,1],
      [5,1]
    ], 200));

    this.sprite.addAnimation('walk-downright', new Animation([
      [3,2],
      [4,2],
      [5,2]
    ], 200));

    this.sprite.addAnimation('walk-downleft', new Animation([
      [3,0],
      [4,0],
      [5,0]
    ]), 200);

  }

  /**
   * Move
   * Updates the sprites animation before delegating the movement
   * to the parent method within the Entity class.
   * @param direction
   * @param modifier
   */
  move(direction, modifier){
    this.sprite.updateAnimation();
    super.move(direction, modifier);
  }

  /**
   * Update
   * Handles player movement.
   */
  update(modifier){
    super.update(modifier);


    // UP - RIGHT
    if(Keyboard.keyPressed(Keyboard.KEY_UP) && Keyboard.keyPressed(Keyboard.KEY_RIGHT)){
      this.move(Math.PI/4, modifier);
      this.sprite.state = "walk-upright";
    }

    // DOWN - RIGHT
    else if(Keyboard.keyPressed(Keyboard.KEY_RIGHT) && Keyboard.keyPressed(Keyboard.KEY_DOWN)){
      this.move(7*Math.PI/4, modifier);
      this.sprite.state  = "walk-downright";
    }

    // DOWN - LEFT
    else if(Keyboard.keyPressed(Keyboard.KEY_DOWN) && Keyboard.keyPressed(Keyboard.KEY_LEFT)){
      this.move(5*Math.PI/4, modifier);
      this.sprite.state = "walk-downleft";
    }

    // UP - LEFT
    else if(Keyboard.keyPressed(Keyboard.KEY_LEFT) && Keyboard.keyPressed(Keyboard.KEY_UP)){
      this.move(3*Math.PI/4, modifier);
      this.sprite.state = "walk-upleft";
    }

    // Check for single key pressed

    // UP
    else if(Keyboard.keyPressed(Keyboard.KEY_UP)){
      this.move(Math.PI/2, modifier);
      this.sprite.state = "walk-up";
    }

    // RIGHT
    else if(Keyboard.keyPressed(Keyboard.KEY_RIGHT)){
      this.move(0, modifier);
      this.sprite.state = "walk-right";
    }

    // DOWN
    else if(Keyboard.keyPressed(Keyboard.KEY_DOWN)){
      this.move(3*Math.PI/2, modifier);
      this.sprite.state = "walk-down";
    }

    // LEFT
    else if(Keyboard.keyPressed(Keyboard.KEY_LEFT)){
      this.move(Math.PI, modifier);
      this.sprite.state = "walk-left";
    }

  }

}

export default Player;

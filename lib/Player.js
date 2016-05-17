import Engine from '../engine';

const { Keyboard } = Engine;

class Player extends Engine.Entity {

  /**
   * Constructor
   * Sets initial player properties.
   */
  constructor(spriteSheet){
    super(spriteSheet);

    console.log(this);

    // Set player body properties.
    this.body.size.x = 24;
    this.body.size.y = 24;
    this.body.position.x = 0;
    this.body.position.y = 0;

    // Add animations for various player states.
    this.sprite.addAnimation('default', new Engine.Animation([
      [1,0]
    ], 1000));

    this.sprite.addAnimation('walk-up', new Engine.Animation([
      [1,3],
      [2,3],
      [3,3]
    ], 200));

    this.sprite.addAnimation('walk-down', new Engine.Animation([
      [0,0],
      [1,0],
      [2,0]
    ], 200));

    this.sprite.addAnimation('walk-left', new Engine.Animation([
      [0,1],
      [1,1],
      [2,1]
    ], 200));

    this.sprite.addAnimation('walk-right', new Engine.Animation([
      [0,2],
      [1,2],
      [2,2],
    ], 200));

    this.sprite.addAnimation('walk-upright', new Engine.Animation([
      [3,3],
      [4,3],
      [5,3]
    ], 200));

    this.sprite.addAnimation('walk-upleft', new Engine.Animation([
      [3,1],
      [4,1],
      [5,1]
    ], 200));

    this.sprite.addAnimation('walk-downright', new Engine.Animation([
      [3,2],
      [4,2],
      [5,2]
    ], 200));

    this.sprite.addAnimation('walk-downleft', new Engine.Animation([
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
    if(Keyboard.keyPressed(Keyboard.KEY.UP) && Keyboard.keyPressed(Keyboard.KEY.RIGHT)){
      this.move(Math.PI/4, modifier);
      this.sprite.state = "walk-upright";
    }

    // DOWN - RIGHT
    else if(Keyboard.keyPressed(Keyboard.KEY.RIGHT) && Keyboard.keyPressed(Keyboard.KEY.DOWN)){
      this.move(7*Math.PI/4, modifier);
      this.sprite.state  = "walk-downright";
    }

    // DOWN - LEFT
    else if(Keyboard.keyPressed(Keyboard.KEY.DOWN) && Keyboard.keyPressed(Keyboard.KEY.LEFT)){
      this.move(5*Math.PI/4, modifier);
      this.sprite.state = "walk-downleft";
    }

    // UP - LEFT
    else if(Keyboard.keyPressed(Keyboard.KEY.LEFT) && Keyboard.keyPressed(Keyboard.KEY.UP)){
      this.move(3*Math.PI/4, modifier);
      this.sprite.state = "walk-upleft";
    }

    // Check for single key pressed

    // UP
    else if(Keyboard.keyPressed(Keyboard.KEY.UP)){
      this.move(Math.PI/2, modifier);
      this.sprite.state = "walk-up";
    }

    // RIGHT
    else if(Keyboard.keyPressed(Keyboard.KEY.RIGHT)){
      this.move(0, modifier);
      this.sprite.state = "walk-right";
    }

    // DOWN
    else if(Keyboard.keyPressed(Keyboard.KEY.DOWN)){
      this.move(3*Math.PI/2, modifier);
      this.sprite.state = "walk-down";
    }

    // LEFT
    else if(Keyboard.keyPressed(Keyboard.KEY.LEFT)){
      this.move(Math.PI, modifier);
      this.sprite.state = "walk-left";
    }

  }

}

export default Player;

class Sprite {

  /**
   * Sprite
   * Sprite object containing references to a sprite sheet
   * and various animations using positions on that spritesheet.
   * @param TileSheet tileSheet
   */
  constructor(tileSheet){
    this.state      = 'default';
    this.sheet      = tileSheet;
    this.animations = {};
  }

  /**
   * Add Animation
   * Sets an amimation to the entities animations map.
   * @param String name
   * @param String animation
   */
  addAnimation(name, animation){
    this.animations[name] = animation;
  }

  /**
   * Remove Animation
   * Removes an animation from the entiies animation map by name.
   * @param String name
   */
  removeAnimation(name){
    delete this.animations[name];
  }

  /**
   * Update Animation
   * Updates the currently entity animation. Should be called after the
   * entity has moved or preformed another action which requires a step.
   */
  updateAnimation(){
    let animation = this.animations[this.state];
    if(animation && Date.now() - animation.timer > animation.duration){
      if(animation.step < animation.steps.length - 1){
        animation.step++;
      }else{
        animation.step = 0;
      }
      animation.timer = Date.now();
    }
  }

}

export default Sprite;

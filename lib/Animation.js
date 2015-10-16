class Animation {

  /**
   * Animation
   * Object representing a single animation.
   * @param TileSet tileset
   * @param Array[[0,1], ...] (tile coordinates in sheet)
   * @param Number duration (time in ms)
   */
  constructor(steps, duration){
    this.steps        = steps;
    this.duration     = duration;
    this.timer        = 0;
    this.step         = 0;
  }

}

export default Animation;

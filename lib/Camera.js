class Camera {

  /**
   * Camera
   */
  constructor(x, y, width, height, target){
    this.position = {x: x, y: y};
    this.size     = {x: width, y: height};
    this.target   = target || false;
  }

  /**
   * Update
   * Updates camera position to follow target.
   */
  update(scene){
    if(this.target){

      // Update Camera Position
      this.position.x = this.target.body.position.x - (this.size.x / 2);
      this.position.y = this.target.body.position.y - (this.size.y / 2);

      // Ensure camera remains within scene bounds.
      if(this.position.x < 0){ this.position.x = 0; }
      if(this.position.x + this.size.x > scene.renderingCanvas.width){ this.position.x = scene.renderingCanvas.width - this.size.x; }
      if(this.position.y < 0){ this.position.y = 0; }
      if(this.position.y + this.size.y > scene.renderingCanvas.height){ this.position.y = scene.renderingCanvas.height - this.size.y; }



    }
  }

  /**
   * Set Target
   * Sets the entity for the camera to follow.
   */
  setTarget(target){
    this.target = target;
  }

  /**
   * Tile is Visible
   * Checks if the provided tile is visible to the camera.
   */
  tileIsVisible(tile){
    return (
      tile.position.x + tile.size.x >= this.position.x  &&
      tile.position.x <= this.position.x + this.size.x &&
      tile.position.y + tile.size.y >= this.position.y &&
      tile.position.y <= this.position.y + this.size.y
    )
  }

}

export default Camera;

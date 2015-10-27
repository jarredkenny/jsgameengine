class Camera {

  /**
   * Camera
   */
  constructor(x, y, width, height, zoom, target){
    this.position = {x: x, y: y};
    this.size     = {x: width, y: height};
    this.zoom     = zoom;
    this.target   = target || false;
  }

  /**
   * Update
   * Updates camera position to follow target.
   */
  update(scene){
    if(this.target){

      // Update Camera Position
      this.position.x = this.target.body.position.x  - ((this.size.x / 2) * this.zoom) + ((this.target.body.size.x / 2) * this.zoom);
      this.position.y = this.target.body.position.y  - ((this.size.y / 2) * this.zoom) + ((this.target.body.size.y / 2) * this.zoom);

      // Ensure camera remains within scene bounds.
      if(this.position.x < 0){ this.position.x = 0; }
      if(this.position.x + (this.size.x * this.zoom) > scene.renderingCanvas.width){ this.position.x = scene.renderingCanvas.width - this.size.x * this.zoom; }
      if(this.position.y < 0){ this.position.y = 0; }
      if(this.position.y + (this.size.y * this.zoom) > scene.renderingCanvas.height){ this.position.y = scene.renderingCanvas.height - this.size.y * this.zoom; }

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
      tile.position.x + tile.size.x * this.zoom >= this.position.x - tile.size.x &&
      tile.position.x <= this.position.x + this.size.x * this.zoom &&
      tile.position.y + tile.size.y * this.zoom >= this.position.y  - tile.size.y &&
      tile.position.y <= this.position.y + this.size.y * this.zoom
    );
  }

}

export default Camera;

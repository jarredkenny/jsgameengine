class TileSet {

  /**
   * TileSet
   * Object representing a tile set and
   * its associated data.
   */
  constructor(firstgid, name, tileWidth, tileHeight, source){
    this.firstgid = firstgid;
    this.name = name;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.source = source;
    this.ready = false;
    this.loadImage();
  }

  /**
   * Load Image
   * Loads the tile set image and calls
   * the image loaded handler when loaded.
   */
  loadImage(){
    let image = new Image();
    image.onload = this.imageDidLoad.bind(this);
    image.src = this.source;
  }

  /**
   * Image Did Load
   * Called when the tile sets image has loaded.
   * Sets the tileset as ready to be rendered.
   */
  imageDidLoad(){
    this.ready = true;
  }

}

export default TileSet;

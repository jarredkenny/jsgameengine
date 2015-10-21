class TileSet {

  /**
   * TileSet
   * Object representing a tile set and
   * its associated data.
   */
  constructor(name, firstgid, tileWidth, tileHeight, imageSource, imageWidth, imageHeight, spacing){
    this.name         = name;
    this.firstgid     = firstgid;
    this.tileWidth    = tileWidth;
    this.tileHeight   = tileHeight;
    this.source       = `./assets/tilesets/${imageSource.split("tilesets/")[1]}`;
    this.imageWidth   = imageWidth;
    this.imageHeight  = imageHeight;
    this.spacing      = 0 || spacing;
    this.ready        = false;
    this.image        = new Image();
    this.tilesWide    = (imageWidth - ((imageWidth / tileWidth) * this.spacing)) / tileWidth;
    this.loadImage();
  }

  /**
   * Load Image
   * Loads the tile set image and calls
   * the image loaded handler when loaded.
   */
  loadImage(){
    this.image.onload = () => {
        this.ready = true;
    };
    this.image.src = this.source;
  }

}

export default TileSet;

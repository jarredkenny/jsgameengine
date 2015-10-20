class TileSet {

  /**
   * TileSet
   * Object representing a tile set and
   * its associated data.
   */
  constructor(name, firstgid, tileWidth, tileHeight, imageSource, imageWidth, imageHeight){
    this.name         = name;
    this.firstgid     = firstgid;
    this.tileWidth    = tileWidth;
    this.tileHeight   = tileHeight;
    this.source       = `./assets/tilesets/${imageSource.split("tilesets/")[1]}`;
    this.imageWidth   = imageWidth;
    this.imageHeight  = imageHeight;
    this.ready        = false;
    this.image        = new Image();
    let tileswide     = Math.floor(imageWidth / tileWidth);
    this.lastgid      = tileswide * Math.floor(imageHeight / tileHeight) + firstgid - 1;
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

class TileSet {

  /**
   * TileSet
   * Object representing a tile set and
   * its associated data.
   */
  constructor(name, firstgid, tileWidth, tileHeight, imageSource, imageWidth, imageHeight, margin, spacing, trans){

    // Tileset Properties
    this.name         = name;
    this.firstgid     = firstgid;
    this.tileWidth    = tileWidth;
    this.tileHeight   = tileHeight;
    this.source       = `./assets/tilesets/${imageSource.split("tilesets/")[1]}`;
    this.imageWidth   = imageWidth;
    this.imageHeight  = imageHeight;
    this.margin       = margin  || 0;
    this.spacing      = spacing || 0;
    this.trans        = trans   || false;

    // Tileset State
    this.ready        = false;
    this.image        = new Image();
    this.tilesWide    = (imageWidth + this.spacing) / (tileWidth + this.spacing);

    // Set up canvas to render tile set to.
    // This allows us to filter out the transparent color before rendering tiles from this set.
    this.canvas         = document.createElement('canvas');
    this.context        = this.canvas.getContext('2d');
    this.canvas.width   = imageWidth;
    this.canvas.height  = imageHeight;

    // Load the image.
    this.image.onload = this.imageDidLoad.bind(this);
    this.image.src    = this.source;

  }

  /**
   * Image Did Load
   * After the image has loaded, draws the entire tilesheet to a canvas
   * and marks the tileset as ready to be rendered.
   */
  imageDidLoad(){

    // Draw the loaded tileset to a canvas;
    this.context.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight);

    // Get the image data from the tileset canvas;
    let pixels = this.context.getImageData(0, 0, this.imageWidth, this.imageHeight);

    // Find any pixels in our image whos RGB values match our transparent color
    // Set the alpha channel on these pixels to 0 making them completely transparent.
    if(this.trans){

      // Convert the transparent color hex to rgb.
      var bigint = parseInt(this.trans, 16);
      var r = (bigint >> 16) & 255;
      var g = (bigint >> 8) & 255;
      var b = bigint & 255;

      // Set pixels with matching RGB values as transparent.
      for(let i = 0; i < pixels.data.length; i += 4){
        if(
          pixels.data[i]    === r,
          pixels.data[i+1]  === g,
          pixels.data[i+2]  === b
        ){
          pixels.data[i+3] = 0;
        }
      }
    }

    // Set the image source to the new image data (with transparent pixels)
    this.context.putImageData(pixels, 0, 0);

    // Set ready
    this.ready = true;
  }

  /**
   * Get Tile
   * Called when a tile from this tileset needs to be rendered.
   * Grabs the tile from the tilesets canvas.
   */
  getTile(sx, sy){
    return this.context.getImageData(
      (sx * this.tileWidth) + this.spacing * sx,
      (sy * this.tileHeight) + this.spacing * sy,
      this.tileWidth,
      this.tileHeight
    );
  }

}

export default TileSet;

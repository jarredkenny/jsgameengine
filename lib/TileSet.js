class TileSheet {

  /**
   * TileSheet
   * Object representing a single tile sheet.
   * @param String sheetLocation (location of file)
   * @param Number tileSizeX (pixels)
   * @param Number tileSizeY (pixels)
   */
  constructor(sheetLocation, tileSizeX, tileSizeY){
    this.location  = sheetLocation;
    this.size      = {x: tileSizeX, y: tileSizeY};
    this.loadSheet();
  }

  /**
   * Load Sheet
   * Loads the provided tile sheet and sets it as
   * the tile sheets image when it has finished loading.
   */
  loadSheet(){
    let image = new Image();
    image.src = this.location;
    image.onload = (() => {
      this.image = image;
    });
  }

}

export default TileSheet;

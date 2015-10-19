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
  }

}

export default TileSet;

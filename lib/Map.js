import Layer  from './Layer';
import Tile from './Tile';
import TileSet from './TileSet';

class Map {

  /**
   * Map
   * @param String name
   * @param String fileLocation
   */
  constructor(name, fileLocation){
    this.name       = name;
    this.width      = null;
    this.height     = null;
    this.tileWidth  = null;
    this.tileHeight = null;
    this.tilesets   = [];
    this.layers     = [];
    this.loadTMX(fileLocation);
  }

  /**
   * Load XML
   * Loads the maps tmx file and begins
   * supplies a callback to begin parsing.
   * @param String fileLocation
   */
  loadTMX(fileLocation){
    let tmx = new XMLHttpRequest();
    tmx.overrideMimeType("text/xml");
    tmx.onreadystatechange = () => {
      if(tmx.readyState === 4 && tmx.status === 200){
        this.parseMapTMX(tmx.responseXML.firstChild);
      }
    };
    tmx.open("GET", fileLocation, true);
    tmx.send();
  }

  /**
   * Parse MapTMX
   * Parse map tilesets and layers
   * from the TMX into objects.
   */
  parseMapTMX(map){

    // Parse Map Properties
    this.width      = parseInt(map.getAttribute('width'));
    this.height     = parseInt(map.getAttribute('height'));
    this.tileWidth  = parseInt(map.getAttribute('tilewidth'));
    this.tileHeight = parseInt(map.getAttribute('tileheight'));

    // Parse tilesets
    // using [].slice.call to turn HTMLCollection to an Array
    let tilesets = [].slice.call(map.getElementsByTagName('tileset'));
    tilesets.forEach((tileset) => {
      let firstgid    = parseInt(tileset.getAttribute('firstgid'));
      let tileWidth   = parseInt(tileset.getAttribute('tilewidth'));
      let tileHeight  = parseInt(tileset.getAttribute('tileheight'));
      let name        = tileset.getAttribute('name');
      let spacing     = parseInt(tileset.getAttribute('spacing'));
      let imageTag    = tileset.getElementsByTagName('image')[0];
      let imageSrc    = imageTag.getAttribute('source');
      let imageHeight = parseInt(imageTag.getAttribute('height'));
      let imageWidth  = parseInt(imageTag.getAttribute('width'));
      this.tilesets.push(new TileSet(name, firstgid, tileWidth, tileHeight, imageSrc, imageWidth, imageHeight, spacing));
    });

    // Parser layers
    // using [].slice.call to turn HTMLCollection to an Array
    let layers = [].slice.call(map.getElementsByTagName('layer'));
    layers.forEach((layer) => {
      let name      = layer.getAttribute('name');
      let width     = parseInt(layer.getAttribute('width'));
      let height    = parseInt(layer.getAttribute('height'));
      let mapTiles  = [].slice.call(layer.getElementsByTagName('data')[0].getElementsByTagName('tile'));
      let tiles     = [];
      mapTiles.forEach((tile) => {
        let gid = parseInt(tile.getAttribute('gid'));
        tiles.push(new Tile(gid));
      });
      this.layers.push(new Layer(name, width, height, tiles));
    });

    console.log(this);
  }

  /**
   * Render
   * Renders the map onto the provided context.
   */
  render(context){

    let x = 0;
    let y = 0;

    // For each layer
    this.layers.forEach((layer) => {

      // Track drawn tile
      x = 0;
      y = 0;

      // For each tile in layer
      layer.tiles.forEach((tile) => {
        if(tile.gid !== 0){

          // Get the tileshet containing this tile.
          let tileset = this.tilesets.filter((tileset) => {
            return (tile.gid >= tileset.firstgid && tile.gid <= tileset.lastgid);
          })[0];

          // Draw tile if set has been loaded.
          if(tileset && tileset.ready){

            // Calculate tile position in tilesheet based on gid
            let tx = Math.floor((tile.gid - tileset.firstgid) % (tileset.imageWidth / tileset.tileWidth));
            let ty = Math.floor((tile.gid - tileset.firstgid) / (tileset.imageWidth / tileset.tileWidth));

            context.drawImage(
              tileset.image,
              (tx * tileset.tileWidth) + (tx * tileset.spacing),
              (ty * tileset.tileHeight) + (ty * tileset.spacing),
              tileset.tileWidth,
              tileset.tileHeight,
              x * this.tileWidth,
              y * this.tileHeight,
              this.tileWidth,
              this.tileHeight
            );
          }
        }

        // Update tracked coordinates.
        x += 1;
        if(x >= this.width){
          x = 0;
          y += 1;
        }

      });
    });
  }

}

export default Map;

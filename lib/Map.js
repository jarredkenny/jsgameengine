import Layer  from './Layer';
import LayerTile from './LayerTile';
import TileSet from './TileSet';
import MapObject from './MapObject';
import MapObjectGroup from './MapObjectGroup';

class Map {

  /**
   * Map
   * @param String name
   * @param String fileLocation
   */
  constructor(name, fileLocation){
    this.name         = name;
    this.width        = null;
    this.height       = null;
    this.tileWidth    = null;
    this.tileHeight   = null;
    this.tilesets     = [];
    this.layers       = [];
    this.objectGroups = [];
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
    this.widthpx    = this.width * this.tileWidth;
    this.heightpx   = this.height * this.tileHeight;

    // Parse tilesets
    // using [].slice.call to turn HTMLCollection to an Array
    let tilesets = [].slice.call(map.getElementsByTagName('tileset'));
    tilesets.forEach((tileset) => {
      let firstgid    = parseInt(tileset.getAttribute('firstgid'));
      let tileWidth   = parseInt(tileset.getAttribute('tilewidth'));
      let tileHeight  = parseInt(tileset.getAttribute('tileheight'));
      let name        = tileset.getAttribute('name');
      let spacing     = (tileset.getAttribute('spacing')) ? parseInt(tileset.getAttribute('spacing')) : 0;
      let margin      = (tileset.getAttribute('margin')) ? parseInt(tileset.getAttribute('margin')) : 0;
      let imageTag    = tileset.getElementsByTagName('image')[0];
      let imageSrc    = imageTag.getAttribute('source');
      let imageTrans  = imageTag.getAttribute('trans') || false;
      let imageHeight = parseInt(imageTag.getAttribute('height'));
      let imageWidth  = parseInt(imageTag.getAttribute('width'));
      this.tilesets.push(new TileSet(name, firstgid, tileWidth, tileHeight, imageSrc, imageWidth, imageHeight, margin, spacing, imageTrans));
    });

    // Parse layers
    // using [].slice.call to turn HTMLCollection to an Array
    let layers = [].slice.call(map.getElementsByTagName('layer'));
    layers.forEach((layer) => {
      let name      = layer.getAttribute('name');
      let width     = parseInt(layer.getAttribute('width'));
      let height    = parseInt(layer.getAttribute('height'));
      let mapTiles  = [].slice.call(layer.getElementsByTagName('data')[0].getElementsByTagName('tile'));
      let tiles     = [];

      // Parse tiles in layer.
      mapTiles.forEach((tile) => {
        let gid = parseInt(tile.getAttribute('gid'));
        tiles.push(new LayerTile(gid, 0, 0, this.tileWidth, this.tileHeight));
      });

      this.layers.push(new Layer(name, width, height, tiles));

    });

    // Parse Object Groups
    let objectgroups = [].slice.call(map.getElementsByTagName('objectgroup'));
    objectgroups.forEach((objectgroup) => {

      // Set up Object Group
      let name  = objectgroup.getAttribute('name');
      let group = new MapObjectGroup(name);

      // Parse Objects within group and add them.
      let objects = [].slice.call(objectgroup.getElementsByTagName('object'));
      objects.forEach((object) => {
        let id        = object.getAttribute('id');
        let name      = object.getAttribute('name');
        let type      = object.getAttribute('type');
        let x         = object.getAttribute('x');
        let y         = object.getAttribute('y');
        let width     = object.getAttribute('width');
        let height    = object.getAttribute('height');
        let rotation  = object.getAttribute('rotation');
        let gid       = object.getAttribute('gid');
        let visible   = object.getAttribute('visible');
        group.addObject(new MapObject(id, name, type, x, y, width, height, rotation, gid, visible));
      });

      this.objectGroups.push(group);

    });

  }

  /**
   * Render
   * Renders the map onto the provided context.
   */
  render(context, camera){

    // Create varables for tracking the draw position within the map.
    let x = 0;
    let y = 0;

    // For each layer
    this.layers.forEach((layer) => {

      // Reset the draw position for each layer.
      x = 0;
      y = 0;

      // For each tile in layer
      layer.tiles.forEach((tile) => {
        if(tile.gid !== 0){

          // Find the tileset containing this gid.
          let tileset = null;
          this.tilesets.forEach((set) => {
            if(tile.gid > set.firstgid){
              tileset = set;
            }
          });

          // Draw tile if set has been loaded.
          if(tileset && tileset.ready){

            // Calculate tile position in tilesheet based on gid
            let sx = Math.floor((tile.gid - tileset.firstgid) % tileset.tilesWide);
            let sy = Math.floor((tile.gid - tileset.firstgid) / tileset.tilesWide);

            // Set the tiles position.
            tile.position.x = x * this.tileWidth;
            tile.position.y = y * this.tileHeight;

            // Only render tile if visible by camera.
            if(camera.tileIsVisible(tile)){
              context.drawImage(
                tileset.canvas,
                (sx * tileset.tileWidth) + tileset.spacing * sx,
                (sy * tileset.tileHeight) + tileset.spacing * sy,
                tileset.tileWidth,
                tileset.tileHeight,
                tile.position.x,
                tile.position.y,
                this.tileWidth,
                this.tileHeight
              );
            }

          }
        }

        // Update map draw position.
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

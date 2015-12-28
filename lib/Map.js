import Body           from './Body';
import Layer          from './Layer';
import LayerTile      from './LayerTile';
import TileSet        from './TileSet';
import MapObject      from './MapObject';
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
   * @param XMLElement map
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
      let name    = objectgroup.getAttribute('name');
      let visible = objectgroup.getAttribute('visible') !== '0';
      let offsetx = objectgroup.getAttribute('offsetx') ? parseInt(objectgroup.getAttribute('offsetx')) : 0;
      let offsety = objectgroup.getAttribute('offsety') ? parseInt(objectgroup.getAttribute('offsety')) : 0;
      let group   = new MapObjectGroup(name, visible, offsetx, offsety);

      // If the object group has properties defied, parse them.
      [].slice.call(objectgroup.childNodes).filter((element) => {

        // Filter so we are sure we get the immediate properties child
        // and not properties tags for individual objects in the group.
        return (element.tagName && element.tagName === "properties");
      }).forEach((properties) => {

        // Cast all properties to an array, for each pull their name and
        // value and then set themes key/value pairs in the group properties.
        [].slice.call(properties.getElementsByTagName('property')).forEach((property) => {
          let name = property.getAttribute('name');
          let value = property.getAttribute('value');
          if      (value === "true"){ value = true; }
          else if (value === "false"){ value = false; }
          else if (!isNaN(parseInt(value))){ value = parseInt(value); }
          group.setProperty(name, value);
        });
      });

      // Parse Objects within group and add them.
      let objects = [].slice.call(objectgroup.getElementsByTagName('object'));
      objects.forEach((object) => {

        // Create body for map object.
        let body = new Body();
        body.position.x = object.getAttribute('x') ? parseInt(object.getAttribute('x')) : 0;
        body.position.y = object.getAttribute('y') ? parseInt(object.getAttribute('y')) : 0;
        body.size.x     = object.getAttribute('width') ? parseInt(object.getAttribute('width')) : 32;
        body.size.y     = object.getAttribute('height') ? parseInt(object.getAttribute('height')) : 32;
        body.visible    = (object.getAttribute('visible') !== '0');
        body.rotation   = object.getAttribute('rotation') || 0;

        // Adjust body for group offset.
        body.position.x += group.offsetx;
        body.position.y += group.offsety;

        // TODO
        // Figure out why the objects position is offset by its height.
        // TMX could position objects based on their bottom left corner?!
        // For now this fixes the issue...
        body.position.y -= body.size.y;

        // Other Map Object Details
        let name      = object.getAttribute('name');
        let type      = object.getAttribute('type');
        let id        = object.getAttribute('id') ? parseInt(object.getAttribute('id')) : false;
        let gid       = object.getAttribute('gid') ? parseInt(object.getAttribute('gid')) : false;

        // Create Map Object using the parsed attributes.
        let mapObject = new MapObject(id, name, type, gid, body);

        // If this object has properties, parse them and set them on the object.
        [].slice.call(object.childNodes).filter((element) => {

          // Filter so we are sure we get the immediate properties child
          // and not properties tags for other objects.
          return (element.tagName && element.tagName === "properties");
        }).forEach((properties) => {

          // Cast all properties to an array, for each pull their name and
          // value and then set themes key/value pairs in the object properties.
          [].slice.call(properties.getElementsByTagName('property')).forEach((property) => {
            let name  = property.getAttribute('name');
            let value = property.getAttribute('value');
            if      (value === "true"){ value = true; }
            else if (value === "false"){ value = false; }
            else if (!isNaN(parseInt(value))){ value = parseInt(value); }
            mapObject.setProperty(name, value);
          });
        });

        // Add Map Object to Map Object Group
        group.addObject(mapObject);

      });

      // Map the Object Group to the map.
      this.objectGroups.push(group);

    });

    console.log(this);

  }

  /**
   * Get Tileset For GID
   * Returns the tileset containing the provided
   * GID if it exists.
   */
  getSetForGID(gid){
    let tileset;
    this.tilesets.forEach((set) => {
      if(gid > set.firstgid){
        tileset = set;
      }
    });
    return tileset;
  }

  /**
   * Get Tile Position in Tileset
   * Calculate tile position in tilesheet based on gid
   */
  getTilePositionInSet(tile, set){
    let x = Math.floor((tile.gid - set.firstgid) % set.tilesWide);
    let y = Math.floor((tile.gid - set.firstgid) / set.tilesWide);
    return {x, y};
  }

  /**
   * Render
   * Renders the map onto the provided context.
   * @param CanvasContext contet
   * @param Camera camera
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

          // Get tileset for tile GID
          let tileset = this.getSetForGID(tile.gid);

          // Draw tile if set has been loaded.
          if(tileset && tileset.ready){

            let source = this.getTilePositionInSet(tile, tileset);

            // Set the tiles position.
            tile.position.x = x * this.tileWidth;
            tile.position.y = y * this.tileHeight;

            // Only render tile if visible by camera.
            if(camera.tileIsVisible(tile)){
              context.drawImage(
                tileset.canvas,
                (source.x * tileset.tileWidth) + tileset.spacing * source.x,
                (source.y * tileset.tileHeight) + tileset.spacing * source.y,
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

    // Render Object Groups
    this.objectGroups.forEach((group) => {
      group.objects.forEach((mapobject) => {
        let tileset = this.getSetForGID(mapobject.gid);
        let source  = (tileset) ? this.getTilePositionInSet(mapobject, tileset) : undefined;
        if(source && mapobject.body.visible && group.visible && camera.bodyIsVisible(mapobject.body)){
          context.drawImage(
            tileset.canvas,
            (source.x * tileset.tileWidth) + tileset.spacing * source.x,
            (source.y * tileset.tileHeight) + tileset.spacing * source.y,
            tileset.tileWidth,
            tileset.tileHeight,
            mapobject.body.position.x,
            mapobject.body.position.y,
            mapobject.body.size.x,
            mapobject.body.size.y
          );
        }
      });
    });

  }

}

export default Map;

import TileSet from './TileSet';

class Map {

  /**
   * Map
   * @param String name
   * @param String fileLocation
   */
  constructor(name, fileLocation){
    this.name     = name;
    this.tilesets = [];
    this.loadTMX(fileLocation);
  }

  /**
   * Load XML
   * Loads the maps tmx file and begins
   * supplies a callback to begin parsing.
   * @param String fileLocation
   */
  loadTMX(fileLocation){
    console.log("LOADING TMX: ", fileLocation);
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
   * TODO: Describ this method.
   */
  parseMapTMX(map){

    // Parse tilesets
    // using [].slice.call to turn HTMLCollection to an Array
    let tilesets = [].slice.call(map.getElementsByTagName('tileset'));
    tilesets.forEach((tileset) => {
      let firstgid    = tileset.getAttribute('firstgid');
      let tileWidth   = tileset.getAttribute('tilewidth');
      let tileHeight  = tileset.getAttribute('tileheight');
      let setName     = tileset.getAttribute('name');
      let setImage    = tileset.getElementsByTagName('image');
      this.tilesets.push(new TileSet(firstgid, setName, tileWidth, tileHeight, setImage));
    });

  }

}

export default Map;

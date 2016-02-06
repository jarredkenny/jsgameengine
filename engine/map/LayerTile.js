class LayerTile {

  constructor(gid, x, y, width, height){
    this.gid      = gid;
    this.position = {x: x, y: y};
    this.size     = {x: width, y: height};
  }

}

export default LayerTile;

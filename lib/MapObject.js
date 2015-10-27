export default class MapObject {

  constructor(id, name, type, x, y, width, height, rotation, gid, visible){
    this.id       = id;
    this.name     = name;
    this.type     = type;
    this.position = {x: x, y: y};
    this.size     = {x: width, y: height};
    this.rotation = rotation || null;
    this.gid      = gid || null;
    this.visible  = visible || true;
  }

}

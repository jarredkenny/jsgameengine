export default class MapObject {

  constructor(id, name, type, gid, body){
    this.id         = id;
    this.name       = name;
    this.type       = type;
    this.gid        = gid;
    this.body       = body;
    this.properties = {};
  }

  setProperty(name, value){
    this.properties[name] = value;
  }

}

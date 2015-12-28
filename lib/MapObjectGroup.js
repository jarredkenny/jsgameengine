export default class MapObjectGroup {

  constructor(name, visible, offsetx, offsety){
    this.name       = name;
    this.objects    = [];
    this.visible    = (visible === undefined) ? true : visible;
    this.offsetx    = (offsetx === undefined) ? 0 : offsetx;
    this.offsety    = (offsety === undefined) ? 0 : offsety;
    this.properties = {};
  }

  addObject(object){
    this.objects.push(object);
  }

  setProperty(name, value){
    this.properties[name] = value;
  }

}

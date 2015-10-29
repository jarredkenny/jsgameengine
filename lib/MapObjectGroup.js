export default class MapObjectGroup {

  constructor(name){
    this.name       = name;
    this.objects    = [];
    this.properties = {};
  }

  addObject(object){
    this.objects.push(object);
  }

  setProperty(name, value){
    this.properties[name] = value;
  }

}

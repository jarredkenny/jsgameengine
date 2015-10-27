export default class MapObjectGroup {

  constructor(name){
    this.name = name;
    this.objects = [];
  }

  addObject(object){
    this.objects.push(object);
  }

}

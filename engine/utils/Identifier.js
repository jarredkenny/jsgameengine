let id = 0;

export default class Identifier {

  /**
   * Returns the next unused identifier.
   */
  static next(){
    return id++;
  }

}

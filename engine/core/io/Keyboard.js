/**
 * Keyboard Wrapper Class
 * Tracks keyboard keys and maps events to input.
 */

let Keyboard = {

  /**
   * Key Code Constants
   */
  KEY: {
    UP:       87,
    DOWN:     83,
    LEFT:     65,
    RIGHT:    68,
    ZOOMIN:   187,
    ZOOMOUT:  189
  },

  /**
   * Object containing the currently pressed keys.
   */
  keys: {},

  /**
   * Register Key Listeners
   * Binds handlers to the windows keydown
   * and keyup events so that keys may be tracked.
   */
  registerKeyListeners(){
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  },

  /**
   * On Key Down
   * Sets key from event as active in keys.
   */
  onKeyDown(event){
    this.keys[event.keyCode] = true;
  },

  /**
   * On Key Up
   * Removes key from event from keys object.
   */
  onKeyUp(event){
    delete this.keys[event.keyCode];
  },

  /**
   * Key Pressed
   * Checks if the provided key is currently pressed.
   */
  keyPressed(key){
    return (this.keys[key] === true);
  }

};

Keyboard.registerKeyListeners();

export default Keyboard;

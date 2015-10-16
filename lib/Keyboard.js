/**
 * Keyboard Wrapper Class
 * Tracks keyboard keys and maps events to input.
 */

let Keyboard = {

    KEY_UP:     87,
    KEY_DOWN:   83,
    KEY_LEFT:   65,
    KEY_RIGHT:  68,

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

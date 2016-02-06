import Keyboard from '../core/io/Keyboard';
export default class Debugger {

  constructor(game){
    this.game = game;
  }

  draw(context){

    // Draw background
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // Set font and color
    context.font = "14px Arial";
    context.fillStyle = "white";

    // Draw camera details
    let camera  = this.game.sceneManager.getCurrentScene().camera;
    let x       = camera.position.x.toFixed(1);
    let y       = camera.position.y.toFixed(1);
    let w       = camera.size.x;
    let h       = camera.size.y;
    let z       = (camera.zoom * 100).toFixed(0);
    context.fillText('Camera', 12, 24);
    context.fillText(`x: ${x}`, 12, 44);
    context.fillText(`y: ${y}`, 68, 44);
    context.fillText(`w: ${w}`, 12, 66);
    context.fillText(`h: ${h}`, 68, 66);
    context.fillText(`zoom: ${z}`, 12, 86);

    // Draw Keyboard keys
    context.fillText('Keys:', 12, 112);
    context.fillText(Object.keys(Keyboard.keys).join(', '), 12, 132);

  }

}

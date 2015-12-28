/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Driver = __webpack_require__(1);

	var _Driver2 = _interopRequireDefault(_Driver);

	new _Driver2['default']().start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Game = __webpack_require__(2);

	var _Game2 = _interopRequireDefault(_Game);

	var Driver = (function () {
	  function Driver() {
	    _classCallCheck(this, Driver);
	  }

	  _createClass(Driver, [{
	    key: 'start',

	    /**
	     * Start
	     * Creates a canvas. Sizes it to match the availible screen size.
	     * Inserts the canvas into the dom and initializes the game on it.
	     */
	    value: function start() {

	      // Create game canvas and add to dom.
	      var canvas = document.createElement('canvas');
	      document.body.appendChild(canvas);

	      // Set game canvas size.
	      canvas.height = 320;
	      canvas.width = 480;

	      // Create debug canvas and append to dom.
	      var debugCanvas = document.createElement('canvas');
	      document.body.appendChild(debugCanvas);

	      // Set debug canvas size
	      debugCanvas.height = 200;
	      debugCanvas.width = canvas.width;

	      // Initialize game on canvas.
	      var game = new _Game2['default'](canvas, debugCanvas);

	      // Start the game.
	      game.start();
	    }
	  }]);

	  return Driver;
	})();

	exports['default'] = Driver;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Player = __webpack_require__(3);

	var _Player2 = _interopRequireDefault(_Player);

	var _Scene = __webpack_require__(9);

	var _Scene2 = _interopRequireDefault(_Scene);

	var _SceneManager = __webpack_require__(11);

	var _SceneManager2 = _interopRequireDefault(_SceneManager);

	var _SpriteSheet = __webpack_require__(12);

	var _SpriteSheet2 = _interopRequireDefault(_SpriteSheet);

	var _Map = __webpack_require__(13);

	var _Map2 = _interopRequireDefault(_Map);

	var _Camera = __webpack_require__(19);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _Debugger = __webpack_require__(20);

	var _Debugger2 = _interopRequireDefault(_Debugger);

	var Game = (function () {

	  /**
	   * Constructor
	   * Initialize basic game components
	   * then start the main game loop.
	   */

	  function Game(canvas, debugCanvas) {
	    _classCallCheck(this, Game);

	    // Use the supplied canvas as our rendering canvas.
	    this.renderingCanvas = canvas;
	    this.renderingContext = canvas.getContext('2d');

	    // Initialize scene manager.
	    this.sceneManager = new _SceneManager2['default']();

	    // If a debugger canvas was provided. Set it up
	    this.debugCanvas = debugCanvas || null;
	    if (this.debugCanvas) {
	      this['debugger'] = new _Debugger2['default'](this);
	    }
	  }

	  /**
	   * Start
	   * Begins running the game.
	   */

	  _createClass(Game, [{
	    key: 'start',
	    value: function start() {
	      this.boot();
	      this.animate();
	    }

	    /**
	     * Setup
	     * Sets up a scene for testing. This will be moved into some kind of
	     * level registration API that will work with the scene manager.
	     */
	  }, {
	    key: 'boot',
	    value: function boot() {

	      // Create Player Entity
	      var playerSheet = new _SpriteSheet2['default']('/assets/spritesheets/player.jpg', 32, 32);
	      var player = new _Player2['default'](playerSheet);

	      // Create scene and add player
	      var scene = new _Scene2['default']();
	      scene.addEntity(player);

	      // Create map and add to scene.
	      var map = new _Map2['default']('test', 'assets/maps/test.tmx');
	      scene.setMap(map);

	      // Set up scene camera and set on scene.
	      var camera = new _Camera2['default'](0, 0, this.renderingCanvas.width, this.renderingCanvas.height, 70, player);
	      scene.setCamera(camera);

	      // Add scene to scene manager.
	      this.sceneManager.addScene('main', scene);

	      // Play the scene.
	      this.sceneManager.play('main');
	    }

	    /**
	     * Animate
	     * Uses the browsers requestAnimationFrame API to call itself and
	     * the games main loop everytime an animation frame is availible.
	     */
	  }, {
	    key: 'animate',
	    value: function animate() {
	      window.requestAnimationFrame(this.animate.bind(this));
	      this.loop();
	    }

	    /**
	     * Loop
	     * Main game loop. Calls the update and render chains
	     * aswell as tracks time since last loop for smooth updates.
	     */
	  }, {
	    key: 'loop',
	    value: function loop() {
	      var now = Date.now();
	      var modifier = (now - this.lastFrameTime) / 1000;
	      this.update(modifier);
	      this.render();
	      this.lastFrameTime = now;
	    }

	    /**
	     * Update
	     * Initial call in the update chain. Delegates
	     * updates to the scene mananager.
	     */
	  }, {
	    key: 'update',
	    value: function update(modifier) {
	      this.sceneManager.getCurrentScene().update(modifier);
	    }

	    /**
	     * Render
	     * Initial call in the render chain. Delegates
	     * renders to the scene manager.
	     */
	  }, {
	    key: 'render',
	    value: function render() {
	      this.renderingContext.fillRect(0, 0, this.renderingCanvas.width, this.renderingCanvas.height);
	      this.sceneManager.getCurrentScene().render(this.renderingContext);
	      this['debugger'].draw(this.debugCanvas.getContext('2d'));
	    }
	  }]);

	  return Game;
	})();

	exports['default'] = Game;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _Entity2 = __webpack_require__(4);

	var _Entity3 = _interopRequireDefault(_Entity2);

	var _Keyboard = __webpack_require__(7);

	var _Keyboard2 = _interopRequireDefault(_Keyboard);

	var _Animation = __webpack_require__(8);

	var _Animation2 = _interopRequireDefault(_Animation);

	var Player = (function (_Entity) {
	  _inherits(Player, _Entity);

	  /**
	   * Constructor
	   * Sets initial player properties.
	   */

	  function Player(spriteSheet) {
	    _classCallCheck(this, Player);

	    _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, spriteSheet);

	    // Set player body properties.
	    this.body.speed = 120;
	    this.body.size = { x: 24, y: 24 };
	    this.body.position = { x: 24, y: 24 };
	    this.body.inMotion = false;

	    // Add animations for various player states.
	    this.sprite.addAnimation('default', new _Animation2['default']([[1, 0]], 1000));

	    this.sprite.addAnimation('walk-up', new _Animation2['default']([[1, 3], [2, 3], [3, 3]], 200));

	    this.sprite.addAnimation('walk-down', new _Animation2['default']([[0, 0], [1, 0], [2, 0]], 200));

	    this.sprite.addAnimation('walk-left', new _Animation2['default']([[0, 1], [1, 1], [2, 1]], 200));

	    this.sprite.addAnimation('walk-right', new _Animation2['default']([[0, 2], [1, 2], [2, 2]], 200));

	    this.sprite.addAnimation('walk-upright', new _Animation2['default']([[3, 3], [4, 3], [5, 3]], 200));

	    this.sprite.addAnimation('walk-upleft', new _Animation2['default']([[3, 1], [4, 1], [5, 1]], 200));

	    this.sprite.addAnimation('walk-downright', new _Animation2['default']([[3, 2], [4, 2], [5, 2]], 200));

	    this.sprite.addAnimation('walk-downleft', new _Animation2['default']([[3, 0], [4, 0], [5, 0]]), 200);
	  }

	  /**
	   * Move
	   * Updates the sprites animation before delegating the movement
	   * to the parent method within the Entity class.
	   * @param direction
	   * @param modifier
	   */

	  _createClass(Player, [{
	    key: 'move',
	    value: function move(direction, modifier) {
	      this.sprite.updateAnimation();
	      _get(Object.getPrototypeOf(Player.prototype), 'move', this).call(this, direction, modifier);
	    }

	    /**
	     * Update
	     * Handles player movement.
	     */
	  }, {
	    key: 'update',
	    value: function update(modifier) {
	      _get(Object.getPrototypeOf(Player.prototype), 'update', this).call(this, modifier);

	      // UP - RIGHT
	      if (_Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_UP) && _Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_RIGHT)) {
	        this.move(Math.PI / 4, modifier);
	        this.sprite.state = "walk-upright";
	      }

	      // DOWN - RIGHT
	      else if (_Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_RIGHT) && _Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_DOWN)) {
	          this.move(7 * Math.PI / 4, modifier);
	          this.sprite.state = "walk-downright";
	        }

	        // DOWN - LEFT
	        else if (_Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_DOWN) && _Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_LEFT)) {
	            this.move(5 * Math.PI / 4, modifier);
	            this.sprite.state = "walk-downleft";
	          }

	          // UP - LEFT
	          else if (_Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_LEFT) && _Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_UP)) {
	              this.move(3 * Math.PI / 4, modifier);
	              this.sprite.state = "walk-upleft";
	            }

	            // Check for single key pressed

	            // UP
	            else if (_Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_UP)) {
	                this.move(Math.PI / 2, modifier);
	                this.sprite.state = "walk-up";
	              }

	              // RIGHT
	              else if (_Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_RIGHT)) {
	                  this.move(0, modifier);
	                  this.sprite.state = "walk-right";
	                }

	                // DOWN
	                else if (_Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_DOWN)) {
	                    this.move(3 * Math.PI / 2, modifier);
	                    this.sprite.state = "walk-down";
	                  }

	                  // LEFT
	                  else if (_Keyboard2['default'].keyPressed(_Keyboard2['default'].KEY_LEFT)) {
	                      this.move(Math.PI, modifier);
	                      this.sprite.state = "walk-left";
	                    }
	    }
	  }]);

	  return Player;
	})(_Entity3['default']);

	exports['default'] = Player;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Body = __webpack_require__(5);

	var _Body2 = _interopRequireDefault(_Body);

	var _Sprite = __webpack_require__(6);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	/**
	 * Entity
	 * Base class for all game objects.
	 * Holds entity position, size, speed, sprite, and supported animations.
	 */

	var Entity = (function () {

	  /**
	   * Object representing a game entity.
	   * An entity has a sprite and a physics body.
	   * @param SpriteSheet
	   */

	  function Entity(spriteSheet) {
	    _classCallCheck(this, Entity);

	    this.sprite = new _Sprite2['default'](spriteSheet);
	    this.body = new _Body2['default']();
	  }

	  /**
	   * Move
	   * Moves the entity in the provided direction.
	   * @param String direction (angle from positive x-axis in radians)
	   */

	  _createClass(Entity, [{
	    key: 'move',
	    value: function move(direction, modifier) {

	      // Move Entity
	      this.body.inMotion = true;
	      this.body.position.x += this.body.speed * modifier * Math.cos(direction);
	      this.body.position.y -= this.body.speed * modifier * Math.sin(direction);
	      this.body._lastMoveDirection = direction;
	    }

	    /**
	     * Revert Move
	     * Reverts the move last made using the move method. This is intended
	     * to be called after the entities update method, and then only after a
	     * collision has been detected in which this entity was in motion.
	     */
	  }, {
	    key: 'revertMove',
	    value: function revertMove(modifier) {
	      this.body.position.x -= this.body.speed * modifier * Math.cos(this.body._lastMoveDirection);
	      this.body.position.y += this.body.speed * modifier * Math.sin(this.body._lastMoveDirection);
	    }

	    /**
	     * Update
	     * Base update logic for all game entities.
	     */
	  }, {
	    key: 'update',
	    value: function update() {

	      // Set entity as stationary. Will be changed if moved this update.
	      this.body.inMotion = false;
	    }

	    /**
	     * Render
	     * Base render logic for all game entities.
	     */
	  }, {
	    key: 'render',
	    value: function render(context) {

	      var animation = this.sprite.animations[this.sprite.state];

	      if (animation && this.sprite.sheet.image) {
	        context.drawImage(this.sprite.sheet.image, animation.steps[animation.step][0] * this.sprite.sheet.size.x, animation.steps[animation.step][1] * this.sprite.sheet.size.y, this.sprite.sheet.size.x, this.sprite.sheet.size.y, this.body.position.x, this.body.position.y, this.body.size.x, this.body.size.y);
	      } else {
	        context.fillRect(this.body.position.x, this.body.position.y, this.body.size.x, this.body.size.y);
	      }
	    }
	  }]);

	  return Entity;
	})();

	exports['default'] = Entity;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Body =

	/**
	 * Object representing a 2D game body.
	 */
	function Body() {
	  _classCallCheck(this, Body);

	  // Basic Position and Size
	  this.position = { x: 0, y: 0 };
	  this.size = { x: 0, y: 0 };
	  this.speed = 0;
	  this.inMotion = false;
	};

	exports["default"] = Body;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Sprite = (function () {

	  /**
	   * Sprite
	   * Sprite object containing references to a sprite sheet
	   * and various animations using positions on that spritesheet.
	   * @param TileSheet tileSheet
	   */

	  function Sprite(tileSheet) {
	    _classCallCheck(this, Sprite);

	    this.state = 'default';
	    this.sheet = tileSheet;
	    this.animations = {};
	  }

	  /**
	   * Add Animation
	   * Sets an amimation to the entities animations map.
	   * @param String name
	   * @param String animation
	   */

	  _createClass(Sprite, [{
	    key: 'addAnimation',
	    value: function addAnimation(name, animation) {
	      this.animations[name] = animation;
	    }

	    /**
	     * Remove Animation
	     * Removes an animation from the entiies animation map by name.
	     * @param String name
	     */
	  }, {
	    key: 'removeAnimation',
	    value: function removeAnimation(name) {
	      delete this.animations[name];
	    }

	    /**
	     * Update Animation
	     * Updates the currently entity animation. Should be called after the
	     * entity has moved or preformed another action which requires a step.
	     */
	  }, {
	    key: 'updateAnimation',
	    value: function updateAnimation() {
	      var animation = this.animations[this.state];
	      if (animation && Date.now() - animation.timer > animation.duration) {
	        if (animation.step < animation.steps.length - 1) {
	          animation.step++;
	        } else {
	          animation.step = 0;
	        }
	        animation.timer = Date.now();
	      }
	    }
	  }]);

	  return Sprite;
	})();

	exports['default'] = Sprite;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Keyboard Wrapper Class
	 * Tracks keyboard keys and maps events to input.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var Keyboard = {

	  /**
	   * Key Code Constants
	   */
	  KEY_UP: 87,
	  KEY_DOWN: 83,
	  KEY_LEFT: 65,
	  KEY_RIGHT: 68,

	  /**
	   * Object containing the currently pressed keys.
	   */
	  keys: {},

	  /**
	   * Register Key Listeners
	   * Binds handlers to the windows keydown
	   * and keyup events so that keys may be tracked.
	   */
	  registerKeyListeners: function registerKeyListeners() {
	    window.addEventListener('keyup', this.onKeyUp.bind(this));
	    window.addEventListener('keydown', this.onKeyDown.bind(this));
	  },

	  /**
	   * On Key Down
	   * Sets key from event as active in keys.
	   */
	  onKeyDown: function onKeyDown(event) {
	    this.keys[event.keyCode] = true;
	  },

	  /**
	   * On Key Up
	   * Removes key from event from keys object.
	   */
	  onKeyUp: function onKeyUp(event) {
	    delete this.keys[event.keyCode];
	  },

	  /**
	   * Key Pressed
	   * Checks if the provided key is currently pressed.
	   */
	  keyPressed: function keyPressed(key) {
	    return this.keys[key] === true;
	  }

	};

	Keyboard.registerKeyListeners();

	exports['default'] = Keyboard;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Animation =

	/**
	 * Animation
	 * Object representing a single animation.
	 * @param Spritesheet Spritesheet
	 * @param Array[[0,1], ...] (tile coordinates in sheet)
	 * @param Number duration (time in ms)
	 */
	function Animation(steps, duration) {
	  _classCallCheck(this, Animation);

	  this.steps = steps;
	  this.duration = duration;
	  this.timer = 0;
	  this.step = 0;
	};

	exports["default"] = Animation;
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Collision = __webpack_require__(10);

	var _Collision2 = _interopRequireDefault(_Collision);

	/**
	 * Scene
	 * A Scene is a wrapper object which contains a Map and an array
	 * of game objects. The scene handles updating and rendering the map
	 * and objects when its respective methods are called.
	 */

	var Scene = (function () {
	  function Scene() {
	    _classCallCheck(this, Scene);

	    // Scene Rendering Target
	    this.renderingCanvas = document.createElement('canvas');
	    this.renderingContext = this.renderingCanvas.getContext('2d');

	    // Map
	    this.map = null;

	    // Entities
	    this.entities = [];

	    // Camera
	    this.camera = null;
	  }

	  /**
	   * Add Object
	   * Adds an object to the scene.
	   */

	  _createClass(Scene, [{
	    key: 'addEntity',
	    value: function addEntity(entity) {
	      this.entities.push(entity);
	    }

	    /**
	     * Set Map
	     * Sets the scenes map.
	     */
	  }, {
	    key: 'setMap',
	    value: function setMap(map) {
	      this.map = map;
	    }

	    /**
	     * Set Camera
	     * Sets the camera to use when rendering the scene.
	     */
	  }, {
	    key: 'setCamera',
	    value: function setCamera(camera) {
	      this.camera = camera;
	    }

	    /**
	     * Resize Scene to Map
	     * Sets the scene redering canvas dimensions
	     * to match the current maps dimensions.
	     */
	  }, {
	    key: 'resizeSceneToMap',
	    value: function resizeSceneToMap(map) {
	      this.renderingCanvas.width = map.width * map.tileWidth;
	      this.renderingCanvas.height = map.height * map.tileHeight;
	    }

	    /**
	     * Update
	     * Updates all objects in scene.
	     */
	  }, {
	    key: 'update',
	    value: function update(modifier) {
	      var _this = this;

	      // Ensure the rendering target size matches the map size.
	      this.resizeSceneToMap(this.map);

	      // Update Each Entity
	      this.entities.forEach(function (entity) {
	        entity.update(modifier);
	      });

	      // Check for map edge collisions
	      this.entities.forEach(function (entity) {
	        if (entity.body.position.x < 0) {
	          entity.body.position.x = 0;
	        }
	        if (entity.body.position.x + entity.body.size.x > _this.map.widthpx) {
	          entity.body.position.x = _this.map.widthpx - entity.body.size.x;
	        }
	        if (entity.body.position.y < 0) {
	          entity.body.position.y = 0;
	        }
	        if (entity.body.position.y + entity.body.size.y > _this.map.heightpx) {
	          entity.body.position.y = _this.map.heightpx - entity.body.size.x;
	        }
	      });

	      // Check for Entity on Entity collisions between entities in motion and all other entities.
	      this.entities.forEach(function (e1) {
	        _this.entities.forEach(function (e2) {
	          if (e1 !== e2 && e1.body.inMotion && _Collision2['default'].entityOnEntity(e1, e2)) {
	            e1.revertMove(modifier);
	          }
	        });
	      });

	      // Update the scene camera
	      this.camera.update(this);
	    }

	    /**
	     * Render
	     * Renders all of the map and all entities
	     * within view of the scenes camera.
	     */
	  }, {
	    key: 'render',
	    value: function render(context) {
	      var _this2 = this;

	      // If the scene has a map. Render visible map to the scene.
	      if (this.map) {
	        this.map.render(this.renderingContext, this.camera);
	      }

	      // Render all scene entities.
	      this.entities.forEach(function (entity) {
	        entity.render(_this2.renderingContext);
	      });

	      context.drawImage(this.renderingCanvas, this.camera.position.x, this.camera.position.y, this.camera.size.x * this.camera.zoom, this.camera.size.y * this.camera.zoom, 0, 0, context.canvas.width, context.canvas.height);
	    }
	  }]);

	  return Scene;
	})();

	exports['default'] = Scene;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Collision = (function () {
	  function Collision() {
	    _classCallCheck(this, Collision);
	  }

	  _createClass(Collision, null, [{
	    key: "entityOnEntity",

	    /**
	     * Entity On Entity
	     * Checks for collisions between two entities.
	     * @param Entity e1
	     * @param Entity e2
	     * @return Boolean isColliding
	     */
	    value: function entityOnEntity(e1, e2) {
	      return e1.body.position.x + e1.body.size.x > e2.body.position.x && e1.body.position.x < e2.body.position.x + e2.body.size.x && e1.body.position.y + e1.body.size.y > e2.body.position.y && e1.body.position.y < e2.body.position.y + e2.body.size.y;
	    }
	  }]);

	  return Collision;
	})();

	exports["default"] = Collision;
	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Scene Manager
	 * Manages multiple scenes and controls which one
	 * is currently being played.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SceneManager = (function () {
	  function SceneManager() {
	    _classCallCheck(this, SceneManager);

	    // Set up object to store all scenes.
	    this.scenes = {};

	    // Pointer to current scene.
	    this.current = null;
	  }

	  /**
	   * Add Scene
	   * Adds a scene to the scene object.
	   */

	  _createClass(SceneManager, [{
	    key: "addScene",
	    value: function addScene(name, scene) {
	      this.scenes[name] = scene;
	    }

	    /**
	     * Remove Scene
	     * Removes a scene from the scenes object by name.
	     */
	  }, {
	    key: "removeScene",
	    value: function removeScene(name) {
	      delete this.scenes[name];
	    }

	    /**
	     * Get Current Scene
	     * Returns the currently playing scene.
	     */
	  }, {
	    key: "getCurrentScene",
	    value: function getCurrentScene() {
	      return this.current;
	    }

	    /**
	     * Play
	     * Plays a scene by name.
	     */
	  }, {
	    key: "play",
	    value: function play(name) {

	      // Ensure scene exists.
	      if (!this.scenes[name]) {
	        throw new Error("SceneManager: No scene registered with name '" + name + "'");
	      }

	      // Set current pointer to the scene.
	      this.current = this.scenes[name];
	    }
	  }]);

	  return SceneManager;
	})();

	exports["default"] = SceneManager;
	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TileSheet = (function () {

	  /**
	   * TileSheet
	   * Object representing a single tile sheet.
	   * @param String sheetLocation (location of file)
	   * @param Number tileSizeX (pixels)
	   * @param Number tileSizeY (pixels)
	   */

	  function TileSheet(sheetLocation, tileSizeX, tileSizeY) {
	    _classCallCheck(this, TileSheet);

	    this.location = sheetLocation;
	    this.size = { x: tileSizeX, y: tileSizeY };
	    this.loadSheet();
	  }

	  /**
	   * Load Sheet
	   * Loads the provided tile sheet and sets it as
	   * the tile sheets image when it has finished loading.
	   */

	  _createClass(TileSheet, [{
	    key: "loadSheet",
	    value: function loadSheet() {
	      var _this = this;

	      var image = new Image();
	      image.src = this.location;
	      image.onload = function () {
	        _this.image = image;
	      };
	    }
	  }]);

	  return TileSheet;
	})();

	exports["default"] = TileSheet;
	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Layer = __webpack_require__(14);

	var _Layer2 = _interopRequireDefault(_Layer);

	var _LayerTile = __webpack_require__(15);

	var _LayerTile2 = _interopRequireDefault(_LayerTile);

	var _TileSet = __webpack_require__(16);

	var _TileSet2 = _interopRequireDefault(_TileSet);

	var _MapObject = __webpack_require__(17);

	var _MapObject2 = _interopRequireDefault(_MapObject);

	var _MapObjectGroup = __webpack_require__(18);

	var _MapObjectGroup2 = _interopRequireDefault(_MapObjectGroup);

	var Map = (function () {

	  /**
	   * Map
	   * @param String name
	   * @param String fileLocation
	   */

	  function Map(name, fileLocation) {
	    _classCallCheck(this, Map);

	    this.name = name;
	    this.width = null;
	    this.height = null;
	    this.tileWidth = null;
	    this.tileHeight = null;
	    this.tilesets = [];
	    this.layers = [];
	    this.objectGroups = [];
	    this.loadTMX(fileLocation);
	  }

	  /**
	   * Load XML
	   * Loads the maps tmx file and begins
	   * supplies a callback to begin parsing.
	   * @param String fileLocation
	   */

	  _createClass(Map, [{
	    key: 'loadTMX',
	    value: function loadTMX(fileLocation) {
	      var _this = this;

	      var tmx = new XMLHttpRequest();
	      tmx.overrideMimeType("text/xml");
	      tmx.onreadystatechange = function () {
	        if (tmx.readyState === 4 && tmx.status === 200) {
	          _this.parseMapTMX(tmx.responseXML.firstChild);
	        }
	      };
	      tmx.open("GET", fileLocation, true);
	      tmx.send();
	    }

	    /**
	     * Parse MapTMX
	     * Parse map tilesets and layers
	     * from the TMX into objects.
	     * @param XMLElement map
	     */
	  }, {
	    key: 'parseMapTMX',
	    value: function parseMapTMX(map) {
	      var _this2 = this;

	      // Parse Map Properties
	      this.width = parseInt(map.getAttribute('width'));
	      this.height = parseInt(map.getAttribute('height'));
	      this.tileWidth = parseInt(map.getAttribute('tilewidth'));
	      this.tileHeight = parseInt(map.getAttribute('tileheight'));
	      this.widthpx = this.width * this.tileWidth;
	      this.heightpx = this.height * this.tileHeight;

	      // Parse tilesets
	      // using [].slice.call to turn HTMLCollection to an Array
	      var tilesets = [].slice.call(map.getElementsByTagName('tileset'));
	      tilesets.forEach(function (tileset) {
	        var firstgid = parseInt(tileset.getAttribute('firstgid'));
	        var tileWidth = parseInt(tileset.getAttribute('tilewidth'));
	        var tileHeight = parseInt(tileset.getAttribute('tileheight'));
	        var name = tileset.getAttribute('name');
	        var spacing = tileset.getAttribute('spacing') ? parseInt(tileset.getAttribute('spacing')) : 0;
	        var margin = tileset.getAttribute('margin') ? parseInt(tileset.getAttribute('margin')) : 0;
	        var imageTag = tileset.getElementsByTagName('image')[0];
	        var imageSrc = imageTag.getAttribute('source');
	        var imageTrans = imageTag.getAttribute('trans') || false;
	        var imageHeight = parseInt(imageTag.getAttribute('height'));
	        var imageWidth = parseInt(imageTag.getAttribute('width'));
	        _this2.tilesets.push(new _TileSet2['default'](name, firstgid, tileWidth, tileHeight, imageSrc, imageWidth, imageHeight, margin, spacing, imageTrans));
	      });

	      // Parse layers
	      // using [].slice.call to turn HTMLCollection to an Array
	      var layers = [].slice.call(map.getElementsByTagName('layer'));
	      layers.forEach(function (layer) {
	        var name = layer.getAttribute('name');
	        var width = parseInt(layer.getAttribute('width'));
	        var height = parseInt(layer.getAttribute('height'));
	        var mapTiles = [].slice.call(layer.getElementsByTagName('data')[0].getElementsByTagName('tile'));
	        var tiles = [];

	        // Parse tiles in layer.
	        mapTiles.forEach(function (tile) {
	          var gid = parseInt(tile.getAttribute('gid'));
	          tiles.push(new _LayerTile2['default'](gid, 0, 0, _this2.tileWidth, _this2.tileHeight));
	        });

	        _this2.layers.push(new _Layer2['default'](name, width, height, tiles));
	      });

	      // Parse Object Groups
	      var objectgroups = [].slice.call(map.getElementsByTagName('objectgroup'));
	      objectgroups.forEach(function (objectgroup) {

	        // Set up Object Group
	        var name = objectgroup.getAttribute('name');
	        var group = new _MapObjectGroup2['default'](name);

	        // If the object group has properties defied, parse them.
	        [].slice.call(objectgroup.childNodes).filter(function (element) {

	          // Filter so we are sure we get the immediate properties child
	          // and not properties tags for individual objects in the group.
	          return element.tagName && element.tagName === "properties";
	        }).forEach(function (properties) {

	          // Cast all properties to an array, for each pull their name and
	          // value and then set themes key/value pairs in the group properties.
	          [].slice.call(properties.getElementsByTagName('property')).forEach(function (property) {
	            var name = property.getAttribute('name');
	            var value = property.getAttribute('value');
	            group.setProperty(name, value);
	          });
	        });

	        // Parse Objects within group and add them.
	        var objects = [].slice.call(objectgroup.getElementsByTagName('object'));
	        objects.forEach(function (object) {
	          var id = object.getAttribute('id');
	          var name = object.getAttribute('name');
	          var type = object.getAttribute('type');
	          var x = object.getAttribute('x');
	          var y = object.getAttribute('y');
	          var width = object.getAttribute('width');
	          var height = object.getAttribute('height');
	          var rotation = object.getAttribute('rotation');
	          var gid = object.getAttribute('gid');
	          var visible = object.getAttribute('visible');

	          // Create Map Object using the parsed attributes.
	          var mapObject = new _MapObject2['default'](id, name, type, x, y, width, height, rotation, gid, visible);

	          // If this object has properties, parse them and set them on the object.
	          [].slice.call(object.childNodes).filter(function (element) {

	            // Filter so we are sure we get the immediate properties child
	            // and not properties tags for other objects.
	            return element.tagName && element.tagName === "properties";
	          }).forEach(function (properties) {

	            // Cast all properties to an array, for each pull their name and
	            // value and then set themes key/value pairs in the object properties.
	            [].slice.call(properties.getElementsByTagName('property')).forEach(function (property) {
	              var name = property.getAttribute('name');
	              var value = property.getAttribute('value');
	              mapObject.setProperty(name, value);
	            });
	          });

	          // Add Map Object to Map Object Group
	          group.addObject(mapObject);
	        });

	        // Map the Object Group to the map.
	        _this2.objectGroups.push(group);
	      });
	    }

	    /**
	     * Render
	     * Renders the map onto the provided context.
	     * @param CanvasContext contet
	     * @param Camera camera
	     */
	  }, {
	    key: 'render',
	    value: function render(context, camera) {
	      var _this3 = this;

	      // Create varables for tracking the draw position within the map.
	      var x = 0;
	      var y = 0;

	      // For each layer
	      this.layers.forEach(function (layer) {

	        // Reset the draw position for each layer.
	        x = 0;
	        y = 0;

	        // For each tile in layer
	        layer.tiles.forEach(function (tile) {
	          if (tile.gid !== 0) {

	            // Find the tileset containing this gid.
	            var tileset = null;
	            _this3.tilesets.forEach(function (set) {
	              if (tile.gid > set.firstgid) {
	                tileset = set;
	              }
	            });

	            // Draw tile if set has been loaded.
	            if (tileset && tileset.ready) {

	              // Calculate tile position in tilesheet based on gid
	              var sx = Math.floor((tile.gid - tileset.firstgid) % tileset.tilesWide);
	              var sy = Math.floor((tile.gid - tileset.firstgid) / tileset.tilesWide);

	              // Set the tiles position.
	              tile.position.x = x * _this3.tileWidth;
	              tile.position.y = y * _this3.tileHeight;

	              // Only render tile if visible by camera.
	              if (camera.tileIsVisible(tile)) {
	                context.drawImage(tileset.canvas, sx * tileset.tileWidth + tileset.spacing * sx, sy * tileset.tileHeight + tileset.spacing * sy, tileset.tileWidth, tileset.tileHeight, tile.position.x, tile.position.y, _this3.tileWidth, _this3.tileHeight);
	              }
	            }
	          }

	          // Update map draw position.
	          x += 1;
	          if (x >= _this3.width) {
	            x = 0;
	            y += 1;
	          }
	        });
	      });
	    }
	  }]);

	  return Map;
	})();

	exports['default'] = Map;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Layer = function Layer(name, width, height, tiles) {
	  _classCallCheck(this, Layer);

	  this.name = name;
	  this.width = width;
	  this.height = height;
	  this.tiles = tiles;
	};

	exports["default"] = Layer;
	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LayerTile = function LayerTile(gid, x, y, width, height) {
	  _classCallCheck(this, LayerTile);

	  this.gid = gid;
	  this.position = { x: x, y: y };
	  this.size = { x: width, y: height };
	};

	exports["default"] = LayerTile;
	module.exports = exports["default"];

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TileSet = (function () {

	  /**
	   * TileSet
	   * Object representing a tile set and
	   * its associated data.
	   */

	  function TileSet(name, firstgid, tileWidth, tileHeight, imageSource, imageWidth, imageHeight, margin, spacing, trans) {
	    _classCallCheck(this, TileSet);

	    // Tileset Properties
	    this.name = name;
	    this.firstgid = firstgid;
	    this.tileWidth = tileWidth;
	    this.tileHeight = tileHeight;
	    this.source = './assets/tilesets/' + imageSource.split("tilesets/")[1];
	    this.imageWidth = imageWidth;
	    this.imageHeight = imageHeight;
	    this.margin = margin || 0;
	    this.spacing = spacing || 0;
	    this.trans = trans || false;

	    // Tileset State
	    this.ready = false;
	    this.image = new Image();
	    this.tilesWide = (imageWidth + this.spacing) / (tileWidth + this.spacing);

	    // Set up canvas to render tile set to.
	    // This allows us to filter out the transparent color before rendering tiles from this set.
	    this.canvas = document.createElement('canvas');
	    this.context = this.canvas.getContext('2d');
	    this.canvas.width = imageWidth;
	    this.canvas.height = imageHeight;

	    // Load the image.
	    this.image.onload = this.imageDidLoad.bind(this);
	    this.image.src = this.source;
	  }

	  /**
	   * Image Did Load
	   * After the image has loaded, draws the entire tilesheet to a canvas
	   * and marks the tileset as ready to be rendered.
	   */

	  _createClass(TileSet, [{
	    key: 'imageDidLoad',
	    value: function imageDidLoad() {

	      // Draw the loaded tileset to a canvas;
	      this.context.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight);

	      // Get the image data from the tileset canvas;
	      var pixels = this.context.getImageData(0, 0, this.imageWidth, this.imageHeight);

	      // Find any pixels in our image whos RGB values match our transparent color
	      // Set the alpha channel on these pixels to 0 making them completely transparent.
	      if (this.trans) {

	        // Convert the transparent color hex to rgb.
	        var bigint = parseInt(this.trans, 16);
	        var r = bigint >> 16 & 255;
	        var g = bigint >> 8 & 255;
	        var b = bigint & 255;

	        // Set pixels with matching RGB values as transparent.
	        for (var i = 0; i < pixels.data.length; i += 4) {
	          if ((pixels.data[i] === r, pixels.data[i + 1] === g, pixels.data[i + 2] === b)) {
	            pixels.data[i + 3] = 0;
	          }
	        }
	      }

	      // Set the image source to the new image data (with transparent pixels)
	      this.context.putImageData(pixels, 0, 0);

	      // Set ready
	      this.ready = true;
	    }
	  }]);

	  return TileSet;
	})();

	exports['default'] = TileSet;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MapObject = (function () {
	  function MapObject(id, name, type, x, y, width, height, rotation, gid, visible) {
	    _classCallCheck(this, MapObject);

	    this.id = id;
	    this.name = name;
	    this.type = type;
	    this.position = { x: x, y: y };
	    this.size = { x: width, y: height };
	    this.rotation = rotation || null;
	    this.gid = gid || null;
	    this.visible = visible || true;
	    this.properties = {};
	  }

	  _createClass(MapObject, [{
	    key: "setProperty",
	    value: function setProperty(name, value) {
	      this.properties[name] = value;
	    }
	  }]);

	  return MapObject;
	})();

	exports["default"] = MapObject;
	module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MapObjectGroup = (function () {
	  function MapObjectGroup(name) {
	    _classCallCheck(this, MapObjectGroup);

	    this.name = name;
	    this.objects = [];
	    this.properties = {};
	  }

	  _createClass(MapObjectGroup, [{
	    key: "addObject",
	    value: function addObject(object) {
	      this.objects.push(object);
	    }
	  }, {
	    key: "setProperty",
	    value: function setProperty(name, value) {
	      this.properties[name] = value;
	    }
	  }]);

	  return MapObjectGroup;
	})();

	exports["default"] = MapObjectGroup;
	module.exports = exports["default"];

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Camera = (function () {

	  /**
	   * Camera
	   */

	  function Camera(x, y, width, height, zoom, target) {
	    _classCallCheck(this, Camera);

	    this.position = { x: x, y: y };
	    this.size = { x: width, y: height };
	    this.zoom = zoom / 100;
	    this.target = target || false;
	  }

	  /**
	   * Update
	   * Updates camera position to follow target.
	   */

	  _createClass(Camera, [{
	    key: "update",
	    value: function update(scene) {
	      if (this.target) {

	        // Update Camera Position
	        this.position.x = this.target.body.position.x - this.size.x / 2 * this.zoom + this.target.body.size.x * this.zoom;
	        this.position.y = this.target.body.position.y - this.size.y / 2 * this.zoom + this.target.body.size.y * this.zoom;

	        // Ensure camera remains within scene bounds.
	        if (this.position.x < 0) {
	          this.position.x = 0;
	        }
	        if (this.position.x + this.size.x * this.zoom > scene.renderingCanvas.width) {
	          this.position.x = scene.renderingCanvas.width - this.size.x * this.zoom;
	        }
	        if (this.position.y < 0) {
	          this.position.y = 0;
	        }
	        if (this.position.y + this.size.y * this.zoom > scene.renderingCanvas.height) {
	          this.position.y = scene.renderingCanvas.height - this.size.y * this.zoom;
	        }
	      }
	    }

	    /**
	     * Set Target
	     * Sets the entity for the camera to follow.
	     */
	  }, {
	    key: "setTarget",
	    value: function setTarget(target) {
	      this.target = target;
	    }

	    /**
	     * Tile is Visible
	     * Checks if the provided tile is visible to the camera.
	     */
	  }, {
	    key: "tileIsVisible",
	    value: function tileIsVisible(tile) {
	      return tile.position.x + tile.size.x * this.zoom >= this.position.x - tile.size.x && tile.position.x <= this.position.x + this.size.x * this.zoom && tile.position.y + tile.size.y * this.zoom >= this.position.y - tile.size.y && tile.position.y <= this.position.y + this.size.y * this.zoom;
	    }
	  }]);

	  return Camera;
	})();

	exports["default"] = Camera;
	module.exports = exports["default"];

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Debugger = (function () {
	  function Debugger(game) {
	    _classCallCheck(this, Debugger);

	    this.game = game;
	  }

	  _createClass(Debugger, [{
	    key: "draw",
	    value: function draw(context) {

	      // Draw background
	      context.fillStyle = "black";
	      context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	      // Set font and color
	      context.font = "14px Arial";
	      context.fillStyle = "white";

	      // Draw camera details
	      var camera = this.game.sceneManager.getCurrentScene().camera;
	      var x = camera.position.x.toFixed(1);
	      var y = camera.position.y.toFixed(1);
	      var w = camera.size.x;
	      var h = camera.size.y;
	      context.fillText('Camera', 12, 24);
	      context.fillText("x: " + x, 12, 44);
	      context.fillText("y: " + y, 68, 44);
	      context.fillText("w: " + w, 12, 66);
	      context.fillText("h: " + h, 68, 66);
	    }
	  }]);

	  return Debugger;
	})();

	exports["default"] = Debugger;
	module.exports = exports["default"];

/***/ }
/******/ ]);
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _src_ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/ship.js */ "./src/ship.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Defines the Gameboard object */


/*
INSTRUCTIONS

Gameboards should be able to place ships at specific coordinates
by calling the ship factory function.

Gameboards should have a receiveAttack function that takes a pair
of coordinates, determines whether or not the attack hit a ship
and then sends the ‘hit’ function to the correct ship,
or records the coordinates of the missed shot.

Gameboards should keep track of missed attacks
so they can display them properly.

Gameboards should be able to report whether or not
all of their ships have been sunk.
*/

var Gameboard = /*#__PURE__*/function () {
  function Gameboard() {
    _classCallCheck(this, Gameboard);
    this.gameBoard = this.setGameboard();
    this.missedAttacks = [];
    this.Ships = [];
  }
  _createClass(Gameboard, [{
    key: "setGameboard",
    value: function setGameboard() {
      // Initialize the gameboard as a hashmap of coordinates.
      // If a coord holds a ship, it will be added to that coord.

      // Set the board size. Sizes beyond 26 will cause issues.
      var sideLength = 10;

      // x-coords are capital letters
      // ASCII code for 'A' is 65.
      var xCoords = this.getXCoords(sideLength, 65);

      // y-coords are numbers
      var yCoords = this.getYCoords(sideLength, 1);

      // Get the full array of coords
      var allCoords = this.getAllCoords(xCoords, yCoords);
      var numCoords = allCoords.length;

      // Initialize a new Hashmap
      var boardMap = new Map();
      for (var i = 0; i < numCoords; i++) {
        boardMap[allCoords[i]] = false;
      }

      // console.log(boardMap);
      return boardMap;
    }
  }, {
    key: "getGameboard",
    value: function getGameboard() {
      return this.gameBoard;
    }
  }, {
    key: "placeShip",
    value: function placeShip(startCoord, finishCoord) {
      // Onus is on another object to ensure valid coords.

      // Get length of the ship
      var shipLength = this.getShipLength(startCoord, finishCoord);

      // Instantiate new ship
      var newShip = new _src_ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(shipLength);
      var shipCoordArray = [];
      var shipXCoords;
      var shipYCoords;

      // Get each coord in the array
      if (startCoord === finishCoord) {
        // Ship is one square. Add the coord.
        shipCoordArray.push(startCoord);
      } else if (startCoord[0] === finishCoord[0]) {
        // The ship is positioned in the y-axis
        shipXCoords = startCoord[0];
        shipYCoords = this.getYCoords(shipLength, Math.min(parseInt(startCoord.slice(1)), parseInt(finishCoord.slice(1))));
      } else {
        // The ship is positioned in the x-axis
        shipXCoords = this.getXCoords(shipLength, Math.min(startCoord[0].charCodeAt(0), finishCoord[0].charCodeAt(0)));
        shipYCoords = startCoord.slice(1);
      }
      shipCoordArray = this.getAllCoords(shipXCoords, shipYCoords);
      for (var i = 0; i < shipLength; i++) {
        this.gameBoard[shipCoordArray[i]] = newShip;
      }
      this.Ships.push(newShip);
    }
  }, {
    key: "receiveAttack",
    value: function receiveAttack(attackCoord) {
      if (!this.gameBoard[attackCoord]) {
        // No ship at the coord. Record missed strike.
        this.missedAttacks.push(attackCoord);
        // return false;
      } else {
        // Ship at the coord. Call the hit() method.
        this.gameBoard[attackCoord].hit();
        // return true;
      }
    }
  }, {
    key: "getShipLength",
    value: function getShipLength(startCoord, finishCoord) {
      var xDifference = 1 + this.getAsciiDifference(startCoord[0], finishCoord[0]);
      var yDifference = 1 + Math.abs(parseInt(startCoord.slice(1)) - parseInt(finishCoord.slice(1)));
      return Math.max(xDifference, yDifference);
    }
  }, {
    key: "getXCoords",
    value: function getXCoords(count, firstChar) {
      // X-coords are capital letters.
      return this.getArrayFromAscii(count, firstChar);
    }
  }, {
    key: "getYCoords",
    value: function getYCoords(count, seedNum) {
      // Y-coords are numbers

      var yCoords = [];
      for (var i = 0; i < count; i++) {
        yCoords.push((seedNum + i).toString());
      }
      return yCoords;
    }
  }, {
    key: "getAllCoords",
    value: function getAllCoords(xC, yC) {
      var allCoords = [];
      var xLength = xC.length;
      var yLength = yC.length;
      for (var i = 0; i < xLength; i++) {
        for (var j = 0; j < yLength; j++) {
          var newCoord = xC[i] + yC[j];
          allCoords.push(newCoord);
        }
      }
      return allCoords;
    }
  }, {
    key: "getArrayFromAscii",
    value: function getArrayFromAscii(count, firstCharCode) {
      var asciiArray = [];
      for (var i = 0; i < count; i++) {
        asciiArray.push(String.fromCharCode(firstCharCode + i));
      }
      return asciiArray;
    }
  }, {
    key: "getAsciiDifference",
    value: function getAsciiDifference(char1, char2) {
      var ascii1 = char1.charCodeAt(0);
      var ascii2 = char2.charCodeAt(0);
      return Math.abs(ascii1 - ascii2);
    }
  }, {
    key: "getMissedAttacks",
    value: function getMissedAttacks() {
      return this.missedAttacks;
    }
  }, {
    key: "getAllShipsSunk",
    value: function getAllShipsSunk() {
      if (this.Ships.length === 0) {
        return false;
      } else {
        return this.Ships.every(function (ship) {
          return ship.isSunk();
        });
      }
    }
  }]);
  return Gameboard;
}();

// const myGameboard = new Gameboard();

// myGameboard.placeShip("A1", "A5");
// myGameboard.placeShip("B7","H7");

// myGameboard.receiveAttack("A1");
// myGameboard.receiveAttack("A2");
// myGameboard.receiveAttack("A3");
// myGameboard.receiveAttack("A4");
// myGameboard.receiveAttack("A5");

// myGameboard.receiveAttack("C4");

// myGameboard.getGameboard();
// console.log(myGameboard.getMissedAttacks());

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _src_gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/gameboard.js */ "./src/gameboard.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Defines the Player object */


/*
INSTRUCTIONS

Players can take turns playing the game by
attacking the enemy Gameboard.

The game is played against the computer, so make the ‘computer’
capable of making random plays. The AI does not have to be smart,
but it should know whether or not a given move is legal
(i.e. it shouldn’t shoot the same coordinate twice).
*/

var Player = /*#__PURE__*/function () {
  function Player() {
    _classCallCheck(this, Player);
    this.playerGameboard = this.setGameboard();
    this.alreadyCalled = [];
  }
  _createClass(Player, [{
    key: "sendAttack",
    value: function sendAttack(attackCoords) {
      // Only sent for new coords
      this.alreadyCalled.push(attackCoords);
      return attackCoords;
    }
  }, {
    key: "receieveAttack",
    value: function receieveAttack(attackCoords) {
      this.playerGameboard.receiveAttack(attackCoords);
    }
  }, {
    key: "setGameboard",
    value: function setGameboard() {
      return new _src_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
    }
  }, {
    key: "placeShip",
    value: function placeShip(startCoord, finishCoord) {
      this.playerGameboard.placeShip(startCoord, finishCoord);
    }
  }, {
    key: "hasLost",
    value: function hasLost() {
      return this.playerGameboard.getAllShipsSunk();
    }
  }, {
    key: "isValidAttack",
    value: function isValidAttack(coord) {
      return !(coord in this.alreadyCalled);
    }
  }, {
    key: "sendRandomAttack",
    value: function sendRandomAttack() {
      var attackCoords = undefined;
      // console.log("coords are undefined: " + (attackCoords === undefined));

      while (attackCoords === undefined || !this.isValidAttack(attackCoords)) {
        var xCoord = this.getRandomLetter();
        var yCoord = this.getRandomNumber(1, 10);
        attackCoords = xCoord + yCoord;
        // console.log(xCoord);
        // console.log(yCoord);
      }

      // console.log(attackCoords);
      return this.sendAttack(attackCoords);
    }
  }, {
    key: "getRandomLetter",
    value: function getRandomLetter() {
      var randomCharCode = Math.floor(Math.random() * 10) + 65; // Generates ASCII code for A-Z
      var randomLetter = String.fromCharCode(randomCharCode);
      return randomLetter;
    }
  }, {
    key: "getRandomNumber",
    value: function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }]);
  return Player;
}();

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Defines the Ship object */

/*
INSTRUCTIONS 

Your ‘ships’ will be objects that include their length,
the number of times they’ve been hit, 
and whether or not they’ve been sunk.

Ships should have a hit() function that increases the
number of ‘hits’ in your ship.

isSunk() should be a function that calculates whether a
ship is considered sunk based on its length and the
number of hits it has received.
*/

var Ship = /*#__PURE__*/function () {
  // Onus is on the constructing object to ensure valid lengths.
  function Ship(length) {
    _classCallCheck(this, Ship);
    this.length = length;
    this.receivedHits = 0;
    this.sunk = false;
  }
  _createClass(Ship, [{
    key: "hit",
    value: function hit() {
      // Increment receivedHits, call isSunk(). If true, update bool.
      if (!this.isSunk()) {
        this.receivedHits++;
        if (this.isSunk()) {
          this.sunk = true;
        }
      }
    }
  }, {
    key: "isSunk",
    value: function isSunk() {
      // If the number of hits === length, the ship is sunk.

      // Onus is on another object to prevent the same spot being hit.
      // If the ship is sunken, no parameters are updated.

      return this.receivedHits === this.length;
    }
  }]);
  return Ship;
}();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Responsible for the high-level execution of the battleship game */


var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);
    this.firstPlayer;
    this.secondPlayer;
    this.winner;
    this.shotsFired = 0;

    // These will not be used at the start
    this.numShips;
    this.numSquares;
  }
  _createClass(Game, [{
    key: "playGame",
    value: function playGame() {
      // Set the players
      this.setPlayers();

      // Set the ships
      this.setShips();

      // console.log("Do not pray for easy lives");

      // While the game is not over, let them take turns firing
      while (!this.isGameOver()) {
        // Fight babay
        // console.log("Pray to be");
        this.engageInCombat(this.firstPlayer, this.secondPlayer);
      }
      console.log(this.winner);
      // console.log("Here are the boards");
    }
  }, {
    key: "setPlayers",
    value: function setPlayers() {
      this.firstPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_0__.Player();
      this.secondPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_0__.Player();
    }
  }, {
    key: "setShips",
    value: function setShips() {
      // Set ships for Player One
      this.firstPlayer.placeShip('A1', 'A4');
      this.firstPlayer.placeShip('D3', 'E3');
      this.firstPlayer.placeShip('C5', 'F5');
      this.firstPlayer.placeShip('H7', 'H8');

      // Set ships for Player Two
      this.secondPlayer.placeShip('A1', 'A4');
      this.secondPlayer.placeShip('D3', 'E3');
      this.secondPlayer.placeShip('C5', 'F5');
      this.secondPlayer.placeShip('H7', 'H8');
    }
  }, {
    key: "engageInCombat",
    value: function engageInCombat(firstPlayer, secondPlayer) {
      if (this.shotsFired % 2 === 0) {
        // console.log("Stronger men");
        this.fireShot(firstPlayer, secondPlayer);
      } else {
        this.fireShot(secondPlayer, firstPlayer);
      }
      this.shotsFired++;
      // console.log('We finished one bit of combat');
    }
  }, {
    key: "fireShot",
    value: function fireShot(firstPlayer, secondPlayer) {
      // Get coords. First player state updated to be sent
      var attackCoords = firstPlayer.sendRandomAttack();
      // console.log(attackCoords);
      secondPlayer.receieveAttack(attackCoords);
    }
  }, {
    key: "isGameOver",
    value: function isGameOver() {
      if (this.hasPlayerLost(this.firstPlayer)) {
        // Player Two has won.
        this.winner = "Player Two Wins!";
        return true;
      } else if (this.hasPlayerLost(this.secondPlayer)) {
        // Player One has won.
        this.winner = "Player One Wins!";
        return true;
      }
      return false;
    }
  }, {
    key: "hasPlayerLost",
    value: function hasPlayerLost(aPlayer) {
      return aPlayer.hasLost();
    }
  }]);
  return Game;
}();

// Run the game

var newGame = new Game();
newGame.playGame();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dkIsOENBQU0sQ0FBQyxDQUFDO0lBQ3BDO0VBQUM7SUFBQTlELEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUEyRixTQUFBLEVBQVc7TUFDUDtNQUNBLElBQUksQ0FBQ1IsV0FBVyxDQUFDckUsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7TUFDdEMsSUFBSSxDQUFDcUUsV0FBVyxDQUFDckUsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7TUFDdEMsSUFBSSxDQUFDcUUsV0FBVyxDQUFDckUsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7TUFDdEMsSUFBSSxDQUFDcUUsV0FBVyxDQUFDckUsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7O01BRXRDO01BQ0EsSUFBSSxDQUFDc0UsWUFBWSxDQUFDdEUsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7TUFDdkMsSUFBSSxDQUFDc0UsWUFBWSxDQUFDdEUsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7TUFDdkMsSUFBSSxDQUFDc0UsWUFBWSxDQUFDdEUsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7TUFDdkMsSUFBSSxDQUFDc0UsWUFBWSxDQUFDdEUsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDM0M7RUFBQztJQUFBZixHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBNkYsZUFBZVYsV0FBVyxFQUFFQyxZQUFZLEVBQUU7TUFDdEMsSUFBSSxJQUFJLENBQUNFLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzNCO1FBQ0EsSUFBSSxDQUFDVSxRQUFRLENBQUNiLFdBQVcsRUFBRUMsWUFBWSxDQUFDO01BQzVDLENBQUMsTUFBTTtRQUNILElBQUksQ0FBQ1ksUUFBUSxDQUFDWixZQUFZLEVBQUVELFdBQVcsQ0FBQztNQUM1QztNQUNBLElBQUksQ0FBQ0csVUFBVSxFQUFFO01BQ2pCO0lBQ0o7RUFBQztJQUFBdkYsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQWdHLFNBQVNiLFdBQVcsRUFBRUMsWUFBWSxFQUFFO01BQ2hDO01BQ0EsSUFBTW5CLFlBQVksR0FBR2tCLFdBQVcsQ0FBQ2IsZ0JBQWdCLENBQUMsQ0FBQztNQUNuRDtNQUNBYyxZQUFZLENBQUNsQixjQUFjLENBQUNELFlBQVksQ0FBQztJQUM3QztFQUFDO0lBQUFsRSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBNEYsV0FBQSxFQUFhO01BQ1QsSUFBSSxJQUFJLENBQUNLLGFBQWEsQ0FBQyxJQUFJLENBQUNkLFdBQVcsQ0FBQyxFQUFFO1FBQ3RDO1FBQ0EsSUFBSSxDQUFDRSxNQUFNLEdBQUcsa0JBQWtCO1FBQ2hDLE9BQU8sSUFBSTtNQUNmLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQ1ksYUFBYSxDQUFDLElBQUksQ0FBQ2IsWUFBWSxDQUFDLEVBQUU7UUFDOUM7UUFDQSxJQUFJLENBQUNDLE1BQU0sR0FBRyxrQkFBa0I7UUFDaEMsT0FBTyxJQUFJO01BQ2Y7TUFFQSxPQUFPLEtBQUs7SUFDaEI7RUFBQztJQUFBdEYsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQWlHLGNBQWNDLE9BQU8sRUFBRTtNQUNuQixPQUFPQSxPQUFPLENBQUMvQixPQUFPLENBQUMsQ0FBQztJQUM1QjtFQUFDO0VBQUEsT0FBQWUsSUFBQTtBQUFBOztBQUdMOztBQUVBLElBQUlpQixPQUFPLEdBQUcsSUFBSWpCLElBQUksQ0FBQyxDQUFDO0FBQ3hCaUIsT0FBTyxDQUFDVixRQUFRLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogRGVmaW5lcyB0aGUgR2FtZWJvYXJkIG9iamVjdCAqL1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4uL3NyYy9zaGlwLmpzJztcblxuLypcbklOU1RSVUNUSU9OU1xuXG5HYW1lYm9hcmRzIHNob3VsZCBiZSBhYmxlIHRvIHBsYWNlIHNoaXBzIGF0IHNwZWNpZmljIGNvb3JkaW5hdGVzXG5ieSBjYWxsaW5nIHRoZSBzaGlwIGZhY3RvcnkgZnVuY3Rpb24uXG5cbkdhbWVib2FyZHMgc2hvdWxkIGhhdmUgYSByZWNlaXZlQXR0YWNrIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBwYWlyXG5vZiBjb29yZGluYXRlcywgZGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgYXR0YWNrIGhpdCBhIHNoaXBcbmFuZCB0aGVuIHNlbmRzIHRoZSDigJhoaXTigJkgZnVuY3Rpb24gdG8gdGhlIGNvcnJlY3Qgc2hpcCxcbm9yIHJlY29yZHMgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBtaXNzZWQgc2hvdC5cblxuR2FtZWJvYXJkcyBzaG91bGQga2VlcCB0cmFjayBvZiBtaXNzZWQgYXR0YWNrc1xuc28gdGhleSBjYW4gZGlzcGxheSB0aGVtIHByb3Blcmx5LlxuXG5HYW1lYm9hcmRzIHNob3VsZCBiZSBhYmxlIHRvIHJlcG9ydCB3aGV0aGVyIG9yIG5vdFxuYWxsIG9mIHRoZWlyIHNoaXBzIGhhdmUgYmVlbiBzdW5rLlxuKi9cblxuZXhwb3J0IGNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkID0gdGhpcy5zZXRHYW1lYm9hcmQoKTtcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzID0gW107XG4gICAgICAgIHRoaXMuU2hpcHMgPSBbXTtcbiAgICB9XG5cbiAgICBzZXRHYW1lYm9hcmQoKSB7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIGdhbWVib2FyZCBhcyBhIGhhc2htYXAgb2YgY29vcmRpbmF0ZXMuXG4gICAgICAgIC8vIElmIGEgY29vcmQgaG9sZHMgYSBzaGlwLCBpdCB3aWxsIGJlIGFkZGVkIHRvIHRoYXQgY29vcmQuXG5cbiAgICAgICAgLy8gU2V0IHRoZSBib2FyZCBzaXplLiBTaXplcyBiZXlvbmQgMjYgd2lsbCBjYXVzZSBpc3N1ZXMuXG4gICAgICAgIGNvbnN0IHNpZGVMZW5ndGggPSAxMDtcblxuICAgICAgICAvLyB4LWNvb3JkcyBhcmUgY2FwaXRhbCBsZXR0ZXJzXG4gICAgICAgIC8vIEFTQ0lJIGNvZGUgZm9yICdBJyBpcyA2NS5cbiAgICAgICAgY29uc3QgeENvb3JkcyA9IHRoaXMuZ2V0WENvb3JkcyhzaWRlTGVuZ3RoLCA2NSk7XG5cbiAgICAgICAgLy8geS1jb29yZHMgYXJlIG51bWJlcnNcbiAgICAgICAgY29uc3QgeUNvb3JkcyA9IHRoaXMuZ2V0WUNvb3JkcyhzaWRlTGVuZ3RoLCAxKTtcblxuICAgICAgICAvLyBHZXQgdGhlIGZ1bGwgYXJyYXkgb2YgY29vcmRzXG4gICAgICAgIGNvbnN0IGFsbENvb3JkcyA9IHRoaXMuZ2V0QWxsQ29vcmRzKHhDb29yZHMsIHlDb29yZHMpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbnVtQ29vcmRzID0gYWxsQ29vcmRzLmxlbmd0aDtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGEgbmV3IEhhc2htYXBcbiAgICAgICAgbGV0IGJvYXJkTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29vcmRzOyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkTWFwW2FsbENvb3Jkc1tpXV0gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9hcmRNYXApO1xuICAgICAgICByZXR1cm4gYm9hcmRNYXA7XG4gICAgfVxuXG4gICAgZ2V0R2FtZWJvYXJkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lQm9hcmQ7XG4gICAgfVxuXG4gICAgcGxhY2VTaGlwKHN0YXJ0Q29vcmQsIGZpbmlzaENvb3JkKSB7XG4gICAgICAgIC8vIE9udXMgaXMgb24gYW5vdGhlciBvYmplY3QgdG8gZW5zdXJlIHZhbGlkIGNvb3Jkcy5cblxuICAgICAgICAvLyBHZXQgbGVuZ3RoIG9mIHRoZSBzaGlwXG4gICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSB0aGlzLmdldFNoaXBMZW5ndGgoc3RhcnRDb29yZCwgZmluaXNoQ29vcmQpO1xuICAgICAgICBcbiAgICAgICAgLy8gSW5zdGFudGlhdGUgbmV3IHNoaXBcbiAgICAgICAgY29uc3QgbmV3U2hpcCA9IG5ldyBTaGlwKHNoaXBMZW5ndGgpO1xuXG4gICAgICAgIGxldCBzaGlwQ29vcmRBcnJheSA9IFtdO1xuICAgICAgICBsZXQgc2hpcFhDb29yZHM7XG4gICAgICAgIGxldCBzaGlwWUNvb3JkcztcblxuICAgICAgICAvLyBHZXQgZWFjaCBjb29yZCBpbiB0aGUgYXJyYXlcbiAgICAgICAgaWYgKHN0YXJ0Q29vcmQgPT09IGZpbmlzaENvb3JkKSB7XG4gICAgICAgICAgICAvLyBTaGlwIGlzIG9uZSBzcXVhcmUuIEFkZCB0aGUgY29vcmQuXG4gICAgICAgICAgICBzaGlwQ29vcmRBcnJheS5wdXNoKHN0YXJ0Q29vcmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0Q29vcmRbMF0gPT09IGZpbmlzaENvb3JkWzBdKXtcbiAgICAgICAgICAgIC8vIFRoZSBzaGlwIGlzIHBvc2l0aW9uZWQgaW4gdGhlIHktYXhpc1xuICAgICAgICAgICAgc2hpcFhDb29yZHMgPSBzdGFydENvb3JkWzBdO1xuICAgICAgICAgICAgc2hpcFlDb29yZHMgPSB0aGlzLmdldFlDb29yZHMoc2hpcExlbmd0aCwgTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoc3RhcnRDb29yZC5zbGljZSgxKSksXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZmluaXNoQ29vcmQuc2xpY2UoMSkpLFxuICAgICAgICAgICAgKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoZSBzaGlwIGlzIHBvc2l0aW9uZWQgaW4gdGhlIHgtYXhpc1xuICAgICAgICAgICAgc2hpcFhDb29yZHMgPSB0aGlzLmdldFhDb29yZHMoc2hpcExlbmd0aCwgTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgc3RhcnRDb29yZFswXS5jaGFyQ29kZUF0KDApLFxuICAgICAgICAgICAgICAgIGZpbmlzaENvb3JkWzBdLmNoYXJDb2RlQXQoMCksXG4gICAgICAgICAgICApKVxuICAgICAgICAgICAgc2hpcFlDb29yZHMgPSBzdGFydENvb3JkLnNsaWNlKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2hpcENvb3JkQXJyYXkgPSB0aGlzLmdldEFsbENvb3JkcyhzaGlwWENvb3Jkcywgc2hpcFlDb29yZHMpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVCb2FyZFtzaGlwQ29vcmRBcnJheVtpXV0gPSBuZXdTaGlwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5TaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmQpIHtcbiAgICAgICAgaWYgKCEodGhpcy5nYW1lQm9hcmRbYXR0YWNrQ29vcmRdKSkge1xuICAgICAgICAgICAgLy8gTm8gc2hpcCBhdCB0aGUgY29vcmQuIFJlY29yZCBtaXNzZWQgc3RyaWtlLlxuICAgICAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzLnB1c2goYXR0YWNrQ29vcmQpO1xuICAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gU2hpcCBhdCB0aGUgY29vcmQuIENhbGwgdGhlIGhpdCgpIG1ldGhvZC5cbiAgICAgICAgICAgIHRoaXMuZ2FtZUJvYXJkW2F0dGFja0Nvb3JkXS5oaXQoKTtcbiAgICAgICAgICAgIC8vIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2hpcExlbmd0aChzdGFydENvb3JkLCBmaW5pc2hDb29yZCkge1xuICAgICAgICBjb25zdCB4RGlmZmVyZW5jZSA9IDEgKyB0aGlzLmdldEFzY2lpRGlmZmVyZW5jZShcbiAgICAgICAgICAgIHN0YXJ0Q29vcmRbMF0sXG4gICAgICAgICAgICBmaW5pc2hDb29yZFswXVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHlEaWZmZXJlbmNlID0gMSArIChcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KHN0YXJ0Q29vcmQuc2xpY2UoMSkpIC0gXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZmluaXNoQ29vcmQuc2xpY2UoMSkpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKE1hdGgubWF4KHhEaWZmZXJlbmNlLCB5RGlmZmVyZW5jZSkpO1xuICAgIH1cblxuICAgIGdldFhDb29yZHMoY291bnQsIGZpcnN0Q2hhcil7XG4gICAgICAgIC8vIFgtY29vcmRzIGFyZSBjYXBpdGFsIGxldHRlcnMuXG4gICAgICAgIHJldHVybiB0aGlzLmdldEFycmF5RnJvbUFzY2lpKGNvdW50LCBmaXJzdENoYXIpO1xuICAgIH1cblxuICAgIGdldFlDb29yZHMoY291bnQsIHNlZWROdW0pe1xuICAgICAgICAvLyBZLWNvb3JkcyBhcmUgbnVtYmVyc1xuXG4gICAgICAgIGxldCB5Q29vcmRzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICB5Q29vcmRzLnB1c2goKHNlZWROdW0gKyBpKS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB5Q29vcmRzO1xuICAgIH1cblxuICAgIGdldEFsbENvb3Jkcyh4QywgeUMpIHtcbiAgICAgICAgbGV0IGFsbENvb3JkcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHhMZW5ndGggPSB4Qy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHlMZW5ndGggPSB5Qy5sZW5ndGg7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgeUxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q29vcmQgPSB4Q1tpXSArIHlDW2pdO1xuICAgICAgICAgICAgICAgIGFsbENvb3Jkcy5wdXNoKG5ld0Nvb3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhbGxDb29yZHM7XG4gICAgfVxuXG4gICAgZ2V0QXJyYXlGcm9tQXNjaWkoY291bnQsIGZpcnN0Q2hhckNvZGUpIHtcbiAgICAgICAgbGV0IGFzY2lpQXJyYXkgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGFzY2lpQXJyYXkucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGZpcnN0Q2hhckNvZGUgKyBpKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXNjaWlBcnJheTtcbiAgICB9XG5cbiAgICBnZXRBc2NpaURpZmZlcmVuY2UoY2hhcjEsIGNoYXIyKSB7XG4gICAgICAgIGNvbnN0IGFzY2lpMSA9IGNoYXIxLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGNvbnN0IGFzY2lpMiA9IGNoYXIyLmNoYXJDb2RlQXQoMCk7XG4gICAgICBcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGFzY2lpMSAtIGFzY2lpMik7XG4gICAgfVxuXG4gICAgZ2V0TWlzc2VkQXR0YWNrcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlzc2VkQXR0YWNrcztcbiAgICB9XG5cbiAgICBnZXRBbGxTaGlwc1N1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLlNoaXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuU2hpcHMuZXZlcnkoKHNoaXApID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hpcC5pc1N1bmsoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gY29uc3QgbXlHYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5cbi8vIG15R2FtZWJvYXJkLnBsYWNlU2hpcChcIkExXCIsIFwiQTVcIik7XG4vLyBteUdhbWVib2FyZC5wbGFjZVNoaXAoXCJCN1wiLFwiSDdcIik7XG5cbi8vIG15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soXCJBMVwiKTtcbi8vIG15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soXCJBMlwiKTtcbi8vIG15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soXCJBM1wiKTtcbi8vIG15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soXCJBNFwiKTtcbi8vIG15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soXCJBNVwiKTtcblxuLy8gbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhcIkM0XCIpO1xuXG4vLyBteUdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKTtcbi8vIGNvbnNvbGUubG9nKG15R2FtZWJvYXJkLmdldE1pc3NlZEF0dGFja3MoKSk7IiwiLyogRGVmaW5lcyB0aGUgUGxheWVyIG9iamVjdCAqL1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi4vc3JjL2dhbWVib2FyZC5qcyc7XG5cbi8qXG5JTlNUUlVDVElPTlNcblxuUGxheWVycyBjYW4gdGFrZSB0dXJucyBwbGF5aW5nIHRoZSBnYW1lIGJ5XG5hdHRhY2tpbmcgdGhlIGVuZW15IEdhbWVib2FyZC5cblxuVGhlIGdhbWUgaXMgcGxheWVkIGFnYWluc3QgdGhlIGNvbXB1dGVyLCBzbyBtYWtlIHRoZSDigJhjb21wdXRlcuKAmVxuY2FwYWJsZSBvZiBtYWtpbmcgcmFuZG9tIHBsYXlzLiBUaGUgQUkgZG9lcyBub3QgaGF2ZSB0byBiZSBzbWFydCxcbmJ1dCBpdCBzaG91bGQga25vdyB3aGV0aGVyIG9yIG5vdCBhIGdpdmVuIG1vdmUgaXMgbGVnYWxcbihpLmUuIGl0IHNob3VsZG7igJl0IHNob290IHRoZSBzYW1lIGNvb3JkaW5hdGUgdHdpY2UpLlxuKi9cblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucGxheWVyR2FtZWJvYXJkID0gdGhpcy5zZXRHYW1lYm9hcmQoKTtcbiAgICAgICAgdGhpcy5hbHJlYWR5Q2FsbGVkID0gW107XG4gICAgfVxuXG4gICAgc2VuZEF0dGFjayhhdHRhY2tDb29yZHMpIHtcbiAgICAgICAgLy8gT25seSBzZW50IGZvciBuZXcgY29vcmRzXG4gICAgICAgIHRoaXMuYWxyZWFkeUNhbGxlZC5wdXNoKGF0dGFja0Nvb3Jkcyk7XG4gICAgICAgIHJldHVybiBhdHRhY2tDb29yZHM7XG4gICAgfVxuXG4gICAgcmVjZWlldmVBdHRhY2soYXR0YWNrQ29vcmRzKSB7XG4gICAgICAgIHRoaXMucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmRzKTsgICAgICAgIFxuICAgIH1cblxuICAgIHNldEdhbWVib2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHYW1lYm9hcmQoKTtcbiAgICB9XG5cbiAgICBwbGFjZVNoaXAoc3RhcnRDb29yZCwgZmluaXNoQ29vcmQpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHN0YXJ0Q29vcmQsIGZpbmlzaENvb3JkKTtcbiAgICB9XG5cbiAgICBoYXNMb3N0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXJHYW1lYm9hcmQuZ2V0QWxsU2hpcHNTdW5rKCk7XG4gICAgfVxuXG4gICAgaXNWYWxpZEF0dGFjayhjb29yZCkge1xuICAgICAgICByZXR1cm4gKCEoY29vcmQgaW4gdGhpcy5hbHJlYWR5Q2FsbGVkKSk7XG4gICAgfVxuXG4gICAgc2VuZFJhbmRvbUF0dGFjaygpIHtcblxuICAgICAgICBsZXQgYXR0YWNrQ29vcmRzID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNvb3JkcyBhcmUgdW5kZWZpbmVkOiBcIiArIChhdHRhY2tDb29yZHMgPT09IHVuZGVmaW5lZCkpO1xuICAgICAgICBcbiAgICAgICAgd2hpbGUgKFxuICAgICAgICAgICAgYXR0YWNrQ29vcmRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICEodGhpcy5pc1ZhbGlkQXR0YWNrKGF0dGFja0Nvb3JkcykpXG4gICAgICAgICkge1xuICAgICAgICAgICAgbGV0IHhDb29yZCA9IHRoaXMuZ2V0UmFuZG9tTGV0dGVyKCk7XG4gICAgICAgICAgICBsZXQgeUNvb3JkID0gdGhpcy5nZXRSYW5kb21OdW1iZXIoMSwgMTApO1xuICAgICAgICAgICAgYXR0YWNrQ29vcmRzID0geENvb3JkICsgeUNvb3JkO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coeENvb3JkKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHlDb29yZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhdHRhY2tDb29yZHMpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kQXR0YWNrKGF0dGFja0Nvb3Jkcyk7XG4gICAgfVxuXG4gICAgZ2V0UmFuZG9tTGV0dGVyKCkge1xuICAgICAgICBjb25zdCByYW5kb21DaGFyQ29kZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDY1OyAvLyBHZW5lcmF0ZXMgQVNDSUkgY29kZSBmb3IgQS1aXG4gICAgICAgIGNvbnN0IHJhbmRvbUxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUocmFuZG9tQ2hhckNvZGUpO1xuICAgICAgICByZXR1cm4gcmFuZG9tTGV0dGVyO1xuICAgIH1cblxuICAgIGdldFJhbmRvbU51bWJlcihtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgICB9XG59XG4iLCIvKiBEZWZpbmVzIHRoZSBTaGlwIG9iamVjdCAqL1xuXG4vKlxuSU5TVFJVQ1RJT05TIFxuXG5Zb3VyIOKAmHNoaXBz4oCZIHdpbGwgYmUgb2JqZWN0cyB0aGF0IGluY2x1ZGUgdGhlaXIgbGVuZ3RoLFxudGhlIG51bWJlciBvZiB0aW1lcyB0aGV54oCZdmUgYmVlbiBoaXQsIFxuYW5kIHdoZXRoZXIgb3Igbm90IHRoZXnigJl2ZSBiZWVuIHN1bmsuXG5cblNoaXBzIHNob3VsZCBoYXZlIGEgaGl0KCkgZnVuY3Rpb24gdGhhdCBpbmNyZWFzZXMgdGhlXG5udW1iZXIgb2Yg4oCYaGl0c+KAmSBpbiB5b3VyIHNoaXAuXG5cbmlzU3VuaygpIHNob3VsZCBiZSBhIGZ1bmN0aW9uIHRoYXQgY2FsY3VsYXRlcyB3aGV0aGVyIGFcbnNoaXAgaXMgY29uc2lkZXJlZCBzdW5rIGJhc2VkIG9uIGl0cyBsZW5ndGggYW5kIHRoZVxubnVtYmVyIG9mIGhpdHMgaXQgaGFzIHJlY2VpdmVkLlxuKi9cblxuZXhwb3J0IGNsYXNzIFNoaXAge1xuICAgIC8vIE9udXMgaXMgb24gdGhlIGNvbnN0cnVjdGluZyBvYmplY3QgdG8gZW5zdXJlIHZhbGlkIGxlbmd0aHMuXG4gICAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLnJlY2VpdmVkSGl0cyA9IDA7XG4gICAgICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgLy8gSW5jcmVtZW50IHJlY2VpdmVkSGl0cywgY2FsbCBpc1N1bmsoKS4gSWYgdHJ1ZSwgdXBkYXRlIGJvb2wuXG4gICAgICAgIGlmICghKHRoaXMuaXNTdW5rKCkpKSB7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVkSGl0cysrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGlzU3VuaygpIHtcbiAgICAgICAgLy8gSWYgdGhlIG51bWJlciBvZiBoaXRzID09PSBsZW5ndGgsIHRoZSBzaGlwIGlzIHN1bmsuXG5cbiAgICAgICAgLy8gT251cyBpcyBvbiBhbm90aGVyIG9iamVjdCB0byBwcmV2ZW50IHRoZSBzYW1lIHNwb3QgYmVpbmcgaGl0LlxuICAgICAgICAvLyBJZiB0aGUgc2hpcCBpcyBzdW5rZW4sIG5vIHBhcmFtZXRlcnMgYXJlIHVwZGF0ZWQuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMucmVjZWl2ZWRIaXRzID09PSB0aGlzLmxlbmd0aFxuICAgICAgICApOyAgIFxuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIFJlc3BvbnNpYmxlIGZvciB0aGUgaGlnaC1sZXZlbCBleGVjdXRpb24gb2YgdGhlIGJhdHRsZXNoaXAgZ2FtZSAqL1xuXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5maXJzdFBsYXllcjtcbiAgICAgICAgdGhpcy5zZWNvbmRQbGF5ZXI7XG4gICAgICAgIHRoaXMud2lubmVyO1xuICAgICAgICB0aGlzLnNob3RzRmlyZWQgPSAwO1xuXG4gICAgICAgIC8vIFRoZXNlIHdpbGwgbm90IGJlIHVzZWQgYXQgdGhlIHN0YXJ0XG4gICAgICAgIHRoaXMubnVtU2hpcHM7XG4gICAgICAgIHRoaXMubnVtU3F1YXJlcztcbiAgICB9XG5cbiAgICBwbGF5R2FtZSgpIHtcbiAgICAgICAgLy8gU2V0IHRoZSBwbGF5ZXJzXG4gICAgICAgIHRoaXMuc2V0UGxheWVycygpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgc2hpcHNcbiAgICAgICAgdGhpcy5zZXRTaGlwcygpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRG8gbm90IHByYXkgZm9yIGVhc3kgbGl2ZXNcIik7XG5cbiAgICAgICAgLy8gV2hpbGUgdGhlIGdhbWUgaXMgbm90IG92ZXIsIGxldCB0aGVtIHRha2UgdHVybnMgZmlyaW5nXG4gICAgICAgIHdoaWxlICghKHRoaXMuaXNHYW1lT3ZlcigpKSkge1xuICAgICAgICAgICAgLy8gRmlnaHQgYmFiYXlcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUHJheSB0byBiZVwiKTtcbiAgICAgICAgICAgIHRoaXMuZW5nYWdlSW5Db21iYXQodGhpcy5maXJzdFBsYXllciwgdGhpcy5zZWNvbmRQbGF5ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy53aW5uZXIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkhlcmUgYXJlIHRoZSBib2FyZHNcIik7XG4gICAgfVxuXG4gICAgc2V0UGxheWVycygpIHtcbiAgICAgICAgdGhpcy5maXJzdFBsYXllciA9IG5ldyBQbGF5ZXIoKTtcbiAgICAgICAgdGhpcy5zZWNvbmRQbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgfVxuXG4gICAgc2V0U2hpcHMoKSB7XG4gICAgICAgIC8vIFNldCBzaGlwcyBmb3IgUGxheWVyIE9uZVxuICAgICAgICB0aGlzLmZpcnN0UGxheWVyLnBsYWNlU2hpcCgnQTEnLCAnQTQnKTtcbiAgICAgICAgdGhpcy5maXJzdFBsYXllci5wbGFjZVNoaXAoJ0QzJywgJ0UzJyk7XG4gICAgICAgIHRoaXMuZmlyc3RQbGF5ZXIucGxhY2VTaGlwKCdDNScsICdGNScpO1xuICAgICAgICB0aGlzLmZpcnN0UGxheWVyLnBsYWNlU2hpcCgnSDcnLCAnSDgnKTtcblxuICAgICAgICAvLyBTZXQgc2hpcHMgZm9yIFBsYXllciBUd29cbiAgICAgICAgdGhpcy5zZWNvbmRQbGF5ZXIucGxhY2VTaGlwKCdBMScsICdBNCcpO1xuICAgICAgICB0aGlzLnNlY29uZFBsYXllci5wbGFjZVNoaXAoJ0QzJywgJ0UzJyk7XG4gICAgICAgIHRoaXMuc2Vjb25kUGxheWVyLnBsYWNlU2hpcCgnQzUnLCAnRjUnKTtcbiAgICAgICAgdGhpcy5zZWNvbmRQbGF5ZXIucGxhY2VTaGlwKCdINycsICdIOCcpO1xuICAgIH1cblxuICAgIGVuZ2FnZUluQ29tYmF0KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvdHNGaXJlZCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU3Ryb25nZXIgbWVuXCIpO1xuICAgICAgICAgICAgdGhpcy5maXJlU2hvdChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlyZVNob3Qoc2Vjb25kUGxheWVyLCBmaXJzdFBsYXllcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG90c0ZpcmVkKys7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdXZSBmaW5pc2hlZCBvbmUgYml0IG9mIGNvbWJhdCcpO1xuICAgIH1cblxuICAgIGZpcmVTaG90KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpIHtcbiAgICAgICAgLy8gR2V0IGNvb3Jkcy4gRmlyc3QgcGxheWVyIHN0YXRlIHVwZGF0ZWQgdG8gYmUgc2VudFxuICAgICAgICBjb25zdCBhdHRhY2tDb29yZHMgPSBmaXJzdFBsYXllci5zZW5kUmFuZG9tQXR0YWNrKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGF0dGFja0Nvb3Jkcyk7XG4gICAgICAgIHNlY29uZFBsYXllci5yZWNlaWV2ZUF0dGFjayhhdHRhY2tDb29yZHMpO1xuICAgIH1cblxuICAgIGlzR2FtZU92ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc1BsYXllckxvc3QodGhpcy5maXJzdFBsYXllcikpIHtcbiAgICAgICAgICAgIC8vIFBsYXllciBUd28gaGFzIHdvbi5cbiAgICAgICAgICAgIHRoaXMud2lubmVyID0gXCJQbGF5ZXIgVHdvIFdpbnMhXCI7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc1BsYXllckxvc3QodGhpcy5zZWNvbmRQbGF5ZXIpKSB7XG4gICAgICAgICAgICAvLyBQbGF5ZXIgT25lIGhhcyB3b24uXG4gICAgICAgICAgICB0aGlzLndpbm5lciA9IFwiUGxheWVyIE9uZSBXaW5zIVwiO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaGFzUGxheWVyTG9zdChhUGxheWVyKSB7XG4gICAgICAgIHJldHVybiBhUGxheWVyLmhhc0xvc3QoKTtcbiAgICB9XG59XG5cbi8vIFJ1biB0aGUgZ2FtZVxuXG5sZXQgbmV3R2FtZSA9IG5ldyBHYW1lKCk7XG5uZXdHYW1lLnBsYXlHYW1lKCk7Il0sIm5hbWVzIjpbIlNoaXAiLCJHYW1lYm9hcmQiLCJfY2xhc3NDYWxsQ2hlY2siLCJnYW1lQm9hcmQiLCJzZXRHYW1lYm9hcmQiLCJtaXNzZWRBdHRhY2tzIiwiU2hpcHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsInNpZGVMZW5ndGgiLCJ4Q29vcmRzIiwiZ2V0WENvb3JkcyIsInlDb29yZHMiLCJnZXRZQ29vcmRzIiwiYWxsQ29vcmRzIiwiZ2V0QWxsQ29vcmRzIiwibnVtQ29vcmRzIiwibGVuZ3RoIiwiYm9hcmRNYXAiLCJNYXAiLCJpIiwiZ2V0R2FtZWJvYXJkIiwicGxhY2VTaGlwIiwic3RhcnRDb29yZCIsImZpbmlzaENvb3JkIiwic2hpcExlbmd0aCIsImdldFNoaXBMZW5ndGgiLCJuZXdTaGlwIiwic2hpcENvb3JkQXJyYXkiLCJzaGlwWENvb3JkcyIsInNoaXBZQ29vcmRzIiwicHVzaCIsIk1hdGgiLCJtaW4iLCJwYXJzZUludCIsInNsaWNlIiwiY2hhckNvZGVBdCIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tDb29yZCIsImhpdCIsInhEaWZmZXJlbmNlIiwiZ2V0QXNjaWlEaWZmZXJlbmNlIiwieURpZmZlcmVuY2UiLCJhYnMiLCJtYXgiLCJjb3VudCIsImZpcnN0Q2hhciIsImdldEFycmF5RnJvbUFzY2lpIiwic2VlZE51bSIsInRvU3RyaW5nIiwieEMiLCJ5QyIsInhMZW5ndGgiLCJ5TGVuZ3RoIiwiaiIsIm5ld0Nvb3JkIiwiZmlyc3RDaGFyQ29kZSIsImFzY2lpQXJyYXkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyMSIsImNoYXIyIiwiYXNjaWkxIiwiYXNjaWkyIiwiZ2V0TWlzc2VkQXR0YWNrcyIsImdldEFsbFNoaXBzU3VuayIsImV2ZXJ5Iiwic2hpcCIsImlzU3VuayIsIlBsYXllciIsInBsYXllckdhbWVib2FyZCIsImFscmVhZHlDYWxsZWQiLCJzZW5kQXR0YWNrIiwiYXR0YWNrQ29vcmRzIiwicmVjZWlldmVBdHRhY2siLCJoYXNMb3N0IiwiaXNWYWxpZEF0dGFjayIsImNvb3JkIiwic2VuZFJhbmRvbUF0dGFjayIsInVuZGVmaW5lZCIsInhDb29yZCIsImdldFJhbmRvbUxldHRlciIsInlDb29yZCIsImdldFJhbmRvbU51bWJlciIsInJhbmRvbUNoYXJDb2RlIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21MZXR0ZXIiLCJyZWNlaXZlZEhpdHMiLCJzdW5rIiwiR2FtZSIsImZpcnN0UGxheWVyIiwic2Vjb25kUGxheWVyIiwid2lubmVyIiwic2hvdHNGaXJlZCIsIm51bVNoaXBzIiwibnVtU3F1YXJlcyIsInBsYXlHYW1lIiwic2V0UGxheWVycyIsInNldFNoaXBzIiwiaXNHYW1lT3ZlciIsImVuZ2FnZUluQ29tYmF0IiwiY29uc29sZSIsImxvZyIsImZpcmVTaG90IiwiaGFzUGxheWVyTG9zdCIsImFQbGF5ZXIiLCJuZXdHYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==
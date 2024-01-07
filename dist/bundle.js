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
/* harmony import */ var _src_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/player.js */ "./src/player.js");
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
      this.firstPlayer = new _src_player_js__WEBPACK_IMPORTED_MODULE_0__.Player();
      this.secondPlayer = new _src_player_js__WEBPACK_IMPORTED_MODULE_0__.Player();
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRUMsWUFBWSxFQUFFO01BQ2hDO01BQ0EsSUFBTW5CLFlBQVksR0FBR2tCLFdBQVcsQ0FBQ2IsZ0JBQWdCLENBQUMsQ0FBQztNQUNuRDtNQUNBYyxZQUFZLENBQUNsQixjQUFjLENBQUNELFlBQVksQ0FBQztJQUM3QztFQUFDO0lBQUFsRSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBNEYsV0FBQSxFQUFhO01BQ1QsSUFBSSxJQUFJLENBQUNLLGFBQWEsQ0FBQyxJQUFJLENBQUNkLFdBQVcsQ0FBQyxFQUFFO1FBQ3RDO1FBQ0EsSUFBSSxDQUFDRSxNQUFNLEdBQUcsa0JBQWtCO1FBQ2hDLE9BQU8sSUFBSTtNQUNmLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQ1ksYUFBYSxDQUFDLElBQUksQ0FBQ2IsWUFBWSxDQUFDLEVBQUU7UUFDOUM7UUFDQSxJQUFJLENBQUNDLE1BQU0sR0FBRyxrQkFBa0I7UUFDaEMsT0FBTyxJQUFJO01BQ2Y7TUFFQSxPQUFPLEtBQUs7SUFDaEI7RUFBQztJQUFBdEYsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQWlHLGNBQWNDLE9BQU8sRUFBRTtNQUNuQixPQUFPQSxPQUFPLENBQUMvQixPQUFPLENBQUMsQ0FBQztJQUM1QjtFQUFDO0VBQUEsT0FBQWUsSUFBQTtBQUFBLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBEZWZpbmVzIHRoZSBHYW1lYm9hcmQgb2JqZWN0ICovXG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi4vc3JjL3NoaXAuanMnO1xuXG4vKlxuSU5TVFJVQ1RJT05TXG5cbkdhbWVib2FyZHMgc2hvdWxkIGJlIGFibGUgdG8gcGxhY2Ugc2hpcHMgYXQgc3BlY2lmaWMgY29vcmRpbmF0ZXNcbmJ5IGNhbGxpbmcgdGhlIHNoaXAgZmFjdG9yeSBmdW5jdGlvbi5cblxuR2FtZWJvYXJkcyBzaG91bGQgaGF2ZSBhIHJlY2VpdmVBdHRhY2sgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHBhaXJcbm9mIGNvb3JkaW5hdGVzLCBkZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBhdHRhY2sgaGl0IGEgc2hpcFxuYW5kIHRoZW4gc2VuZHMgdGhlIOKAmGhpdOKAmSBmdW5jdGlvbiB0byB0aGUgY29ycmVjdCBzaGlwLFxub3IgcmVjb3JkcyB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIG1pc3NlZCBzaG90LlxuXG5HYW1lYm9hcmRzIHNob3VsZCBrZWVwIHRyYWNrIG9mIG1pc3NlZCBhdHRhY2tzXG5zbyB0aGV5IGNhbiBkaXNwbGF5IHRoZW0gcHJvcGVybHkuXG5cbkdhbWVib2FyZHMgc2hvdWxkIGJlIGFibGUgdG8gcmVwb3J0IHdoZXRoZXIgb3Igbm90XG5hbGwgb2YgdGhlaXIgc2hpcHMgaGF2ZSBiZWVuIHN1bmsuXG4qL1xuXG5leHBvcnQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQgPSB0aGlzLnNldEdhbWVib2FyZCgpO1xuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MgPSBbXTtcbiAgICAgICAgdGhpcy5TaGlwcyA9IFtdO1xuICAgIH1cblxuICAgIHNldEdhbWVib2FyZCgpIHtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgZ2FtZWJvYXJkIGFzIGEgaGFzaG1hcCBvZiBjb29yZGluYXRlcy5cbiAgICAgICAgLy8gSWYgYSBjb29yZCBob2xkcyBhIHNoaXAsIGl0IHdpbGwgYmUgYWRkZWQgdG8gdGhhdCBjb29yZC5cblxuICAgICAgICAvLyBTZXQgdGhlIGJvYXJkIHNpemUuIFNpemVzIGJleW9uZCAyNiB3aWxsIGNhdXNlIGlzc3Vlcy5cbiAgICAgICAgY29uc3Qgc2lkZUxlbmd0aCA9IDEwO1xuXG4gICAgICAgIC8vIHgtY29vcmRzIGFyZSBjYXBpdGFsIGxldHRlcnNcbiAgICAgICAgLy8gQVNDSUkgY29kZSBmb3IgJ0EnIGlzIDY1LlxuICAgICAgICBjb25zdCB4Q29vcmRzID0gdGhpcy5nZXRYQ29vcmRzKHNpZGVMZW5ndGgsIDY1KTtcblxuICAgICAgICAvLyB5LWNvb3JkcyBhcmUgbnVtYmVyc1xuICAgICAgICBjb25zdCB5Q29vcmRzID0gdGhpcy5nZXRZQ29vcmRzKHNpZGVMZW5ndGgsIDEpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgZnVsbCBhcnJheSBvZiBjb29yZHNcbiAgICAgICAgY29uc3QgYWxsQ29vcmRzID0gdGhpcy5nZXRBbGxDb29yZHMoeENvb3JkcywgeUNvb3Jkcyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBudW1Db29yZHMgPSBhbGxDb29yZHMubGVuZ3RoO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgYSBuZXcgSGFzaG1hcFxuICAgICAgICBsZXQgYm9hcmRNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Db29yZHM7IGkrKykge1xuICAgICAgICAgICAgYm9hcmRNYXBbYWxsQ29vcmRzW2ldXSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2FyZE1hcCk7XG4gICAgICAgIHJldHVybiBib2FyZE1hcDtcbiAgICB9XG5cbiAgICBnZXRHYW1lYm9hcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVCb2FyZDtcbiAgICB9XG5cbiAgICBwbGFjZVNoaXAoc3RhcnRDb29yZCwgZmluaXNoQ29vcmQpIHtcbiAgICAgICAgLy8gT251cyBpcyBvbiBhbm90aGVyIG9iamVjdCB0byBlbnN1cmUgdmFsaWQgY29vcmRzLlxuXG4gICAgICAgIC8vIEdldCBsZW5ndGggb2YgdGhlIHNoaXBcbiAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IHRoaXMuZ2V0U2hpcExlbmd0aChzdGFydENvb3JkLCBmaW5pc2hDb29yZCk7XG4gICAgICAgIFxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBuZXcgc2hpcFxuICAgICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAoc2hpcExlbmd0aCk7XG5cbiAgICAgICAgbGV0IHNoaXBDb29yZEFycmF5ID0gW107XG4gICAgICAgIGxldCBzaGlwWENvb3JkcztcbiAgICAgICAgbGV0IHNoaXBZQ29vcmRzO1xuXG4gICAgICAgIC8vIEdldCBlYWNoIGNvb3JkIGluIHRoZSBhcnJheVxuICAgICAgICBpZiAoc3RhcnRDb29yZCA9PT0gZmluaXNoQ29vcmQpIHtcbiAgICAgICAgICAgIC8vIFNoaXAgaXMgb25lIHNxdWFyZS4gQWRkIHRoZSBjb29yZC5cbiAgICAgICAgICAgIHNoaXBDb29yZEFycmF5LnB1c2goc3RhcnRDb29yZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhcnRDb29yZFswXSA9PT0gZmluaXNoQ29vcmRbMF0pe1xuICAgICAgICAgICAgLy8gVGhlIHNoaXAgaXMgcG9zaXRpb25lZCBpbiB0aGUgeS1heGlzXG4gICAgICAgICAgICBzaGlwWENvb3JkcyA9IHN0YXJ0Q29vcmRbMF07XG4gICAgICAgICAgICBzaGlwWUNvb3JkcyA9IHRoaXMuZ2V0WUNvb3JkcyhzaGlwTGVuZ3RoLCBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICBwYXJzZUludChzdGFydENvb3JkLnNsaWNlKDEpKSxcbiAgICAgICAgICAgICAgICBwYXJzZUludChmaW5pc2hDb29yZC5zbGljZSgxKSksXG4gICAgICAgICAgICApKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhlIHNoaXAgaXMgcG9zaXRpb25lZCBpbiB0aGUgeC1heGlzXG4gICAgICAgICAgICBzaGlwWENvb3JkcyA9IHRoaXMuZ2V0WENvb3JkcyhzaGlwTGVuZ3RoLCBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICBzdGFydENvb3JkWzBdLmNoYXJDb2RlQXQoMCksXG4gICAgICAgICAgICAgICAgZmluaXNoQ29vcmRbMF0uY2hhckNvZGVBdCgwKSxcbiAgICAgICAgICAgICkpXG4gICAgICAgICAgICBzaGlwWUNvb3JkcyA9IHN0YXJ0Q29vcmQuc2xpY2UoMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzaGlwQ29vcmRBcnJheSA9IHRoaXMuZ2V0QWxsQ29vcmRzKHNoaXBYQ29vcmRzLCBzaGlwWUNvb3Jkcyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUJvYXJkW3NoaXBDb29yZEFycmF5W2ldXSA9IG5ld1NoaXA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLlNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZCkge1xuICAgICAgICBpZiAoISh0aGlzLmdhbWVCb2FyZFthdHRhY2tDb29yZF0pKSB7XG4gICAgICAgICAgICAvLyBObyBzaGlwIGF0IHRoZSBjb29yZC4gUmVjb3JkIG1pc3NlZCBzdHJpa2UuXG4gICAgICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MucHVzaChhdHRhY2tDb29yZCk7XG4gICAgICAgICAgICAvLyByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBTaGlwIGF0IHRoZSBjb29yZC4gQ2FsbCB0aGUgaGl0KCkgbWV0aG9kLlxuICAgICAgICAgICAgdGhpcy5nYW1lQm9hcmRbYXR0YWNrQ29vcmRdLmhpdCgpO1xuICAgICAgICAgICAgLy8gcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTaGlwTGVuZ3RoKHN0YXJ0Q29vcmQsIGZpbmlzaENvb3JkKSB7XG4gICAgICAgIGNvbnN0IHhEaWZmZXJlbmNlID0gMSArIHRoaXMuZ2V0QXNjaWlEaWZmZXJlbmNlKFxuICAgICAgICAgICAgc3RhcnRDb29yZFswXSxcbiAgICAgICAgICAgIGZpbmlzaENvb3JkWzBdXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgeURpZmZlcmVuY2UgPSAxICsgKFxuICAgICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoc3RhcnRDb29yZC5zbGljZSgxKSkgLSBcbiAgICAgICAgICAgICAgICBwYXJzZUludChmaW5pc2hDb29yZC5zbGljZSgxKSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoTWF0aC5tYXgoeERpZmZlcmVuY2UsIHlEaWZmZXJlbmNlKSk7XG4gICAgfVxuXG4gICAgZ2V0WENvb3Jkcyhjb3VudCwgZmlyc3RDaGFyKXtcbiAgICAgICAgLy8gWC1jb29yZHMgYXJlIGNhcGl0YWwgbGV0dGVycy5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXJyYXlGcm9tQXNjaWkoY291bnQsIGZpcnN0Q2hhcik7XG4gICAgfVxuXG4gICAgZ2V0WUNvb3Jkcyhjb3VudCwgc2VlZE51bSl7XG4gICAgICAgIC8vIFktY29vcmRzIGFyZSBudW1iZXJzXG5cbiAgICAgICAgbGV0IHlDb29yZHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHlDb29yZHMucHVzaCgoc2VlZE51bSArIGkpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHlDb29yZHM7XG4gICAgfVxuXG4gICAgZ2V0QWxsQ29vcmRzKHhDLCB5Qykge1xuICAgICAgICBsZXQgYWxsQ29vcmRzID0gW107XG5cbiAgICAgICAgY29uc3QgeExlbmd0aCA9IHhDLmxlbmd0aDtcbiAgICAgICAgY29uc3QgeUxlbmd0aCA9IHlDLmxlbmd0aDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHhMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB5TGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdDb29yZCA9IHhDW2ldICsgeUNbal07XG4gICAgICAgICAgICAgICAgYWxsQ29vcmRzLnB1c2gobmV3Q29vcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFsbENvb3JkcztcbiAgICB9XG5cbiAgICBnZXRBcnJheUZyb21Bc2NpaShjb3VudCwgZmlyc3RDaGFyQ29kZSkge1xuICAgICAgICBsZXQgYXNjaWlBcnJheSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgYXNjaWlBcnJheS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoZmlyc3RDaGFyQ29kZSArIGkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc2NpaUFycmF5O1xuICAgIH1cblxuICAgIGdldEFzY2lpRGlmZmVyZW5jZShjaGFyMSwgY2hhcjIpIHtcbiAgICAgICAgY29uc3QgYXNjaWkxID0gY2hhcjEuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgY29uc3QgYXNjaWkyID0gY2hhcjIuY2hhckNvZGVBdCgwKTtcbiAgICAgIFxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoYXNjaWkxIC0gYXNjaWkyKTtcbiAgICB9XG5cbiAgICBnZXRNaXNzZWRBdHRhY2tzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taXNzZWRBdHRhY2tzO1xuICAgIH1cblxuICAgIGdldEFsbFNoaXBzU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMuU2hpcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5TaGlwcy5ldmVyeSgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGlwLmlzU3VuaygpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBjb25zdCBteUdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcblxuLy8gbXlHYW1lYm9hcmQucGxhY2VTaGlwKFwiQTFcIiwgXCJBNVwiKTtcbi8vIG15R2FtZWJvYXJkLnBsYWNlU2hpcChcIkI3XCIsXCJIN1wiKTtcblxuLy8gbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhcIkExXCIpO1xuLy8gbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhcIkEyXCIpO1xuLy8gbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhcIkEzXCIpO1xuLy8gbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhcIkE0XCIpO1xuLy8gbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhcIkE1XCIpO1xuXG4vLyBteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFwiQzRcIik7XG5cbi8vIG15R2FtZWJvYXJkLmdldEdhbWVib2FyZCgpO1xuLy8gY29uc29sZS5sb2cobXlHYW1lYm9hcmQuZ2V0TWlzc2VkQXR0YWNrcygpKTsiLCIvKiBEZWZpbmVzIHRoZSBQbGF5ZXIgb2JqZWN0ICovXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuLi9zcmMvZ2FtZWJvYXJkLmpzJztcblxuLypcbklOU1RSVUNUSU9OU1xuXG5QbGF5ZXJzIGNhbiB0YWtlIHR1cm5zIHBsYXlpbmcgdGhlIGdhbWUgYnlcbmF0dGFja2luZyB0aGUgZW5lbXkgR2FtZWJvYXJkLlxuXG5UaGUgZ2FtZSBpcyBwbGF5ZWQgYWdhaW5zdCB0aGUgY29tcHV0ZXIsIHNvIG1ha2UgdGhlIOKAmGNvbXB1dGVy4oCZXG5jYXBhYmxlIG9mIG1ha2luZyByYW5kb20gcGxheXMuIFRoZSBBSSBkb2VzIG5vdCBoYXZlIHRvIGJlIHNtYXJ0LFxuYnV0IGl0IHNob3VsZCBrbm93IHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gbW92ZSBpcyBsZWdhbFxuKGkuZS4gaXQgc2hvdWxkbuKAmXQgc2hvb3QgdGhlIHNhbWUgY29vcmRpbmF0ZSB0d2ljZSkuXG4qL1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJHYW1lYm9hcmQgPSB0aGlzLnNldEdhbWVib2FyZCgpO1xuICAgICAgICB0aGlzLmFscmVhZHlDYWxsZWQgPSBbXTtcbiAgICB9XG5cbiAgICBzZW5kQXR0YWNrKGF0dGFja0Nvb3Jkcykge1xuICAgICAgICAvLyBPbmx5IHNlbnQgZm9yIG5ldyBjb29yZHNcbiAgICAgICAgdGhpcy5hbHJlYWR5Q2FsbGVkLnB1c2goYXR0YWNrQ29vcmRzKTtcbiAgICAgICAgcmV0dXJuIGF0dGFja0Nvb3JkcztcbiAgICB9XG5cbiAgICByZWNlaWV2ZUF0dGFjayhhdHRhY2tDb29yZHMpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZHMpOyAgICAgICAgXG4gICAgfVxuXG4gICAgc2V0R2FtZWJvYXJkKCkge1xuICAgICAgICByZXR1cm4gbmV3IEdhbWVib2FyZCgpO1xuICAgIH1cblxuICAgIHBsYWNlU2hpcChzdGFydENvb3JkLCBmaW5pc2hDb29yZCkge1xuICAgICAgICB0aGlzLnBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoc3RhcnRDb29yZCwgZmluaXNoQ29vcmQpO1xuICAgIH1cblxuICAgIGhhc0xvc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllckdhbWVib2FyZC5nZXRBbGxTaGlwc1N1bmsoKTtcbiAgICB9XG5cbiAgICBpc1ZhbGlkQXR0YWNrKGNvb3JkKSB7XG4gICAgICAgIHJldHVybiAoIShjb29yZCBpbiB0aGlzLmFscmVhZHlDYWxsZWQpKTtcbiAgICB9XG5cbiAgICBzZW5kUmFuZG9tQXR0YWNrKCkge1xuXG4gICAgICAgIGxldCBhdHRhY2tDb29yZHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29vcmRzIGFyZSB1bmRlZmluZWQ6IFwiICsgKGF0dGFja0Nvb3JkcyA9PT0gdW5kZWZpbmVkKSk7XG4gICAgICAgIFxuICAgICAgICB3aGlsZSAoXG4gICAgICAgICAgICBhdHRhY2tDb29yZHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgISh0aGlzLmlzVmFsaWRBdHRhY2soYXR0YWNrQ29vcmRzKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgeENvb3JkID0gdGhpcy5nZXRSYW5kb21MZXR0ZXIoKTtcbiAgICAgICAgICAgIGxldCB5Q29vcmQgPSB0aGlzLmdldFJhbmRvbU51bWJlcigxLCAxMCk7XG4gICAgICAgICAgICBhdHRhY2tDb29yZHMgPSB4Q29vcmQgKyB5Q29vcmQ7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh4Q29vcmQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coeUNvb3JkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGF0dGFja0Nvb3Jkcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRBdHRhY2soYXR0YWNrQ29vcmRzKTtcbiAgICB9XG5cbiAgICBnZXRSYW5kb21MZXR0ZXIoKSB7XG4gICAgICAgIGNvbnN0IHJhbmRvbUNoYXJDb2RlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgNjU7IC8vIEdlbmVyYXRlcyBBU0NJSSBjb2RlIGZvciBBLVpcbiAgICAgICAgY29uc3QgcmFuZG9tTGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShyYW5kb21DaGFyQ29kZSk7XG4gICAgICAgIHJldHVybiByYW5kb21MZXR0ZXI7XG4gICAgfVxuXG4gICAgZ2V0UmFuZG9tTnVtYmVyKG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAgIH1cbn1cbiIsIi8qIERlZmluZXMgdGhlIFNoaXAgb2JqZWN0ICovXG5cbi8qXG5JTlNUUlVDVElPTlMgXG5cbllvdXIg4oCYc2hpcHPigJkgd2lsbCBiZSBvYmplY3RzIHRoYXQgaW5jbHVkZSB0aGVpciBsZW5ndGgsXG50aGUgbnVtYmVyIG9mIHRpbWVzIHRoZXnigJl2ZSBiZWVuIGhpdCwgXG5hbmQgd2hldGhlciBvciBub3QgdGhleeKAmXZlIGJlZW4gc3Vuay5cblxuU2hpcHMgc2hvdWxkIGhhdmUgYSBoaXQoKSBmdW5jdGlvbiB0aGF0IGluY3JlYXNlcyB0aGVcbm51bWJlciBvZiDigJhoaXRz4oCZIGluIHlvdXIgc2hpcC5cblxuaXNTdW5rKCkgc2hvdWxkIGJlIGEgZnVuY3Rpb24gdGhhdCBjYWxjdWxhdGVzIHdoZXRoZXIgYVxuc2hpcCBpcyBjb25zaWRlcmVkIHN1bmsgYmFzZWQgb24gaXRzIGxlbmd0aCBhbmQgdGhlXG5udW1iZXIgb2YgaGl0cyBpdCBoYXMgcmVjZWl2ZWQuXG4qL1xuXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gICAgLy8gT251cyBpcyBvbiB0aGUgY29uc3RydWN0aW5nIG9iamVjdCB0byBlbnN1cmUgdmFsaWQgbGVuZ3Rocy5cbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMucmVjZWl2ZWRIaXRzID0gMDtcbiAgICAgICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICAvLyBJbmNyZW1lbnQgcmVjZWl2ZWRIaXRzLCBjYWxsIGlzU3VuaygpLiBJZiB0cnVlLCB1cGRhdGUgYm9vbC5cbiAgICAgICAgaWYgKCEodGhpcy5pc1N1bmsoKSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVjZWl2ZWRIaXRzKys7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaXNTdW5rKCkge1xuICAgICAgICAvLyBJZiB0aGUgbnVtYmVyIG9mIGhpdHMgPT09IGxlbmd0aCwgdGhlIHNoaXAgaXMgc3Vuay5cblxuICAgICAgICAvLyBPbnVzIGlzIG9uIGFub3RoZXIgb2JqZWN0IHRvIHByZXZlbnQgdGhlIHNhbWUgc3BvdCBiZWluZyBoaXQuXG4gICAgICAgIC8vIElmIHRoZSBzaGlwIGlzIHN1bmtlbiwgbm8gcGFyYW1ldGVycyBhcmUgdXBkYXRlZC5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5yZWNlaXZlZEhpdHMgPT09IHRoaXMubGVuZ3RoXG4gICAgICAgICk7ICAgXG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogUmVzcG9uc2libGUgZm9yIHRoZSBoaWdoLWxldmVsIGV4ZWN1dGlvbiBvZiB0aGUgYmF0dGxlc2hpcCBnYW1lICovXG5cbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4uL3NyYy9wbGF5ZXIuanMnO1xuXG5leHBvcnQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZmlyc3RQbGF5ZXI7XG4gICAgICAgIHRoaXMuc2Vjb25kUGxheWVyO1xuICAgICAgICB0aGlzLndpbm5lcjtcbiAgICAgICAgdGhpcy5zaG90c0ZpcmVkID0gMDtcblxuICAgICAgICAvLyBUaGVzZSB3aWxsIG5vdCBiZSB1c2VkIGF0IHRoZSBzdGFydFxuICAgICAgICB0aGlzLm51bVNoaXBzO1xuICAgICAgICB0aGlzLm51bVNxdWFyZXM7XG4gICAgfVxuXG4gICAgcGxheUdhbWUoKSB7XG4gICAgICAgIC8vIFNldCB0aGUgcGxheWVyc1xuICAgICAgICB0aGlzLnNldFBsYXllcnMoKTtcblxuICAgICAgICAvLyBTZXQgdGhlIHNoaXBzXG4gICAgICAgIHRoaXMuc2V0U2hpcHMoKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRvIG5vdCBwcmF5IGZvciBlYXN5IGxpdmVzXCIpO1xuXG4gICAgICAgIC8vIFdoaWxlIHRoZSBnYW1lIGlzIG5vdCBvdmVyLCBsZXQgdGhlbSB0YWtlIHR1cm5zIGZpcmluZ1xuICAgICAgICB3aGlsZSAoISh0aGlzLmlzR2FtZU92ZXIoKSkpIHtcbiAgICAgICAgICAgIC8vIEZpZ2h0IGJhYmF5XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlByYXkgdG8gYmVcIik7XG4gICAgICAgICAgICB0aGlzLmVuZ2FnZUluQ29tYmF0KHRoaXMuZmlyc3RQbGF5ZXIsIHRoaXMuc2Vjb25kUGxheWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMud2lubmVyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJIZXJlIGFyZSB0aGUgYm9hcmRzXCIpO1xuICAgIH1cblxuICAgIHNldFBsYXllcnMoKSB7XG4gICAgICAgIHRoaXMuZmlyc3RQbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgICAgIHRoaXMuc2Vjb25kUGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgIH1cblxuICAgIHNldFNoaXBzKCkge1xuICAgICAgICAvLyBTZXQgc2hpcHMgZm9yIFBsYXllciBPbmVcbiAgICAgICAgdGhpcy5maXJzdFBsYXllci5wbGFjZVNoaXAoJ0ExJywgJ0E0Jyk7XG4gICAgICAgIHRoaXMuZmlyc3RQbGF5ZXIucGxhY2VTaGlwKCdEMycsICdFMycpO1xuICAgICAgICB0aGlzLmZpcnN0UGxheWVyLnBsYWNlU2hpcCgnQzUnLCAnRjUnKTtcbiAgICAgICAgdGhpcy5maXJzdFBsYXllci5wbGFjZVNoaXAoJ0g3JywgJ0g4Jyk7XG5cbiAgICAgICAgLy8gU2V0IHNoaXBzIGZvciBQbGF5ZXIgVHdvXG4gICAgICAgIHRoaXMuc2Vjb25kUGxheWVyLnBsYWNlU2hpcCgnQTEnLCAnQTQnKTtcbiAgICAgICAgdGhpcy5zZWNvbmRQbGF5ZXIucGxhY2VTaGlwKCdEMycsICdFMycpO1xuICAgICAgICB0aGlzLnNlY29uZFBsYXllci5wbGFjZVNoaXAoJ0M1JywgJ0Y1Jyk7XG4gICAgICAgIHRoaXMuc2Vjb25kUGxheWVyLnBsYWNlU2hpcCgnSDcnLCAnSDgnKTtcbiAgICB9XG5cbiAgICBlbmdhZ2VJbkNvbWJhdChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3RzRmlyZWQgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlN0cm9uZ2VyIG1lblwiKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZVNob3QoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpcmVTaG90KHNlY29uZFBsYXllciwgZmlyc3RQbGF5ZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvdHNGaXJlZCsrO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnV2UgZmluaXNoZWQgb25lIGJpdCBvZiBjb21iYXQnKTtcbiAgICB9XG5cbiAgICBmaXJlU2hvdChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSB7XG4gICAgICAgIC8vIEdldCBjb29yZHMuIEZpcnN0IHBsYXllciBzdGF0ZSB1cGRhdGVkIHRvIGJlIHNlbnRcbiAgICAgICAgY29uc3QgYXR0YWNrQ29vcmRzID0gZmlyc3RQbGF5ZXIuc2VuZFJhbmRvbUF0dGFjaygpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhhdHRhY2tDb29yZHMpO1xuICAgICAgICBzZWNvbmRQbGF5ZXIucmVjZWlldmVBdHRhY2soYXR0YWNrQ29vcmRzKTtcbiAgICB9XG5cbiAgICBpc0dhbWVPdmVyKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNQbGF5ZXJMb3N0KHRoaXMuZmlyc3RQbGF5ZXIpKSB7XG4gICAgICAgICAgICAvLyBQbGF5ZXIgVHdvIGhhcyB3b24uXG4gICAgICAgICAgICB0aGlzLndpbm5lciA9IFwiUGxheWVyIFR3byBXaW5zIVwiO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNQbGF5ZXJMb3N0KHRoaXMuc2Vjb25kUGxheWVyKSkge1xuICAgICAgICAgICAgLy8gUGxheWVyIE9uZSBoYXMgd29uLlxuICAgICAgICAgICAgdGhpcy53aW5uZXIgPSBcIlBsYXllciBPbmUgV2lucyFcIjtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGhhc1BsYXllckxvc3QoYVBsYXllcikge1xuICAgICAgICByZXR1cm4gYVBsYXllci5oYXNMb3N0KCk7XG4gICAgfVxufSJdLCJuYW1lcyI6WyJTaGlwIiwiR2FtZWJvYXJkIiwiX2NsYXNzQ2FsbENoZWNrIiwiZ2FtZUJvYXJkIiwic2V0R2FtZWJvYXJkIiwibWlzc2VkQXR0YWNrcyIsIlNoaXBzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJzaWRlTGVuZ3RoIiwieENvb3JkcyIsImdldFhDb29yZHMiLCJ5Q29vcmRzIiwiZ2V0WUNvb3JkcyIsImFsbENvb3JkcyIsImdldEFsbENvb3JkcyIsIm51bUNvb3JkcyIsImxlbmd0aCIsImJvYXJkTWFwIiwiTWFwIiwiaSIsImdldEdhbWVib2FyZCIsInBsYWNlU2hpcCIsInN0YXJ0Q29vcmQiLCJmaW5pc2hDb29yZCIsInNoaXBMZW5ndGgiLCJnZXRTaGlwTGVuZ3RoIiwibmV3U2hpcCIsInNoaXBDb29yZEFycmF5Iiwic2hpcFhDb29yZHMiLCJzaGlwWUNvb3JkcyIsInB1c2giLCJNYXRoIiwibWluIiwicGFyc2VJbnQiLCJzbGljZSIsImNoYXJDb2RlQXQiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrQ29vcmQiLCJoaXQiLCJ4RGlmZmVyZW5jZSIsImdldEFzY2lpRGlmZmVyZW5jZSIsInlEaWZmZXJlbmNlIiwiYWJzIiwibWF4IiwiY291bnQiLCJmaXJzdENoYXIiLCJnZXRBcnJheUZyb21Bc2NpaSIsInNlZWROdW0iLCJ0b1N0cmluZyIsInhDIiwieUMiLCJ4TGVuZ3RoIiwieUxlbmd0aCIsImoiLCJuZXdDb29yZCIsImZpcnN0Q2hhckNvZGUiLCJhc2NpaUFycmF5IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2hhcjEiLCJjaGFyMiIsImFzY2lpMSIsImFzY2lpMiIsImdldE1pc3NlZEF0dGFja3MiLCJnZXRBbGxTaGlwc1N1bmsiLCJldmVyeSIsInNoaXAiLCJpc1N1bmsiLCJQbGF5ZXIiLCJwbGF5ZXJHYW1lYm9hcmQiLCJhbHJlYWR5Q2FsbGVkIiwic2VuZEF0dGFjayIsImF0dGFja0Nvb3JkcyIsInJlY2VpZXZlQXR0YWNrIiwiaGFzTG9zdCIsImlzVmFsaWRBdHRhY2siLCJjb29yZCIsInNlbmRSYW5kb21BdHRhY2siLCJ1bmRlZmluZWQiLCJ4Q29vcmQiLCJnZXRSYW5kb21MZXR0ZXIiLCJ5Q29vcmQiLCJnZXRSYW5kb21OdW1iZXIiLCJyYW5kb21DaGFyQ29kZSIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tTGV0dGVyIiwicmVjZWl2ZWRIaXRzIiwic3VuayIsIkdhbWUiLCJmaXJzdFBsYXllciIsInNlY29uZFBsYXllciIsIndpbm5lciIsInNob3RzRmlyZWQiLCJudW1TaGlwcyIsIm51bVNxdWFyZXMiLCJwbGF5R2FtZSIsInNldFBsYXllcnMiLCJzZXRTaGlwcyIsImlzR2FtZU92ZXIiLCJlbmdhZ2VJbkNvbWJhdCIsImNvbnNvbGUiLCJsb2ciLCJmaXJlU2hvdCIsImhhc1BsYXllckxvc3QiLCJhUGxheWVyIl0sInNvdXJjZVJvb3QiOiIifQ==
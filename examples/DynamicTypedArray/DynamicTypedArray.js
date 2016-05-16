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

	var _ = __webpack_require__(1);

	/*
	 * Test 1
	 */

	var bArray = new _.DynamicTypedArray({ chunkSize: 5 });

	console.log(bArray);

	for (var i = 0; i < 27; ++i) {
	  bArray.push(i);
	}

	console.log('Full array:');
	console.log(bArray.getFrozenArray());

	/*
	 * Test 2
	 */

	var bArray1 = new _.DynamicTypedArray({ chunkSize: 10 });

	console.log(bArray1);

	for (var _i = 0; _i < 30; ++_i) {
	  bArray1.push(_i);
	}

	console.log('Full array:');
	console.log(bArray1.getFrozenArray());

	/*
	 * Test 3
	 */

	var bArray2 = new _.DynamicTypedArray();

	console.log(bArray2);

	for (var _i2 = 0; _i2 < 100000; ++_i2) {
	  bArray2.push(_i2);
	}

	var frozenB = bArray2.getFrozenArray();
	console.log('Full array length: ' + frozenB.length);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DynamicTypedArray = exports.DynamicTypedArray = function () {
	  function DynamicTypedArray() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var _ref$chunkSize = _ref.chunkSize;
	    var chunkSize = _ref$chunkSize === undefined ? 65536 : _ref$chunkSize;
	    var _ref$arrayType = _ref.arrayType;
	    var arrayType = _ref$arrayType === undefined ? 'Int32Array' : _ref$arrayType;

	    _classCallCheck(this, DynamicTypedArray);

	    this.ArrayConstructor = window[arrayType];
	    this.chunkSize = chunkSize;
	    this.reset();
	  }

	  _createClass(DynamicTypedArray, [{
	    key: 'reset',
	    value: function reset() {
	      this.chunkContainer = [];
	      this.chunkContainer.push(new this.ArrayConstructor(this.chunkSize));
	      this.lastChunkItemCount = 0;
	    }
	  }, {
	    key: 'push',
	    value: function push(value) {
	      if (this.lastChunkItemCount === this.chunkSize) {
	        this.chunkContainer.push(new this.ArrayConstructor(this.chunkSize));
	        this.lastChunkItemCount = 0;
	      }
	      this.chunkContainer[this.chunkContainer.length - 1][this.lastChunkItemCount] = value;
	      this.lastChunkItemCount += 1;
	    }
	  }, {
	    key: 'getNumberOfElements',
	    value: function getNumberOfElements() {
	      return (this.chunkContainer.length - 1) * this.chunkSize + this.lastChunkItemCount;
	    }
	  }, {
	    key: 'getFrozenArray',
	    value: function getFrozenArray() {
	      var fullArray = new this.ArrayConstructor(this.getNumberOfElements());
	      for (var i = 0; i < this.chunkContainer.length - 1; ++i) {
	        fullArray.set(this.chunkContainer[i], i * this.chunkSize);
	      }

	      var indexOfLastChunk = this.chunkContainer.length - 1;

	      if (this.lastChunkItemCount < this.chunkSize) {
	        var buf = this.chunkContainer[indexOfLastChunk].buffer;
	        var bufLen = this.lastChunkItemCount; // mult by 4 in case it needs number of bytes
	        var partialChunkView = new this.ArrayConstructor(buf, 0, bufLen);
	        fullArray.set(partialChunkView, indexOfLastChunk * this.chunkSize);
	      } else {
	        // If the last chunk is completely full
	        fullArray.set(this.chunkContainer[indexOfLastChunk], indexOfLastChunk * this.chunkSize);
	      }

	      return fullArray;
	    }
	  }]);

	  return DynamicTypedArray;
	}();

/***/ }
/******/ ]);
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

	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var bbox = _2.default.newInstance();

	console.log('init', bbox.getBounds());
	bbox.addPoint(0, 0, 0);
	console.log('0, 0, 0', bbox.getBounds());
	bbox.addPoint(1, 2, 3);
	console.log('1, 2, 3', bbox.getBounds());
	bbox.addPoint(-3, -2, -5);
	console.log('-3, -2, -5', bbox.getBounds());

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = exports.INIT_BOUNDS = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.extend = extend;

	var _macro = __webpack_require__(2);

	var macro = _interopRequireWildcard(_macro);

	var _Plane = __webpack_require__(3);

	var _Plane2 = _interopRequireDefault(_Plane);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var INIT_BOUNDS = exports.INIT_BOUNDS = [Number.MAX_VALUE, Number.MIN_VALUE, // X
	Number.MAX_VALUE, Number.MIN_VALUE, // Y
	Number.MAX_VALUE, Number.MIN_VALUE];

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	// Z
	function isValid(bounds) {
	  return bounds[0] <= bounds[1] && bounds[2] <= bounds[3] && bounds[4] <= bounds[5];
	}

	function getCenter(bounds) {
	  return [0.5 * (bounds[0] + bounds[1]), 0.5 * (bounds[2] + bounds[3]), 0.5 * (bounds[4] + bounds[5])];
	}

	function getLength(bounds, index) {
	  return bounds[index * 2 + 1] - bounds[index * 2];
	}

	function getLengths(bounds) {
	  return [getLength(bounds, 0), getLength(bounds, 1), getLength(bounds, 2)];
	}

	function getXRange(bounds) {
	  return bounds.slice(0, 2);
	}

	function getYRange(bounds) {
	  return bounds.slice(2, 4);
	}

	function getZRange(bounds) {
	  return bounds.slice(4, 6);
	}

	function getMaxLength(bounds) {
	  var l = getLengths(bounds);
	  if (l[0] > l[1]) {
	    if (l[0] > l[2]) {
	      return l[0];
	    }
	    return l[2];
	  } else if (l[1] > l[2]) {
	    return l[1];
	  }
	  return l[2];
	}

	function getDiagonalLength(bounds) {
	  if (isValid(bounds)) {
	    var l = getLengths(bounds);
	    return Math.sqrt(l[0] * l[0] + l[1] * l[1] + l[2] * l[2]);
	  }
	  return null;
	}

	function oppositeSign(a, b) {
	  return a <= 0 && b >= 0 || a >= 0 && b <= 0;
	}

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	var STATIC = exports.STATIC = {
	  isValid: isValid,
	  getCenter: getCenter,
	  getLength: getLength,
	  getLengths: getLengths,
	  getMaxLength: getMaxLength,
	  getDiagonalLength: getDiagonalLength,
	  getXRange: getXRange,
	  getYRange: getYRange,
	  getZRange: getZRange
	};

	// ----------------------------------------------------------------------------
	// vtkBoundingBox methods
	// ----------------------------------------------------------------------------

	function vtkBoundingBox(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkBoundingBox');

	  publicAPI.clone = function () {
	    var bounds = [].concat(model.bounds);
	    /* eslint-disable no-use-before-define */
	    return newInstance({ bounds: bounds });
	    /* eslint-enable no-use-before-define */
	  };

	  publicAPI.equals = function (other) {
	    var a = model.bounds;
	    var b = other.getBounds();
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
	  };

	  publicAPI.setMinPoint = function (x, y, z) {
	    var _model$bounds = _slicedToArray(model.bounds, 6);

	    var xMin = _model$bounds[0];
	    var xMax = _model$bounds[1];
	    var yMin = _model$bounds[2];
	    var yMax = _model$bounds[3];
	    var zMin = _model$bounds[4];
	    var zMax = _model$bounds[5];

	    model.bounds = [x, x > xMax ? x : xMax, y, y > yMax ? y : yMax, z, z > zMax ? z : zMax];

	    return xMin !== x || yMin !== y || zMin !== z;
	  };

	  publicAPI.setMaxPoint = function (x, y, z) {
	    var _model$bounds2 = _slicedToArray(model.bounds, 6);

	    var xMin = _model$bounds2[0];
	    var xMax = _model$bounds2[1];
	    var yMin = _model$bounds2[2];
	    var yMax = _model$bounds2[3];
	    var zMin = _model$bounds2[4];
	    var zMax = _model$bounds2[5];

	    model.bounds = [x < xMin ? x : xMin, x, y < yMin ? y : yMin, y, z < zMin ? z : zMin, z];

	    return xMax !== x || yMax !== y || zMax !== z;
	  };

	  publicAPI.addPoint = function () {
	    for (var _len = arguments.length, xyz = Array(_len), _key = 0; _key < _len; _key++) {
	      xyz[_key] = arguments[_key];
	    }

	    model.bounds = model.bounds.map(function (value, index) {
	      if (index % 2 === 0) {
	        var _idx = index / 2;
	        return value < xyz[_idx] ? value : xyz[_idx];
	      }
	      var idx = (index - 1) / 2;
	      return value > xyz[idx] ? value : xyz[idx];
	    });
	  };

	  publicAPI.addBounds = function (xMin, xMax, yMin, yMax, zMin, zMax) {
	    var _model$bounds3 = _slicedToArray(model.bounds, 6);

	    var _xMin = _model$bounds3[0];
	    var _xMax = _model$bounds3[1];
	    var _yMin = _model$bounds3[2];
	    var _yMax = _model$bounds3[3];
	    var _zMin = _model$bounds3[4];
	    var _zMax = _model$bounds3[5];

	    model.bounds = [Math.min(xMin, _xMin), Math.max(xMax, _xMax), Math.min(yMin, _yMin), Math.max(yMax, _yMax), Math.min(zMin, _zMin), Math.max(zMax, _zMax)];
	  };

	  publicAPI.addBox = function (other) {
	    publicAPI.addBounds.apply(publicAPI, _toConsumableArray(other.getBounds()));
	  };

	  publicAPI.isValid = function () {
	    return isValid(model.bounds);
	  };

	  publicAPI.intersect = function (bbox) {
	    if (!(publicAPI.isValid() && bbox.isValid())) {
	      return false;
	    }

	    var newBounds = [0, 0, 0, 0, 0, 0];
	    var bBounds = bbox.getBounds();
	    var intersects = void 0;
	    for (var i = 0; i < 3; i++) {
	      intersects = false;
	      if (bBounds[i * 2] >= model.bounds[i * 2] && bBounds[i * 2] <= model.bounds[i * 2 + 1]) {
	        intersects = true;
	        newBounds[i * 2] = bBounds[i * 2];
	      } else if (model.bounds[i * 2] >= bBounds[i * 2] && model.bounds[i * 2] <= bBounds[i * 2 + 1]) {
	        intersects = true;
	        newBounds[i * 2] = model.bounds[i * 2];
	      }

	      if (bBounds[i * 2 + 1] >= model.bounds[i * 2] && bBounds[i * 2 + 1] <= model.bounds[i * 2 + 1]) {
	        intersects = true;
	        newBounds[i * 2 + 1] = bbox.MaxPnt[i];
	      } else if (model.bounds[i * 2 + 1] >= bbox.MinPnt[i * 2] && model.bounds[i * 2 + 1] <= bbox.MaxPnt[i * 2 + 1]) {
	        intersects = true;
	        newBounds[i * 2 + 1] = model.bounds[i * 2 + 1];
	      }

	      if (!intersects) {
	        return false;
	      }
	    }

	    // OK they did intersect - set the box to be the result
	    model.bounds = newBounds;
	    return true;
	  };

	  publicAPI.intersects = function (bbox) {
	    if (!(publicAPI.isValid() && bbox.isValid())) {
	      return false;
	    }
	    var bBounds = bbox.getBounds();
	    for (var i = 0; i < 3; i++) {
	      if (bBounds[i * 2] >= model.bounds[i * 2] && bBounds[i * 2] <= model.bounds[i * 2 + 1]) {
	        continue;
	      } else if (model.bounds[i * 2] >= bBounds[i * 2] && model.bounds[i * 2] <= bBounds[i * 2 + 1]) {
	        continue;
	      }

	      if (bBounds[i * 2 + 1] >= model.bounds[i * 2] && bBounds[i * 2 + 1] <= model.bounds[i * 2 + 1]) {
	        continue;
	      } else if (model.bounds[i * 2 + 1] >= bbox.MinPnt[i * 2] && model.bounds[i * 2 + 1] <= bbox.MaxPnt[i * 2 + 1]) {
	        continue;
	      }
	      return false;
	    }

	    return true;
	  };

	  publicAPI.intersectPlane = function (origin, normal) {
	    // Index[0..2] represents the order of traversing the corners of a cube
	    // in (x,y,z), (y,x,z) and (z,x,y) ordering, respectively
	    var index = [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 4, 5, 2, 3, 6, 7], [0, 2, 4, 6, 1, 3, 5, 7]];

	    // stores the signed distance to a plane
	    var d = [0, 0, 0, 0, 0, 0, 0, 0];
	    var idx = 0;
	    for (var ix = 0; ix < 2; ix++) {
	      for (var iy = 2; iy < 4; iy++) {
	        for (var iz = 4; iz < 6; iz++) {
	          var x = [model.bounds[ix], model.bounds[iy], model.bounds[iz]];
	          d[idx++] = _Plane2.default.evaluate(normal, origin, x);
	        }
	      }
	    }

	    var dir = 2;
	    while (dir--) {
	      // in each direction, we test if the vertices of two orthogonal faces
	      // are on either side of the plane
	      if (oppositeSign(d[index[dir][0]], d[index[dir][4]]) && oppositeSign(d[index[dir][1]], d[index[dir][5]]) && oppositeSign(d[index[dir][2]], d[index[dir][6]]) && oppositeSign(d[index[dir][3]], d[index[dir][7]])) {
	        break;
	      }
	    }

	    if (dir < 0) {
	      return false;
	    }

	    var sign = Math.sign(normal[dir]);
	    var size = Math.abs((model.bounds[dir * 2 + 1] - model.bounds[dir * 2]) * normal[dir]);
	    var t = sign > 0 ? 1 : 0;
	    for (var i = 0; i < 4; i++) {
	      if (size === 0) {
	        continue; // shouldn't happen
	      }
	      var ti = Math.abs(d[index[dir][i]]) / size;
	      if (sign > 0 && ti < t) {
	        t = ti;
	      }

	      if (sign < 0 && ti > t) {
	        t = ti;
	      }
	    }
	    var bound = (1.0 - t) * model.bounds[dir * 2] + t * model.bounds[dir * 2 + 1];

	    if (sign > 0) {
	      model.bounds[dir * 2] = bound;
	    } else {
	      model.bounds[dir * 2 + 1] = bound;
	    }

	    return true;
	  };

	  publicAPI.containsPoint = function (x, y, z) {
	    if (x < model.bounds[0] || x > model.bounds[1]) {
	      return false;
	    }

	    if (y < model.bounds[2] || y > model.bounds[3]) {
	      return false;
	    }

	    if (z < model.bounds[4] || z > model.bounds[5]) {
	      return false;
	    }

	    return true;
	  };

	  publicAPI.getMinPoint = function () {
	    return [model.bounds[0], model.bounds[2], model.bounds[4]];
	  };
	  publicAPI.getMaxPoint = function () {
	    return [model.bounds[1], model.bounds[3], model.bounds[5]];
	  };
	  publicAPI.getBound = function (index) {
	    return model.bound[index];
	  };

	  publicAPI.contains = function (bbox) {
	    // if either box is not valid or they don't intersect
	    if (!publicAPI.intersects(bbox)) {
	      return false;
	    }

	    if (!publicAPI.containsPoint.apply(publicAPI, _toConsumableArray(bbox.getMinPoint()))) {
	      return false;
	    }

	    if (!publicAPI.containsPoint.apply(publicAPI, _toConsumableArray(bbox.getMaxPoint()))) {
	      return 0;
	    }

	    return true;
	  };

	  publicAPI.getCenter = function () {
	    return getCenter(model.bounds);
	  };
	  publicAPI.getLength = function (index) {
	    return getLength(model.bounds, index);
	  };
	  publicAPI.getLengths = function () {
	    return getLengths(model.bounds);
	  };
	  publicAPI.getMaxLength = function () {
	    return getMaxLength(model.bounds);
	  };
	  publicAPI.getDiagonalLength = function () {
	    return getDiagonalLength(model.bounds);
	  };

	  publicAPI.reset = function () {
	    return publicAPI.setBounds([].concat(INIT_BOUNDS));
	  };

	  publicAPI.inflate = function (delta) {
	    model.bounds = model.bounds.map(function (value, index) {
	      if (index % 2 === 0) {
	        return value - delta;
	      }
	      return value + delta;
	    });
	  };

	  publicAPI.scale = function (sx, sy, sz) {
	    if (publicAPI.isValid()) {
	      var newBounds = [].concat(model.bounds);
	      if (sx >= 0.0) {
	        newBounds[0] *= sx;
	        newBounds[1] *= sx;
	      } else {
	        newBounds[0] = sx * model.bounds[1];
	        newBounds[1] = sx * model.bounds[0];
	      }

	      if (sy >= 0.0) {
	        newBounds[2] *= sy;
	        newBounds[3] *= sy;
	      } else {
	        newBounds[2] = sy * model.bounds[3];
	        newBounds[3] = sy * model.bounds[2];
	      }

	      if (sz >= 0.0) {
	        newBounds[4] *= sz;
	        newBounds[5] *= sz;
	      } else {
	        newBounds[4] = sz * model.bounds[5];
	        newBounds[5] = sz * model.bounds[4];
	      }

	      model.bounds = newBounds;
	      return true;
	    }
	    return false;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  bounds: [].concat(INIT_BOUNDS)
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, ['bounds']);
	  vtkBoundingBox(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.capitalize = capitalize;
	exports.obj = obj;
	exports.get = get;
	exports.set = set;
	exports.setGet = setGet;
	exports.getArray = getArray;
	exports.setArray = setArray;
	exports.setGetArray = setGetArray;
	exports.algo = algo;
	exports.event = event;
	exports.newInstance = newInstance;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var globalMTime = 0;
	// ----------------------------------------------------------------------------
	// capitilze provided string
	// ----------------------------------------------------------------------------

	function capitalize(str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// ----------------------------------------------------------------------------
	// vtkObject: modified(), onModified(callback), delete()
	// ----------------------------------------------------------------------------

	function obj(publicAPI) {
	  var model = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var callbacks = [];
	  model.mtime = globalMTime;
	  model.classHierarchy = ['vtkObject'];

	  function off(index) {
	    callbacks[index] = null;
	  }

	  function on(index) {
	    function unsubscribe() {
	      off(index);
	    }
	    return Object.freeze({ unsubscribe: unsubscribe });
	  }

	  publicAPI.modified = function () {
	    if (model.deleted) {
	      console.log('instance deleted - can not call any method');
	      return;
	    }

	    model.mtime = ++globalMTime;
	    callbacks.forEach(function (callback) {
	      return callback && callback(publicAPI);
	    });
	  };

	  publicAPI.onModified = function (callback) {
	    if (model.deleted) {
	      console.log('instance deleted - can not call any method');
	      return null;
	    }

	    var index = callbacks.length;
	    callbacks.push(callback);
	    return on(index);
	  };

	  publicAPI.getMTime = function () {
	    return model.mtime;
	  };

	  publicAPI.isA = function (className) {
	    return model.classHierarchy.indexOf(className) !== -1;
	  };

	  publicAPI.getClassName = function () {
	    return model.classHierarchy.slice(-1)[0];
	  };

	  publicAPI.set = function () {
	    var map = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    Object.keys(map).forEach(function (name) {
	      if (Array.isArray(map[name])) {
	        publicAPI['set' + capitalize(name)].apply(publicAPI, _toConsumableArray(map[name]));
	      } else {
	        publicAPI['set' + capitalize(name)](map[name]);
	      }
	    });
	  };

	  publicAPI.get = function () {
	    for (var _len = arguments.length, list = Array(_len), _key = 0; _key < _len; _key++) {
	      list[_key] = arguments[_key];
	    }

	    if (!list) {
	      return model;
	    }
	    var subset = {};
	    list.forEach(function (name) {
	      subset[name] = model[name];
	    });
	    return subset;
	  };

	  publicAPI.delete = function () {
	    Object.keys(model).forEach(function (field) {
	      return delete model[field];
	    });
	    callbacks.forEach(function (el, index) {
	      return off(index);
	    });

	    // Flag the instance beeing deleted
	    model.deleted = true;
	  };
	}

	// ----------------------------------------------------------------------------
	// getXXX: add getters
	// ----------------------------------------------------------------------------

	function get(publicAPI, model, fieldNames) {
	  fieldNames.forEach(function (field) {
	    if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
	      publicAPI['get' + capitalize(field.name)] = function () {
	        return model[field];
	      };
	    } else {
	      publicAPI['get' + capitalize(field)] = function () {
	        return model[field];
	      };
	    }
	  });
	}

	// ----------------------------------------------------------------------------
	// setXXX: add setters
	// ----------------------------------------------------------------------------

	var objectSetterMap = {
	  enum: function _enum(publicAPI, model, field) {
	    return function (value) {
	      if (typeof value === 'string') {
	        if (model.enum[value] !== undefined) {
	          if (model[field.name] !== model.enum[value]) {
	            model[field.name] = model.enum[value];
	            publicAPI.modified();
	            return true;
	          }
	          return false;
	        }
	        console.log('Set Enum with invalid argument', field, value);
	        return null;
	      }
	      if (typeof value === 'number') {
	        if (model[field.name] !== value) {
	          if (Object.keys(field.enum).map(function (key) {
	            return field.enum[key];
	          }).indexOf(value) !== -1) {
	            model[field.name] = value;
	            publicAPI.modified();
	            return true;
	          }
	          console.log('Set Enum outside range', field, value);
	        }
	        return false;
	      }
	      console.log('Set Enum with invalid argument (String/Number)', field, value);
	      return null;
	    };
	  }
	};

	function findSetter(field) {
	  if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
	    var _ret = function () {
	      var fn = objectSetterMap[field.type];
	      if (fn) {
	        return {
	          v: function v(publicAPI, model) {
	            return fn(publicAPI, model, field);
	          }
	        };
	      }

	      console.error('No setter for field', field);
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	  return function getSetter(publicAPI, model) {
	    return function setter(value) {
	      if (model.deleted) {
	        console.log('instance deleted - can not call any method');
	        return false;
	      }

	      if (model[field] !== value) {
	        model[field] = value;
	        publicAPI.modified();
	        return true;
	      }
	      return false;
	    };
	  };
	}

	function set(publicAPI, model, fields) {
	  fields.forEach(function (field) {
	    publicAPI['set' + capitalize(field)] = findSetter(field)(publicAPI, model);
	  });
	}

	// ----------------------------------------------------------------------------
	// set/get XXX: add both setters and getters
	// ----------------------------------------------------------------------------

	function setGet(publicAPI, model, fieldNames) {
	  get(publicAPI, model, fieldNames);
	  set(publicAPI, model, fieldNames);
	}

	// ----------------------------------------------------------------------------
	// getXXX: add getters for object of type array
	// ----------------------------------------------------------------------------

	function getArray(publicAPI, model, fieldNames) {
	  fieldNames.forEach(function (field) {
	    publicAPI['get' + capitalize(field)] = function () {
	      return [].concat(model[field]);
	    };
	  });
	}

	// ----------------------------------------------------------------------------
	// setXXX: add setter for object of type array
	// ----------------------------------------------------------------------------

	function setArray(publicAPI, model, fieldNames, size) {
	  fieldNames.forEach(function (field) {
	    publicAPI['set' + capitalize(field)] = function () {
	      for (var _len2 = arguments.length, array = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        array[_key2] = arguments[_key2];
	      }

	      if (model.deleted) {
	        console.log('instance deleted - can not call any method');
	        return;
	      }

	      var changeDetected = false;
	      model[field].forEach(function (item, index) {
	        if (item !== array[index]) {
	          if (changeDetected) {
	            return;
	          }
	          changeDetected = true;
	        }
	      });

	      if (changeDetected) {
	        model[field] = [].concat(array);
	        publicAPI.modified();
	      }
	    };
	  });
	}

	// ----------------------------------------------------------------------------
	// set/get XXX: add setter and getter for object of type array
	// ----------------------------------------------------------------------------

	function setGetArray(publicAPI, model, fieldNames, size) {
	  getArray(publicAPI, model, fieldNames);
	  setArray(publicAPI, model, fieldNames, size);
	}

	// ----------------------------------------------------------------------------
	// vtkAlgorithm: setInputData(), setInputConnection(), getOutput(), getOutputPort()
	// ----------------------------------------------------------------------------

	function algo(publicAPI, model, numberOfInputs, numberOfOutputs) {
	  model.inputData = [];
	  model.inputConnection = [];
	  model.output = [];

	  // Methods
	  function setInputData(dataset) {
	    var port = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	    if (model.deleted) {
	      console.log('instance deleted - can not call any method');
	      return;
	    }
	    model.inputData[port] = dataset;
	    model.inputConnection[port] = null;
	  }

	  function getInputData() {
	    var port = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	    return model.inputData[port] || model.inputConnection[port]();
	  }

	  function setInputConnection(outputPort) {
	    var port = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	    if (model.deleted) {
	      console.log('instance deleted - can not call any method');
	      return;
	    }
	    model.inputData[port] = null;
	    model.inputConnection[port] = outputPort;
	  }

	  function getOutput() {
	    var port = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	    if (model.deleted) {
	      console.log('instance deleted - can not call any method');
	      return null;
	    }
	    publicAPI.update();
	    return model.output[port];
	  }

	  function getOutputPort() {
	    var port = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	    return function () {
	      return getOutput(port);
	    };
	  }

	  // Handle input if needed
	  if (numberOfInputs) {
	    // Reserve inputs
	    var count = numberOfInputs;
	    while (count--) {
	      model.inputData.push(null);
	      model.inputConnection.push(null);
	    }

	    // Expose public methods
	    publicAPI.setInputData = setInputData;
	    publicAPI.setInputConnection = setInputConnection;
	    publicAPI.getInputData = getInputData;
	  }

	  if (numberOfOutputs) {
	    publicAPI.getOutput = getOutput;
	    publicAPI.getOutputPort = getOutputPort;
	  }
	}

	// ----------------------------------------------------------------------------
	// Event handling: onXXX(callback), invokeXXX(args...)
	// ----------------------------------------------------------------------------

	function event(publicAPI, model, eventName) {
	  var callbacks = [];
	  var previousDelete = publicAPI.delete;

	  function off(index) {
	    callbacks[index] = null;
	  }

	  function on(index) {
	    function unsubscribe() {
	      off(index);
	    }
	    return Object.freeze({ unsubscribe: unsubscribe });
	  }

	  publicAPI['invoke' + capitalize(eventName)] = function () {
	    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      args[_key3] = arguments[_key3];
	    }

	    if (model.deleted) {
	      console.log('instance deleted - can not call any method');
	      return;
	    }

	    callbacks.forEach(function (callback) {
	      return callback && callback.apply(publicAPI, args);
	    });
	  };

	  publicAPI['on' + capitalize(eventName)] = function (callback) {
	    if (model.deleted) {
	      console.log('instance deleted - can not call any method');
	      return null;
	    }

	    var index = callbacks.length;
	    callbacks.push(callback);
	    return on(index);
	  };

	  publicAPI.delete = function () {
	    previousDelete();
	    callbacks.forEach(function (el, index) {
	      return off(index);
	    });
	  };
	}

	// ----------------------------------------------------------------------------
	// newInstance
	// ----------------------------------------------------------------------------

	function newInstance(extend) {
	  return function () {
	    var initialValues = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var model = {};
	    var publicAPI = {};
	    extend(publicAPI, model, initialValues);
	    return Object.freeze(publicAPI);
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(2);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	function evaluate(normal, origin, x) {
	  return normal[0] * (x[0] - origin[0]) + normal[1] * (x[1] - origin[1]) + normal[2] * (x[2] - origin[2]);
	}

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	var STATIC = exports.STATIC = {
	  evaluate: evaluate
	};

	// ----------------------------------------------------------------------------
	// vtkPlane methods
	// ----------------------------------------------------------------------------

	function vtkPlane(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkPlane');
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, ['bounds']);
	  vtkPlane(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ }
/******/ ]);
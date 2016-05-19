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

	// Create cone source instance
	var coneSource = _2.default.newInstance({ height: 2.0 });

	var subscription = coneSource.onModified(function (s) {
	  console.log('source modified', s.getOutput().get('metadata').metadata.state);
	});

	console.log('height', coneSource.getHeight());
	console.log('resolution', coneSource.getResolution());
	console.log('radius', coneSource.getRadius());
	console.log('center', coneSource.getCenter());

	// Create dataset
	console.log('Output (height:2)', coneSource.getOutput());

	coneSource.setResolution(10);
	coneSource.setResolution(20);

	console.log('unsubscribe');
	subscription.unsubscribe();
	subscription = null;

	coneSource.setResolution(30);
	coneSource.setResolution(10);
	console.log('resolution', coneSource.getResolution());
	console.log('Output (resolution:10)', coneSource.getOutput());

	window.ds = coneSource.getOutput();

	// Delete source
	coneSource.delete();

	// Ask for dataset => should fail
	console.log('after delete ------------');
	console.log('output (delete)', coneSource.getOutput());
	console.log('height (delete)', coneSource.getHeight());
	console.log('resolution (delete)', coneSource.getResolution());
	console.log('radius (delete)', coneSource.getRadius());
	console.log('center (delete)', coneSource.getCenter());

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkConeSource = vtkConeSource;
	exports.extend = extend;

	var _macro = __webpack_require__(2);

	var macro = _interopRequireWildcard(_macro);

	var _BoundingBox = __webpack_require__(3);

	var _BoundingBox2 = _interopRequireDefault(_BoundingBox);

	var _DataSet = __webpack_require__(5);

	var _DataSet2 = _interopRequireDefault(_DataSet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkConeSource methods
	// ----------------------------------------------------------------------------

	function vtkConeSource(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkConeSource');

	  function update() {
	    if (model.deleted) {
	      return;
	    }

	    var dataset = model.output[0];
	    if (!dataset || dataset.getMTime() < model.mtime) {
	      (function () {
	        var state = {};
	        dataset = {
	          type: 'PolyData',
	          mtime: model.mtime,
	          metadata: {
	            source: 'ConeSource',
	            state: state
	          },
	          PolyData: {
	            Points: {
	              type: 'DataArray',
	              name: '_points',
	              tuple: 3,
	              dataType: model.pointType
	            },
	            Cells: {
	              Polys: {
	                type: 'DataArray',
	                name: '_polys',
	                tuple: 1,
	                dataType: 'Uint32Array'
	              }
	            }
	          }
	        };

	        // Add parameter used to create dataset as metadata.state[*]
	        ['height', 'radius', 'resolution', 'capping'].forEach(function (field) {
	          state[field] = model[field];
	        });
	        ['center', 'direction'].forEach(function (field) {
	          state[field] = [].concat(model[field]);
	        });

	        // ----------------------------------------------------------------------
	        var angle = 2 * Math.PI / model.resolution;
	        var xbot = -model.height / 2.0;
	        var numberOfPoints = model.resolution + 1;
	        var cellArraySize = 4 * model.resolution + 1 + model.resolution;

	        // Points
	        var pointIdx = 0;
	        var points = new window[dataset.PolyData.Points.dataType](numberOfPoints * 3);
	        dataset.PolyData.Points.values = points;

	        // Cells
	        var cellLocation = 0;
	        var polys = new window[dataset.PolyData.Cells.Polys.dataType](cellArraySize);
	        dataset.PolyData.Cells.Polys.values = polys;

	        var bbox = _BoundingBox2.default.newInstance();

	        // Add summit point
	        points[0] = model.height / 2.0;
	        points[1] = 0.0;
	        points[2] = 0.0;

	        bbox.addPoint(points[0], points[1], points[2]);

	        // Create bottom cell
	        if (model.capping) {
	          polys[cellLocation++] = model.resolution;
	        }

	        // Add all points
	        for (var i = 0; i < model.resolution; i++) {
	          pointIdx++;
	          points[pointIdx * 3 + 0] = xbot;
	          points[pointIdx * 3 + 1] = model.radius * Math.cos(i * angle);
	          points[pointIdx * 3 + 2] = model.radius * Math.sin(i * angle);

	          bbox.addPoint(points[pointIdx * 3 + 0], points[pointIdx * 3 + 1], points[pointIdx * 3 + 2]);

	          // Add points to bottom cell in reverse order
	          if (model.capping) {
	            polys[model.resolution - cellLocation++ + 1] = pointIdx;
	          }
	        }

	        // Add all triangle cells
	        for (var _i = 0; _i < model.resolution; _i++) {
	          polys[cellLocation++] = 3;
	          polys[cellLocation++] = 0;
	          polys[cellLocation++] = _i + 1;
	          polys[cellLocation++] = _i + 2 > model.resolution ? 1 : _i + 2;
	        }

	        console.log('setting the bounding box');
	        dataset.PolyData.Points.bounds = bbox.getBounds();
	        bbox.delete();

	        // FIXME apply tranform

	        // Update output
	        model.output[0] = _DataSet2.default.newInstance(dataset);
	      })();
	    }
	  }

	  // Expose methods
	  publicAPI.update = update;
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  height: 1.0,
	  radius: 0.5,
	  resolution: 6,
	  center: [0, 0, 0],
	  direction: [1.0, 0.0, 0.0],
	  capping: true,
	  pointType: 'Float32Array'
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, ['height', 'radius', 'resolution', 'capping']);
	  macro.setGetArray(publicAPI, model, ['center', 'direction'], 3);
	  macro.algo(publicAPI, model, 0, 1);
	  vtkConeSource(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

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
	exports.newInstance = exports.STATIC = exports.INIT_BOUNDS = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.extend = extend;

	var _macro = __webpack_require__(2);

	var macro = _interopRequireWildcard(_macro);

	var _Plane = __webpack_require__(4);

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
/* 4 */
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(2);

	var macro = _interopRequireWildcard(_macro);

	var _BoundingBox = __webpack_require__(3);

	var _BoundingBox2 = _interopRequireDefault(_BoundingBox);

	var _DataArray = __webpack_require__(6);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	var _DataSetAttributes = __webpack_require__(8);

	var _DataSetAttributes2 = _interopRequireDefault(_DataSetAttributes);

	var _Math = __webpack_require__(9);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	function getBounds(dataset) {
	  if (dataset.bounds) {
	    return dataset.bounds;
	  }
	  if (dataset.type && dataset[dataset.type]) {
	    var ds = dataset[dataset.type];
	    if (ds.bounds) {
	      return ds.bounds;
	    }
	    if (ds.Points && ds.Points.bounds) {
	      return ds.Points.bounds;
	    }

	    if (ds.Points && ds.Points.values) {
	      var array = ds.Points.values;
	      var bbox = _BoundingBox2.default.newInstance();
	      var size = array.length;
	      var delta = ds.Points.tuple ? ds.Points.tuple : 3;
	      for (var idx = 0; idx < size; idx += delta) {
	        bbox.addPoint(array[idx * delta], array[idx * delta + 1], array[idx * delta + 2]);
	      }
	      ds.Points.bounds = bbox.getBounds();
	      return ds.Points.bounds;
	    }
	  }
	  return _Math2.default.createUninitializedBouds();
	}

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	var STATIC = exports.STATIC = {
	  getBounds: getBounds
	};

	// ----------------------------------------------------------------------------
	// vtkDataArray methods
	// ----------------------------------------------------------------------------

	function vtkDataSet(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkDataSet');

	  // Expose dataset
	  var dataset = model[model.type];
	  publicAPI.dataset = dataset;

	  // Provide getPoints() if available
	  if (dataset.Points) {
	    (function () {
	      var points = _DataArray2.default.newInstance(dataset.Points);
	      publicAPI.getPoints = function () {
	        return points;
	      };
	    })();
	  }

	  ['PointData', 'CellData', 'FieldData'].forEach(function (dataCategoryName) {
	    var arrays = {};
	    if (dataset[dataCategoryName]) {
	      Object.keys(dataset[dataCategoryName]).forEach(function (name) {
	        if (dataset[dataCategoryName][name].type === 'DataArray') {
	          arrays[name] = _DataArray2.default.newInstance(dataset[dataCategoryName][name]);
	        }
	      });
	    }
	    // FIXME: missing active arrays...
	    publicAPI['get' + dataCategoryName] = function () {
	      return _DataSetAttributes2.default.newInstance({ arrays: arrays });
	    };
	  });

	  // UnstructuredGrid Cells + Types
	  if (model.type === 'UnstructuredGrid') {
	    ['Cells', 'CellsTypes'].forEach(function (arrayName) {
	      if (dataset[arrayName].type === 'DataArray') {
	        (function () {
	          var dataArray = _DataArray2.default.newInstance(dataset[arrayName]);
	          publicAPI['get' + arrayName] = function () {
	            return dataArray;
	          };
	        })();
	      }
	    });
	  }

	  // PolyData Cells
	  if (model.type === 'PolyData') {
	    ['Verts', 'Lines', 'Polys', 'Strips'].forEach(function (cellName) {
	      if (dataset.Cells[cellName]) {
	        (function () {
	          var dataArray = _DataArray2.default.newInstance(dataset.Cells[cellName]);
	          publicAPI['get' + cellName] = function () {
	            return dataArray;
	          };
	        })();
	      } else {
	        (function () {
	          var dataArray = _DataArray2.default.newInstance({ empty: true });
	          publicAPI['get' + cellName] = function () {
	            return dataArray;
	          };
	        })();
	      }
	    });
	  }
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

	  // Object specific methods
	  vtkDataSet(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(2);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(7);

	var _Constants2 = _interopRequireDefault(_Constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	function computeRange(values) {
	  var component = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	  var tuple = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	  var range = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };

	  if (component < 0) {
	    // Compute magnitude
	    console.log('vtkDataArray: Compute magnitude - NOT IMPLEMENTED');
	    return range;
	  }

	  var size = values.length;
	  for (var i = component; i < size; i += tuple) {
	    var value = values[i];
	    if (range.min > value) {
	      range.min = value;
	    }
	    if (range.max < value) {
	      range.max = value;
	    }
	  }

	  return range;
	}

	function insureRangeSize(rangeArray) {
	  var size = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	  var ranges = rangeArray || [];
	  // Pad ranges with null value to get the
	  while (ranges.length <= size) {
	    ranges.push(null);
	  }
	  return ranges;
	}

	function extractCellSizes(cellArray) {
	  var currentIdx = 0;
	  return cellArray.filter(function (value, index) {
	    if (index === currentIdx) {
	      currentIdx += value + 1;
	      return true;
	    }
	    return false;
	  });
	}

	function getNumberOfCells(cellArray) {
	  return extractCellSizes(cellArray).length;
	}

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	var STATIC = exports.STATIC = {
	  computeRange: computeRange,
	  extractCellSizes: extractCellSizes,
	  getNumberOfCells: getNumberOfCells
	};

	// ----------------------------------------------------------------------------
	// vtkDataArray methods
	// ----------------------------------------------------------------------------

	function vtkDataArray(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkDataArray');

	  publicAPI.getElementComponentSize = function () {
	    return model.values.BYTES_PER_ELEMENT;
	  };

	  // Description:
	  // Return the data component at the location specified by tupleIdx and
	  // compIdx.
	  publicAPI.getComponent = function (tupleIdx) {
	    var compIdx = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    return model.values[tupleIdx * model.tuple + compIdx];
	  };

	  // Description:
	  // Set the data component at the location specified by tupleIdx and compIdx
	  // to value.
	  // Note that i is less than NumberOfTuples and j is less than
	  //  NumberOfComponents. Make sure enough memory has been allocated
	  // (use SetNumberOfTuples() and SetNumberOfComponents()).
	  publicAPI.setComponent = function (tupleIdx, compIdx, value) {
	    if (value !== model.values[tupleIdx * model.tuple + compIdx]) {
	      model.values[tupleIdx * model.tuple + compIdx] = value;
	      publicAPI.modified();
	      model.ranges = null;
	    }
	  };

	  publicAPI.getData = function () {
	    return model.values;
	  };

	  publicAPI.getRange = function () {
	    var componentIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	    var rangeIdx = componentIndex < 0 ? model.tuple : componentIndex;
	    var range = null;

	    if (!model.ranges) {
	      model.ranges = insureRangeSize(model.ranges, model.tuple);
	    }
	    range = model.ranges[rangeIdx];

	    if (range) {
	      return [range.min, range.max];
	    }

	    // Need to compute ranges...
	    range = model.ranges[rangeIdx] = computeRange(model.values, componentIndex);
	    return [range.min, range.max];
	  };

	  publicAPI.getTupleLocation = function () {
	    var idx = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	    return idx * model.tuple;
	  };

	  publicAPI.getBounds = function () {
	    if (model.tuple === 3) {
	      return [].concat(publicAPI.getRange(0), publicAPI.getRange(1), publicAPI.getRange(2));
	    }

	    if (model.tuple !== 2) {
	      console.error('getBounds called on an array of tuple size', model.tuple, model);
	      return [1, -1, 1, -1, 1, -1];
	    }

	    return [].concat(publicAPI.getRange(0), publicAPI.getRange(1));
	  };

	  publicAPI.getNumberOfComponents = function () {
	    return model.tuple;
	  };
	  publicAPI.getNumberOfValues = function () {
	    return model.values.length;
	  };
	  publicAPI.getNumberOfTuples = function () {
	    return model.values.length / model.tuple;
	  };
	  publicAPI.getDataType = function () {
	    return model.dataType;
	  };

	  publicAPI.getNumberOfCells = function () {
	    if (model.numberOfCells !== undefined) {
	      return model.numberOfCells;
	    }

	    model.cellSizes = extractCellSizes(model.values);
	    model.numberOfCells = model.cellSizes.length;
	    return model.numberOfCells;
	  };

	  publicAPI.getCellSizes = function () {
	    if (model.cellSizes !== undefined) {
	      return model.cellSizes;
	    }

	    model.cellSizes = extractCellSizes(model.values);
	    return model.cellSizes;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  type: 'DataArray',
	  name: '',
	  tuple: 1,
	  size: 0,
	  dataType: _Constants2.default.DEFAULT_DATATYPE,
	  values: null,
	  ranges: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  if (model.values) {
	    model.size = model.values.length;
	  }

	  if (!model.empty && (!model.values || !model.size) || model.type !== 'DataArray') {
	    throw Error('Can not create DataArray object without: size > 0, values or type = DataArray');
	  }

	  if (!model.values) {
	    model.values = new window[model.dataType](model.size);
	  }

	  // Object methods
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, ['name']);

	  // Object specific methods
	  vtkDataArray(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BYTE_SIZE = exports.BYTE_SIZE = {
	  Int8Array: 1,
	  Uint8Array: 1,
	  Uint8ClampedArray: 1,
	  Int16Array: 2,
	  Uint16Array: 2,
	  Int32Array: 4,
	  Uint32Array: 4,
	  Float32Array: 4,
	  Float64Array: 8
	};

	var DEFAULT_DATATYPE = exports.DEFAULT_DATATYPE = 'Float32Array';

	exports.default = {
	  DEFAULT_DATATYPE: DEFAULT_DATATYPE,
	  BYTE_SIZE: BYTE_SIZE
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(2);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkDataSetAttributes methods
	// ----------------------------------------------------------------------------

	function vtkDataSetAttributes(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkDataSetAttributes');

	  publicAPI.getScalars = function () {
	    var array = model.arrays[model.activeScalars];
	    if (array) {
	      return array;
	    }
	    return null;
	  };

	  publicAPI.getVectors = function () {
	    var array = model.arrays[model.activeVectors];
	    if (array) {
	      return array;
	    }
	    return null;
	  };

	  publicAPI.getNormals = function () {
	    var array = model.arrays.Normals;
	    if (array) {
	      return array;
	    }
	    return null;
	  };

	  publicAPI.getTCoords = function () {
	    var array = model.arrays.TCoords; // FIXME is it the right array name?
	    if (array) {
	      return array;
	    }
	    return null;
	  };

	  publicAPI.getGlobalIds = function () {
	    var array = model.arrays[model.activeGlobalIds];
	    if (array) {
	      return array;
	    }
	    return null;
	  };

	  publicAPI.getPedigreeIds = function () {
	    var array = model.arrays[model.activePedigreeIds];
	    if (array) {
	      return array;
	    }
	    return null;
	  };

	  publicAPI.addArray = function (array) {
	    if (model.arrays[array.getName()]) {
	      throw new Error('Array with same name already exist', array, model.arrays);
	    }
	    model.arrays[array.getName()] = array;
	  };

	  publicAPI.removeArray = function (name) {
	    var array = model.arrays[name];
	    delete model.arrays[name];
	    return array;
	  };

	  publicAPI.getArrayNames = function () {
	    return Object.keys(model.arrays);
	  };
	  publicAPI.getArray = function (name) {
	    return model.arrays[name];
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  activeScalars: '',
	  activeVectors: '',
	  activeTensors: '',
	  activeGlobalIds: '',
	  activePedigreeIds: '',
	  arrays: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, ['activeScalars', 'activeVectors', 'activeTensors', 'activeGlobalIds', 'activePedigreeIds']);

	  if (!model.arrays) {
	    model.arrays = {};
	  }

	  // Object specific methods
	  vtkDataSetAttributes(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	// ----------------------------------------------------------------------------
	/* eslint-disable camelcase                                                  */
	/* eslint-disable no-cond-assign                                             */
	// ----------------------------------------------------------------------------
	var VTK_MAX_ROTATIONS = 20;
	var VTK_SMALL_NUMBER = 1.0e-12;

	function notImplemented(method) {
	  return function () {
	    return console.log('vtkMath::${method} - NOT IMPLEMENTED');
	  };
	}

	function vtkSwapVectors3(v1, v2) {
	  for (var i = 0; i < 3; i++) {
	    var tmp = v1[i];
	    v1[i] = v2[i];
	    v2[i] = tmp;
	  }
	}

	function createArray() {
	  var size = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

	  var array = [];
	  while (array.length < size) {
	    array.push(0);
	  }
	  return array;
	}

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	var Pi = function Pi() {
	  return Math.PI;
	};
	var radiansFromDegrees = function radiansFromDegrees(deg) {
	  return deg / 180 * Math.PI;
	};
	var degreesFromRadians = function degreesFromRadians(rad) {
	  return rad * 180 / Math.PI;
	};
	var round = Math.round;
	var floor = Math.floor;
	var ceil = Math.ceil;
	var ceilLog2 = notImplemented('ceilLog2');
	var min = Math.min;
	var max = Math.max;
	var isPowerOfTwo = notImplemented('isPowerOfTwo');
	var nearestPowerOfTwo = notImplemented('nearestPowerOfTwo');
	var factorial = notImplemented('factorial');

	function binomial(m, n) {
	  var r = 1;
	  for (var i = 1; i <= n; ++i) {
	    r *= (m - i + 1) / i;
	  }
	  return Math.floor(r);
	}

	function beginCombination(m, n) {
	  if (m < n) {
	    return 0;
	  }

	  var r = createArray(n);
	  for (var i = 0; i < n; ++i) {
	    r[i] = i;
	  }
	  return r;
	}

	function nextCombination(m, n, r) {
	  var status = 0;
	  for (var i = n - 1; i >= 0; --i) {
	    if (r[i] < m - n + i) {
	      var j = r[i] + 1;
	      while (i < n) {
	        r[i++] = j++;
	      }
	      status = 1;
	      break;
	    }
	  }
	  return status;
	}

	var randomSeed = notImplemented('randomSeed');
	var getSeed = notImplemented('getSeed');

	function random() {
	  var minValue = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	  var maxValue = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

	  var delta = maxValue - minValue;
	  return minValue + delta * Math.random();
	}

	var gaussian = notImplemented('gaussian');

	// Vect3 operations
	function add(a, b, out) {
	  out[0] = a[0] + b[0];
	  out[1] = a[1] + b[1];
	  out[2] = a[2] + b[2];
	}

	function subtract(a, b, out) {
	  out[0] = a[0] - b[0];
	  out[1] = a[1] - b[1];
	  out[2] = a[2] - b[2];
	}

	function multiplyScalar(vec, scalar) {
	  vec[0] *= scalar;
	  vec[1] *= scalar;
	  vec[2] *= scalar;
	}

	function multiplyScalar2D(vec, scalar) {
	  vec[0] *= scalar;
	  vec[1] *= scalar;
	}

	function dot(x, y) {
	  return x[0] * y[0] + x[1] * y[1] + x[2] * y[2];
	}

	function outer(x, y, out_3x3) {
	  for (var i = 0; i < 3; i++) {
	    for (var j = 0; j < 3; j++) {
	      out_3x3[i][j] = x[i] * y[j];
	    }
	  }
	}

	function cross(x, y, out) {
	  var Zx = x[1] * y[2] - x[2] * y[1];
	  var Zy = x[2] * y[0] - x[0] * y[2];
	  var Zz = x[0] * y[1] - x[1] * y[0];
	  out[0] = Zx;
	  out[1] = Zy;
	  out[2] = Zz;
	}

	function norm(x) {
	  var n = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];

	  switch (n) {
	    case 1:
	      return Math.abs(x);
	    case 2:
	      return Math.sqrt(x[0] * x[0] + x[1] * x[1]);
	    case 3:
	      return Math.sqrt(x[0] * x[0] + x[1] * x[1] + x[2] * x[2]);
	    default:
	      {
	        var sum = 0;
	        for (var i = 0; i < n; i++) {
	          sum += x[i] * x[i];
	        }
	        return Math.sqrt(sum);
	      }
	  }
	}

	function normalize(x) {
	  var den = norm(x);
	  if (den !== 0.0) {
	    x[0] /= den;
	    x[1] /= den;
	    x[2] /= den;
	  }
	  return den;
	}

	function perpendiculars(x, y, z, theta) {
	  var x2 = x[0] * x[0];
	  var y2 = x[1] * x[1];
	  var z2 = x[2] * x[2];
	  var r = Math.sqrt(x2 + y2 + z2);

	  var dx = void 0;
	  var dy = void 0;
	  var dz = void 0;

	  // transpose the vector to avoid divide-by-zero error
	  if (x2 > y2 && x2 > z2) {
	    dx = 0;
	    dy = 1;
	    dz = 2;
	  } else if (y2 > z2) {
	    dx = 1;
	    dy = 2;
	    dz = 0;
	  } else {
	    dx = 2;
	    dy = 0;
	    dz = 1;
	  }

	  var a = x[dx] / r;
	  var b = x[dy] / r;
	  var c = x[dz] / r;
	  var tmp = Math.sqrt(a * a + c * c);

	  if (theta !== 0) {
	    var sintheta = Math.sin(theta);
	    var costheta = Math.cos(theta);

	    if (y) {
	      y[dx] = (c * costheta - a * b * sintheta) / tmp;
	      y[dy] = sintheta * tmp;
	      y[dz] = (-a * costheta - b * c * sintheta) / tmp;
	    }

	    if (z) {
	      z[dx] = (-c * sintheta - a * b * costheta) / tmp;
	      z[dy] = costheta * tmp;
	      z[dz] = (a * sintheta - b * c * costheta) / tmp;
	    }
	  } else {
	    if (y) {
	      y[dx] = c / tmp;
	      y[dy] = 0;
	      y[dz] = -a / tmp;
	    }

	    if (z) {
	      z[dx] = -a * b / tmp;
	      z[dy] = tmp;
	      z[dz] = -b * c / tmp;
	    }
	  }
	}

	function projectVector(a, b, projection) {
	  var bSquared = dot(b, b);

	  if (bSquared === 0) {
	    projection[0] = 0;
	    projection[1] = 0;
	    projection[2] = 0;
	    return false;
	  }

	  var scale = dot(a, b) / bSquared;

	  for (var i = 0; i < 3; i++) {
	    projection[i] = b[i];
	  }
	  multiplyScalar(projection, scale);

	  return true;
	}

	function dot2D(x, y) {
	  return x[0] * y[0] + x[1] * y[1];
	}

	function projectVector2D(a, b, projection) {
	  var bSquared = dot2D(b, b);

	  if (bSquared === 0) {
	    projection[0] = 0;
	    projection[1] = 0;
	    return false;
	  }

	  var scale = dot2D(a, b) / bSquared;

	  for (var i = 0; i < 2; i++) {
	    projection[i] = b[i];
	  }
	  multiplyScalar2D(projection, scale);

	  return true;
	}

	function distance2BetweenPoints(x, y) {
	  return (x[0] - y[0]) * (x[0] - y[0]) + (x[1] - y[1]) * (x[1] - y[1]) + (x[2] - y[2]) * (x[2] - y[2]);
	}

	function angleBetweenVectors(v1, v2) {
	  var crossVect = [0, 0, 0];
	  cross(v1, v2, crossVect);
	  return Math.atan2(norm(cross), dot(v1, v2));
	}

	function gaussianAmplitude(mean, variance, position) {
	  var distanceFromMean = Math.abs(mean - position);
	  return 1 / Math.sqrt(2 * Math.PI * variance) * Math.exp(-Math.pow(distanceFromMean, 2) / (2 * variance));
	}

	function gaussianWeight(mean, variance, position) {
	  var distanceFromMean = Math.abs(mean - position);
	  return Math.exp(-Math.pow(distanceFromMean, 2) / (2 * variance));
	}

	function outer2D(x, y, out_2x2) {
	  for (var i = 0; i < 2; i++) {
	    for (var j = 0; j < 2; j++) {
	      out_2x2[i][j] = x[i] * y[j];
	    }
	  }
	}

	function norm2D(x2D) {
	  return Math.sqrt(x2D[0] * x2D[0] + x2D[1] * x2D[1]);
	}

	function normalize2D(x) {
	  var den = norm2D(x);
	  if (den !== 0.0) {
	    x[0] /= den;
	    x[1] /= den;
	  }
	  return den;
	}

	function determinant2x2(c1, c2) {
	  return c1[0] * c2[1] - c2[0] * c1[1];
	}

	function LUFactor3x3(mat_3x3, index_3) {
	  var maxI = void 0;
	  var tmp = void 0;
	  var largest = void 0;
	  var scale = [0, 0, 0];

	  // Loop over rows to get implicit scaling information
	  for (var i = 0; i < 3; i++) {
	    largest = Math.abs(mat_3x3[i][0]);
	    if ((tmp = Math.abs(mat_3x3[i][1])) > largest) {
	      largest = tmp;
	    }
	    if ((tmp = Math.abs(mat_3x3[i][2])) > largest) {
	      largest = tmp;
	    }
	    scale[i] = 1 / largest;
	  }

	  // Loop over all columns using Crout's method

	  // first column
	  largest = scale[0] * Math.abs(mat_3x3[0][0]);
	  maxI = 0;
	  if ((tmp = scale[1] * Math.abs(mat_3x3[1][0])) >= largest) {
	    largest = tmp;
	    maxI = 1;
	  }
	  if ((tmp = scale[2] * Math.abs(mat_3x3[2][0])) >= largest) {
	    maxI = 2;
	  }
	  if (maxI !== 0) {
	    vtkSwapVectors3(mat_3x3[maxI], mat_3x3[0]);
	    scale[maxI] = scale[0];
	  }
	  index_3[0] = maxI;

	  mat_3x3[1][0] /= mat_3x3[0][0];
	  mat_3x3[2][0] /= mat_3x3[0][0];

	  // second column
	  mat_3x3[1][1] -= mat_3x3[1][0] * mat_3x3[0][1];
	  mat_3x3[2][1] -= mat_3x3[2][0] * mat_3x3[0][1];
	  largest = scale[1] * Math.abs(mat_3x3[1][1]);
	  maxI = 1;
	  if ((tmp = scale[2] * Math.abs(mat_3x3[2][1])) >= largest) {
	    maxI = 2;
	    vtkSwapVectors3(mat_3x3[2], mat_3x3[1]);
	    scale[2] = scale[1];
	  }
	  index_3[1] = maxI;
	  mat_3x3[2][1] /= mat_3x3[1][1];

	  // third column
	  mat_3x3[1][2] -= mat_3x3[1][0] * mat_3x3[0][2];
	  mat_3x3[2][2] -= mat_3x3[2][0] * mat_3x3[0][2] + mat_3x3[2][1] * mat_3x3[1][2];
	  index_3[2] = 2;
	}

	function LUSolve3x3(mat_3x3, index_3, x_3) {
	  // forward substitution
	  var sum = x_3[index_3[0]];
	  x_3[index_3[0]] = x_3[0];
	  x_3[0] = sum;

	  sum = x_3[index_3[1]];
	  x_3[index_3[1]] = x_3[1];
	  x_3[1] = sum - mat_3x3[1][0] * x_3[0];

	  sum = x_3[index_3[2]];
	  x_3[index_3[2]] = x_3[2];
	  x_3[2] = sum - mat_3x3[2][0] * x_3[0] - mat_3x3[2][1] * x_3[1];

	  // back substitution
	  x_3[2] = x_3[2] / mat_3x3[2][2];
	  x_3[1] = (x_3[1] - mat_3x3[1][2] * x_3[2]) / mat_3x3[1][1];
	  x_3[0] = (x_3[0] - mat_3x3[0][1] * x_3[1] - mat_3x3[0][2] * x_3[2]) / mat_3x3[0][0];
	}

	function linearSolve3x3(mat_3x3, x_3, y_3) {
	  var a1 = mat_3x3[0][0];
	  var b1 = mat_3x3[0][1];
	  var c1 = mat_3x3[0][2];
	  var a2 = mat_3x3[1][0];
	  var b2 = mat_3x3[1][1];
	  var c2 = mat_3x3[1][2];
	  var a3 = mat_3x3[2][0];
	  var b3 = mat_3x3[2][1];
	  var c3 = mat_3x3[2][2];

	  // Compute the adjoint
	  var d1 = +determinant2x2(b2, b3, c2, c3);
	  var d2 = -determinant2x2(a2, a3, c2, c3);
	  var d3 = +determinant2x2(a2, a3, b2, b3);

	  var e1 = -determinant2x2(b1, b3, c1, c3);
	  var e2 = +determinant2x2(a1, a3, c1, c3);
	  var e3 = -determinant2x2(a1, a3, b1, b3);

	  var f1 = +determinant2x2(b1, b2, c1, c2);
	  var f2 = -determinant2x2(a1, a2, c1, c2);
	  var f3 = +determinant2x2(a1, a2, b1, b2);

	  // Compute the determinant
	  var det = a1 * d1 + b1 * d2 + c1 * d3;

	  // Multiply by the adjoint
	  var v1 = d1 * x_3[0] + e1 * x_3[1] + f1 * x_3[2];
	  var v2 = d2 * x_3[0] + e2 * x_3[1] + f2 * x_3[2];
	  var v3 = d3 * x_3[0] + e3 * x_3[1] + f3 * x_3[2];

	  // Divide by the determinant
	  y_3[0] = v1 / det;
	  y_3[1] = v2 / det;
	  y_3[2] = v3 / det;
	}

	function multiply3x3_vect3(mat_3x3, in_3, out_3) {
	  var x = mat_3x3[0][0] * in_3[0] + mat_3x3[0][1] * in_3[1] + mat_3x3[0][2] * in_3[2];
	  var y = mat_3x3[1][0] * in_3[0] + mat_3x3[1][1] * in_3[1] + mat_3x3[1][2] * in_3[2];
	  var z = mat_3x3[2][0] * in_3[0] + mat_3x3[2][1] * in_3[1] + mat_3x3[2][2] * in_3[2];

	  out_3[0] = x;
	  out_3[1] = y;
	  out_3[2] = z;
	}

	function multiply3x3_mat3(a_3x3, b_3x3, out_3x3) {
	  var tmp = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

	  for (var i = 0; i < 3; i++) {
	    tmp[0][i] = a_3x3[0][0] * b_3x3[0][i] + a_3x3[0][1] * b_3x3[1][i] + a_3x3[0][2] * b_3x3[2][i];
	    tmp[1][i] = a_3x3[1][0] * b_3x3[0][i] + a_3x3[1][1] * b_3x3[1][i] + a_3x3[1][2] * b_3x3[2][i];
	    tmp[2][i] = a_3x3[2][0] * b_3x3[0][i] + a_3x3[2][1] * b_3x3[1][i] + a_3x3[2][2] * b_3x3[2][i];
	  }

	  for (var j = 0; j < 3; j++) {
	    out_3x3[j][0] = tmp[j][0];
	    out_3x3[j][1] = tmp[j][1];
	    out_3x3[j][2] = tmp[j][2];
	  }
	}

	function multiplyMatrix(a, b, rowA, colA, rowB, colB, out_rowXcol) {
	  // we need colA == rowB
	  if (colA !== rowB) {
	    console.error('Number of columns of A must match number of rows of B.');
	  }

	  // output matrix is rowA*colB
	  // output row
	  for (var i = 0; i < rowA; i++) {
	    // output col
	    for (var j = 0; j < colB; j++) {
	      out_rowXcol[i][j] = 0;
	      // sum for this point
	      for (var k = 0; k < colA; k++) {
	        out_rowXcol[i][j] += a[i][k] * b[k][j];
	      }
	    }
	  }
	}

	function transpose3x3(in_3x3, outT_3x3) {
	  var tmp = void 0;
	  tmp = in_3x3[1][0];
	  outT_3x3[1][0] = in_3x3[0][1];
	  outT_3x3[0][1] = tmp;
	  tmp = in_3x3[2][0];
	  outT_3x3[2][0] = in_3x3[0][2];
	  outT_3x3[0][2] = tmp;
	  tmp = in_3x3[2][1];
	  outT_3x3[2][1] = in_3x3[1][2];
	  outT_3x3[1][2] = tmp;

	  outT_3x3[0][0] = in_3x3[0][0];
	  outT_3x3[1][1] = in_3x3[1][1];
	  outT_3x3[2][2] = in_3x3[2][2];
	}

	function invert3x3(in_3x3, outI_3x3) {
	  var a1 = in_3x3[0][0];
	  var b1 = in_3x3[0][1];
	  var c1 = in_3x3[0][2];
	  var a2 = in_3x3[1][0];
	  var b2 = in_3x3[1][1];
	  var c2 = in_3x3[1][2];
	  var a3 = in_3x3[2][0];
	  var b3 = in_3x3[2][1];
	  var c3 = in_3x3[2][2];

	  // Compute the adjoint
	  var d1 = +determinant2x2(b2, b3, c2, c3);
	  var d2 = -determinant2x2(a2, a3, c2, c3);
	  var d3 = +determinant2x2(a2, a3, b2, b3);

	  var e1 = -determinant2x2(b1, b3, c1, c3);
	  var e2 = +determinant2x2(a1, a3, c1, c3);
	  var e3 = -determinant2x2(a1, a3, b1, b3);

	  var f1 = +determinant2x2(b1, b2, c1, c2);
	  var f2 = -determinant2x2(a1, a2, c1, c2);
	  var f3 = +determinant2x2(a1, a2, b1, b2);

	  // Divide by the determinant
	  var det = a1 * d1 + b1 * d2 + c1 * d3;

	  outI_3x3[0][0] = d1 / det;
	  outI_3x3[1][0] = d2 / det;
	  outI_3x3[2][0] = d3 / det;

	  outI_3x3[0][1] = e1 / det;
	  outI_3x3[1][1] = e2 / det;
	  outI_3x3[2][1] = e3 / det;

	  outI_3x3[0][2] = f1 / det;
	  outI_3x3[1][2] = f2 / det;
	  outI_3x3[2][2] = f3 / det;
	}

	function identity3x3(mat_3x3) {
	  for (var i = 0; i < 3; i++) {
	    mat_3x3[i][0] = mat_3x3[i][1] = mat_3x3[i][2] = 0;
	    mat_3x3[i][i] = 1;
	  }
	}

	function determinant3x3(mat_3x3) {
	  return mat_3x3[0][0] * mat_3x3[1][1] * mat_3x3[2][2] + mat_3x3[1][0] * mat_3x3[2][1] * mat_3x3[0][2] + mat_3x3[2][0] * mat_3x3[0][1] * mat_3x3[1][2] - mat_3x3[0][0] * mat_3x3[2][1] * mat_3x3[1][2] - mat_3x3[1][0] * mat_3x3[0][1] * mat_3x3[2][2] - mat_3x3[2][0] * mat_3x3[1][1] * mat_3x3[0][2];
	}

	function quaternionToMatrix3x3(quat_4, mat_3x3) {
	  var ww = quat_4[0] * quat_4[0];
	  var wx = quat_4[0] * quat_4[1];
	  var wy = quat_4[0] * quat_4[2];
	  var wz = quat_4[0] * quat_4[3];

	  var xx = quat_4[1] * quat_4[1];
	  var yy = quat_4[2] * quat_4[2];
	  var zz = quat_4[3] * quat_4[3];

	  var xy = quat_4[1] * quat_4[2];
	  var xz = quat_4[1] * quat_4[3];
	  var yz = quat_4[2] * quat_4[3];

	  var rr = xx + yy + zz;
	  // normalization factor, just in case quaternion was not normalized
	  var f = 1 / (ww + rr);
	  var s = (ww - rr) * f;
	  f *= 2;

	  mat_3x3[0][0] = xx * f + s;
	  mat_3x3[1][0] = (xy + wz) * f;
	  mat_3x3[2][0] = (xz - wy) * f;

	  mat_3x3[0][1] = (xy - wz) * f;
	  mat_3x3[1][1] = yy * f + s;
	  mat_3x3[2][1] = (yz + wx) * f;

	  mat_3x3[0][2] = (xz + wy) * f;
	  mat_3x3[1][2] = (yz - wx) * f;
	  mat_3x3[2][2] = zz * f + s;
	}

	function jacobiN(a, n, w, v) {
	  var i = void 0;
	  var j = void 0;
	  var k = void 0;
	  var iq = void 0;
	  var ip = void 0;
	  var numPos = void 0;
	  var tresh = void 0;
	  var theta = void 0;
	  var t = void 0;
	  var tau = void 0;
	  var sm = void 0;
	  var s = void 0;
	  var h = void 0;
	  var g = void 0;
	  var c = void 0;
	  var tmp = void 0;
	  var b = createArray(n);
	  var z = createArray(n);

	  var vtkROTATE = function vtkROTATE(aa, ii, jj, kk, ll) {
	    g = aa[ii][jj];
	    h = aa[kk][ll];
	    a[ii][jj] = g - s * (h + g * tau);
	    a[kk][ll] = h + s * (g - h * tau);
	  };

	  // initialize
	  for (ip = 0; ip < n; ip++) {
	    for (iq = 0; iq < n; iq++) {
	      v[ip][iq] = 0.0;
	    }
	    v[ip][ip] = 1.0;
	  }
	  for (ip = 0; ip < n; ip++) {
	    b[ip] = w[ip] = a[ip][ip];
	    z[ip] = 0.0;
	  }

	  // begin rotation sequence
	  for (i = 0; i < VTK_MAX_ROTATIONS; i++) {
	    sm = 0.0;
	    for (ip = 0; ip < n - 1; ip++) {
	      for (iq = ip + 1; iq < n; iq++) {
	        sm += Math.abs(a[ip][iq]);
	      }
	    }
	    if (sm === 0.0) {
	      break;
	    }

	    // first 3 sweeps
	    if (i < 3) {
	      tresh = 0.2 * sm / (n * n);
	    } else {
	      tresh = 0.0;
	    }

	    for (ip = 0; ip < n - 1; ip++) {
	      for (iq = ip + 1; iq < n; iq++) {
	        g = 100.0 * Math.abs(a[ip][iq]);

	        // after 4 sweeps
	        if (i > 3 && Math.abs(w[ip]) + g === Math.abs(w[ip]) && Math.abs(w[iq]) + g === Math.abs(w[iq])) {
	          a[ip][iq] = 0.0;
	        } else if (Math.abs(a[ip][iq]) > tresh) {
	          h = w[iq] - w[ip];
	          if (Math.abs(h) + g === Math.abs(h)) {
	            t = a[ip][iq] / h;
	          } else {
	            theta = 0.5 * h / a[ip][iq];
	            t = 1.0 / (Math.abs(theta) + Math.sqrt(1.0 + theta * theta));
	            if (theta < 0.0) {
	              t = -t;
	            }
	          }
	          c = 1.0 / Math.sqrt(1 + t * t);
	          s = t * c;
	          tau = s / (1.0 + c);
	          h = t * a[ip][iq];
	          z[ip] -= h;
	          z[iq] += h;
	          w[ip] -= h;
	          w[iq] += h;
	          a[ip][iq] = 0.0;

	          // ip already shifted left by 1 unit
	          for (j = 0; j <= ip - 1; j++) {
	            vtkROTATE(a, j, ip, j, iq);
	          }
	          // ip and iq already shifted left by 1 unit
	          for (j = ip + 1; j <= iq - 1; j++) {
	            vtkROTATE(a, ip, j, j, iq);
	          }
	          // iq already shifted left by 1 unit
	          for (j = iq + 1; j < n; j++) {
	            vtkROTATE(a, ip, j, iq, j);
	          }
	          for (j = 0; j < n; j++) {
	            vtkROTATE(v, j, ip, j, iq);
	          }
	        }
	      }
	    }

	    for (ip = 0; ip < n; ip++) {
	      b[ip] += z[ip];
	      w[ip] = b[ip];
	      z[ip] = 0.0;
	    }
	  }

	  // this is NEVER called
	  if (i >= VTK_MAX_ROTATIONS) {
	    console.warn('vtkMath::Jacobi: Error extracting eigenfunctions');
	    return 0;
	  }

	  // sort eigenfunctions: these changes do not affect accuracy
	  for (j = 0; j < n - 1; j++) {
	    // boundary incorrect
	    k = j;
	    tmp = w[k];
	    for (i = j + 1; i < n; i++) {
	      // boundary incorrect, shifted already
	      if (w[i] >= tmp) {
	        // why exchange if same?
	        k = i;
	        tmp = w[k];
	      }
	    }
	    if (k !== j) {
	      w[k] = w[j];
	      w[j] = tmp;
	      for (i = 0; i < n; i++) {
	        tmp = v[i][j];
	        v[i][j] = v[i][k];
	        v[i][k] = tmp;
	      }
	    }
	  }
	  // insure eigenvector consistency (i.e., Jacobi can compute vectors that
	  // are negative of one another (.707,.707,0) and (-.707,-.707,0). This can
	  // reek havoc in hyperstreamline/other stuff. We will select the most
	  // positive eigenvector.
	  var ceil_half_n = (n >> 1) + (n & 1);
	  for (j = 0; j < n; j++) {
	    for (numPos = 0, i = 0; i < n; i++) {
	      if (v[i][j] >= 0.0) {
	        numPos++;
	      }
	    }
	    //    if ( numPos < ceil(double(n)/double(2.0)) )
	    if (numPos < ceil_half_n) {
	      for (i = 0; i < n; i++) {
	        v[i][j] *= -1.0;
	      }
	    }
	  }
	  return 1;
	}

	function matrix3x3ToQuaternion(mat_3x3, quat_4) {
	  var tmp = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

	  // on-diagonal elements
	  tmp[0][0] = mat_3x3[0][0] + mat_3x3[1][1] + mat_3x3[2][2];
	  tmp[1][1] = mat_3x3[0][0] - mat_3x3[1][1] - mat_3x3[2][2];
	  tmp[2][2] = -mat_3x3[0][0] + mat_3x3[1][1] - mat_3x3[2][2];
	  tmp[3][3] = -mat_3x3[0][0] - mat_3x3[1][1] + mat_3x3[2][2];

	  // off-diagonal elements
	  tmp[0][1] = tmp[1][0] = mat_3x3[2][1] - mat_3x3[1][2];
	  tmp[0][2] = tmp[2][0] = mat_3x3[0][2] - mat_3x3[2][0];
	  tmp[0][3] = tmp[3][0] = mat_3x3[1][0] - mat_3x3[0][1];

	  tmp[1][2] = tmp[2][1] = mat_3x3[1][0] + mat_3x3[0][1];
	  tmp[1][3] = tmp[3][1] = mat_3x3[0][2] + mat_3x3[2][0];
	  tmp[2][3] = tmp[3][2] = mat_3x3[2][1] + mat_3x3[1][2];

	  var eigenvectors = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
	  var eigenvalues = [0, 0, 0, 0];

	  // convert into format that JacobiN can use,
	  // then use Jacobi to find eigenvalues and eigenvectors
	  var NTemp = [0, 0, 0, 0];
	  var eigenvectorsTemp = [0, 0, 0, 0];
	  for (var i = 0; i < 4; i++) {
	    NTemp[i] = tmp[i];
	    eigenvectorsTemp[i] = eigenvectors[i];
	  }
	  jacobiN(NTemp, 4, eigenvalues, eigenvectorsTemp);

	  // the first eigenvector is the one we want
	  quat_4[0] = eigenvectors[0][0];
	  quat_4[1] = eigenvectors[1][0];
	  quat_4[2] = eigenvectors[2][0];
	  quat_4[3] = eigenvectors[3][0];
	}

	function multiplyQuaternion(quat_1, quat_2, quat_out) {
	  var ww = quat_1[0] * quat_2[0];
	  var wx = quat_1[0] * quat_2[1];
	  var wy = quat_1[0] * quat_2[2];
	  var wz = quat_1[0] * quat_2[3];

	  var xw = quat_1[1] * quat_2[0];
	  var xx = quat_1[1] * quat_2[1];
	  var xy = quat_1[1] * quat_2[2];
	  var xz = quat_1[1] * quat_2[3];

	  var yw = quat_1[2] * quat_2[0];
	  var yx = quat_1[2] * quat_2[1];
	  var yy = quat_1[2] * quat_2[2];
	  var yz = quat_1[2] * quat_2[3];

	  var zw = quat_1[3] * quat_2[0];
	  var zx = quat_1[3] * quat_2[1];
	  var zy = quat_1[3] * quat_2[2];
	  var zz = quat_1[3] * quat_2[3];

	  quat_out[0] = ww - xx - yy - zz;
	  quat_out[1] = wx + xw + yz - zy;
	  quat_out[2] = wy - xz + yw + zx;
	  quat_out[3] = wz + xy - yx + zw;
	}

	function orthogonalize3x3(a_3x3, out_3x3) {
	  // copy the matrix
	  for (var i = 0; i < 3; i++) {
	    out_3x3[0][i] = a_3x3[0][i];
	    out_3x3[1][i] = a_3x3[1][i];
	    out_3x3[2][i] = a_3x3[2][i];
	  }

	  // Pivot the matrix to improve accuracy
	  var scale = createArray(3);
	  var index = createArray(3);
	  var largest = void 0;

	  // Loop over rows to get implicit scaling information
	  for (var _i = 0; _i < 3; _i++) {
	    var _x5 = Math.abs(out_3x3[_i][0]);
	    var _x6 = Math.abs(out_3x3[_i][1]);
	    var _x7 = Math.abs(out_3x3[_i][2]);
	    largest = _x6 > _x5 ? _x6 : _x5;
	    largest = _x7 > largest ? _x7 : largest;
	    scale[_i] = 1;
	    if (largest !== 0) {
	      scale[_i] /= largest;
	    }
	  }

	  // first column
	  var x1 = Math.abs(out_3x3[0][0]) * scale[0];
	  var x2 = Math.abs(out_3x3[1][0]) * scale[1];
	  var x3 = Math.abs(out_3x3[2][0]) * scale[2];
	  index[0] = 0;
	  largest = x1;
	  if (x2 >= largest) {
	    largest = x2;
	    index[0] = 1;
	  }
	  if (x3 >= largest) {
	    index[0] = 2;
	  }
	  if (index[0] !== 0) {
	    vtkSwapVectors3(out_3x3[index[0]], out_3x3[0]);
	    scale[index[0]] = scale[0];
	  }

	  // second column
	  var y2 = Math.abs(out_3x3[1][1]) * scale[1];
	  var y3 = Math.abs(out_3x3[2][1]) * scale[2];
	  index[1] = 1;
	  largest = y2;
	  if (y3 >= largest) {
	    index[1] = 2;
	    vtkSwapVectors3(out_3x3[2], out_3x3[1]);
	  }

	  // third column
	  index[2] = 2;

	  // A quaternion can only describe a pure rotation, not
	  // a rotation with a flip, therefore the flip must be
	  // removed before the matrix is converted to a quaternion.
	  var flip = 0;
	  if (determinant3x3(out_3x3) < 0) {
	    flip = 1;
	    for (var _i2 = 0; _i2 < 3; _i2++) {
	      out_3x3[0][_i2] = -out_3x3[0][_i2];
	      out_3x3[1][_i2] = -out_3x3[1][_i2];
	      out_3x3[2][_i2] = -out_3x3[2][_i2];
	    }
	  }

	  // Do orthogonalization using a quaternion intermediate
	  // (this, essentially, does the orthogonalization via
	  // diagonalization of an appropriately constructed symmetric
	  // 4x4 matrix rather than by doing SVD of the 3x3 matrix)
	  var quat = createArray(4);
	  matrix3x3ToQuaternion(out_3x3, quat);
	  quaternionToMatrix3x3(quat, out_3x3);

	  // Put the flip back into the orthogonalized matrix.
	  if (flip) {
	    for (var _i3 = 0; _i3 < 3; _i3++) {
	      out_3x3[0][_i3] = -out_3x3[0][_i3];
	      out_3x3[1][_i3] = -out_3x3[1][_i3];
	      out_3x3[2][_i3] = -out_3x3[2][_i3];
	    }
	  }

	  // Undo the pivoting
	  if (index[1] !== 1) {
	    vtkSwapVectors3(out_3x3[index[1]], out_3x3[1]);
	  }
	  if (index[0] !== 0) {
	    vtkSwapVectors3(out_3x3[index[0]], out_3x3[0]);
	  }
	}

	function diagonalize3x3(a_3x3, w_3, v_3x3) {
	  var i = void 0;
	  var j = void 0;
	  var k = void 0;
	  var maxI = void 0;
	  var tmp = void 0;
	  var maxVal = void 0;

	  // do the matrix[3][3] to **matrix conversion for Jacobi
	  var C = [createArray(3), createArray(3), createArray(3)];
	  var ATemp = createArray(3);
	  var VTemp = createArray(3);
	  for (i = 0; i < 3; i++) {
	    C[i][0] = a_3x3[i][0];
	    C[i][1] = a_3x3[i][1];
	    C[i][2] = a_3x3[i][2];
	    ATemp[i] = C[i];
	    VTemp[i] = v_3x3[i];
	  }

	  // diagonalize using Jacobi
	  jacobiN(ATemp, 3, w_3, VTemp);

	  // if all the eigenvalues are the same, return identity matrix
	  if (w_3[0] === w_3[1] && w_3[0] === w_3[2]) {
	    identity3x3(v_3x3);
	    return;
	  }

	  // transpose temporarily, it makes it easier to sort the eigenvectors
	  transpose3x3(v_3x3, v_3x3);

	  // if two eigenvalues are the same, re-orthogonalize to optimally line
	  // up the eigenvectors with the x, y, and z axes
	  for (i = 0; i < 3; i++) {
	    // two eigenvalues are the same
	    if (w_3[(i + 1) % 3] === w_3[(i + 2) % 3]) {
	      // find maximum element of the independent eigenvector
	      maxVal = Math.abs(v_3x3[i][0]);
	      maxI = 0;
	      for (j = 1; j < 3; j++) {
	        if (maxVal < (tmp = Math.abs(v_3x3[i][j]))) {
	          maxVal = tmp;
	          maxI = j;
	        }
	      }
	      // swap the eigenvector into its proper position
	      if (maxI !== i) {
	        tmp = w_3[maxI];
	        w_3[maxI] = w_3[i];
	        w_3[i] = tmp;
	        vtkSwapVectors3(v_3x3[i], v_3x3[maxI]);
	      }
	      // maximum element of eigenvector should be positive
	      if (v_3x3[maxI][maxI] < 0) {
	        v_3x3[maxI][0] = -v_3x3[maxI][0];
	        v_3x3[maxI][1] = -v_3x3[maxI][1];
	        v_3x3[maxI][2] = -v_3x3[maxI][2];
	      }

	      // re-orthogonalize the other two eigenvectors
	      j = (maxI + 1) % 3;
	      k = (maxI + 2) % 3;

	      v_3x3[j][0] = 0.0;
	      v_3x3[j][1] = 0.0;
	      v_3x3[j][2] = 0.0;
	      v_3x3[j][j] = 1.0;
	      cross(v_3x3[maxI], v_3x3[j], v_3x3[k]);
	      normalize(v_3x3[k]);
	      cross(v_3x3[k], v_3x3[maxI], v_3x3[j]);

	      // transpose vectors back to columns
	      transpose3x3(v_3x3, v_3x3);
	      return;
	    }
	  }

	  // the three eigenvalues are different, just sort the eigenvectors
	  // to align them with the x, y, and z axes

	  // find the vector with the largest x element, make that vector
	  // the first vector
	  maxVal = Math.abs(v_3x3[0][0]);
	  maxI = 0;
	  for (i = 1; i < 3; i++) {
	    if (maxVal < (tmp = Math.abs(v_3x3[i][0]))) {
	      maxVal = tmp;
	      maxI = i;
	    }
	  }
	  // swap eigenvalue and eigenvector
	  if (maxI !== 0) {
	    tmp = w_3[maxI];
	    w_3[maxI] = w_3[0];
	    w_3[0] = tmp;
	    vtkSwapVectors3(v_3x3[maxI], v_3x3[0]);
	  }
	  // do the same for the y element
	  if (Math.abs(v_3x3[1][1]) < Math.abs(v_3x3[2][1])) {
	    tmp = w_3[2];
	    w_3[2] = w_3[1];
	    w_3[1] = tmp;
	    vtkSwapVectors3(v_3x3[2], v_3x3[1]);
	  }

	  // ensure that the sign of the eigenvectors is correct
	  for (i = 0; i < 2; i++) {
	    if (v_3x3[i][i] < 0) {
	      v_3x3[i][0] = -v_3x3[i][0];
	      v_3x3[i][1] = -v_3x3[i][1];
	      v_3x3[i][2] = -v_3x3[i][2];
	    }
	  }
	  // set sign of final eigenvector to ensure that determinant is positive
	  if (determinant3x3(v_3x3) < 0) {
	    v_3x3[2][0] = -v_3x3[2][0];
	    v_3x3[2][1] = -v_3x3[2][1];
	    v_3x3[2][2] = -v_3x3[2][2];
	  }

	  // transpose the eigenvectors back again
	  transpose3x3(v_3x3, v_3x3);
	}

	function singularValueDecomposition3x3(a_3x3, u_3x3, w_3, vT_3x3) {
	  var i = void 0;
	  var B = [createArray(3), createArray(3), createArray(3)];

	  // copy so that A can be used for U or VT without risk
	  for (i = 0; i < 3; i++) {
	    B[0][i] = a_3x3[0][i];
	    B[1][i] = a_3x3[1][i];
	    B[2][i] = a_3x3[2][i];
	  }

	  // temporarily flip if determinant is negative
	  var d = determinant3x3(B);
	  if (d < 0) {
	    for (i = 0; i < 3; i++) {
	      B[0][i] = -B[0][i];
	      B[1][i] = -B[1][i];
	      B[2][i] = -B[2][i];
	    }
	  }

	  // orthogonalize, diagonalize, etc.
	  orthogonalize3x3(B, u_3x3);
	  transpose3x3(B, B);
	  multiply3x3_mat3(B, u_3x3, vT_3x3);
	  diagonalize3x3(vT_3x3, w_3, vT_3x3);
	  multiply3x3_mat3(u_3x3, vT_3x3, u_3x3);
	  transpose3x3(vT_3x3, vT_3x3);

	  // re-create the flip
	  if (d < 0) {
	    w_3[0] = -w_3[0];
	    w_3[1] = -w_3[1];
	    w_3[2] = -w_3[2];
	  }
	}

	function luFactorLinearSystem(A, index, size) {
	  var i = void 0;
	  var j = void 0;
	  var k = void 0;
	  var largest = void 0;
	  var maxI = 0;
	  var sum = void 0;
	  var temp1 = void 0;
	  var temp2 = void 0;
	  var scale = createArray(size);

	  //
	  // Loop over rows to get implicit scaling information
	  //
	  for (i = 0; i < size; i++) {
	    for (largest = 0.0, j = 0; j < size; j++) {
	      if ((temp2 = Math.abs(A[i][j])) > largest) {
	        largest = temp2;
	      }
	    }

	    if (largest === 0.0) {
	      console.warn('Unable to factor linear system');
	      return 0;
	    }
	    scale[i] = 1.0 / largest;
	  }
	  //
	  // Loop over all columns using Crout's method
	  //
	  for (j = 0; j < size; j++) {
	    for (i = 0; i < j; i++) {
	      sum = A[i][j];
	      for (k = 0; k < i; k++) {
	        sum -= A[i][k] * A[k][j];
	      }
	      A[i][j] = sum;
	    }
	    //
	    // Begin search for largest pivot element
	    //
	    for (largest = 0.0, i = j; i < size; i++) {
	      sum = A[i][j];
	      for (k = 0; k < j; k++) {
	        sum -= A[i][k] * A[k][j];
	      }
	      A[i][j] = sum;

	      if ((temp1 = scale[i] * Math.abs(sum)) >= largest) {
	        largest = temp1;
	        maxI = i;
	      }
	    }
	    //
	    // Check for row interchange
	    //
	    if (j !== maxI) {
	      for (k = 0; k < size; k++) {
	        temp1 = A[maxI][k];
	        A[maxI][k] = A[j][k];
	        A[j][k] = temp1;
	      }
	      scale[maxI] = scale[j];
	    }
	    //
	    // Divide by pivot element and perform elimination
	    //
	    index[j] = maxI;

	    if (Math.abs(A[j][j]) <= VTK_SMALL_NUMBER) {
	      console.warn('Unable to factor linear system');
	      return 0;
	    }

	    if (j !== size - 1) {
	      temp1 = 1.0 / A[j][j];
	      for (i = j + 1; i < size; i++) {
	        A[i][j] *= temp1;
	      }
	    }
	  }
	  return 1;
	}

	function luSolveLinearSystem(A, index, x, size) {
	  var i = void 0;
	  var j = void 0;
	  var ii = void 0;
	  var idx = void 0;
	  var sum = void 0;
	  //
	  // Proceed with forward and backsubstitution for L and U
	  // matrices.  First, forward substitution.
	  //
	  for (ii = -1, i = 0; i < size; i++) {
	    idx = index[i];
	    sum = x[idx];
	    x[idx] = x[i];

	    if (ii >= 0) {
	      for (j = ii; j <= i - 1; j++) {
	        sum -= A[i][j] * x[j];
	      }
	    } else if (sum !== 0.0) {
	      ii = i;
	    }

	    x[i] = sum;
	  }
	  //
	  // Now, back substitution
	  //
	  for (i = size - 1; i >= 0; i--) {
	    sum = x[i];
	    for (j = i + 1; j < size; j++) {
	      sum -= A[i][j] * x[j];
	    }
	    x[i] = sum / A[i][i];
	  }
	}

	function solveLinearSystem(A, x, size) {
	  // if we solving something simple, just solve it
	  if (size === 2) {
	    var y = createArray(2);
	    var det = determinant2x2(A[0][0], A[0][1], A[1][0], A[1][1]);

	    if (det === 0.0) {
	      // Unable to solve linear system
	      return 0;
	    }

	    y[0] = (A[1][1] * x[0] - A[0][1] * x[1]) / det;
	    y[1] = (-A[1][0] * x[0] + A[0][0] * x[1]) / det;

	    x[0] = y[0];
	    x[1] = y[1];
	    return 1;
	  } else if (size === 1) {
	    if (A[0][0] === 0.0) {
	      // Unable to solve linear system
	      return 0;
	    }

	    x[0] /= A[0][0];
	    return 1;
	  }

	  //
	  // System of equations is not trivial, use Crout's method
	  //

	  // Check on allocation of working vectors
	  var index = createArray(size);

	  // Factor and solve matrix
	  if (luFactorLinearSystem(A, index, size) === 0) {
	    return 0;
	  }
	  luSolveLinearSystem(A, index, x, size);

	  return 1;
	}

	function invertMatrix(A, AI, size) {
	  var index = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	  var column = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

	  var tmp1Size = index || createArray(size);
	  var tmp2Size = column || createArray(size);

	  // Factor matrix; then begin solving for inverse one column at a time.
	  // Note: tmp1Size returned value is used later, tmp2Size is just working
	  // memory whose values are not used in LUSolveLinearSystem
	  if (luFactorLinearSystem(A, tmp1Size, size, tmp2Size) === 0) {
	    return 0;
	  }

	  for (var j = 0; j < size; j++) {
	    for (var i = 0; i < size; i++) {
	      tmp2Size[i] = 0.0;
	    }
	    tmp2Size[j] = 1.0;

	    luSolveLinearSystem(A, tmp1Size, tmp2Size, size);

	    for (var _i4 = 0; _i4 < size; _i4++) {
	      AI[_i4][j] = tmp2Size[_i4];
	    }
	  }

	  return 1;
	}

	function estimateMatrixCondition(A, size) {
	  var minValue = +Number.MAX_VALUE;
	  var maxValue = -Number.MAX_VALUE;

	  // find the maximum value
	  for (var i = 0; i < size; i++) {
	    for (var j = i; j < size; j++) {
	      if (Math.abs(A[i][j]) > max) {
	        maxValue = Math.abs(A[i][j]);
	      }
	    }
	  }

	  // find the minimum diagonal value
	  for (var _i5 = 0; _i5 < size; _i5++) {
	    if (Math.abs(A[_i5][_i5]) < min) {
	      minValue = Math.abs(A[_i5][_i5]);
	    }
	  }

	  if (minValue === 0.0) {
	    return Number.MAX_VALUE;
	  }
	  return maxValue / minValue;
	}

	function jacobi(a_3x3, w, v) {
	  return jacobiN(a_3x3, 3, w, v);
	}

	function solveHomogeneousLeastSquares(numberOfSamples, xt, xOrder, mt) {
	  // check dimensional consistency
	  if (numberOfSamples < xOrder) {
	    console.warn('Insufficient number of samples. Underdetermined.');
	    return 0;
	  }

	  var i = void 0;
	  var j = void 0;
	  var k = void 0;

	  // set up intermediate variables
	  // Allocate matrix to hold X times transpose of X
	  var XXt = createArray(xOrder); // size x by x
	  // Allocate the array of eigenvalues and eigenvectors
	  var eigenvals = createArray(xOrder);
	  var eigenvecs = createArray(xOrder);

	  // Clear the upper triangular region (and btw, allocate the eigenvecs as well)
	  for (i = 0; i < xOrder; i++) {
	    eigenvecs[i] = createArray(xOrder);
	    XXt[i] = createArray(xOrder);
	    for (j = 0; j < xOrder; j++) {
	      XXt[i][j] = 0.0;
	    }
	  }

	  // Calculate XXt upper half only, due to symmetry
	  for (k = 0; k < numberOfSamples; k++) {
	    for (i = 0; i < xOrder; i++) {
	      for (j = i; j < xOrder; j++) {
	        XXt[i][j] += xt[k][i] * xt[k][j];
	      }
	    }
	  }

	  // now fill in the lower half of the XXt matrix
	  for (i = 0; i < xOrder; i++) {
	    for (j = 0; j < i; j++) {
	      XXt[i][j] = XXt[j][i];
	    }
	  }

	  // Compute the eigenvectors and eigenvalues
	  jacobiN(XXt, xOrder, eigenvals, eigenvecs);

	  // Smallest eigenval is at the end of the list (xOrder-1), and solution is
	  // corresponding eigenvec.
	  for (i = 0; i < xOrder; i++) {
	    mt[i][0] = eigenvecs[i][xOrder - 1];
	  }

	  return 1;
	}

	function solveLeastSquares(numberOfSamples, xt, xOrder, yt, yOrder, mt) {
	  var checkHomogeneous = arguments.length <= 6 || arguments[6] === undefined ? true : arguments[6];

	  // check dimensional consistency
	  if (numberOfSamples < xOrder || numberOfSamples < yOrder) {
	    console.warn('Insufficient number of samples. Underdetermined.');
	    return 0;
	  }

	  var homogenFlags = createArray(yOrder);
	  var allHomogeneous = 1;
	  var hmt = void 0;
	  var homogRC = 0;
	  var i = void 0;
	  var j = void 0;
	  var k = void 0;
	  var someHomogeneous = 0;

	  // Ok, first init some flags check and see if all the systems are homogeneous
	  if (checkHomogeneous) {
	    // If Y' is zero, it's a homogeneous system and can't be solved via
	    // the pseudoinverse method. Detect this case, warn the user, and
	    // invoke SolveHomogeneousLeastSquares instead. Note that it doesn't
	    // really make much sense for yOrder to be greater than one in this case,
	    // since that's just yOrder occurrences of a 0 vector on the RHS, but
	    // we allow it anyway. N

	    // Initialize homogeneous flags on a per-right-hand-side basis
	    for (j = 0; j < yOrder; j++) {
	      homogenFlags[j] = 1;
	    }
	    for (i = 0; i < numberOfSamples; i++) {
	      for (j = 0; j < yOrder; j++) {
	        if (Math.abs(yt[i][j]) > VTK_SMALL_NUMBER) {
	          allHomogeneous = 0;
	          homogenFlags[j] = 0;
	        }
	      }
	    }

	    // If we've got one system, and it's homogeneous, do it and bail out quickly.
	    if (allHomogeneous && yOrder === 1) {
	      console.warn('Detected homogeneous system (Y=0), calling SolveHomogeneousLeastSquares()');
	      return solveHomogeneousLeastSquares(numberOfSamples, xt, xOrder, mt);
	    }

	    // Ok, we've got more than one system of equations.
	    // Figure out if we need to calculate the homogeneous equation solution for
	    // any of them.
	    if (allHomogeneous) {
	      someHomogeneous = 1;
	    } else {
	      for (j = 0; j < yOrder; j++) {
	        if (homogenFlags[j]) {
	          someHomogeneous = 1;
	        }
	      }
	    }
	  }

	  // If necessary, solve the homogeneous problem
	  if (someHomogeneous) {
	    // hmt is the homogeneous equation version of mt, the general solution.
	    hmt = createArray(xOrder);
	    for (j = 0; j < xOrder; j++) {
	      // Only allocate 1 here, not yOrder, because here we're going to solve
	      // just the one homogeneous equation subset of the entire problem
	      hmt[j] = [0];
	    }

	    // Ok, solve the homogeneous problem
	    homogRC = solveHomogeneousLeastSquares(numberOfSamples, xt, xOrder, hmt);
	  }

	  // set up intermediate variables
	  var XXt = createArray(xOrder); // size x by x
	  var XXtI = createArray(xOrder); // size x by x
	  var XYt = createArray(xOrder); // size x by y
	  for (i = 0; i < xOrder; i++) {
	    XXt[i] = createArray(xOrder);
	    XXtI[i] = createArray(xOrder);

	    for (j = 0; j < xOrder; j++) {
	      XXt[i][j] = 0.0;
	      XXtI[i][j] = 0.0;
	    }

	    XYt[i] = createArray(yOrder);
	    for (j = 0; j < yOrder; j++) {
	      XYt[i][j] = 0.0;
	    }
	  }

	  // first find the pseudoinverse matrix
	  for (k = 0; k < numberOfSamples; k++) {
	    for (i = 0; i < xOrder; i++) {
	      // first calculate the XXt matrix, only do the upper half (symmetrical)
	      for (j = i; j < xOrder; j++) {
	        XXt[i][j] += xt[k][i] * xt[k][j];
	      }

	      // now calculate the XYt matrix
	      for (j = 0; j < yOrder; j++) {
	        XYt[i][j] += xt[k][i] * yt[k][j];
	      }
	    }
	  }

	  // now fill in the lower half of the XXt matrix
	  for (i = 0; i < xOrder; i++) {
	    for (j = 0; j < i; j++) {
	      XXt[i][j] = XXt[j][i];
	    }
	  }

	  var successFlag = invertMatrix(XXt, XXtI, xOrder);

	  // next get the inverse of XXt
	  if (successFlag) {
	    for (i = 0; i < xOrder; i++) {
	      for (j = 0; j < yOrder; j++) {
	        mt[i][j] = 0.0;
	        for (k = 0; k < xOrder; k++) {
	          mt[i][j] += XXtI[i][k] * XYt[k][j];
	        }
	      }
	    }
	  }

	  // Fix up any of the solutions that correspond to the homogeneous equation
	  // problem.
	  if (someHomogeneous) {
	    for (j = 0; j < yOrder; j++) {
	      if (homogenFlags[j]) {
	        // Fix this one
	        for (i = 0; i < xOrder; i++) {
	          mt[i][j] = hmt[i][0];
	        }
	      }
	    }
	  }

	  if (someHomogeneous) {
	    return homogRC && successFlag;
	  }

	  return successFlag;
	}

	function rgb2hsv(rgb, hsv) {
	  var h = void 0;
	  var s = void 0;

	  var _rgb = _slicedToArray(rgb, 3);

	  var r = _rgb[0];
	  var g = _rgb[1];
	  var b = _rgb[2];

	  var onethird = 1.0 / 3.0;
	  var onesixth = 1.0 / 6.0;
	  var twothird = 2.0 / 3.0;

	  var cmax = r;
	  var cmin = r;

	  if (g > cmax) {
	    cmax = g;
	  } else if (g < cmin) {
	    cmin = g;
	  }
	  if (b > cmax) {
	    cmax = b;
	  } else if (b < cmin) {
	    cmin = b;
	  }
	  var v = cmax;

	  if (v > 0.0) {
	    s = (cmax - cmin) / cmax;
	  } else {
	    s = 0.0;
	  }
	  if (s > 0) {
	    if (r === cmax) {
	      h = onesixth * (g - b) / (cmax - cmin);
	    } else if (g === cmax) {
	      h = onethird + onesixth * (b - r) / (cmax - cmin);
	    } else {
	      h = twothird + onesixth * (r - g) / (cmax - cmin);
	    }
	    if (h < 0.0) {
	      h += 1.0;
	    }
	  } else {
	    h = 0.0;
	  }

	  // Set the values back to the array
	  hsv[0] = h;
	  hsv[1] = s;
	  hsv[2] = v;
	}

	function hsv2rgb(hsv, rgb) {
	  var _hsv = _slicedToArray(hsv, 3);

	  var h = _hsv[0];
	  var s = _hsv[1];
	  var v = _hsv[2];

	  var onethird = 1.0 / 3.0;
	  var onesixth = 1.0 / 6.0;
	  var twothird = 2.0 / 3.0;
	  var fivesixth = 5.0 / 6.0;
	  var r = void 0;
	  var g = void 0;
	  var b = void 0;

	  // compute RGB from HSV
	  if (h > onesixth && h <= onethird) {
	    // green/red
	    g = 1.0;
	    r = (onethird - h) / onesixth;
	    b = 0.0;
	  } else if (h > onethird && h <= 0.5) {
	    // green/blue
	    g = 1.0;
	    b = (h - onethird) / onesixth;
	    r = 0.0;
	  } else if (h > 0.5 && h <= twothird) {
	    // blue/green
	    b = 1.0;
	    g = (twothird - h) / onesixth;
	    r = 0.0;
	  } else if (h > twothird && h <= fivesixth) {
	    // blue/red
	    b = 1.0;
	    r = (h - twothird) / onesixth;
	    g = 0.0;
	  } else if (h > fivesixth && h <= 1.0) {
	    // red/blue
	    r = 1.0;
	    b = (1.0 - h) / onesixth;
	    g = 0.0;
	  } else {
	    // red/green
	    r = 1.0;
	    g = h / onesixth;
	    b = 0.0;
	  }

	  // add Saturation to the equation.
	  r = s * r + (1.0 - s);
	  g = s * g + (1.0 - s);
	  b = s * b + (1.0 - s);

	  r *= v;
	  g *= v;
	  b *= v;

	  // Assign back to the array
	  rgb[0] = r;
	  rgb[1] = g;
	  rgb[2] = b;
	}

	function lab2xyz(lab, xyz) {
	  // LAB to XYZ

	  var _lab = _slicedToArray(lab, 3);

	  var L = _lab[0];
	  var a = _lab[1];
	  var b = _lab[2];

	  var var_Y = (L + 16) / 116;
	  var var_X = a / 500 + var_Y;
	  var var_Z = var_Y - b / 200;

	  if (Math.pow(var_Y, 3) > 0.008856) {
	    var_Y = Math.pow(var_Y, 3);
	  } else {
	    var_Y = (var_Y - 16.0 / 116.0) / 7.787;
	  }

	  if (Math.pow(var_X, 3) > 0.008856) {
	    var_X = Math.pow(var_X, 3);
	  } else {
	    var_X = (var_X - 16.0 / 116.0) / 7.787;
	  }

	  if (Math.pow(var_Z, 3) > 0.008856) {
	    var_Z = Math.pow(var_Z, 3);
	  } else {
	    var_Z = (var_Z - 16.0 / 116.0) / 7.787;
	  }
	  var ref_X = 0.9505;
	  var ref_Y = 1.000;
	  var ref_Z = 1.089;
	  xyz[0] = ref_X * var_X; // ref_X = 0.9505  Observer= 2 deg Illuminant= D65
	  xyz[1] = ref_Y * var_Y; // ref_Y = 1.000
	  xyz[2] = ref_Z * var_Z; // ref_Z = 1.089
	}

	function xyz2lab(xyz, lab) {
	  var _xyz = _slicedToArray(xyz, 3);

	  var x = _xyz[0];
	  var y = _xyz[1];
	  var z = _xyz[2];

	  var ref_X = 0.9505;
	  var ref_Y = 1.000;
	  var ref_Z = 1.089;
	  var var_X = x / ref_X; // ref_X = 0.9505  Observer= 2 deg, Illuminant= D65
	  var var_Y = y / ref_Y; // ref_Y = 1.000
	  var var_Z = z / ref_Z; // ref_Z = 1.089

	  if (var_X > 0.008856) var_X = Math.pow(var_X, 1.0 / 3.0);else var_X = 7.787 * var_X + 16.0 / 116.0;
	  if (var_Y > 0.008856) var_Y = Math.pow(var_Y, 1.0 / 3.0);else var_Y = 7.787 * var_Y + 16.0 / 116.0;
	  if (var_Z > 0.008856) var_Z = Math.pow(var_Z, 1.0 / 3.0);else var_Z = 7.787 * var_Z + 16.0 / 116.0;

	  lab[0] = 116 * var_Y - 16;
	  lab[1] = 500 * (var_X - var_Y);
	  lab[2] = 200 * (var_Y - var_Z);
	}

	function xyz2rgb(xyz, rgb) {
	  var _xyz2 = _slicedToArray(xyz, 3);

	  var x = _xyz2[0];
	  var y = _xyz2[1];
	  var z = _xyz2[2];

	  var r = x * 3.2406 + y * -1.5372 + z * -0.4986;
	  var g = x * -0.9689 + y * 1.8758 + z * 0.0415;
	  var b = x * 0.0557 + y * -0.2040 + z * 1.0570;

	  // The following performs a "gamma correction" specified by the sRGB color
	  // space.  sRGB is defined by a canonical definition of a display monitor and
	  // has been standardized by the International Electrotechnical Commission (IEC
	  // 61966-2-1).  The nonlinearity of the correction is designed to make the
	  // colors more perceptually uniform.  This color space has been adopted by
	  // several applications including Adobe Photoshop and Microsoft Windows color
	  // management.  OpenGL is agnostic on its RGB color space, but it is reasonable
	  // to assume it is close to this one.
	  if (r > 0.0031308) r = 1.055 * Math.pow(r, 1 / 2.4) - 0.055;else r = 12.92 * r;
	  if (g > 0.0031308) g = 1.055 * Math.pow(g, 1 / 2.4) - 0.055;else g = 12.92 * g;
	  if (b > 0.0031308) b = 1.055 * Math.pow(b, 1 / 2.4) - 0.055;else b = 12.92 * b;

	  // Clip colors. ideally we would do something that is perceptually closest
	  // (since we can see colors outside of the display gamut), but this seems to
	  // work well enough.
	  var maxVal = r;
	  if (maxVal < g) maxVal = g;
	  if (maxVal < b) maxVal = b;
	  if (maxVal > 1.0) {
	    r /= maxVal;
	    g /= maxVal;
	    b /= maxVal;
	  }
	  if (r < 0) r = 0;
	  if (g < 0) g = 0;
	  if (b < 0) b = 0;

	  // Push values back to array
	  rgb[0] = r;
	  rgb[1] = g;
	  rgb[2] = b;
	}

	function rgb2xyz(rgb, xyz) {
	  var _rgb2 = _slicedToArray(rgb, 3);

	  var r = _rgb2[0];
	  var g = _rgb2[1];
	  var b = _rgb2[2];
	  // The following performs a "gamma correction" specified by the sRGB color
	  // space.  sRGB is defined by a canonical definition of a display monitor and
	  // has been standardized by the International Electrotechnical Commission (IEC
	  // 61966-2-1).  The nonlinearity of the correction is designed to make the
	  // colors more perceptually uniform.  This color space has been adopted by
	  // several applications including Adobe Photoshop and Microsoft Windows color
	  // management.  OpenGL is agnostic on its RGB color space, but it is reasonable
	  // to assume it is close to this one.

	  if (r > 0.04045) r = Math.pow((r + 0.055) / 1.055, 2.4);else r = r / 12.92;
	  if (g > 0.04045) g = Math.pow((g + 0.055) / 1.055, 2.4);else g = g / 12.92;
	  if (b > 0.04045) b = Math.pow((b + 0.055) / 1.055, 2.4);else b = b / 12.92;

	  // Observer. = 2 deg, Illuminant = D65
	  xyz[0] = r * 0.4124 + g * 0.3576 + b * 0.1805;
	  xyz[1] = r * 0.2126 + g * 0.7152 + b * 0.0722;
	  xyz[2] = r * 0.0193 + g * 0.1192 + b * 0.9505;
	}

	function rgb2lab(rgb, lab) {
	  var xyz = [0, 0, 0];
	  rgb2xyz(rgb, xyz);
	  xyz2lab(xyz, lab);
	}

	function LabToRGB(lab, rgb) {
	  var xyz = [0, 0, 0];
	  lab2xyz(lab, xyz);
	  xyz2rgb(xyz, rgb);
	}

	function uninitializeBounds(bounds) {
	  bounds[0] = 1.0;
	  bounds[1] = -1.0;
	  bounds[2] = 1.0;
	  bounds[3] = -1.0;
	  bounds[4] = 1.0;
	  bounds[5] = -1.0;
	}

	function areBoundsInitialized(bounds) {
	  return !(bounds[1] - bounds[0] < 0.0);
	}

	function clampValue(value, minValue, maxValue) {
	  if (value < minValue) {
	    return minValue;
	  }
	  if (value > maxValue) {
	    return maxValue;
	  }
	  return value;
	}

	function clampAndNormalizeValue(value, range) {
	  var result = 0;
	  if (range[0] !== range[1]) {
	    // clamp
	    if (value < range[0]) {
	      result = range[0];
	    } else {
	      if (value > range[1]) {
	        result = range[1];
	      } else {
	        result = value;
	      }
	    }
	    // normalize
	    result = (result - range[0]) / (range[1] - range[0]);
	  }

	  return result;
	}

	var getScalarTypeFittingRange = notImplemented('GetScalarTypeFittingRange');
	var getAdjustedScalarRange = notImplemented('GetAdjustedScalarRange');

	function extentIsWithinOtherExtent(extent1, extent2) {
	  if (!extent1 || !extent2) {
	    return 0;
	  }

	  for (var i = 0; i < 6; i += 2) {
	    if (extent1[i] < extent2[i] || extent1[i] > extent2[i + 1] || extent1[i + 1] < extent2[i] || extent1[i + 1] > extent2[i + 1]) {
	      return 0;
	    }
	  }

	  return 1;
	}

	function boundsIsWithinOtherBounds(bounds1_6, bounds2_6, delta_3) {
	  if (!bounds1_6 || !bounds2_6) {
	    return 0;
	  }
	  for (var i = 0; i < 6; i += 2) {
	    if (bounds1_6[i] + delta_3[i / 2] < bounds2_6[i] || bounds1_6[i] - delta_3[i / 2] > bounds2_6[i + 1] || bounds1_6[i + 1] + delta_3[i / 2] < bounds2_6[i] || bounds1_6[i + 1] - delta_3[i / 2] > bounds2_6[i + 1]) {
	      return 0;
	    }
	  }
	  return 1;
	}

	function pointIsWithinBounds(point_3, bounds_6, delta_3) {
	  if (!point_3 || !bounds_6 || !delta_3) {
	    return 0;
	  }
	  for (var i = 0; i < 3; i++) {
	    if (point_3[i] + delta_3[i] < bounds_6[2 * i] || point_3[i] - delta_3[i] > bounds_6[2 * i + 1]) {
	      return 0;
	    }
	  }
	  return 1;
	}

	function solve3PointCircle(p1, p2, p3, center) {
	  var v21 = createArray(3);
	  var v32 = createArray(3);
	  var v13 = createArray(3);
	  var v12 = createArray(3);
	  var v23 = createArray(3);
	  var v31 = createArray(3);

	  for (var i = 0; i < 3; ++i) {
	    v21[i] = p1[i] - p2[i];
	    v32[i] = p2[i] - p3[i];
	    v13[i] = p3[i] - p1[i];
	    v12[i] = -v21[i];
	    v23[i] = -v32[i];
	    v31[i] = -v13[i];
	  }

	  var norm12 = norm(v12);
	  var norm23 = norm(v23);
	  var norm13 = norm(v13);

	  var crossv21v32 = createArray(3);
	  cross(v21, v32, crossv21v32);
	  var normCross = norm(crossv21v32);

	  var radius = norm12 * norm23 * norm13 / (2 * normCross);

	  var normCross22 = 2 * normCross * normCross;
	  var alpha = norm23 * norm23 * dot(v21, v31) / normCross22;
	  var beta = norm13 * norm13 * dot(v12, v32) / normCross22;
	  var gamma = norm12 * norm12 * dot(v13, v23) / normCross22;

	  for (var _i6 = 0; _i6 < 3; ++_i6) {
	    center[_i6] = alpha * p1[_i6] + beta * p2[_i6] + gamma * p3[_i6];
	  }
	  return radius;
	}

	var inf = Infinity;
	var negInf = -Infinity;

	var isInf = function isInf(value) {
	  return !Number.isFinite(value);
	};
	var isNan = Number.isNaN;
	var isFinite = Number.isFinite;

	// JavaScript - add-on ----------------------

	function createUninitializedBouds() {
	  return [].concat([Number.MAX_VALUE, Number.MIN_VALUE, // X
	  Number.MAX_VALUE, Number.MIN_VALUE, // Y
	  Number.MAX_VALUE, Number.MIN_VALUE]);
	}

	// ----------------------------------------------------------------------------
	// Only Static API
	// ----------------------------------------------------------------------------

	// Z
	exports.default = {
	  Pi: Pi,
	  radiansFromDegrees: radiansFromDegrees,
	  degreesFromRadians: degreesFromRadians,
	  round: round,
	  floor: floor,
	  ceil: ceil,
	  ceilLog2: ceilLog2,
	  min: min,
	  max: max,
	  isPowerOfTwo: isPowerOfTwo,
	  nearestPowerOfTwo: nearestPowerOfTwo,
	  factorial: factorial,
	  binomial: binomial,
	  beginCombination: beginCombination,
	  nextCombination: nextCombination,
	  randomSeed: randomSeed,
	  getSeed: getSeed,
	  random: random,
	  gaussian: gaussian,
	  add: add,
	  subtract: subtract,
	  multiplyScalar: multiplyScalar,
	  multiplyScalar2D: multiplyScalar2D,
	  dot: dot,
	  outer: outer,
	  cross: cross,
	  norm: norm,
	  normalize: normalize,
	  perpendiculars: perpendiculars,
	  projectVector: projectVector,
	  projectVector2D: projectVector2D,
	  distance2BetweenPoints: distance2BetweenPoints,
	  angleBetweenVectors: angleBetweenVectors,
	  gaussianAmplitude: gaussianAmplitude,
	  gaussianWeight: gaussianWeight,
	  dot2D: dot2D,
	  outer2D: outer2D,
	  norm2D: norm2D,
	  normalize2D: normalize2D,
	  determinant2x2: determinant2x2,
	  LUFactor3x3: LUFactor3x3,
	  LUSolve3x3: LUSolve3x3,
	  linearSolve3x3: linearSolve3x3,
	  multiply3x3_vect3: multiply3x3_vect3,
	  multiply3x3_mat3: multiply3x3_mat3,
	  multiplyMatrix: multiplyMatrix,
	  transpose3x3: transpose3x3,
	  invert3x3: invert3x3,
	  identity3x3: identity3x3,
	  determinant3x3: determinant3x3,
	  quaternionToMatrix3x3: quaternionToMatrix3x3,
	  matrix3x3ToQuaternion: matrix3x3ToQuaternion,
	  multiplyQuaternion: multiplyQuaternion,
	  orthogonalize3x3: orthogonalize3x3,
	  diagonalize3x3: diagonalize3x3,
	  singularValueDecomposition3x3: singularValueDecomposition3x3,
	  solveLinearSystem: solveLinearSystem,
	  invertMatrix: invertMatrix,
	  luFactorLinearSystem: luFactorLinearSystem,
	  luSolveLinearSystem: luSolveLinearSystem,
	  estimateMatrixCondition: estimateMatrixCondition,
	  jacobi: jacobi,
	  jacobiN: jacobiN,
	  solveHomogeneousLeastSquares: solveHomogeneousLeastSquares,
	  solveLeastSquares: solveLeastSquares,
	  rgb2hsv: rgb2hsv,
	  hsv2rgb: hsv2rgb,
	  lab2xyz: lab2xyz,
	  xyz2lab: xyz2lab,
	  xyz2rgb: xyz2rgb,
	  rgb2xyz: rgb2xyz,
	  rgb2lab: rgb2lab,
	  LabToRGB: LabToRGB,
	  uninitializeBounds: uninitializeBounds,
	  areBoundsInitialized: areBoundsInitialized,
	  clampValue: clampValue,
	  clampAndNormalizeValue: clampAndNormalizeValue,
	  getScalarTypeFittingRange: getScalarTypeFittingRange,
	  getAdjustedScalarRange: getAdjustedScalarRange,
	  extentIsWithinOtherExtent: extentIsWithinOtherExtent,
	  boundsIsWithinOtherBounds: boundsIsWithinOtherBounds,
	  pointIsWithinBounds: pointIsWithinBounds,
	  solve3PointCircle: solve3PointCircle,
	  inf: inf,
	  negInf: negInf,
	  isInf: isInf,
	  isNan: isNan,
	  isFinite: isFinite,

	  // JS add-on
	  createUninitializedBouds: createUninitializedBouds
	};

/***/ }
/******/ ]);
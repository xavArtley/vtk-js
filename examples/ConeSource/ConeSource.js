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
	  console.log('source modified', s.getOutput().metadata.state);
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
	exports.coneSource = coneSource;

	var _macro = __webpack_require__(2);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------

	var STD_FIELDS = ['height', 'radius', 'resolution', 'capping'];
	var ARRAY_FIELDS_3 = ['center', 'direction'];

	// ----------------------------------------------------------------------------
	// ConeSource methods
	// ----------------------------------------------------------------------------

	function coneSource(publicAPI, model) {
	  function update() {
	    if (model.deleted) {
	      return;
	    }

	    var dataset = model.output[0];
	    if (!dataset || dataset.mtime !== model.mtime) {
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
	        STD_FIELDS.forEach(function (field) {
	          state[field] = model[field];
	        });
	        ARRAY_FIELDS_3.forEach(function (field) {
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

	        // Add summit point
	        points[0] = model.height / 2.0;
	        points[1] = 0.0;
	        points[2] = 0.0;

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

	          // Add points to bottom cell in reverse order
	          if (model.capping) {
	            polys[model.resolution - cellLocation++] = pointIdx;
	          }
	        }

	        // Add all triangle cells
	        for (var _i = 0; _i < model.resolution; _i++) {
	          polys[cellLocation++] = 3;
	          polys[cellLocation++] = 0;
	          polys[cellLocation++] = _i + 1;
	          polys[cellLocation++] = _i + 2 > model.resolution ? 1 : _i + 2;
	        }

	        // FIXME apply tranform

	        // Update output
	        model.output[0] = dataset;
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

	function newInstance() {
	  var initialValues = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var model = Object.assign({}, DEFAULT_VALUES, initialValues);
	  var publicAPI = {};

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, STD_FIELDS);
	  macro.setGetArray(publicAPI, model, ARRAY_FIELDS_3, 3);
	  macro.algo(publicAPI, model, 0, 1);

	  // Object methods
	  coneSource(publicAPI, model);

	  return Object.freeze(publicAPI);
	}

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance };

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	// ----------------------------------------------------------------------------
	// capitilze provided string
	// ----------------------------------------------------------------------------

	function capitalize(str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// ----------------------------------------------------------------------------
	// vtkObject: modified(), onModified(callback), delete()
	// ----------------------------------------------------------------------------

	function obj(publicAPI, model) {
	  var type = arguments.length <= 2 || arguments[2] === undefined ? 'vtkObject' : arguments[2];
	  var implementations = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

	  var callbacks = [];
	  model.mtime = 1;

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

	    ++model.mtime;
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

	  publicAPI.isA = function (t) {
	    return type === t;
	  };

	  publicAPI.getClassName = function () {
	    return type;
	  };

	  publicAPI.getImplements = function (map) {
	    if (map) {
	      return implementations.filter(function (name) {
	        return !!map[name];
	      });
	    }
	    return implementations;
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
	    publicAPI['get' + capitalize(field)] = function () {
	      return model[field];
	    };
	  });
	}

	// ----------------------------------------------------------------------------
	// setXXX: add setters
	// ----------------------------------------------------------------------------

	function set(publicAPI, model, fieldNames) {
	  function createSetter(field) {
	    function setter(value) {
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
	    }

	    publicAPI['set' + capitalize(field)] = setter;
	  }

	  fieldNames.forEach(createSetter);
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
	    publicAPI['set' + capitalize(field)] = function (array) {
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
	// Event handling: onXXX(callback), fireXXX(args...)
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

	  publicAPI['fire' + capitalize(eventName)] = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
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

/***/ }
/******/ ]);
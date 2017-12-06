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

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["PolyData"] = __webpack_require__(1);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _FullScreenRenderWindow = __webpack_require__(2);

	var _FullScreenRenderWindow2 = _interopRequireDefault(_FullScreenRenderWindow);

	var _vtk = __webpack_require__(4);

	var _vtk2 = _interopRequireDefault(_vtk);

	var _Actor = __webpack_require__(101);

	var _Actor2 = _interopRequireDefault(_Actor);

	var _Mapper = __webpack_require__(105);

	var _Mapper2 = _interopRequireDefault(_Mapper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// ----------------------------------------------------------------------------
	// Standard rendering code setup
	// ----------------------------------------------------------------------------

	var fullScreenRenderer = _FullScreenRenderWindow2.default.newInstance({ background: [0, 0, 0] });
	var renderer = fullScreenRenderer.getRenderer();
	var renderWindow = fullScreenRenderer.getRenderWindow();

	// ----------------------------------------------------------------------------
	// Inline PolyData definition
	// ----------------------------------------------------------------------------

	var polydata = (0, _vtk2.default)({
	  vtkClass: 'vtkPolyData',
	  points: {
	    vtkClass: 'vtkPoints',
	    dataType: 'Float32Array',
	    numberOfComponents: 3,
	    values: [0, 0, 0, 1, 0, 0.25, 1, 1, 0, 0, 1, 0.25]
	  },
	  polys: {
	    vtkClass: 'vtkCellArray',
	    dataType: 'Uint16Array',
	    values: [3, 0, 1, 2, 3, 0, 2, 3]
	  },
	  pointData: {
	    vtkClass: 'vtkDataSetAttributes',
	    activeScalars: 0,
	    arrays: [{
	      data: {
	        vtkClass: 'vtkDataArray',
	        name: 'pointScalars',
	        dataType: 'Float32Array',
	        values: [0, 1, 0, 1]
	      }
	    }]
	  },
	  cellData: {
	    vtkClass: 'vtkDataSetAttributes',
	    activeScalars: 0,
	    arrays: [{
	      data: {
	        vtkClass: 'vtkDataArray',
	        name: 'cellScalars',
	        dataType: 'Float32Array',
	        values: [0, 1]
	      }
	    }]
	  }
	});

	var mapper = _Mapper2.default.newInstance({ interpolateScalarsBeforeMapping: true });
	mapper.setInputData(polydata);

	var lut = mapper.getLookupTable();
	lut.setHueRange(0.666, 0);

	var actor = _Actor2.default.newInstance();
	actor.setMapper(mapper);

	renderer.addActor(actor);
	renderer.resetCamera();
	renderWindow.render();

	// -----------------------------------------------------------
	// Make some variables global so that you can inspect and
	// modify objects in your browser's developer console:
	// -----------------------------------------------------------

	global.source = polydata;
	global.mapper = mapper;
	global.actor = actor;
	global.lut = lut;
	global.renderer = renderer;
	global.renderWindow = renderWindow;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _RenderWindow = __webpack_require__(5);

	var _RenderWindow2 = _interopRequireDefault(_RenderWindow);

	var _Renderer = __webpack_require__(81);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _RenderWindow3 = __webpack_require__(87);

	var _RenderWindow4 = _interopRequireDefault(_RenderWindow3);

	var _RenderWindowInteractor = __webpack_require__(88);

	var _RenderWindowInteractor2 = _interopRequireDefault(_RenderWindowInteractor);

	__webpack_require__(93);

	__webpack_require__(67);

	__webpack_require__(94);

	__webpack_require__(101);

	__webpack_require__(105);

	var _FullScreenRenderWindow = __webpack_require__(114);

	var _FullScreenRenderWindow2 = _interopRequireDefault(_FullScreenRenderWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	// Load basic classes for vtk() factory


	// Load style


	function vtkFullScreenRenderWindow(publicAPI, model) {
	  // Full screen DOM handler
	  model.container = document.createElement('div');
	  model.container.className = _FullScreenRenderWindow2.default.container;
	  document.querySelector('body').appendChild(model.container);

	  // VTK renderWindow/renderer
	  model.renderWindow = _RenderWindow4.default.newInstance();
	  model.renderer = _Renderer2.default.newInstance();
	  model.renderWindow.addRenderer(model.renderer);

	  // OpenGlRenderWindow
	  model.openGlRenderWindow = _RenderWindow2.default.newInstance();
	  model.openGlRenderWindow.setContainer(model.container);
	  model.renderWindow.addView(model.openGlRenderWindow);

	  // Interactor
	  model.interactor = _RenderWindowInteractor2.default.newInstance();
	  model.interactor.setView(model.openGlRenderWindow);
	  model.interactor.initialize();
	  model.interactor.bindEvents(model.container);

	  // Expose background
	  publicAPI.setBackground = model.renderer.setBackground;

	  publicAPI.addController = function (html) {
	    model.controlContainer = document.createElement('div');
	    model.controlContainer.className = _FullScreenRenderWindow2.default.controlPanel;
	    document.querySelector('body').appendChild(model.controlContainer);
	    model.controlContainer.innerHTML = html;

	    document.querySelector('body').addEventListener('keypress', function (e) {
	      if (String.fromCharCode(e.charCode) === 'c') {
	        if (model.controlContainer.style.display === 'none') {
	          model.controlContainer.style.display = 'block';
	        } else {
	          model.controlContainer.style.display = 'none';
	        }
	      }
	    });
	  };

	  // Update BG color
	  publicAPI.setBackground.apply(publicAPI, _toConsumableArray(model.background));

	  // Handle window resize
	  function updateRenderWindowSize() {
	    var dims = model.container.getBoundingClientRect();
	    model.openGlRenderWindow.setSize(dims.width, dims.height);
	    model.renderWindow.render();
	  }

	  window.addEventListener('resize', updateRenderWindowSize);
	  updateRenderWindowSize();
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  background: [0.32, 0.34, 0.43]
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);
	  macro.get(publicAPI, model, ['renderWindow', 'renderer', 'openGlRenderWindow', 'interactor', 'container', 'controlContainer']);

	  // Object specific methods
	  vtkFullScreenRenderWindow(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.capitalize = capitalize;
	exports.enumToString = enumToString;
	exports.getStateArrayMapFunc = getStateArrayMapFunc;
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
	exports.chain = chain;

	var _vtk = __webpack_require__(4);

	var _vtk2 = _interopRequireDefault(_vtk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var globalMTime = 0;
	// ----------------------------------------------------------------------------
	// capitilze provided string
	// ----------------------------------------------------------------------------

	function capitalize(str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function enumToString(e, value) {
	  return Object.keys(e).find(function (key) {
	    return e[key] === value;
	  });
	}

	function getStateArrayMapFunc(item) {
	  if (item.isA) {
	    return item.getState();
	  }
	  return item;
	}

	// ----------------------------------------------------------------------------
	// vtkObject: modified(), onModified(callback), delete()
	// ----------------------------------------------------------------------------

	function obj() {
	  var publicAPI = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var callbacks = [];
	  model.mtime = model.mtime || ++globalMTime;
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
	    var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    var ret = false;
	    Object.keys(map).forEach(function (name) {
	      if (Array.isArray(map[name])) {
	        ret = publicAPI['set' + capitalize(name)].apply(publicAPI, _toConsumableArray(map[name])) || ret;
	      } else if (publicAPI['set' + capitalize(name)]) {
	        ret = publicAPI['set' + capitalize(name)](map[name]) || ret;
	      } else {
	        // Set data on model directly
	        if (['mtime'].indexOf(name) === -1) {
	          console.log('Warning: Set value to model directly', name, map[name]);
	        }
	        model[name] = map[name];
	        ret = true;
	      }
	    });
	    return ret;
	  };

	  publicAPI.get = function () {
	    for (var _len = arguments.length, list = Array(_len), _key = 0; _key < _len; _key++) {
	      list[_key] = arguments[_key];
	    }

	    if (!list.length) {
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

	    // Flag the instance being deleted
	    model.deleted = true;
	  };

	  // Add serialization support
	  publicAPI.getState = function () {
	    var jsonArchive = Object.assign({}, model, { vtkClass: publicAPI.getClassName() });

	    // Convert every vtkObject to its serializable form
	    Object.keys(jsonArchive).forEach(function (keyName) {
	      if (jsonArchive[keyName] === null || jsonArchive[keyName] === undefined) {
	        delete jsonArchive[keyName];
	      } else if (jsonArchive[keyName].isA) {
	        jsonArchive[keyName] = jsonArchive[keyName].getState();
	      } else if (Array.isArray(jsonArchive[keyName])) {
	        jsonArchive[keyName] = jsonArchive[keyName].map(getStateArrayMapFunc);
	      }
	    });

	    // Sort resulting object by key name
	    var sortedObj = {};
	    Object.keys(jsonArchive).sort().forEach(function (name) {
	      sortedObj[name] = jsonArchive[name];
	    });

	    // Remove mtime
	    if (sortedObj.mtime) {
	      delete sortedObj.mtime;
	    }

	    return sortedObj;
	  };

	  // Add shallowCopy(otherInstance) support
	  publicAPI.shallowCopy = function (other) {
	    var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    if (other.getClassName() !== publicAPI.getClassName()) {
	      throw new Error('Can not ShallowCopy ' + other.getClassName() + ' into ' + publicAPI.getClassName());
	    }
	    var otherModel = other.get();

	    var keyList = Object.keys(model).sort();
	    var otherKeyList = Object.keys(otherModel).sort();

	    otherKeyList.forEach(function (key) {
	      var keyIdx = keyList.indexOf(key);
	      if (keyIdx === -1) {
	        if (debug) {
	          console.log('add ' + key + ' in shallowCopy');
	        }
	      } else {
	        keyList.splice(keyIdx, 1);
	      }
	      model[key] = otherModel[key];
	    });
	    if (keyList.length && debug) {
	      console.log('Untouched keys: ' + keyList.join(', '));
	    }

	    publicAPI.modified();
	  };
	}

	// ----------------------------------------------------------------------------
	// getXXX: add getters
	// ----------------------------------------------------------------------------

	function get(publicAPI, model, fieldNames) {
	  fieldNames.forEach(function (field) {
	    if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
	      publicAPI['get' + capitalize(field.name)] = function () {
	        return model[field.name];
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
	        if (field.enum[value] !== undefined) {
	          if (model[field.name] !== field.enum[value]) {
	            model[field.name] = field.enum[value];
	            publicAPI.modified();
	            return true;
	          }
	          return false;
	        }
	        console.error('Set Enum with invalid argument', field, value);
	        throw new RangeError('Set Enum with invalid string argument');
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
	          console.error('Set Enum outside numeric range', field, value);
	          throw new RangeError('Set Enum outside numeric range');
	        }
	        return false;
	      }
	      console.error('Set Enum with invalid argument (String/Number)', field, value);
	      throw new TypeError('Set Enum with invalid argument (String/Number)');
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
	      throw new TypeError('No setter for field');
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
	    if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
	      publicAPI['set' + capitalize(field.name)] = findSetter(field)(publicAPI, model);
	    } else {
	      publicAPI['set' + capitalize(field)] = findSetter(field)(publicAPI, model);
	    }
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
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      if (model.deleted) {
	        console.log('instance deleted - can not call any method');
	        return false;
	      }

	      var array = args;
	      // allow an array passed as a single arg.
	      if (array.length === 1 && Array.isArray(array[0])) {
	        array = array[0];
	      }

	      if (array.length !== size) {
	        throw new RangeError('Invalid number of values for array setter');
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
	      return true;
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
	  if (model.inputData) {
	    model.inputData = model.inputData.map(_vtk2.default);
	  } else {
	    model.inputData = [];
	  }

	  if (model.inputConnection) {
	    model.inputConnection = model.inputConnection.map(_vtk2.default);
	  } else {
	    model.inputConnection = [];
	  }

	  if (model.output) {
	    model.output = model.output.map(_vtk2.default);
	  } else {
	    model.output = [];
	  }

	  if (model.inputArrayToProcess) {
	    model.inputArrayToProcess = model.inputArrayToProcess.map(_vtk2.default);
	  } else {
	    model.inputArrayToProcess = [];
	  }

	  // Methods
	  function setInputData(dataset) {
	    var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    if (model.deleted) {
	      console.log('instance deleted - can not call any method');
	      return;
	    }
	    model.inputData[port] = dataset;
	    model.inputConnection[port] = null;
	  }

	  function getInputData() {
	    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    if (model.inputConnection[port]) {
	      model.inputData[port] = model.inputConnection[port]();
	    }
	    return model.inputData[port];
	  }

	  function setInputConnection(outputPort) {
	    var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    if (model.deleted) {
	      console.log('instance deleted - can not call any method');
	      return;
	    }
	    model.inputData[port] = null;
	    model.inputConnection[port] = outputPort;
	  }

	  function getOutputData() {
	    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    if (model.deleted) {
	      console.log('instance deleted - can not call any method');
	      return null;
	    }
	    publicAPI.update();
	    return model.output[port];
	  }

	  function getOutputPort() {
	    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    return function () {
	      return getOutputData(port);
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
	    publicAPI.getOutputData = getOutputData;
	    publicAPI.getOutputPort = getOutputPort;
	  }

	  publicAPI.update = function () {
	    var ins = [];
	    if (numberOfInputs) {
	      var _count = 0;
	      while (_count < numberOfInputs) {
	        ins[_count] = publicAPI.getInputData(_count);
	        _count++;
	      }
	    }
	    publicAPI.requestData(ins, model.output);
	  };

	  publicAPI.getNumberOfInputPorts = function () {
	    return numberOfInputs;
	  };
	  publicAPI.getNumberOfOutputPorts = function () {
	    return numberOfOutputs;
	  };

	  publicAPI.getInputArrayToProcess = function (inputPort) {
	    var arrayDesc = model.inputArrayToProcess[inputPort];
	    var ds = model.inputData[inputPort];
	    if (arrayDesc && ds) {
	      return ds['get' + arrayDesc.fieldAssociation]().getArray(arrayDesc.arrayName);
	    }
	    return null;
	  };
	  publicAPI.setInputArrayToProcess = function (inputPort, arrayName, fieldAssociation) {
	    var attributeType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Scalars';

	    while (model.inputArrayToProcess.length < inputPort) {
	      model.inputArrayToProcess.push(null);
	    }
	    model.inputArrayToProcess[inputPort] = { arrayName: arrayName, fieldAssociation: fieldAssociation, attributeType: attributeType };
	  };
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

	function newInstance(extend, className) {
	  var constructor = function constructor() {
	    var initialValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    var model = {};
	    var publicAPI = {};
	    extend(publicAPI, model, initialValues);
	    return Object.freeze(publicAPI);
	  };

	  // Register constructor to factory
	  if (className) {
	    _vtk2.default.register(className, constructor);
	  }

	  return constructor;
	}

	// ----------------------------------------------------------------------------
	// Chain function calls
	// ----------------------------------------------------------------------------

	function chain() {
	  for (var _len4 = arguments.length, fn = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	    fn[_key4] = arguments[_key4];
	  }

	  return function () {
	    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	      args[_key5] = arguments[_key5];
	    }

	    return fn.filter(function (i) {
	      return !!i;
	    }).forEach(function (i) {
	      return i.apply(undefined, args);
	    });
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = vtk;
	exports.register = register;
	var factoryMapping = {
	  vtkObject: function vtkObject() {
	    return null;
	  }
	};

	function vtk(obj) {
	  if (obj === null || obj === undefined) {
	    return obj;
	  }
	  if (obj.isA) {
	    return obj;
	  }
	  if (!obj.vtkClass) {
	    console.log('Invalid VTK object');
	    return null;
	  }
	  var constructor = factoryMapping[obj.vtkClass];
	  if (!constructor) {
	    console.log('No vtk class found for Object of type', obj.vtkClass);
	    return null;
	  }

	  // Shallow copy object
	  var model = Object.assign({}, obj);

	  // Convert into vtkObject any nested key
	  Object.keys(model).forEach(function (keyName) {
	    if (model[keyName] && _typeof(model[keyName]) === 'object' && model[keyName].vtkClass) {
	      model[keyName] = vtk(model[keyName]);
	    }
	  });

	  // Return the root
	  var newInst = constructor(model);
	  if (newInst && newInst.modified) {
	    newInst.modified();
	  }
	  return newInst;
	}

	function register(vtkClassName, constructor) {
	  factoryMapping[vtkClassName] = constructor;
	}

	// Nest register method under the vtk function
	vtk.register = register;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkOpenGLRenderWindow = vtkOpenGLRenderWindow;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNodeFactory = __webpack_require__(6);

	var _ViewNodeFactory2 = _interopRequireDefault(_ViewNodeFactory);

	var _ShaderCache = __webpack_require__(78);

	var _ShaderCache2 = _interopRequireDefault(_ShaderCache);

	var _ViewNode = __webpack_require__(19);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	var _TextureUnitManager = __webpack_require__(80);

	var _TextureUnitManager2 = _interopRequireDefault(_TextureUnitManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLRenderWindow methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLRenderWindow(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLRenderWindow');

	  // Auto update style
	  function updateWindow() {
	    // Canvas size
	    if (model.renderable) {
	      model.canvas.setAttribute('width', model.size[0]);
	      model.canvas.setAttribute('height', model.size[1]);
	    }
	    // Offscreen ?
	    model.canvas.style.display = model.useOffScreen ? 'none' : 'block';

	    // Cursor type
	    if (model.el) {
	      model.el.style.cursor = model.cursorVisibility ? model.cursor : 'none';
	    }
	  }
	  publicAPI.onModified(updateWindow);

	  // Builds myself.
	  publicAPI.build = function (prepass) {
	    if (prepass) {
	      if (!model.renderable) {
	        return;
	      }

	      publicAPI.prepareNodes();
	      publicAPI.addMissingNodes(model.renderable.getRenderers());
	      publicAPI.removeUnusedNodes();
	    }
	  };

	  publicAPI.initialize = function () {
	    if (!model.initialized) {
	      model.context = publicAPI.get3DContext();
	      model.textureUnitManager = _TextureUnitManager2.default.newInstance();
	      model.textureUnitManager.setContext(model.context);
	      model.shaderCache.setContext(model.context);
	      // initialize blending for transparency
	      var gl = model.context;
	      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	      gl.enable(gl.BLEND);
	      model.initialized = true;
	    }
	  };

	  publicAPI.makeCurrent = function () {
	    model.context.makeCurrent();
	  };

	  publicAPI.frame = function () {};

	  // Renders myself
	  publicAPI.render = function (prepass) {
	    if (prepass) {
	      publicAPI.initialize();
	      model.children.forEach(function (child) {
	        child.setContext(model.context);
	      });
	    } else {
	      publicAPI.frame();
	    }
	  };

	  publicAPI.setContainer = function (el) {
	    if (model.el && model.el !== el) {
	      // Remove canvas from previous container
	      if (model.canvas.parentNode === model.el) {
	        model.el.removeChild(model.canvas);
	      } else {
	        console.log('Error: canvas parent node does not match container');
	      }
	    }

	    if (model.el !== el) {
	      model.el = el;
	      model.el.appendChild(model.canvas);

	      // Trigger modified()
	      publicAPI.modified();
	    }
	  };

	  publicAPI.isInViewport = function (x, y, viewport) {
	    var vCoords = viewport.getViewport();
	    var size = model.size;
	    if (vCoords[0] * size[0] <= x && vCoords[2] * size[0] >= x && vCoords[1] * size[1] <= y && vCoords[3] * size[1] >= y) {
	      return true;
	    }
	    return false;
	  };

	  publicAPI.getViewportSize = function (viewport) {
	    var vCoords = viewport.getViewport();
	    var size = model.size;
	    return [(vCoords[2] - vCoords[0]) * size[0], (vCoords[3] - vCoords[1]) * size[1]];
	  };

	  publicAPI.getViewportCenter = function (viewport) {
	    var size = publicAPI.getViewportSize(viewport);
	    return [size[0] * 0.5, size[1] * 0.5];
	  };

	  publicAPI.displayToNormalizedDisplay = function (x, y, z) {
	    return [x / (model.size[0] - 1), y / (model.size[1] - 1), z];
	  };

	  publicAPI.normalizedDisplayToDisplay = function (x, y, z) {
	    return [x * (model.size[0] - 1), y * (model.size[1] - 1), z];
	  };

	  publicAPI.get2DContext = function () {
	    return model.canvas.getContext('2d');
	  };

	  publicAPI.get3DContext = function () {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { preserveDrawingBuffer: true, premultipliedAlpha: false };
	    return model.canvas.getContext('webgl', options) || model.canvas.getContext('experimental-webgl', options);
	  };

	  publicAPI.activateTexture = function (texture) {
	    // Only add if it isn't already there
	    var result = model.textureResourceIds.get(texture);
	    if (result !== undefined) {
	      model.context.activeTexture(model.context.TEXTURE0 + result);
	      return;
	    }

	    var activeUnit = publicAPI.getTextureUnitManager().allocate();
	    if (activeUnit < 0) {
	      console.error('Hardware does not support the number of textures defined.');
	      return;
	    }

	    model.textureResourceIds.set(texture, activeUnit);
	    model.context.activeTexture(model.context.TEXTURE0 + activeUnit);
	  };

	  publicAPI.deactivateTexture = function (texture) {
	    // Only deactivate if it isn't already there
	    var result = model.textureResourceIds.get(texture);
	    if (result !== undefined) {
	      publicAPI.getTextureUnitManager().free(result);
	      delete model.textureResourceIds.delete(texture);
	    }
	  };

	  publicAPI.getTextureUnitForTexture = function (texture) {
	    var result = model.textureResourceIds.get(texture);
	    if (result !== undefined) {
	      return result;
	    }
	    return -1;
	  };

	  publicAPI.getDefaultTextureInternalFormat = function (vtktype, numComps, useFloat) {
	    // currently only supports four types
	    switch (numComps) {
	      case 1:
	        return model.context.LUMINANCE;
	      case 2:
	        return model.context.LUMINANCE_ALPHA;
	      case 3:
	        return model.context.RGB;
	      case 4:
	      default:
	        return model.context.RGBA;
	    }
	  };

	  publicAPI.captureImage = function () {
	    var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'image/png';

	    publicAPI.traverseAllPasses();
	    return model.canvas.toDataURL(format);
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  shaderCache: null,
	  initialized: false,
	  context: null,
	  canvas: null,
	  size: [300, 300],
	  cursorVisibility: true,
	  cursor: 'pointer',
	  textureUnitManager: null,
	  textureResourceIds: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Create internal instances
	  model.canvas = document.createElement('canvas');

	  model.textureResourceIds = new Map();

	  // Inheritance
	  _ViewNode2.default.extend(publicAPI, model);

	  model.myFactory = _ViewNodeFactory2.default.newInstance();
	  model.shaderCache = _ShaderCache2.default.newInstance();

	  // Build VTK API
	  macro.get(publicAPI, model, ['shaderCache', 'textureUnitManager']);

	  macro.setGet(publicAPI, model, ['initialized', 'context']);

	  macro.setGetArray(publicAPI, model, ['size'], 2);

	  // Object methods
	  vtkOpenGLRenderWindow(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkOpenGLViewNodeFactory = vtkOpenGLViewNodeFactory;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNodeFactory = __webpack_require__(7);

	var _ViewNodeFactory2 = _interopRequireDefault(_ViewNodeFactory);

	var _Actor = __webpack_require__(8);

	var _Actor2 = _interopRequireDefault(_Actor);

	var _Actor2D = __webpack_require__(20);

	var _Actor2D2 = _interopRequireDefault(_Actor2D);

	var _Camera = __webpack_require__(21);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _ImageMapper = __webpack_require__(22);

	var _ImageMapper2 = _interopRequireDefault(_ImageMapper);

	var _ImageSlice = __webpack_require__(74);

	var _ImageSlice2 = _interopRequireDefault(_ImageSlice);

	var _PolyDataMapper = __webpack_require__(75);

	var _PolyDataMapper2 = _interopRequireDefault(_PolyDataMapper);

	var _RenderWindow = __webpack_require__(5);

	var _RenderWindow2 = _interopRequireDefault(_RenderWindow);

	var _Renderer = __webpack_require__(77);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _Texture = __webpack_require__(69);

	var _Texture2 = _interopRequireDefault(_Texture);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLViewNodeFactory methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLViewNodeFactory(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLViewNodeFactory');
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ViewNodeFactory2.default.extend(publicAPI, model);

	  // Object methods
	  vtkOpenGLViewNodeFactory(publicAPI, model);

	  // Initialization
	  publicAPI.registerOverride('vtkActor', _Actor2.default.newInstance);
	  publicAPI.registerOverride('vtkActor2D', _Actor2D2.default.newInstance);
	  publicAPI.registerOverride('vtkCamera', _Camera2.default.newInstance);
	  publicAPI.registerOverride('vtkImageMapper', _ImageMapper2.default.newInstance);
	  publicAPI.registerOverride('vtkImageSlice', _ImageSlice2.default.newInstance);
	  publicAPI.registerOverride('vtkMapper', _PolyDataMapper2.default.newInstance);
	  publicAPI.registerOverride('vtkRenderWindow', _RenderWindow2.default.newInstance);
	  publicAPI.registerOverride('vtkRenderer', _Renderer2.default.newInstance);
	  publicAPI.registerOverride('vtkTexture', _Texture2.default.newInstance);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkViewNodeFactory methods
	// ----------------------------------------------------------------------------

	function vtkViewNodeFactory(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkViewNodeFactory');

	  publicAPI.createNode = function (dataObject) {
	    if (Object.keys(model.overrides).indexOf(dataObject.getClassName()) === -1) {
	      return null;
	    }
	    var vn = model.overrides[dataObject.getClassName()]();
	    vn.setMyFactory(publicAPI);
	    return vn;
	  };

	  publicAPI.registerOverride = function (className, func) {
	    model.overrides[className] = func;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  overrides: {}
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);

	  // Object methods
	  vtkViewNodeFactory(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(9);

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNode = __webpack_require__(19);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLActor methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLActor(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLActor');

	  // Builds myself.
	  publicAPI.build = function (prepass) {
	    if (prepass) {
	      publicAPI.prepareNodes();
	      publicAPI.addMissingNodes(model.renderable.getTextures());
	      publicAPI.addMissingNode(model.renderable.getMapper());
	      publicAPI.removeUnusedNodes();
	    }
	  };

	  // we draw textures, then mapper, then post pass textures
	  publicAPI.traverse = function (operation) {
	    if (!model.renderable || !model.renderable.getVisibility()) {
	      return;
	    }
	    publicAPI.apply(operation, true);

	    model.activeTextures = [];
	    model.children.forEach(function (child) {
	      child.apply(operation, true);
	      if (child.isA('vtkOpenGLTexture') && operation === 'Render') {
	        model.activeTextures.push(child);
	      }
	    });

	    model.children.forEach(function (child) {
	      child.apply(operation, false);
	    });

	    publicAPI.apply(operation, false);
	  };

	  // Renders myself
	  publicAPI.render = function (prepass) {
	    if (prepass) {
	      model.context = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderWindow').getContext();
	      publicAPI.preRender();
	    } else {
	      // deactivate textures
	      model.children.forEach(function (child) {
	        if (child.isA('vtkOpenGLTexture')) {
	          child.deactivate();
	        }
	      });
	      var opaque = model.renderable.getIsOpaque() !== 0;
	      if (!opaque) {
	        model.context.depthMask(true);
	      }
	    }
	  };

	  publicAPI.preRender = function () {
	    // get opacity
	    var opaque = model.renderable.getIsOpaque() !== 0;
	    if (opaque) {
	      model.context.depthMask(true);
	    } else {
	      model.context.depthMask(false);
	    }
	  };

	  publicAPI.getKeyMatrices = function () {
	    // has the actor changed?
	    if (model.renderable.getMTime() > model.keyMatrixTime.getMTime()) {
	      model.renderable.computeMatrix();
	      _glMatrix.mat4.copy(model.MCWCMatrix, model.renderable.getMatrix());
	      _glMatrix.mat4.transpose(model.MCWCMatrix, model.MCWCMatrix);

	      if (model.renderable.getIsIdentity()) {
	        _glMatrix.mat3.identity(model.normalMatrix);
	      } else {
	        _glMatrix.mat3.fromMat4(model.normalMatrix, model.MCWCMatrix);
	        _glMatrix.mat3.invert(model.normalMatrix, model.normalMatrix);
	      }
	      model.keyMatrixTime.modified();
	    }

	    return { mcwc: model.MCWCMatrix, normalMatrix: model.normalMatrix };
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  context: null,
	  keyMatrixTime: null,
	  normalMatrix: null,
	  MCWCMatrix: null,
	  activeTextures: []
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ViewNode2.default.extend(publicAPI, model);

	  model.keyMatrixTime = {};
	  macro.obj(model.keyMatrixTime);
	  model.normalMatrix = _glMatrix.mat3.create();
	  model.MCWCMatrix = _glMatrix.mat4.create();

	  // Build VTK API
	  macro.setGet(publicAPI, model, ['context']);

	  macro.get(publicAPI, model, ['activeTextures']);

	  // Object methods
	  vtkOpenGLActor(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview gl-matrix - High performance matrix and vector operations
	 * @author Brandon Jones
	 * @author Colin MacKenzie IV
	 * @version 2.3.0
	 */

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	// END HEADER

	exports.glMatrix = __webpack_require__(10);
	exports.mat2 = __webpack_require__(11);
	exports.mat2d = __webpack_require__(12);
	exports.mat3 = __webpack_require__(13);
	exports.mat4 = __webpack_require__(14);
	exports.quat = __webpack_require__(15);
	exports.vec2 = __webpack_require__(18);
	exports.vec3 = __webpack_require__(16);
	exports.vec4 = __webpack_require__(17);

/***/ },
/* 10 */
/***/ function(module, exports) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	/**
	 * @class Common utilities
	 * @name glMatrix
	 */
	var glMatrix = {};

	// Constants
	glMatrix.EPSILON = 0.000001;
	glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
	glMatrix.RANDOM = Math.random;

	/**
	 * Sets the type of array used when creating new vectors and matrices
	 *
	 * @param {Type} type Array type, such as Float32Array or Array
	 */
	glMatrix.setMatrixArrayType = function(type) {
	    GLMAT_ARRAY_TYPE = type;
	}

	var degree = Math.PI / 180;

	/**
	* Convert Degree To Radian
	*
	* @param {Number} Angle in Degrees
	*/
	glMatrix.toRadian = function(a){
	     return a * degree;
	}

	module.exports = glMatrix;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(10);

	/**
	 * @class 2x2 Matrix
	 * @name mat2
	 */
	var mat2 = {};

	/**
	 * Creates a new identity mat2
	 *
	 * @returns {mat2} a new 2x2 matrix
	 */
	mat2.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Creates a new mat2 initialized with values from an existing matrix
	 *
	 * @param {mat2} a matrix to clone
	 * @returns {mat2} a new 2x2 matrix
	 */
	mat2.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Copy the values from one mat2 to another
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Set a mat2 to the identity matrix
	 *
	 * @param {mat2} out the receiving matrix
	 * @returns {mat2} out
	 */
	mat2.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a1 = a[1];
	        out[1] = a[2];
	        out[2] = a1;
	    } else {
	        out[0] = a[0];
	        out[1] = a[2];
	        out[2] = a[1];
	        out[3] = a[3];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

	        // Calculate the determinant
	        det = a0 * a3 - a2 * a1;

	    if (!det) {
	        return null;
	    }
	    det = 1.0 / det;
	    
	    out[0] =  a3 * det;
	    out[1] = -a1 * det;
	    out[2] = -a2 * det;
	    out[3] =  a0 * det;

	    return out;
	};

	/**
	 * Calculates the adjugate of a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.adjoint = function(out, a) {
	    // Caching this value is nessecary if out == a
	    var a0 = a[0];
	    out[0] =  a[3];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] =  a0;

	    return out;
	};

	/**
	 * Calculates the determinant of a mat2
	 *
	 * @param {mat2} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat2.determinant = function (a) {
	    return a[0] * a[3] - a[2] * a[1];
	};

	/**
	 * Multiplies two mat2's
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the first operand
	 * @param {mat2} b the second operand
	 * @returns {mat2} out
	 */
	mat2.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    return out;
	};

	/**
	 * Alias for {@link mat2.multiply}
	 * @function
	 */
	mat2.mul = mat2.multiply;

	/**
	 * Rotates a mat2 by the given angle
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2} out
	 */
	mat2.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    return out;
	};

	/**
	 * Scales the mat2 by the dimensions in the given vec2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to rotate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat2} out
	 **/
	mat2.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    return out;
	};

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2.identity(dest);
	 *     mat2.rotate(dest, dest, rad);
	 *
	 * @param {mat2} out mat2 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2} out
	 */
	mat2.fromRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2.identity(dest);
	 *     mat2.scale(dest, dest, vec);
	 *
	 * @param {mat2} out mat2 receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat2} out
	 */
	mat2.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    return out;
	}

	/**
	 * Returns a string representation of a mat2
	 *
	 * @param {mat2} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat2.str = function (a) {
	    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat2
	 *
	 * @param {mat2} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat2.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
	};

	/**
	 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
	 * @param {mat2} L the lower triangular matrix 
	 * @param {mat2} D the diagonal matrix 
	 * @param {mat2} U the upper triangular matrix 
	 * @param {mat2} a the input matrix to factorize
	 */

	mat2.LDU = function (L, D, U, a) { 
	    L[2] = a[2]/a[0]; 
	    U[0] = a[0]; 
	    U[1] = a[1]; 
	    U[3] = a[3] - L[2] * U[1]; 
	    return [L, D, U];       
	}; 


	module.exports = mat2;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(10);

	/**
	 * @class 2x3 Matrix
	 * @name mat2d
	 * 
	 * @description 
	 * A mat2d contains six elements defined as:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty]
	 * </pre>
	 * This is a short form for the 3x3 matrix:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty,
	 *  0, 0, 1]
	 * </pre>
	 * The last row is ignored so the array is shorter and operations are faster.
	 */
	var mat2d = {};

	/**
	 * Creates a new identity mat2d
	 *
	 * @returns {mat2d} a new 2x3 matrix
	 */
	mat2d.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};

	/**
	 * Creates a new mat2d initialized with values from an existing matrix
	 *
	 * @param {mat2d} a matrix to clone
	 * @returns {mat2d} a new 2x3 matrix
	 */
	mat2d.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};

	/**
	 * Copy the values from one mat2d to another
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the source matrix
	 * @returns {mat2d} out
	 */
	mat2d.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};

	/**
	 * Set a mat2d to the identity matrix
	 *
	 * @param {mat2d} out the receiving matrix
	 * @returns {mat2d} out
	 */
	mat2d.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};

	/**
	 * Inverts a mat2d
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the source matrix
	 * @returns {mat2d} out
	 */
	mat2d.invert = function(out, a) {
	    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
	        atx = a[4], aty = a[5];

	    var det = aa * ad - ab * ac;
	    if(!det){
	        return null;
	    }
	    det = 1.0 / det;

	    out[0] = ad * det;
	    out[1] = -ab * det;
	    out[2] = -ac * det;
	    out[3] = aa * det;
	    out[4] = (ac * aty - ad * atx) * det;
	    out[5] = (ab * atx - aa * aty) * det;
	    return out;
	};

	/**
	 * Calculates the determinant of a mat2d
	 *
	 * @param {mat2d} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat2d.determinant = function (a) {
	    return a[0] * a[3] - a[1] * a[2];
	};

	/**
	 * Multiplies two mat2d's
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the first operand
	 * @param {mat2d} b the second operand
	 * @returns {mat2d} out
	 */
	mat2d.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    out[4] = a0 * b4 + a2 * b5 + a4;
	    out[5] = a1 * b4 + a3 * b5 + a5;
	    return out;
	};

	/**
	 * Alias for {@link mat2d.multiply}
	 * @function
	 */
	mat2d.mul = mat2d.multiply;

	/**
	 * Rotates a mat2d by the given angle
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2d} out
	 */
	mat2d.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};

	/**
	 * Scales the mat2d by the dimensions in the given vec2
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to translate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat2d} out
	 **/
	mat2d.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};

	/**
	 * Translates the mat2d by the dimensions in the given vec2
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to translate
	 * @param {vec2} v the vec2 to translate the matrix by
	 * @returns {mat2d} out
	 **/
	mat2d.translate = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0;
	    out[1] = a1;
	    out[2] = a2;
	    out[3] = a3;
	    out[4] = a0 * v0 + a2 * v1 + a4;
	    out[5] = a1 * v0 + a3 * v1 + a5;
	    return out;
	};

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.rotate(dest, dest, rad);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2d} out
	 */
	mat2d.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.scale(dest, dest, vec);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat2d} out
	 */
	mat2d.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.translate(dest, dest, vec);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {vec2} v Translation vector
	 * @returns {mat2d} out
	 */
	mat2d.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = v[0];
	    out[5] = v[1];
	    return out;
	}

	/**
	 * Returns a string representation of a mat2d
	 *
	 * @param {mat2d} a matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat2d.str = function (a) {
	    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat2d
	 *
	 * @param {mat2d} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat2d.frob = function (a) { 
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
	}; 

	module.exports = mat2d;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(10);

	/**
	 * @class 3x3 Matrix
	 * @name mat3
	 */
	var mat3 = {};

	/**
	 * Creates a new identity mat3
	 *
	 * @returns {mat3} a new 3x3 matrix
	 */
	mat3.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};

	/**
	 * Copies the upper-left 3x3 values into the given mat3.
	 *
	 * @param {mat3} out the receiving 3x3 matrix
	 * @param {mat4} a   the source 4x4 matrix
	 * @returns {mat3} out
	 */
	mat3.fromMat4 = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[4];
	    out[4] = a[5];
	    out[5] = a[6];
	    out[6] = a[8];
	    out[7] = a[9];
	    out[8] = a[10];
	    return out;
	};

	/**
	 * Creates a new mat3 initialized with values from an existing matrix
	 *
	 * @param {mat3} a matrix to clone
	 * @returns {mat3} a new 3x3 matrix
	 */
	mat3.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Copy the values from one mat3 to another
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Set a mat3 to the identity matrix
	 *
	 * @param {mat3} out the receiving matrix
	 * @returns {mat3} out
	 */
	mat3.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a12 = a[5];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a01;
	        out[5] = a[7];
	        out[6] = a02;
	        out[7] = a12;
	    } else {
	        out[0] = a[0];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a[1];
	        out[4] = a[4];
	        out[5] = a[7];
	        out[6] = a[2];
	        out[7] = a[5];
	        out[8] = a[8];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        b01 = a22 * a11 - a12 * a21,
	        b11 = -a22 * a10 + a12 * a20,
	        b21 = a21 * a10 - a11 * a20,

	        // Calculate the determinant
	        det = a00 * b01 + a01 * b11 + a02 * b21;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = b01 * det;
	    out[1] = (-a22 * a01 + a02 * a21) * det;
	    out[2] = (a12 * a01 - a02 * a11) * det;
	    out[3] = b11 * det;
	    out[4] = (a22 * a00 - a02 * a20) * det;
	    out[5] = (-a12 * a00 + a02 * a10) * det;
	    out[6] = b21 * det;
	    out[7] = (-a21 * a00 + a01 * a20) * det;
	    out[8] = (a11 * a00 - a01 * a10) * det;
	    return out;
	};

	/**
	 * Calculates the adjugate of a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];

	    out[0] = (a11 * a22 - a12 * a21);
	    out[1] = (a02 * a21 - a01 * a22);
	    out[2] = (a01 * a12 - a02 * a11);
	    out[3] = (a12 * a20 - a10 * a22);
	    out[4] = (a00 * a22 - a02 * a20);
	    out[5] = (a02 * a10 - a00 * a12);
	    out[6] = (a10 * a21 - a11 * a20);
	    out[7] = (a01 * a20 - a00 * a21);
	    out[8] = (a00 * a11 - a01 * a10);
	    return out;
	};

	/**
	 * Calculates the determinant of a mat3
	 *
	 * @param {mat3} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat3.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];

	    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
	};

	/**
	 * Multiplies two mat3's
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @returns {mat3} out
	 */
	mat3.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        b00 = b[0], b01 = b[1], b02 = b[2],
	        b10 = b[3], b11 = b[4], b12 = b[5],
	        b20 = b[6], b21 = b[7], b22 = b[8];

	    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
	    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
	    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

	    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
	    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
	    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

	    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
	    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
	    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
	    return out;
	};

	/**
	 * Alias for {@link mat3.multiply}
	 * @function
	 */
	mat3.mul = mat3.multiply;

	/**
	 * Translate a mat3 by the given vector
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to translate
	 * @param {vec2} v vector to translate by
	 * @returns {mat3} out
	 */
	mat3.translate = function(out, a, v) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],
	        x = v[0], y = v[1];

	    out[0] = a00;
	    out[1] = a01;
	    out[2] = a02;

	    out[3] = a10;
	    out[4] = a11;
	    out[5] = a12;

	    out[6] = x * a00 + y * a10 + a20;
	    out[7] = x * a01 + y * a11 + a21;
	    out[8] = x * a02 + y * a12 + a22;
	    return out;
	};

	/**
	 * Rotates a mat3 by the given angle
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat3} out
	 */
	mat3.rotate = function (out, a, rad) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        s = Math.sin(rad),
	        c = Math.cos(rad);

	    out[0] = c * a00 + s * a10;
	    out[1] = c * a01 + s * a11;
	    out[2] = c * a02 + s * a12;

	    out[3] = c * a10 - s * a00;
	    out[4] = c * a11 - s * a01;
	    out[5] = c * a12 - s * a02;

	    out[6] = a20;
	    out[7] = a21;
	    out[8] = a22;
	    return out;
	};

	/**
	 * Scales the mat3 by the dimensions in the given vec2
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat3} out
	 **/
	mat3.scale = function(out, a, v) {
	    var x = v[0], y = v[1];

	    out[0] = x * a[0];
	    out[1] = x * a[1];
	    out[2] = x * a[2];

	    out[3] = y * a[3];
	    out[4] = y * a[4];
	    out[5] = y * a[5];

	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.translate(dest, dest, vec);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {vec2} v Translation vector
	 * @returns {mat3} out
	 */
	mat3.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = v[0];
	    out[7] = v[1];
	    out[8] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.rotate(dest, dest, rad);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat3} out
	 */
	mat3.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);

	    out[0] = c;
	    out[1] = s;
	    out[2] = 0;

	    out[3] = -s;
	    out[4] = c;
	    out[5] = 0;

	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.scale(dest, dest, vec);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat3} out
	 */
	mat3.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;

	    out[3] = 0;
	    out[4] = v[1];
	    out[5] = 0;

	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}

	/**
	 * Copies the values from a mat2d into a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat2d} a the matrix to copy
	 * @returns {mat3} out
	 **/
	mat3.fromMat2d = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = 0;

	    out[3] = a[2];
	    out[4] = a[3];
	    out[5] = 0;

	    out[6] = a[4];
	    out[7] = a[5];
	    out[8] = 1;
	    return out;
	};

	/**
	* Calculates a 3x3 matrix from the given quaternion
	*
	* @param {mat3} out mat3 receiving operation result
	* @param {quat} q Quaternion to create matrix from
	*
	* @returns {mat3} out
	*/
	mat3.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - yy - zz;
	    out[3] = yx - wz;
	    out[6] = zx + wy;

	    out[1] = yx + wz;
	    out[4] = 1 - xx - zz;
	    out[7] = zy - wx;

	    out[2] = zx - wy;
	    out[5] = zy + wx;
	    out[8] = 1 - xx - yy;

	    return out;
	};

	/**
	* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
	*
	* @param {mat3} out mat3 receiving operation result
	* @param {mat4} a Mat4 to derive the normal matrix from
	*
	* @returns {mat3} out
	*/
	mat3.normalFromMat4 = function (out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,

	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

	    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

	    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

	    return out;
	};

	/**
	 * Returns a string representation of a mat3
	 *
	 * @param {mat3} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat3.str = function (a) {
	    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
	                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat3
	 *
	 * @param {mat3} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat3.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
	};


	module.exports = mat3;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(10);

	/**
	 * @class 4x4 Matrix
	 * @name mat4
	 */
	var mat4 = {};

	/**
	 * Creates a new identity mat4
	 *
	 * @returns {mat4} a new 4x4 matrix
	 */
	mat4.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Creates a new mat4 initialized with values from an existing matrix
	 *
	 * @param {mat4} a matrix to clone
	 * @returns {mat4} a new 4x4 matrix
	 */
	mat4.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Copy the values from one mat4 to another
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Set a mat4 to the identity matrix
	 *
	 * @param {mat4} out the receiving matrix
	 * @returns {mat4} out
	 */
	mat4.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a03 = a[3],
	            a12 = a[6], a13 = a[7],
	            a23 = a[11];

	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a01;
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a02;
	        out[9] = a12;
	        out[11] = a[14];
	        out[12] = a03;
	        out[13] = a13;
	        out[14] = a23;
	    } else {
	        out[0] = a[0];
	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a[1];
	        out[5] = a[5];
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a[2];
	        out[9] = a[6];
	        out[10] = a[10];
	        out[11] = a[14];
	        out[12] = a[3];
	        out[13] = a[7];
	        out[14] = a[11];
	        out[15] = a[15];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,

	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

	    return out;
	};

	/**
	 * Calculates the adjugate of a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
	    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
	    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
	    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
	    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
	    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
	    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
	    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
	    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
	    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
	    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
	    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
	    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
	    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
	    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
	    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
	    return out;
	};

	/**
	 * Calculates the determinant of a mat4
	 *
	 * @param {mat4} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat4.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32;

	    // Calculate the determinant
	    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	};

	/**
	 * Multiplies two mat4's
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	mat4.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	    // Cache only the current line of the second matrix
	    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
	    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
	    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
	    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
	    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
	    return out;
	};

	/**
	 * Alias for {@link mat4.multiply}
	 * @function
	 */
	mat4.mul = mat4.multiply;

	/**
	 * Translate a mat4 by the given vector
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to translate
	 * @param {vec3} v vector to translate by
	 * @returns {mat4} out
	 */
	mat4.translate = function (out, a, v) {
	    var x = v[0], y = v[1], z = v[2],
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23;

	    if (a === out) {
	        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
	        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
	        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
	        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	    } else {
	        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
	        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
	        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

	        out[12] = a00 * x + a10 * y + a20 * z + a[12];
	        out[13] = a01 * x + a11 * y + a21 * z + a[13];
	        out[14] = a02 * x + a12 * y + a22 * z + a[14];
	        out[15] = a03 * x + a13 * y + a23 * z + a[15];
	    }

	    return out;
	};

	/**
	 * Scales the mat4 by the dimensions in the given vec3
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {vec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/
	mat4.scale = function(out, a, v) {
	    var x = v[0], y = v[1], z = v[2];

	    out[0] = a[0] * x;
	    out[1] = a[1] * x;
	    out[2] = a[2] * x;
	    out[3] = a[3] * x;
	    out[4] = a[4] * y;
	    out[5] = a[5] * y;
	    out[6] = a[6] * y;
	    out[7] = a[7] * y;
	    out[8] = a[8] * z;
	    out[9] = a[9] * z;
	    out[10] = a[10] * z;
	    out[11] = a[11] * z;
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Rotates a mat4 by the given angle around the given axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	mat4.rotate = function (out, a, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t,
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23,
	        b00, b01, b02,
	        b10, b11, b12,
	        b20, b21, b22;

	    if (Math.abs(len) < glMatrix.EPSILON) { return null; }
	    
	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;

	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;

	    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	    // Construct the elements of the rotation matrix
	    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
	    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
	    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

	    // Perform rotation-specific matrix multiplication
	    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the X axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.rotateX = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[0]  = a[0];
	        out[1]  = a[1];
	        out[2]  = a[2];
	        out[3]  = a[3];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[4] = a10 * c + a20 * s;
	    out[5] = a11 * c + a21 * s;
	    out[6] = a12 * c + a22 * s;
	    out[7] = a13 * c + a23 * s;
	    out[8] = a20 * c - a10 * s;
	    out[9] = a21 * c - a11 * s;
	    out[10] = a22 * c - a12 * s;
	    out[11] = a23 * c - a13 * s;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Y axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.rotateY = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[4]  = a[4];
	        out[5]  = a[5];
	        out[6]  = a[6];
	        out[7]  = a[7];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c - a20 * s;
	    out[1] = a01 * c - a21 * s;
	    out[2] = a02 * c - a22 * s;
	    out[3] = a03 * c - a23 * s;
	    out[8] = a00 * s + a20 * c;
	    out[9] = a01 * s + a21 * c;
	    out[10] = a02 * s + a22 * c;
	    out[11] = a03 * s + a23 * c;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Z axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.rotateZ = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7];

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[8]  = a[8];
	        out[9]  = a[9];
	        out[10] = a[10];
	        out[11] = a[11];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c + a10 * s;
	    out[1] = a01 * c + a11 * s;
	    out[2] = a02 * c + a12 * s;
	    out[3] = a03 * c + a13 * s;
	    out[4] = a10 * c - a00 * s;
	    out[5] = a11 * c - a01 * s;
	    out[6] = a12 * c - a02 * s;
	    out[7] = a13 * c - a03 * s;
	    return out;
	};

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, dest, vec);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {vec3} v Translation vector
	 * @returns {mat4} out
	 */
	mat4.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.scale(dest, dest, vec);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {vec3} v Scaling vector
	 * @returns {mat4} out
	 */
	mat4.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = v[1];
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = v[2];
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a given angle around a given axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotate(dest, dest, rad, axis);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	mat4.fromRotation = function(out, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t;
	    
	    if (Math.abs(len) < glMatrix.EPSILON) { return null; }
	    
	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;
	    
	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;
	    
	    // Perform rotation-specific matrix multiplication
	    out[0] = x * x * t + c;
	    out[1] = y * x * t + z * s;
	    out[2] = z * x * t - y * s;
	    out[3] = 0;
	    out[4] = x * y * t - z * s;
	    out[5] = y * y * t + c;
	    out[6] = z * y * t + x * s;
	    out[7] = 0;
	    out[8] = x * z * t + y * s;
	    out[9] = y * z * t - x * s;
	    out[10] = z * z * t + c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the X axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateX(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromXRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    
	    // Perform axis-specific matrix multiplication
	    out[0]  = 1;
	    out[1]  = 0;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = c;
	    out[6] = s;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = -s;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the Y axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateY(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromYRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    
	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = 0;
	    out[2]  = -s;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = s;
	    out[9] = 0;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the Z axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateZ(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromZRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    
	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = s;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = -s;
	    out[5] = c;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a quaternion rotation and vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslation = function (out, q, v) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - (yy + zz);
	    out[1] = xy + wz;
	    out[2] = xz - wy;
	    out[3] = 0;
	    out[4] = xy - wz;
	    out[5] = 1 - (xx + zz);
	    out[6] = yz + wx;
	    out[7] = 0;
	    out[8] = xz + wy;
	    out[9] = yz - wx;
	    out[10] = 1 - (xx + yy);
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    
	    return out;
	};

	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @param {vec3} s Scaling vector
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslationScale = function (out, q, v, s) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2,
	        sx = s[0],
	        sy = s[1],
	        sz = s[2];

	    out[0] = (1 - (yy + zz)) * sx;
	    out[1] = (xy + wz) * sx;
	    out[2] = (xz - wy) * sx;
	    out[3] = 0;
	    out[4] = (xy - wz) * sy;
	    out[5] = (1 - (xx + zz)) * sy;
	    out[6] = (yz + wx) * sy;
	    out[7] = 0;
	    out[8] = (xz + wy) * sz;
	    out[9] = (yz - wx) * sz;
	    out[10] = (1 - (xx + yy)) * sz;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    
	    return out;
	};

	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     mat4.translate(dest, origin);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *     mat4.translate(dest, negativeOrigin);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @param {vec3} s Scaling vector
	 * @param {vec3} o The origin vector around which to scale and rotate
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
	  // Quaternion math
	  var x = q[0], y = q[1], z = q[2], w = q[3],
	      x2 = x + x,
	      y2 = y + y,
	      z2 = z + z,

	      xx = x * x2,
	      xy = x * y2,
	      xz = x * z2,
	      yy = y * y2,
	      yz = y * z2,
	      zz = z * z2,
	      wx = w * x2,
	      wy = w * y2,
	      wz = w * z2,
	      
	      sx = s[0],
	      sy = s[1],
	      sz = s[2],

	      ox = o[0],
	      oy = o[1],
	      oz = o[2];
	      
	  out[0] = (1 - (yy + zz)) * sx;
	  out[1] = (xy + wz) * sx;
	  out[2] = (xz - wy) * sx;
	  out[3] = 0;
	  out[4] = (xy - wz) * sy;
	  out[5] = (1 - (xx + zz)) * sy;
	  out[6] = (yz + wx) * sy;
	  out[7] = 0;
	  out[8] = (xz + wy) * sz;
	  out[9] = (yz - wx) * sz;
	  out[10] = (1 - (xx + yy)) * sz;
	  out[11] = 0;
	  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
	  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
	  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
	  out[15] = 1;
	        
	  return out;
	};

	mat4.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - yy - zz;
	    out[1] = yx + wz;
	    out[2] = zx - wy;
	    out[3] = 0;

	    out[4] = yx - wz;
	    out[5] = 1 - xx - zz;
	    out[6] = zy + wx;
	    out[7] = 0;

	    out[8] = zx + wy;
	    out[9] = zy - wx;
	    out[10] = 1 - xx - yy;
	    out[11] = 0;

	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;

	    return out;
	};

	/**
	 * Generates a frustum matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {Number} left Left bound of the frustum
	 * @param {Number} right Right bound of the frustum
	 * @param {Number} bottom Bottom bound of the frustum
	 * @param {Number} top Top bound of the frustum
	 * @param {Number} near Near bound of the frustum
	 * @param {Number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.frustum = function (out, left, right, bottom, top, near, far) {
	    var rl = 1 / (right - left),
	        tb = 1 / (top - bottom),
	        nf = 1 / (near - far);
	    out[0] = (near * 2) * rl;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = (near * 2) * tb;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = (right + left) * rl;
	    out[9] = (top + bottom) * tb;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (far * near * 2) * nf;
	    out[15] = 0;
	    return out;
	};

	/**
	 * Generates a perspective projection matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} fovy Vertical field of view in radians
	 * @param {number} aspect Aspect ratio. typically viewport width/height
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.perspective = function (out, fovy, aspect, near, far) {
	    var f = 1.0 / Math.tan(fovy / 2),
	        nf = 1 / (near - far);
	    out[0] = f / aspect;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = f;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (2 * far * near) * nf;
	    out[15] = 0;
	    return out;
	};

	/**
	 * Generates a perspective projection matrix with the given field of view.
	 * This is primarily useful for generating projection matrices to be used
	 * with the still experiemental WebVR API.
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
	    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
	        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
	        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
	        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
	        xScale = 2.0 / (leftTan + rightTan),
	        yScale = 2.0 / (upTan + downTan);

	    out[0] = xScale;
	    out[1] = 0.0;
	    out[2] = 0.0;
	    out[3] = 0.0;
	    out[4] = 0.0;
	    out[5] = yScale;
	    out[6] = 0.0;
	    out[7] = 0.0;
	    out[8] = -((leftTan - rightTan) * xScale * 0.5);
	    out[9] = ((upTan - downTan) * yScale * 0.5);
	    out[10] = far / (near - far);
	    out[11] = -1.0;
	    out[12] = 0.0;
	    out[13] = 0.0;
	    out[14] = (far * near) / (near - far);
	    out[15] = 0.0;
	    return out;
	}

	/**
	 * Generates a orthogonal projection matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} left Left bound of the frustum
	 * @param {number} right Right bound of the frustum
	 * @param {number} bottom Bottom bound of the frustum
	 * @param {number} top Top bound of the frustum
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.ortho = function (out, left, right, bottom, top, near, far) {
	    var lr = 1 / (left - right),
	        bt = 1 / (bottom - top),
	        nf = 1 / (near - far);
	    out[0] = -2 * lr;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = -2 * bt;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 2 * nf;
	    out[11] = 0;
	    out[12] = (left + right) * lr;
	    out[13] = (top + bottom) * bt;
	    out[14] = (far + near) * nf;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Generates a look-at matrix with the given eye position, focal point, and up axis
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {vec3} eye Position of the viewer
	 * @param {vec3} center Point the viewer is looking at
	 * @param {vec3} up vec3 pointing up
	 * @returns {mat4} out
	 */
	mat4.lookAt = function (out, eye, center, up) {
	    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
	        eyex = eye[0],
	        eyey = eye[1],
	        eyez = eye[2],
	        upx = up[0],
	        upy = up[1],
	        upz = up[2],
	        centerx = center[0],
	        centery = center[1],
	        centerz = center[2];

	    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
	        Math.abs(eyey - centery) < glMatrix.EPSILON &&
	        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
	        return mat4.identity(out);
	    }

	    z0 = eyex - centerx;
	    z1 = eyey - centery;
	    z2 = eyez - centerz;

	    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
	    z0 *= len;
	    z1 *= len;
	    z2 *= len;

	    x0 = upy * z2 - upz * z1;
	    x1 = upz * z0 - upx * z2;
	    x2 = upx * z1 - upy * z0;
	    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
	    if (!len) {
	        x0 = 0;
	        x1 = 0;
	        x2 = 0;
	    } else {
	        len = 1 / len;
	        x0 *= len;
	        x1 *= len;
	        x2 *= len;
	    }

	    y0 = z1 * x2 - z2 * x1;
	    y1 = z2 * x0 - z0 * x2;
	    y2 = z0 * x1 - z1 * x0;

	    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
	    if (!len) {
	        y0 = 0;
	        y1 = 0;
	        y2 = 0;
	    } else {
	        len = 1 / len;
	        y0 *= len;
	        y1 *= len;
	        y2 *= len;
	    }

	    out[0] = x0;
	    out[1] = y0;
	    out[2] = z0;
	    out[3] = 0;
	    out[4] = x1;
	    out[5] = y1;
	    out[6] = z1;
	    out[7] = 0;
	    out[8] = x2;
	    out[9] = y2;
	    out[10] = z2;
	    out[11] = 0;
	    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	    out[15] = 1;

	    return out;
	};

	/**
	 * Returns a string representation of a mat4
	 *
	 * @param {mat4} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat4.str = function (a) {
	    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
	                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
	                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
	                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat4
	 *
	 * @param {mat4} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat4.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
	};


	module.exports = mat4;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(10);
	var mat3 = __webpack_require__(13);
	var vec3 = __webpack_require__(16);
	var vec4 = __webpack_require__(17);

	/**
	 * @class Quaternion
	 * @name quat
	 */
	var quat = {};

	/**
	 * Creates a new identity quat
	 *
	 * @returns {quat} a new quaternion
	 */
	quat.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Sets a quaternion to represent the shortest rotation from one
	 * vector to another.
	 *
	 * Both vectors are assumed to be unit length.
	 *
	 * @param {quat} out the receiving quaternion.
	 * @param {vec3} a the initial vector
	 * @param {vec3} b the destination vector
	 * @returns {quat} out
	 */
	quat.rotationTo = (function() {
	    var tmpvec3 = vec3.create();
	    var xUnitVec3 = vec3.fromValues(1,0,0);
	    var yUnitVec3 = vec3.fromValues(0,1,0);

	    return function(out, a, b) {
	        var dot = vec3.dot(a, b);
	        if (dot < -0.999999) {
	            vec3.cross(tmpvec3, xUnitVec3, a);
	            if (vec3.length(tmpvec3) < 0.000001)
	                vec3.cross(tmpvec3, yUnitVec3, a);
	            vec3.normalize(tmpvec3, tmpvec3);
	            quat.setAxisAngle(out, tmpvec3, Math.PI);
	            return out;
	        } else if (dot > 0.999999) {
	            out[0] = 0;
	            out[1] = 0;
	            out[2] = 0;
	            out[3] = 1;
	            return out;
	        } else {
	            vec3.cross(tmpvec3, a, b);
	            out[0] = tmpvec3[0];
	            out[1] = tmpvec3[1];
	            out[2] = tmpvec3[2];
	            out[3] = 1 + dot;
	            return quat.normalize(out, out);
	        }
	    };
	})();

	/**
	 * Sets the specified quaternion with values corresponding to the given
	 * axes. Each axis is a vec3 and is expected to be unit length and
	 * perpendicular to all other specified axes.
	 *
	 * @param {vec3} view  the vector representing the viewing direction
	 * @param {vec3} right the vector representing the local "right" direction
	 * @param {vec3} up    the vector representing the local "up" direction
	 * @returns {quat} out
	 */
	quat.setAxes = (function() {
	    var matr = mat3.create();

	    return function(out, view, right, up) {
	        matr[0] = right[0];
	        matr[3] = right[1];
	        matr[6] = right[2];

	        matr[1] = up[0];
	        matr[4] = up[1];
	        matr[7] = up[2];

	        matr[2] = -view[0];
	        matr[5] = -view[1];
	        matr[8] = -view[2];

	        return quat.normalize(out, quat.fromMat3(out, matr));
	    };
	})();

	/**
	 * Creates a new quat initialized with values from an existing quaternion
	 *
	 * @param {quat} a quaternion to clone
	 * @returns {quat} a new quaternion
	 * @function
	 */
	quat.clone = vec4.clone;

	/**
	 * Creates a new quat initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} a new quaternion
	 * @function
	 */
	quat.fromValues = vec4.fromValues;

	/**
	 * Copy the values from one quat to another
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the source quaternion
	 * @returns {quat} out
	 * @function
	 */
	quat.copy = vec4.copy;

	/**
	 * Set the components of a quat to the given values
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} out
	 * @function
	 */
	quat.set = vec4.set;

	/**
	 * Set a quat to the identity quaternion
	 *
	 * @param {quat} out the receiving quaternion
	 * @returns {quat} out
	 */
	quat.identity = function(out) {
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Sets a quat from the given angle and rotation axis,
	 * then returns it.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {vec3} axis the axis around which to rotate
	 * @param {Number} rad the angle in radians
	 * @returns {quat} out
	 **/
	quat.setAxisAngle = function(out, axis, rad) {
	    rad = rad * 0.5;
	    var s = Math.sin(rad);
	    out[0] = s * axis[0];
	    out[1] = s * axis[1];
	    out[2] = s * axis[2];
	    out[3] = Math.cos(rad);
	    return out;
	};

	/**
	 * Adds two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {quat} out
	 * @function
	 */
	quat.add = vec4.add;

	/**
	 * Multiplies two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {quat} out
	 */
	quat.multiply = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];

	    out[0] = ax * bw + aw * bx + ay * bz - az * by;
	    out[1] = ay * bw + aw * by + az * bx - ax * bz;
	    out[2] = az * bw + aw * bz + ax * by - ay * bx;
	    out[3] = aw * bw - ax * bx - ay * by - az * bz;
	    return out;
	};

	/**
	 * Alias for {@link quat.multiply}
	 * @function
	 */
	quat.mul = quat.multiply;

	/**
	 * Scales a quat by a scalar number
	 *
	 * @param {quat} out the receiving vector
	 * @param {quat} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {quat} out
	 * @function
	 */
	quat.scale = vec4.scale;

	/**
	 * Rotates a quaternion by the given angle about the X axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateX = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw + aw * bx;
	    out[1] = ay * bw + az * bx;
	    out[2] = az * bw - ay * bx;
	    out[3] = aw * bw - ax * bx;
	    return out;
	};

	/**
	 * Rotates a quaternion by the given angle about the Y axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateY = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        by = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw - az * by;
	    out[1] = ay * bw + aw * by;
	    out[2] = az * bw + ax * by;
	    out[3] = aw * bw - ay * by;
	    return out;
	};

	/**
	 * Rotates a quaternion by the given angle about the Z axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateZ = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bz = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw + ay * bz;
	    out[1] = ay * bw - ax * bz;
	    out[2] = az * bw + aw * bz;
	    out[3] = aw * bw - az * bz;
	    return out;
	};

	/**
	 * Calculates the W component of a quat from the X, Y, and Z components.
	 * Assumes that quaternion is 1 unit in length.
	 * Any existing W component will be ignored.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate W component of
	 * @returns {quat} out
	 */
	quat.calculateW = function (out, a) {
	    var x = a[0], y = a[1], z = a[2];

	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
	    return out;
	};

	/**
	 * Calculates the dot product of two quat's
	 *
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {Number} dot product of a and b
	 * @function
	 */
	quat.dot = vec4.dot;

	/**
	 * Performs a linear interpolation between two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {quat} out
	 * @function
	 */
	quat.lerp = vec4.lerp;

	/**
	 * Performs a spherical linear interpolation between two quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {quat} out
	 */
	quat.slerp = function (out, a, b, t) {
	    // benchmarks:
	    //    http://jsperf.com/quaternion-slerp-implementations

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];

	    var        omega, cosom, sinom, scale0, scale1;

	    // calc cosine
	    cosom = ax * bx + ay * by + az * bz + aw * bw;
	    // adjust signs (if necessary)
	    if ( cosom < 0.0 ) {
	        cosom = -cosom;
	        bx = - bx;
	        by = - by;
	        bz = - bz;
	        bw = - bw;
	    }
	    // calculate coefficients
	    if ( (1.0 - cosom) > 0.000001 ) {
	        // standard case (slerp)
	        omega  = Math.acos(cosom);
	        sinom  = Math.sin(omega);
	        scale0 = Math.sin((1.0 - t) * omega) / sinom;
	        scale1 = Math.sin(t * omega) / sinom;
	    } else {        
	        // "from" and "to" quaternions are very close 
	        //  ... so we can do a linear interpolation
	        scale0 = 1.0 - t;
	        scale1 = t;
	    }
	    // calculate final values
	    out[0] = scale0 * ax + scale1 * bx;
	    out[1] = scale0 * ay + scale1 * by;
	    out[2] = scale0 * az + scale1 * bz;
	    out[3] = scale0 * aw + scale1 * bw;
	    
	    return out;
	};

	/**
	 * Performs a spherical linear interpolation with two control points
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {quat} c the third operand
	 * @param {quat} d the fourth operand
	 * @param {Number} t interpolation amount
	 * @returns {quat} out
	 */
	quat.sqlerp = (function () {
	  var temp1 = quat.create();
	  var temp2 = quat.create();
	  
	  return function (out, a, b, c, d, t) {
	    quat.slerp(temp1, a, d, t);
	    quat.slerp(temp2, b, c, t);
	    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
	    
	    return out;
	  };
	}());

	/**
	 * Calculates the inverse of a quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate inverse of
	 * @returns {quat} out
	 */
	quat.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
	        invDot = dot ? 1.0/dot : 0;
	    
	    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

	    out[0] = -a0*invDot;
	    out[1] = -a1*invDot;
	    out[2] = -a2*invDot;
	    out[3] = a3*invDot;
	    return out;
	};

	/**
	 * Calculates the conjugate of a quat
	 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate conjugate of
	 * @returns {quat} out
	 */
	quat.conjugate = function (out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Calculates the length of a quat
	 *
	 * @param {quat} a vector to calculate length of
	 * @returns {Number} length of a
	 * @function
	 */
	quat.length = vec4.length;

	/**
	 * Alias for {@link quat.length}
	 * @function
	 */
	quat.len = quat.length;

	/**
	 * Calculates the squared length of a quat
	 *
	 * @param {quat} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 * @function
	 */
	quat.squaredLength = vec4.squaredLength;

	/**
	 * Alias for {@link quat.squaredLength}
	 * @function
	 */
	quat.sqrLen = quat.squaredLength;

	/**
	 * Normalize a quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quaternion to normalize
	 * @returns {quat} out
	 * @function
	 */
	quat.normalize = vec4.normalize;

	/**
	 * Creates a quaternion from the given 3x3 rotation matrix.
	 *
	 * NOTE: The resultant quaternion is not normalized, so you should be sure
	 * to renormalize the quaternion yourself where necessary.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {mat3} m rotation matrix
	 * @returns {quat} out
	 * @function
	 */
	quat.fromMat3 = function(out, m) {
	    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
	    // article "Quaternion Calculus and Fast Animation".
	    var fTrace = m[0] + m[4] + m[8];
	    var fRoot;

	    if ( fTrace > 0.0 ) {
	        // |w| > 1/2, may as well choose w > 1/2
	        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
	        out[3] = 0.5 * fRoot;
	        fRoot = 0.5/fRoot;  // 1/(4w)
	        out[0] = (m[5]-m[7])*fRoot;
	        out[1] = (m[6]-m[2])*fRoot;
	        out[2] = (m[1]-m[3])*fRoot;
	    } else {
	        // |w| <= 1/2
	        var i = 0;
	        if ( m[4] > m[0] )
	          i = 1;
	        if ( m[8] > m[i*3+i] )
	          i = 2;
	        var j = (i+1)%3;
	        var k = (i+2)%3;
	        
	        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
	        out[i] = 0.5 * fRoot;
	        fRoot = 0.5 / fRoot;
	        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
	        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
	        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
	    }
	    
	    return out;
	};

	/**
	 * Returns a string representation of a quatenion
	 *
	 * @param {quat} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	quat.str = function (a) {
	    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	module.exports = quat;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(10);

	/**
	 * @class 3 Dimensional Vector
	 * @name vec3
	 */
	var vec3 = {};

	/**
	 * Creates a new, empty vec3
	 *
	 * @returns {vec3} a new 3D vector
	 */
	vec3.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    return out;
	};

	/**
	 * Creates a new vec3 initialized with values from an existing vector
	 *
	 * @param {vec3} a vector to clone
	 * @returns {vec3} a new 3D vector
	 */
	vec3.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};

	/**
	 * Creates a new vec3 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} a new 3D vector
	 */
	vec3.fromValues = function(x, y, z) {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};

	/**
	 * Copy the values from one vec3 to another
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the source vector
	 * @returns {vec3} out
	 */
	vec3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};

	/**
	 * Set the components of a vec3 to the given values
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} out
	 */
	vec3.set = function(out, x, y, z) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};

	/**
	 * Adds two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.subtract}
	 * @function
	 */
	vec3.sub = vec3.subtract;

	/**
	 * Multiplies two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.multiply}
	 * @function
	 */
	vec3.mul = vec3.multiply;

	/**
	 * Divides two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.divide}
	 * @function
	 */
	vec3.div = vec3.divide;

	/**
	 * Returns the minimum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    return out;
	};

	/**
	 * Scales a vec3 by a scalar number
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec3} out
	 */
	vec3.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    return out;
	};

	/**
	 * Adds two vec3's after scaling the second operand by a scalar value
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec3} out
	 */
	vec3.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec3.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};

	/**
	 * Alias for {@link vec3.distance}
	 * @function
	 */
	vec3.dist = vec3.distance;

	/**
	 * Calculates the squared euclidian distance between two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec3.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return x*x + y*y + z*z;
	};

	/**
	 * Alias for {@link vec3.squaredDistance}
	 * @function
	 */
	vec3.sqrDist = vec3.squaredDistance;

	/**
	 * Calculates the length of a vec3
	 *
	 * @param {vec3} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec3.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};

	/**
	 * Alias for {@link vec3.length}
	 * @function
	 */
	vec3.len = vec3.length;

	/**
	 * Calculates the squared length of a vec3
	 *
	 * @param {vec3} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec3.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return x*x + y*y + z*z;
	};

	/**
	 * Alias for {@link vec3.squaredLength}
	 * @function
	 */
	vec3.sqrLen = vec3.squaredLength;

	/**
	 * Negates the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to negate
	 * @returns {vec3} out
	 */
	vec3.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to invert
	 * @returns {vec3} out
	 */
	vec3.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  return out;
	};

	/**
	 * Normalize a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to normalize
	 * @returns {vec3} out
	 */
	vec3.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    var len = x*x + y*y + z*z;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	        out[2] = a[2] * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec3.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	};

	/**
	 * Computes the cross product of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.cross = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2],
	        bx = b[0], by = b[1], bz = b[2];

	    out[0] = ay * bz - az * by;
	    out[1] = az * bx - ax * bz;
	    out[2] = ax * by - ay * bx;
	    return out;
	};

	/**
	 * Performs a linear interpolation between two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    return out;
	};

	/**
	 * Performs a hermite interpolation with two control points
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {vec3} c the third operand
	 * @param {vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.hermite = function (out, a, b, c, d, t) {
	  var factorTimes2 = t * t,
	      factor1 = factorTimes2 * (2 * t - 3) + 1,
	      factor2 = factorTimes2 * (t - 2) + t,
	      factor3 = factorTimes2 * (t - 1),
	      factor4 = factorTimes2 * (3 - 2 * t);
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};

	/**
	 * Performs a bezier interpolation with two control points
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {vec3} c the third operand
	 * @param {vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.bezier = function (out, a, b, c, d, t) {
	  var inverseFactor = 1 - t,
	      inverseFactorTimesTwo = inverseFactor * inverseFactor,
	      factorTimes2 = t * t,
	      factor1 = inverseFactorTimesTwo * inverseFactor,
	      factor2 = 3 * t * inverseFactorTimesTwo,
	      factor3 = 3 * factorTimes2 * inverseFactor,
	      factor4 = factorTimes2 * t;
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec3} out
	 */
	vec3.random = function (out, scale) {
	    scale = scale || 1.0;

	    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
	    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
	    var zScale = Math.sqrt(1.0-z*z) * scale;

	    out[0] = Math.cos(r) * zScale;
	    out[1] = Math.sin(r) * zScale;
	    out[2] = z * scale;
	    return out;
	};

	/**
	 * Transforms the vec3 with a mat4.
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec3} out
	 */
	vec3.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2],
	        w = m[3] * x + m[7] * y + m[11] * z + m[15];
	    w = w || 1.0;
	    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
	    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
	    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
	    return out;
	};

	/**
	 * Transforms the vec3 with a mat3.
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {mat4} m the 3x3 matrix to transform with
	 * @returns {vec3} out
	 */
	vec3.transformMat3 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2];
	    out[0] = x * m[0] + y * m[3] + z * m[6];
	    out[1] = x * m[1] + y * m[4] + z * m[7];
	    out[2] = x * m[2] + y * m[5] + z * m[8];
	    return out;
	};

	/**
	 * Transforms the vec3 with a quat
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {quat} q quaternion to transform with
	 * @returns {vec3} out
	 */
	vec3.transformQuat = function(out, a, q) {
	    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

	        // calculate quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;

	    // calculate result * inverse quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    return out;
	};

	/**
	 * Rotate a 3D vector around the x-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateX = function(out, a, b, c){
	   var p = [], r=[];
		  //Translate point to the origin
		  p[0] = a[0] - b[0];
		  p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];

		  //perform rotation
		  r[0] = p[0];
		  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
		  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

		  //translate to correct position
		  out[0] = r[0] + b[0];
		  out[1] = r[1] + b[1];
		  out[2] = r[2] + b[2];

	  	return out;
	};

	/**
	 * Rotate a 3D vector around the y-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateY = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
	  	r[1] = p[1];
	  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};

	/**
	 * Rotate a 3D vector around the z-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateZ = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
	  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
	  	r[2] = p[2];
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};

	/**
	 * Perform some operation over an array of vec3s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec3.forEach = (function() {
	    var vec = vec3.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 3;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Get the angle between two 3D vectors
	 * @param {vec3} a The first operand
	 * @param {vec3} b The second operand
	 * @returns {Number} The angle in radians
	 */
	vec3.angle = function(a, b) {
	   
	    var tempA = vec3.fromValues(a[0], a[1], a[2]);
	    var tempB = vec3.fromValues(b[0], b[1], b[2]);
	 
	    vec3.normalize(tempA, tempA);
	    vec3.normalize(tempB, tempB);
	 
	    var cosine = vec3.dot(tempA, tempB);

	    if(cosine > 1.0){
	        return 0;
	    } else {
	        return Math.acos(cosine);
	    }     
	};

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec3} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec3.str = function (a) {
	    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
	};

	module.exports = vec3;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(10);

	/**
	 * @class 4 Dimensional Vector
	 * @name vec4
	 */
	var vec4 = {};

	/**
	 * Creates a new, empty vec4
	 *
	 * @returns {vec4} a new 4D vector
	 */
	vec4.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    return out;
	};

	/**
	 * Creates a new vec4 initialized with values from an existing vector
	 *
	 * @param {vec4} a vector to clone
	 * @returns {vec4} a new 4D vector
	 */
	vec4.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Creates a new vec4 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} a new 4D vector
	 */
	vec4.fromValues = function(x, y, z, w) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};

	/**
	 * Copy the values from one vec4 to another
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the source vector
	 * @returns {vec4} out
	 */
	vec4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Set the components of a vec4 to the given values
	 *
	 * @param {vec4} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} out
	 */
	vec4.set = function(out, x, y, z, w) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};

	/**
	 * Adds two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.subtract}
	 * @function
	 */
	vec4.sub = vec4.subtract;

	/**
	 * Multiplies two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    out[3] = a[3] * b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.multiply}
	 * @function
	 */
	vec4.mul = vec4.multiply;

	/**
	 * Divides two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    out[3] = a[3] / b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.divide}
	 * @function
	 */
	vec4.div = vec4.divide;

	/**
	 * Returns the minimum of two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    out[3] = Math.min(a[3], b[3]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    out[3] = Math.max(a[3], b[3]);
	    return out;
	};

	/**
	 * Scales a vec4 by a scalar number
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec4} out
	 */
	vec4.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    return out;
	};

	/**
	 * Adds two vec4's after scaling the second operand by a scalar value
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec4} out
	 */
	vec4.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec4.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};

	/**
	 * Alias for {@link vec4.distance}
	 * @function
	 */
	vec4.dist = vec4.distance;

	/**
	 * Calculates the squared euclidian distance between two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec4.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return x*x + y*y + z*z + w*w;
	};

	/**
	 * Alias for {@link vec4.squaredDistance}
	 * @function
	 */
	vec4.sqrDist = vec4.squaredDistance;

	/**
	 * Calculates the length of a vec4
	 *
	 * @param {vec4} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec4.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};

	/**
	 * Alias for {@link vec4.length}
	 * @function
	 */
	vec4.len = vec4.length;

	/**
	 * Calculates the squared length of a vec4
	 *
	 * @param {vec4} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec4.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return x*x + y*y + z*z + w*w;
	};

	/**
	 * Alias for {@link vec4.squaredLength}
	 * @function
	 */
	vec4.sqrLen = vec4.squaredLength;

	/**
	 * Negates the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to negate
	 * @returns {vec4} out
	 */
	vec4.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = -a[3];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to invert
	 * @returns {vec4} out
	 */
	vec4.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  out[3] = 1.0 / a[3];
	  return out;
	};

	/**
	 * Normalize a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to normalize
	 * @returns {vec4} out
	 */
	vec4.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    var len = x*x + y*y + z*z + w*w;
	    if (len > 0) {
	        len = 1 / Math.sqrt(len);
	        out[0] = x * len;
	        out[1] = y * len;
	        out[2] = z * len;
	        out[3] = w * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec4.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	};

	/**
	 * Performs a linear interpolation between two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec4} out
	 */
	vec4.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    out[3] = aw + t * (b[3] - aw);
	    return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec4} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec4} out
	 */
	vec4.random = function (out, scale) {
	    scale = scale || 1.0;

	    //TODO: This is a pretty awful way of doing this. Find something better.
	    out[0] = glMatrix.RANDOM();
	    out[1] = glMatrix.RANDOM();
	    out[2] = glMatrix.RANDOM();
	    out[3] = glMatrix.RANDOM();
	    vec4.normalize(out, out);
	    vec4.scale(out, out, scale);
	    return out;
	};

	/**
	 * Transforms the vec4 with a mat4.
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec4} out
	 */
	vec4.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2], w = a[3];
	    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
	    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
	    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
	    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
	    return out;
	};

	/**
	 * Transforms the vec4 with a quat
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to transform
	 * @param {quat} q quaternion to transform with
	 * @returns {vec4} out
	 */
	vec4.transformQuat = function(out, a, q) {
	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

	        // calculate quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;

	    // calculate result * inverse quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Perform some operation over an array of vec4s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec4.forEach = (function() {
	    var vec = vec4.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 4;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec4} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec4.str = function (a) {
	    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	module.exports = vec4;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(10);

	/**
	 * @class 2 Dimensional Vector
	 * @name vec2
	 */
	var vec2 = {};

	/**
	 * Creates a new, empty vec2
	 *
	 * @returns {vec2} a new 2D vector
	 */
	vec2.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = 0;
	    out[1] = 0;
	    return out;
	};

	/**
	 * Creates a new vec2 initialized with values from an existing vector
	 *
	 * @param {vec2} a vector to clone
	 * @returns {vec2} a new 2D vector
	 */
	vec2.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};

	/**
	 * Creates a new vec2 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} a new 2D vector
	 */
	vec2.fromValues = function(x, y) {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = x;
	    out[1] = y;
	    return out;
	};

	/**
	 * Copy the values from one vec2 to another
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the source vector
	 * @returns {vec2} out
	 */
	vec2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};

	/**
	 * Set the components of a vec2 to the given values
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} out
	 */
	vec2.set = function(out, x, y) {
	    out[0] = x;
	    out[1] = y;
	    return out;
	};

	/**
	 * Adds two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.subtract}
	 * @function
	 */
	vec2.sub = vec2.subtract;

	/**
	 * Multiplies two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.multiply}
	 * @function
	 */
	vec2.mul = vec2.multiply;

	/**
	 * Divides two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.divide}
	 * @function
	 */
	vec2.div = vec2.divide;

	/**
	 * Returns the minimum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    return out;
	};

	/**
	 * Scales a vec2 by a scalar number
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec2} out
	 */
	vec2.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    return out;
	};

	/**
	 * Adds two vec2's after scaling the second operand by a scalar value
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec2} out
	 */
	vec2.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec2.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return Math.sqrt(x*x + y*y);
	};

	/**
	 * Alias for {@link vec2.distance}
	 * @function
	 */
	vec2.dist = vec2.distance;

	/**
	 * Calculates the squared euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec2.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return x*x + y*y;
	};

	/**
	 * Alias for {@link vec2.squaredDistance}
	 * @function
	 */
	vec2.sqrDist = vec2.squaredDistance;

	/**
	 * Calculates the length of a vec2
	 *
	 * @param {vec2} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec2.length = function (a) {
	    var x = a[0],
	        y = a[1];
	    return Math.sqrt(x*x + y*y);
	};

	/**
	 * Alias for {@link vec2.length}
	 * @function
	 */
	vec2.len = vec2.length;

	/**
	 * Calculates the squared length of a vec2
	 *
	 * @param {vec2} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec2.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1];
	    return x*x + y*y;
	};

	/**
	 * Alias for {@link vec2.squaredLength}
	 * @function
	 */
	vec2.sqrLen = vec2.squaredLength;

	/**
	 * Negates the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to negate
	 * @returns {vec2} out
	 */
	vec2.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to invert
	 * @returns {vec2} out
	 */
	vec2.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  return out;
	};

	/**
	 * Normalize a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to normalize
	 * @returns {vec2} out
	 */
	vec2.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1];
	    var len = x*x + y*y;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec2.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1];
	};

	/**
	 * Computes the cross product of two vec2's
	 * Note that the cross product must by definition produce a 3D vector
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec3} out
	 */
	vec2.cross = function(out, a, b) {
	    var z = a[0] * b[1] - a[1] * b[0];
	    out[0] = out[1] = 0;
	    out[2] = z;
	    return out;
	};

	/**
	 * Performs a linear interpolation between two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec2} out
	 */
	vec2.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec2} out
	 */
	vec2.random = function (out, scale) {
	    scale = scale || 1.0;
	    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
	    out[0] = Math.cos(r) * scale;
	    out[1] = Math.sin(r) * scale;
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat2 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y;
	    out[1] = m[1] * x + m[3] * y;
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat2d
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2d} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat2d = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y + m[4];
	    out[1] = m[1] * x + m[3] * y + m[5];
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat3
	 * 3rd vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat3} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat3 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[3] * y + m[6];
	    out[1] = m[1] * x + m[4] * y + m[7];
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat4
	 * 3rd vector component is implicitly '0'
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat4 = function(out, a, m) {
	    var x = a[0], 
	        y = a[1];
	    out[0] = m[0] * x + m[4] * y + m[12];
	    out[1] = m[1] * x + m[5] * y + m[13];
	    return out;
	};

	/**
	 * Perform some operation over an array of vec2s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec2.forEach = (function() {
	    var vec = vec2.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 2;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec2} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec2.str = function (a) {
	    return 'vec2(' + a[0] + ', ' + a[1] + ')';
	};

	module.exports = vec2;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.PASS_TYPES = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var PASS_TYPES = exports.PASS_TYPES = ['Build', 'Render'];

	// ----------------------------------------------------------------------------
	// vtkViewNode methods
	// ----------------------------------------------------------------------------

	function vtkViewNode(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkViewNode');

	  // Builds myself.
	  publicAPI.build = function (prepass) {};

	  // Renders myself
	  publicAPI.render = function (prepass) {};

	  publicAPI.getViewNodeFor = function (dataObject) {
	    if (model.renderable === dataObject) {
	      return publicAPI;
	    }

	    return model.children.find(function (child) {
	      var vn = child.getViewNodeFor(dataObject);
	      return !!vn;
	    });
	  };

	  publicAPI.getFirstAncestorOfType = function (type) {
	    if (!model.parent) {
	      return null;
	    }
	    if (model.parent.isA(type)) {
	      return model.parent;
	    }
	    return model.parent.getFirstAncestorOfType(type);
	  };

	  publicAPI.traverse = function (operation) {
	    publicAPI.apply(operation, true);

	    model.children.forEach(function (child) {
	      child.traverse(operation);
	    });

	    publicAPI.apply(operation, false);
	  };

	  publicAPI.traverseAllPasses = function () {
	    publicAPI.traverse('Build');
	    publicAPI.traverse('Render');
	  };

	  publicAPI.apply = function (operation, prepass) {
	    switch (operation) {
	      case 'Build':
	        publicAPI.build(prepass);
	        break;
	      case 'Render':
	        publicAPI.render(prepass);
	        break;
	      default:
	        console.log('UNKNOWN OPERATION  ' + operation);
	    }
	  };

	  publicAPI.addMissingNode = function (dataObj) {
	    if (dataObj) {
	      publicAPI.addMissingNodes([dataObj]);
	    }
	  };

	  publicAPI.addMissingNodes = function (dataObjs) {
	    if (!dataObjs || !dataObjs.length) {
	      return;
	    }
	    model.preparedNodes = model.preparedNodes.concat(dataObjs);

	    // if any dataObj is not a renderable of a child
	    // then create child for that dataObj with renderable set to the
	    // dataObj

	    var childDOs = model.children.map(function (node) {
	      return node.getRenderable();
	    });

	    var newNodes = dataObjs.filter(function (node) {
	      return node && childDOs.indexOf(node) === -1;
	    }).map(function (node) {
	      var newNode = publicAPI.createViewNode(node);
	      if (newNode) {
	        newNode.setParent(publicAPI);
	        newNode.setRenderable(node);
	      }
	      return newNode;
	    });

	    model.children = model.children.concat(newNodes);
	  };

	  publicAPI.prepareNodes = function () {
	    model.preparedNodes = [];
	  };

	  publicAPI.removeUnusedNodes = function () {
	    model.children = model.children.filter(function (node) {
	      return model.preparedNodes.indexOf(node.getRenderable()) !== -1;
	    });
	    publicAPI.prepareNodes();
	  };

	  publicAPI.createViewNode = function (dataObj) {
	    if (!model.myFactory) {
	      console.log('Can not create view nodes without my own factory');
	      return null;
	    }
	    var ret = model.myFactory.createNode(dataObj);
	    if (ret) {
	      ret.setRenderable(dataObj);
	    }
	    return ret;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  parent: null,
	  renderable: null,
	  myFactory: null,
	  children: [],
	  preparedNodes: []
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.event(publicAPI, model, 'event');
	  macro.setGet(publicAPI, model, ['parent', 'renderable', 'myFactory']);
	  macro.getArray(publicAPI, model, ['children']);

	  // Object methods
	  vtkViewNode(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend, PASS_TYPES: PASS_TYPES };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNode = __webpack_require__(19);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLActor methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLActor2D(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLActor2D');

	  // Builds myself.
	  publicAPI.build = function (prepass) {
	    if (prepass) {
	      if (!model.renderable) {
	        return;
	      }

	      publicAPI.prepareNodes();
	      publicAPI.addMissingNodes(model.renderable.getTextures());
	      publicAPI.addMissingNode(model.renderable.getMapper());
	      publicAPI.removeUnusedNodes();
	    }
	  };

	  // we draw textures, then mapper, then post pass textures
	  publicAPI.traverse = function (operation) {
	    if (!model.renderable || !model.renderable.getVisibility()) {
	      return;
	    }
	    publicAPI.apply(operation, true);

	    model.activeTextures = [];
	    model.children.forEach(function (child) {
	      child.apply(operation, true);
	      if (child.isA('vtkOpenGLTexture') && operation === 'Render') {
	        model.activeTextures.push(child);
	      }
	    });

	    model.children.forEach(function (child) {
	      child.apply(operation, false);
	    });

	    publicAPI.apply(operation, false);
	  };

	  // Renders myself
	  publicAPI.render = function (prepass) {
	    if (prepass) {
	      model.context = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderWindow').getContext();
	      publicAPI.preRender();
	    } else {
	      // deactivate textures
	      model.children.forEach(function (child) {
	        if (child.isA('vtkOpenGLTexture')) {
	          child.deactivate();
	        }
	      });
	      var opaque = model.renderable.getIsOpaque() !== 0;
	      if (!opaque) {
	        model.context.depthMask(true);
	      }
	    }
	  };

	  publicAPI.preRender = function () {
	    model.context.depthMask(false);
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  context: null,
	  activeTextures: []
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ViewNode2.default.extend(publicAPI, model);

	  // Build VTK API
	  macro.setGet(publicAPI, model, ['context']);

	  macro.get(publicAPI, model, ['activeTextures']);

	  // Object methods
	  vtkOpenGLActor2D(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(9);

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNode = __webpack_require__(19);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLCamera methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLCamera(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLCamera');

	  // Builds myself.
	  publicAPI.build = function (prepass) {
	    if (prepass) {
	      if (!model.renderable) {
	        return;
	      }
	    }
	  };

	  // Renders myself
	  publicAPI.render = function (prepass) {
	    if (prepass) {
	      model.context = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderWindow').getContext();
	      var ren = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderer');
	      publicAPI.preRender(ren);
	    }
	  };

	  publicAPI.preRender = function (ren) {
	    var tsize = ren.getTiledSizeAndOrigin();
	    model.context.viewport(tsize.lowerLeftU, tsize.lowerLeftV, tsize.usize, tsize.vsize);
	  };

	  publicAPI.getKeyMatrices = function (ren) {
	    // has the camera changed?
	    if (ren !== model.lastRenderer || publicAPI.getFirstAncestorOfType('vtkOpenGLRenderWindow').getMTime() > model.keyMatrixTime.getMTime() || publicAPI.getMTime() > model.keyMatrixTime.getMTime() || ren.getMTime() > model.keyMatrixTime.getMTime()) {
	      model.WCVCMatrix = model.renderable.getViewTransformMatrix();

	      _glMatrix.mat3.fromMat4(model.normalMatrix, model.WCVCMatrix);
	      _glMatrix.mat3.invert(model.normalMatrix, model.normalMatrix);
	      _glMatrix.mat4.transpose(model.WCVCMatrix, model.WCVCMatrix);

	      var oglren = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderer');
	      var aspectRatio = oglren.getAspectRatio();

	      model.VCDCMatrix = model.renderable.getProjectionTransformMatrix(aspectRatio, -1, 1);
	      _glMatrix.mat4.transpose(model.VCDCMatrix, model.VCDCMatrix);

	      model.WCDCMatrix = _glMatrix.mat4.create();
	      _glMatrix.mat4.multiply(model.WCDCMatrix, model.VCDCMatrix, model.WCVCMatrix);
	      //      mat4.multiply(model.WCDCMatrix, model.WCVCMatrix, model.VCDCMatrix);

	      model.keyMatrixTime.modified();
	      model.lastRenderer = ren;
	    }

	    return { wcvc: model.WCVCMatrix, normalMatrix: model.normalMatrix, vcdc: model.VCDCMatrix, wcdc: model.WCDCMatrix };
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  context: null,
	  lastRenderer: null,
	  keyMatrixTime: null,
	  normalMatrix: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ViewNode2.default.extend(publicAPI, model);

	  model.keyMatrixTime = {};
	  model.normalMatrix = _glMatrix.mat3.create();
	  macro.obj(model.keyMatrixTime);

	  // Build VTK API
	  macro.setGet(publicAPI, model, ['context', 'keyMatrixTime']);

	  // Object methods
	  vtkOpenGLCamera(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkOpenGLImageMapper = vtkOpenGLImageMapper;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Helper = __webpack_require__(23);

	var _Helper2 = _interopRequireDefault(_Helper);

	var _Math = __webpack_require__(32);

	var _Math2 = _interopRequireDefault(_Math);

	var _DataArray = __webpack_require__(67);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	var _Texture = __webpack_require__(69);

	var _Texture2 = _interopRequireDefault(_Texture);

	var _ShaderProgram = __webpack_require__(29);

	var _ShaderProgram2 = _interopRequireDefault(_ShaderProgram);

	var _Texture3 = __webpack_require__(71);

	var _Texture4 = _interopRequireDefault(_Texture3);

	var _ViewNode = __webpack_require__(19);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	var _Constants = __webpack_require__(28);

	var _vtkPolyDataVS = __webpack_require__(72);

	var _vtkPolyDataVS2 = _interopRequireDefault(_vtkPolyDataVS);

	var _vtkPolyDataFS = __webpack_require__(73);

	var _vtkPolyDataFS2 = _interopRequireDefault(_vtkPolyDataFS);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLImageMapper methods
	// ----------------------------------------------------------------------------

	// import { mat4 } from 'gl-matrix';

	function vtkOpenGLImageMapper(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLImageMapper');

	  // Builds myself.
	  publicAPI.build = function (prepass) {
	    if (prepass) {
	      if (!model.renderable) {
	        return;
	      }
	    }
	  };

	  // Renders myself
	  publicAPI.render = function (prepass) {
	    if (prepass) {
	      model.openGLRenderWindow = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderWindow');
	      model.context = model.openGLRenderWindow.getContext();
	      model.tris.setContext(model.context);
	      model.openGLImageSlice = publicAPI.getFirstAncestorOfType('vtkOpenGLImageSlice');
	      var actor = model.openGLImageSlice.getRenderable();
	      model.openGLRenderer = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderer');
	      var ren = model.openGLRenderer.getRenderable();
	      model.openGLCamera = model.openGLRenderer.getViewNodeFor(ren.getActiveCamera());
	      publicAPI.renderPiece(ren, actor);
	    } else {
	      // something
	    }
	  };

	  publicAPI.buildShaders = function (shaders, ren, actor) {
	    publicAPI.getShaderTemplate(shaders, ren, actor);
	    publicAPI.replaceShaderValues(shaders, ren, actor);
	  };

	  publicAPI.getShaderTemplate = function (shaders, ren, actor) {
	    shaders.Vertex = _vtkPolyDataVS2.default;
	    shaders.Fragment = _vtkPolyDataFS2.default;
	    shaders.Geometry = '';
	  };

	  publicAPI.replaceShaderValues = function (shaders, ren, actor) {
	    var VSSource = shaders.Vertex;
	    var FSSource = shaders.Fragment;

	    VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::Camera::Dec', ['uniform mat4 MCDCMatrix;']).result;
	    VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::PositionVC::Impl', ['  gl_Position = MCDCMatrix * vertexMC;']).result;

	    VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::TCoord::Impl', 'tcoordVCVSOutput = tcoordMC;').result;

	    var tNumComp = model.openGLTexture.getComponents();

	    VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::TCoord::Dec', 'attribute vec2 tcoordMC; varying vec2 tcoordVCVSOutput;').result;
	    FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::TCoord::Dec', ['varying vec2 tcoordVCVSOutput;', 'uniform float shift;', 'uniform float scale;', 'uniform sampler2D texture1;']).result;
	    switch (tNumComp) {
	      case 1:
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::TCoord::Impl', ['float intensity = texture2D(texture1, tcoordVCVSOutput).r*scale + shift;', 'gl_FragData[0] = vec4(intensity,intensity,intensity,1.0);']).result;
	        break;
	      case 2:
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::TCoord::Impl', ['vec4 tcolor = texture2D(texture1, tcoordVCVSOutput);', 'float intensity = tcolor.r*scale + shift;', 'gl_FragData[0] = vec4(intensity, intensity, intensity, scale*tcolor.g + shift);']).result;
	        break;
	      default:
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::TCoord::Impl', 'gl_FragData[0] = scale*texture2D(texture1, tcoordVCVSOutput.st) + shift;').result;
	    }
	    shaders.Vertex = VSSource;
	    shaders.Fragment = FSSource;
	  };

	  publicAPI.getNeedToRebuildShaders = function (cellBO, ren, actor) {
	    // has something changed that would require us to recreate the shader?
	    // candidates are
	    // property modified (representation interpolation and lighting)
	    // input modified
	    // light complexity changed
	    if (cellBO.getProgram() === 0 || cellBO.getShaderSourceTime().getMTime() < publicAPI.getMTime() || cellBO.getShaderSourceTime().getMTime() < actor.getMTime() || cellBO.getShaderSourceTime().getMTime() < model.currentInput.getMTime()) {
	      return true;
	    }

	    return false;
	  };

	  publicAPI.updateShaders = function (cellBO, ren, actor) {
	    cellBO.getVAO().bind();
	    model.lastBoundBO = cellBO;

	    // has something changed that would require us to recreate the shader?
	    if (publicAPI.getNeedToRebuildShaders(cellBO, ren, actor)) {
	      var shaders = { Vertex: null, Fragment: null, Geometry: null };

	      publicAPI.buildShaders(shaders, ren, actor);

	      // compile and bind the program if needed
	      var newShader = model.openGLRenderWindow.getShaderCache().readyShaderProgramArray(shaders.Vertex, shaders.Fragment, shaders.Geometry);

	      // if the shader changed reinitialize the VAO
	      if (newShader !== cellBO.getProgram()) {
	        cellBO.setProgram(newShader);
	        // reset the VAO as the shader has changed
	        cellBO.getVAO().releaseGraphicsResources();
	      }

	      cellBO.getShaderSourceTime().modified();
	    } else {
	      model.openGLRenderWindow.getShaderCache().readyShaderProgram(cellBO.getProgram());
	    }

	    publicAPI.setMapperShaderParameters(cellBO, ren, actor);
	    publicAPI.setCameraShaderParameters(cellBO, ren, actor);
	    publicAPI.setPropertyShaderParameters(cellBO, ren, actor);
	  };

	  publicAPI.setMapperShaderParameters = function (cellBO, ren, actor) {
	    // Now to update the VAO too, if necessary.

	    if (cellBO.getCABO().getElementCount() && (model.VBOBuildTime > cellBO.getAttributeUpdateTime().getMTime() || cellBO.getShaderSourceTime().getMTime() > cellBO.getAttributeUpdateTime().getMTime())) {
	      cellBO.getCABO().bind();
	      if (cellBO.getProgram().isAttributeUsed('vertexMC')) {
	        if (!cellBO.getVAO().addAttributeArray(cellBO.getProgram(), cellBO.getCABO(), 'vertexMC', cellBO.getCABO().getVertexOffset(), cellBO.getCABO().getStride(), model.context.FLOAT, 3, model.context.FALSE)) {
	          console.error('Error setting vertexMC in shader VAO.');
	        }
	      }
	      if (cellBO.getProgram().isAttributeUsed('tcoordMC') && cellBO.getCABO().getTCoordOffset()) {
	        if (!cellBO.getVAO().addAttributeArray(cellBO.getProgram(), cellBO.getCABO(), 'tcoordMC', cellBO.getCABO().getTCoordOffset(), cellBO.getCABO().getStride(), model.context.FLOAT, cellBO.getCABO().getTCoordComponents(), model.context.FALSE)) {
	          console.error('Error setting tcoordMC in shader VAO.');
	        }
	      }
	    }

	    var texUnit = model.openGLTexture.getTextureUnit();
	    cellBO.getProgram().setUniformi('texture1', texUnit);

	    var cw = actor.getProperty().getColorWindow();
	    var cl = actor.getProperty().getColorLevel();
	    var oglShiftScale = model.openGLTexture.getShiftAndScale();

	    var scale = oglShiftScale.scale / cw;
	    var shift = (oglShiftScale.shift - cl) / cw + 0.5;

	    cellBO.getProgram().setUniformf('shift', shift);
	    cellBO.getProgram().setUniformf('scale', scale);
	  };

	  publicAPI.setCameraShaderParameters = function (cellBO, ren, actor) {
	    var program = cellBO.getProgram();

	    // if (model.renderable.getRenderToRectangle()) {
	    //   let xscale = 1.0;
	    //   let yscale = 1.0;
	    //   const actorPos =
	    //     actor.getActualPositionCoordinate().getComputedViewValue(ren);
	    //   const actorPos2 =
	    //     actor.getActualPosition2Coordinate().getComputedViewValue(ren);

	    //   const rectwidth  = (actorPos2[0] - actorPos[0]) + 1;
	    //   const rectheight = (actorPos2[1] - actorPos[1]) + 1;
	    //   const xscale = rectwidth / width;
	    //   const yscale = rectheight / height;
	    // }

	    // points->SetPoint(0, 0.0, 0.0, 0);
	    // points->SetPoint(1, width*xscale, 0.0, 0);
	    // points->SetPoint(2, width*xscale, height*yscale, 0);
	    // points->SetPoint(3, 0.0, height*yscale, 0);

	    // // [WMVD]C == {world, model, view, display} coordinates
	    // // E.g., WCDC == world to display coordinate transformation
	    var keyMats = model.openGLCamera.getKeyMatrices(ren);
	    program.setUniformMatrix('MCDCMatrix', keyMats.wcdc);
	    // program.setUniformf4('p1', );
	    // program.setUniformf4('p2',);
	  };

	  publicAPI.setPropertyShaderParameters = function (cellBO, ren, actor) {
	    var program = cellBO.getProgram();

	    var ppty = actor.getProperty();

	    var opacity = ppty.getOpacity();
	    program.setUniformf('opacityUniform', opacity);
	  };

	  publicAPI.renderPieceStart = function (ren, actor) {
	    // make sure the BOs are up to date
	    publicAPI.updateBufferObjects(ren, actor);

	    // Bind the OpenGL, this is shared between the different primitive/cell types.
	    model.lastBoundBO = null;
	  };

	  publicAPI.renderPieceDraw = function (ren, actor) {
	    var gl = model.context;

	    // render the texture
	    model.openGLTexture.preRender(model.openGLRenderer);

	    // draw polygons
	    if (model.tris.getCABO().getElementCount()) {
	      // First we do the triangles, update the shader, set uniforms, etc.
	      publicAPI.updateShaders(model.tris, ren, actor);
	      gl.drawArrays(gl.TRIANGLES, 0, model.tris.getCABO().getElementCount());
	    }

	    model.openGLTexture.deactivate();
	  };

	  publicAPI.renderPieceFinish = function (ren, actor) {
	    if (model.LastBoundBO) {
	      model.LastBoundBO.getVAO().release();
	    }
	  };

	  publicAPI.renderPiece = function (ren, actor) {
	    // Make sure that we have been properly initialized.
	    // if (ren.getRenderWindow().checkAbortStatus()) {
	    //   return;
	    // }

	    publicAPI.invokeEvent({ type: 'StartEvent' });
	    model.renderable.update();
	    model.currentInput = model.renderable.getInputData();
	    publicAPI.invokeEvent({ type: 'EndEvent' });

	    if (model.currentInput === null) {
	      console.error('No input!');
	      return;
	    }

	    publicAPI.renderPieceStart(ren, actor);
	    publicAPI.renderPieceDraw(ren, actor);
	    publicAPI.renderPieceFinish(ren, actor);
	  };

	  publicAPI.computeBounds = function (ren, actor) {
	    if (!publicAPI.getInput()) {
	      _Math2.default.uninitializeBounds(model.Bounds);
	      return;
	    }
	    model.bounnds = publicAPI.getInput().getBounds();
	  };

	  publicAPI.updateBufferObjects = function (ren, actor) {
	    // Rebuild buffers if needed
	    if (publicAPI.getNeedToRebuildBufferObjects(ren, actor)) {
	      publicAPI.buildBufferObjects(ren, actor);
	    }
	  };

	  publicAPI.getNeedToRebuildBufferObjects = function (ren, actor) {
	    // first do a coarse check
	    if (model.VBOBuildTime.getMTime() < publicAPI.getMTime() || model.VBOBuildTime.getMTime() < actor.getMTime() || model.VBOBuildTime.getMTime() < actor.getProperty().getMTime() || model.VBOBuildTime.getMTime() < model.currentInput.getMTime()) {
	      return true;
	    }
	    return false;
	  };

	  publicAPI.buildBufferObjects = function (ren, actor) {
	    var image = model.currentInput;

	    if (image === null) {
	      return;
	    }

	    // rebuild the VBO if the data has changed
	    var toString = image.getMTime() + 'A' + image.getPointData().getScalars().getMTime() + 'B' + publicAPI.getMTime();

	    if (model.VBOBuildString !== toString) {
	      // Build the VBOs
	      model.texture.setInputData(image);

	      var bounds = model.renderable.getBounds();

	      var ptsArray = new Float32Array(12);
	      var tcoordArray = new Float32Array(8);
	      for (var i = 0; i < 4; i++) {
	        ptsArray[i * 3] = bounds[i % 2];
	        ptsArray[i * 3 + 1] = bounds[(i > 1 ? 1 : 0) + 2];
	        ptsArray[i * 3 + 2] = bounds[4];
	        tcoordArray[i * 2] = i % 2 ? 1.0 : 0.0;
	        tcoordArray[i * 2 + 1] = i > 1 ? 1.0 : 0.0;
	      }

	      var points = _DataArray2.default.newInstance({ numberOfComponents: 3, values: ptsArray });
	      points.setName('points');
	      var tcoords = _DataArray2.default.newInstance({ numberOfComponents: 2, values: tcoordArray });
	      tcoords.setName('tcoords');

	      var cellArray = new Uint16Array(8);
	      cellArray[0] = 3;
	      cellArray[1] = 0;
	      cellArray[2] = 1;
	      cellArray[3] = 3;
	      cellArray[4] = 3;
	      cellArray[5] = 0;
	      cellArray[6] = 3;
	      cellArray[7] = 2;
	      var cells = _DataArray2.default.newInstance({ numberOfComponents: 1, values: cellArray });

	      model.tris.getCABO().createVBO(cells, 'polys', _Constants.Representation.SURFACE, { points: points, tcoords: tcoords, cellOffset: 0 });
	      model.VBOBuildTime.modified();
	      model.VBOBuildString = toString;
	    }
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  context: null,
	  VBOBuildTime: 0,
	  VBOBuildString: null,
	  texture: null,
	  openGLTexture: null,
	  tris: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ViewNode2.default.extend(publicAPI, model);

	  model.tris = _Helper2.default.newInstance();
	  model.texture = _Texture4.default.newInstance();
	  model.openGLTexture = _Texture2.default.newInstance();
	  model.openGLTexture.setRenderable(model.texture);

	  // Build VTK API
	  macro.setGet(publicAPI, model, ['context']);

	  model.VBOBuildTime = {};
	  macro.obj(model.VBOBuildTime);

	  // Object methods
	  vtkOpenGLImageMapper(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkOpenGLHelper = vtkOpenGLHelper;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _CellArrayBufferObject = __webpack_require__(24);

	var _CellArrayBufferObject2 = _interopRequireDefault(_CellArrayBufferObject);

	var _ShaderProgram = __webpack_require__(29);

	var _ShaderProgram2 = _interopRequireDefault(_ShaderProgram);

	var _VertexArrayObject = __webpack_require__(31);

	var _VertexArrayObject2 = _interopRequireDefault(_VertexArrayObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLHelper methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLHelper(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLHelper');

	  publicAPI.setContext = function (ctx) {
	    model.program.setContext(ctx);
	    model.VAO.setContext(ctx);
	    model.CABO.setContext(ctx);
	  };

	  publicAPI.releaseGraphicsResources = function (oglwin) {
	    model.VAO.releaseGraphicsResources();
	    model.CABO.releaseGraphicsResources();
	    model.CABO.setElementCount(0);
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  program: null,
	  shaderSourceTime: null,
	  VAO: null,
	  attributeUpdateTime: null,
	  CABO: null,
	  primitiveType: 0
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);

	  model.shaderSourceTime = {};
	  macro.obj(model.shaderSourceTime);

	  model.attributeUpdateTime = {};
	  macro.obj(model.attributeUpdateTime);

	  macro.setGet(publicAPI, model, ['program', 'shaderSourceTime', 'VAO', 'attributeUpdateTime', 'CABO', 'primitiveType']);

	  model.program = _ShaderProgram2.default.newInstance();
	  model.VAO = _VertexArrayObject2.default.newInstance();
	  model.CABO = _CellArrayBufferObject2.default.newInstance();

	  // Object methods
	  vtkOpenGLHelper(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _BufferObject = __webpack_require__(25);

	var _BufferObject2 = _interopRequireDefault(_BufferObject);

	var _DynamicTypedArray = __webpack_require__(27);

	var _DynamicTypedArray2 = _interopRequireDefault(_DynamicTypedArray);

	var _Constants = __webpack_require__(26);

	var _Constants2 = __webpack_require__(28);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLCellArrayBufferObject methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLCellArrayBufferObject(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLCellArrayBufferObject');

	  var packedVBO = new _DynamicTypedArray2.default({ chunkSize: 65500, arrayType: 'Float32Array' }); // the data

	  publicAPI.setType(_Constants.ObjectType.ARRAY_BUFFER);

	  publicAPI.createVBO = function (cellArray, inRep, outRep, options) {
	    if (!cellArray.getData() || !cellArray.getData().length) {
	      model.elementCount = 0;
	      return 0;
	    }

	    // Figure out how big each block will be, currently 6 or 7 floats.
	    model.blockSize = 3;
	    model.vertexOffset = 0;
	    model.normalOffset = 0;
	    model.tCoordOffset = 0;
	    model.tCoordComponents = 0;
	    model.colorComponents = 0;
	    model.colorOffset = 0;

	    var pointData = options.points.getData();
	    var normalData = null;
	    var tcoordData = null;
	    var colorData = null;

	    var colorComponents = options.colors ? options.colors.getNumberOfComponents() : 0;
	    var textureComponents = options.tcoords ? options.tcoords.getNumberOfComponents() : 0;

	    // the values of 4 below are because floats are 4 bytes

	    if (options.normals) {
	      model.normalOffset = 4 * model.blockSize;
	      model.blockSize += 3;
	      normalData = options.normals.getData();
	    }

	    if (options.tcoords) {
	      model.tCoordOffset = 4 * model.blockSize;
	      model.tCoordComponents = textureComponents;
	      model.blockSize += textureComponents;
	      tcoordData = options.tcoords.getData();
	    }

	    if (options.colors) {
	      model.colorComponents = options.colors.getNumberOfComponents();
	      model.colorOffset = 4 * model.blockSize;
	      model.blockSize += model.colorComponents;
	      colorData = options.colors.getData();
	    }
	    model.stride = 4 * model.blockSize;

	    var pointIdx = 0;
	    var normalIdx = 0;
	    var tcoordIdx = 0;
	    var colorIdx = 0;
	    var cellCount = 0;

	    var addAPoint = function addAPoint(i) {
	      // Vertices
	      pointIdx = i * 3;
	      tcoordIdx = i * textureComponents;

	      packedVBO.push(pointData[pointIdx++]);
	      packedVBO.push(pointData[pointIdx++]);
	      packedVBO.push(pointData[pointIdx++]);

	      if (normalData !== null) {
	        if (options.haveCellNormals) {
	          normalIdx = (cellCount + options.cellOffset) * 3;
	        } else {
	          normalIdx = i * 3;
	        }
	        packedVBO.push(normalData[normalIdx++]);
	        packedVBO.push(normalData[normalIdx++]);
	        packedVBO.push(normalData[normalIdx++]);
	      }

	      if (tcoordData !== null) {
	        for (var j = 0; j < textureComponents; ++j) {
	          packedVBO.push(tcoordData[tcoordIdx++]);
	        }
	      }

	      if (colorData !== null) {
	        if (options.haveCellScalars) {
	          colorIdx = (cellCount + options.cellOffset) * colorComponents;
	        } else {
	          colorIdx = i * colorComponents;
	        }

	        for (var _j = 0; _j < colorComponents; ++_j) {
	          packedVBO.push(colorData[colorIdx++] / 255.5);
	        }
	      }
	    };

	    var cellBuilders = {
	      // easy, every input point becomes an output point
	      anythingToPoints: function anythingToPoints(numPoints, cellPts, offset) {
	        for (var i = 0; i < numPoints; ++i) {
	          addAPoint(cellPts[offset + i]);
	        }
	      },
	      linesToWireframe: function linesToWireframe(numPoints, cellPts, offset) {
	        // for lines we add a bunch of segments
	        for (var i = 0; i < numPoints - 1; ++i) {
	          addAPoint(cellPts[offset + i]);
	          addAPoint(cellPts[offset + i + 1]);
	        }
	      },
	      polysToWireframe: function polysToWireframe(numPoints, cellPts, offset) {
	        // for polys we add a bunch of segments and close it
	        for (var i = 0; i < numPoints; ++i) {
	          addAPoint(cellPts[offset + i]);
	          addAPoint(cellPts[offset + (i + 1) % numPoints]);
	        }
	      },
	      stripsToWireframe: function stripsToWireframe(numPoints, cellPts, offset) {
	        // for strips we add a bunch of segments and close it
	        for (var i = 0; i < numPoints - 1; ++i) {
	          addAPoint(cellPts[offset + i]);
	          addAPoint(cellPts[offset + i + 1]);
	        }
	        for (var _i = 0; _i < numPoints - 2; _i++) {
	          addAPoint(cellPts[offset + _i]);
	          addAPoint(cellPts[offset + _i + 2]);
	        }
	      },
	      polysToSurface: function polysToSurface(npts, cellPts, offset) {
	        if (npts < 3) {
	          // ignore degenerate triangles
	          console.log('skipping degenerate triangle');
	        } else {
	          for (var i = 0; i < npts - 2; i++) {
	            addAPoint(cellPts[offset + 0]);
	            addAPoint(cellPts[offset + i + 1]);
	            addAPoint(cellPts[offset + i + 2]);
	          }
	        }
	      },
	      stripsToSurface: function stripsToSurface(npts, cellPts, offset) {
	        for (var i = 0; i < npts - 2; i++) {
	          addAPoint(cellPts[offset + i]);
	          addAPoint(cellPts[offset + i + 1 + i % 2]);
	          addAPoint(cellPts[offset + i + 1 + (i + 1) % 2]);
	        }
	      }
	    };

	    var func = null;
	    if (outRep === _Constants2.Representation.POINTS || inRep === 'verts') {
	      func = cellBuilders.anythingToPoints;
	    } else if (outRep === _Constants2.Representation.WIREFRAME || inRep === 'lines') {
	      func = cellBuilders[inRep + 'ToWireframe'];
	    } else {
	      func = cellBuilders[inRep + 'ToSurface'];
	    }

	    var currentIndex = 0;
	    var array = cellArray.getData();
	    var size = array.length;
	    for (var index = 0; index < size; index++) {
	      if (index === currentIndex) {
	        func(array[index], array, currentIndex + 1);
	        currentIndex += array[index] + 1;
	        cellCount++;
	      }
	    }
	    model.elementCount = packedVBO.getNumberOfElements() / model.blockSize;
	    var vboArray = packedVBO.getFrozenArray();
	    publicAPI.upload(vboArray, _Constants.ObjectType.ARRAY_BUFFER);
	    packedVBO.reset();
	    return cellCount;
	  };

	  publicAPI.setCoordShiftAndScaleMethod = function (shiftScaleMethod) {
	    console.log('coordinate shift and scale not yet implemented');
	  };

	  publicAPI.setCoordShift = function (shiftArray) {
	    console.log('coordinate shift and scale not yet implemented');
	  };

	  publicAPI.setCoordScale = function (scaleArray) {
	    console.log('coordinate shift and scale not yet implemented');
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  elementCount: 0,
	  stride: 0,
	  vertexOffset: 0,
	  normalOffset: 0,
	  tCoordOffset: 0,
	  tCoordComponents: 0,
	  colorOffset: 0,
	  colorComponents: 0
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _BufferObject2.default.extend(publicAPI, model);

	  macro.setGet(publicAPI, model, ['elementCount']);
	  macro.get(publicAPI, model, ['stride', 'vertexOffset', 'normalOffset', 'tCoordOffset', 'tCoordComponents', 'colorOffset', 'colorComponents']);

	  // Object specific methods
	  vtkOpenGLCellArrayBufferObject(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(26);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	var STATIC = exports.STATIC = {};

	// ----------------------------------------------------------------------------
	// vtkOpenGLBufferObject methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLBufferObject(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLBufferObject');

	  // Class-specific private functions
	  function convertType(type) {
	    switch (type) {
	      case _Constants.ObjectType.ELEMENT_ARRAY_BUFFER:
	        return model.context.ELEMENT_ARRAY_BUFFER;
	      case _Constants.ObjectType.TEXTURE_BUFFER:
	        if ('TEXTURE_BUFFER' in model.context) {
	          return model.context.TEXTURE_BUFFER;
	        }
	      /* eslint-disable no-fallthrough */
	      // Intentional fallthrough in case there is no TEXTURE_BUFFER in WebGL
	      default:
	      /* eslint-enable no-fallthrough */
	      case _Constants.ObjectType.ARRAY_BUFFER:
	        return model.context.ARRAY_BUFFER;
	    }
	  }

	  var internalType = null;
	  var internalHandle = null;
	  var dirty = true;
	  var error = '';

	  // Public API methods
	  publicAPI.getType = function () {
	    return internalType;
	  };

	  publicAPI.setType = function (value) {
	    internalType = value;
	  };

	  publicAPI.getHandle = function () {
	    return internalHandle;
	  };
	  publicAPI.isReady = function () {
	    return dirty === false;
	  };

	  publicAPI.generateBuffer = function (type) {
	    var objectTypeGL = convertType(type);
	    if (internalHandle === null) {
	      internalHandle = model.context.createBuffer();
	      internalType = type;
	    }
	    return convertType(internalType) === objectTypeGL;
	  };

	  publicAPI.upload = function (data, type) {
	    // buffer, size, type
	    var alreadyGenerated = publicAPI.generateBuffer(type);
	    if (!alreadyGenerated) {
	      error = 'Trying to upload array buffer to incompatible buffer.';
	      return false;
	    }
	    model.context.bindBuffer(convertType(internalType), internalHandle);
	    model.context.bufferData(convertType(internalType), data, model.context.STATIC_DRAW);
	    dirty = false;
	    return true;
	  };

	  publicAPI.bind = function () {
	    if (!internalHandle) {
	      return false;
	    }
	    model.context.bindBuffer(convertType(internalType), internalHandle);
	    return true;
	  };

	  publicAPI.release = function () {
	    if (!internalHandle) {
	      return false;
	    }
	    model.context.bindBuffer(convertType(internalType), null);
	    return true;
	  };

	  publicAPI.releaseGraphicsResources = function () {
	    if (internalHandle !== null) {
	      model.context.bindBuffer(convertType(internalType), null);
	      model.context.deleteBuffer(internalHandle);
	      internalHandle = null;
	    }
	  };

	  publicAPI.getError = function () {
	    return error;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  objectType: _Constants.ObjectType.ARRAY_BUFFER,
	  context: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);

	  macro.setGet(publicAPI, model, ['context']);

	  vtkOpenGLBufferObject(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ObjectType = exports.ObjectType = {
	  ARRAY_BUFFER: 0,
	  ELEMENT_ARRAY_BUFFER: 1,
	  TEXTURE_BUFFER: 2
	};

	exports.default = {
	  ObjectType: ObjectType
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DynamicTypedArray = function () {
	  function DynamicTypedArray() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref$chunkSize = _ref.chunkSize,
	        chunkSize = _ref$chunkSize === undefined ? 65536 : _ref$chunkSize,
	        _ref$arrayType = _ref.arrayType,
	        arrayType = _ref$arrayType === undefined ? 'Int32Array' : _ref$arrayType;

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

	exports.default = DynamicTypedArray;

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Shading = exports.Shading = {
	  FLAT: 0,
	  GOURAUD: 1,
	  PHONG: 2
	};

	var Representation = exports.Representation = {
	  POINTS: 0,
	  WIREFRAME: 1,
	  SURFACE: 2
	};

	var Interpolation = exports.Interpolation = Shading;

	exports.default = {
	  Shading: Shading,
	  Representation: Representation,
	  Interpolation: Interpolation
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.substitute = substitute;
	exports.vtkShaderProgram = vtkShaderProgram;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Shader = __webpack_require__(30);

	var _Shader2 = _interopRequireDefault(_Shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// perform in place string substitutions, indicate if a substitution was done
	// this is useful for building up shader strings which typically involve
	// lots of string substitutions. Return true if a substitution was done.
	function substitute(source, search, replace) {
	  var all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	  var replaceStr = Array.isArray(replace) ? replace.join('\n') : replace;
	  var replaced = false;
	  if (source.search(search) !== -1) {
	    replaced = true;
	  }
	  var gflag = '';
	  if (all) {
	    gflag = 'g';
	  }
	  var regex = new RegExp(search, gflag);
	  var resultstr = source.replace(regex, replaceStr);
	  return { replace: replaced, result: resultstr };
	}

	// ----------------------------------------------------------------------------
	// vtkShaderProgram methods
	// ----------------------------------------------------------------------------

	function vtkShaderProgram(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkShaderProgram');

	  publicAPI.compileShader = function () {
	    if (!model.vertexShader.compile()) {
	      console.log(model.vertexShader.getSource().split('\n').map(function (line, index) {
	        return index + ': ' + line;
	      }).join('\n'));
	      console.log(model.vertexShader.getError());
	      return 0;
	    }
	    if (!model.fragmentShader.compile()) {
	      console.log(model.fragmentShader.getSource().split('\n').map(function (line, index) {
	        return index + ': ' + line;
	      }).join('\n'));
	      console.log(model.fragmentShader.getError());
	      return 0;
	    }
	    // skip geometry for now
	    if (!publicAPI.attachShader(model.vertexShader)) {
	      console.log(model.error);
	      return 0;
	    }
	    if (!publicAPI.attachShader(model.fragmentShader)) {
	      console.log(model.error);
	      return 0;
	    }

	    if (!publicAPI.link()) {
	      console.log('Links failed: ' + model.error);
	      return 0;
	    }

	    publicAPI.setCompiled(true);
	    return 1;
	  };

	  publicAPI.cleanup = function () {
	    if (model.shaderType === 'Unknown' || model.handle === 0) {
	      return;
	    }

	    model.context.deleteShader(model.handle);
	    model.handle = 0;
	  };

	  publicAPI.bind = function () {
	    if (!model.linked && !model.link()) {
	      return false;
	    }

	    model.context.useProgram(model.handle);
	    publicAPI.setBound(true);
	    return true;
	  };

	  publicAPI.isBound = function () {
	    return !!model.bound;
	  };

	  publicAPI.release = function () {
	    model.context.useProgram(null);
	    publicAPI.setBound(false);
	  };

	  publicAPI.setContext = function (ctx) {
	    model.vertexShader.setContext(ctx);
	    model.fragmentShader.setContext(ctx);
	    model.geometryShader.setContext(ctx);
	  };

	  publicAPI.link = function () {
	    if (model.inked) {
	      return true;
	    }

	    if (model.handle === 0) {
	      model.error = 'Program has not been initialized, and/or does not have shaders.';
	      return false;
	    }

	    // clear out the list of uniforms used
	    model.uniformLocs = {};

	    model.context.linkProgram(model.handle);
	    var isCompiled = model.context.getProgramParameter(model.handle, model.context.LINK_STATUS);
	    if (!isCompiled) {
	      var lastError = model.context.getProgramInfoLog(model.handle);
	      console.error('Error linking shader ' + lastError);
	      model.handle = 0;
	      return false;
	    }

	    publicAPI.setLinked(true);
	    model.attributeLocs = {};
	    return true;
	  };

	  publicAPI.setUniformf = function (name, v) {
	    var location = publicAPI.findUniform(name);
	    if (location === -1) {
	      model.error = 'Could not set uniform ' + name + ' . No such uniform.';
	      return false;
	    }
	    model.context.uniform1f(location, v);
	    return true;
	  };

	  publicAPI.setUniformi = function (name, v) {
	    var location = publicAPI.findUniform(name);
	    if (location === -1) {
	      model.error = 'Could not set uniform ' + name + ' . No such uniform.';
	      return false;
	    }
	    model.context.uniform1i(location, v);
	    return true;
	  };

	  publicAPI.setUniformMatrix = function (name, v) {
	    var location = publicAPI.findUniform(name);
	    if (location === -1) {
	      model.error = 'Could not set uniform ' + name + ' . No such uniform.';
	      return false;
	    }
	    model.context.uniformMatrix4fv(location, false, v);
	    return true;
	  };

	  publicAPI.setUniformMatrix3x3 = function (name, v) {
	    var location = publicAPI.findUniform(name);
	    if (location === -1) {
	      model.error = 'Could not set uniform ' + name + ' . No such uniform.';
	      return false;
	    }
	    model.context.uniformMatrix3fv(location, false, v);
	    return true;
	  };

	  publicAPI.setUniform3f = function (name, v) {
	    var location = publicAPI.findUniform(name);
	    if (location === -1) {
	      model.error = 'Could not set uniform ' + name + ' . No such uniform.';
	      return false;
	    }
	    model.context.uniform3f(location, v[0], v[1], v[2]);
	    return true;
	  };

	  publicAPI.setUniform3fv = function (name, count, v) {
	    var location = publicAPI.findUniform(name);
	    if (location === -1) {
	      model.error = 'Could not set uniform ' + name + ' . No such uniform.';
	      return false;
	    }
	    model.context.uniform3fv(location, count, v);
	    return true;
	  };

	  publicAPI.findUniform = function (name) {
	    if (!name || !model.linked) {
	      return -1;
	    }

	    var loc = Object.keys(model.uniformLocs).indexOf(name);

	    if (loc !== -1) {
	      return model.uniformLocs[name];
	    }

	    loc = model.context.getUniformLocation(model.handle, name);
	    if (loc === null) {
	      model.error = 'Uniform ' + name + ' not found in current shader program.';
	    }
	    model.uniformLocs[name] = loc;

	    return loc;
	  };

	  publicAPI.isUniformUsed = function (name) {
	    if (!name) {
	      return false;
	    }

	    // see if we have cached the result
	    var loc = Object.keys(model.uniformLocs).indexOf(name);
	    if (loc !== -1) {
	      return true;
	    }

	    if (!model.linked) {
	      console.log('attempt to find uniform when the shader program is not linked');
	      return false;
	    }

	    loc = model.context.getUniformLocation(model.handle, name);
	    if (loc === null) {
	      return false;
	    }
	    model.uniformLocs[name] = loc;

	    return true;
	  };

	  publicAPI.isAttributeUsed = function (name) {
	    if (!name) {
	      return false;
	    }

	    // see if we have cached the result
	    var loc = Object.keys(model.attributeLocs).indexOf(name);
	    if (loc !== -1) {
	      return true;
	    }

	    if (!model.linked) {
	      console.log('attempt to find uniform when the shader program is not linked');
	      return false;
	    }

	    loc = model.context.getAttribLocation(model.handle, name);
	    if (loc === -1) {
	      return false;
	    }
	    model.attributeLocs[name] = loc;

	    return true;
	  };

	  publicAPI.attachShader = function (shader) {
	    if (shader.getHandle() === 0) {
	      model.error = 'Shader object was not initialized, cannot attach it.';
	      return false;
	    }
	    if (shader.getShaderType() === 'Unknown') {
	      model.error = 'Shader object is of type Unknown and cannot be used.';
	      return false;
	    }

	    if (model.handle === 0) {
	      var thandle = model.context.createProgram();
	      if (thandle === 0) {
	        model.error = 'Could not create shader program.';
	        return false;
	      }
	      model.handle = thandle;
	      model.linked = false;
	    }

	    if (shader.getShaderType() === 'Vertex') {
	      if (model.vertexShaderHandle !== 0) {
	        model.comntext.detachShader(model.handle, model.vertexShaderHandle);
	      }
	      model.vertexShaderHandle = shader.getHandle();
	    }
	    if (shader.getShaderType() === 'Fragment') {
	      if (model.fragmentShaderHandle !== 0) {
	        model.context.detachShader(model.handle, model.fragmentShaderHandle);
	      }
	      model.fragmentShaderHandle = shader.getHandle();
	    }

	    model.context.attachShader(model.handle, shader.getHandle());
	    publicAPI.setLinked(false);
	    return true;
	  };

	  publicAPI.detachShader = function (shader) {
	    if (shader.getHandle() === 0) {
	      model.error = 'shader object was not initialized, cannot attach it.';
	      return false;
	    }
	    if (shader.getShaderType() === 'Unknown') {
	      model.error = 'Shader object is of type Unknown and cannot be used.';
	      return false;
	    }
	    if (model.handle === 0) {
	      model.errror = 'This shader prorgram has not been initialized yet.';
	    }

	    switch (shader.getShaderType()) {
	      case 'Vertex':
	        if (model.vertexShaderHandle !== shader.getHandle()) {
	          model.error = 'The supplied shader was not attached to this program.';
	          return false;
	        }
	        model.context.detachShader(model.handle, shader.getHandle());
	        model.vertexShaderHandle = 0;
	        model.linked = false;
	        return true;
	      case 'Fragment':
	        if (model.fragmentShaderHandle !== shader.getHandle()) {
	          model.error = 'The supplied shader was not attached to this program.';
	          return false;
	        }
	        model.context.detachShader(model.handle, shader.getHandle());
	        model.fragmentShaderHandle = 0;
	        model.linked = false;
	        return true;
	      default:
	        return false;
	    }
	  };

	  publicAPI.setContext = function (ctx) {
	    model.context = ctx;
	    model.vertexShader.setContext(ctx);
	    model.fragmentShader.setContext(ctx);
	    model.geometryShader.setContext(ctx);
	  };

	  // publicAPI.enableAttributeArray = (name) => {
	  //   const location = publicAPI.findAttributeArray(name);
	  //   if (location === -1) {
	  //     model.error = `Could not enable attribute ${name} No such attribute.`;
	  //     return false;
	  //   }
	  //   model.context.enableVertexAttribArray(location);
	  //   return true;
	  // };

	  // publicAPI.disableAttributeArray = (name) => {
	  //   const location = publicAPI.findAttributeArray(name);
	  //   if (location === -1) {
	  //     model.error = `Could not enable attribute ${name} No such attribute.`;
	  //     return false;
	  //   }
	  //   model.context.disableVertexAttribArray(location);
	  //   return true;
	  // };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  vertexShaderHandle: 0,
	  fragmentShaderHandle: 0,
	  geometryShaderHandle: 0,
	  vertexShader: null,
	  fragmentShader: null,
	  geometryShader: null,

	  linked: false,
	  bound: false,
	  compiled: false,
	  error: '',
	  handle: 0,
	  numberOfOutputs: 0,
	  attributesLocs: null,
	  uniformLocs: null,
	  md5Hash: 0,
	  context: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Instanciate internal objects
	  model.attributesLocs = {};
	  model.uniformLocs = {};
	  model.vertexShader = _Shader2.default.newInstance();
	  model.vertexShader.setShaderType('Vertex');
	  model.fragmentShader = _Shader2.default.newInstance();
	  model.fragmentShader.setShaderType('Fragment');
	  model.geometryShader = _Shader2.default.newInstance();
	  model.geometryShader.setShaderType('Geometry');

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, ['error', 'handle', 'compiled', 'bound', 'md5Hash', 'vertexShader', 'fragmentShader', 'geometryShader', 'linked']);

	  // Object methods
	  vtkShaderProgram(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend, substitute: substitute };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkShader = vtkShader;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// export const SHADER_TYPES = ['Vertex', 'Fragment', 'Geometry', 'Unknown'];

	// ----------------------------------------------------------------------------
	// vtkShader methods
	// ----------------------------------------------------------------------------

	function vtkShader(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkShader');

	  publicAPI.compile = function () {
	    var stype = model.context.VERTEX_SHADER;

	    if (!model.source || !model.source.length || model.shaderType === 'Unknown') {
	      return false;
	    }

	    // Ensure we delete the previous shader if necessary.
	    if (model.handle !== 0) {
	      model.context.deleteShader(model.handle);
	      model.handle = 0;
	    }

	    switch (model.shaderType) {
	      // case vtkShader::Geometry:
	      //   type = GL_GEOMETRY_SHADER;
	      //   break;
	      case 'Fragment':
	        stype = model.context.FRAGMENT_SHADER;
	        break;
	      case 'Vertex':
	      default:
	        stype = model.context.VERTEX_SHADER;
	        break;
	    }

	    model.handle = model.context.createShader(stype);
	    model.context.shaderSource(model.handle, model.source);
	    model.context.compileShader(model.handle);
	    var isCompiled = model.context.getShaderParameter(model.handle, model.context.COMPILE_STATUS);
	    if (!isCompiled) {
	      var lastError = model.context.getShaderInfoLog(model.handle);
	      console.error('Error compiling shader \'' + model.source + '\': ' + lastError);
	      model.context.deleteShader(model.handle);
	      model.handle = 0;
	      return false;
	    }

	    // The shader compiled, store its handle and return success.
	    return true;
	  };

	  publicAPI.cleanup = function () {
	    if (model.shaderType === 'Unknown' || model.handle === 0) {
	      return;
	    }

	    model.context.deleteShader(model.handle);
	    model.handle = 0;
	    model.dirty = true;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  shaderType: 'Unknown',
	  source: '',
	  error: '',
	  handle: 0,
	  dirty: false,
	  context: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, ['shaderType', 'source', 'error', 'handle', 'context']);

	  // Object methods
	  vtkShader(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(26);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// ----------------------------------------------------------------------------
	// vtkOpenGLVertexArrayObject methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLVertexArrayObject(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLVertexArrayObject');

	  // Public API methods
	  publicAPI.exposedMethod = function () {
	    // This is a publicly exposed method of this object
	  };

	  publicAPI.initialize = function () {
	    model.extension = model.context.getExtension('OES_vertex_array_object');

	    // Start setting up VAO
	    if (!model.forceEmulation && model.extension) {
	      model.supported = true;
	      model.handleVAO = model.extension.createVertexArrayOES();
	    } else {
	      model.supported = false;
	    }
	  };

	  publicAPI.isReady = function () {
	    return (
	      // We either probed and allocated a VAO, or are falling back as the current
	      // hardware does not support VAOs.
	      model.handleVAO !== 0 || model.supported === false
	    );
	  };

	  publicAPI.bind = function () {
	    // Either simply bind the VAO, or emulate behavior by binding all attributes.
	    if (!publicAPI.isReady()) {
	      publicAPI.initialize();
	    }
	    if (publicAPI.isReady() && model.supported) {
	      model.extension.bindVertexArrayOES(model.handleVAO);
	    } else if (publicAPI.isReady()) {
	      (function () {
	        var gl = model.context;
	        Object.keys(model.buffers).map(function (key) {
	          return model.buffers[key];
	        }).forEach(function (buff) {
	          model.context.bindBuffer(gl.ARRAY_BUFFER, buff.buffer);
	          Object.keys(buff.attributes).map(function (key) {
	            return buff.attributes[key];
	          }).forEach(function (attrIt) {
	            var matrixCount = attrIt.isMatrix ? attrIt.size : 1;
	            for (var i = 0; i < matrixCount; ++i) {
	              gl.enableVertexAttribArray(attrIt.index + i);
	              gl.vertexAttribPointer(attrIt.index + i, attrIt.size, attrIt.type, attrIt.normalize, attrIt.stride, attrIt.offset + attrIt.stride * i / attrIt.size);
	              if (attrIt.divisor > 0) {
	                gl.vertexAttribDivisor(attrIt.index + i, 1);
	              }
	            }
	          });
	          // gl.bindBuffer(gl.ARRAY_BUFFER, 0);
	        });
	      })();
	    }
	  };

	  publicAPI.release = function () {
	    // Either simply release the VAO, or emulate behavior by releasing all attributes.
	    if (publicAPI.isReady() && model.supported) {
	      model.extension.bindVertexArrayOES(null);
	    } else if (publicAPI.isReady()) {
	      (function () {
	        var gl = model.context;
	        Object.keys(model.buffers).map(function (key) {
	          return model.buffers[key];
	        }).forEach(function (buff) {
	          Object.keys(buff.attributes).map(function (key) {
	            return buff.attributes[key];
	          }).forEach(function (attrIt) {
	            var matrixCount = attrIt.isMatrix ? attrIt.size : 1;
	            for (var i = 0; i < matrixCount; ++i) {
	              gl.enableVertexAttribArray(attrIt.index + i);
	              gl.vertexAttribPointer(attrIt.index + i, attrIt.size, attrIt.type, attrIt.normalize, attrIt.stride, attrIt.offset + attrIt.stride * i / attrIt.size);
	              if (attrIt.divisor > 0) {
	                gl.vertexAttribDivisor(attrIt.index + i, 0);
	              }
	              gl.disableVertexAttribArray(attrIt.index + i);
	            }
	          });
	        });
	      })();
	    }
	  };

	  publicAPI.shaderProgramChanged = function () {
	    publicAPI.release();
	    if (model.handleVAO) {
	      model.extension.deleteVertexArrayOES(model.handleVAO);
	    }
	    model.handleVAO = 0;
	    model.handleProgram = 0;
	  };

	  publicAPI.releaseGraphicsResources = function () {
	    publicAPI.shaderProgramChanged();
	    if (model.handleVAO) {
	      model.extension.deleteVertexArrayOES(model.handleVAO);
	    }
	    model.handleVAO = 0;
	    model.supported = true;
	    model.handleProgram = 0;
	  };

	  publicAPI.addAttributeArray = function (program, buffer, name, offset, stride, elementType, elementTupleSize, normalize) {
	    return publicAPI.addAttributeArrayWithDivisor(program, buffer, name, offset, stride, elementType, elementTupleSize, normalize, 0, false);
	  };

	  publicAPI.addAttributeArrayWithDivisor = function (program, buffer, name, offset, stride, elementType, elementTupleSize, normalize, divisor, isMatrix) {
	    if (!program) {
	      return false;
	    }

	    // Check the program is bound, and the buffer is valid.
	    if (!program.isBound() || buffer.getHandle() === 0 || buffer.getType() !== _Constants.ObjectType.ARRAY_BUFFER) {
	      return false;
	    }

	    // Perform initalization if necessary, ensure program matches VAOs.
	    if (model.handleProgram === 0) {
	      model.handleProgram = program.getHandle();
	    }
	    if (!publicAPI.isReady()) {
	      publicAPI.initialize();
	    }
	    if (!publicAPI.isReady() || model.handleProgram !== program.getHandle()) {
	      return false;
	    }

	    var gl = model.context;

	    var attribs = {};
	    attribs.index = gl.getAttribLocation(model.handleProgram, name);
	    attribs.offset = offset;
	    attribs.stride = stride;
	    //    attribs.type = convertTypeToGL(elementType);
	    attribs.type = elementType;
	    attribs.size = elementTupleSize;
	    attribs.normalize = normalize;
	    attribs.isMatrix = isMatrix;
	    attribs.divisor = divisor;

	    if (attribs.Index === -1) {
	      return false;
	    }

	    // Always make the call as even the first use wants the attrib pointer setting
	    // up when we are emulating.
	    buffer.bind();
	    gl.enableVertexAttribArray(attribs.index);
	    gl.vertexAttribPointer(attribs.index, attribs.size, attribs.type, attribs.normalize, attribs.stride, attribs.offset);

	    if (divisor > 0) {
	      gl.vertexAttribDivisor(attribs.index, 1);
	    }

	    // If vertex array objects are not supported then build up our list.
	    if (!model.supported) {
	      var handleBuffer = buffer.getHandle();
	      // find the buffer
	      if (Object.keys(model.buffers).indexOf(handleBuffer) !== -1) {
	        model.buffers[handleBuffer].attributes[attribs.index] = attribs;
	        model.buffers[handleBuffer].buffer = handleBuffer;
	      } else {
	        // a single handle can have multiple attribs
	        model.buffers[handleBuffer] = { buffer: handleBuffer, attributes: _defineProperty({}, attribs.index, attribs) };
	      }
	    }
	    return true;
	  };

	  publicAPI.addAttributeMatrixWithDivisor = function (program, buffer, name, offset, stride, elementType, elementTupleSize, normalize, divisor) {
	    // bind the first row of values
	    var result = publicAPI.addAttributeArrayWithDivisor(program, buffer, name, offset, stride, elementType, elementTupleSize, normalize, divisor, true);

	    if (!result) {
	      return result;
	    }

	    var gl = model.context;

	    var index = gl.getAttribLocation(model.handleProgram, name);

	    for (var i = 1; i < elementTupleSize; i++) {
	      gl.enableVertexAttribArray(index + i);
	      //      gl.vertexAttribPointer(index + i, elementTupleSize, convertTypeToGL(elementType),
	      gl.vertexAttribPointer(index + i, elementTupleSize, elementType, normalize, stride, offset + stride * i / elementTupleSize);
	      if (divisor > 0) {
	        gl.vertexAttribDivisor(index + i, 1);
	      }
	    }

	    return true;
	  };

	  publicAPI.removeAttributeArray = function (name) {
	    if (!publicAPI.isReady() || model.handleProgram === 0) {
	      return false;
	    }

	    var gl = model.context;
	    var location = gl.getAttribLocation(model.handleProgram, name);

	    if (location === -1) {
	      return false;
	    }

	    gl.disableVertexAttribArray(location);
	    // If we don't have real VAOs find the entry and remove it too.
	    if (!model.supported) {
	      Object.keys(model.buffers).map(function (key) {
	        return model.buffers[key];
	      }).forEach(function (buff) {
	        delete buff.attributes[location];
	      });
	    }

	    return true;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  forceEmulation: false,
	  handleVAO: 0,
	  handleProgram: 0,
	  supported: true,
	  buffers: null,
	  context: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Internal objects initialization
	  model.buffers = {};

	  // Object methods
	  macro.obj(publicAPI, model);

	  // Create get-only macros
	  macro.get(publicAPI, model, ['supported']);

	  // Create get-set macros
	  macro.setGet(publicAPI, model, ['context', 'forceEmulation']);

	  // For more macro methods, see "Sources/macro.js"

	  // Object specific methods
	  vtkOpenGLVertexArrayObject(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _seedrandom = __webpack_require__(33);

	var _seedrandom2 = _interopRequireDefault(_seedrandom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// ----------------------------------------------------------------------------
	/* eslint-disable camelcase                                                  */
	/* eslint-disable no-cond-assign                                             */
	/* eslint-disable no-bitwise                                                 */
	// ----------------------------------------------------------------------------
	var randomSeedValue = 0;
	var VTK_MAX_ROTATIONS = 20;
	var VTK_SMALL_NUMBER = 1.0e-12;

	function notImplemented(method) {
	  return function () {
	    return console.log('vtkMath::' + method + ' - NOT IMPLEMENTED');
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
	  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

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

	var randomSeed = function randomSeed(seed) {
	  (0, _seedrandom2.default)('' + seed, { global: true });
	  randomSeedValue = seed;
	};

	var getSeed = function getSeed() {
	  return randomSeedValue;
	};

	function random() {
	  var minValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var maxValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

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
	  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

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
	      y[dz] = (-(a * costheta) - b * c * sintheta) / tmp;
	    }

	    if (z) {
	      z[dx] = (-(c * sintheta) - a * b * costheta) / tmp;
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
	  x_3[2] /= mat_3x3[2][2];
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
	  // ensure eigenvector consistency (i.e., Jacobi can compute vectors that
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
	    y[1] = (-(A[1][0] * x[0]) + A[0][0] * x[1]) / det;

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
	  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	  var column = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

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
	  var checkHomogeneous = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;

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

	  var _rgb = _slicedToArray(rgb, 3),
	      r = _rgb[0],
	      g = _rgb[1],
	      b = _rgb[2];

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
	  var _hsv = _slicedToArray(hsv, 3),
	      h = _hsv[0],
	      s = _hsv[1],
	      v = _hsv[2];

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
	  var _lab = _slicedToArray(lab, 3),
	      L = _lab[0],
	      a = _lab[1],
	      b = _lab[2];

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
	  var _xyz = _slicedToArray(xyz, 3),
	      x = _xyz[0],
	      y = _xyz[1],
	      z = _xyz[2];

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
	  var _xyz2 = _slicedToArray(xyz, 3),
	      x = _xyz2[0],
	      y = _xyz2[1],
	      z = _xyz2[2];

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
	  if (r > 0.0031308) r = 1.055 * Math.pow(r, 1 / 2.4) - 0.055;else r *= 12.92;
	  if (g > 0.0031308) g = 1.055 * Math.pow(g, 1 / 2.4) - 0.055;else g *= 12.92;
	  if (b > 0.0031308) b = 1.055 * Math.pow(b, 1 / 2.4) - 0.055;else b *= 12.92;

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
	  var _rgb2 = _slicedToArray(rgb, 3),
	      r = _rgb2[0],
	      g = _rgb2[1],
	      b = _rgb2[2];
	  // The following performs a "gamma correction" specified by the sRGB color
	  // space.  sRGB is defined by a canonical definition of a display monitor and
	  // has been standardized by the International Electrotechnical Commission (IEC
	  // 61966-2-1).  The nonlinearity of the correction is designed to make the
	  // colors more perceptually uniform.  This color space has been adopted by
	  // several applications including Adobe Photoshop and Microsoft Windows color
	  // management.  OpenGL is agnostic on its RGB color space, but it is reasonable
	  // to assume it is close to this one.


	  if (r > 0.04045) r = Math.pow((r + 0.055) / 1.055, 2.4);else r /= 12.92;
	  if (g > 0.04045) g = Math.pow((g + 0.055) / 1.055, 2.4);else g /= 12.92;
	  if (b > 0.04045) b = Math.pow((b + 0.055) / 1.055, 2.4);else b /= 12.92;

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
	    } else if (value > range[1]) {
	      result = range[1];
	    } else {
	      result = value;
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

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// A library of seedable RNGs implemented in Javascript.
	//
	// Usage:
	//
	// var seedrandom = require('seedrandom');
	// var random = seedrandom(1); // or any seed.
	// var x = random();       // 0 <= x < 1.  Every bit is random.
	// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

	// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
	// Period: ~2^116
	// Reported to pass all BigCrush tests.
	var alea = __webpack_require__(34);

	// xor128, a pure xor-shift generator by George Marsaglia.
	// Period: 2^128-1.
	// Reported to fail: MatrixRank and LinearComp.
	var xor128 = __webpack_require__(38);

	// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
	// Period: 2^192-2^32
	// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
	var xorwow = __webpack_require__(39);

	// xorshift7, by François Panneton and Pierre L'ecuyer, takes
	// a different approach: it adds robustness by allowing more shifts
	// than Marsaglia's original three.  It is a 7-shift generator
	// with 256 bits, that passes BigCrush with no systmatic failures.
	// Period 2^256-1.
	// No systematic BigCrush failures reported.
	var xorshift7 = __webpack_require__(40);

	// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
	// very long period that also adds a Weyl generator. It also passes
	// BigCrush with no systematic failures.  Its long period may
	// be useful if you have many generators and need to avoid
	// collisions.
	// Period: 2^4128-2^32.
	// No systematic BigCrush failures reported.
	var xor4096 = __webpack_require__(41);

	// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
	// number generator derived from ChaCha, a modern stream cipher.
	// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
	// Period: ~2^127
	// No systematic BigCrush failures reported.
	var tychei = __webpack_require__(42);

	// The original ARC4-based prng included in this library.
	// Period: ~2^1600
	var sr = __webpack_require__(43);

	sr.alea = alea;
	sr.xor128 = xor128;
	sr.xorwow = xorwow;
	sr.xorshift7 = xorshift7;
	sr.xor4096 = xor4096;
	sr.tychei = tychei;

	module.exports = sr;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
	// http://baagoe.com/en/RandomMusings/javascript/
	// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
	// Original work is under MIT license -

	// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	// 
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	// 
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.



	(function(global, module, define) {

	function Alea(seed) {
	  var me = this, mash = Mash();

	  me.next = function() {
	    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
	    me.s0 = me.s1;
	    me.s1 = me.s2;
	    return me.s2 = t - (me.c = t | 0);
	  };

	  // Apply the seeding algorithm from Baagoe.
	  me.c = 1;
	  me.s0 = mash(' ');
	  me.s1 = mash(' ');
	  me.s2 = mash(' ');
	  me.s0 -= mash(seed);
	  if (me.s0 < 0) { me.s0 += 1; }
	  me.s1 -= mash(seed);
	  if (me.s1 < 0) { me.s1 += 1; }
	  me.s2 -= mash(seed);
	  if (me.s2 < 0) { me.s2 += 1; }
	  mash = null;
	}

	function copy(f, t) {
	  t.c = f.c;
	  t.s0 = f.s0;
	  t.s1 = f.s1;
	  t.s2 = f.s2;
	  return t;
	}

	function impl(seed, opts) {
	  var xg = new Alea(seed),
	      state = opts && opts.state,
	      prng = xg.next;
	  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
	  prng.double = function() {
	    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
	  };
	  prng.quick = prng;
	  if (state) {
	    if (typeof(state) == 'object') copy(state, xg);
	    prng.state = function() { return copy(xg, {}); }
	  }
	  return prng;
	}

	function Mash() {
	  var n = 0xefc8249d;

	  var mash = function(data) {
	    data = data.toString();
	    for (var i = 0; i < data.length; i++) {
	      n += data.charCodeAt(i);
	      var h = 0.02519603282416938 * n;
	      n = h >>> 0;
	      h -= n;
	      h *= n;
	      n = h >>> 0;
	      h -= n;
	      n += h * 0x100000000; // 2^32
	    }
	    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
	  };

	  return mash;
	}


	if (module && module.exports) {
	  module.exports = impl;
	} else if (__webpack_require__(36) && __webpack_require__(37)) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	  this.alea = impl;
	}

	})(
	  this,
	  (typeof module) == 'object' && module,    // present in node.js
	  __webpack_require__(36)   // present with an AMD loader
	);



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)(module)))

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 37 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// A Javascript implementaion of the "xor128" prng algorithm by
	// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

	(function(global, module, define) {

	function XorGen(seed) {
	  var me = this, strseed = '';

	  me.x = 0;
	  me.y = 0;
	  me.z = 0;
	  me.w = 0;

	  // Set up generator function.
	  me.next = function() {
	    var t = me.x ^ (me.x << 11);
	    me.x = me.y;
	    me.y = me.z;
	    me.z = me.w;
	    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
	  };

	  if (seed === (seed | 0)) {
	    // Integer seed.
	    me.x = seed;
	  } else {
	    // String seed.
	    strseed += seed;
	  }

	  // Mix in string seed, then discard an initial batch of 64 values.
	  for (var k = 0; k < strseed.length + 64; k++) {
	    me.x ^= strseed.charCodeAt(k) | 0;
	    me.next();
	  }
	}

	function copy(f, t) {
	  t.x = f.x;
	  t.y = f.y;
	  t.z = f.z;
	  t.w = f.w;
	  return t;
	}

	function impl(seed, opts) {
	  var xg = new XorGen(seed),
	      state = opts && opts.state,
	      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
	  prng.double = function() {
	    do {
	      var top = xg.next() >>> 11,
	          bot = (xg.next() >>> 0) / 0x100000000,
	          result = (top + bot) / (1 << 21);
	    } while (result === 0);
	    return result;
	  };
	  prng.int32 = xg.next;
	  prng.quick = prng;
	  if (state) {
	    if (typeof(state) == 'object') copy(state, xg);
	    prng.state = function() { return copy(xg, {}); }
	  }
	  return prng;
	}

	if (module && module.exports) {
	  module.exports = impl;
	} else if (__webpack_require__(36) && __webpack_require__(37)) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	  this.xor128 = impl;
	}

	})(
	  this,
	  (typeof module) == 'object' && module,    // present in node.js
	  __webpack_require__(36)   // present with an AMD loader
	);



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)(module)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// A Javascript implementaion of the "xorwow" prng algorithm by
	// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

	(function(global, module, define) {

	function XorGen(seed) {
	  var me = this, strseed = '';

	  // Set up generator function.
	  me.next = function() {
	    var t = (me.x ^ (me.x >>> 2));
	    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
	    return (me.d = (me.d + 362437 | 0)) +
	       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
	  };

	  me.x = 0;
	  me.y = 0;
	  me.z = 0;
	  me.w = 0;
	  me.v = 0;

	  if (seed === (seed | 0)) {
	    // Integer seed.
	    me.x = seed;
	  } else {
	    // String seed.
	    strseed += seed;
	  }

	  // Mix in string seed, then discard an initial batch of 64 values.
	  for (var k = 0; k < strseed.length + 64; k++) {
	    me.x ^= strseed.charCodeAt(k) | 0;
	    if (k == strseed.length) {
	      me.d = me.x << 10 ^ me.x >>> 4;
	    }
	    me.next();
	  }
	}

	function copy(f, t) {
	  t.x = f.x;
	  t.y = f.y;
	  t.z = f.z;
	  t.w = f.w;
	  t.v = f.v;
	  t.d = f.d;
	  return t;
	}

	function impl(seed, opts) {
	  var xg = new XorGen(seed),
	      state = opts && opts.state,
	      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
	  prng.double = function() {
	    do {
	      var top = xg.next() >>> 11,
	          bot = (xg.next() >>> 0) / 0x100000000,
	          result = (top + bot) / (1 << 21);
	    } while (result === 0);
	    return result;
	  };
	  prng.int32 = xg.next;
	  prng.quick = prng;
	  if (state) {
	    if (typeof(state) == 'object') copy(state, xg);
	    prng.state = function() { return copy(xg, {}); }
	  }
	  return prng;
	}

	if (module && module.exports) {
	  module.exports = impl;
	} else if (__webpack_require__(36) && __webpack_require__(37)) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	  this.xorwow = impl;
	}

	})(
	  this,
	  (typeof module) == 'object' && module,    // present in node.js
	  __webpack_require__(36)   // present with an AMD loader
	);



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)(module)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// A Javascript implementaion of the "xorshift7" algorithm by
	// François Panneton and Pierre L'ecuyer:
	// "On the Xorgshift Random Number Generators"
	// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

	(function(global, module, define) {

	function XorGen(seed) {
	  var me = this;

	  // Set up generator function.
	  me.next = function() {
	    // Update xor generator.
	    var X = me.x, i = me.i, t, v, w;
	    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
	    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
	    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
	    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
	    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
	    X[i] = v;
	    me.i = (i + 1) & 7;
	    return v;
	  };

	  function init(me, seed) {
	    var j, w, X = [];

	    if (seed === (seed | 0)) {
	      // Seed state array using a 32-bit integer.
	      w = X[0] = seed;
	    } else {
	      // Seed state using a string.
	      seed = '' + seed;
	      for (j = 0; j < seed.length; ++j) {
	        X[j & 7] = (X[j & 7] << 15) ^
	            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
	      }
	    }
	    // Enforce an array length of 8, not all zeroes.
	    while (X.length < 8) X.push(0);
	    for (j = 0; j < 8 && X[j] === 0; ++j);
	    if (j == 8) w = X[7] = -1; else w = X[j];

	    me.x = X;
	    me.i = 0;

	    // Discard an initial 256 values.
	    for (j = 256; j > 0; --j) {
	      me.next();
	    }
	  }

	  init(me, seed);
	}

	function copy(f, t) {
	  t.x = f.x.slice();
	  t.i = f.i;
	  return t;
	}

	function impl(seed, opts) {
	  if (seed == null) seed = +(new Date);
	  var xg = new XorGen(seed),
	      state = opts && opts.state,
	      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
	  prng.double = function() {
	    do {
	      var top = xg.next() >>> 11,
	          bot = (xg.next() >>> 0) / 0x100000000,
	          result = (top + bot) / (1 << 21);
	    } while (result === 0);
	    return result;
	  };
	  prng.int32 = xg.next;
	  prng.quick = prng;
	  if (state) {
	    if (state.x) copy(state, xg);
	    prng.state = function() { return copy(xg, {}); }
	  }
	  return prng;
	}

	if (module && module.exports) {
	  module.exports = impl;
	} else if (__webpack_require__(36) && __webpack_require__(37)) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	  this.xorshift7 = impl;
	}

	})(
	  this,
	  (typeof module) == 'object' && module,    // present in node.js
	  __webpack_require__(36)   // present with an AMD loader
	);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)(module)))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
	//
	// This fast non-cryptographic random number generator is designed for
	// use in Monte-Carlo algorithms. It combines a long-period xorshift
	// generator with a Weyl generator, and it passes all common batteries
	// of stasticial tests for randomness while consuming only a few nanoseconds
	// for each prng generated.  For background on the generator, see Brent's
	// paper: "Some long-period random number generators using shifts and xors."
	// http://arxiv.org/pdf/1104.3115.pdf
	//
	// Usage:
	//
	// var xor4096 = require('xor4096');
	// random = xor4096(1);                        // Seed with int32 or string.
	// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
	// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
	//
	// For nonzero numeric keys, this impelementation provides a sequence
	// identical to that by Brent's xorgens 3 implementaion in C.  This
	// implementation also provides for initalizing the generator with
	// string seeds, or for saving and restoring the state of the generator.
	//
	// On Chrome, this prng benchmarks about 2.1 times slower than
	// Javascript's built-in Math.random().

	(function(global, module, define) {

	function XorGen(seed) {
	  var me = this;

	  // Set up generator function.
	  me.next = function() {
	    var w = me.w,
	        X = me.X, i = me.i, t, v;
	    // Update Weyl generator.
	    me.w = w = (w + 0x61c88647) | 0;
	    // Update xor generator.
	    v = X[(i + 34) & 127];
	    t = X[i = ((i + 1) & 127)];
	    v ^= v << 13;
	    t ^= t << 17;
	    v ^= v >>> 15;
	    t ^= t >>> 12;
	    // Update Xor generator array state.
	    v = X[i] = v ^ t;
	    me.i = i;
	    // Result is the combination.
	    return (v + (w ^ (w >>> 16))) | 0;
	  };

	  function init(me, seed) {
	    var t, v, i, j, w, X = [], limit = 128;
	    if (seed === (seed | 0)) {
	      // Numeric seeds initialize v, which is used to generates X.
	      v = seed;
	      seed = null;
	    } else {
	      // String seeds are mixed into v and X one character at a time.
	      seed = seed + '\0';
	      v = 0;
	      limit = Math.max(limit, seed.length);
	    }
	    // Initialize circular array and weyl value.
	    for (i = 0, j = -32; j < limit; ++j) {
	      // Put the unicode characters into the array, and shuffle them.
	      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
	      // After 32 shuffles, take v as the starting w value.
	      if (j === 0) w = v;
	      v ^= v << 10;
	      v ^= v >>> 15;
	      v ^= v << 4;
	      v ^= v >>> 13;
	      if (j >= 0) {
	        w = (w + 0x61c88647) | 0;     // Weyl.
	        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
	        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
	      }
	    }
	    // We have detected all zeroes; make the key nonzero.
	    if (i >= 128) {
	      X[(seed && seed.length || 0) & 127] = -1;
	    }
	    // Run the generator 512 times to further mix the state before using it.
	    // Factoring this as a function slows the main generator, so it is just
	    // unrolled here.  The weyl generator is not advanced while warming up.
	    i = 127;
	    for (j = 4 * 128; j > 0; --j) {
	      v = X[(i + 34) & 127];
	      t = X[i = ((i + 1) & 127)];
	      v ^= v << 13;
	      t ^= t << 17;
	      v ^= v >>> 15;
	      t ^= t >>> 12;
	      X[i] = v ^ t;
	    }
	    // Storing state as object members is faster than using closure variables.
	    me.w = w;
	    me.X = X;
	    me.i = i;
	  }

	  init(me, seed);
	}

	function copy(f, t) {
	  t.i = f.i;
	  t.w = f.w;
	  t.X = f.X.slice();
	  return t;
	};

	function impl(seed, opts) {
	  if (seed == null) seed = +(new Date);
	  var xg = new XorGen(seed),
	      state = opts && opts.state,
	      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
	  prng.double = function() {
	    do {
	      var top = xg.next() >>> 11,
	          bot = (xg.next() >>> 0) / 0x100000000,
	          result = (top + bot) / (1 << 21);
	    } while (result === 0);
	    return result;
	  };
	  prng.int32 = xg.next;
	  prng.quick = prng;
	  if (state) {
	    if (state.X) copy(state, xg);
	    prng.state = function() { return copy(xg, {}); }
	  }
	  return prng;
	}

	if (module && module.exports) {
	  module.exports = impl;
	} else if (__webpack_require__(36) && __webpack_require__(37)) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	  this.xor4096 = impl;
	}

	})(
	  this,                                     // window object or global
	  (typeof module) == 'object' && module,    // present in node.js
	  __webpack_require__(36)   // present with an AMD loader
	);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)(module)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// A Javascript implementaion of the "Tyche-i" prng algorithm by
	// Samuel Neves and Filipe Araujo.
	// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

	(function(global, module, define) {

	function XorGen(seed) {
	  var me = this, strseed = '';

	  // Set up generator function.
	  me.next = function() {
	    var b = me.b, c = me.c, d = me.d, a = me.a;
	    b = (b << 25) ^ (b >>> 7) ^ c;
	    c = (c - d) | 0;
	    d = (d << 24) ^ (d >>> 8) ^ a;
	    a = (a - b) | 0;
	    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
	    me.c = c = (c - d) | 0;
	    me.d = (d << 16) ^ (c >>> 16) ^ a;
	    return me.a = (a - b) | 0;
	  };

	  /* The following is non-inverted tyche, which has better internal
	   * bit diffusion, but which is about 25% slower than tyche-i in JS.
	  me.next = function() {
	    var a = me.a, b = me.b, c = me.c, d = me.d;
	    a = (me.a + me.b | 0) >>> 0;
	    d = me.d ^ a; d = d << 16 ^ d >>> 16;
	    c = me.c + d | 0;
	    b = me.b ^ c; b = b << 12 ^ d >>> 20;
	    me.a = a = a + b | 0;
	    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
	    me.c = c = c + d | 0;
	    b = b ^ c;
	    return me.b = (b << 7 ^ b >>> 25);
	  }
	  */

	  me.a = 0;
	  me.b = 0;
	  me.c = 2654435769 | 0;
	  me.d = 1367130551;

	  if (seed === Math.floor(seed)) {
	    // Integer seed.
	    me.a = (seed / 0x100000000) | 0;
	    me.b = seed | 0;
	  } else {
	    // String seed.
	    strseed += seed;
	  }

	  // Mix in string seed, then discard an initial batch of 64 values.
	  for (var k = 0; k < strseed.length + 20; k++) {
	    me.b ^= strseed.charCodeAt(k) | 0;
	    me.next();
	  }
	}

	function copy(f, t) {
	  t.a = f.a;
	  t.b = f.b;
	  t.c = f.c;
	  t.d = f.d;
	  return t;
	};

	function impl(seed, opts) {
	  var xg = new XorGen(seed),
	      state = opts && opts.state,
	      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
	  prng.double = function() {
	    do {
	      var top = xg.next() >>> 11,
	          bot = (xg.next() >>> 0) / 0x100000000,
	          result = (top + bot) / (1 << 21);
	    } while (result === 0);
	    return result;
	  };
	  prng.int32 = xg.next;
	  prng.quick = prng;
	  if (state) {
	    if (typeof(state) == 'object') copy(state, xg);
	    prng.state = function() { return copy(xg, {}); }
	  }
	  return prng;
	}

	if (module && module.exports) {
	  module.exports = impl;
	} else if (__webpack_require__(36) && __webpack_require__(37)) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	  this.tychei = impl;
	}

	})(
	  this,
	  (typeof module) == 'object' && module,    // present in node.js
	  __webpack_require__(36)   // present with an AMD loader
	);



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)(module)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	Copyright 2014 David Bau.

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	*/

	(function (pool, math) {
	//
	// The following constants are related to IEEE 754 limits.
	//
	var global = this,
	    width = 256,        // each RC4 output is 0 <= x < 256
	    chunks = 6,         // at least six RC4 outputs for each double
	    digits = 52,        // there are 52 significant digits in a double
	    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
	    startdenom = math.pow(width, chunks),
	    significance = math.pow(2, digits),
	    overflow = significance * 2,
	    mask = width - 1,
	    nodecrypto;         // node.js crypto module, initialized at the bottom.

	//
	// seedrandom()
	// This is the seedrandom function described above.
	//
	function seedrandom(seed, options, callback) {
	  var key = [];
	  options = (options == true) ? { entropy: true } : (options || {});

	  // Flatten the seed string or build one from local entropy if needed.
	  var shortseed = mixkey(flatten(
	    options.entropy ? [seed, tostring(pool)] :
	    (seed == null) ? autoseed() : seed, 3), key);

	  // Use the seed to initialize an ARC4 generator.
	  var arc4 = new ARC4(key);

	  // This function returns a random double in [0, 1) that contains
	  // randomness in every bit of the mantissa of the IEEE 754 value.
	  var prng = function() {
	    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
	        d = startdenom,                 //   and denominator d = 2 ^ 48.
	        x = 0;                          //   and no 'extra last byte'.
	    while (n < significance) {          // Fill up all significant digits by
	      n = (n + x) * width;              //   shifting numerator and
	      d *= width;                       //   denominator and generating a
	      x = arc4.g(1);                    //   new least-significant-byte.
	    }
	    while (n >= overflow) {             // To avoid rounding up, before adding
	      n /= 2;                           //   last byte, shift everything
	      d /= 2;                           //   right using integer math until
	      x >>>= 1;                         //   we have exactly the desired bits.
	    }
	    return (n + x) / d;                 // Form the number within [0, 1).
	  };

	  prng.int32 = function() { return arc4.g(4) | 0; }
	  prng.quick = function() { return arc4.g(4) / 0x100000000; }
	  prng.double = prng;

	  // Mix the randomness into accumulated entropy.
	  mixkey(tostring(arc4.S), pool);

	  // Calling convention: what to return as a function of prng, seed, is_math.
	  return (options.pass || callback ||
	      function(prng, seed, is_math_call, state) {
	        if (state) {
	          // Load the arc4 state from the given state if it has an S array.
	          if (state.S) { copy(state, arc4); }
	          // Only provide the .state method if requested via options.state.
	          prng.state = function() { return copy(arc4, {}); }
	        }

	        // If called as a method of Math (Math.seedrandom()), mutate
	        // Math.random because that is how seedrandom.js has worked since v1.0.
	        if (is_math_call) { math[rngname] = prng; return seed; }

	        // Otherwise, it is a newer calling convention, so return the
	        // prng directly.
	        else return prng;
	      })(
	  prng,
	  shortseed,
	  'global' in options ? options.global : (this == math),
	  options.state);
	}
	math['seed' + rngname] = seedrandom;

	//
	// ARC4
	//
	// An ARC4 implementation.  The constructor takes a key in the form of
	// an array of at most (width) integers that should be 0 <= x < (width).
	//
	// The g(count) method returns a pseudorandom integer that concatenates
	// the next (count) outputs from ARC4.  Its return value is a number x
	// that is in the range 0 <= x < (width ^ count).
	//
	function ARC4(key) {
	  var t, keylen = key.length,
	      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

	  // The empty key [] is treated as [0].
	  if (!keylen) { key = [keylen++]; }

	  // Set up S using the standard key scheduling algorithm.
	  while (i < width) {
	    s[i] = i++;
	  }
	  for (i = 0; i < width; i++) {
	    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
	    s[j] = t;
	  }

	  // The "g" method returns the next (count) outputs as one number.
	  (me.g = function(count) {
	    // Using instance members instead of closure state nearly doubles speed.
	    var t, r = 0,
	        i = me.i, j = me.j, s = me.S;
	    while (count--) {
	      t = s[i = mask & (i + 1)];
	      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
	    }
	    me.i = i; me.j = j;
	    return r;
	    // For robust unpredictability, the function call below automatically
	    // discards an initial batch of values.  This is called RC4-drop[256].
	    // See http://google.com/search?q=rsa+fluhrer+response&btnI
	  })(width);
	}

	//
	// copy()
	// Copies internal state of ARC4 to or from a plain object.
	//
	function copy(f, t) {
	  t.i = f.i;
	  t.j = f.j;
	  t.S = f.S.slice();
	  return t;
	};

	//
	// flatten()
	// Converts an object tree to nested arrays of strings.
	//
	function flatten(obj, depth) {
	  var result = [], typ = (typeof obj), prop;
	  if (depth && typ == 'object') {
	    for (prop in obj) {
	      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
	    }
	  }
	  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
	}

	//
	// mixkey()
	// Mixes a string seed into a key that is an array of integers, and
	// returns a shortened string seed that is equivalent to the result key.
	//
	function mixkey(seed, key) {
	  var stringseed = seed + '', smear, j = 0;
	  while (j < stringseed.length) {
	    key[mask & j] =
	      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
	  }
	  return tostring(key);
	}

	//
	// autoseed()
	// Returns an object for autoseeding, using window.crypto and Node crypto
	// module if available.
	//
	function autoseed() {
	  try {
	    if (nodecrypto) { return tostring(nodecrypto.randomBytes(width)); }
	    var out = new Uint8Array(width);
	    (global.crypto || global.msCrypto).getRandomValues(out);
	    return tostring(out);
	  } catch (e) {
	    var browser = global.navigator,
	        plugins = browser && browser.plugins;
	    return [+new Date, global, plugins, global.screen, tostring(pool)];
	  }
	}

	//
	// tostring()
	// Converts an array of charcodes to a string
	//
	function tostring(a) {
	  return String.fromCharCode.apply(0, a);
	}

	//
	// When seedrandom.js is loaded, we immediately mix a few bits
	// from the built-in RNG into the entropy pool.  Because we do
	// not want to interfere with deterministic PRNG state later,
	// seedrandom will not call math.random on its own again after
	// initialization.
	//
	mixkey(math.random(), pool);

	//
	// Nodejs and AMD support: export the implementation as a module using
	// either convention.
	//
	if ((typeof module) == 'object' && module.exports) {
	  module.exports = seedrandom;
	  // When in node.js, try using crypto package for autoseeding.
	  try {
	    nodecrypto = __webpack_require__(44);
	  } catch (ex) {}
	} else if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return seedrandom; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	// End anonymous scope, and pass initial values.
	})(
	  [],     // pool: entropy pool starts empty
	  Math    // math: package containing random, pow, and seedrandom
	);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(49)

	function error () {
	  var m = [].slice.call(arguments).join(' ')
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	    ].join('\n'))
	}

	exports.createHash = __webpack_require__(51)

	exports.createHmac = __webpack_require__(64)

	exports.randomBytes = function(size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)))
	    } catch (err) { callback(err) }
	  } else {
	    return new Buffer(rng(size))
	  }
	}

	function each(a, f) {
	  for(var i in a)
	    f(a[i], i)
	}

	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160']
	}

	var p = __webpack_require__(65)(exports)
	exports.pbkdf2 = p.pbkdf2
	exports.pbkdf2Sync = p.pbkdf2Sync


	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials'
	, 'createCipher'
	, 'createCipheriv'
	, 'createDecipher'
	, 'createDecipheriv'
	, 'createSign'
	, 'createVerify'
	, 'createDiffieHellman'
	], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet')
	  }
	})

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45).Buffer))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(46)
	var ieee754 = __webpack_require__(47)
	var isArray = __webpack_require__(48)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45).Buffer, (function() { return this; }())))

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 47 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 48 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	  var g = ('undefined' === typeof window ? global : window) || {}
	  _crypto = (
	    g.crypto || g.msCrypto || __webpack_require__(50)
	  )
	  module.exports = function(size) {
	    // Modern Browsers
	    if(_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */
	    
	      _crypto.getRandomValues(bytes);
	      return bytes;
	    }
	    else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size)
	    }
	    else
	      throw new Error(
	        'secure random number generation not supported by this browser\n'+
	        'use chrome, FireFox or Internet Explorer 11'
	      )
	  }
	}())

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(45).Buffer))

/***/ },
/* 50 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(52)

	var md5 = toConstructor(__webpack_require__(61))
	var rmd160 = toConstructor(__webpack_require__(63))

	function toConstructor (fn) {
	  return function () {
	    var buffers = []
	    var m= {
	      update: function (data, enc) {
	        if(!Buffer.isBuffer(data)) data = new Buffer(data, enc)
	        buffers.push(data)
	        return this
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers)
	        var r = fn(buf)
	        buffers = null
	        return enc ? r.toString(enc) : r
	      }
	    }
	    return m
	  }
	}

	module.exports = function (alg) {
	  if('md5' === alg) return new md5()
	  if('rmd160' === alg) return new rmd160()
	  return createHash(alg)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45).Buffer))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg]
	  if(!Alg) throw new Error(alg + ' is not supported (we accept pull requests)')
	  return new Alg()
	}

	var Buffer = __webpack_require__(45).Buffer
	var Hash   = __webpack_require__(53)(Buffer)

	exports.sha1 = __webpack_require__(54)(Buffer, Hash)
	exports.sha256 = __webpack_require__(59)(Buffer, Hash)
	exports.sha512 = __webpack_require__(60)(Buffer, Hash)


/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = function (Buffer) {

	  //prototype class for hash functions
	  function Hash (blockSize, finalSize) {
	    this._block = new Buffer(blockSize) //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize
	    this._blockSize = blockSize
	    this._len = 0
	    this._s = 0
	  }

	  Hash.prototype.init = function () {
	    this._s = 0
	    this._len = 0
	  }

	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8"
	      data = new Buffer(data, enc)
	    }

	    var l = this._len += data.length
	    var s = this._s = (this._s || 0)
	    var f = 0
	    var buffer = this._block

	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
	      var ch = (t - f)

	      for (var i = 0; i < ch; i++) {
	        buffer[(s % this._blockSize) + i] = data[i + f]
	      }

	      s += ch
	      f += ch

	      if ((s % this._blockSize) === 0) {
	        this._update(buffer)
	      }
	    }
	    this._s = s

	    return this
	  }

	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8

	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80

	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1)

	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block)
	      this._block.fill(0)
	    }

	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4)

	    var hash = this._update(this._block) || this._hash()

	    return enc ? hash.toString(enc) : hash
	  }

	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass')
	  }

	  return Hash
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */

	var inherits = __webpack_require__(55).inherits

	module.exports = function (Buffer, Hash) {

	  var A = 0|0
	  var B = 4|0
	  var C = 8|0
	  var D = 12|0
	  var E = 16|0

	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80)

	  var POOL = []

	  function Sha1 () {
	    if(POOL.length)
	      return POOL.pop().init()

	    if(!(this instanceof Sha1)) return new Sha1()
	    this._w = W
	    Hash.call(this, 16*4, 14*4)

	    this._h = null
	    this.init()
	  }

	  inherits(Sha1, Hash)

	  Sha1.prototype.init = function () {
	    this._a = 0x67452301
	    this._b = 0xefcdab89
	    this._c = 0x98badcfe
	    this._d = 0x10325476
	    this._e = 0xc3d2e1f0

	    Hash.prototype.init.call(this)
	    return this
	  }

	  Sha1.prototype._POOL = POOL
	  Sha1.prototype._update = function (X) {

	    var a, b, c, d, e, _a, _b, _c, _d, _e

	    a = _a = this._a
	    b = _b = this._b
	    c = _c = this._c
	    d = _d = this._d
	    e = _e = this._e

	    var w = this._w

	    for(var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j*4)
	        : rol(w[j - 3] ^ w[j -  8] ^ w[j - 14] ^ w[j - 16], 1)

	      var t = add(
	        add(rol(a, 5), sha1_ft(j, b, c, d)),
	        add(add(e, W), sha1_kt(j))
	      )

	      e = d
	      d = c
	      c = rol(b, 30)
	      b = a
	      a = t
	    }

	    this._a = add(a, _a)
	    this._b = add(b, _b)
	    this._c = add(c, _c)
	    this._d = add(d, _d)
	    this._e = add(e, _e)
	  }

	  Sha1.prototype._hash = function () {
	    if(POOL.length < 100) POOL.push(this)
	    var H = new Buffer(20)
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a|0, A)
	    H.writeInt32BE(this._b|0, B)
	    H.writeInt32BE(this._c|0, C)
	    H.writeInt32BE(this._d|0, D)
	    H.writeInt32BE(this._e|0, E)
	    return H
	  }

	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if(t < 20) return (b & c) | ((~b) & d);
	    if(t < 40) return b ^ c ^ d;
	    if(t < 60) return (b & c) | (b & d) | (c & d);
	    return b ^ c ^ d;
	  }

	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	           (t < 60) ? -1894007588 : -899497514;
	  }

	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return (x + y ) | 0
	  //lets see how this goes on testling.
	  //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  //  return (msw << 16) | (lsw & 0xFFFF);
	  }

	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	  }

	  return Sha1
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(57);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(58);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(56)))

/***/ },
/* 56 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 58 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */

	var inherits = __webpack_require__(55).inherits

	module.exports = function (Buffer, Hash) {

	  var K = [
	      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	      0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	      0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	      0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	      0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	      0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	      0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	      0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	      0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	      0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	      0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	    ]

	  var W = new Array(64)

	  function Sha256() {
	    this.init()

	    this._w = W //new Array(64)

	    Hash.call(this, 16*4, 14*4)
	  }

	  inherits(Sha256, Hash)

	  Sha256.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, n) {
	    return (X >>> n) | (X << (32 - n));
	  }

	  function R (X, n) {
	    return (X >>> n);
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  function Sigma0256 (x) {
	    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	  }

	  function Sigma1256 (x) {
	    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	  }

	  function Gamma0256 (x) {
	    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	  }

	  function Gamma1256 (x) {
	    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	  }

	  Sha256.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var T1, T2

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16
	        ? M.readInt32BE(j * 4)
	        : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16]

	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w

	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g; g = f; f = e; e = d + T1; d = c; c = b; b = a; a = T1 + T2;
	    }

	    this._a = (a + this._a) | 0
	    this._b = (b + this._b) | 0
	    this._c = (c + this._c) | 0
	    this._d = (d + this._d) | 0
	    this._e = (e + this._e) | 0
	    this._f = (f + this._f) | 0
	    this._g = (g + this._g) | 0
	    this._h = (h + this._h) | 0

	  };

	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32)

	    H.writeInt32BE(this._a,  0)
	    H.writeInt32BE(this._b,  4)
	    H.writeInt32BE(this._c,  8)
	    H.writeInt32BE(this._d, 12)
	    H.writeInt32BE(this._e, 16)
	    H.writeInt32BE(this._f, 20)
	    H.writeInt32BE(this._g, 24)
	    H.writeInt32BE(this._h, 28)

	    return H
	  }

	  return Sha256

	}


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(55).inherits

	module.exports = function (Buffer, Hash) {
	  var K = [
	    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	  ]

	  var W = new Array(160)

	  function Sha512() {
	    this.init()
	    this._w = W

	    Hash.call(this, 128, 112)
	  }

	  inherits(Sha512, Hash)

	  Sha512.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._al = 0xf3bcc908|0
	    this._bl = 0x84caa73b|0
	    this._cl = 0xfe94f82b|0
	    this._dl = 0x5f1d36f1|0
	    this._el = 0xade682d1|0
	    this._fl = 0x2b3e6c1f|0
	    this._gl = 0xfb41bd6b|0
	    this._hl = 0x137e2179|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, Xl, n) {
	    return (X >>> n) | (Xl << (32 - n))
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  Sha512.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var al, bl, cl, dl, el, fl, gl, hl

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    al = this._al | 0
	    bl = this._bl | 0
	    cl = this._cl | 0
	    dl = this._dl | 0
	    el = this._el | 0
	    fl = this._fl | 0
	    gl = this._gl | 0
	    hl = this._hl | 0

	    for (var i = 0; i < 80; i++) {
	      var j = i * 2

	      var Wi, Wil

	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4)
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4)

	      } else {
	        var x  = W[j - 15*2]
	        var xl = W[j - 15*2 + 1]
	        var gamma0  = S(x, xl, 1) ^ S(x, xl, 8) ^ (x >>> 7)
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7)

	        x  = W[j - 2*2]
	        xl = W[j - 2*2 + 1]
	        var gamma1  = S(x, xl, 19) ^ S(xl, x, 29) ^ (x >>> 6)
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6)

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[j - 7*2]
	        var Wi7l = W[j - 7*2 + 1]

	        var Wi16  = W[j - 16*2]
	        var Wi16l = W[j - 16*2 + 1]

	        Wil = gamma0l + Wi7l
	        Wi  = gamma0  + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
	        Wil = Wil + gamma1l
	        Wi  = Wi  + gamma1  + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
	        Wil = Wil + Wi16l
	        Wi  = Wi  + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)

	        W[j] = Wi
	        W[j + 1] = Wil
	      }

	      var maj = Maj(a, b, c)
	      var majl = Maj(al, bl, cl)

	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7)
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7)
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9)
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9)

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j]
	      var Kil = K[j + 1]

	      var ch = Ch(e, f, g)
	      var chl = Ch(el, fl, gl)

	      var t1l = hl + sigma1l
	      var t1 = h + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0)
	      t1l = t1l + chl
	      t1 = t1 + ch + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0)
	      t1l = t1l + Kil
	      t1 = t1 + Ki + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0)
	      t1l = t1l + Wil
	      t1 = t1 + Wi + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0)

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl
	      var t2 = sigma0h + maj + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0)

	      h  = g
	      hl = gl
	      g  = f
	      gl = fl
	      f  = e
	      fl = el
	      el = (dl + t1l) | 0
	      e  = (d + t1 + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	      d  = c
	      dl = cl
	      c  = b
	      cl = bl
	      b  = a
	      bl = al
	      al = (t1l + t2l) | 0
	      a  = (t1 + t2 + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0
	    }

	    this._al = (this._al + al) | 0
	    this._bl = (this._bl + bl) | 0
	    this._cl = (this._cl + cl) | 0
	    this._dl = (this._dl + dl) | 0
	    this._el = (this._el + el) | 0
	    this._fl = (this._fl + fl) | 0
	    this._gl = (this._gl + gl) | 0
	    this._hl = (this._hl + hl) | 0

	    this._a = (this._a + a + ((this._al >>> 0) < (al >>> 0) ? 1 : 0)) | 0
	    this._b = (this._b + b + ((this._bl >>> 0) < (bl >>> 0) ? 1 : 0)) | 0
	    this._c = (this._c + c + ((this._cl >>> 0) < (cl >>> 0) ? 1 : 0)) | 0
	    this._d = (this._d + d + ((this._dl >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	    this._e = (this._e + e + ((this._el >>> 0) < (el >>> 0) ? 1 : 0)) | 0
	    this._f = (this._f + f + ((this._fl >>> 0) < (fl >>> 0) ? 1 : 0)) | 0
	    this._g = (this._g + g + ((this._gl >>> 0) < (gl >>> 0) ? 1 : 0)) | 0
	    this._h = (this._h + h + ((this._hl >>> 0) < (hl >>> 0) ? 1 : 0)) | 0
	  }

	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64)

	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset)
	      H.writeInt32BE(l, offset + 4)
	    }

	    writeInt64BE(this._a, this._al, 0)
	    writeInt64BE(this._b, this._bl, 8)
	    writeInt64BE(this._c, this._cl, 16)
	    writeInt64BE(this._d, this._dl, 24)
	    writeInt64BE(this._e, this._el, 32)
	    writeInt64BE(this._f, this._fl, 40)
	    writeInt64BE(this._g, this._gl, 48)
	    writeInt64BE(this._h, this._hl, 56)

	    return H
	  }

	  return Sha512

	}


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	var helpers = __webpack_require__(62);

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;

	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;

	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;

	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);

	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}

	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
	var chrsz = 8;

	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }

	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}

	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}

	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}

	module.exports = { hash: hash };

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45).Buffer))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160



	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	// Constants table
	var zl = [
	    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
	var zr = [
	    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
	var sl = [
	     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
	var sr = [
	    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];

	var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];

	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words;
	};

	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes;
	};

	var processBlock = function (H, M, offset) {

	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];

	    // Swap
	    M[offset_i] = (
	        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	    );
	  }

	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;

	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = (al +  M[offset+zl[i]])|0;
	    if (i<16){
	        t +=  f1(bl,cl,dl) + hl[0];
	    } else if (i<32) {
	        t +=  f2(bl,cl,dl) + hl[1];
	    } else if (i<48) {
	        t +=  f3(bl,cl,dl) + hl[2];
	    } else if (i<64) {
	        t +=  f4(bl,cl,dl) + hl[3];
	    } else {// if (i<80) {
	        t +=  f5(bl,cl,dl) + hl[4];
	    }
	    t = t|0;
	    t =  rotl(t,sl[i]);
	    t = (t+el)|0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;

	    t = (ar + M[offset+zr[i]])|0;
	    if (i<16){
	        t +=  f5(br,cr,dr) + hr[0];
	    } else if (i<32) {
	        t +=  f4(br,cr,dr) + hr[1];
	    } else if (i<48) {
	        t +=  f3(br,cr,dr) + hr[2];
	    } else if (i<64) {
	        t +=  f2(br,cr,dr) + hr[3];
	    } else {// if (i<80) {
	        t +=  f1(br,cr,dr) + hr[4];
	    }
	    t = t|0;
	    t =  rotl(t,sr[i]) ;
	    t = (t+er)|0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t    = (H[1] + cl + dr)|0;
	  H[1] = (H[2] + dl + er)|0;
	  H[2] = (H[3] + el + ar)|0;
	  H[3] = (H[4] + al + br)|0;
	  H[4] = (H[0] + bl + cr)|0;
	  H[0] =  t;
	};

	function f1(x, y, z) {
	  return ((x) ^ (y) ^ (z));
	}

	function f2(x, y, z) {
	  return (((x)&(y)) | ((~x)&(z)));
	}

	function f3(x, y, z) {
	  return (((x) | (~(y))) ^ (z));
	}

	function f4(x, y, z) {
	  return (((x) & (z)) | ((y)&(~(z))));
	}

	function f5(x, y, z) {
	  return ((x) ^ ((y) |(~(z))));
	}

	function rotl(x,n) {
	  return (x<<n) | (x>>>(32-n));
	}

	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];

	  if (typeof message == 'string')
	    message = new Buffer(message, 'utf8');

	  var m = bytesToWords(message);

	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;

	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	  );

	  for (var i=0 ; i<m.length; i += 16) {
	    processBlock(H, m, i);
	  }

	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	      // Shortcut
	    var H_i = H[i];

	    // Swap
	    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	  }

	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45).Buffer))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(51)

	var zeroBuffer = new Buffer(128)
	zeroBuffer.fill(0)

	module.exports = Hmac

	function Hmac (alg, key) {
	  if(!(this instanceof Hmac)) return new Hmac(alg, key)
	  this._opad = opad
	  this._alg = alg

	  var blocksize = (alg === 'sha512') ? 128 : 64

	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key

	  if(key.length > blocksize) {
	    key = createHash(alg).update(key).digest()
	  } else if(key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize)
	  }

	  var ipad = this._ipad = new Buffer(blocksize)
	  var opad = this._opad = new Buffer(blocksize)

	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36
	    opad[i] = key[i] ^ 0x5C
	  }

	  this._hash = createHash(alg).update(ipad)
	}

	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc)
	  return this
	}

	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest()
	  return createHash(this._alg).update(this._opad).update(h).digest(enc)
	}


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45).Buffer))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(66)

	module.exports = function (crypto, exports) {
	  exports = exports || {}

	  var exported = pbkdf2Export(crypto)

	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync

	  return exports
	}


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function(crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest
	      digest = undefined
	    }

	    if ('function' !== typeof callback)
	      throw new Error('No callback provided to pbkdf2')

	    setTimeout(function() {
	      var result

	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest)
	      } catch (e) {
	        return callback(e)
	      }

	      callback(undefined, result)
	    })
	  }

	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations)
	      throw new TypeError('Iterations not a number')

	    if (iterations < 0)
	      throw new TypeError('Bad iterations')

	    if ('number' !== typeof keylen)
	      throw new TypeError('Key length not a number')

	    if (keylen < 0)
	      throw new TypeError('Bad key length')

	    digest = digest || 'sha1'

	    if (!Buffer.isBuffer(password)) password = new Buffer(password)
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt)

	    var hLen, l = 1, r, T
	    var DK = new Buffer(keylen)
	    var block1 = new Buffer(salt.length + 4)
	    salt.copy(block1, 0, 0, salt.length)

	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length)

	      var U = crypto.createHmac(digest, password).update(block1).digest()

	      if (!hLen) {
	        hLen = U.length
	        T = new Buffer(hLen)
	        l = Math.ceil(keylen / hLen)
	        r = keylen - (l - 1) * hLen

	        if (keylen > (Math.pow(2, 32) - 1) * hLen)
	          throw new TypeError('keylen exceeds maximum length')
	      }

	      U.copy(T, 0, 0, hLen)

	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest()

	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k]
	        }
	      }

	      var destPos = (i - 1) * hLen
	      var len = (i == l ? r : hLen)
	      T.copy(DK, destPos, 0, len)
	    }

	    return DK
	  }

	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45).Buffer))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(68);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var TUPLE_HOLDER = [];

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	function computeRange(values) {
	  var component = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var tuple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

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

	function ensureRangeSize(rangeArray) {
	  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	  var ranges = rangeArray || [];
	  // Pad ranges with null value to get the
	  while (ranges.length <= size) {
	    ranges.push(null);
	  }
	  return ranges;
	}

	function getDataType(typedArray) {
	  return Object.prototype.toString.call(typedArray).split(' ')[1].slice(0, -1);
	}

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	var STATIC = exports.STATIC = {
	  computeRange: computeRange,
	  getDataType: getDataType
	};

	// ----------------------------------------------------------------------------
	// vtkDataArray methods
	// ----------------------------------------------------------------------------

	function vtkDataArray(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkDataArray');

	  function dataChange() {
	    model.ranges = null;
	    publicAPI.modified();
	  }

	  publicAPI.getElementComponentSize = function () {
	    return model.values.BYTES_PER_ELEMENT;
	  };

	  // Description:
	  // Return the data component at the location specified by tupleIdx and
	  // compIdx.
	  publicAPI.getComponent = function (tupleIdx) {
	    var compIdx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    return model.values[tupleIdx * model.numberOfComponents + compIdx];
	  };

	  // Description:
	  // Set the data component at the location specified by tupleIdx and compIdx
	  // to value.
	  // Note that i is less than NumberOfTuples and j is less than
	  //  NumberOfComponents. Make sure enough memory has been allocated
	  // (use SetNumberOfTuples() and SetNumberOfComponents()).
	  publicAPI.setComponent = function (tupleIdx, compIdx, value) {
	    if (value !== model.values[tupleIdx * model.numberOfComponents + compIdx]) {
	      model.values[tupleIdx * model.numberOfComponents + compIdx] = value;
	      dataChange();
	    }
	  };

	  publicAPI.getData = function () {
	    return model.values;
	  };

	  publicAPI.getRange = function () {
	    var componentIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    var rangeIdx = componentIndex < 0 ? model.numberOfComponents : componentIndex;
	    var range = null;

	    if (!model.ranges) {
	      model.ranges = ensureRangeSize(model.ranges, model.numberOfComponents);
	    }
	    range = model.ranges[rangeIdx];

	    if (range) {
	      return [range.min, range.max];
	    }

	    // Need to compute ranges...
	    range = model.ranges[rangeIdx] = computeRange(model.values, componentIndex, model.numberOfComponents);
	    return [range.min, range.max];
	  };

	  publicAPI.setTuple = function (idx, tuple) {
	    var offset = idx * model.numberOfComponents;
	    for (var i = 0; i < model.numberOfComponents; i++) {
	      model.values[offset + i] = tuple[i];
	    }
	  };

	  publicAPI.getTuple = function (idx) {
	    var tupleToFill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TUPLE_HOLDER;

	    var numberOfComponents = model.numberOfComponents || 1;
	    if (tupleToFill.length) {
	      tupleToFill.length = numberOfComponents;
	    }
	    var offset = idx * numberOfComponents;
	    for (var i = 0; i < numberOfComponents; i++) {
	      tupleToFill[i] = model.values[offset + i];
	    }
	    return tupleToFill;
	  };

	  publicAPI.getTupleLocation = function () {
	    var idx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	    return idx * model.numberOfComponents;
	  };
	  publicAPI.getNumberOfComponents = function () {
	    return model.numberOfComponents;
	  };
	  publicAPI.getNumberOfValues = function () {
	    return model.values.length;
	  };
	  publicAPI.getNumberOfTuples = function () {
	    return model.values.length / model.numberOfComponents;
	  };
	  publicAPI.getDataType = function () {
	    return model.dataType;
	  };
	  /* eslint-disable no-use-before-define */
	  publicAPI.newClone = function () {
	    return newInstance({
	      empty: true,
	      name: model.name,
	      dataType: model.dataType,
	      numberOfComponents: model.numberOfComponents
	    });
	  };
	  /* eslint-enable no-use-before-define */

	  publicAPI.getName = function () {
	    if (!model.name) {
	      publicAPI.modified();
	      model.name = 'vtkDataArray' + publicAPI.getMTime();
	    }
	    return model.name;
	  };

	  publicAPI.setData = function (typedArray, numberOfComponents) {
	    model.values = typedArray;
	    model.size = typedArray.length;
	    model.dataType = getDataType(typedArray);
	    if (numberOfComponents) {
	      model.numberOfComponents = numberOfComponents;
	    }
	    if (model.size % model.numberOfComponents !== 0) {
	      model.numberOfComponents = 1;
	    }
	    dataChange();
	  };

	  /* eslint-disable no-use-before-define */
	  publicAPI.shallowCopy = function () {
	    return newInstance(Object.assign({}, model));
	  };
	  /* eslint-enable no-use-before-define */

	  // Override serialization support
	  publicAPI.getState = function () {
	    var jsonArchive = Object.assign({}, model, { vtkClass: publicAPI.getClassName() });

	    // Convert typed array to regular array
	    jsonArchive.values = Array.from(jsonArchive.values);
	    delete jsonArchive.buffer;

	    // Clean any empty data
	    Object.keys(jsonArchive).forEach(function (keyName) {
	      if (!jsonArchive[keyName]) {
	        delete jsonArchive[keyName];
	      }
	    });

	    // Sort resulting object by key name
	    var sortedObj = {};
	    Object.keys(jsonArchive).sort().forEach(function (name) {
	      sortedObj[name] = jsonArchive[name];
	    });

	    // Remove mtime
	    if (sortedObj.mtime) {
	      delete sortedObj.mtime;
	    }

	    return sortedObj;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  name: '',
	  numberOfComponents: 1,
	  size: 0,
	  dataType: _Constants.DefaultDataType
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  if (!model.empty && !model.values && !model.size) {
	    throw new TypeError('Can not create vtkDataArray object without: size > 0, values');
	  }

	  if (!model.values) {
	    model.values = new window[model.dataType](model.size);
	  } else if (Array.isArray(model.values)) {
	    model.values = window[model.dataType].from(model.values);
	  }

	  if (model.values) {
	    model.size = model.values.length;
	    model.dataType = getDataType(model.values);
	  }

	  // Object methods
	  macro.obj(publicAPI, model);
	  macro.set(publicAPI, model, ['name']);

	  // Object specific methods
	  vtkDataArray(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkDataArray');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DataTypeByteSize = exports.DataTypeByteSize = {
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

	var VtkDataTypes = exports.VtkDataTypes = {
	  VOID: '', // FIXME not sure to know what that shoud be
	  CHAR: 'Int8Array',
	  SIGNED_CHAR: 'Int8Array',
	  UNSIGNED_CHAR: 'Uint8Array',
	  SHORT: 'Int16Array',
	  UNSIGNED_SHORT: 'Uint16Array',
	  INT: 'Int32Array',
	  UNSIGNED_INT: 'Uint32Array',
	  FLOAT: 'Float32Array',
	  DOUBLE: 'Float64Array'
	};

	var DefaultDataType = exports.DefaultDataType = VtkDataTypes.FLOAT;

	exports.default = {
	  DefaultDataType: DefaultDataType,
	  DataTypeByteSize: DataTypeByteSize,
	  VtkDataTypes: VtkDataTypes
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(70);

	var _Constants2 = __webpack_require__(68);

	var _ViewNode = __webpack_require__(19);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLTexture methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLTexture(publicAPI, model) {
	  var _this = this;

	  // Set our className
	  model.classHierarchy.push('vtkOpenGLTexture');

	  // Builds myself.
	  publicAPI.build = function (prepass) {
	    if (prepass) {
	      if (!model.renderable) {
	        return;
	      }
	    }
	  };

	  // Renders myself
	  publicAPI.render = function (prepass) {
	    if (prepass) {
	      var oglren = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderer');
	      publicAPI.preRender(oglren);
	    }
	  };

	  publicAPI.preRender = function (oglren) {
	    // sync renderable properties
	    model.window = oglren.getParent();
	    model.context = model.window.getContext();
	    if (model.renderable.getInterpolate()) {
	      if (model.generateMipmap) {
	        publicAPI.setMinificationFilter(_Constants.Filter.LINEAR_MIPMAP_LINEAR);
	      } else {
	        publicAPI.setMinificationFilter(_Constants.Filter.LINEAR);
	      }
	      publicAPI.setMagnificationFilter(_Constants.Filter.LINEAR);
	    } else {
	      publicAPI.setMinificationFilter(_Constants.Filter.NEAREST);
	      publicAPI.setMagnificationFilter(_Constants.Filter.NEAREST);
	    }
	    // create the texture if it is not done already
	    if (!model.handle) {
	      var input = model.renderable.getInputData();
	      var ext = input.getExtent();
	      var inScalars = input.getPointData().getScalars();
	      if (model.renderable.getInterpolate()) {
	        model.generateMipmap = true;
	        publicAPI.setMinificationFilter(_Constants.Filter.LINEAR_MIPMAP_LINEAR);
	      }
	      publicAPI.create2DFromRaw(ext[1] - ext[0] + 1, ext[3] - ext[2] + 1, inScalars.getNumberOfComponents(), inScalars.getDataType(), inScalars.getData());
	      publicAPI.activate();
	      publicAPI.sendParameters();
	    } else {
	      publicAPI.activate();
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.destroyTexture = function () {
	    // deactivate it first
	    publicAPI.deactivate();

	    if (model.context && model.handle) {
	      model.context.deleteTexture(model.handle);
	    }
	    model.handle = 0;
	    model.numberOfDimensions = 0;
	    model.target = 0;
	    model.components = 0;
	    model.width = 0;
	    model.height = 0;
	    model.depth = 0;
	    publicAPI.resetFormatAndType();
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.createTexture = function () {
	    // reuse the existing handle if we have one
	    if (!model.handle) {
	      model.handle = model.context.createTexture();

	      if (model.target) {
	        model.context.bindTexture(model.target, model.handle);

	        // See: http://www.openmodel.context..org/wiki/Common_Mistakes#Creating_a_complete_texture
	        // turn off mip map filter or set the base and max level correctly. here
	        // both are done.
	        model.context.texParameteri(model.target, model.context.TEXTURE_MIN_FILTER, publicAPI.getOpenGLFilterMode(model.minificationFilter));
	        model.context.texParameteri(model.target, model.context.TEXTURE_MAG_FILTER, publicAPI.getOpenGLFilterMode(model.magnificationFilter));

	        model.context.texParameteri(model.target, model.context.TEXTURE_WRAP_S, publicAPI.getOpenGLWrapMode(model.wrapS));
	        model.context.texParameteri(model.target, model.context.TEXTURE_WRAP_T, publicAPI.getOpenGLWrapMode(model.wrapT));

	        model.context.bindTexture(model.target, null);
	      }
	    }
	  };

	  //---------------------------------------------------------------------------
	  publicAPI.getTextureUnit = function () {
	    if (model.window) {
	      return model.window.getTextureUnitForTexture(publicAPI);
	    }
	    return -1;
	  };

	  //---------------------------------------------------------------------------
	  publicAPI.activate = function () {
	    // activate a free texture unit for this texture
	    model.window.activateTexture(publicAPI);
	    publicAPI.bind();
	  };

	  //---------------------------------------------------------------------------
	  publicAPI.deactivate = function () {
	    if (model.window) {
	      model.window.activateTexture(publicAPI);
	      publicAPI.unBind();
	      model.window.deactivateTexture(publicAPI);
	    }
	  };

	  //---------------------------------------------------------------------------
	  publicAPI.releaseGraphicsResources = function (rwin) {
	    if (rwin && model.handle) {
	      rwin.makeCurrent();

	      rwin.activateTexture(publicAPI);
	      publicAPI.unBind();
	      rwin.deactivateTexture(publicAPI);
	      model.context.deleteTexture(model.handle);
	      model.handle = 0;
	      model.numberOfDimensions = 0;
	      model.target = 0;
	      model.internalFormat = 0;
	      model.format = 0;
	      model.openGLDataType = 0;
	      model.components = 0;
	      model.width = 0;
	      model.height = 0;
	      model.depth = 0;
	    }
	    if (model.shaderProgram) {
	      model.shaderProgram.releaseGraphicsResources(rwin);
	      model.shaderProgram = null;
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.bind = function () {
	    model.context.bindTexture(model.target, model.handle);
	    if (model.autoParameters && publicAPI.getMTime() > model.sendParametersTime.getMTime()) {
	      publicAPI.sendParameters();
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.unBind = function () {
	    if (model.target) {
	      model.context.bindTexture(model.target, null);
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.isBound = function () {
	    var result = false;
	    if (model.context && model.handle) {
	      var target = 0;
	      switch (model.target) {
	        case model.context.TEXTURE_2D:
	          target = model.context.TEXTURE_BINDING_2D;
	          break;
	        default:
	          console.warn('impossible case');
	          break;
	      }
	      var oid = model.context.getIntegerv(target);
	      result = oid === model.handle;
	    }
	    return result;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.sendParameters = function () {
	    model.context.texParameteri(model.target, model.context.TEXTURE_WRAP_S, publicAPI.getOpenGLWrapMode(model.wrapS));
	    model.context.texParameteri(model.target, model.context.TEXTURE_WRAP_T, publicAPI.getOpenGLWrapMode(model.wrapT));

	    model.context.texParameteri(model.target, model.context.TEXTURE_MIN_FILTER, publicAPI.getOpenGLFilterMode(model.minificationFilter));

	    model.context.texParameteri(model.target, model.context.TEXTURE_MAG_FILTER, publicAPI.getOpenGLFilterMode(model.magnificationFilter));

	    // model.context.texParameterf(model.target, model.context.TEXTURE_MIN_LOD, model.minLOD);
	    // model.context.texParameterf(model.target, model.context.TEXTURE_MAX_LOD, model.maxLOD);
	    // model.context.texParameteri(model.target, model.context.TEXTURE_BASE_LEVEL, model.baseLevel);
	    // model.context.texParameteri(model.target, model.context.TEXTURE_MAX_LEVEL, model.maxLevel);

	    model.sendParametersTime.modified();
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getInternalFormat = function (vtktype, numComps) {
	    if (model.internalFormat) {
	      return model.internalFormat;
	    }

	    model.internalFormat = publicAPI.getDefaultInternalFormat(vtktype, numComps);

	    if (!model.internalFormat) {
	      console.debug('Unable to find suitable internal format for T=' + vtktype + ' NC= ' + numComps);
	    }

	    return model.internalFormat;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getDefaultInternalFormat = function (vtktype, numComps) {
	    var result = 0;

	    // try default next
	    result = model.window.getDefaultTextureInternalFormat(vtktype, numComps, false);
	    if (result) {
	      return result;
	    }

	    // try floating point
	    result = _this.window.getDefaultTextureInternalFormat(vtktype, numComps, true);

	    if (!result) {
	      console.debug('Unsupported internal texture type!');
	      console.debug('Unable to find suitable internal format for T=' + vtktype + ' NC= ' + numComps);
	    }

	    return result;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.setInternalFormat = function (iFormat) {
	    if (iFormat !== model.context.InternalFormat) {
	      model.internalFormat = iFormat;
	      publicAPI.modified();
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getFormat = function (vtktype, numComps) {
	    if (!model.format) {
	      model.format = publicAPI.getDefaultFormat(vtktype, numComps);
	    }
	    return model.format;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getDefaultFormat = function (vtktype, numComps) {
	    switch (numComps) {
	      case 1:
	        return model.context.LUMINANCE;
	      case 2:
	        return model.context.LUMINANCE_ALPHA;
	      case 3:
	        return model.context.RGB;
	      case 4:
	        return model.context.RGBA;
	      default:
	        return model.context.RGB;
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.resetFormatAndType = function () {
	    model.format = 0;
	    model.internalFormat = 0;
	    model.openGLDataType = 0;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getDefaultDataType = function (vtkScalarType) {
	    // DON'T DEAL with VTK_CHAR as this is platform dependent.
	    switch (vtkScalarType) {
	      // case VtkDataTypes.SIGNED_CHAR:
	      //   return model.context.BYTE;
	      case _Constants2.VtkDataTypes.UNSIGNED_CHAR:
	        return model.context.UNSIGNED_BYTE;
	      // case VtkDataTypes.SHORT:
	      //   return model.context.SHORT;
	      // case VtkDataTypes.UNSIGNED_SHORT:
	      //   return model.context.UNSIGNED_SHORT;
	      // case VtkDataTypes.INT:
	      //   return model.context.INT;
	      // case VtkDataTypes.UNSIGNED_INT:
	      //   return model.context.UNSIGNED_INT;
	      case _Constants2.VtkDataTypes.FLOAT:
	      case _Constants2.VtkDataTypes.VOID: // used for depth component textures.
	      default:
	        if (model.context.getExtension('OES_texture_float')) {
	          return model.context.FLOAT;
	        }
	        return model.context.UNSIGNED_BYTE;
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getOpenGLDataType = function (vtkScalarType) {
	    if (!model.openGLDataType) {
	      model.openGLDataType = publicAPI.getDefaultDataType(vtkScalarType);
	    }

	    return model.openGLDataType;
	  };

	  publicAPI.getShiftAndScale = function () {
	    var shift = 0.0;
	    var scale = 1.0;

	    // for all float type internal formats
	    switch (model.openGLDataType) {
	      case model.context.BYTE:
	        scale = 127.5;
	        shift = scale - 128.0;
	        break;
	      case model.context.UNSIGNED_BYTE:
	        scale = 255.0;
	        shift = 0.0;
	        break;
	      case model.context.SHORT:
	        scale = 32767.5;
	        shift = scale - 32768.0;
	        break;
	      case model.context.UNSIGNED_SHORT:
	        scale = 65536.0;
	        shift = 0.0;
	        break;
	      case model.context.INT:
	        scale = 2147483647.5;
	        shift = scale - 2147483648.0;
	        break;
	      case model.context.UNSIGNED_INT:
	        scale = 4294967295.0;
	        shift = 0.0;
	        break;
	      case model.context.FLOAT:
	      default:
	        break;
	    }
	    return { shift: shift, scale: scale };
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getOpenGLFilterMode = function (emode) {
	    switch (emode) {
	      case _Constants.Filter.NEAREST:
	        return model.context.NEAREST;
	      case _Constants.Filter.LINEAR:
	        return model.context.LINEAR;
	      case _Constants.Filter.NEAREST_MIPMAP_NEAREST:
	        return model.context.NEAREST_MIPMAP_NEAREST;
	      case _Constants.Filter.NEAREST_MIPMAP_LINEAR:
	        return model.context.NEAREST_MIPMAP_LINEAR;
	      case _Constants.Filter.LINEAR_MIPMAP_NEAREST:
	        return model.context.LINEAR_MIPMAP_NEAREST;
	      case _Constants.Filter.LINEAR_MIPMAP_LINEAR:
	        return model.context.LINEAR_MIPMAP_LINEAR;
	      default:
	        return model.context.NEAREST;
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getOpenGLWrapMode = function (vtktype) {
	    switch (vtktype) {
	      case _Constants.Wrap.CLAMP_TO_EDGE:
	        return model.context.CLAMP_TO_EDGE;
	      case _Constants.Wrap.REPEAT:
	        return model.context.REPEAT;
	      case _Constants.Wrap.MIRRORED_REPEAT:
	        return model.context.MIRRORED_REPEAT;
	      default:
	        return model.context.CLAMP_TO_EDGE;
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.create2DFromRaw = function (width, height, numComps, dataType, data) {
	    // Now determine the texture parameters using the arguments.
	    publicAPI.getOpenGLDataType(dataType);
	    publicAPI.getInternalFormat(dataType, numComps);
	    publicAPI.getFormat(dataType, numComps);

	    if (!model.internalFormat || !model.format || !model.openGLDataType) {
	      console.error('Failed to determine texture parameters.');
	      return false;
	    }

	    model.target = model.context.TEXTURE_2D;
	    model.components = numComps;
	    model.width = width;
	    model.height = height;
	    model.depth = 1;
	    model.numberOfDimensions = 2;
	    model.window.activateTexture(publicAPI);
	    publicAPI.createTexture();
	    publicAPI.bind();

	    var pixData = data;

	    // if the opengl data type is float
	    // then the data array must be float
	    if (dataType !== _Constants2.VtkDataTypes.FLOAT && model.openGLDataType === model.context.FLOAT) {
	      var pixCount = model.width * model.height * model.components;
	      var newArray = new Float32Array(pixCount);
	      for (var i = 0; i < pixCount; i++) {
	        newArray[i] = data[i];
	      }
	      pixData = newArray;
	    }
	    // if the opengl data type is ubyte
	    // then the data array must be u8, we currently simply truncate the data
	    if (dataType !== _Constants2.VtkDataTypes.UNSIGNED_CHAR && model.openGLDataType === model.context.UNSIGNED_BYTE) {
	      var _pixCount = model.width * model.height * model.components;
	      var _newArray = new Uint8Array(_pixCount);
	      for (var _i = 0; _i < _pixCount; _i++) {
	        _newArray[_i] = data[_i];
	      }
	      pixData = _newArray;
	    }

	    // Source texture data from the PBO.
	    // model.context.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	    model.context.pixelStorei(model.context.UNPACK_ALIGNMENT, 1);

	    model.context.texImage2D(model.target, 0, model.internalFormat, model.width, model.height, 0, model.format, model.openGLDataType, pixData);

	    if (model.generateMipmap) {
	      model.context.generateMipmap(model.target);
	    }

	    publicAPI.deactivate();
	    return true;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getMaximumTextureSize = function (ctx) {
	    if (ctx && ctx.isCurrent()) {
	      return ctx.getIntegerv(ctx.MAX_TEXTURE_SIZE);
	    }

	    return -1;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  window: null,
	  context: null,
	  handle: 0,
	  sendParametersTime: null,
	  numberOfDimensions: 0,
	  target: 0,
	  format: 0,
	  openGLDataType: 0,
	  components: 0,
	  width: 0,
	  height: 0,
	  depth: 0,
	  autoParameters: true,
	  wrapS: _Constants.Wrap.CLAMP_TO_EDGE,
	  wrapT: _Constants.Wrap.CLAMP_TO_EDGE,
	  wrapR: _Constants.Wrap.CLAMP_TO_EDGE,
	  minificationFilter: _Constants.Filter.NEAREST,
	  magnificationFilter: _Constants.Filter.NEAREST,
	  minLOD: -1000.0,
	  maxLOD: 1000.0,
	  baseLevel: 0,
	  maxLevel: 0,
	  generateMipmap: false
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ViewNode2.default.extend(publicAPI, model);

	  model.sendParametersTime = {};
	  macro.obj(model.sendParametersTime);

	  // Build VTK API
	  macro.set(publicAPI, model, ['format', 'openGLDataType']);

	  macro.setGet(publicAPI, model, ['window', 'context', 'keyMatrixTime', 'minificationFilter', 'magnificationFilter', 'wrapS', 'wrapT', 'wrapR']);

	  macro.get(publicAPI, model, ['components']);

	  // Object methods
	  vtkOpenGLTexture(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 70 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Wrap = exports.Wrap = {
	  CLAMP_TO_EDGE: 0,
	  REPEAT: 1,
	  MIRRORED_REPEAT: 2
	};

	var Filter = exports.Filter = {
	  NEAREST: 0,
	  LINEAR: 1,
	  NEAREST_MIPMAP_NEAREST: 2,
	  NEAREST_MIPMAP_LINEAR: 3,
	  LINEAR_MIPMAP_NEAREST: 4,
	  LINEAR_MIPMAP_LINEAR: 5
	};

	exports.default = {
	  Wrap: Wrap,
	  Filter: Filter
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkTexture methods
	// ----------------------------------------------------------------------------

	function vtkTexture(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkTexture');
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  repeat: false,
	  interpolate: false,
	  edgeClamp: false
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.algo(publicAPI, model, 1, 0);

	  macro.setGet(publicAPI, model, ['repeat', 'edgeClamp', 'interpolate']);

	  vtkTexture(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkTexture');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = "//VTK::System::Dec\n\n/*=========================================================================\n\n  Program:   Visualization Toolkit\n  Module:    vtkPolyDataVS.glsl\n\n  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen\n  All rights reserved.\n  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.\n\n     This software is distributed WITHOUT ANY WARRANTY; without even\n     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR\n     PURPOSE.  See the above copyright notice for more information.\n\n=========================================================================*/\n\nattribute vec4 vertexMC;\n\n// frag position in VC\n//VTK::PositionVC::Dec\n\n// optional normal declaration\n//VTK::Normal::Dec\n\n// extra lighting parameters\n//VTK::Light::Dec\n\n// Texture coordinates\n//VTK::TCoord::Dec\n\n// material property values\n//VTK::Color::Dec\n\n// clipping plane vars\n//VTK::Clip::Dec\n\n// camera and actor matrix values\n//VTK::Camera::Dec\n\n// Apple Bug\n//VTK::PrimID::Dec\n\nvoid main()\n{\n  //VTK::Color::Impl\n\n  //VTK::Normal::Impl\n\n  //VTK::TCoord::Impl\n\n  //VTK::Clip::Impl\n\n  //VTK::PrimID::Impl\n\n  //VTK::PositionVC::Impl\n\n  //VTK::Light::Impl\n}\n"

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = "//VTK::System::Dec\n\n/*=========================================================================\n\n  Program:   Visualization Toolkit\n  Module:    vtkPolyDataFS.glsl\n\n  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen\n  All rights reserved.\n  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.\n\n     This software is distributed WITHOUT ANY WARRANTY; without even\n     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR\n     PURPOSE.  See the above copyright notice for more information.\n\n=========================================================================*/\n// Template for the polydata mappers fragment shader\n\nuniform int PrimitiveIDOffset;\n\n// VC position of this fragment\n//VTK::PositionVC::Dec\n\n// optional color passed in from the vertex shader, vertexColor\n//VTK::Color::Dec\n\n// optional surface normal declaration\n//VTK::Normal::Dec\n\n// extra lighting parameters\n//VTK::Light::Dec\n\n// Texture coordinates\n//VTK::TCoord::Dec\n\n// picking support\n//VTK::Picking::Dec\n\n// Depth Peeling Support\n//VTK::DepthPeeling::Dec\n\n// clipping plane vars\n//VTK::Clip::Dec\n\n// the output of this shader\n//VTK::Output::Dec\n\n// Apple Bug\n//VTK::PrimID::Dec\n\n// handle coincident offsets\n//VTK::Coincident::Dec\n\nvoid main()\n{\n  // VC position of this fragment. This should not branch/return/discard.\n  //VTK::PositionVC::Impl\n\n  // Place any calls that require uniform flow (e.g. dFdx) here.\n  //VTK::UniformFlow::Impl\n\n  // Early depth peeling abort:\n  //VTK::DepthPeeling::PreColor\n\n  // Apple Bug\n  //VTK::PrimID::Impl\n\n  //VTK::Clip::Impl\n\n  //VTK::Color::Impl\n\n  // Generate the normal if we are not passed in one\n  //VTK::Normal::Impl\n\n  //VTK::Light::Impl\n\n  //VTK::TCoord::Impl\n\n  if (gl_FragData[0].a <= 0.0)\n    {\n    discard;\n    }\n\n  //VTK::DepthPeeling::Impl\n\n  //VTK::Picking::Impl\n\n  // handle coincident offsets\n  //VTK::Coincident::Impl\n}\n"

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(9);

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNode = __webpack_require__(19);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLActor methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLImageSlice(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLImageSlice');

	  // Builds myself.
	  publicAPI.build = function (prepass) {
	    if (!model.renderable || !model.renderable.getVisibility()) {
	      return;
	    }
	    if (prepass) {
	      if (!model.renderable) {
	        return;
	      }

	      publicAPI.prepareNodes();
	      publicAPI.addMissingNode(model.renderable.getMapper());
	      publicAPI.removeUnusedNodes();
	    }
	  };

	  // Renders myself
	  publicAPI.render = function (prepass) {
	    if (!model.renderable || !model.renderable.getVisibility()) {
	      return;
	    }
	    if (prepass) {
	      model.context = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderWindow').getContext();
	      publicAPI.preRender();
	    } else {
	      var opaque = model.renderable.getIsOpaque() !== 0;
	      if (!opaque) {
	        model.context.depthMask(true);
	      }
	    }
	  };

	  publicAPI.preRender = function () {
	    // get opacity
	    var opaque = model.renderable.getIsOpaque() !== 0;
	    if (opaque) {
	      model.context.depthMask(true);
	    } else {
	      model.context.depthMask(false);
	    }
	  };

	  publicAPI.getKeyMatrices = function () {
	    // has the actor changed?
	    if (model.renderable.getMTime() > model.keyMatrixTime.getMTime()) {
	      model.renderable.computeMatrix();
	      _glMatrix.mat4.copy(model.MCWCMatrix, model.renderable.getMatrix());
	      _glMatrix.mat4.transpose(model.MCWCMatrix, model.MCWCMatrix);

	      if (model.renderable.getIsIdentity()) {
	        _glMatrix.mat3.identity(model.normalMatrix);
	      } else {
	        _glMatrix.mat3.fromMat4(model.normalMatrix, model.MCWCMatrix);
	        _glMatrix.mat3.invert(model.normalMatrix, model.normalMatrix);
	      }
	      model.keyMatrixTime.modified();
	    }

	    return { mcwc: model.MCWCMatrix, normalMatrix: model.normalMatrix };
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  context: null,
	  keyMatrixTime: null,
	  normalMatrix: null,
	  MCWCMatrix: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ViewNode2.default.extend(publicAPI, model);

	  model.keyMatrixTime = {};
	  macro.obj(model.keyMatrixTime);
	  model.normalMatrix = _glMatrix.mat3.create();
	  model.MCWCMatrix = _glMatrix.mat4.create();

	  // Build VTK API
	  macro.setGet(publicAPI, model, ['context']);

	  // Object methods
	  vtkOpenGLImageSlice(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkOpenGLPolyDataMapper = vtkOpenGLPolyDataMapper;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(9);

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Helper = __webpack_require__(23);

	var _Helper2 = _interopRequireDefault(_Helper);

	var _Math = __webpack_require__(32);

	var _Math2 = _interopRequireDefault(_Math);

	var _ShaderProgram = __webpack_require__(29);

	var _ShaderProgram2 = _interopRequireDefault(_ShaderProgram);

	var _Texture = __webpack_require__(69);

	var _Texture2 = _interopRequireDefault(_Texture);

	var _ViewNode = __webpack_require__(19);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	var _Constants = __webpack_require__(28);

	var _Constants2 = __webpack_require__(76);

	var _Constants3 = __webpack_require__(70);

	var _vtkPolyDataVS = __webpack_require__(72);

	var _vtkPolyDataVS2 = _interopRequireDefault(_vtkPolyDataVS);

	var _vtkPolyDataFS = __webpack_require__(73);

	var _vtkPolyDataFS2 = _interopRequireDefault(_vtkPolyDataFS);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/* eslint-disable no-lonely-if */

	var primTypes = {
	  Start: 0,
	  Points: 0,
	  Lines: 1,
	  Tris: 2,
	  TriStrips: 3,
	  TrisEdges: 4,
	  TriStripsEdges: 5,
	  End: 6
	};

	// ----------------------------------------------------------------------------
	// vtkOpenGLPolyDataMapper methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLPolyDataMapper(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLPolyDataMapper');

	  // Builds myself.
	  publicAPI.build = function (prepass) {
	    if (prepass) {
	      if (!model.renderable) {
	        return;
	      }
	    }
	  };

	  // Renders myself
	  publicAPI.render = function (prepass) {
	    if (prepass) {
	      model.openGLRenderWindow = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderWindow');
	      model.context = model.openGLRenderWindow.getContext();
	      for (var i = primTypes.Start; i < primTypes.End; i++) {
	        model.primitives[i].setContext(model.context);
	      }
	      model.openGLActor = publicAPI.getFirstAncestorOfType('vtkOpenGLActor');
	      var actor = model.openGLActor.getRenderable();
	      var openGLRenderer = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderer');
	      var ren = openGLRenderer.getRenderable();
	      model.openGLCamera = openGLRenderer.getViewNodeFor(ren.getActiveCamera());
	      publicAPI.renderPiece(ren, actor);
	    } else {
	      // something
	    }
	  };

	  publicAPI.buildShaders = function (shaders, ren, actor) {
	    publicAPI.getShaderTemplate(shaders, ren, actor);
	    publicAPI.replaceShaderValues(shaders, ren, actor);
	  };

	  publicAPI.getShaderTemplate = function (shaders, ren, actor) {
	    shaders.Vertex = _vtkPolyDataVS2.default;
	    shaders.Fragment = _vtkPolyDataFS2.default;
	    shaders.Geometry = '';
	  };

	  publicAPI.replaceShaderColor = function (shaders, ren, actor) {
	    var VSSource = shaders.Vertex;
	    var GSSource = shaders.Geometry;
	    var FSSource = shaders.Fragment;

	    var lastLightComplexity = model.lastLightComplexity.get(model.lastBoundBO.getPrimitiveType());

	    // create the material/color property declarations, and VS implementation
	    // these are always defined
	    var colorDec = ['uniform float opacityUniform; // the fragment opacity', 'uniform vec3 ambientColorUniform; // intensity weighted color', 'uniform vec3 diffuseColorUniform; // intensity weighted color'];
	    // add more for specular
	    if (lastLightComplexity) {
	      colorDec = colorDec.concat(['uniform vec3 specularColorUniform; // intensity weighted color', 'uniform float specularPowerUniform;']);
	    }

	    // now handle the more complex fragment shader implementation
	    // the following are always defined variables.  We start
	    // by assiging a default value from the uniform
	    var colorImpl = ['vec3 ambientColor;', '  vec3 diffuseColor;', '  float opacity;'];
	    if (lastLightComplexity) {
	      colorImpl = colorImpl.concat(['  vec3 specularColor;', '  float specularPower;']);
	    }
	    colorImpl = colorImpl.concat(['  ambientColor = ambientColorUniform;', '  diffuseColor = diffuseColorUniform;', '  opacity = opacityUniform;']);
	    if (lastLightComplexity) {
	      colorImpl = colorImpl.concat(['  specularColor = specularColorUniform;', '  specularPower = specularPowerUniform;']);
	    }

	    // add scalar vertex coloring
	    if (model.lastBoundBO.getCABO().getColorComponents() !== 0 && !model.drawingEdges) {
	      colorDec = colorDec.concat(['varying vec4 vertexColorVSOutput;']);
	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::Color::Dec', ['attribute vec4 scalarColor;', 'varying vec4 vertexColorVSOutput;']).result;
	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::Color::Impl', ['vertexColorVSOutput =  scalarColor;']).result;
	      GSSource = _ShaderProgram2.default.substitute(GSSource, '//VTK::Color::Dec', ['in vec4 vertexColorVSOutput[];', 'out vec4 vertexColorGSOutput;']).result;
	      GSSource = _ShaderProgram2.default.substitute(GSSource, '//VTK::Color::Impl', ['vertexColorGSOutput = vertexColorVSOutput[i];']).result;
	    }

	    var scalarMatMode = model.renderable.getScalarMaterialMode();

	    if (model.lastBoundBO.getCABO().getColorComponents() !== 0 && !model.drawingEdges) {
	      if (scalarMatMode === _Constants2.MaterialMode.AMBIENT || scalarMatMode === _Constants2.MaterialMode.DEFAULT && actor.getProperty().getAmbient() > actor.getProperty().getDiffuse()) {
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Impl', colorImpl.concat(['  ambientColor = vertexColorVSOutput.rgb;', '  opacity = opacity*vertexColorVSOutput.a;'])).result;
	      } else if (scalarMatMode === _Constants2.MaterialMode.DIFFUSE || scalarMatMode === _Constants2.MaterialMode.DEFAULT && actor.getProperty().getAmbient() <= actor.getProperty().getDiffuse()) {
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Impl', colorImpl.concat(['  diffuseColor = vertexColorVSOutput.rgb;', '  opacity = opacity*vertexColorVSOutput.a;'])).result;
	      } else {
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Impl', colorImpl.concat(['  diffuseColor = vertexColorVSOutput.rgb;', '  ambientColor = vertexColorVSOutput.rgb;', '  opacity = opacity*vertexColorVSOutput.a;'])).result;
	      }
	    } else {
	      if (model.renderable.getInterpolateScalarsBeforeMapping() && model.renderable.getColorCoordinates() && !model.drawingEdges) {
	        if (scalarMatMode === _Constants2.MaterialMode.AMBIENT || scalarMatMode === _Constants2.MaterialMode.DEFAULT && actor.getProperty().getAmbient() > actor.getProperty().getDiffuse()) {
	          FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Impl', colorImpl.concat(['  vec4 texColor = texture2D(texture1, tcoordVCVSOutput.st);', '  ambientColor = texColor.rgb;', '  opacity = opacity*texColor.a;'])).result;
	        } else if (scalarMatMode === _Constants2.MaterialMode.DIFFUSE || scalarMatMode === _Constants2.MaterialMode.DEFAULT && actor.getProperty().getAmbient() <= actor.getProperty().getDiffuse()) {
	          FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Impl', colorImpl.concat(['  vec4 texColor = texture2D(texture1, tcoordVCVSOutput.st);', '  diffuseColor = texColor.rgb;', '  opacity = opacity*texColor.a;'])).result;
	        } else {
	          FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Impl', colorImpl.concat(['  vec4 texColor = texture2D(texture1, tcoordVCVSOutput.st);', '  diffuseColor = texColor.rgb;', '  ambientColor = texColor.rgb;', '  opacity = opacity*texColor.a;'])).result;
	        }
	      } else {
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Impl', colorImpl).result;
	      }
	    }

	    FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Dec', colorDec).result;

	    shaders.Vertex = VSSource;
	    shaders.Geometry = GSSource;
	    shaders.Fragment = FSSource;
	  };

	  publicAPI.replaceShaderLight = function (shaders, ren, actor) {
	    var FSSource = shaders.Fragment;

	    // check for shadow maps
	    var shadowFactor = '';

	    var lastLightComplexity = model.lastLightComplexity.get(model.lastBoundBO.getPrimitiveType());

	    switch (lastLightComplexity) {
	      case 0:
	        // no lighting or RENDER_VALUES
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Light::Impl', ['  gl_FragData[0] = vec4(ambientColor + diffuseColor, opacity);', '  //VTK::Light::Impl'], false).result;
	        break;

	      case 1:
	        // headlight
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Light::Impl', ['  float df = max(0.0, normalVCVSOutput.z);', '  float sf = pow(df, specularPower);', '  vec3 diffuse = df * diffuseColor;', '  vec3 specular = sf * specularColor;', '  gl_FragData[0] = vec4(ambientColor + diffuse + specular, opacity);', '  //VTK::Light::Impl'], false).result;
	        break;

	      case 2:
	        // light kit
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Light::Dec', [
	        // only allow for up to 6 active lights
	        'uniform int numberOfLights;',
	        // intensity weighted color
	        'uniform vec3 lightColor[6];', 'uniform vec3 lightDirectionVC[6]; // normalized', 'uniform vec3 lightHalfAngleVC[6]; // normalized']).result;
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Light::Impl', ['vec3 diffuse = vec3(0,0,0);', '  vec3 specular = vec3(0,0,0);', '  for (int lightNum = 0; lightNum < numberOfLights; lightNum++)', '    {', '    float df = max(0.0, dot(normalVCVSOutput, -lightDirectionVC[lightNum]));', '    diffuse += ((df' + shadowFactor + ') * lightColor[lightNum]);', '    if (dot(normalVCVSOutput, lightDirectionVC[lightNum]) < 0.0)', '      {', '      float sf = pow( max(0.0, dot(lightHalfAngleVC[lightNum],normalVCVSOutput)), specularPower);', '      specular += ((sf' + shadowFactor + ') * lightColor[lightNum]);', '      }', '    }', '  diffuse = diffuse * diffuseColor;', '  specular = specular * specularColor;', '  gl_FragData[0] = vec4(ambientColor + diffuse + specular, opacity);', '  //VTK::Light::Impl'], false).result;
	        break;

	      case 3:
	        // positional
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Light::Dec', [
	        // only allow for up to 6 active lights
	        'uniform int numberOfLights;',
	        // intensity weighted color
	        'uniform vec3 lightColor[6];', 'uniform vec3 lightDirectionVC[6]; // normalized', 'uniform vec3 lightHalfAngleVC[6]; // normalized', 'uniform vec3 lightPositionVC[6];', 'uniform vec3 lightAttenuation[6];', 'uniform float lightConeAngle[6];', 'uniform float lightExponent[6];', 'uniform int lightPositional[6];']).result;
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Light::Impl', ['  vec3 diffuse = vec3(0,0,0);', '  vec3 specular = vec3(0,0,0);', '  vec3 vertLightDirectionVC;', '  for (int lightNum = 0; lightNum < numberOfLights; lightNum++)', '    {', '    float attenuation = 1.0;', '    if (lightPositional[lightNum] == 0)', '      {', '      vertLightDirectionVC = lightDirectionVC[lightNum];', '      }', '    else', '      {', '      vertLightDirectionVC = vertexVC.xyz - lightPositionVC[lightNum];', '      float distanceVC = length(vertLightDirectionVC);', '      vertLightDirectionVC = normalize(vertLightDirectionVC);', '      attenuation = 1.0 /', '        (lightAttenuation[lightNum].x', '         + lightAttenuation[lightNum].y * distanceVC', '         + lightAttenuation[lightNum].z * distanceVC * distanceVC);', '      // per OpenGL standard cone angle is 90 or less for a spot light', '      if (lightConeAngle[lightNum] <= 90.0)', '        {', '        float coneDot = dot(vertLightDirectionVC, lightDirectionVC[lightNum]);', '        // if inside the cone', '        if (coneDot >= cos(radians(lightConeAngle[lightNum])))', '          {', '          attenuation = attenuation * pow(coneDot, lightExponent[lightNum]);', '          }', '        else', '          {', '          attenuation = 0.0;', '          }', '        }', '      }', '    float df = max(0.0, attenuation*dot(normalVCVSOutput, -vertLightDirectionVC));', '    diffuse += ((df' + shadowFactor + ') * lightColor[lightNum]);', '    if (dot(normalVCVSOutput, vertLightDirectionVC) < 0.0)', '      {', '      float sf = attenuation*pow( max(0.0, dot(lightHalfAngleVC[lightNum],normalVCVSOutput)), specularPower);', '      specular += ((sf' + shadowFactor + ') * lightColor[lightNum]);', '      }', '    }', '  diffuse = diffuse * diffuseColor;', '  specular = specular * specularColor;', '  gl_FragData[0] = vec4(ambientColor + diffuse + specular, opacity);', '  //VTK::Light::Impl'], false).result;
	        break;
	      default:
	        console.error('bad light complexity');
	    }

	    shaders.Fragment = FSSource;
	  };

	  publicAPI.replaceShaderNormal = function (shaders, ren, actor) {
	    if (model.lastLightComplexity.get(model.lastBoundBO.getPrimitiveType()) > 0) {
	      var VSSource = shaders.Vertex;
	      var GSSource = shaders.Geometry;
	      var FSSource = shaders.Fragment;

	      if (model.lastBoundBO.getCABO().getNormalOffset()) {
	        VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::Normal::Dec', ['attribute vec3 normalMC;', 'uniform mat3 normalMatrix;', 'varying vec3 normalVCVSOutput;']).result;
	        VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::Normal::Impl', ['normalVCVSOutput = normalMatrix * normalMC;']).result;
	        GSSource = _ShaderProgram2.default.substitute(GSSource, '//VTK::Normal::Dec', ['in vec3 normalVCVSOutput[];', 'out vec3 normalVCGSOutput;']).result;
	        GSSource = _ShaderProgram2.default.substitute(GSSource, '//VTK::Normal::Impl', ['normalVCGSOutput = normalVCVSOutput[i];']).result;
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Normal::Dec', ['varying vec3 normalVCVSOutput;']).result;
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Normal::Impl', ['vec3 normalVCVSOutput = normalize(normalVCVSOutput);',
	        //  if (!gl_FrontFacing) does not work in intel hd4000 mac
	        //  if (int(gl_FrontFacing) == 0) does not work on mesa
	        '  if (gl_FrontFacing == false) { normalVCVSOutput = -normalVCVSOutput; }']).result;
	      } else {
	        if (model.haveCellNormals) {
	          FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Normal::Dec', ['uniform mat3 normalMatrix;', 'uniform samplerBuffer textureN;']).result;
	          FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Normal::Impl', ['vec3 normalVCVSOutput = normalize(normalMatrix *', '    texelFetchBuffer(textureN, gl_PrimitiveID + PrimitiveIDOffset).xyz);', '  if (gl_FrontFacing == false) { normalVCVSOutput = -normalVCVSOutput; }']).result;
	        } else {
	          if (model.lastBoundBO.getPrimitiveType() === primTypes.Lines || actor.getProperty().getRepresentation() === _Constants.Representation.WIREFRAME) {
	            // generate a normal for lines, it will be perpendicular to the line
	            // and maximally aligned with the camera view direction
	            // no clue if this is the best way to do this.
	            // the code below has been optimized a bit so what follows is
	            // an explanation of the basic approach. Compute the gradient of the line
	            // with respect to x and y, the the larger of the two
	            // cross that with the camera view direction. That gives a vector
	            // orthogonal to the camera view and the line. Note that the line and the camera
	            // view are probably not orthogonal. Which is why when we cross result that with
	            // the line gradient again we get a reasonable normal. It will be othogonal to
	            // the line (which is a plane but maximally aligned with the camera view.
	            FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::UniformFlow::Impl', ['  vec3 fdx = vec3(dFdx(vertexVC.x),dFdx(vertexVC.y),dFdx(vertexVC.z));', '  vec3 fdy = vec3(dFdy(vertexVC.x),dFdy(vertexVC.y),dFdy(vertexVC.z));', '  //VTK::UniformFlow::Impl'] // For further replacements
	            ).result;
	            FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Normal::Impl', ['vec3 normalVCVSOutput;', '  fdx = normalize(fdx);', '  fdy = normalize(fdy);', '  if (abs(fdx.x) > 0.0)', '    { normalVCVSOutput = normalize(cross(vec3(fdx.y, -fdx.x, 0.0), fdx)); }', '  else { normalVCVSOutput = normalize(cross(vec3(fdy.y, -fdy.x, 0.0), fdy));}']).result;
	          } else {
	            FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Normal::Dec', ['uniform int cameraParallel;']).result;

	            FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::UniformFlow::Impl', [
	            // '  vec3 fdx = vec3(dFdx(vertexVC.x),dFdx(vertexVC.y),dFdx(vertexVC.z));',
	            // '  vec3 fdy = vec3(dFdy(vertexVC.x),dFdy(vertexVC.y),dFdy(vertexVC.z));',
	            '  vec3 fdx = dFdx(vertexVC.xyz);', '  vec3 fdy = dFdy(vertexVC.xyz);', '  //VTK::UniformFlow::Impl'] // For further replacements
	            ).result;
	            FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Normal::Impl', ['  fdx = normalize(fdx);', '  fdy = normalize(fdy);', '  vec3 normalVCVSOutput = normalize(cross(fdx,fdy));',
	            // the code below is faster, but does not work on some devices
	            // 'vec3 normalVC = normalize(cross(dFdx(vertexVC.xyz), dFdy(vertexVC.xyz)));',
	            '  if (cameraParallel == 1 && normalVCVSOutput.z < 0.0) { normalVCVSOutput = -1.0*normalVCVSOutput; }', '  if (cameraParallel == 0 && dot(normalVCVSOutput,vertexVC.xyz) > 0.0) { normalVCVSOutput = -1.0*normalVCVSOutput; }']).result;
	          }
	        }
	      }
	      shaders.Vertex = VSSource;
	      shaders.Geometry = GSSource;
	      shaders.Fragment = FSSource;
	    }
	  };

	  publicAPI.replaceShaderPositionVC = function (shaders, ren, actor) {
	    var VSSource = shaders.Vertex;
	    var GSSource = shaders.Geometry;
	    var FSSource = shaders.Fragment;

	    // for points make sure to add in the point size
	    if (actor.getProperty().getRepresentation() === _Constants.Representation.POINTS || model.lastBoundBO.getPrimitiveType() === primTypes.Points) {
	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::PositionVC::Impl', ['//VTK::PositionVC::Impl', '  gl_PointSize = ' + actor.getProperty().getPointSize().toFixed(1) + ';'], false).result;
	    }

	    // do we need the vertex in the shader in View Coordinates
	    if (model.lastLightComplexity.get(model.lastBoundBO.getPrimitiveType()) > 0) {
	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::PositionVC::Dec', ['varying vec4 vertexVCVSOutput;']).result;
	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::PositionVC::Impl', ['vertexVCVSOutput = MCVCMatrix * vertexMC;', '  gl_Position = MCDCMatrix * vertexMC;']).result;
	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::Camera::Dec', ['uniform mat4 MCDCMatrix;', 'uniform mat4 MCVCMatrix;']).result;
	      GSSource = _ShaderProgram2.default.substitute(GSSource, '//VTK::PositionVC::Dec', ['in vec4 vertexVCVSOutput[];', 'out vec4 vertexVCGSOutput;']).result;
	      GSSource = _ShaderProgram2.default.substitute(GSSource, '//VTK::PositionVC::Impl', ['vertexVCGSOutput = vertexVCVSOutput[i];']).result;
	      FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::PositionVC::Dec', ['varying vec4 vertexVCVSOutput;']).result;
	      FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::PositionVC::Impl', ['vec4 vertexVC = vertexVCVSOutput;']).result;
	    } else {
	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::Camera::Dec', ['uniform mat4 MCDCMatrix;']).result;
	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::PositionVC::Impl', ['  gl_Position = MCDCMatrix * vertexMC;']).result;
	    }
	    shaders.Vertex = VSSource;
	    shaders.Geometry = GSSource;
	    shaders.Fragment = FSSource;
	  };

	  publicAPI.replaceShaderTCoord = function (shaders, ren, actor) {
	    if (model.lastBoundBO.getCABO().getTCoordOffset()) {
	      var VSSource = shaders.Vertex;
	      var GSSource = shaders.Geometry;
	      var FSSource = shaders.Fragment;

	      if (model.drawingEdges) {
	        return;
	      }

	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::TCoord::Impl', 'tcoordVCVSOutput = tcoordMC;').result;

	      // we only handle the first texture by default
	      // additional textures are activated and we set the uniform
	      // for the texture unit they are assigned to, but you have to
	      // add in the shader code to do something with them
	      var tus = model.openGLActor.getActiveTextures();
	      var tNumComp = 2;
	      if (tus.length > 0) {
	        tNumComp = tus[0].getComponents();
	      }
	      if (model.renderable.getColorTextureMap()) {
	        tNumComp = model.renderable.getColorTextureMap().getPointData().getScalars().getNumberOfComponents();
	      }

	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::TCoord::Dec', 'attribute vec2 tcoordMC; varying vec2 tcoordVCVSOutput;').result;
	      GSSource = _ShaderProgram2.default.substitute(GSSource, '//VTK::TCoord::Dec', ['in vec2 tcoordVCVSOutput[];', 'out vec2 tcoordVCGSOutput;']).result;
	      GSSource = _ShaderProgram2.default.substitute(GSSource, '//VTK::TCoord::Impl', 'tcoordVCGSOutput = tcoordVCVSOutput[i];').result;
	      FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::TCoord::Dec', ['varying vec2 tcoordVCVSOutput;', 'uniform sampler2D texture1;']).result;
	      switch (tNumComp) {
	        case 1:
	          FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::TCoord::Impl', ['vec4 tcolor = texture2D(texture1, tcoordVCVSOutput);', 'gl_FragData[0] = clamp(gl_FragData[0],0.0,1.0)*', '  vec4(tcolor.r,tcolor.r,tcolor.r,1.0);']).result;
	          break;
	        case 2:
	          FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::TCoord::Impl', ['vec4 tcolor = texture2D(texture1, tcoordVCVSOutput);', 'gl_FragData[0] = clamp(gl_FragData[0],0.0,1.0)*', '  vec4(tcolor.r,tcolor.r,tcolor.r,tcolor.g);']).result;
	          break;
	        default:
	          FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::TCoord::Impl', 'gl_FragData[0] = clamp(gl_FragData[0],0.0,1.0)*texture2D(texture1, tcoordVCVSOutput.st);').result;
	      }
	      shaders.Vertex = VSSource;
	      shaders.Geometry = GSSource;
	      shaders.Fragment = FSSource;
	    }
	  };

	  publicAPI.getCoincidentParameters = function (ren, actor) {
	    // 1. ResolveCoincidentTopology is On and non zero for this primitive
	    // type
	    var cp = null;
	    var prop = actor.getProperty();
	    if (model.renderable.getResolveCoincidentTopology() || prop.getEdgeVisibility() && prop.getRepresentation() === _Constants.Representation.SURFACE) {
	      var primType = model.lastBoundBO.getPrimitiveType();
	      if (primType === primTypes.Points || prop.getRepresentation() === _Constants.Representation.POINTS) {
	        cp = model.renderable.getCoincidentTopologyPointOffsetParameter();
	      } else if (primType === primTypes.Lines || prop.getRepresentation() === _Constants.Representation.WIREFRAME) {
	        cp = model.renderable.getCoincidentTopologyLineOffsetParameters();
	      } else if (primType === primTypes.Tris || primType === primTypes.TriStrips) {
	        cp = model.renderable.getCoincidentTopologyPolygonOffsetParameters();
	      }
	      if (primType === primTypes.TrisEdges || primType === primTypes.TriStripsEdges) {
	        cp = model.renderable.getCoincidentTopologyPolygonOffsetParameters();
	        cp.factor /= 2.0;
	        cp.units /= 2.0;
	      }
	    }

	    // hardware picking always offset due to saved zbuffer
	    // This gets you above the saved surface depth buffer.
	    // vtkHardwareSelector* selector = ren->GetSelector();
	    // if (selector &&
	    //     selector->GetFieldAssociation() == vtkDataObject::FIELD_ASSOCIATION_POINTS)
	    // {
	    //   offset -= 2.0;
	    //   return;
	    // }
	    return cp;
	  };

	  publicAPI.replaceShaderCoincidentOffset = function (shaders, ren, actor) {
	    var cp = publicAPI.getCoincidentParameters(ren, actor);

	    // if we need an offset handle it here
	    // The value of .000016 is suitable for depth buffers
	    // of at least 16 bit depth. We do not query the depth
	    // right now because we would need some mechanism to
	    // cache the result taking into account FBO changes etc.
	    if (cp && (cp.factor !== 0.0 || cp.offset !== 0.0)) {
	      var FSSource = shaders.Fragment;

	      FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Coincident::Dec', ['uniform float cfactor;', 'uniform float coffset;']).result;

	      if (cp.factor !== 0.0) {
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::UniformFlow::Impl', ['float cscale = length(vec2(dFdx(gl_FragCoord.z),dFdy(gl_FragCoord.z)));', '//VTK::UniformFlow::Impl'], false).result;
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Depth::Impl', 'gl_FragDepth = gl_FragCoord.z + cfactor*cscale + 0.000016*coffset;').result;
	      } else {
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Depth::Impl', 'gl_FragDepth = gl_FragCoord.z + 0.000016*coffset;').result;
	      }
	      shaders.Fragment = FSSource;
	    }
	  };

	  publicAPI.replaceShaderValues = function (shaders, ren, actor) {
	    publicAPI.replaceShaderColor(shaders, ren, actor);
	    publicAPI.replaceShaderNormal(shaders, ren, actor);
	    publicAPI.replaceShaderLight(shaders, ren, actor);
	    publicAPI.replaceShaderTCoord(shaders, ren, actor);
	    publicAPI.replaceShaderCoincidentOffset(shaders, ren, actor);
	    publicAPI.replaceShaderPositionVC(shaders, ren, actor);
	  };

	  publicAPI.getNeedToRebuildShaders = function (cellBO, ren, actor) {
	    var lightComplexity = 0;

	    var primType = cellBO.getPrimitiveType();

	    var needLighting = true;

	    var poly = model.currentInput;

	    var n = actor.getProperty().getInterpolation() !== _Constants.Shading.FLAT ? poly.getPointData().getNormals() : null;
	    if (n === null && poly.getCellData().getNormals()) {
	      n = poly.getCelData().getNormals();
	    }

	    var haveNormals = n !== null;

	    if (actor.getProperty().getRepresentation() === _Constants.Representation.POINTS || primType === primTypes.Points) {
	      needLighting = haveNormals;
	    }

	    // do we need lighting?
	    if (actor.getProperty().getLighting() && needLighting) {
	      (function () {
	        // consider the lighting complexity to determine which case applies
	        // simple headlight, Light Kit, the whole feature set of VTK
	        lightComplexity = 0;
	        var numberOfLights = 0;

	        ren.getLights().forEach(function (light) {
	          var status = light.getSwitch();
	          if (status > 0) {
	            numberOfLights++;
	            if (lightComplexity === 0) {
	              lightComplexity = 1;
	            }
	          }

	          if (lightComplexity === 1 && (numberOfLights > 1 || light.getIntensity() !== 1.0 || !light.lightTypeIsHeadLight())) {
	            lightComplexity = 2;
	          }
	          if (lightComplexity < 3 && light.getPositional()) {
	            lightComplexity = 3;
	          }
	        });
	      })();
	    }

	    if (model.lastLightComplexity.get(primType) !== lightComplexity) {
	      model.lightComplexityChanged.get(primType).modified();
	      model.lastLightComplexity.set(primType, lightComplexity);
	    }

	    // has something changed that would require us to recreate the shader?
	    // candidates are
	    // property modified (representation interpolation and lighting)
	    // input modified
	    // light complexity changed
	    if (cellBO.getProgram() === 0 || cellBO.getShaderSourceTime().getMTime() < publicAPI.getMTime() || cellBO.getShaderSourceTime().getMTime() < actor.getMTime() || cellBO.getShaderSourceTime().getMTime() < model.renderable.getMTime() || cellBO.getShaderSourceTime().getMTime() < model.currentInput.getMTime() || cellBO.getShaderSourceTime().getMTime() < model.lightComplexityChanged.get(primType).getMTime()) {
	      return true;
	    }

	    return false;
	  };

	  publicAPI.updateShaders = function (cellBO, ren, actor) {
	    cellBO.getVAO().bind();
	    model.lastBoundBO = cellBO;

	    // has something changed that would require us to recreate the shader?
	    if (publicAPI.getNeedToRebuildShaders(cellBO, ren, actor)) {
	      var shaders = { Vertex: null, Fragment: null, Geometry: null };

	      publicAPI.buildShaders(shaders, ren, actor);

	      // compile and bind the program if needed
	      var newShader = model.openGLRenderWindow.getShaderCache().readyShaderProgramArray(shaders.Vertex, shaders.Fragment, shaders.Geometry);

	      // if the shader changed reinitialize the VAO
	      if (newShader !== cellBO.getProgram()) {
	        cellBO.setProgram(newShader);
	        // reset the VAO as the shader has changed
	        cellBO.getVAO().releaseGraphicsResources();
	      }

	      cellBO.getShaderSourceTime().modified();
	    } else {
	      model.openGLRenderWindow.getShaderCache().readyShaderProgram(cellBO.getProgram());
	    }

	    publicAPI.setMapperShaderParameters(cellBO, ren, actor);
	    publicAPI.setPropertyShaderParameters(cellBO, ren, actor);
	    publicAPI.setCameraShaderParameters(cellBO, ren, actor);
	    publicAPI.setLightingShaderParameters(cellBO, ren, actor);
	  };

	  publicAPI.setMapperShaderParameters = function (cellBO, ren, actor) {
	    // Now to update the VAO too, if necessary.
	    cellBO.getProgram().setUniformi('PrimitiveIDOffset', model.primitiveIDOffset);

	    if (cellBO.getCABO().getElementCount() && (model.VBOBuildTime > cellBO.getAttributeUpdateTime().getMTime() || cellBO.getShaderSourceTime().getMTime() > cellBO.getAttributeUpdateTime().getMTime())) {
	      cellBO.getCABO().bind();
	      if (cellBO.getProgram().isAttributeUsed('vertexMC')) {
	        if (!cellBO.getVAO().addAttributeArray(cellBO.getProgram(), cellBO.getCABO(), 'vertexMC', cellBO.getCABO().getVertexOffset(), cellBO.getCABO().getStride(), model.context.FLOAT, 3, model.context.FALSE)) {
	          console.error('Error setting vertexMC in shader VAO.');
	        }
	      }
	      if (cellBO.getProgram().isAttributeUsed('normalMC') && cellBO.getCABO().getNormalOffset() && model.lastLightComplexity.get(cellBO.getPrimitiveType()) > 0) {
	        if (!cellBO.getVAO().addAttributeArray(cellBO.getProgram(), cellBO.getCABO(), 'normalMC', cellBO.getCABO().getNormalOffset(), cellBO.getCABO().getStride(), model.context.FLOAT, 3, model.context.FALSE)) {
	          console.error('Error setting normalMC in shader VAO.');
	        }
	      }
	      if (cellBO.getProgram().isAttributeUsed('tcoordMC') && cellBO.getCABO().getTCoordOffset()) {
	        if (!cellBO.getVAO().addAttributeArray(cellBO.getProgram(), cellBO.getCABO(), 'tcoordMC', cellBO.getCABO().getTCoordOffset(), cellBO.getCABO().getStride(), model.context.FLOAT, cellBO.getCABO().getTCoordComponents(), model.context.FALSE)) {
	          console.error('Error setting tcoordMC in shader VAO.');
	        }
	      }
	      if (cellBO.getProgram().isAttributeUsed('scalarColor') && cellBO.getCABO().getColorComponents()) {
	        if (!cellBO.getVAO().addAttributeArray(cellBO.getProgram(), cellBO.getCABO(), 'scalarColor', cellBO.getCABO().getColorOffset(), cellBO.getCABO().getStride(), model.context.FLOAT /* BYTE */
	        , cellBO.getCABO().getColorComponents(), true)) {
	          console.error('Error setting scalarColor in shader VAO.');
	        }
	      }
	    }

	    if (model.internalColorTexture && cellBO.getProgram().isUniformUsed('texture1')) {
	      cellBO.getProgram().setUniformi('texture1', model.internalColorTexture.getTextureUnit());
	    }
	    var tus = model.openGLActor.getActiveTextures();
	    tus.forEach(function (tex) {
	      var texUnit = tex.getTextureUnit();
	      var tname = 'texture' + (texUnit + 1);
	      if (cellBO.getProgram().isUniformUsed(tname)) {
	        cellBO.getProgram().setUniformi(tname, texUnit);
	      }
	    });
	  };

	  publicAPI.setLightingShaderParameters = function (cellBO, ren, actor) {
	    // for unlit and headlight there are no lighting parameters
	    if (model.lastLightComplexity.get(cellBO.getPrimitiveType()) < 2) {
	      return;
	    }

	    var program = cellBO.getProgram();

	    // for lightkit case there are some parameters to set
	    // const cam = ren.getActiveCamera();
	    // const viewTF = cam.getModelViewTransformObject();

	    // bind some light settings
	    var numberOfLights = 0;

	    var lightColor = [];
	    // const lightDirection = [];
	    // const lightHalfAngle = [];
	    var lights = ren.getLights();
	    Object.keys(lights).map(function (key) {
	      return lights[key];
	    }).forEach(function (light) {
	      var status = light.getSwitch();
	      if (status > 0.0) {
	        var dColor = light.getDiffuseColor();
	        var intensity = light.getIntensity();
	        lightColor[numberOfLights][0] = dColor[0] * intensity;
	        lightColor[numberOfLights][1] = dColor[1] * intensity;
	        lightColor[numberOfLights][2] = dColor[2] * intensity;
	        // get required info from light
	        // double *lfp = light.getTransformedFocalPoint();
	        // double *lp = light.getTransformedPosition();
	        // double lightDir[3];
	        // vtkMath::Subtract(lfp,lp,lightDir);
	        // vtkMath::Normalize(lightDir);
	        // double *tDir = viewTF.TransformNormal(lightDir);
	        // lightDirection[numberOfLights][0] = tDir[0];
	        // lightDirection[numberOfLights][1] = tDir[1];
	        // lightDirection[numberOfLights][2] = tDir[2];
	        // lightDir[0] = -tDir[0];
	        // lightDir[1] = -tDir[1];
	        // lightDir[2] = -tDir[2]+1.0;
	        // vtkMath::Normalize(lightDir);
	        // lightHalfAngle[numberOfLights][0] = lightDir[0];
	        // lightHalfAngle[numberOfLights][1] = lightDir[1];
	        // lightHalfAngle[numberOfLights][2] = lightDir[2];
	        numberOfLights++;
	      }
	    });

	    program.setUniform3fv('lightColor', numberOfLights, lightColor);
	    // program.setUniform3fv('lightDirectionVC', numberOfLights, lightDirection);
	    // program.setUniform3fv('lightHalfAngleVC', numberOfLights, lightHalfAngle);
	    program.setUniformi('numberOfLights', numberOfLights);

	    // // we are done unless we have positional lights
	    if (model.lastLightComplexity.get(cellBO.getPrimitiveType()) < 3) {
	      return;
	    }

	    // // if positional lights pass down more parameters
	    // let lightAttenuation[6][3];
	    // let lightPosition[6][3];
	    // let lightConeAngle[6];
	    // let lightExponent[6];
	    // int lightPositional[6];
	    // numberOfLights = 0;
	    // for(lc.InitTraversal(sit);
	    //     (light = lc.getNextLight(sit)); )
	    //   {
	    //   let status = light.getSwitch();
	    //   if (status > 0.0)
	    //     {
	    //     double *attn = light.getAttenuationValues();
	    //     lightAttenuation[numberOfLights][0] = attn[0];
	    //     lightAttenuation[numberOfLights][1] = attn[1];
	    //     lightAttenuation[numberOfLights][2] = attn[2];
	    //     lightExponent[numberOfLights] = light.getExponent();
	    //     lightConeAngle[numberOfLights] = light.getConeAngle();
	    //     double *lp = light.getTransformedPosition();
	    //     double *tlp = viewTF.TransformPoint(lp);
	    //     lightPosition[numberOfLights][0] = tlp[0];
	    //     lightPosition[numberOfLights][1] = tlp[1];
	    //     lightPosition[numberOfLights][2] = tlp[2];
	    //     lightPositional[numberOfLights] = light.getPositional();
	    //     numberOfLights++;
	    //     }
	    //   }
	    // program.SetUniform3fv('lightAttenuation', numberOfLights, lightAttenuation);
	    // program.SetUniform1iv('lightPositional', numberOfLights, lightPositional);
	    // program.SetUniform3fv('lightPositionVC', numberOfLights, lightPosition);
	    // program.SetUniform1fv('lightExponent', numberOfLights, lightExponent);
	    // program.SetUniform1fv('lightConeAngle', numberOfLights, lightConeAngle);
	  };

	  publicAPI.setCameraShaderParameters = function (cellBO, ren, actor) {
	    var program = cellBO.getProgram();

	    // // [WMVD]C == {world, model, view, display} coordinates
	    // // E.g., WCDC == world to display coordinate transformation
	    var keyMats = model.openGLCamera.getKeyMatrices(ren);
	    var cam = ren.getActiveCamera();

	    if (actor.getIsIdentity()) {
	      program.setUniformMatrix('MCDCMatrix', keyMats.wcdc);
	      if (program.isUniformUsed('MCVCMatrix')) {
	        program.setUniformMatrix('MCVCMatrix', keyMats.wcvc);
	      }
	      if (program.isUniformUsed('normalMatrix')) {
	        program.setUniformMatrix3x3('normalMatrix', keyMats.normalMatrix);
	      }
	    } else {
	      var actMats = model.openGLActor.getKeyMatrices();
	      if (program.isUniformUsed('normalMatrix')) {
	        var anorms = _glMatrix.mat3.create();
	        _glMatrix.mat3.multiply(anorms, keyMats.normalMatrix, actMats.normalMatrix);
	        program.setUniformMatrix3x3('normalMatrix', anorms);
	      }
	      var tmp4 = _glMatrix.mat4.create();
	      _glMatrix.mat4.multiply(tmp4, keyMats.wcdc, actMats.mcwc);
	      program.setUniformMatrix('MCDCMatrix', tmp4);
	      if (program.isUniformUsed('MCVCMatrix')) {
	        _glMatrix.mat4.multiply(tmp4, keyMats.wcvc, actMats.mcwc);
	        program.setUniformMatrix('MCVCMatrix', tmp4);
	      }
	    }

	    if (program.isUniformUsed('cameraParallel')) {
	      program.setUniformi('cameraParallel', cam.getParallelProjection());
	    }
	  };

	  publicAPI.setPropertyShaderParameters = function (cellBO, ren, actor) {
	    var program = cellBO.getProgram();

	    var ppty = actor.getProperty();

	    var opacity = ppty.getOpacity();
	    var aColor = model.drawingEdges ? ppty.getEdgeColor() : ppty.getAmbientColor();
	    var aIntensity = ppty.getAmbient();
	    var ambientColor = [aColor[0] * aIntensity, aColor[1] * aIntensity, aColor[2] * aIntensity];
	    var dColor = model.drawingEdges ? ppty.getEdgeColor() : ppty.getDiffuseColor();
	    var dIntensity = ppty.getDiffuse();
	    var diffuseColor = [dColor[0] * dIntensity, dColor[1] * dIntensity, dColor[2] * dIntensity];

	    program.setUniformf('opacityUniform', opacity);
	    program.setUniform3f('ambientColorUniform', ambientColor);
	    program.setUniform3f('diffuseColorUniform', diffuseColor);
	    // we are done unless we have lighting
	    if (model.lastLightComplexity.get(cellBO.getPrimitiveType()) < 1) {
	      return;
	    }
	    var sColor = ppty.getSpecularColor();
	    var sIntensity = ppty.getSpecular();
	    var specularColor = [sColor[0] * sIntensity, sColor[1] * sIntensity, sColor[2] * sIntensity];
	    program.setUniform3f('specularColorUniform', specularColor);
	    var specularPower = ppty.getSpecularPower();
	    program.setUniformf('specularPowerUniform', specularPower);

	    // // now set the backface properties if we have them
	    // if (actor.getBackfaceProperty() && !model.DrawingEdges)
	    //   {
	    //   ppty = actor.getBackfaceProperty();

	    //   let opacity = static_cast<float>(ppty.getOpacity());
	    //   double *aColor = ppty.getAmbientColor();
	    //   double aIntensity = ppty.getAmbient();  // ignoring renderer ambient
	    //   let ambientColor[3] = {static_cast<float>(aColor[0] * aIntensity),
	    //     static_cast<float>(aColor[1] * aIntensity),
	    //     static_cast<float>(aColor[2] * aIntensity)};
	    //   double *dColor = ppty.getDiffuseColor();
	    //   double dIntensity = ppty.getDiffuse();
	    //   let diffuseColor[3] = {static_cast<float>(dColor[0] * dIntensity),
	    //     static_cast<float>(dColor[1] * dIntensity),
	    //     static_cast<float>(dColor[2] * dIntensity)};
	    //   double *sColor = ppty.getSpecularColor();
	    //   double sIntensity = ppty.getSpecular();
	    //   let specularColor[3] = {static_cast<float>(sColor[0] * sIntensity),
	    //     static_cast<float>(sColor[1] * sIntensity),
	    //     static_cast<float>(sColor[2] * sIntensity)};
	    //   double specularPower = ppty.getSpecularPower();

	    //   program.SetUniformf('opacityUniformBF', opacity);
	    //   program.SetUniform3f('ambientColorUniformBF', ambientColor);
	    //   program.SetUniform3f('diffuseColorUniformBF', diffuseColor);
	    //   // we are done unless we have lighting
	    //   if (model.LastLightComplexity[&cellBO] < 1)
	    //     {
	    //     return;
	    //     }
	    //   program.SetUniform3f('specularColorUniformBF', specularColor);
	    //   program.SetUniformf('specularPowerUniformBF', specularPower);
	    //   }
	  };

	  publicAPI.renderPieceStart = function (ren, actor) {
	    model.primitiveIDOffset = 0;

	    // Line Width setting (FIXME Ken)
	    model.context.lineWidth(actor.getProperty().getLineWidth());

	    // make sure the BOs are up to date
	    publicAPI.updateBufferObjects(ren, actor);

	    // If we are coloring by texture, then load the texture map.
	    // Use Map as indicator, because texture hangs around.
	    if (model.renderable.getColorTextureMap()) {
	      model.internalColorTexture.activate();
	    }

	    // Bind the OpenGL, this is shared between the different primitive/cell types.
	    model.lastBoundBO = null;
	  };

	  publicAPI.renderPieceDraw = function (ren, actor) {
	    var representation = actor.getProperty().getRepresentation();

	    var gl = model.context;

	    var drawSurfaceWithEdges = actor.getProperty().getEdgeVisibility() && representation === _Constants.Representation.SURFACE;

	    // for every primitive type
	    for (var i = primTypes.Start; i < primTypes.End; i++) {
	      // if there are entries
	      var cabo = model.primitives[i].getCABO();
	      if (cabo.getElementCount()) {
	        // are we drawing edges
	        model.drawingEdges = drawSurfaceWithEdges && (i === primTypes.TrisEdges || i === primTypes.TriStripsEdges);
	        publicAPI.updateShaders(model.primitives[i], ren, actor);
	        var mode = publicAPI.getOpenGLMode(representation, i);
	        gl.drawArrays(mode, 0, cabo.getElementCount());

	        var stride = mode === gl.POINTS ? 1 : mode === gl.LINES ? 2 : 3;
	        model.primitiveIDOffset += cabo.getElementCount() / stride;
	      }
	    }
	  };

	  publicAPI.getOpenGLMode = function (rep, type) {
	    if (rep === _Constants.Representation.POINTS || type === primTypes.Points) {
	      return model.context.POINTS;
	    }
	    if (rep === _Constants.Representation.WIREFRAME || type === primTypes.Lines || type === primTypes.TrisEdges || type === primTypes.TriStripsEdges) {
	      return model.context.LINES;
	    }
	    return model.context.TRIANGLES;
	  };

	  publicAPI.renderPieceFinish = function (ren, actor) {
	    if (model.LastBoundBO) {
	      model.LastBoundBO.getVAO().release();
	    }
	    if (model.renderable.getColorTextureMap()) {
	      model.internalColorTexture.deactivate();
	    }
	  };

	  publicAPI.renderPiece = function (ren, actor) {
	    // Make sure that we have been properly initialized.
	    // if (ren.getRenderWindow().checkAbortStatus()) {
	    //   return;
	    // }


	    publicAPI.invokeEvent({ type: 'StartEvent' });
	    model.currentInput = model.renderable.getInputData();
	    if (!model.renderable.getStatic()) {
	      model.renderable.update();
	      model.currentInput = model.renderable.getInputData();
	    }
	    publicAPI.invokeEvent({ type: 'EndEvent' });

	    if (model.currentInput === null) {
	      console.error('No input!');
	      return;
	    }

	    // if there are no points then we are done
	    if (!model.currentInput.getPoints || !model.currentInput.getPoints().getNumberOfValues()) {
	      return;
	    }

	    publicAPI.renderPieceStart(ren, actor);
	    publicAPI.renderPieceDraw(ren, actor);
	    publicAPI.renderPieceFinish(ren, actor);
	  };

	  publicAPI.computeBounds = function (ren, actor) {
	    if (!publicAPI.getInput()) {
	      _Math2.default.uninitializeBounds(model.Bounds);
	      return;
	    }
	    model.bounnds = publicAPI.getInput().getBounds();
	  };

	  publicAPI.updateBufferObjects = function (ren, actor) {
	    // Rebuild buffers if needed
	    if (publicAPI.getNeedToRebuildBufferObjects(ren, actor)) {
	      publicAPI.buildBufferObjects(ren, actor);
	    }
	  };

	  publicAPI.getNeedToRebuildBufferObjects = function (ren, actor) {
	    // first do a coarse check
	    if (model.VBOBuildTime.getMTime() < publicAPI.getMTime() || model.VBOBuildTime.getMTime() < model.renderable.getMTime() || model.VBOBuildTime.getMTime() < actor.getMTime() || model.VBOBuildTime.getMTime() < actor.getProperty().getMTime() || model.VBOBuildTime.getMTime() < model.currentInput.getMTime()) {
	      return true;
	    }
	    return false;
	  };

	  publicAPI.buildBufferObjects = function (ren, actor) {
	    var poly = model.currentInput;

	    if (poly === null) {
	      return;
	    }

	    model.renderable.mapScalars(poly, 1.0);
	    var c = model.renderable.getColorMapColors();

	    model.haveCellScalars = false;
	    var scalarMode = model.renderable.getScalarMode();
	    if (model.renderable.getScalarVisibility()) {
	      // We must figure out how the scalars should be mapped to the polydata.
	      if ((scalarMode === _Constants2.ScalarMode.USE_CELL_DATA || scalarMode === _Constants2.ScalarMode.USE_CELL_FIELD_DATA || scalarMode === _Constants2.ScalarMode.USE_FIELD_DATA || !poly.getPointData().getScalars()) && scalarMode !== _Constants2.ScalarMode.USE_POINT_FIELD_DATA && c) {
	        model.haveCellScalars = true;
	      }
	    }

	    // Do we have normals?
	    var n = actor.getProperty().getInterpolation() !== _Constants.Shading.FLAT ? poly.getPointData().getNormals() : null;
	    if (n === null && poly.getCellData().getNormals()) {
	      model.haveCellNormals = true;
	      n = poly.getCelData().getNormals();
	    }

	    // rebuild the VBO if the data has changed we create a string for the VBO what
	    // can change the VBO? points normals tcoords colors so what can change those?
	    // the input data is clearly one as it can change all four items tcoords may
	    // haveTextures or not colors may change based on quite a few mapping
	    // parameters in the mapper

	    var representation = actor.getProperty().getRepresentation();
	    var toString = poly.getMTime() + 'A' + representation + 'B' + poly.getMTime() + ('C' + (n ? n.getMTime() : 1) + 'D' + (c ? c.getMTime() : 1)) + ('E' + actor.getProperty().getEdgeVisibility());

	    var tcoords = poly.getPointData().getTCoords();
	    if (!model.openGLActor.getActiveTextures().length) {
	      tcoords = null;
	    }

	    // handle color mapping via texture
	    if (model.renderable.getColorCoordinates()) {
	      tcoords = model.renderable.getColorCoordinates();
	      if (!model.internalColorTexture) {
	        model.internalColorTexture = _Texture2.default.newInstance();
	      }
	      var tex = model.internalColorTexture;
	      // the following 4 lines allow for NPOT textures
	      tex.setMinificationFilter(_Constants3.Filter.NEAREST);
	      tex.setMagnificationFilter(_Constants3.Filter.NEAREST);
	      tex.setWrapS(_Constants3.Wrap.CLAMP_TO_EDGE);
	      tex.setWrapT(_Constants3.Wrap.CLAMP_TO_EDGE);
	      tex.setWindow(model.openGLRenderWindow);
	      tex.setContext(model.openGLRenderWindow.getContext());

	      var input = model.renderable.getColorTextureMap();
	      var ext = input.getExtent();
	      var inScalars = input.getPointData().getScalars();
	      tex.create2DFromRaw(ext[1] - ext[0] + 1, ext[3] - ext[2] + 1, inScalars.getNumberOfComponents(), inScalars.getDataType(), inScalars.getData());
	      tex.activate();
	      tex.sendParameters();
	      tex.deactivate();
	    }

	    if (model.VBOBuildString !== toString) {
	      // Build the VBOs
	      var points = poly.getPoints();
	      var options = {
	        points: points,
	        normals: n,
	        tcoords: tcoords,
	        colors: c,
	        cellOffset: 0,
	        haveCellScalars: model.haveCellScalars,
	        haveCellNormals: model.haveCellNormals
	      };
	      options.cellOffset += model.primitives[primTypes.Points].getCABO().createVBO(poly.getVerts(), 'verts', representation, options);
	      options.cellOffset += model.primitives[primTypes.Lines].getCABO().createVBO(poly.getLines(), 'lines', representation, options);
	      options.cellOffset += model.primitives[primTypes.Tris].getCABO().createVBO(poly.getPolys(), 'polys', representation, options);
	      options.cellOffset += model.primitives[primTypes.TriStrips].getCABO().createVBO(poly.getStrips(), 'strips', representation, options);

	      // if we have edge visibility build the edge VBOs
	      if (actor.getProperty().getEdgeVisibility()) {
	        model.primitives[primTypes.TrisEdges].getCABO().createVBO(poly.getPolys(), 'polys', _Constants.Representation.WIREFRAME, {
	          points: points,
	          normals: n,
	          tcoords: null,
	          colors: null,
	          cellOffset: 0,
	          haveCellScalars: false,
	          haveCellNormals: false
	        });
	        model.primitives[primTypes.TriStripsEdges].getCABO().createVBO(poly.getStrips(), 'strips', _Constants.Representation.WIREFRAME, {
	          points: points,
	          normals: n,
	          tcoords: null,
	          colors: null,
	          cellOffset: 0,
	          haveCellScalars: false,
	          haveCellNormals: false
	        });
	      } else {
	        // otherwise free them
	        model.primitives[primTypes.TrisEdges].releaseGraphicsResources(model.openGLRenderWindow);
	        model.primitives[primTypes.TriStripsEdges].releaseGraphicsResources(model.openGLRenderWindow);
	      }

	      model.VBOBuildTime.modified();
	      model.VBOBuildString = toString;
	    }
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  context: null,
	  VBOBuildTime: 0,
	  VBOBuildString: null,
	  lightComplexityChanged: null,
	  lastLightComplexity: null,
	  primitives: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ViewNode2.default.extend(publicAPI, model);

	  model.lightComplexityChanged = new Map();
	  model.lastLightComplexity = new Map();

	  model.primitives = [];

	  for (var i = primTypes.Start; i < primTypes.End; i++) {
	    model.primitives[i] = _Helper2.default.newInstance();
	    model.primitives[i].setPrimitiveType(i);
	    model.lightComplexityChanged.set(i, {});
	    macro.obj(model.lightComplexityChanged.get(i));
	    model.lastLightComplexity.set(i, 0);
	  }

	  // Build VTK API
	  macro.setGet(publicAPI, model, ['context']);

	  model.VBOBuildTime = {};
	  macro.obj(model.VBOBuildTime);

	  // Object methods
	  vtkOpenGLPolyDataMapper(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 76 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ColorMode = exports.ColorMode = {
	  DEFAULT: 0,
	  MAP_SCALARS: 1,
	  DIRECT_SCALARS: 2
	};

	var ScalarMode = exports.ScalarMode = {
	  DEFAULT: 0,
	  USE_POINT_DATA: 1,
	  USE_CELL_DATA: 2,
	  USE_POINT_FIELD_DATA: 3,
	  USE_CELL_FIELD_DATA: 4,
	  USE_FIELD_DATA: 5
	};

	var MaterialMode = exports.MaterialMode = {
	  DEFAULT: 0,
	  AMBIENT: 1,
	  DIFFUSE: 2,
	  AMBIENT_AND_DIFFUSE: 3
	};

	var GetArray = exports.GetArray = {
	  BY_ID: 0,
	  BY_NAME: 1
	};

	exports.default = {
	  ColorMode: ColorMode,
	  GetArray: GetArray,
	  MaterialMode: MaterialMode,
	  ScalarMode: ScalarMode
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkOpenGLRenderer = vtkOpenGLRenderer;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNode = __webpack_require__(19);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	var _Math = __webpack_require__(32);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLRenderer methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLRenderer(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLRenderer');

	  // Builds myself.
	  publicAPI.build = function (prepass) {
	    if (prepass) {
	      if (!model.renderable) {
	        return;
	      }

	      // make sure we have a camera
	      if (!model.renderable.isActiveCameraCreated()) {
	        model.renderable.resetCamera();
	      }
	      publicAPI.updateLights();
	      publicAPI.prepareNodes();
	      publicAPI.addMissingNode(model.renderable.getActiveCamera());
	      publicAPI.addMissingNodes(model.renderable.getActors());
	      publicAPI.addMissingNodes(model.renderable.getActors2D());
	      publicAPI.addMissingNodes(model.renderable.getVolumes());
	      publicAPI.removeUnusedNodes();
	    }
	  };

	  publicAPI.updateLights = function () {
	    var count = 0;

	    model.renderable.getLights().forEach(function (light) {
	      if (light.getSwitch() > 0.0) {
	        count++;
	      }
	    });

	    if (!count) {
	      console.debug('No lights are on, creating one.');
	      model.renderable.createLight();
	    }

	    return count;
	  };

	  // Renders myself
	  publicAPI.render = function (prepass) {
	    if (prepass) {
	      model.context = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderWindow').getContext();
	      publicAPI.clear();
	    } else {
	      // else
	    }
	  };

	  publicAPI.getAspectRatio = function () {
	    var size = model.parent.getSize();
	    var viewport = model.renderable.getViewport();
	    return size[0] * (viewport[2] - viewport[0]) / ((viewport[3] - viewport[1]) * size[1]);
	  };

	  publicAPI.getTiledSizeAndOrigin = function () {
	    var vport = model.renderable.getViewport();

	    // if there is no window assume 0 1
	    var tileViewPort = [0.0, 0.0, 1.0, 1.0];

	    // find the lower left corner of the viewport, taking into account the
	    // lower left boundary of this tile
	    var vpu = _Math2.default.clampValue(vport[0] - tileViewPort[0], 0.0, 1.0);
	    var vpv = _Math2.default.clampValue(vport[1] - tileViewPort[1], 0.0, 1.0);

	    // store the result as a pixel value
	    var ndvp = model.parent.normalizedDisplayToDisplay(vpu, vpv);
	    var lowerLeftU = Math.round(ndvp[0]);
	    var lowerLeftV = Math.round(ndvp[1]);

	    // find the upper right corner of the viewport, taking into account the
	    // lower left boundary of this tile
	    var vpu2 = _Math2.default.clampValue(vport[2] - tileViewPort[0], 0.0, 1.0);
	    var vpv2 = _Math2.default.clampValue(vport[3] - tileViewPort[1], 0.0, 1.0);
	    // also watch for the upper right boundary of the tile
	    if (vpu2 > tileViewPort[2] - tileViewPort[0]) {
	      vpu2 = tileViewPort[2] - tileViewPort[0];
	    }
	    if (vpv2 > tileViewPort[3] - tileViewPort[1]) {
	      vpv2 = tileViewPort[3] - tileViewPort[1];
	    }
	    var ndvp2 = model.parent.normalizedDisplayToDisplay(vpu2, vpv2);

	    // now compute the size of the intersection of the viewport with the
	    // current tile
	    var usize = Math.round(ndvp2[0]) - lowerLeftU;
	    var vsize = Math.round(ndvp2[1]) - lowerLeftV;

	    if (usize < 0) {
	      usize = 0;
	    }
	    if (vsize < 0) {
	      vsize = 0;
	    }

	    return { usize: usize, vsize: vsize, lowerLeftU: lowerLeftU, lowerLeftV: lowerLeftV };
	  };

	  publicAPI.clear = function () {
	    /* eslint-disable no-bitwise */
	    var clearMask = 0;
	    var gl = model.context;

	    if (!model.renderable.getTransparent()) {
	      var background = model.renderable.getBackground();
	      model.context.clearColor(background[0], background[1], background[2], 1.0);
	      clearMask |= gl.COLOR_BUFFER_BIT;
	    }

	    if (!model.renderable.getPreserveDepthBuffer()) {
	      gl.clearDepth(1.0);
	      clearMask |= gl.DEPTH_BUFFER_BIT;
	      gl.depthMask(true);
	    }

	    gl.colorMask(true, true, true, true);
	    gl.clear(clearMask);

	    gl.enable(gl.DEPTH_TEST);
	    /* eslint-enable no-bitwise */
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  context: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ViewNode2.default.extend(publicAPI, model);

	  // Build VTK API
	  macro.get(publicAPI, model, ['shaderCache']);

	  macro.setGet(publicAPI, model, ['context']);

	  // Object methods
	  vtkOpenGLRenderer(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _blueimpMd = __webpack_require__(79);

	var _blueimpMd2 = _interopRequireDefault(_blueimpMd);

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _ShaderProgram = __webpack_require__(29);

	var _ShaderProgram2 = _interopRequireDefault(_ShaderProgram);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// ----------------------------------------------------------------------------

	var SET_GET_FIELDS = ['lastShaderBound', 'context'];

	// ----------------------------------------------------------------------------
	// vtkShaderCache methods
	// ----------------------------------------------------------------------------

	function vtkShaderCache(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkShaderCache');

	  publicAPI.replaceShaderValues = function (VSSource, FSSource, GSSource) {
	    // first handle renaming any Fragment shader inputs
	    // if we have a geometry shader. By deafult fragment shaders
	    // assume their inputs come from a Vertex Shader. When we
	    // have a Geometry shader we rename the frament shader inputs
	    // to come from the geometry shader

	    model.context.getExtension('OES_standard_derivatives');
	    var nFSSource = FSSource;
	    if (GSSource.length > 0) {
	      nFSSource = _ShaderProgram2.default.substitute(nFSSource, 'VSOut', 'GSOut').result;
	    }

	    var version = '#version 100\n';

	    var nVSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::System::Dec', version).result;

	    nFSSource = _ShaderProgram2.default.substitute(nFSSource, '//VTK::System::Dec', [version + '\n#extension GL_OES_standard_derivatives : enable\n', '#ifdef GL_FRAGMENT_PRECISION_HIGH', 'precision highp float;', '#else', 'precision mediump float;', '#endif']).result;

	    // nFSSource = ShaderProgram.substitute(nFSSource, 'gl_FragData\\[0\\]',
	    //   'gl_FragColor').result;

	    var nGSSource = _ShaderProgram2.default.substitute(GSSource, '//VTK::System::Dec', version).result;

	    return { VSSource: nVSSource, FSSource: nFSSource, GSSource: nGSSource };
	  };

	  // return NULL if there is an issue
	  publicAPI.readyShaderProgramArray = function (vertexCode, fragmentCode, geometryCode) {
	    var data = publicAPI.replaceShaderValues(vertexCode, fragmentCode, geometryCode);

	    var shader = publicAPI.getShaderProgram(data.VSSource, data.FSSource, data.GSSource);

	    return publicAPI.readyShaderProgram(shader);
	  };

	  publicAPI.readyShaderProgram = function (shader) {
	    if (!shader) {
	      return null;
	    }

	    // compile if needed
	    if (!shader.getCompiled() && !shader.compileShader()) {
	      return null;
	    }

	    // bind if needed
	    if (!publicAPI.bindShader(shader)) {
	      return null;
	    }

	    return shader;
	  };

	  publicAPI.getShaderProgram = function (vertexCode, fragmentCode, geometryCode) {
	    // compute the MD5 and the check the map
	    var hashInput = '' + vertexCode + fragmentCode + geometryCode;
	    var result = (0, _blueimpMd2.default)(hashInput);

	    // does it already exist?
	    var loc = Object.keys(model.shaderPrograms).indexOf(result);

	    if (loc === -1) {
	      // create one
	      var sps = _ShaderProgram2.default.newInstance();
	      sps.setContext(model.context);
	      sps.getVertexShader().setSource(vertexCode);
	      sps.getFragmentShader().setSource(fragmentCode);
	      if (geometryCode) {
	        sps.getGeometryShader().setSource(geometryCode);
	      }
	      sps.setMd5Hash(result);
	      model.shaderPrograms[result] = sps;
	      return sps;
	    }

	    return model.shaderPrograms[result];
	  };

	  publicAPI.releaseGraphicsResources = function (win) {
	    // NOTE:
	    // In the current implementation as of October 26th, if a shader
	    // program is created by ShaderCache then it should make sure
	    // that it releases the graphics resouces used by these programs.
	    // It is not wisely for callers to do that since then they would
	    // have to loop over all the programs were in use and invoke
	    // release graphics resources individually.

	    publicAPI.releaseCurrentShader();

	    Object.keys(model.shaderPrograms).map(function (key) {
	      return model.shaderPrograms[key];
	    }).forEach(function (sp) {
	      return sp.releaseGraphicsResources(win);
	    });
	  };

	  publicAPI.releaseGraphicsResources = function () {
	    // release prior shader
	    if (model.astShaderBound) {
	      model.lastShaderBound.release();
	      model.lastShaderBound = null;
	    }
	  };

	  publicAPI.bindShader = function (shader) {
	    if (model.lastShaderBound === shader) {
	      return 1;
	    }

	    // release prior shader
	    if (model.lastShaderBound) {
	      model.lastShaderBound.release();
	    }
	    shader.bind();
	    model.lastShaderBound = shader;
	    return 1;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  lastShaderBound: null,
	  shaderPrograms: null,
	  context: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Internal objects
	  model.shaderPrograms = {};

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, SET_GET_FIELDS);

	  // Object methods
	  vtkShaderCache(publicAPI, model);

	  return Object.freeze(publicAPI);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * JavaScript MD5
	 * https://github.com/blueimp/JavaScript-MD5
	 *
	 * Copyright 2011, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 *
	 * Based on
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	/*global unescape, define, module */

	;(function ($) {
	  'use strict'

	  /*
	  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	  * to work around bugs in some JS interpreters.
	  */
	  function safe_add (x, y) {
	    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
	    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
	    return (msw << 16) | (lsw & 0xFFFF)
	  }

	  /*
	  * Bitwise rotate a 32-bit number to the left.
	  */
	  function bit_rol (num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt))
	  }

	  /*
	  * These functions implement the four basic operations the algorithm uses.
	  */
	  function md5_cmn (q, a, b, x, s, t) {
	    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
	  }
	  function md5_ff (a, b, c, d, x, s, t) {
	    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
	  }
	  function md5_gg (a, b, c, d, x, s, t) {
	    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
	  }
	  function md5_hh (a, b, c, d, x, s, t) {
	    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
	  }
	  function md5_ii (a, b, c, d, x, s, t) {
	    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
	  }

	  /*
	  * Calculate the MD5 of an array of little-endian words, and a bit length.
	  */
	  function binl_md5 (x, len) {
	    /* append padding */
	    x[len >> 5] |= 0x80 << (len % 32)
	    x[(((len + 64) >>> 9) << 4) + 14] = len

	    var i
	    var olda
	    var oldb
	    var oldc
	    var oldd
	    var a = 1732584193
	    var b = -271733879
	    var c = -1732584194
	    var d = 271733878

	    for (i = 0; i < x.length; i += 16) {
	      olda = a
	      oldb = b
	      oldc = c
	      oldd = d

	      a = md5_ff(a, b, c, d, x[i], 7, -680876936)
	      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586)
	      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819)
	      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330)
	      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897)
	      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426)
	      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341)
	      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983)
	      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416)
	      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417)
	      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063)
	      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162)
	      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682)
	      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101)
	      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290)
	      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329)

	      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510)
	      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632)
	      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713)
	      b = md5_gg(b, c, d, a, x[i], 20, -373897302)
	      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691)
	      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083)
	      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335)
	      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848)
	      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438)
	      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690)
	      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961)
	      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501)
	      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467)
	      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784)
	      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473)
	      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734)

	      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558)
	      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463)
	      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562)
	      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556)
	      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060)
	      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353)
	      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632)
	      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640)
	      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174)
	      d = md5_hh(d, a, b, c, x[i], 11, -358537222)
	      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979)
	      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189)
	      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487)
	      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835)
	      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520)
	      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651)

	      a = md5_ii(a, b, c, d, x[i], 6, -198630844)
	      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415)
	      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905)
	      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055)
	      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571)
	      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606)
	      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523)
	      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799)
	      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359)
	      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744)
	      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380)
	      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649)
	      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070)
	      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379)
	      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259)
	      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551)

	      a = safe_add(a, olda)
	      b = safe_add(b, oldb)
	      c = safe_add(c, oldc)
	      d = safe_add(d, oldd)
	    }
	    return [a, b, c, d]
	  }

	  /*
	  * Convert an array of little-endian words to a string
	  */
	  function binl2rstr (input) {
	    var i
	    var output = ''
	    for (i = 0; i < input.length * 32; i += 8) {
	      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
	    }
	    return output
	  }

	  /*
	  * Convert a raw string to an array of little-endian words
	  * Characters >255 have their high-byte silently ignored.
	  */
	  function rstr2binl (input) {
	    var i
	    var output = []
	    output[(input.length >> 2) - 1] = undefined
	    for (i = 0; i < output.length; i += 1) {
	      output[i] = 0
	    }
	    for (i = 0; i < input.length * 8; i += 8) {
	      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
	    }
	    return output
	  }

	  /*
	  * Calculate the MD5 of a raw string
	  */
	  function rstr_md5 (s) {
	    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
	  }

	  /*
	  * Calculate the HMAC-MD5, of a key and some data (raw strings)
	  */
	  function rstr_hmac_md5 (key, data) {
	    var i
	    var bkey = rstr2binl(key)
	    var ipad = []
	    var opad = []
	    var hash
	    ipad[15] = opad[15] = undefined
	    if (bkey.length > 16) {
	      bkey = binl_md5(bkey, key.length * 8)
	    }
	    for (i = 0; i < 16; i += 1) {
	      ipad[i] = bkey[i] ^ 0x36363636
	      opad[i] = bkey[i] ^ 0x5C5C5C5C
	    }
	    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
	    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128))
	  }

	  /*
	  * Convert a raw string to a hex string
	  */
	  function rstr2hex (input) {
	    var hex_tab = '0123456789abcdef'
	    var output = ''
	    var x
	    var i
	    for (i = 0; i < input.length; i += 1) {
	      x = input.charCodeAt(i)
	      output += hex_tab.charAt((x >>> 4) & 0x0F) +
	      hex_tab.charAt(x & 0x0F)
	    }
	    return output
	  }

	  /*
	  * Encode a string as utf-8
	  */
	  function str2rstr_utf8 (input) {
	    return unescape(encodeURIComponent(input))
	  }

	  /*
	  * Take string arguments and return either raw or hex encoded strings
	  */
	  function raw_md5 (s) {
	    return rstr_md5(str2rstr_utf8(s))
	  }
	  function hex_md5 (s) {
	    return rstr2hex(raw_md5(s))
	  }
	  function raw_hmac_md5 (k, d) {
	    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))
	  }
	  function hex_hmac_md5 (k, d) {
	    return rstr2hex(raw_hmac_md5(k, d))
	  }

	  function md5 (string, key, raw) {
	    if (!key) {
	      if (!raw) {
	        return hex_md5(string)
	      }
	      return raw_md5(string)
	    }
	    if (!raw) {
	      return hex_hmac_md5(key, string)
	    }
	    return raw_hmac_md5(key, string)
	  }

	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return md5
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  } else if (typeof module === 'object' && module.exports) {
	    module.exports = md5
	  } else {
	    $.md5 = md5
	  }
	}(this))


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLTextureUnitManager methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLTextureUnitManager(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLTextureUnitManager');

	  // ----------------------------------------------------------------------------
	  // Description:
	  // Delete the allocation table and check if it is not called before
	  // all the texture units have been released.
	  publicAPI.deleteTable = function () {
	    if (model.textureUnits.length) {
	      console.error('some texture units  were not properly released');
	    }
	    model.textureUnits = [];
	    model.numberOfTextureUnits = 0;
	  };

	  // ----------------------------------------------------------------------------
	  publicAPI.setContext = function (ctx) {
	    if (model.context !== ctx) {
	      if (model.context !== 0) {
	        publicAPI.deleteTable();
	      }
	      model.context = ctx;
	      if (model.context) {
	        model.numberOfTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
	      }
	      publicAPI.modified();
	    }
	  };

	  // ----------------------------------------------------------------------------
	  // Description:
	  // Reserve a texture unit. It returns its number.
	  // It returns -1 if the allocation failed (because there are no more
	  // texture units left).
	  // \post valid_result: result==-1 || result>=0 && result<this->GetNumberOfTextureUnits())
	  // \post allocated: result==-1 || this->IsAllocated(result)
	  publicAPI.allocate = function () {
	    for (var i = 0; i < model.numberOfTextureUnits; i++) {
	      if (!publicAPI.isAllocated(i)) {
	        model.textureUnits[i] = true;
	        return i;
	      }
	    }
	    return -1;
	  };

	  publicAPI.allocateUnit = function (unit) {
	    if (publicAPI.isAllocated(unit)) {
	      return -1;
	    }

	    model.textureUnits[unit] = true;
	    return unit;
	  };

	  // ----------------------------------------------------------------------------
	  // Description:
	  // Tell if texture unit `textureUnitId' is already allocated.
	  // \pre valid_id_range : textureUnitId>=0 && textureUnitId<this->GetNumberOfTextureUnits()
	  publicAPI.isAllocated = function (textureUnitId) {
	    return !!model.textureUnits.filter(function (item) {
	      return item === textureUnitId;
	    }).length;
	  };

	  // ----------------------------------------------------------------------------
	  // Description:
	  // Release a texture unit.
	  // \pre valid_id: textureUnitId>=0 && textureUnitId<this->GetNumberOfTextureUnits()
	  // \pre allocated_id: this->IsAllocated(textureUnitId)
	  publicAPI.free = function (val) {
	    var newList = model.textureUnits.filter(function (item) {
	      return item === val;
	    });
	    if (model.textureUnits.length !== newList.length) {
	      model.textureUnits = newList;
	    }
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  context: null,
	  numberOfTextureUnits: 0,
	  textureUnits: 0
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  macro.obj(publicAPI, model);

	  // Build VTK API
	  macro.get(publicAPI, model, ['numberOfTextureUnits']);

	  macro.setGet(publicAPI, model, ['context', 'keyMatrixTime']);

	  // Object methods
	  vtkOpenGLTextureUnitManager(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(9);

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Camera = __webpack_require__(82);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _Light = __webpack_require__(83);

	var _Light2 = _interopRequireDefault(_Light);

	var _Math = __webpack_require__(32);

	var _Math2 = _interopRequireDefault(_Math);

	var _Viewport = __webpack_require__(84);

	var _Viewport2 = _interopRequireDefault(_Viewport);

	var _BoundingBox = __webpack_require__(85);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function notImplemented(method) {
	  return function () {
	    return console.log('vtkRenderer::' + method + ' - NOT IMPLEMENTED');
	  };
	}

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	// function expandBounds(bounds, matrix) {
	//   if (!bounds) {
	//     console.error('ERROR: Invalid bounds');
	//     return;
	//   }

	//   if (!matrix) {
	//     console.error('ERROR: Invalid matrix');
	//     return;
	//   }

	//   // Expand the bounding box by model view transform matrix.
	//   const pt = [
	//     vec4.fromValues(bounds[0], bounds[2], bounds[5], 1.0),
	//     vec4.fromValues(bounds[1], bounds[2], bounds[5], 1.0),
	//     vec4.fromValues(bounds[1], bounds[2], bounds[4], 1.0),
	//     vec4.fromValues(bounds[0], bounds[2], bounds[4], 1.0),
	//     vec4.fromValues(bounds[0], bounds[3], bounds[5], 1.0),
	//     vec4.fromValues(bounds[1], bounds[3], bounds[5], 1.0),
	//     vec4.fromValues(bounds[1], bounds[3], bounds[4], 1.0),
	//     vec4.fromValues(bounds[0], bounds[3], bounds[4], 1.0),
	//   ];

	//   // \note: Assuming that matrix does not have projective component. Hence not
	//   // dividing by the homogeneous coordinate after multiplication
	//   for (let i = 0; i < 8; ++i) {
	//     vec4.transformMat4(pt[i], pt[i], matrix);
	//   }

	//   // min = mpx = pt[0]
	//   const min = [];
	//   const max = [];
	//   for (let i = 0; i < 4; ++i) {
	//     min[i] = pt[0][i];
	//     max[i] = pt[0][i];
	//   }

	//   for (let i = 1; i < 8; ++i) {
	//     for (let j = 0; j < 3; ++j) {
	//       if (min[j] > pt[i][j]) {
	//         min[j] = pt[i][j];
	//       }
	//       if (max[j] < pt[i][j]) {
	//         max[j] = pt[i][j];
	//       }
	//     }
	//   }

	//   // Copy values back to bounds.
	//   bounds[0] = min[0];
	//   bounds[2] = min[1];
	//   bounds[4] = min[2];

	//   bounds[1] = max[0];
	//   bounds[3] = max[1];
	//   bounds[5] = max[2];
	// }

	// ----------------------------------------------------------------------------
	// vtkRenderer methods
	// ----------------------------------------------------------------------------

	function vtkRenderer(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkRenderer');

	  publicAPI.updateCamera = function () {
	    if (!model.activeCamera) {
	      console.debug('No cameras are on, creating one.');
	      // the get method will automagically create a camera
	      // and reset it since one hasn't been specified yet.
	      // If is very unlikely that this can occur - if this
	      // renderer is part of a vtkRenderWindow, the camera
	      // will already have been created as part of the
	      // DoStereoRender() method.
	      publicAPI.getActiveCameraAndResetIfCreated();
	    }

	    // update the viewing transformation
	    model.activeCamera.render(publicAPI);

	    return true;
	  };

	  publicAPI.updateLightsGeometryToFollowCamera = function () {
	    // only update the light's geometry if this Renderer is tracking
	    // this lights.  That allows one renderer to view the lights that
	    // another renderer is setting up.
	    var camera = publicAPI.getActiveCameraAndResetIfCreated();
	    var lightMatrix = camera.getCameraLightTransformMatrix();

	    model.lights.forEach(function (light) {
	      if (light.lightTypeIsSceneLight()) {
	        // Do nothing. Don't reset the transform matrix because applications
	        // may have set a custom matrix. Only reset the transform matrix in
	        // vtkLight::SetLightTypeToSceneLight()
	      } else if (light.lightTypeIsHeadLight()) {
	        // update position and orientation of light to match camera.
	        light.setPosition(camera.getPosition());
	        light.setFocalPoint(camera.getFocalPoint());
	      } else if (light.lightTypeIsCameraLight()) {
	        light.setTransformMatrix(lightMatrix);
	      } else {
	        console.error('light has unknown light type', light);
	      }
	    });
	  };

	  publicAPI.updateLightGeometry = function () {
	    if (model.lightFollowCamera) {
	      // only update the light's geometry if this Renderer is tracking
	      // this lights.  That allows one renderer to view the lights that
	      // another renderer is setting up.
	      return publicAPI.updateLightsGeometryToFollowCamera();
	    }
	    return true;
	  };

	  publicAPI.allocateTime = notImplemented('allocateTime');
	  publicAPI.updateGeometry = notImplemented('updateGeometry');

	  publicAPI.getVTKWindow = function () {
	    return model.renderWindow;
	  };

	  publicAPI.setLayer = function (layer) {
	    console.debug(publicAPI.getClassName(), publicAPI, 'setting Layer to ', layer);
	    if (model.layer !== layer) {
	      model.layer = layer;
	      publicAPI.modified();
	    }
	    publicAPI.setPreserveColorBuffer(!!layer);
	  };

	  publicAPI.setActiveCamera = function (camera) {
	    if (model.activeCamera === camera) {
	      return false;
	    }

	    model.activeCamera = camera;
	    publicAPI.modified();
	    publicAPI.invokeEvent({ type: 'ActiveCameraEvent', camera: camera });
	    return true;
	  };

	  publicAPI.makeCamera = function () {
	    var camera = _Camera2.default.newInstance();
	    publicAPI.invokeEvent({ type: 'CreateCameraEvent', camera: camera });
	    return camera;
	  };

	  // Replace the set/get macro method
	  publicAPI.getActiveCamera = function () {
	    if (!model.activeCamera) {
	      model.activeCamera = publicAPI.makeCamera();
	    }

	    return model.activeCamera;
	  };

	  publicAPI.getActiveCameraAndResetIfCreated = function () {
	    if (!model.activeCamera) {
	      publicAPI.getActiveCamera();
	      publicAPI.resetCamera();
	    }

	    return model.activeCamera;
	  };

	  publicAPI.addActor = publicAPI.addViewProp;
	  publicAPI.addVolume = publicAPI.addViewProp;

	  publicAPI.removeActor = function (actor) {
	    model.actors = model.actors.filter(function (a) {
	      return a !== actor;
	    });
	    publicAPI.removeViewProp(actor);
	  };

	  publicAPI.removeVolume = function (volume) {
	    model.volumes = model.volumes.filter(function (v) {
	      return v !== volume;
	    });
	    publicAPI.removeViewProp(volume);
	  };

	  publicAPI.addLight = function (light) {
	    model.lights = [].concat(model.lights, light);
	    publicAPI.modified();
	  };

	  publicAPI.getActors = function () {
	    model.actors = [];
	    model.props.forEach(function (prop) {
	      model.actors = model.actors.concat(prop.getActors());
	    });
	    return model.actors;
	  };

	  publicAPI.getVolumes = function () {
	    model.volumes = [];
	    model.props.forEach(function (prop) {
	      model.volumes = model.volumes.concat(prop.getVolumes());
	    });
	    return model.volumes;
	  };

	  publicAPI.removeLight = function (light) {
	    model.lights = model.lights.filter(function (l) {
	      return l !== light;
	    });
	    publicAPI.modified();
	  };

	  publicAPI.removeAllLights = function () {
	    model.lights = [];
	  };

	  // FIXME
	  publicAPI.addCuller = notImplemented('addCuller');
	  publicAPI.removeCuller = notImplemented('removeCuller');

	  publicAPI.setLightCollection = function (lights) {
	    model.lights = lights;
	    publicAPI.modified();
	  };

	  publicAPI.makeLight = _Light2.default.newInstance;

	  publicAPI.createLight = function () {
	    if (!model.automaticLightCreation) {
	      return;
	    }

	    if (model.createdLight) {
	      publicAPI.removeLight(model.createdLight);
	      model.createdLight.delete();
	      model.createdLight = null;
	    }

	    model.createdLight = publicAPI.makeLight();
	    publicAPI.addLight(model.createdLight);

	    model.createdLight.setLightTypeToHeadLight();

	    // set these values just to have a good default should LightFollowCamera
	    // be turned off.
	    model.createdLight.setPosition(publicAPI.getActiveCamera().getPosition());
	    model.createdLight.setFocalPoint(publicAPI.getActiveCamera().getFocalPoint());
	  };

	  publicAPI.normalizedDisplayToWorld = function (x, y, z) {
	    var vpd = publicAPI.normalizedDisplayToView(x, y, z);

	    return publicAPI.viewToWorld(vpd[0], vpd[1], vpd[2]);
	  };

	  publicAPI.worldToNormalizedDisplay = function (x, y, z) {
	    var vpd = publicAPI.worldToView(x, y, z);

	    return publicAPI.viewToNormalizedDisplay(vpd[0], vpd[1], vpd[2]);
	  };

	  publicAPI.viewToWorld = function (x, y, z) {
	    if (model.activeCamera === null) {
	      console.error('ViewToWorld: no active camera, cannot compute view to world, returning 0,0,0');
	      return [0, 0, 0];
	    }

	    // get the perspective transformation from the active camera
	    var matrix = model.activeCamera.getCompositeProjectionTransformMatrix(1.0, 0, 1);
	    //                    publicAPI.getTiledAspectRatio(), 0, 1);

	    _glMatrix.mat4.invert(matrix, matrix);
	    _glMatrix.mat4.transpose(matrix, matrix);

	    // Transform point to world coordinates
	    var result = _glMatrix.vec3.fromValues(x, y, z);
	    _glMatrix.vec3.transformMat4(result, result, matrix);
	    return [result[0], result[1], result[2]];
	  };

	  // Convert world point coordinates to view coordinates.
	  publicAPI.worldToView = function (x, y, z) {
	    if (model.activeCamera === null) {
	      console.error('ViewToWorld: no active camera, cannot compute view to world, returning 0,0,0');
	      return [0, 0, 0];
	    }

	    // get the perspective transformation from the active camera
	    var matrix = model.activeCamera.getCompositeProjectionTransformMatrix(1.0, 0, 1);
	    //                    publicAPI.getTiledAspectRatio(), 0, 1);
	    _glMatrix.mat4.transpose(matrix, matrix);

	    var result = _glMatrix.vec3.fromValues(x, y, z);
	    _glMatrix.vec3.transformMat4(result, result, matrix);
	    return [result[0], result[1], result[2]];
	  };

	  publicAPI.computeVisiblePropBounds = function () {
	    var allBounds = [].concat(_BoundingBox.INIT_BOUNDS);
	    var nothingVisible = true;

	    publicAPI.invokeEvent({ type: 'ComputeVisiblePropBoundsEvent', renderer: publicAPI });

	    // loop through all props
	    model.props.filter(function (prop) {
	      return prop.getVisibility() && prop.getUseBounds();
	    }).forEach(function (prop) {
	      var bounds = prop.getBounds();
	      if (bounds && _Math2.default.areBoundsInitialized(bounds)) {
	        nothingVisible = false;

	        if (bounds[0] < allBounds[0]) {
	          allBounds[0] = bounds[0];
	        }
	        if (bounds[1] > allBounds[1]) {
	          allBounds[1] = bounds[1];
	        }
	        if (bounds[2] < allBounds[2]) {
	          allBounds[2] = bounds[2];
	        }
	        if (bounds[3] > allBounds[3]) {
	          allBounds[3] = bounds[3];
	        }
	        if (bounds[4] < allBounds[4]) {
	          allBounds[4] = bounds[4];
	        }
	        if (bounds[5] > allBounds[5]) {
	          allBounds[5] = bounds[5];
	        }
	      }
	    });

	    if (nothingVisible) {
	      _Math2.default.uninitializeBounds(allBounds);
	      console.debug('Can\'t compute bounds, no 3D props are visible');
	    }

	    return allBounds;
	  };

	  publicAPI.resetCamera = function () {
	    var bounds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	    var boundsToUse = bounds || publicAPI.computeVisiblePropBounds();
	    var center = [0, 0, 0];

	    if (!_Math2.default.areBoundsInitialized(boundsToUse)) {
	      console.debug('Cannot reset camera!');
	      return false;
	    }

	    var vn = null;

	    if (publicAPI.getActiveCamera()) {
	      vn = model.activeCamera.getViewPlaneNormal();
	    } else {
	      console.error('Trying to reset non-existant camera');
	      return false;
	    }

	    // Reset the perspective zoom factors, otherwise subsequent zooms will cause
	    // the view angle to become very small and cause bad depth sorting.
	    model.activeCamera.setViewAngle(30.0);

	    center[0] = (boundsToUse[0] + boundsToUse[1]) / 2.0;
	    center[1] = (boundsToUse[2] + boundsToUse[3]) / 2.0;
	    center[2] = (boundsToUse[4] + boundsToUse[5]) / 2.0;

	    var w1 = boundsToUse[1] - boundsToUse[0];
	    var w2 = boundsToUse[3] - boundsToUse[2];
	    var w3 = boundsToUse[5] - boundsToUse[4];
	    w1 *= w1;
	    w2 *= w2;
	    w3 *= w3;
	    var radius = w1 + w2 + w3;

	    // If we have just a single point, pick a radius of 1.0
	    radius = radius === 0 ? 1.0 : radius;

	    // compute the radius of the enclosing sphere
	    radius = Math.sqrt(radius) * 0.5;

	    // default so that the bounding sphere fits within the view fustrum

	    // compute the distance from the intersection of the view frustum with the
	    // bounding sphere. Basically in 2D draw a circle representing the bounding
	    // sphere in 2D then draw a horizontal line going out from the center of
	    // the circle. That is the camera view. Then draw a line from the camera
	    // position to the point where it intersects the circle. (it will be tangent
	    // to the circle at this point, this is important, only go to the tangent
	    // point, do not draw all the way to the view plane). Then draw the radius
	    // from the tangent point to the center of the circle. You will note that
	    // this forms a right triangle with one side being the radius, another being
	    // the target distance for the camera, then just find the target dist using
	    // a sin.
	    var angle = _Math2.default.radiansFromDegrees(model.activeCamera.getViewAngle());
	    var parallelScale = radius;
	    var distance = radius / Math.sin(angle * 0.5);

	    // check view-up vector against view plane normal
	    var vup = model.activeCamera.getViewUp();
	    if (Math.abs(_Math2.default.dot(vup, vn)) > 0.999) {
	      console.warn('Resetting view-up since view plane normal is parallel');
	      model.activeCamera.setViewUp(-vup[2], vup[0], vup[1]);
	    }

	    // update the camera
	    model.activeCamera.setFocalPoint(center[0], center[1], center[2]);
	    model.activeCamera.setPosition(center[0] + distance * vn[0], center[1] + distance * vn[1], center[2] + distance * vn[2]);

	    publicAPI.resetCameraClippingRange(boundsToUse);

	    // setup default parallel scale
	    model.activeCamera.setParallelScale(parallelScale);

	    // Here to let parallel/distributed compositing intercept
	    // and do the right thing.
	    publicAPI.invokeEvent({ type: 'ResetCameraEvent', renderer: publicAPI });

	    return true;
	  };

	  publicAPI.resetCameraClippingRange = function () {
	    var bounds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	    var boundsToUse = bounds || publicAPI.computeVisiblePropBounds();

	    if (!_Math2.default.areBoundsInitialized(boundsToUse)) {
	      console.debug('Cannot reset camera clipping range!');
	      return false;
	    }

	    // Make sure we have an active camera
	    publicAPI.getActiveCameraAndResetIfCreated();
	    if (!model.activeCamera) {
	      console.error('Trying to reset clipping range of non-existant camera');
	      return false;
	    }

	    var vn = null;var position = null;
	    vn = model.activeCamera.getViewPlaneNormal();
	    position = model.activeCamera.getPosition();

	    var a = -vn[0];
	    var b = -vn[1];
	    var c = -vn[2];
	    var d = -(a * position[0] + b * position[1] + c * position[2]);

	    // Set the max near clipping plane and the min far clipping plane
	    var range = [a * boundsToUse[0] + b * boundsToUse[2] + c * boundsToUse[4] + d, 1e-18];

	    // Find the closest / farthest bounding box vertex
	    for (var k = 0; k < 2; k++) {
	      for (var j = 0; j < 2; j++) {
	        for (var i = 0; i < 2; i++) {
	          var dist = a * boundsToUse[i] + b * boundsToUse[2 + j] + c * boundsToUse[4 + k] + d;
	          range[0] = dist < range[0] ? dist : range[0];
	          range[1] = dist > range[1] ? dist : range[1];
	        }
	      }
	    }

	    // do not let far - near be less than 0.1 of the window height
	    // this is for cases such as 2D images which may have zero range
	    var minGap = 0.0;
	    if (model.activeCamera.getParallelProjection()) {
	      minGap = 0.1 * model.activeCamera.getParallelScale();
	    } else {
	      var angle = _Math2.default.radiansFromDegrees(model.activeCamera.getViewAngle());
	      minGap = 0.2 * Math.tan(angle / 2.0) * range[1];
	    }

	    if (range[1] - range[0] < minGap) {
	      minGap = minGap - range[1] + range[0];
	      range[1] += minGap / 2.0;
	      range[0] -= minGap / 2.0;
	    }

	    // Do not let the range behind the camera throw off the calculation.
	    if (range[0] < 0.0) {
	      range[0] = 0.0;
	    }

	    // Give ourselves a little breathing room
	    range[0] = 0.99 * range[0] - (range[1] - range[0]) * model.clippingRangeExpansion;
	    range[1] = 1.01 * range[1] + (range[1] - range[0]) * model.clippingRangeExpansion;

	    // Make sure near is not bigger than far
	    range[0] = range[0] >= range[1] ? 0.01 * range[1] : range[0];

	    // Make sure near is at least some fraction of far - this prevents near
	    // from being behind the camera or too close in front. How close is too
	    // close depends on the resolution of the depth buffer
	    if (!model.nearClippingPlaneTolerance) {
	      model.nearClippingPlaneTolerance = 0.01;
	    }

	    // make sure the front clipping range is not too far from the far clippnig
	    // range, this is to make sure that the zbuffer resolution is effectively
	    // used
	    if (range[0] < model.nearClippingPlaneTolerance * range[1]) {
	      range[0] = model.nearClippingPlaneTolerance * range[1];
	    }
	    model.activeCamera.setClippingRange(range[0], range[1]);

	    // Here to let parallel/distributed compositing intercept
	    // and do the right thing.
	    publicAPI.invokeEvent({ type: 'ResetCameraClippingRangeEvent', renderer: publicAPI });
	    return false;
	  };

	  publicAPI.setRenderWindow = function (renderWindow) {
	    if (renderWindow !== model.renderWindow) {
	      model.vtkWindow = renderWindow;
	      model.renderWindow = renderWindow;
	    }
	  };

	  publicAPI.visibleActorCount = function () {
	    return model.props.filter(function (prop) {
	      return prop.getVisibility();
	    }).length;
	  };
	  publicAPI.visibleVolumeCount = publicAPI.visibleActorCount;

	  publicAPI.getMTime = function () {
	    return Math.max(model.mtime, model.activeCamera ? model.activeCamera.getMTime() : 0, model.createdLight ? model.createdLight.getMTime() : 0);
	  };

	  // FIXME
	  publicAPI.pickProp = notImplemented('pickProp');
	  publicAPI.pickRender = notImplemented('PickRender');
	  publicAPI.pickGeometry = notImplemented('PickGeometry');

	  // ExpandBounds => global

	  publicAPI.getTransparent = function () {
	    return !!model.preserveColorBuffer;
	  };

	  // FIXME
	  publicAPI.getTiledAspectRatio = notImplemented('GetTiledAspectRatio');

	  publicAPI.isActiveCameraCreated = function () {
	    return !!model.activeCamera;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  pickedProp: null,
	  activeCamera: null,

	  ambient: [1, 1, 1],

	  allocatedRenderTime: 100,
	  timeFactor: 1,

	  createdLight: null,
	  automaticLightCreation: true,

	  twoSidedLighting: true,
	  lastRenderTimeInSeconds: -1,

	  renderWindow: null,
	  lights: [],
	  actors: [],
	  volumes: [],

	  lightFollowCamera: true,

	  numberOfPropsRendered: 0,

	  propArray: null,

	  pathArray: null,

	  layer: 1,
	  preserveColorBuffer: false,
	  preserveDepthBuffer: false,

	  computeVisiblePropBounds: _Math2.default.createUninitializedBouds(),

	  interactive: true,

	  nearClippingPlaneTolerance: 0,
	  clippingRangeExpansion: 0.05,

	  erase: true,
	  draw: true,

	  useShadows: false,

	  useDepthPeeling: false,
	  occlusionRatio: 0,
	  maximumNumberOfPeels: 4,

	  selector: null,
	  delegate: null,

	  texturedBackground: false,
	  backgroundTexture: null,

	  pass: 0
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _Viewport2.default.extend(publicAPI, model, initialValues);

	  // Build VTK API
	  macro.get(publicAPI, model, ['renderWindow', 'allocatedRenderTime', 'timeFactor', 'lastRenderTimeInSeconds', 'numberOfPropsRendered', 'lastRenderingUsedDepthPeeling', 'selector']);
	  macro.setGet(publicAPI, model, ['twoSidedLighting', 'lightFollowCamera', 'automaticLightCreation', 'erase', 'draw', 'nearClippingPlaneTolerance', 'clippingRangeExpansion', 'backingStore', 'interactive', 'layer', 'preserveColorBuffer', 'preserveDepthBuffer', 'useDepthPeeling', 'occlusionRatio', 'maximumNumberOfPeels', 'delegate', 'backgroundTexture', 'texturedBackground', 'useShadows', 'pass']);
	  macro.getArray(publicAPI, model, ['actors', 'volumes', 'lights']);
	  macro.setGetArray(publicAPI, model, ['background'], 3);

	  // Object methods
	  vtkRenderer(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkRenderer');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.DEFAULT_VALUES = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(9);

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Math = __webpack_require__(32);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/* eslint-disable new-cap */

	/*
	 * Convenience function to access elements of a gl-matrix.  If it turns
	 * out I have rows and columns swapped everywhere, then I'll just change
	 * the order of 'row' and 'col' parameters in this function
	 */
	// function getMatrixElement(matrix, row, col) {
	//   const idx = (row * 4) + col;
	//   return matrix[idx];
	// }

	// ----------------------------------------------------------------------------
	// vtkCamera methods
	// ----------------------------------------------------------------------------

	function vtkCamera(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkCamera');

	  // Set up private variables and methods
	  var viewMatrix = _glMatrix.mat4.create();
	  var projectionMatrix = _glMatrix.mat4.create();

	  publicAPI.orthogonalizeViewUp = function () {
	    var vt = publicAPI.getViewTransformMatrix();
	    model.viewUp[0] = vt[4];
	    model.viewUp[1] = vt[5];
	    model.viewUp[2] = vt[6];

	    publicAPI.modified();
	  };

	  publicAPI.setPosition = function (x, y, z) {
	    if (x === model.position[0] && y === model.position[1] && z === model.position[2]) {
	      return;
	    }

	    model.position[0] = x;
	    model.position[1] = y;
	    model.position[2] = z;

	    // recompute the focal distance
	    publicAPI.computeDistance();
	    // publicAPI.computeCameraLightTransform();

	    publicAPI.modified();
	  };

	  publicAPI.setFocalPoint = function (x, y, z) {
	    if (x === model.focalPoint[0] && y === model.focalPoint[1] && z === model.focalPoint[2]) {
	      return;
	    }

	    model.focalPoint[0] = x;
	    model.focalPoint[1] = y;
	    model.focalPoint[2] = z;

	    // recompute the focal distance
	    publicAPI.computeDistance();
	    // publicAPI.computeCameraLightTransform();

	    publicAPI.modified();
	  };

	  publicAPI.setDistance = function (d) {
	    // if (distance === d) {
	    //   return;
	    // }

	    // distance = d;

	    // // Distance should be greater than .0002
	    // if (distance < 0.0002) {
	    //   distance = 0.0002;
	    // }

	    // // we want to keep the camera pointing in the same direction
	    // const vec = model.directionOfProjection;

	    // // recalculate FocalPoint
	    // model.focalPoint[0] = model.position[0] + vec[0] * distance;
	    // model.focalPoint[1] = model.position[1] + vec[1] * distance;
	    // model.focalPoint[2] = model.position[2] + vec[2] * distance;

	    // // FIXME
	    // // computeViewTransform();
	    // // computeCameraLightTransform();
	    // publicAPI.modified();
	  };

	  publicAPI.getDistance = function () {};

	  //----------------------------------------------------------------------------
	  // This method must be called when the focal point or camera position changes
	  publicAPI.computeDistance = function () {
	    var dx = model.focalPoint[0] - model.position[0];
	    var dy = model.focalPoint[1] - model.position[1];
	    var dz = model.focalPoint[2] - model.position[2];

	    model.distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

	    if (model.distance < 1e-20) {
	      model.distance = 1e-20;
	      console.debug('Distance is set to minimum.');

	      var vec = model.DirectionOfProjection;

	      // recalculate FocalPoint
	      model.focalPoint[0] = model.position[0] + vec[0] * model.distance;
	      model.focalPoint[1] = model.position[1] + vec[1] * model.distance;
	      model.focalPoint[2] = model.position[2] + vec[2] * model.distance;
	    }

	    model.directionOfProjection[0] = dx / model.distance;
	    model.directionOfProjection[1] = dy / model.distance;
	    model.directionOfProjection[2] = dz / model.distance;

	    publicAPI.computeViewPlaneNormal();
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.computeViewPlaneNormal = function () {
	    // VPN is -DOP
	    model.viewPlaneNormal[0] = -model.directionOfProjection[0];
	    model.viewPlaneNormal[1] = -model.directionOfProjection[1];
	    model.viewPlaneNormal[2] = -model.directionOfProjection[2];
	  };

	  //----------------------------------------------------------------------------
	  // Move the position of the camera along the view plane normal. Moving
	  // towards the focal point (e.g., > 1) is a dolly-in, moving away
	  // from the focal point (e.g., < 1) is a dolly-out.
	  publicAPI.dolly = function (amount) {
	    if (amount <= 0.0) {
	      return;
	    }

	    // dolly moves the camera towards the focus
	    var d = model.distance / amount;

	    publicAPI.setPosition(model.focalPoint[0] - d * model.directionOfProjection[0], model.focalPoint[1] - d * model.directionOfProjection[1], model.focalPoint[2] - d * model.directionOfProjection[2]);
	  };

	  publicAPI.setRoll = function (roll) {};

	  publicAPI.getRoll = function () {};

	  publicAPI.roll = function (angle) {
	    var eye = model.position;
	    var at = model.focalPoint;
	    var up = model.viewUp;
	    var viewUpVec4 = _glMatrix.vec4.fromValues(up[0], up[1], up[2], 0.0);

	    var rotateMatrix = _glMatrix.mat4.create(); // FIXME: don't create a new one each time?
	    var viewDir = _glMatrix.vec3.fromValues(at[0] - eye[0], at[1] - eye[1], at[2] - eye[2]);
	    _glMatrix.mat4.rotate(rotateMatrix, rotateMatrix, _Math2.default.radiansFromDegrees(angle), viewDir);
	    _glMatrix.vec4.transformMat4(viewUpVec4, viewUpVec4, rotateMatrix);

	    model.viewUp[0] = viewUpVec4[0];
	    model.viewUp[1] = viewUpVec4[1];
	    model.viewUp[2] = viewUpVec4[2];

	    publicAPI.modified();
	  };

	  publicAPI.azimuth = function (angle) {
	    var newPosition = _glMatrix.vec3.create();
	    var fp = model.focalPoint;

	    var trans = _glMatrix.mat4.create();
	    _glMatrix.mat4.identity(trans);

	    // translate the focal point to the origin,
	    // rotate about view up,
	    // translate back again
	    _glMatrix.mat4.translate(trans, trans, _glMatrix.vec3.fromValues(fp[0], fp[1], fp[2]));
	    _glMatrix.mat4.rotate(trans, trans, _Math2.default.radiansFromDegrees(angle), _glMatrix.vec3.fromValues(model.viewUp[0], model.viewUp[1], model.viewUp[2]));
	    _glMatrix.mat4.translate(trans, trans, _glMatrix.vec3.fromValues(-fp[0], -fp[1], -fp[2]));

	    // apply the transform to the position
	    _glMatrix.vec3.transformMat4(newPosition, _glMatrix.vec3.fromValues(model.position[0], model.position[1], model.position[2]), trans);
	    publicAPI.setPosition(newPosition[0], newPosition[1], newPosition[2]);
	  };

	  publicAPI.yaw = function (angle) {};

	  publicAPI.elevation = function (angle) {
	    var newPosition = _glMatrix.vec3.create();
	    var fp = model.focalPoint;

	    var vt = publicAPI.getViewTransformMatrix();
	    var axis = [-vt[0], -vt[1], -vt[2]];

	    var trans = _glMatrix.mat4.create();
	    _glMatrix.mat4.identity(trans);

	    // translate the focal point to the origin,
	    // rotate about view up,
	    // translate back again
	    _glMatrix.mat4.translate(trans, trans, _glMatrix.vec3.fromValues(fp[0], fp[1], fp[2]));
	    _glMatrix.mat4.rotate(trans, trans, _Math2.default.radiansFromDegrees(angle), _glMatrix.vec3.fromValues(axis[0], axis[1], axis[2]));
	    _glMatrix.mat4.translate(trans, trans, _glMatrix.vec3.fromValues(-fp[0], -fp[1], -fp[2]));

	    // apply the transform to the position
	    _glMatrix.vec3.transformMat4(newPosition, _glMatrix.vec3.fromValues(model.position[0], model.position[1], model.position[2]), trans);
	    publicAPI.setPosition(newPosition[0], newPosition[1], newPosition[2]);
	  };

	  publicAPI.pitch = function (angle) {};

	  publicAPI.zoom = function (factor) {
	    if (factor <= 0) {
	      return;
	    }
	    if (model.parallelProjection) {
	      model.parallelScale /= factor;
	    } else {
	      model.viewAngle /= factor;
	    }
	    publicAPI.modified();
	  };

	  publicAPI.setThickness = function (thickness) {};

	  publicAPI.setWindowCenter = function (x, y) {};

	  publicAPI.setObliqueAngles = function (alpha, beta) {};

	  publicAPI.applyTransform = function (transform) {};

	  publicAPI.getViewTransformMatrix = function () {
	    var eye = model.position;
	    var at = model.focalPoint;
	    var up = model.viewUp;

	    var result = _glMatrix.mat4.lookAt(viewMatrix, _glMatrix.vec3.fromValues(eye[0], eye[1], eye[2]), // eye
	    _glMatrix.vec3.fromValues(at[0], at[1], at[2]), // at
	    _glMatrix.vec3.fromValues(up[0], up[1], up[2])); // up

	    _glMatrix.mat4.transpose(result, result);
	    return result;
	  };

	  publicAPI.getViewTransformObject = function () {};

	  publicAPI.getProjectionTransformMatrix = function (aspect, nearz, farz) {
	    _glMatrix.mat4.identity(projectionMatrix);

	    // FIXME: Not sure what to do about adjust z buffer here
	    // adjust Z-buffer range
	    // this->ProjectionTransform->AdjustZBuffer( -1, +1, nearz, farz );
	    var cWidth = model.clippingRange[1] - model.clippingRange[0];
	    var cRange = [model.clippingRange[0] + (nearz + 1) * cWidth / 2.0, model.clippingRange[0] + (farz + 1) * cWidth / 2.0];

	    if (model.parallelProjection) {
	      // set up a rectangular parallelipiped
	      var width = model.parallelScale * aspect;
	      var height = model.parallelScale;

	      var xmin = (model.windowCenter[0] - 1.0) * width;
	      var xmax = (model.windowCenter[0] + 1.0) * width;
	      var ymin = (model.windowCenter[1] - 1.0) * height;
	      var ymax = (model.windowCenter[1] + 1.0) * height;

	      // mat4.ortho(out, left, right, bottom, top, near, far)
	      _glMatrix.mat4.ortho(projectionMatrix, xmin, xmax, ymin, ymax, nearz, farz);
	    } else if (model.useOffAxisProjection) {
	      throw new Error('Off-Axis projection is not supported at this time');
	    } else {
	      // mat4.perspective(out, fovy, aspect, near, far)
	      var fovy = model.viewAngle;
	      if (model.useHorizontalViewAngle === true) {
	        fovy = model.viewAngle / aspect;
	      }
	      _glMatrix.mat4.perspective(projectionMatrix, _Math2.default.radiansFromDegrees(fovy), aspect, cRange[0], cRange[1]);
	    }

	    _glMatrix.mat4.transpose(projectionMatrix, projectionMatrix);
	    return projectionMatrix;
	  };

	  publicAPI.getProjectionTransformObject = function (aspect, nearz, farz) {
	    // return vtkTransform object
	  };

	  publicAPI.getCompositeProjectionTransformMatrix = function (aspect, nearz, farz) {
	    var vMat = publicAPI.getViewTransformMatrix();
	    var pMat = publicAPI.getProjectionTransformMatrix(aspect, nearz, farz);
	    _glMatrix.mat4.multiply(pMat, vMat, pMat);
	    return pMat;
	  };

	  // publicAPI.getProjectionTransformMatrix = renderer => {
	  //   // return glmatrix object
	  // };

	  publicAPI.setUserViewTransform = function (transform) {
	    // transform is a vtkHomogeneousTransform
	  };

	  publicAPI.setUserTransform = function (transform) {
	    // transform is a vtkHomogeneousTransform
	  };

	  publicAPI.render = function (renderer) {};

	  publicAPI.getViewingRaysMTime = function () {};

	  publicAPI.viewingRaysModified = function () {};

	  publicAPI.getFrustumPlanes = function (aspect) {
	    // Return array of 24 params (4 params for each of 6 plane equations)
	  };

	  publicAPI.getOrientation = function () {};

	  publicAPI.getOrientationWXYZ = function () {};

	  publicAPI.getCameraLightTransformMatrix = function () {};

	  publicAPI.updateViewport = function () {};

	  publicAPI.shallowCopy = function (sourceCamera) {};

	  publicAPI.deepCopy = function (sourceCamera) {};

	  publicAPI.setScissorRect = function (rect) {
	    // rect is a vtkRect
	  };

	  publicAPI.getScissorRect = function () {};
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = exports.DEFAULT_VALUES = {
	  position: [0, 0, 1],
	  focalPoint: [0, 0, 0],
	  viewUp: [0, 1, 0],
	  directionOfProjection: [0, 0, -1],
	  parallelProjection: false,
	  useHorizontalViewAngle: false,
	  viewAngle: 30,
	  parallelScale: 1,
	  clippingRange: [0.01, 1000.01],
	  thickness: 1000,
	  windowCenter: [0, 0],
	  viewPlaneNormal: [0, 0, 1],
	  focalDisk: 1,
	  useOffAxisProjection: false,
	  screenBottomLeft: [-0.5, -0.5, -0.5],
	  screenBottomRight: [0.5, -0.5, -0.5],
	  screenTopRight: [0.5, 0.5, -0.5],
	  userViewTransform: null,
	  userTransform: null,
	  freezeFocalPoint: false,
	  useScissor: false
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Make sure we have our own objects

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.get(publicAPI, model, ['thickness', 'userViewTransform', 'userTransform']);

	  macro.setGet(publicAPI, model, ['parallelProjection', 'useHorizontalViewAngle', 'viewAngle', 'parallelScale', 'focalDisk', 'useOffAxisProjection', 'freezeFocalPoint', 'useScissor']);

	  macro.getArray(publicAPI, model, ['directionOfProjection', 'windowCenter', 'viewPlaneNormal', 'position', 'focalPoint']);

	  macro.setGetArray(publicAPI, model, ['clippingRange'], 2);

	  macro.setGetArray(publicAPI, model, ['viewUp', 'screenBottomLeft', 'screenBottomRight', 'screenTopRight'], 3);

	  // Object methods
	  vtkCamera(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkCamera');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.LIGHT_TYPES = undefined;
	exports.vtkLight = vtkLight;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Math = __webpack_require__(32);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------

	var LIGHT_TYPES = exports.LIGHT_TYPES = ['HeadLight', 'CameraLight', 'SceneLight'];

	// ----------------------------------------------------------------------------
	// vtkLight methods
	// ----------------------------------------------------------------------------

	function vtkLight(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkLight');

	  publicAPI.getTransformedPosition = function () {
	    if (model.transformMatrix) {
	      return []; // FIXME !!!!
	    }
	    return [].concat(model.position);
	  };

	  publicAPI.getTransformedFocalPoint = function () {
	    if (model.transformMatrix) {
	      return []; // FIXME !!!!
	    }
	    return [].concat(model.focalPoint);
	  };

	  publicAPI.setDirectionAngle = function (elevation, azimuth) {
	    var elevationRadians = _Math2.default.radiansFromDegrees(elevation);
	    var azimuthRadians = _Math2.default.radiansFromDegrees(azimuth);

	    publicAPI.setPosition(Math.cos(elevationRadians) * Math.sin(azimuthRadians), Math.sin(elevationRadians), Math.cos(elevationRadians) * Math.cos(azimuthRadians));

	    publicAPI.setFocalPoint(0, 0, 0);
	    publicAPI.setPositional(0);
	  };

	  publicAPI.setLightTypeToHeadLight = function () {
	    publicAPI.setLightType('HeadLight');
	  };

	  publicAPI.setLightTypeToCameraLight = function () {
	    publicAPI.setLightType('CameraLight');
	  };

	  publicAPI.setLightTypeToSceneLight = function () {
	    publicAPI.setTransformMatrix(null);
	    publicAPI.setLightType('SceneLight');
	  };

	  publicAPI.lightTypeIsHeadLight = function () {
	    return model.lightType === 'HeadLight';
	  };

	  publicAPI.lightTypeIsSceneLight = function () {
	    return model.lightType === 'SceneLight';
	  };

	  publicAPI.lightTypeIsCameraLight = function () {
	    return model.lightType === 'CameraLight';
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  switch: true,
	  intensity: 1,
	  ambientColor: [0, 0, 0],
	  diffuseColor: [1, 1, 1],
	  specularColor: [1, 1, 1],
	  position: [0, 0, 1],
	  focalPoint: [0, 0, 0],
	  positional: false,
	  exponent: 1,
	  coneAngle: 30,
	  attenuationValues: [1, 0, 0],
	  transformMatrix: null,
	  lightType: 'SceneLight',
	  shadowAttenuation: 1
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, ['intensity', 'switch', 'positional', 'exponent', 'coneAngle', 'transformMatrix', 'lightType', 'shadowAttenuation']);
	  macro.setGetArray(publicAPI, model, ['ambientColor', 'diffuseColor', 'specularColor', 'position', 'focalPoint', 'attenuationValues'], 3);

	  // Object methods
	  vtkLight(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkLight');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend, LIGHT_TYPES: LIGHT_TYPES };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function notImplemented(method) {
	  return function () {
	    return console.log('vtkViewport::' + method + ' - NOT IMPLEMENTED');
	  };
	}

	// ----------------------------------------------------------------------------
	// vtkViewport methods
	// ----------------------------------------------------------------------------

	function vtkViewport(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkViewport');

	  // Public API methods
	  publicAPI.getViewProps = function () {
	    return model.props;
	  };
	  publicAPI.hasViewProp = function (prop) {
	    return !!model.props.filter(function (item) {
	      return item === prop;
	    }).length;
	  };
	  publicAPI.addViewProp = function (prop) {
	    if (prop && !publicAPI.hasViewProp(prop)) {
	      model.props = model.props.concat(prop);
	    }
	  };

	  publicAPI.removeViewProp = function (prop) {
	    var newPropList = model.props.filter(function (item) {
	      return item === prop;
	    });
	    if (model.props.length !== newPropList.length) {
	      model.props = newPropList;
	    }
	  };

	  publicAPI.removeAllViewProps = function () {
	    model.props = [];
	  };

	  publicAPI.addActor2D = publicAPI.addViewProp;
	  publicAPI.removeActor2D = function (prop) {
	    // VTK way: model.actors2D.RemoveItem(prop);
	    publicAPI.removeViewProp(prop);
	  };

	  publicAPI.getActors2D = function () {
	    model.actors2D = [];
	    model.props.forEach(function (prop) {
	      model.actors2D = model.actors2D.concat(prop.getActors2D());
	    });
	    return model.actors2D;
	  };

	  publicAPI.displayToView = function () {
	    return console.error('call displayToView on your view instead');
	  };
	  publicAPI.viewToDisplay = function () {
	    return console.error('callviewtodisplay on your view instead');
	  };
	  publicAPI.getSize = function () {
	    return console.error('call getSize on your View instead');
	  };

	  publicAPI.normalizedDisplayToView = function (x, y, z) {
	    // first to normalized viewport
	    var nvp = publicAPI.normalizedDisplayToNormalizedViewport(x, y, z);

	    // then to view
	    return publicAPI.normalizedViewportToView(nvp[0], nvp[1], nvp[2]);
	  };

	  publicAPI.normalizedDisplayToNormalizedViewport = function (x, y, z) {
	    var scale = [model.viewport[2] - model.viewport[0], model.viewport[3] - model.viewport[1]];
	    return [(x - model.viewport[0]) / scale[0], (y - model.viewport[1]) / scale[1], z];
	  };

	  publicAPI.normalizedViewportToView = function (x, y, z) {
	    return [x * 2.0 - 1.0, y * 2.0 - 1.0, z * 2.0 - 1.0];
	  };

	  publicAPI.viewToNormalizedDisplay = function (x, y, z) {
	    // first to nvp
	    var nvp = publicAPI.viewToNormalizedViewport(x, y, z);

	    // then to ndp
	    return publicAPI.normalizedViewportToNormalizedDisplay(nvp[0], nvp[1], nvp[2]);
	  };

	  publicAPI.normalizedViewportToNormalizedDisplay = function (x, y, z) {
	    var scale = [model.viewport[2] - model.viewport[0], model.viewport[3] - model.viewport[1]];
	    return [(x - model.viewport[0]) / scale[0], (y - model.viewport[1]) / scale[1], z];
	  };

	  publicAPI.viewToNormalizedViewport = function (x, y, z) {
	    return [(x + 1.0) * 0.5, (y + 1.0) * 0.5, (z + 1.0) * 0.5];
	  };

	  publicAPI.PickPropFrom = notImplemented('PickPropFrom');
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  vtkWindow: null,
	  background: [0, 0, 0],
	  background2: [0.2, 0.2, 0.2],
	  gradientBackground: false,
	  viewport: [0, 0, 1, 1],
	  aspect: [1, 1],
	  pixelAspect: [1, 1],
	  props: [],
	  actors2D: []
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.event(publicAPI, model, 'event');

	  macro.setGetArray(publicAPI, model, ['viewport'], 4);

	  macro.setGetArray(publicAPI, model, ['background', 'background2'], 3);

	  vtkViewport(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkViewport');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = exports.INIT_BOUNDS = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Plane = __webpack_require__(86);

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
	    var _model$bounds = _slicedToArray(model.bounds, 6),
	        xMin = _model$bounds[0],
	        xMax = _model$bounds[1],
	        yMin = _model$bounds[2],
	        yMax = _model$bounds[3],
	        zMin = _model$bounds[4],
	        zMax = _model$bounds[5];

	    model.bounds = [x, x > xMax ? x : xMax, y, y > yMax ? y : yMax, z, z > zMax ? z : zMax];

	    return xMin !== x || yMin !== y || zMin !== z;
	  };

	  publicAPI.setMaxPoint = function (x, y, z) {
	    var _model$bounds2 = _slicedToArray(model.bounds, 6),
	        xMin = _model$bounds2[0],
	        xMax = _model$bounds2[1],
	        yMin = _model$bounds2[2],
	        yMax = _model$bounds2[3],
	        zMin = _model$bounds2[4],
	        zMax = _model$bounds2[5];

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
	    var _model$bounds3 = _slicedToArray(model.bounds, 6),
	        _xMin = _model$bounds3[0],
	        _xMax = _model$bounds3[1],
	        _yMin = _model$bounds3[2],
	        _yMax = _model$bounds3[3],
	        _zMin = _model$bounds3[4],
	        _zMax = _model$bounds3[5];

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
	    /* eslint-disable no-continue */
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
	    /* eslint-enable no-continue */

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
	    /* eslint-disable no-continue */
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
	    /* eslint-enable no-continue */
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
	  type: 'vtkBoundingBox',
	  bounds: [].concat(INIT_BOUNDS)
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, ['bounds']);
	  vtkBoundingBox(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkBoundingBox');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

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

	var DEFAULT_VALUES = {
	  type: 'vtkPlane'
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, ['bounds']);
	  vtkPlane(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkPlane');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.DEFAULT_VALUES = undefined;
	exports.vtkRenderWindow = vtkRenderWindow;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkRenderWindow methods
	// ----------------------------------------------------------------------------

	function vtkRenderWindow(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkRenderWindow');

	  // Add renderer
	  publicAPI.addRenderer = function (renderer) {
	    if (publicAPI.hasRenderer(renderer)) {
	      return;
	    }
	    renderer.setRenderWindow(publicAPI);
	    model.renderers.push(renderer);

	    // for (this->Renderers->InitTraversal(rsit);
	    //      (aren = this->Renderers->GetNextRenderer(rsit)); )
	    //   {
	    //   aren->SetAllocatedRenderTime
	    //     (1.0/(this->DesiredUpdateRate*this->Renderers->GetNumberOfItems()));
	    //   }

	    publicAPI.modified();
	  };

	  // Remove renderer
	  publicAPI.removeRenderer = function (renderer) {
	    model.renderers = model.renderers.filter(function (r) {
	      return r !== renderer;
	    });
	    publicAPI.modified();
	  };

	  publicAPI.hasRenderer = function (ren) {
	    return model.renderers.indexOf(ren) !== -1;
	  };

	  // Add renderer
	  publicAPI.addView = function (view) {
	    if (publicAPI.hasView(view)) {
	      return;
	    }
	    view.setRenderable(publicAPI);
	    model.views.push(view);
	    publicAPI.modified();
	  };

	  // Remove renderer
	  publicAPI.removeView = function (view) {
	    model.views = model.views.filter(function (r) {
	      return r !== view;
	    });
	    publicAPI.modified();
	  };

	  publicAPI.hasView = function (view) {
	    return model.views.indexOf(view) !== -1;
	  };

	  publicAPI.render = function () {
	    model.views.forEach(function (view) {
	      return view.traverseAllPasses();
	    });
	  };

	  publicAPI.captureImages = function () {
	    var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'image/png';

	    publicAPI.render();
	    return model.views.map(function (view) {
	      return view.captureImage ? view.captureImage(format) : undefined;
	    }).filter(function (i) {
	      return !!i;
	    });
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = exports.DEFAULT_VALUES = {
	  renderers: [],
	  views: [],
	  interactor: null,
	  neverRendered: true,
	  numberOfLayers: 1
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, ['interactor', 'numberOfLayers', 'views']);
	  macro.get(publicAPI, model, ['neverRendered']);
	  macro.getArray(publicAPI, model, ['renderers']);
	  macro.event(publicAPI, model, 'completion');

	  // Object methods
	  vtkRenderWindow(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkRenderWindow');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Math = __webpack_require__(32);

	var _Math2 = _interopRequireDefault(_Math);

	var _InteractorStyleTrackballCamera = __webpack_require__(89);

	var _InteractorStyleTrackballCamera2 = _interopRequireDefault(_InteractorStyleTrackballCamera);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	var eventsWeHandle = ['Enter', 'Leave', 'MouseMove', 'LeftButtonPress', 'LeftButtonRelease', 'MiddleButtonPress', 'MiddleButtonRelease', 'RightButtonPress', 'RightButtonRelease', 'MouseWheelForward', 'MouseWheelBackward', 'Expose', 'Configure', 'Timer', 'KeyPress', 'KeyRelease', 'Char', 'Delete', 'StartPinch', 'Pinch', 'EndPinch', 'StartPan', 'Pan', 'EndPan', 'StartRotate', 'Rotate', 'EndRotate', 'Tap', 'LongTap', 'Swipe'];

	function preventDefault(event) {
	  event.stopPropagation();
	  event.preventDefault();
	  return false;
	}

	function vtkRenderWindowInteractor(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkRenderWindowInteractor');

	  // Public API methods

	  //----------------------------------------------------------------------
	  publicAPI.start = function () {
	    // Let the compositing handle the event loop if it wants to.
	    // if (publicAPI.HasObserver(vtkCommand::StartEvent) && !publicAPI.HandleEventLoop) {
	    //   publicAPI.invokeEvent({ type: 'StartEvent' });
	    //   return;
	    // }

	    // As a convenience, initialize if we aren't initialized yet.
	    if (!model.initialized) {
	      publicAPI.initialize();
	      if (!model.initialized) {
	        return;
	      }
	    }
	    // Pass execution to the subclass which will run the event loop,
	    // this will not return until TerminateApp is called.
	    publicAPI.startEventLoop();
	  };

	  //----------------------------------------------------------------------
	  publicAPI.setRenderWindow = function (aren) {
	    console.error('you want to call setView(view) instead of setRenderWindow on a vtk.js  interactor');
	  };

	  //----------------------------------------------------------------------
	  publicAPI.setInteractorStyle = function (style) {
	    if (model.interactorStyle !== style) {
	      if (model.interactorStyle != null) {
	        model.interactorStyle.setInteractor(null);
	      }
	      model.interactorStyle = style;
	      if (model.interactorStyle != null) {
	        if (model.interactorStyle.getInteractor() !== publicAPI) {
	          model.interactorStyle.setInteractor(publicAPI);
	        }
	      }
	    }
	  };

	  //---------------------------------------------------------------------
	  publicAPI.initialize = function () {
	    model.initialized = true;
	    publicAPI.enable();
	    publicAPI.render();
	  };

	  publicAPI.enable = function () {
	    return publicAPI.setEnabled(true);
	  };

	  publicAPI.disable = function () {
	    return publicAPI.setEnabled(false);
	  };

	  publicAPI.startEventLoop = function () {
	    return console.log('empty event loop');
	  };

	  publicAPI.setEventPosition = function (xv, yv, zv, pointer) {
	    model.pointerIndex = pointer;
	    model.lastEventPositions[pointer] = model.eventPositions[pointer];
	    model.eventPositions[pointer] = { x: xv, y: yv, z: zv };
	  };

	  publicAPI.getEventPosition = function (pointer) {
	    return model.eventPositions[pointer];
	  };

	  publicAPI.getLastEventPosition = function (pointer) {
	    return model.lastEventPositions[pointer];
	  };

	  publicAPI.bindEvents = function (canvas) {
	    model.canvas = canvas;
	    canvas.addEventListener('contextmenu', preventDefault);
	    canvas.addEventListener('click', preventDefault);
	    canvas.addEventListener('mousewheel', publicAPI.handleWheel);
	    canvas.addEventListener('DOMMouseScroll', publicAPI.handleWheel);

	    canvas.addEventListener('mousedown', publicAPI.handleMouseDown);
	    document.querySelector('body').addEventListener('keypress', publicAPI.handleKeyPress);
	    canvas.addEventListener('mouseup', publicAPI.handleMouseUp);
	    canvas.addEventListener('mousemove', publicAPI.handleMouseMove);
	    canvas.addEventListener('touchstart', publicAPI.handleTouchStart, false);
	    canvas.addEventListener('touchend', publicAPI.handleTouchEnd, false);
	    canvas.addEventListener('touchcancel', publicAPI.handleTouchEnd, false);
	    canvas.addEventListener('touchmove', publicAPI.handleTouchMove, false);
	  };

	  publicAPI.unbindEvents = function (canvas) {
	    canvas.removeEventListener('contextmenu', preventDefault);
	    canvas.removeEventListener('click', preventDefault);
	    canvas.removeEventListener('mousewheel', publicAPI.handleWheel);
	    canvas.removeEventListener('DOMMouseScroll', publicAPI.handleWheel);

	    canvas.removeEventListener('mousedown', publicAPI.handleMouseDown);
	    document.querySelector('body').removeEventListener('keypress', publicAPI.handleKeyPress);
	    canvas.removeEventListener('mouseup', publicAPI.handleMouseUp);
	    canvas.removeEventListener('mousemove', publicAPI.handleMouseMove);
	    canvas.removeEventListener('touchstart', publicAPI.handleTouchStart);
	    canvas.removeEventListener('touchend', publicAPI.handleTouchEnd);
	    canvas.removeEventListener('touchcancel', publicAPI.handleTouchEnd);
	    canvas.removeEventListener('touchmove', publicAPI.handleTouchMove);
	  };

	  publicAPI.handleKeyPress = function (event) {
	    event.stopPropagation();
	    event.preventDefault();

	    publicAPI.setEventPosition(event.clientX, model.canvas.clientHeight - event.clientY + 1, 0, 0);
	    model.controlKey = event.ctrlKey;
	    model.altKey = event.altKey;
	    model.shiftKey = event.shiftKey;
	    model.keyCode = String.fromCharCode(event.charCode);
	    publicAPI.charEvent();
	  };

	  publicAPI.handleMouseDown = function (event) {
	    event.stopPropagation();
	    event.preventDefault();

	    publicAPI.setEventPosition(event.clientX, model.canvas.clientHeight - event.clientY + 1, 0, 0);
	    model.controlKey = event.ctrlKey;
	    model.altKey = event.altKey;
	    model.shiftKey = event.shiftKey;
	    switch (event.which) {
	      case 1:
	        publicAPI.leftButtonPressEvent();
	        break;
	      // case 3:
	      //   publicAPI.rightButtonPressEvent();
	      //   event.preventDefault();
	      //   break;
	      default:
	        break;
	    }
	  };

	  publicAPI.handleMouseMove = function (event) {
	    event.stopPropagation();
	    event.preventDefault();

	    publicAPI.setEventPosition(event.clientX, model.canvas.clientHeight - event.clientY + 1, 0, 0);
	    publicAPI.mouseMoveEvent();
	  };

	  publicAPI.handleWheel = function (event) {
	    event.stopPropagation();
	    event.preventDefault();

	    var wheelDelta = 0;
	    var mode = '';
	    if (event.wheelDeltaX === undefined) {
	      mode = 'detail';
	      wheelDelta = -event.detail * 2;
	    } else {
	      mode = 'wheelDeltaY';
	      wheelDelta = event.wheelDeltaY;
	    }

	    // FIXME do something with it...
	    console.log(mode, wheelDelta);
	  };

	  publicAPI.handleMouseUp = function (event) {
	    event.stopPropagation();
	    event.preventDefault();

	    publicAPI.setEventPosition(event.clientX, model.canvas.clientHeight - event.clientY + 1, 0, 0);
	    switch (event.which) {
	      case 1:
	        publicAPI.leftButtonReleaseEvent();
	        break;
	      // case 3:
	      //   publicAPI.rightButtonReleaseEvent();
	      //   event.preventDefault();
	      //   break;
	      default:
	        break;
	    }
	  };

	  publicAPI.handleTouchStart = function (event) {
	    event.stopPropagation();
	    event.preventDefault();
	    console.log('touch down');

	    var touches = event.changedTouches;
	    for (var i = 0; i < touches.length; i++) {
	      var touch = touches[i];
	      publicAPI.setEventPosition(touch.clientX, model.canvas.clientHeight - touch.clientY + 1, 0, touch.identifier);
	      publicAPI.setPointerIndex(touch.identifier);
	      publicAPI.startTouchEvent();
	    }
	  };

	  publicAPI.handleTouchMove = function (event) {
	    event.stopPropagation();
	    event.preventDefault();

	    var touches = event.changedTouches;
	    for (var i = 0; i < touches.length; i++) {
	      var touch = touches[i];
	      publicAPI.setEventPosition(touch.clientX, model.canvas.clientHeight - touch.clientY + 1, 0, touch.identifier);
	      publicAPI.setPointerIndex(touch.identifier);
	      publicAPI.mouseMoveEvent();
	    }
	  };

	  publicAPI.handleTouchEnd = function (event) {
	    event.stopPropagation();
	    event.preventDefault();

	    var touches = event.changedTouches;
	    for (var i = 0; i < touches.length; i++) {
	      var touch = touches[i];
	      publicAPI.setEventPosition(touch.clientX, model.canvas.clientHeight - touch.clientY + 1, 0, touch.identifier);
	      publicAPI.setPointerIndex(touch.identifier);
	      publicAPI.endTouchEvent();
	    }
	  };

	  publicAPI.findPokedRenderer = function (x, y) {
	    var rc = model.view.getRenderable().getRenderers();
	    var interactiveren = null;
	    var viewportren = null;
	    var currentRenderer = null;

	    rc.forEach(function (aren) {
	      if (model.view.isInViewport(x, y, aren) && aren.getInteractive()) {
	        currentRenderer = aren;
	      }

	      if (interactiveren === null && aren.getInteractive()) {
	        // Save this renderer in case we can't find one in the viewport that
	        // is interactive.
	        interactiveren = aren;
	      }
	      if (viewportren === null && model.view.isInViewport(x, y, aren)) {
	        // Save this renderer in case we can't find one in the viewport that
	        // is interactive.
	        viewportren = aren;
	      }
	    }); // for all renderers

	    // We must have a value.  If we found an interactive renderer before, that's
	    // better than a non-interactive renderer.
	    if (currentRenderer === null) {
	      currentRenderer = interactiveren;
	    }

	    // We must have a value.  If we found a renderer that is in the viewport,
	    // that is better than any old viewport (but not as good as an interactive
	    // one).
	    if (currentRenderer === null) {
	      currentRenderer = viewportren;
	    }

	    // We must have a value - take anything.
	    if (currentRenderer == null) {
	      currentRenderer = rc[0];
	    }

	    return currentRenderer;
	  };

	  //----------------------------------------------------------------------
	  publicAPI.render = function () {
	    // if (model.renderWindow && model.enabled && model.enableRender) {
	    //   model.renderWindow.render();
	    // }
	    if (model.view && model.enabled && model.enableRender) {
	      model.view.traverseAllPasses();
	    }
	    // outside the above test so that third-party code can redirect
	    // the render to the appropriate class
	    publicAPI.invokeRenderEvent();
	  };

	  // create the generic Event methods
	  eventsWeHandle.forEach(function (eventName) {
	    var lowerFirst = eventName.charAt(0).toLowerCase() + eventName.slice(1);
	    publicAPI[lowerFirst + 'Event'] = function () {
	      if (!model.enabled) {
	        return;
	      }
	      publicAPI['invoke' + eventName]({ type: eventName });
	    };
	  });

	  //------------------------------------------------------------------
	  publicAPI.mouseMoveEvent = function () {
	    if (!model.enabled) {
	      return;
	    }

	    // are we translating multitouch into gestures?
	    if (model.recognizeGestures && model.pointersDownCount > 1) {
	      publicAPI.recognizeGesture('MouseMove');
	    } else {
	      publicAPI.invokeMouseMove({ type: 'MouseMove' });
	    }
	  };

	  // we know we are in multitouch now, so start recognizing
	  publicAPI.recognizeGesture = function (event) {
	    // more than two pointers we ignore
	    if (model.pointersDownCount > 2) {
	      return;
	    }

	    // store the initial positions
	    if (event === 'LeftButtonPress') {
	      Object.keys(model.pointersDown).forEach(function (key) {
	        model.startingEventPositions[key] = model.eventPositions[key];
	      });
	      // we do not know what the gesture is yet
	      model.currentGesture = 'Start';
	      return;
	    }

	    // end the gesture if needed
	    if (event === 'LeftButtonRelease') {
	      if (model.currentGesture === 'Pinch') {
	        publicAPI.endPinchEvent();
	      }
	      if (model.currentGesture === 'Rotate') {
	        publicAPI.endRotateEvent();
	      }
	      if (model.currentGesture === 'Pan') {
	        publicAPI.endPanEvent();
	      }
	      model.currentGesture = 'Start';
	      return;
	    }

	    // what are the two pointers we are working with
	    var count = 0;
	    var posVals = [];
	    var startVals = [];
	    Object.keys(model.pointersDown).forEach(function (key) {
	      posVals[count] = model.eventPositions[key];
	      startVals[count] = model.startingEventPositions[key];
	      count++;
	    });

	    // The meat of the algorithm
	    // on move events we analyze them to determine what type
	    // of movement it is and then deal with it.
	    if (event === 'MouseMove') {
	      // calculate the distances
	      var originalDistance = Math.sqrt((startVals[0].x - startVals[1].x) * (startVals[0].x - startVals[1].x) + (startVals[0].y - startVals[1].y) * (startVals[0].y - startVals[1].y));
	      var newDistance = Math.sqrt((posVals[0].x - posVals[1].x) * (posVals[0].x - posVals[1].x) + (posVals[0].y - posVals[1].y) * (posVals[0].y - posVals[1].y));

	      // calculate rotations
	      var originalAngle = _Math2.default.degreesFromRadians(Math.atan2(startVals[1].y - startVals[0].y, startVals[1].x - startVals[0].x));
	      var newAngle = _Math2.default.degreesFromRadians(Math.atan2(posVals[1].y - posVals[0].y, posVals[1].x - posVals[0].x));

	      // angles are cyclic so watch for that, 1 and 359 are only 2 apart :)
	      var angleDeviation = newAngle - originalAngle;
	      newAngle = newAngle + 180.0 >= 360.0 ? newAngle - 180.0 : newAngle + 180.0;
	      originalAngle = originalAngle + 180.0 >= 360.0 ? originalAngle - 180.0 : originalAngle + 180.0;
	      if (Math.abs(newAngle - originalAngle) < Math.abs(angleDeviation)) {
	        angleDeviation = newAngle - originalAngle;
	      }

	      // calculate the translations
	      var trans = [];
	      trans[0] = (posVals[0].x - startVals[0].x + posVals[1].x - startVals[1].x) / 2.0;
	      trans[1] = (posVals[0].y - startVals[0].y + posVals[1].y - startVals[1].y) / 2.0;

	      // OK we want to
	      // - immediately respond to the user
	      // - allow the user to zoom without panning (saves focal point)
	      // - allow the user to rotate without panning (saves focal point)

	      // do we know what gesture we are doing yet? If not
	      // see if we can figure it out
	      if (model.currentGesture === 'Start') {
	        // pinch is a move to/from the center point
	        // rotate is a move along the circumference
	        // pan is a move of the center point
	        // compute the distance along each of these axes in pixels
	        // the first to break thresh wins
	        var thresh = 0.01 * Math.sqrt(model.canvas.clientWidth * model.canvas.clientWidth + model.canvas.clientHeight * model.canvas.clientHeight);
	        if (thresh < 15.0) {
	          thresh = 15.0;
	        }
	        var pinchDistance = Math.abs(newDistance - originalDistance);
	        var rotateDistance = newDistance * 3.1415926 * Math.abs(angleDeviation) / 360.0;
	        var panDistance = Math.sqrt(trans[0] * trans[0] + trans[1] * trans[1]);
	        if (pinchDistance > thresh && pinchDistance > rotateDistance && pinchDistance > panDistance) {
	          model.currentGesture = 'Pinch';
	          model.scale = 1.0;
	          publicAPI.startPinchEvent();
	        } else if (rotateDistance > thresh && rotateDistance > panDistance) {
	          model.currentGesture = 'Rotate';
	          model.rotation = 0.0;
	          publicAPI.startRotateEvent();
	        } else if (panDistance > thresh) {
	          model.currentGesture = 'Pan';
	          model.translation[0] = 0.0;
	          model.translation[1] = 0.0;
	          publicAPI.startPanEvent();
	        }
	      }

	      // if we have found a specific type of movement then
	      // handle it
	      if (model.currentGesture === 'Rotate') {
	        publicAPI.setRotation(angleDeviation);
	        publicAPI.rotateEvent();
	      }

	      if (model.currentGesture === 'Pinch') {
	        publicAPI.setScale(newDistance / originalDistance);
	        publicAPI.pinchEvent();
	      }

	      if (model.currentGesture === 'Pan') {
	        publicAPI.setTranslation(trans);
	        publicAPI.panEvent();
	      }
	    }
	  };

	  publicAPI.setScale = function (scale) {
	    model.lastScale = model.scale;
	    if (model.scale !== scale) {
	      model.scale = scale;
	      publicAPI.modified();
	    }
	  };

	  publicAPI.setRotation = function (rot) {
	    model.lastRotation = model.rotation;
	    if (model.rotation !== rot) {
	      model.rotation = rot;
	      publicAPI.modified();
	    }
	  };

	  publicAPI.setTranslation = function (trans) {
	    model.lastTranslation = model.translation;
	    if (model.translation !== trans) {
	      model.translation = trans;
	      publicAPI.modified();
	    }
	  };

	  //------------------------------------------------------------------
	  publicAPI.startTouchEvent = function () {
	    if (!model.enabled) {
	      return;
	    }

	    // are we translating multitouch into gestures?
	    if (model.recognizeGestures) {
	      if (!model.pointersDown[model.pointerIndex]) {
	        model.pointersDown[model.pointerIndex] = 1;
	        model.pointersDownCount++;
	      }
	      // do we have multitouch
	      if (model.pointersDownCount > 1) {
	        // did we just transition to multitouch?
	        if (model.pointersDownCount === 2) {
	          publicAPI.invokeLeftButtonRelease({ type: 'LeftButtonRelease' });
	        }
	        // handle the gesture
	        publicAPI.recognizeGesture('LeftButtonPress');
	        return;
	      }
	    }

	    publicAPI.invokeLeftButtonPress({ type: 'LeftButtonPress' });
	  };

	  //------------------------------------------------------------------
	  publicAPI.endTouchEvent = function () {
	    if (!model.enabled) {
	      return;
	    }

	    // are we translating multitouch into gestures?
	    if (model.recognizeGestures) {
	      if (model.pointersDown[model.pointerIndex]) {
	        // do we have multitouch
	        if (model.pointersDownCount > 1) {
	          // handle the gesture
	          publicAPI.recognizeGesture('LeftButtonRelease');
	        }
	        delete model.pointersDown[model.pointerIndex];
	        if (model.startingEventPositions[model.pointerIndex]) {
	          delete model.startingEventPositions[model.pointerIndex];
	        }
	        if (model.eventPositions[model.pointerIndex]) {
	          delete model.eventPositions[model.pointerIndex];
	        }
	        if (model.lastEventPositions[model.pointerIndex]) {
	          delete model.lastEventPositions[model.pointerIndex];
	        }
	        model.pointersDownCount--;
	        publicAPI.invokeLeftButtonRelease({ type: 'LeftButtonRelease' });
	      }
	    } else {
	      publicAPI.invokeLeftButtonRelease({ type: 'LeftButtonRelease' });
	    }
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  eventPositions: null,
	  lastEventPositions: null,
	  startingEventPositions: null,
	  pointersDown: null,
	  pointersDownCount: 0,
	  pointerIndex: 0,
	  renderWindow: null,
	  interactorStyle: null,
	  picker: null,
	  pickingManager: null,
	  initialized: false,
	  enabled: false,
	  enableRender: true,
	  lightFollowCamera: true,
	  desiredUpdateRate: 10.0,
	  stillUpdateRate: 0.5,
	  shiftKey: false,
	  altKey: false,
	  controlKey: false,
	  keyCode: 0,
	  canvas: null,
	  view: null,
	  recognizeGestures: true,
	  currentGesture: 'Start',
	  scale: 1.0,
	  lastScale: 1.0,
	  translation: [],
	  lastTranslation: [],
	  rotation: 0.0,
	  lastRotation: 0.0
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Internal objects initialization
	  model.eventPositions = {};
	  model.lastEventPositions = {};
	  model.pointersDown = {};
	  model.startingEventPositions = {};

	  // Object methods
	  macro.obj(publicAPI, model);

	  macro.event(publicAPI, model, 'RenderEvent');
	  eventsWeHandle.forEach(function (eventName) {
	    return macro.event(publicAPI, model, eventName);
	  });

	  // Create get-only macros
	  macro.get(publicAPI, model, ['initialized', 'enabled', 'enableRender', 'scale', 'lastScale', 'rotation', 'lastRotation']);

	  // Create get-set macros
	  macro.setGet(publicAPI, model, ['pointerIndex', 'lightFollowCamera', 'enabled', 'shiftKey', 'controlKey', 'altKey', 'keyCode', 'view', 'recognizeGestures']);

	  macro.getArray(publicAPI, model, ['translation', 'lastTranslation']);

	  // For more macro methods, see "Sources/macro.js"

	  // Object specific methods
	  vtkRenderWindowInteractor(publicAPI, model);

	  publicAPI.setInteractorStyle(_InteractorStyleTrackballCamera2.default.newInstance());
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkRenderWindowInteractor');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _InteractorStyle = __webpack_require__(90);

	var _InteractorStyle2 = _interopRequireDefault(_InteractorStyle);

	var _Math = __webpack_require__(32);

	var _Math2 = _interopRequireDefault(_Math);

	var _Constants = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/* eslint-disable no-lonely-if */

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	// Add module-level functions or api that you want to expose statically via
	// the next section...

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	// ----------------------------------------------------------------------------
	// vtkMyClass methods
	// ----------------------------------------------------------------------------

	function vtkInteractorStyleTrackballCamera(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkInteractorStyleTrackballCamera');

	  // Public API methods
	  publicAPI.handleMouseMove = function () {
	    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());

	    switch (model.state) {
	      case _Constants.States.IS_ROTATE:
	        publicAPI.findPokedRenderer(pos.x, pos.y);
	        publicAPI.rotate();
	        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
	        break;

	      case _Constants.States.IS_PAN:
	        publicAPI.findPokedRenderer(pos.x, pos.y);
	        publicAPI.pan();
	        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
	        break;

	      case _Constants.States.IS_DOLLY:
	        publicAPI.findPokedRenderer(pos.x, pos.y);
	        publicAPI.dolly();
	        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
	        break;

	      case _Constants.States.IS_SPIN:
	        publicAPI.findPokedRenderer(pos.x, pos.y);
	        publicAPI.spin();
	        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
	        break;

	      default:
	        break;
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.handleLeftButtonPress = function () {
	    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());
	    publicAPI.findPokedRenderer(pos.x, pos.y);
	    if (model.currentRenderer === null) {
	      return;
	    }

	    publicAPI.grabFocus(model.eventCallbackCommand);
	    if (model.interactor.getShiftKey()) {
	      if (model.interactor.getControlKey() || model.interactor.getAltKey()) {
	        publicAPI.startDolly();
	      } else {
	        publicAPI.startPan();
	      }
	    } else {
	      if (model.interactor.getControlKey() || model.interactor.getAltKey()) {
	        publicAPI.startSpin();
	      } else {
	        publicAPI.startRotate();
	      }
	    }
	  };

	  //--------------------------------------------------------------------------
	  publicAPI.handleLeftButtonRelease = function () {
	    switch (model.state) {
	      case _Constants.States.IS_DOLLY:
	        publicAPI.endDolly();
	        break;

	      case _Constants.States.IS_PAN:
	        publicAPI.endPan();
	        break;

	      case _Constants.States.IS_SPIN:
	        publicAPI.endSpin();
	        break;

	      case _Constants.States.IS_ROTATE:
	        publicAPI.endRotate();
	        break;

	      default:
	        break;
	    }

	    if (model.interactor) {
	      publicAPI.releaseFocus();
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.handlePinch = function () {
	    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());
	    publicAPI.findPokedRenderer(pos.x, pos.y);
	    if (model.currentRenderer === null) {
	      return;
	    }

	    var camera = model.currentRenderer.getActiveCamera();

	    var dyf = model.interactor.getScale() / model.interactor.getLastScale();
	    if (camera.getParallelProjection()) {
	      camera.setParallelScale(camera.getParallelScale() / dyf);
	    } else {
	      camera.dolly(dyf);
	      if (model.autoAdjustCameraClippingRange) {
	        model.currentRenderer.resetCameraClippingRange();
	      }
	    }

	    if (model.interactor.getLightFollowCamera()) {
	      model.currentRenderer.updateLightsGeometryToFollowCamera();
	    }
	    model.interactor.render();
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.handlePan = function () {
	    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());
	    publicAPI.findPokedRenderer(pos.x, pos.y);
	    if (model.currentRenderer === null) {
	      return;
	    }

	    var camera = model.currentRenderer.getActiveCamera();

	    var rwi = model.interactor;

	    // Calculate the focal depth since we'll be using it a lot
	    var viewFocus = camera.getFocalPoint();

	    viewFocus = publicAPI.computeWorldToDisplay(viewFocus[0], viewFocus[1], viewFocus[2]);
	    var focalDepth = viewFocus[2];

	    var newPickPoint = publicAPI.computeDisplayToWorld(pos.x, pos.y, focalDepth);

	    var trans = rwi.getTranslation();
	    var lastTrans = rwi.getLastTranslation();
	    newPickPoint = publicAPI.computeDisplayToWorld(viewFocus[0] + trans[0] - lastTrans[0], viewFocus[1] + trans[1] - lastTrans[1], focalDepth);

	    // Has to recalc old mouse point since the viewport has moved,
	    // so can't move it outside the loop
	    var oldPickPoint = publicAPI.computeDisplayToWorld(viewFocus[0], viewFocus[1], focalDepth);

	    // Camera motion is reversed
	    var motionVector = [];
	    motionVector[0] = oldPickPoint[0] - newPickPoint[0];
	    motionVector[1] = oldPickPoint[1] - newPickPoint[1];
	    motionVector[2] = oldPickPoint[2] - newPickPoint[2];

	    viewFocus = camera.getFocalPoint();
	    var viewPoint = camera.getPosition();
	    camera.setFocalPoint(motionVector[0] + viewFocus[0], motionVector[1] + viewFocus[1], motionVector[2] + viewFocus[2]);

	    camera.setPosition(motionVector[0] + viewPoint[0], motionVector[1] + viewPoint[1], motionVector[2] + viewPoint[2]);

	    if (model.interactor.getLightFollowCamera()) {
	      model.currentRenderer.updateLightsGeometryToFollowCamera();
	    }

	    camera.orthogonalizeViewUp();
	    model.interactor.render();
	  };

	  publicAPI.handleRotate = function () {
	    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());
	    publicAPI.findPokedRenderer(pos.x, pos.y);
	    if (model.currentRenderer === null) {
	      return;
	    }

	    var camera = model.currentRenderer.getActiveCamera();

	    camera.roll(model.interactor.getRotation() - model.interactor.getLastRotation());

	    camera.orthogonalizeViewUp();
	    model.interactor.render();
	  };

	  //--------------------------------------------------------------------------
	  publicAPI.rotate = function () {
	    if (model.currentRenderer === null) {
	      return;
	    }

	    var rwi = model.interactor;

	    var lastPtr = model.interactor.getPointerIndex();
	    var pos = model.interactor.getEventPosition(lastPtr);
	    var lastPos = model.interactor.getLastEventPosition(lastPtr);

	    var dx = pos.x - lastPos.x;
	    var dy = pos.y - lastPos.y;

	    var size = rwi.getView().getViewportSize(model.currentRenderer);

	    var deltaElevation = -20.0 / size[1];
	    var deltaAzimuth = -20.0 / size[0];

	    var rxf = dx * deltaAzimuth * model.motionFactor;
	    var ryf = dy * deltaElevation * model.motionFactor;

	    var camera = model.currentRenderer.getActiveCamera();
	    camera.azimuth(rxf);
	    camera.elevation(ryf);
	    camera.orthogonalizeViewUp();

	    if (model.autoAdjustCameraClippingRange) {
	      model.currentRenderer.resetCameraClippingRange();
	    }

	    if (rwi.getLightFollowCamera()) {
	      model.currentRenderer.updateLightsGeometryToFollowCamera();
	    }

	    rwi.render();
	  };

	  //--------------------------------------------------------------------------
	  publicAPI.spin = function () {
	    if (model.currentRenderer === null) {
	      return;
	    }

	    var rwi = model.interactor;

	    var lastPtr = model.interactor.getPointerIndex();
	    var pos = model.interactor.getEventPosition(lastPtr);
	    var lastPos = model.interactor.getLastEventPosition(lastPtr);

	    var camera = model.currentRenderer.getActiveCamera();
	    var center = rwi.getView().getViewportCenter(model.currentRenderer);

	    var newAngle = _Math2.default.degreesFromRadians(Math.atan2(pos.y - center[1], pos.x - center[0]));

	    var oldAngle = _Math2.default.degreesFromRadians(Math.atan2(lastPos.y - center[1], lastPos.x - center[0]));

	    camera.roll(newAngle - oldAngle);
	    camera.orthogonalizeViewUp();

	    rwi.render();
	  };

	  publicAPI.pan = function () {
	    if (model.currentRenderer === null) {
	      return;
	    }

	    var rwi = model.interactor;

	    var lastPtr = model.interactor.getPointerIndex();
	    var pos = model.interactor.getEventPosition(lastPtr);
	    var lastPos = model.interactor.getLastEventPosition(lastPtr);

	    var camera = model.currentRenderer.getActiveCamera();

	    // Calculate the focal depth since we'll be using it a lot
	    var viewFocus = camera.getFocalPoint();
	    viewFocus = publicAPI.computeWorldToDisplay(viewFocus[0], viewFocus[1], viewFocus[2]);
	    var focalDepth = viewFocus[2];

	    var newPickPoint = publicAPI.computeDisplayToWorld(pos.x, pos.y, focalDepth);

	    // Has to recalc old mouse point since the viewport has moved,
	    // so can't move it outside the loop
	    var oldPickPoint = publicAPI.computeDisplayToWorld(lastPos.x, lastPos.y, focalDepth);

	    // Camera motion is reversed
	    var motionVector = [];
	    motionVector[0] = oldPickPoint[0] - newPickPoint[0];
	    motionVector[1] = oldPickPoint[1] - newPickPoint[1];
	    motionVector[2] = oldPickPoint[2] - newPickPoint[2];

	    viewFocus = camera.getFocalPoint();
	    var viewPoint = camera.getPosition();
	    camera.setFocalPoint(motionVector[0] + viewFocus[0], motionVector[1] + viewFocus[1], motionVector[2] + viewFocus[2]);

	    camera.setPosition(motionVector[0] + viewPoint[0], motionVector[1] + viewPoint[1], motionVector[2] + viewPoint[2]);

	    if (rwi.getLightFollowCamera()) {
	      model.currentRenderer.updateLightsGeometryToFollowCamera();
	    }

	    rwi.render();
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.dolly = function () {
	    if (model.currentRenderer === null) {
	      return;
	    }

	    var lastPtr = model.interactor.getPointerIndex();
	    var pos = model.interactor.getEventPosition(lastPtr);
	    var lastPos = model.interactor.getLastEventPosition(lastPtr);

	    var dy = pos.y - lastPos.y;
	    var rwi = model.interactor;
	    var center = rwi.getView().getViewportCenter(model.currentRenderer);
	    var dyf = model.motionFactor * dy / center[1];

	    publicAPI.dollyByFactor(Math.pow(1.1, dyf));
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.dollyByFactor = function (factor) {
	    if (model.currentRenderer === null) {
	      return;
	    }

	    var rwi = model.interactor;

	    var camera = model.currentRenderer.getActiveCamera();
	    if (camera.getParallelProjection()) {
	      camera.setParallelScale(camera.getParallelScale() / factor);
	    } else {
	      camera.dolly(factor);
	      if (model.autoAdjustCameraClippingRange) {
	        model.currentRenderer.resetCameraClippingRange();
	      }
	    }

	    if (rwi.getLightFollowCamera()) {
	      model.currentRenderer.updateLightsGeometryToFollowCamera();
	    }

	    rwi.render();
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  motionFactor: 10.0
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _InteractorStyle2.default.extend(publicAPI, model);

	  // Object methods
	  macro.obj(publicAPI, model);

	  // Create get-only macros
	  // macro.get(publicAPI, model, ['myProp2', 'myProp4']);

	  // Create get-set macros
	  macro.setGet(publicAPI, model, ['motionFactor']);

	  // For more macro methods, see "Sources/macro.js"

	  // Object specific methods
	  vtkInteractorStyleTrackballCamera(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _InteractorObserver = __webpack_require__(91);

	var _InteractorObserver2 = _interopRequireDefault(_InteractorObserver);

	var _Constants = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// { ENUM_1: 0, ENUM_2: 1, ... }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	// Add module-level functions or api that you want to expose statically via
	// the next section...

	var stateNames = {
	  Rotate: _Constants.States.IS_ROTATE,
	  Pan: _Constants.States.IS_PAN,
	  Spin: _Constants.States.IS_SPIN,
	  Dolly: _Constants.States.IS_DOLLY,
	  Zoom: _Constants.States.IS_ZOOM,
	  Timer: _Constants.States.IS_TIMER,
	  TwoPointer: _Constants.States.IS_TWO_POINTER,
	  UniformScale: _Constants.States.IS_USCALE
	};

	var events = ['Enter', 'Leave', 'MouseMove', 'LeftButtonPress', 'LeftButtonRelease', 'MiddleButtonPress', 'MiddleButtonRelease', 'RightButtonPress', 'RightButtonRelease', 'MouseWheelForward', 'MouseWheelBackward', 'Expose', 'Configure', 'Timer', 'KeyPress', 'KeyRelease', 'Char', 'Delete', 'Pinch', 'Pan', 'Rotate', 'Tap', 'LongTap', 'Swipe'];

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	// ----------------------------------------------------------------------------
	// vtkMyClass methods
	// ----------------------------------------------------------------------------

	function vtkInteractorStyle(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkInteractorStyle');

	  // Public API methods
	  publicAPI.setInteractor = function (i) {
	    if (i === model.interactor) {
	      return;
	    }

	    // if we already have an Interactor then stop observing it
	    if (model.interactor) {
	      model.unsubscribes.forEach(function (val) {
	        return val.unsubscribe();
	      });
	      model.unsubscribes.clear();
	    }

	    model.interactor = i;

	    if (i) {
	      events.forEach(function (eventName) {
	        model.unsubscribes.set(eventName, i['on' + eventName](function () {
	          if (publicAPI['handle' + eventName]) {
	            publicAPI['handle' + eventName]();
	          }
	        }));
	      });
	    }
	  };

	  // create bunch of Start/EndState methods
	  Object.keys(stateNames).forEach(function (key) {
	    publicAPI['start' + key] = function () {
	      if (model.state !== _Constants.States.IS_NONE) {
	        return;
	      }
	      publicAPI.startState(stateNames[key]);
	    };
	    publicAPI['end' + key] = function () {
	      if (model.state !== stateNames[key]) {
	        return;
	      }
	      publicAPI.stopState();
	    };
	  });

	  //----------------------------------------------------------------------------
	  publicAPI.handleChar = function () {
	    var rwi = model.interactor;

	    var pos = null;

	    switch (rwi.getKeyCode()) {
	      case 'r':
	      case 'R':
	        pos = model.interactor.getEventPosition(rwi.getPointerIndex());
	        publicAPI.findPokedRenderer(pos.x, pos.y);
	        if (model.currentRenderer !== 0) {
	          model.currentRenderer.resetCamera();
	        } else {
	          console.warn('no current renderer on the interactor style.');
	        }
	        rwi.render();
	        break;

	      case 'w':
	      case 'W':
	        pos = model.interactor.getEventPosition(rwi.getPointerIndex());
	        publicAPI.findPokedRenderer(pos.x, pos.y);
	        if (model.currentRenderer !== 0) {
	          var ac = model.currentRenderer.getActors();
	          ac.forEach(function (anActor) {
	            anActor.getProperty().setRepresentationToWireframe();
	          });
	        } else {
	          console.warn('no current renderer on the interactor style.');
	        }
	        rwi.render();
	        break;

	      case 's':
	      case 'S':
	        pos = model.interactor.getEventPosition(rwi.getPointerIndex());
	        publicAPI.findPokedRenderer(pos.x, pos.y);
	        if (model.currentRenderer !== 0) {
	          var _ac = model.currentRenderer.getActors();
	          _ac.forEach(function (anActor) {
	            anActor.getProperty().setRepresentationToSurface();
	          });
	        } else {
	          console.warn('no current renderer on the interactor style.');
	        }
	        rwi.render();
	        break;

	      case 'v':
	      case 'V':
	        pos = model.interactor.getEventPosition(rwi.getPointerIndex());
	        publicAPI.findPokedRenderer(pos.x, pos.y);
	        if (model.currentRenderer !== 0) {
	          var _ac2 = model.currentRenderer.getActors();
	          _ac2.forEach(function (anActor) {
	            anActor.getProperty().setRepresentationToPoints();
	          });
	        } else {
	          console.warn('no current renderer on the interactor style.');
	        }
	        rwi.render();
	        break;

	      default:
	        break;
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.findPokedRenderer = function (x, y) {
	    publicAPI.setCurrentRenderer(model.interactor.findPokedRenderer(x, y));
	  };

	  publicAPI.startState = function (state) {
	    model.state = state;
	    if (model.animationState === _Constants.States.IS_ANIM_OFF) {
	      var rwi = model.interactor;
	      rwi.getRenderWindow().setDesiredUpdateRate(rwi.getDesiredUpdateRate());
	      model.invokeStartInteractionEvent({ type: 'StartInteractionEvent' });
	    }
	  };

	  publicAPI.stopState = function () {
	    model.state = _Constants.States.IS_NONE;
	    if (model.animationState === _Constants.States.IS_ANIM_OFF) {
	      var rwi = model.interactor;
	      rwi.getRenderWindow().setDesiredUpdateRate(rwi.getStillUpdateRate());
	      publicAPI.invokeEndInteractionEvent({ type: 'EndInteractionEvent' });
	      rwi.render();
	    }
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  state: _Constants.States.IS_NONE,
	  animState: _Constants.States.IS_ANIM_OFF,
	  handleObservers: 1,
	  autoAdjustCameraClippingRange: 1,
	  unsubscribes: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _InteractorObserver2.default.extend(publicAPI, model);

	  // Object methods
	  macro.obj(publicAPI, model);

	  model.unsubscribes = new Map();

	  // Object specific methods
	  vtkInteractorStyle(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkInteractorStyle');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function vtkInteractorObserver(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkInteractorObserver');

	  // Public API methods
	  publicAPI.setInteractor = function (i) {
	    if (i === model.interactor) {
	      return;
	    }

	    // Since the observer mediator is bound to the interactor, reset it to
	    // 0 so that the next time it is requested, it is queried from the
	    // new interactor.
	    // Furthermore, remove ourself from the mediator queue.

	    // if (this->ObserverMediator)
	    //   {
	    //   this->ObserverMediator->RemoveAllCursorShapeRequests(this);
	    //   this->ObserverMediator = 0;
	    //   }

	    // if we already have an Interactor then stop observing it
	    if (model.interactor) {
	      publicAPI.setEnabled(false); // disable the old interactor
	      model.charObserverTag();
	      model.charObserverTag = null;
	      model.deleteObserverTag();
	      model.deleteObserverTag = null;
	    }

	    model.interactor = i;

	    // add observers for each of the events handled in ProcessEvents
	    if (i) {
	      model.charObserverTag = i.onCharEvent(publicAPI.keyPressCallbackCommand);
	      //                                           this->Priority);
	      model.deleteObserverTag = i.onDeleteEvent(publicAPI.keyPressCallbackCommand);
	      //                                           this->Priority);
	      // publicAPI.registerPickers();
	    }

	    publicAPI.modified();
	  };

	  //----------------------------------------------------------------------------
	  // Description:
	  // Transform from display to world coordinates.
	  publicAPI.computeDisplayToWorld = function (x, y, z) {
	    if (!model.currentRenderer) {
	      return null;
	    }

	    var ndp = model.interactor.getView().displayToNormalizedDisplay(x, y, z);

	    return model.currentRenderer.normalizedDisplayToWorld(ndp[0], ndp[1], ndp[2]);
	  };

	  //----------------------------------------------------------------------------
	  // Description:
	  // Transform from world to display coordinates.
	  publicAPI.computeWorldToDisplay = function (x, y, z) {
	    if (!model.currentRenderer) {
	      return null;
	    }

	    var ndp = model.currentRenderer.worldToNormalizedDisplay(x, y, z);

	    return model.interactor.getView().normalizedDisplayToDisplay(ndp[0], ndp[1], ndp[2]);
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.grabFocus = function () {
	    // void vtkInteractorObserver::GrabFocus(vtkCommand *mouseEvents, vtkCommand *keypressEvents)
	    // {
	    //   if ( this->Interactor )
	    //     {
	    //     this->Interactor->GrabFocus(mouseEvents,keypressEvents);
	    //     }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.releaseFocus = function () {
	    // void vtkInteractorObserver::ReleaseFocus()
	    // {
	    //   if ( this->Interactor )
	    //     {
	    //     this->Interactor->ReleaseFocus();
	    //     }
	  };

	  // //----------------------------------------------------------------------------
	  // void vtkInteractorObserver::StartInteraction()
	  // {
	  //   this->Interactor->GetRenderWindow()->SetDesiredUpdateRate(this->Interactor->GetDesiredUpdateRate());
	  // }

	  // //----------------------------------------------------------------------------
	  // void vtkInteractorObserver::EndInteraction()
	  // {
	  //   this->Interactor->GetRenderWindow()->SetDesiredUpdateRate(this->Interactor->GetStillUpdateRate());
	  // }
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  enabled: false,
	  interactor: null,
	  currentRenderer: null,
	  defaultRenderer: null,
	  priority: 0.0,
	  keyPressActivationValue: 'i',
	  charObserverTag: null,
	  deleteObserverTag: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);

	  macro.event(publicAPI, model, 'InteractionEvent');
	  macro.event(publicAPI, model, 'StartInteractionEvent');
	  macro.event(publicAPI, model, 'EndInteractionEvent');

	  // Create get-only macros
	  macro.get(publicAPI, model, ['interactor']);

	  // Create get-set macros
	  macro.setGet(publicAPI, model, ['priority', 'currentRenderer']);

	  // For more macro methods, see "Sources/macro.js"

	  // Object specific methods
	  vtkInteractorObserver(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkInteractorObserver');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ },
/* 92 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var States = exports.States = {
	  IS_START: 0,
	  IS_NONE: 0,

	  IS_ROTATE: 1,
	  IS_PAN: 2,
	  IS_SPIN: 3,
	  IS_DOLLY: 4,
	  IS_ZOOM: 5,
	  IS_USCALE: 6,
	  IS_TIMER: 7,
	  IS_FORWARDFLY: 8,
	  IS_REVERSEFLY: 9,
	  IS_TWO_POINTER: 10,

	  IS_ANIM_OFF: 0,
	  IS_ANIM_ON: 1,

	  IS_WINDOW_LEVEL: 1024,
	  IS_PICK: 1025,
	  IS_SLICE: 1026
	};

	exports.default = {
	  States: States
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(68);

	var _DataArray = __webpack_require__(67);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkPoints methods
	// ----------------------------------------------------------------------------

	function vtkPoints(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkPoints');

	  // Forwarding methods
	  publicAPI.getNumberOfPoints = publicAPI.getNumberOfTuples;

	  publicAPI.setNumberOfPoints = function (nbPoints) {
	    var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

	    if (publicAPI.getNumberOfPoints() !== nbPoints) {
	      model.size = nbPoints * dimension;
	      model.values = new window[model.dataType](model.size);
	      publicAPI.setNumberOfComponents(dimension);
	      publicAPI.modified();
	    }
	  };

	  publicAPI.setPoint = function (idx) {
	    for (var _len = arguments.length, xyz = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      xyz[_key - 1] = arguments[_key];
	    }

	    var offset = idx * model.numberOfComponents;
	    for (var i = 0; i < model.numberOfComponents; i++) {
	      model.values[offset + i] = xyz[i];
	    }
	  };

	  publicAPI.getPoint = publicAPI.getTuple;

	  publicAPI.getBounds = function () {
	    if (publicAPI.getNumberOfComponents() === 3) {
	      return [].concat(publicAPI.getRange(0), publicAPI.getRange(1), publicAPI.getRange(2));
	    }

	    if (publicAPI.getNumberOfComponents() !== 2) {
	      console.error('getBounds called on an array with components of ', publicAPI.getNumberOfComponents());
	      return [1, -1, 1, -1, 1, -1];
	    }

	    return [].concat(publicAPI.getRange(0), publicAPI.getRange(1));
	  };

	  // Trigger the computation of bounds
	  publicAPI.computeBounds = publicAPI.getBounds;
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  empty: true,
	  numberOfComponents: 3,
	  dataType: _Constants.VtkDataTypes.FLOAT
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  _DataArray2.default.extend(publicAPI, model, initialValues);
	  vtkPoints(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkPoints');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _vtk = __webpack_require__(4);

	var _vtk2 = _interopRequireDefault(_vtk);

	var _PointSet = __webpack_require__(95);

	var _PointSet2 = _interopRequireDefault(_PointSet);

	var _CellArray = __webpack_require__(100);

	var _CellArray2 = _interopRequireDefault(_CellArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------

	var POLYDATA_FIELDS = ['verts', 'lines', 'polys', 'strips'];

	// ----------------------------------------------------------------------------
	// vtkPolyData methods
	// ----------------------------------------------------------------------------

	function vtkPolyData(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkPolyData');

	  function camelize(str) {
	    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
	      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
	    }).replace(/\s+/g, '');
	  }

	  // build empty cell arrays and set methods
	  POLYDATA_FIELDS.forEach(function (type) {
	    publicAPI['getNumberOf' + camelize(type)] = function () {
	      return model[type].getNumberOfCells();
	    };
	    if (!model[type]) {
	      model[type] = _CellArray2.default.newInstance();
	    } else {
	      model[type] = (0, _vtk2.default)(model[type]);
	    }
	  });

	  publicAPI.getNumberOfCells = function () {
	    return POLYDATA_FIELDS.reduce(function (num, cellType) {
	      return num + model[cellType].getNumberOfCells();
	    }, 0);
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  // verts: null,
	  // lines: null,
	  // polys: null,
	  // strips: null,
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _PointSet2.default.extend(publicAPI, model, initialValues);
	  macro.setGet(publicAPI, model, ['verts', 'lines', 'polys', 'strips']);

	  // Object specific methods
	  vtkPolyData(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkPolyData');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _vtk = __webpack_require__(4);

	var _vtk2 = _interopRequireDefault(_vtk);

	var _DataSet = __webpack_require__(96);

	var _DataSet2 = _interopRequireDefault(_DataSet);

	var _Points = __webpack_require__(93);

	var _Points2 = _interopRequireDefault(_Points);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	// ----------------------------------------------------------------------------
	// vtkPointSet methods
	// ----------------------------------------------------------------------------

	function vtkPointSet(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkPointSet');

	  // Create empty points
	  if (!model.points) {
	    model.points = _Points2.default.newInstance();
	  } else {
	    model.points = (0, _vtk2.default)(model.points);
	  }

	  publicAPI.getBounds = function () {
	    return model.points.getBounds();
	  };

	  publicAPI.computeBounds = function () {
	    publicAPI.getBounds();
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  // points: null,
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _DataSet2.default.extend(publicAPI, model, initialValues);
	  macro.setGet(publicAPI, model, ['points']);

	  // Object specific methods
	  vtkPointSet(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkPointSet');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _vtk = __webpack_require__(4);

	var _vtk2 = _interopRequireDefault(_vtk);

	var _DataSetAttributes = __webpack_require__(97);

	var _DataSetAttributes2 = _interopRequireDefault(_DataSetAttributes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// import vtkBoundingBox from '../BoundingBox';
	// import vtkMath from '../../Core/Math';
	//
	// function getBounds(dataset) {
	//   if (dataset.bounds) {
	//     return dataset.bounds;
	//   }
	//   if (dataset.type && dataset[dataset.type]) {
	//     const ds = dataset[dataset.type];
	//     if (ds.bounds) {
	//       return ds.bounds;
	//     }
	//     if (ds.Points && ds.Points.bounds) {
	//       return ds.Points.bounds;
	//     }

	//     if (ds.Points && ds.Points.values) {
	//       const array = ds.Points.values;
	//       const bbox = vtkBoundingBox.newInstance();
	//       const size = array.length;
	//       const delta = ds.Points.numberOfComponents ? ds.Points.numberOfComponents : 3;
	//       for (let idx = 0; idx < size; idx += delta) {
	//         bbox.addPoint(array[idx * delta], array[(idx * delta) + 1], array[(idx * delta) + 2]);
	//       }
	//       ds.Points.bounds = bbox.getBounds();
	//       return ds.Points.bounds;
	//     }
	//   }
	//   return vtkMath.createUninitializedBounds();
	// }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	var DATASET_FIELDS = ['pointData', 'cellData', 'fieldData'];

	// ----------------------------------------------------------------------------
	// vtkDataSet methods
	// ----------------------------------------------------------------------------

	function vtkDataSet(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkDataSet');

	  // Add dataset attributes
	  DATASET_FIELDS.forEach(function (fieldName) {
	    if (!model[fieldName]) {
	      model[fieldName] = _DataSetAttributes2.default.newInstance();
	    } else {
	      model[fieldName] = (0, _vtk2.default)(model[fieldName]);
	    }
	  });
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  // pointData: null,
	  // cellData: null,
	  // fieldData: null,
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);
	  macro.setGet(publicAPI, model, DATASET_FIELDS);

	  // Object specific methods
	  vtkDataSet(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkDataSet');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _FieldData = __webpack_require__(98);

	var _FieldData2 = _interopRequireDefault(_FieldData);

	var _Constants = __webpack_require__(99);

	var _DataArray = __webpack_require__(67);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	var _vtk = __webpack_require__(4);

	var _vtk2 = _interopRequireDefault(_vtk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkDataSetAttributes methods
	// ----------------------------------------------------------------------------

	/* eslint-disable no-unused-vars */
	// Needed so the VTK factory is filled with them
	function vtkDataSetAttributes(publicAPI, model) {
	  var attrTypes = ['Scalars', 'Vectors', 'Normals', 'TCoords', 'Tensors', 'GlobalIds', 'PedigreeIds'];

	  function cleanAttributeType(attType) {
	    // Given an integer or string, convert the result to one of the
	    // strings in the "attrTypes" array above or null (if
	    // no match is found)
	    var cleanAttType = attrTypes.find(function (ee) {
	      return _Constants.AttributeTypes[ee.toUpperCase()] === attType || typeof attType !== 'number' && ee.toLowerCase() === attType.toLowerCase();
	    });
	    if (typeof cleanAttType === 'undefined') {
	      cleanAttType = null;
	    }
	    return cleanAttType;
	  }

	  // Set our className
	  model.classHierarchy.push('vtkDataSetAttributes');

	  publicAPI.checkNumberOfComponents = function (x) {
	    return true;
	  }; // TODO

	  publicAPI.setAttribute = function (arr, uncleanAttType) {
	    var attType = cleanAttributeType(uncleanAttType);
	    if (arr && attType.toUpperCase() === 'PEDIGREEIDS' && !arr.isA('vtkDataArray')) {
	      console.warn('Can not set attribute ' + attType + '. The attribute must be a vtkDataArray.');
	      return -1;
	    }
	    if (arr && !publicAPI.checkNumberOfComponents(arr, attType)) {
	      console.warn('Can not set attribute ' + attType + '. Incorrect number of components.');
	      return -1;
	    }
	    var currentAttribute = model['active' + attType];
	    if (currentAttribute >= 0 && currentAttribute < model.arrays.length) {
	      if (model.arrays[currentAttribute] === arr) {
	        return currentAttribute;
	      }
	      publicAPI.removeArrayByIndex(currentAttribute);
	    }

	    if (arr) {
	      currentAttribute = publicAPI.addArray(arr);
	      model['active' + attType] = currentAttribute;
	    } else {
	      model['active' + attType] = -1;
	    }
	    publicAPI.modified();
	    return model['active' + attType];
	  };

	  publicAPI.setActiveAttributeByName = function (arrayName, attType) {
	    return publicAPI.setActiveAttributeByIndex(publicAPI.getArrayWithIndex(arrayName).index, attType);
	  };

	  publicAPI.setActiveAttributeByIndex = function (arrayIdx, uncleanAttType) {
	    var attType = cleanAttributeType(uncleanAttType);
	    if (arrayIdx >= 0 && arrayIdx < model.arrays.length) {
	      if (attType.toUpperCase() !== 'PEDIGREEIDS') {
	        var arr = publicAPI.getArrayByIndex(arrayIdx);
	        if (!arr.isA('vtkDataArray')) {
	          console.warn('Can not set attribute ' + attType + '. Only vtkDataArray subclasses can be set as active attributes.');
	          return -1;
	        }
	        if (!publicAPI.checkNumberOfComponents(arr, attType)) {
	          console.warn('Can not set attribute ' + attType + '. Incorrect number of components.');
	          return -1;
	        }
	      }
	      model['active' + attType] = arrayIdx;
	      publicAPI.modified();
	      return arrayIdx;
	    } else if (arrayIdx === -1) {
	      model['active' + attType] = arrayIdx;
	      publicAPI.modified();
	    }
	    return -1;
	  };

	  publicAPI.getActiveAttribute = function (attType) {
	    // Given an integer enum value or a string (with random capitalization),
	    // find the matching string in attrTypes.
	    var cleanAttType = cleanAttributeType(attType);
	    return publicAPI['get' + cleanAttType]();
	  };

	  attrTypes.forEach(function (value) {
	    publicAPI['get' + value] = function () {
	      return publicAPI.getArrayByIndex(model['active' + value]);
	    };
	    publicAPI['set' + value] = function (da) {
	      return publicAPI.setAttribute(da, value);
	    };
	    publicAPI['setActive' + value] = function (arrayName) {
	      return publicAPI.setActiveAttributeByIndex(publicAPI.getArrayWithIndex(arrayName).index, value);
	    };
	  });

	  publicAPI.initialize = macro.chain(publicAPI.initialize, function () {
	    // Default to copying all attributes in every circumstance:
	    model.copyAttributeFlags = [];
	    Object.keys(_Constants.AttributeCopyOperations).filter(function (op) {
	      return op !== 'ALLCOPY';
	    }).forEach(function (attCopyOp) {
	      model.copyAttributeFlags[_Constants.AttributeCopyOperations[attCopyOp]] = Object.keys(_Constants.AttributeTypes).filter(function (ty) {
	        return ty !== 'NUM_ATTRIBUTES';
	      }).reduce(function (a, b) {
	        a[_Constants.AttributeTypes[b]] = true;return a;
	      }, []);
	    });
	    // Override some operations where we don't want to copy:
	    model.copyAttributeFlags[_Constants.AttributeCopyOperations.COPYTUPLE][_Constants.AttributeTypes.GLOBALIDS] = false;
	    model.copyAttributeFlags[_Constants.AttributeCopyOperations.INTERPOLATE][_Constants.AttributeTypes.GLOBALIDS] = false;
	    model.copyAttributeFlags[_Constants.AttributeCopyOperations.COPYTUPLE][_Constants.AttributeTypes.PEDIGREEIDS] = false;
	  });

	  // Process dataArrays if any
	  if (model.dataArrays && Object.keys(model.dataArrays).length) {
	    Object.keys(model.dataArrays).forEach(function (name) {
	      if (!model.dataArrays[name].ref && model.dataArrays[name].type === 'vtkDataArray') {
	        publicAPI.addArray(_DataArray2.default.newInstance(model.dataArrays[name]));
	      }
	    });
	  }
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	// import vtkStringArray from '../../../Common/Core/vtkStringArray';

	var DEFAULT_VALUES = {
	  activeScalars: -1,
	  activeVectors: -1,
	  activeTensors: -1,
	  activeNormals: -1,
	  activeTCoords: -1,
	  activeGlobalIds: -1,
	  activePedigreeIds: -1
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  _FieldData2.default.extend(publicAPI, model, initialValues);
	  macro.setGet(publicAPI, model, ['activeScalars', 'activeNormals', 'activeTCoords', 'activeVectors', 'activeTensors', 'activeGlobalIds', 'activePedigreeIds']);

	  if (!model.arrays) {
	    model.arrays = {};
	  }

	  // Object specific methods
	  vtkDataSetAttributes(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkDataSetAttributes');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _DataArray = __webpack_require__(67);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	var _vtk = __webpack_require__(4);

	var _vtk2 = _interopRequireDefault(_vtk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkDataSetAttributes methods
	// ----------------------------------------------------------------------------

	/* eslint-disable no-unused-vars */
	// Needed so the VTK factory is filled with them
	function vtkFieldData(publicAPI, model) {
	  model.classHierarchy.push('vtkFieldData');
	  var superGetState = publicAPI.getState;

	  // Decode serialized data if any
	  if (model.arrays) {
	    model.arrays = model.arrays.map(function (item) {
	      return { data: (0, _vtk2.default)(item.data) };
	    });
	  }

	  publicAPI.initialize = function () {
	    publicAPI.initializeFields();
	    publicAPI.copyAllOn();
	    publicAPI.clearFieldFlags();
	  };

	  publicAPI.initializeFields = function () {
	    model.arrays = [];
	    model.copyFieldFlags = {};
	    publicAPI.modified();
	  };

	  publicAPI.copyStructure = function (other) {
	    publicAPI.initializeFields();
	    model.copyFieldFlags = other.getCopyFieldFlags().map(function (x) {
	      return x;
	    }); // Deep-copy
	    model.arrays = other.arrays().map(function (x) {
	      return { array: x };
	    }); // Deep-copy
	    // TODO: Copy array information objects (once we support information objects)
	  };

	  publicAPI.getNumberOfArrays = function () {
	    return model.arrays.length;
	  };
	  publicAPI.getNumberOfActiveArrays = function () {
	    return model.arrays.length;
	  };
	  publicAPI.addArray = function (arr) {
	    model.arrays = [].concat(model.arrays, { data: arr });return model.arrays.length - 1;
	  };
	  publicAPI.removeArray = function (arrayName) {
	    model.arrays = model.arrays.filter(function (entry) {
	      return arrayName === entry.data.getName();
	    });
	  };
	  publicAPI.removeArrayByIndex = function (arrayIdx) {
	    model.arrays = model.arrays.filter(function (entry, idx) {
	      return idx === arrayIdx;
	    });
	  };
	  publicAPI.getArrays = function () {
	    return model.arrays.map(function (entry) {
	      return entry.data;
	    });
	  };
	  publicAPI.getArray = function (arraySpec) {
	    return typeof arraySpec === 'number' ? publicAPI.getArrayByIndex(arraySpec) : publicAPI.getArrayByName(arraySpec);
	  };
	  publicAPI.getArrayByName = function (arrayName) {
	    return model.arrays.reduce(function (a, b, i) {
	      return b.data.getName() === arrayName ? b.data : a;
	    }, null);
	  };
	  publicAPI.getArrayWithIndex = function (arrayName) {
	    return model.arrays.reduce(function (a, b, i) {
	      return b.data && b.data.getName() === arrayName ? { array: b.data, index: i } : a;
	    }, { array: null, index: -1 });
	  };
	  publicAPI.getArrayByIndex = function (idx) {
	    return idx >= 0 && idx < model.arrays.length ? model.arrays[idx].data : null;
	  };
	  publicAPI.hasArray = function (arrayName) {
	    return publicAPI.getArrayWithIndex(arrayName).index >= 0;
	  };
	  publicAPI.getArrayName = function (idx) {
	    var arr = model.arrays[idx];
	    return arr ? arr.data.getName() : '';
	  };
	  publicAPI.getCopyFieldFlags = function () {
	    return model.copyFieldFlags;
	  };
	  publicAPI.getFlag = function (arrayName) {
	    return model.copyFieldFlags[arrayName];
	  };
	  publicAPI.passData = function (other) {
	    other.getArrays().forEach(function (arr, idx) {
	      var copyFlag = publicAPI.getFlag(arr.getName());
	      if (copyFlag !== false && !(model.doCopyAllOff && copyFlag !== true) && arr) {
	        publicAPI.addArray(arr);
	      }
	    });
	  };
	  publicAPI.copyFieldOn = function (arrayName) {
	    model.copyFieldFlags[arrayName] = true;
	  };
	  publicAPI.copyFieldOff = function (arrayName) {
	    model.copyFieldFlags[arrayName] = false;
	  };
	  publicAPI.copyAllOn = function () {
	    if (!model.doCopyAllOn || model.doCopyAllOff) {
	      model.doCopyAllOn = true;
	      model.doCopyAllOff = false;
	      publicAPI.modified();
	    }
	  };
	  publicAPI.copyAllOff = function () {
	    if (model.doCopyAllOn || !model.doCopyAllOff) {
	      model.doCopyAllOn = false;
	      model.doCopyAllOff = true;
	      publicAPI.modified();
	    }
	  };
	  publicAPI.clearFieldFlags = function () {
	    model.copyFieldFlags = {};
	  };
	  publicAPI.deepCopy = function (other) {
	    model.arrays = other.getArrays().map(function (arr) {
	      var arrNew = arr.newClone();
	      arrNew.deepCopy(arr);
	      return { data: arrNew };
	    });
	  };
	  publicAPI.copyFlags = function (other) {
	    return other.getCopyFieldFlags().map(function (x) {
	      return x;
	    });
	  };
	  // TODO: publicAPI.squeeze = () => model.arrays.forEach(entry => entry.data.squeeze());
	  publicAPI.reset = function () {
	    return model.arrays.forEach(function (entry) {
	      return entry.data.reset();
	    });
	  };
	  // TODO: getActualMemorySize
	  publicAPI.getMTime = function () {
	    return model.arrays.reduce(function (a, b) {
	      return b.data.getMTime() > a ? b.data.getMTime() : a;
	    }, model.mtime);
	  };
	  // TODO: publicAPI.getField = (ids, other) => { copy ids from other into this model's arrays }
	  // TODO: publicAPI.getArrayContainingComponent = (component) => ...
	  publicAPI.getNumberOfComponents = function () {
	    return model.arrays.reduce(function (a, b) {
	      return a + b.data.getNumberOfComponents();
	    }, 0);
	  };
	  publicAPI.getNumberOfTuples = function () {
	    return model.arrays.length > 0 ? model.arrays[0].getNumberOfTuples() : 0;
	  };

	  publicAPI.getState = function () {
	    var result = superGetState();
	    result.arrays = model.arrays.map(function (item) {
	      return { data: item.data.getState() };
	    });
	    return result;
	  };
	}

	var DEFAULT_VALUES = {
	  arrays: [],
	  copyFieldFlags: [], // fields not to copy
	  doCopyAllOn: true,
	  doCopyAllOff: false
	};

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  macro.obj(publicAPI, model);

	  vtkFieldData(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkFieldData');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var AttributeTypes = exports.AttributeTypes = {
	  SCALARS: 0,
	  VECTORS: 1,
	  NORMALS: 2,
	  TCOORDS: 3,
	  TENSORS: 4,
	  GLOBALIDS: 5,
	  PEDIGREEIDS: 6,
	  EDGEFLAG: 7,
	  NUM_ATTRIBUTES: 8
	};

	var AttributeLimitTypes = exports.AttributeLimitTypes = {
	  MAX: 0,
	  EXACT: 1,
	  NOLIMIT: 2
	};

	var CellGhostTypes = exports.CellGhostTypes = {
	  DUPLICATECELL: 1, // the cell is present on multiple processors
	  HIGHCONNECTIVITYCELL: 2, // the cell has more neighbors than in a regular mesh
	  LOWCONNECTIVITYCELL: 4, // the cell has less neighbors than in a regular mesh
	  REFINEDCELL: 8, // other cells are present that refines it.
	  EXTERIORCELL: 16, // the cell is on the exterior of the data set
	  HIDDENCELL: 32 };

	var PointGhostTypes = exports.PointGhostTypes = {
	  DUPLICATEPOINT: 1, // the cell is present on multiple processors
	  HIDDENPOINT: 2 };

	var AttributeCopyOperations = exports.AttributeCopyOperations = {
	  COPYTUPLE: 0,
	  INTERPOLATE: 1,
	  PASSDATA: 2,
	  ALLCOPY: 3 };

	var ghostArrayName = exports.ghostArrayName = 'vtkGhostType';

	exports.default = {
	  AttributeTypes: AttributeTypes,
	  AttributeLimitTypes: AttributeLimitTypes,
	  CellGhostTypes: CellGhostTypes,
	  PointGhostTypes: PointGhostTypes,
	  ghostArrayName: ghostArrayName,
	  AttributeCopyOperations: AttributeCopyOperations
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(68);

	var _DataArray = __webpack_require__(67);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

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
	  extractCellSizes: extractCellSizes,
	  getNumberOfCells: getNumberOfCells
	};

	// ----------------------------------------------------------------------------
	// vtkCellArray methods
	// ----------------------------------------------------------------------------

	function vtkCellArray(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkCellArray');

	  publicAPI.getNumberOfCells = function (recompute) {
	    if (model.numberOfCells !== undefined && !recompute) {
	      return model.numberOfCells;
	    }

	    model.cellSizes = extractCellSizes(model.values);
	    model.numberOfCells = model.cellSizes.length;
	    return model.numberOfCells;
	  };

	  publicAPI.getCellSizes = function (recompute) {
	    if (model.cellSizes !== undefined && !recompute) {
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
	  empty: true,
	  numberOfComponents: 1,
	  dataType: _Constants.VtkDataTypes.UNSIGNED_INT
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  _DataArray2.default.extend(publicAPI, model, initialValues);
	  vtkCellArray(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkCellArray');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(9);

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Prop3D = __webpack_require__(102);

	var _Prop3D2 = _interopRequireDefault(_Prop3D);

	var _Property = __webpack_require__(104);

	var _Property2 = _interopRequireDefault(_Property);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkActor methods
	// ----------------------------------------------------------------------------

	function vtkActor(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkActor');

	  publicAPI.getActors = function () {
	    return publicAPI;
	  };

	  publicAPI.getIsOpaque = function () {
	    if (model.forceOpaque) {
	      return true;
	    }
	    if (model.forceTranslucent) {
	      return false;
	    }
	    // make sure we have a property
	    if (!model.property) {
	      // force creation of a property
	      publicAPI.getProperty();
	    }

	    var isOpaque = model.property.getOpacity() >= 1.0;

	    // are we using an opaque texture, if any?
	    isOpaque = isOpaque && (!model.texture || !model.texture.isTranslucent());

	    // are we using an opaque scalar array, if any?
	    isOpaque = isOpaque && (!model.mapper || model.mapper.getIsOpaque());

	    return isOpaque;
	  };

	  publicAPI.hasTranslucentPolygonalGeometry = function () {
	    if (model.mapper === null) {
	      return false;
	    }
	    // make sure we have a property
	    if (model.property === null) {
	      // force creation of a property
	      publicAPI.setProperty(publicAPI.makeProperty());
	    }

	    // is this actor opaque ?
	    return !publicAPI.getIsOpaque();
	  };

	  publicAPI.makeProperty = _Property2.default.newInstance;

	  publicAPI.getProperty = function () {
	    if (model.property === null) {
	      model.property = publicAPI.makeProperty();
	    }
	    return model.property;
	  };

	  publicAPI.getBounds = function () {
	    if (model.mapper === null) {
	      return model.bounds;
	    }

	    // Check for the special case when the mapper's bounds are unknown
	    var bds = model.mapper.getBounds();
	    if (!bds || bds.length !== 6) {
	      return bds;
	    }

	    // Check for the special case when the actor is empty.
	    if (bds[0] > bds[1]) {
	      model.mapperBounds = bds.concat(); // copy the mapper's bounds
	      model.bounds = [1, -1, 1, -1, 1, -1];
	      model.boundsMTime.modified();
	      return bds;
	    }

	    // Check if we have cached values for these bounds - we cache the
	    // values returned by model.mapper.getBounds() and we store the time
	    // of caching. If the values returned this time are different, or
	    // the modified time of this class is newer than the cached time,
	    // then we need to rebuild.
	    var zip = function zip(rows) {
	      return rows[0].map(function (_, c) {
	        return rows.map(function (row) {
	          return row[c];
	        });
	      });
	    };
	    if (!model.mapperBounds || !zip([bds, model.mapperBounds]).reduce(function (a, b) {
	      return a && b[0] === b[1];
	    }, true) || publicAPI.getMTime() > model.boundsMTime.getMTime()) {
	      (function () {
	        console.debug('Recomputing bounds...');
	        model.mapperBounds = bds.map(function (x) {
	          return x;
	        });
	        var bbox = [_glMatrix.vec3.fromValues(bds[1], bds[3], bds[5]), _glMatrix.vec3.fromValues(bds[1], bds[2], bds[5]), _glMatrix.vec3.fromValues(bds[0], bds[2], bds[5]), _glMatrix.vec3.fromValues(bds[0], bds[3], bds[5]), _glMatrix.vec3.fromValues(bds[1], bds[3], bds[4]), _glMatrix.vec3.fromValues(bds[1], bds[2], bds[4]), _glMatrix.vec3.fromValues(bds[0], bds[2], bds[4]), _glMatrix.vec3.fromValues(bds[0], bds[3], bds[4])];

	        publicAPI.computeMatrix();
	        var tmp4 = _glMatrix.mat4.create();
	        _glMatrix.mat4.transpose(tmp4, model.matrix);
	        bbox.forEach(function (pt) {
	          return _glMatrix.vec3.transformMat4(pt, pt, tmp4);
	        });

	        model.bounds[0] = model.bounds[2] = model.bounds[4] = Number.MAX_VALUE;
	        model.bounds[1] = model.bounds[3] = model.bounds[5] = -Number.MAX_VALUE;
	        model.bounds = model.bounds.map(function (d, i) {
	          return i % 2 === 0 ? bbox.reduce(function (a, b) {
	            return a > b[i / 2] ? b[i / 2] : a;
	          }, d) : bbox.reduce(function (a, b) {
	            return a < b[(i - 1) / 2] ? b[(i - 1) / 2] : a;
	          }, d);
	        });
	        model.boundsMTime.modified();
	      })();
	    }
	    return model.bounds;
	  };

	  publicAPI.getMTime = function () {
	    var mt = model.mtime;
	    if (model.property !== null) {
	      var time = model.property.getMTime();
	      mt = time > mt ? time : mt;
	    }

	    if (model.backfaceProperty !== null) {
	      var _time = model.backfaceProperty.getMTime();
	      mt = _time > mt ? _time : mt;
	    }

	    // TBD: Handle array of textures here.

	    return mt;
	  };

	  publicAPI.getRedrawMTime = function () {
	    var mt = model.mtime;
	    if (model.mapper !== null) {
	      var time = model.mapper.getMTime();
	      mt = time > mt ? time : mt;
	      if (model.mapper.getInput() !== null) {
	        // FIXME !!! getInputAlgorithm / getInput
	        model.mapper.getInputAlgorithm().update();
	        time = model.mapper.getInput().getMTime();
	        mt = time > mt ? time : mt;
	      }
	    }
	    return mt;
	  };

	  publicAPI.getSupportsSelection = function () {
	    return model.mapper ? model.mapper.getSupportsSelection() : false;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  mapper: null,
	  property: null,
	  backfaceProperty: null,
	  // texture: null, // TODO: Handle array of textures

	  forceOpaque: false,
	  forceTranslucent: false,

	  bounds: [1, -1, 1, -1, 1, -1]
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _Prop3D2.default.extend(publicAPI, model);

	  // vtkTimeStamp
	  model.boundsMTime = {};
	  macro.obj(model.boundsMTime);

	  // Build VTK API
	  macro.set(publicAPI, model, ['property']);
	  macro.setGet(publicAPI, model, ['backfaceProperty', 'forceOpaque', 'forceTranslucent', 'mapper']);
	  macro.getArray(publicAPI, model, ['bounds'], 6);

	  // Object methods
	  vtkActor(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkActor');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(9);

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _BoundingBox = __webpack_require__(85);

	var _BoundingBox2 = _interopRequireDefault(_BoundingBox);

	var _Prop = __webpack_require__(103);

	var _Prop2 = _interopRequireDefault(_Prop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function notImplemented(method) {
	  return function () {
	    return console.log('vtkProp3D::' + method + ' - NOT IMPLEMENTED');
	  };
	}

	// ----------------------------------------------------------------------------
	// vtkProp3D methods
	// ----------------------------------------------------------------------------

	function vtkProp3D(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkProp3D');

	  publicAPI.getMTime = function () {
	    return Math.max(model.mtime, publicAPI.getUserTransformMatrixMTime());
	  };

	  publicAPI.getUserTransformMatrixMTime = function () {
	    return Math.max(model.userMatrix ? model.userMatrix.getMTime() : 0, model.userTransform ? model.userTransform.getMTime() : 0);
	  };

	  publicAPI.addPosition = function (deltaXYZ) {
	    model.position = model.position.map(function (value, index) {
	      return value + deltaXYZ[index];
	    });
	    publicAPI.modified();
	  };

	  // FIXME
	  publicAPI.setOrientation = notImplemented('setOrientation');
	  publicAPI.getOrientation = notImplemented('getOrientation');
	  publicAPI.getOrientationWXYZ = notImplemented('GetOrientationWXYZ');
	  publicAPI.AddOrientation = notImplemented('AddOrientation');
	  publicAPI.RotateX = notImplemented('RotateX');
	  publicAPI.RotateY = notImplemented('RotateY');
	  publicAPI.RotateZ = notImplemented('RotateZ');
	  publicAPI.RotateWXYZ = notImplemented('RotateWXYZ');
	  publicAPI.SetUserTransform = notImplemented('SetUserTransform');
	  publicAPI.SetUserMatrix = notImplemented('SetUserMatrix');

	  publicAPI.getMatrix = function () {
	    publicAPI.computeMatrix();
	    return model.matrix;
	  };

	  publicAPI.computeMatrix = function () {
	    if (model.isIdentity) {
	      return;
	    }

	    // check whether or not need to rebuild the matrix
	    if (publicAPI.getMTime() > model.matrixMTime.getMTime()) {
	      _glMatrix.mat4.identity(model.matrix);
	      _glMatrix.mat4.translate(model.matrix, model.matrix, [-model.origin[0], -model.origin[1], -model.origin[2]]);
	      _glMatrix.mat4.scale(model.matrix, model.matrix, model.scale);
	      _glMatrix.mat4.translate(model.matrix, model.matrix, model.position);
	      _glMatrix.mat4.translate(model.matrix, model.matrix, model.origin);
	      _glMatrix.mat4.transpose(model.matrix, model.matrix);

	      model.matrixMTime.modified();
	    }
	  };

	  publicAPI.getCenter = function () {
	    return _BoundingBox2.default.getCenter(model.bounds);
	  };
	  publicAPI.getLength = function () {
	    return _BoundingBox2.default.getLength(model.bounds);
	  };
	  publicAPI.getXRange = function () {
	    return _BoundingBox2.default.getXRange(model.bounds);
	  };
	  publicAPI.getYRange = function () {
	    return _BoundingBox2.default.getYRange(model.bounds);
	  };
	  publicAPI.getZRange = function () {
	    return _BoundingBox2.default.getZRange(model.bounds);
	  };

	  publicAPI.pokeMatrix = notImplemented('pokeMatrix');
	  publicAPI.getUserMatrix = notImplemented('GetUserMatrix');

	  function updateIdentityFlag() {
	    [model.origin, model.position, model.orientation].forEach(function (array) {
	      if (array.filter(function (v) {
	        return v !== 0;
	      }).length) {
	        model.isIdentity = false;
	        return;
	      }
	    });

	    // if (model.userMatrix || model.userTransform) {
	    //   model.isIdentity = false;
	    //   return;
	    // }

	    if (model.scale.filter(function (v) {
	      return v !== 1;
	    }).length) {
	      model.isIdentity = false;
	      return;
	    }
	  }

	  publicAPI.onModified(updateIdentityFlag);
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  origin: [0, 0, 0],
	  position: [0, 0, 0],
	  orientation: [0, 0, 0],
	  scale: [1, 1, 1],
	  bounds: [1, -1, 1, -1, 1, -1],

	  userMatrix: null,
	  userTransform: null,

	  cachedProp3D: null,
	  isIdentity: true,
	  matrixMTime: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _Prop2.default.extend(publicAPI, model);

	  model.matrixMTime = {};
	  macro.obj(model.matrixMTime);

	  // Build VTK API
	  macro.get(publicAPI, model, ['bounds', 'isIdentity']);
	  macro.setGetArray(publicAPI, model, ['origin', 'position', 'orientation', 'scale'], 3);

	  // Object internal instance
	  model.matrix = _glMatrix.mat4.create();
	  model.transform = null; // FIXME

	  // Object methods
	  vtkProp3D(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkProp3D');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function notImplemented(method) {
	  return function () {
	    return console.log('vtkProp::' + method + ' - NOT IMPLEMENTED');
	  };
	}

	// ----------------------------------------------------------------------------
	// vtkProp methods
	// ----------------------------------------------------------------------------

	function vtkProp(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkProp');

	  publicAPI.getActors = function () {
	    return null;
	  };
	  publicAPI.getActors2D = function () {
	    return null;
	  };
	  publicAPI.getVolumes = function () {
	    return null;
	  };

	  publicAPI.pick = notImplemented('pick');
	  publicAPI.hasKey = notImplemented('hasKey');

	  publicAPI.getRedrawMTime = function () {
	    return model.mtime;
	  };

	  publicAPI.setEstimatedRenderTime = function (t) {
	    model.estimatedRenderTime = t;
	    model.savedEstimatedRenderTime = t;
	  };

	  publicAPI.restoreEstimatedRenderTime = function () {
	    model.estimatedRenderTime = model.savedEstimatedRenderTime;
	  };

	  publicAPI.addEstimatedRenderTime = function (t) {
	    model.estimatedRenderTime += t;
	  };

	  publicAPI.setAllocatedRenderTime = function (t) {
	    model.allocatedRenderTime = t;
	    model.savedEstimatedRenderTime = model.estimatedRenderTime;
	    model.estimatedRenderTime = 0;
	  };

	  publicAPI.getSupportsSelection = function () {
	    return false;
	  };

	  publicAPI.getTextures = function () {
	    return model.textures;
	  };
	  publicAPI.hasTexture = function (texture) {
	    return !!model.textures.filter(function (item) {
	      return item === texture;
	    }).length;
	  };
	  publicAPI.addTexture = function (texture) {
	    if (texture && !publicAPI.hasTexture(texture)) {
	      model.textures = model.textures.concat(texture);
	    }
	  };

	  publicAPI.removeTexture = function (texture) {
	    var newTextureList = model.textures.filter(function (item) {
	      return item === texture;
	    });
	    if (model.texture.length !== newTextureList.length) {
	      model.textures = newTextureList;
	    }
	  };

	  publicAPI.removeAllTextures = function () {
	    model.textures = [];
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  visibility: true,
	  pickable: true,
	  dragable: true,
	  useBounds: true,
	  allocatedRenderTime: 10,
	  estimatedRenderTime: 0,
	  savedEstimatedRenderTime: 0,
	  renderTimeMultiplier: 1,
	  paths: null,
	  textures: []
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.get(publicAPI, model, ['estimatedRenderTime', 'allocatedRenderTime']);
	  macro.setGet(publicAPI, model, ['visibility', 'pickable', 'dragable', 'useBounds', 'renderTimeMultiplier']);

	  // Object methods
	  vtkProp(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkProp');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(28);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function notImplemented(method) {
	  return function () {
	    return console.log('vtkProperty::' + method + ' - NOT IMPLEMENTED');
	  };
	}

	// ----------------------------------------------------------------------------
	// vtkProperty methods
	// ----------------------------------------------------------------------------

	function vtkProperty(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkProperty');

	  publicAPI.setColor = function (r, g, b) {
	    if (model.color[0] !== r || model.color[1] !== g || model.color[2] !== b) {
	      model.color[0] = r;
	      model.color[1] = g;
	      model.color[2] = b;
	      publicAPI.modified();
	    }

	    publicAPI.setDiffuseColor(model.color);
	    publicAPI.setAmbientColor(model.color);
	    publicAPI.setSpecularColor(model.color);
	  };

	  publicAPI.computeCompositeColor = notImplemented('ComputeCompositeColor');
	  publicAPI.getColor = function () {
	    // Inline computeCompositeColor
	    var norm = 0.0;
	    if (model.ambient + model.diffuse + model.specular > 0) {
	      norm = 1.0 / (model.ambient + model.diffuse + model.specular);
	    }

	    for (var i = 0; i < 3; i++) {
	      model.color[i] = norm * (model.ambient * model.ambientColor[i] + model.diffuse * model.diffuseColor[i] + model.specular * model.specularColor[i]);
	    }

	    return [].concat(model.color);
	  };

	  publicAPI.addShaderVariable = notImplemented('AddShaderVariable');

	  publicAPI.setInterpolationToFlat = function () {
	    return publicAPI.setInterpolation(_Constants.Interpolation.FLAT);
	  };
	  publicAPI.setInterpolationToGouraud = function () {
	    return publicAPI.setInterpolation(_Constants.Interpolation.GOURAUD);
	  };
	  publicAPI.setInterpolationToPhong = function () {
	    return publicAPI.setInterpolation(_Constants.Interpolation.PHONG);
	  };
	  publicAPI.getInterpolationAsString = function () {
	    return macro.enumToString(_Constants.Interpolation, model.interpolation);
	  };

	  publicAPI.setRepresentationToWireframe = function () {
	    return publicAPI.setRepresentation(_Constants.Representation.WIREFRAME);
	  };
	  publicAPI.setRepresentationToSurface = function () {
	    return publicAPI.setRepresentation(_Constants.Representation.SURFACE);
	  };
	  publicAPI.setRepresentationToPoints = function () {
	    return publicAPI.setRepresentation(_Constants.Representation.POINTS);
	  };
	  publicAPI.getRepresentationAsString = function () {
	    return macro.enumToString(_Constants.Representation, model.representation);
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  color: [1, 1, 1],
	  ambientColor: [1, 1, 1],
	  diffuseColor: [1, 1, 1],
	  specularColor: [1, 1, 1],
	  edgeColor: [0, 0, 0],

	  ambient: 0,
	  diffuse: 1,
	  specular: 0,
	  specularPower: 1,
	  opacity: 1,
	  interpolation: _Constants.Interpolation.GOURAUD,
	  representation: _Constants.Representation.SURFACE,
	  edgeVisibility: false,
	  backfaceCulling: false,
	  frontfaceCulling: false,
	  pointSize: 1,
	  lineWidth: 1,
	  lighting: true,

	  shading: false,
	  materialName: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);

	  macro.setGet(publicAPI, model, ['lighting', 'interpolation', 'ambient', 'diffuse', 'specular', 'specularPower', 'opacity', 'edgeVisibility', 'lineWidth', 'pointSize', 'backfaceCulling', 'frontfaceCulling', 'representation']);
	  macro.setGetArray(publicAPI, model, ['ambientColor', 'specularColor', 'diffuseColor', 'edgeColor'], 3);

	  // Object methods
	  vtkProperty(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkProperty');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _CoincidentTopologyHelper = __webpack_require__(106);

	var CoincidentTopologyHelper = _interopRequireWildcard(_CoincidentTopologyHelper);

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Static = __webpack_require__(107);

	var _Static2 = _interopRequireDefault(_Static);

	var _DataArray = __webpack_require__(67);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	var _ImageData = __webpack_require__(108);

	var _ImageData2 = _interopRequireDefault(_ImageData);

	var _LookupTable = __webpack_require__(111);

	var _LookupTable2 = _interopRequireDefault(_LookupTable);

	var _Math = __webpack_require__(32);

	var _Math2 = _interopRequireDefault(_Math);

	var _Constants = __webpack_require__(113);

	var _Constants2 = __webpack_require__(76);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function notImplemented(method) {
	  return function () {
	    return console.log('vtkMapper::' + method + ' - NOT IMPLEMENTED');
	  };
	}

	// CoincidentTopology static methods ------------------------------------------
	/* eslint-disable arrow-body-style */

	var staticOffsetModel = {
	  Polygon: { factor: 2, unit: 2 },
	  Line: { factor: 1, unit: 1 },
	  Point: { factor: 0, unit: 0 }
	};
	var staticOffsetAPI = {};

	CoincidentTopologyHelper.addCoincidentTopologyMethods(staticOffsetAPI, staticOffsetModel, CoincidentTopologyHelper.CATEGORIES.map(function (key) {
	  return { key: key, method: 'ResolveCoincidentTopology' + key + 'OffsetParameters' };
	}));

	// ----------------------------------------------------------------------------
	// vtkMapper methods
	// ----------------------------------------------------------------------------

	function vtkMapper(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkMapper');

	  publicAPI.getBounds = function () {
	    var input = publicAPI.getInputData();
	    if (!input) {
	      model.bounds = _Math2.default.createUninitializedBouds();
	    } else {
	      if (!model.static) {
	        publicAPI.update();
	      }
	      model.bounds = input.getBounds();
	    }
	    return model.bounds;
	  };

	  publicAPI.update = function () {
	    publicAPI.getInputData();
	  };

	  publicAPI.setForceCompileOnly = function (v) {
	    model.forceCompileOnly = v;
	    // make sure we do NOT call modified()
	  };

	  publicAPI.createDefaultLookupTable = function () {
	    model.lookupTable = _LookupTable2.default.newInstance();
	  };

	  publicAPI.getColorModeAsString = function () {
	    return macro.enumToString(_Constants2.ColorMode, model.colorMode);
	  };

	  publicAPI.setColorModeToDefault = function () {
	    return publicAPI.setColorMode(0);
	  };
	  publicAPI.setColorModeToMapScalars = function () {
	    return publicAPI.setColorMode(1);
	  };
	  publicAPI.setColorModeToDirectScalars = function () {
	    return publicAPI.setColorMode(2);
	  };

	  publicAPI.getScalarModeAsString = function () {
	    return macro.enumToString(_Constants2.ScalarMode, model.scalarMode);
	  };

	  publicAPI.setScalarModeToDefault = function () {
	    return publicAPI.setScalarMode(0);
	  };
	  publicAPI.setScalarModeToUsePointData = function () {
	    return publicAPI.setScalarMode(1);
	  };
	  publicAPI.setScalarModeToUseCellData = function () {
	    return publicAPI.setScalarMode(2);
	  };
	  publicAPI.setScalarModeToUsePointFieldData = function () {
	    return publicAPI.setScalarMode(3);
	  };
	  publicAPI.setScalarModeToUseCellFieldData = function () {
	    return publicAPI.setScalarMode(4);
	  };
	  publicAPI.setScalarModeToUseFieldData = function () {
	    return publicAPI.setScalarMode(5);
	  };

	  // Add Static methods to our instance
	  Object.keys(_Static2.default).forEach(function (methodName) {
	    publicAPI[methodName] = _Static2.default[methodName];
	  });
	  Object.keys(staticOffsetAPI).forEach(function (methodName) {
	    publicAPI[methodName] = staticOffsetAPI[methodName];
	  });

	  // Relative metods
	  /* eslint-disable arrow-body-style */
	  model.topologyOffset = {
	    Polygon: { factor: 0, unit: 0 },
	    Line: { factor: 0, unit: 0 },
	    Point: { factor: 0, unit: 0 }
	  };
	  CoincidentTopologyHelper.addCoincidentTopologyMethods(publicAPI, model.topologyOffset, CoincidentTopologyHelper.CATEGORIES.map(function (key) {
	    return { key: key, method: 'RelativeCoincidentTopology' + key + 'OffsetParameters' };
	  }));
	  /* eslint-enable arrow-body-style */

	  publicAPI.getCoincidentTopologyPolygonOffsetParameters = function () {
	    var globalValue = staticOffsetAPI.getResolveCoincidentTopologyPolygonOffsetParameters();
	    var localValue = publicAPI.getRelativeCoincidentTopologyPolygonOffsetParameters();
	    return {
	      factor: globalValue.factor + localValue.factor,
	      units: globalValue.units + localValue.units
	    };
	  };

	  publicAPI.getCoincidentTopologyLineOffsetParameters = function () {
	    var globalValue = staticOffsetAPI.getResolveCoincidentTopologyLineOffsetParameters();
	    var localValue = publicAPI.getRelativeCoincidentTopologyLineOffsetParameters();
	    return {
	      factor: globalValue.factor + localValue.factor,
	      units: globalValue.units + localValue.units
	    };
	  };

	  publicAPI.getCoincidentTopologyPointOffsetParameter = function () {
	    var globalValue = staticOffsetAPI.getResolveCoincidentTopologyPointOffsetParameters();
	    var localValue = publicAPI.getRelativeCoincidentTopologyPointOffsetParameters();
	    return {
	      factor: globalValue.factor + localValue.factor,
	      units: globalValue.units + localValue.units
	    };
	  };

	  publicAPI.getAbstractScalars = function (input, scalarMode, arrayAccessMode, arrayId, arrayName) {
	    // make sure we have an input
	    if (!input || !model.scalarVisibility) {
	      return null;
	    }

	    var scalars = null;

	    // get and scalar data according to scalar mode
	    if (scalarMode === _Constants2.ScalarMode.DEFAULT) {
	      scalars = input.getPointData().getScalars();
	      if (!scalars) {
	        scalars = input.getCellData().getScalars();
	      }
	    } else if (scalarMode === _Constants2.ScalarMode.USE_POINT_DATA) {
	      scalars = input.getPointData().getScalars();
	    } else if (scalarMode === _Constants2.ScalarMode.USE_CELL_DATA) {
	      scalars = input.getCellData().getScalars();
	    } else if (scalarMode === _Constants2.ScalarMode.USE_POINT_FIELD_DATA) {
	      var pd = input.getPointData();
	      if (arrayAccessMode === _Constants2.GetArray.BY_ID) {
	        scalars = pd.getArrayByIndex(arrayId);
	      } else {
	        scalars = pd.getArrayByName(arrayName);
	      }
	    } else if (scalarMode === _Constants2.ScalarMode.USE_CELL_FIELD_DATA) {
	      var cd = input.getCellData();
	      if (arrayAccessMode === _Constants2.GetArray.BY_ID) {
	        scalars = cd.getArrayByIndex(arrayId);
	      } else {
	        scalars = cd.getArrayByName(arrayName);
	      }
	    } else if (scalarMode === _Constants2.ScalarMode.USE_FIELD_DATA) {
	      var fd = input.getFieldData();
	      if (arrayAccessMode === _Constants2.GetArray.BY_ID) {
	        scalars = fd.getArrayByIndex(arrayId);
	      } else {
	        scalars = fd.getArrayByName(arrayName);
	      }
	    }

	    return scalars;
	  };

	  publicAPI.mapScalars = function (input, alpha) {
	    var scalars = publicAPI.getAbstractScalars(input, model.scalarMode, model.arrayAccessMode, model.arrayId, model.colorByArrayName);

	    if (!scalars) {
	      model.colorCoordinates = null;
	      model.colorTextureMap = null;
	      model.colorMapColors = null;
	      return;
	    }

	    if (!model.useLookupTableScalarRange) {
	      model.lookupTable.setRange(model.scalarRange[0], model.scalarRange[1]);
	    }

	    // Decide betweeen texture color or vertex color.
	    // Cell data always uses vertex color.
	    // Only point data can use both texture and vertex coloring.
	    if (publicAPI.canUseTextureMapForColoring(input)) {
	      publicAPI.mapScalarsToTexture(scalars, alpha);
	      return;
	    }

	    model.colorCoordinates = null;
	    model.colorTextureMap = null;

	    var lut = publicAPI.getLookupTable();
	    if (lut) {
	      // Ensure that the lookup table is built
	      lut.build();
	      model.colorMapColors = lut.mapScalars(scalars, model.colorMode, 0);
	    }
	  };

	  //-----------------------------------------------------------------------------
	  publicAPI.scalarToTextureCoordinate = function (scalarValue, // Input scalar
	  rangeMin, // range[0]
	  invRangeWidth) {
	    // 1/(range[1]-range[0])
	    var texCoordS = 0.5; // Scalar value is arbitrary when NaN
	    var texCoordT = 1.0; // 1.0 in t coordinate means NaN
	    if (!_Math2.default.isNan(scalarValue)) {
	      // 0.0 in t coordinate means not NaN.  So why am I setting it to 0.49?
	      // Because when you are mapping scalars and you have a NaN adjacent to
	      // anything else, the interpolation everywhere should be NaN.  Thus, I
	      // want the NaN color everywhere except right on the non-NaN neighbors.
	      // To simulate this, I set the t coord for the real numbers close to
	      // the threshold so that the interpolation almost immediately looks up
	      // the NaN value.
	      texCoordT = 0.49;

	      texCoordS = (scalarValue - rangeMin) * invRangeWidth;

	      // Some implementations apparently don't handle relatively large
	      // numbers (compared to the range [0.0, 1.0]) very well. In fact,
	      // values above 1122.0f appear to cause texture wrap-around on
	      // some systems even when edge clamping is enabled. Why 1122.0f? I
	      // don't know. For safety, we'll clamp at +/- 1000. This will
	      // result in incorrect images when the texture value should be
	      // above or below 1000, but I don't have a better solution.
	      if (texCoordS > 1000.0) {
	        texCoordS = 1000.0;
	      } else if (texCoordS < -1000.0) {
	        texCoordS = -1000.0;
	      }
	    }
	    return { texCoordS: texCoordS, texCoordT: texCoordT };
	  };

	  //-----------------------------------------------------------------------------
	  publicAPI.createColorTextureCoordinates = function (input, output, numScalars, numComps, component, range, tableRange, tableNumberOfColors, useLogScale) {
	    // We have to change the range used for computing texture
	    // coordinates slightly to accomodate the special above- and
	    // below-range colors that are the first and last texels,
	    // respectively.
	    var scalarTexelWidth = (range[1] - range[0]) / tableNumberOfColors;

	    var paddedRange = [];
	    paddedRange[0] = range[0] - scalarTexelWidth;
	    paddedRange[1] = range[1] + scalarTexelWidth;
	    var invRangeWidth = 1.0 / (paddedRange[1] - paddedRange[0]);

	    var outputV = output.getData();
	    var inputV = input.getData();

	    var count = 0;
	    var outputCount = 0;
	    if (component < 0 || component >= numComps) {
	      for (var scalarIdx = 0; scalarIdx < numScalars; ++scalarIdx) {
	        var sum = 0;
	        for (var compIdx = 0; compIdx < numComps; ++compIdx) {
	          sum += inputV[count] * inputV[count];
	          count++;
	        }
	        var magnitude = Math.sqrt(sum);
	        if (useLogScale) {
	          magnitude = _LookupTable2.default.applyLogScale(magnitude, tableRange, range);
	        }
	        var outputs = publicAPI.scalarToTextureCoordinate(magnitude, paddedRange[0], invRangeWidth);
	        outputV[outputCount] = outputs.texCoordS;
	        outputV[outputCount + 1] = outputs.texCoordT;
	        outputCount += 2;
	      }
	    } else {
	      count += component;
	      for (var _scalarIdx = 0; _scalarIdx < numScalars; ++_scalarIdx) {
	        var inputValue = inputV[count];
	        if (useLogScale) {
	          inputValue = _LookupTable2.default.applyLogScale(inputValue, tableRange, range);
	        }
	        var _outputs = publicAPI.scalarToTextureCoordinate(inputValue, paddedRange[0], invRangeWidth);
	        outputV[outputCount] = _outputs.texCoordS;
	        outputV[outputCount + 1] = _outputs.texCoordT;
	        outputCount += 2;
	        count += numComps;
	      }
	    }
	  };

	  publicAPI.mapScalarsToTexture = function (scalars, alpha) {
	    var range = model.lookupTable.getRange();
	    var useLogScale = model.lookupTable.usingLogScale();
	    if (useLogScale) {
	      // convert range to log.
	      _LookupTable2.default.getLogRange(range, range);
	    }

	    var origAlpha = model.lookupTable.getAlpha();

	    // Get rid of vertex color array.  Only texture or vertex coloring
	    // can be active at one time.  The existence of the array is the
	    // signal to use that technique.
	    model.colorMapColors = null;

	    // If the lookup table has changed, then recreate the color texture map.
	    // Set a new lookup table changes this->MTime.
	    if (model.colorTextureMap == null || publicAPI.getMTime() > model.colorTextureMap.getMTime() || model.lookupTable.getMTime() > model.colorTextureMap.getMTime() || model.lookupTable.getAlpha() !== alpha) {
	      model.lookupTable.setAlpha(alpha);
	      model.colorTextureMap = null;

	      // Get the texture map from the lookup table.
	      // Create a dummy ramp of scalars.
	      // In the future, we could extend vtkScalarsToColors.
	      model.lookupTable.build();
	      var numberOfColors = model.lookupTable.getNumberOfAvailableColors();
	      if (numberOfColors > 4096) {
	        numberOfColors = 4096;
	      }
	      numberOfColors += 2;
	      var k = (range[1] - range[0]) / (numberOfColors - 1 - 2);

	      var newArray = new Float64Array(numberOfColors * 2);

	      for (var i = 0; i < numberOfColors; ++i) {
	        newArray[i] = range[0] + i * k - k; // minus k to start at below range color
	        if (useLogScale) {
	          newArray[i] = Math.pow(10.0, newArray[i]);
	        }
	      }
	      // Dimension on NaN.
	      for (var _i = 0; _i < numberOfColors; ++_i) {
	        newArray[_i + numberOfColors] = NaN;
	      }

	      model.colorTextureMap = _ImageData2.default.newInstance();
	      model.colorTextureMap.setExtent(0, numberOfColors - 1, 0, 1, 0, 0);

	      var tmp = _DataArray2.default.newInstance({ numberOfComponents: 1, values: newArray });

	      model.colorTextureMap.getPointData().setScalars(model.lookupTable.mapScalars(tmp, model.colorMode, 0));
	      model.lookupTable.setAlpha(origAlpha);
	    }

	    // Create new coordinates if necessary.
	    // Need to compare lookup table incase the range has changed.
	    if (!model.colorCoordinates || publicAPI.getMTime() > model.colorCoordinates.getMTime() || publicAPI.getInputData(0).getMTime() > model.colorCoordinates.getMTime() || model.lookupTable.getMTime() > model.colorCoordinates.getMTime()) {
	      // Get rid of old colors
	      model.colorCoordinates = null;

	      // Now create the color texture coordinates.
	      var numComps = scalars.getNumberOfComponents();
	      var num = scalars.getNumberOfTuples();

	      // const fArray = new FloatArray(num * 2);
	      model.colorCoordinates = _DataArray2.default.newInstance({ numberOfComponents: 2, values: new Float32Array(num * 2) });

	      var scalarComponent = model.lookupTable.getVectorComponent();
	      // Although I like the feature of applying magnitude to single component
	      // scalars, it is not how the old MapScalars for vertex coloring works.
	      if (model.lookupTable.getVectorMode() === _Constants.VectorMode.MAGNITUDE && scalars.getNumberOfComponents() > 1) {
	        scalarComponent = -1;
	      }

	      publicAPI.createColorTextureCoordinates(scalars, model.colorCoordinates, num, numComps, scalarComponent, range, model.lookupTable.getRange(), model.lookupTable.getNumberOfAvailableColors(), useLogScale);
	    }
	  };

	  publicAPI.setScalarMaterialModeToDefault = function () {
	    return publicAPI.setScalarMaterialMode(_Constants2.MaterialMode.DEFAULT);
	  };
	  publicAPI.setScalarMaterialModeToAmbient = function () {
	    return publicAPI.setScalarMaterialMode(_Constants2.MaterialMode.AMBIENT);
	  };
	  publicAPI.setScalarMaterialModeToDiffuse = function () {
	    return publicAPI.setScalarMaterialMode(_Constants2.MaterialMode.DIFFUSE);
	  };
	  publicAPI.setScalarMaterialModeToAmbientAndDiffuse = function () {
	    return publicAPI.setScalarMaterialMode(_Constants2.MaterialMode.AMBIENT_AND_DIFFUSE);
	  };
	  publicAPI.getScalarMaterialModeAsString = function () {
	    return macro.enumToString(_Constants2.MaterialMode, model.scalarMaterialMode);
	  };

	  publicAPI.getIsOpaque = function () {
	    var lut = publicAPI.getLookupTable();
	    if (lut) {
	      // Ensure that the lookup table is built
	      lut.build();
	      return lut.isOpaque();
	    }
	    return true;
	  };

	  publicAPI.canUseTextureMapForColoring = function (input) {
	    if (!model.interpolateScalarsBeforeMapping) {
	      return false; // user doesn't want us to use texture maps at all.
	    }

	    // index color does not use textures
	    if (model.lookupTable && model.lookupTable.getIndexedLookup()) {
	      return false;
	    }

	    return true;
	  };

	  publicAPI.clearColorArrays = function () {
	    model.colorMapColors = null;
	    model.colorCoordinates = null;
	    model.colorTextureMap = null;
	  };

	  publicAPI.getLookupTable = function () {
	    if (!model.lookupTable) {
	      publicAPI.createDefaultLookupTable();
	    }
	    return model.lookupTable;
	  };

	  publicAPI.acquireInvertibleLookupTable = notImplemented('AcquireInvertibleLookupTable');
	  publicAPI.valueToColor = notImplemented('ValueToColor');
	  publicAPI.colorToValue = notImplemented('ColorToValue');
	  publicAPI.useInvertibleColorFor = notImplemented('UseInvertibleColorFor');
	  publicAPI.clearInvertibleColor = notImplemented('ClearInvertibleColor');
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  colorMapColors: null, // Same as this->Colors

	  static: false,
	  lookupTable: null,

	  scalarVisibility: true,
	  scalarRange: [0, 1],
	  useLookupTableScalarRange: false,

	  colorMode: 0,
	  scalarMode: 0,
	  scalarMaterialMode: 0,
	  arrayAccessMode: 1, // By_NAME

	  bounds: [1, -1, 1, -1, 1, -1],
	  center: [0, 0],

	  renderTime: 0,

	  colorByArrayName: null,
	  colorByArrayComponent: -1,

	  fieldDataTupleId: -1,

	  interpolateScalarsBeforeMapping: false,
	  colorCoordinates: null,
	  colorTextureMap: null,

	  forceCompileOnly: 0,

	  useInvertibleColors: false,
	  invertibleScalars: null,
	  resolveCoincidentTopology: false
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model); // FIXME parent is not vtkObject
	  macro.algo(publicAPI, model, 1, 0);
	  macro.get(publicAPI, model, ['colorCoordinates', 'colorMapColors', 'colorTextureMap']);
	  macro.setGet(publicAPI, model, ['colorByArrayComponent', 'colorByArrayName', 'arrayAccessMode', 'colorMode', 'fieldDataTupleId', 'interpolateScalarsBeforeMapping', 'lookupTable', 'renderTime', 'resolveCoincidentTopology', 'scalarMaterialMode', 'scalarMode', 'scalarVisibility', 'static', 'useLookupTableScalarRange']);
	  macro.setGetArray(publicAPI, model, ['scalarRange'], 2);

	  // Object methods
	  vtkMapper(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkMapper');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, staticOffsetAPI, _Static2.default);

/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addCoincidentTopologyMethods = addCoincidentTopologyMethods;
	function addCoincidentTopologyMethods(publicAPI, model, nameList) {
	  nameList.forEach(function (item) {
	    publicAPI['get' + item.method] = function () {
	      return model[item.key];
	    };
	    publicAPI['set' + item.method] = function (factor, unit) {
	      model[item.key] = { factor: factor, unit: unit };
	    };
	  });
	}

	var CATEGORIES = exports.CATEGORIES = ['Polygon', 'Line', 'Point'];

/***/ },
/* 107 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getResolveCoincidentTopologyPolygonOffsetFaces = getResolveCoincidentTopologyPolygonOffsetFaces;
	exports.setResolveCoincidentTopologyPolygonOffsetFaces = setResolveCoincidentTopologyPolygonOffsetFaces;
	exports.getResolveCoincidentTopology = getResolveCoincidentTopology;
	exports.setResolveCoincidentTopology = setResolveCoincidentTopology;
	exports.setResolveCoincidentTopologyToDefault = setResolveCoincidentTopologyToDefault;
	exports.setResolveCoincidentTopologyToOff = setResolveCoincidentTopologyToOff;
	exports.setResolveCoincidentTopologyToPolygonOffset = setResolveCoincidentTopologyToPolygonOffset;
	exports.getResolveCoincidentTopologyAsString = getResolveCoincidentTopologyAsString;
	var resolveCoincidentTopologyPolygonOffsetFaces = 1;
	var resolveCoincidentTopology = 0;

	var RESOLVE_COINCIDENT_TOPOLOGY_MODE = exports.RESOLVE_COINCIDENT_TOPOLOGY_MODE = ['VTK_RESOLVE_OFF', 'VTK_RESOLVE_POLYGON_OFFSET'];

	function getResolveCoincidentTopologyPolygonOffsetFaces() {
	  return resolveCoincidentTopologyPolygonOffsetFaces;
	}

	function setResolveCoincidentTopologyPolygonOffsetFaces(value) {
	  resolveCoincidentTopologyPolygonOffsetFaces = value;
	}

	function getResolveCoincidentTopology() {
	  return resolveCoincidentTopology;
	}

	function setResolveCoincidentTopology() {
	  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	  resolveCoincidentTopology = mode;
	}

	function setResolveCoincidentTopologyToDefault() {
	  setResolveCoincidentTopology(0); // VTK_RESOLVE_OFF
	}

	function setResolveCoincidentTopologyToOff() {
	  setResolveCoincidentTopology(0); // VTK_RESOLVE_OFF
	}

	function setResolveCoincidentTopologyToPolygonOffset() {
	  setResolveCoincidentTopology(1); // VTK_RESOLVE_POLYGON_OFFSET
	}

	function getResolveCoincidentTopologyAsString() {
	  return RESOLVE_COINCIDENT_TOPOLOGY_MODE[resolveCoincidentTopology];
	}

	exports.default = {
	  getResolveCoincidentTopologyAsString: getResolveCoincidentTopologyAsString,
	  getResolveCoincidentTopologyPolygonOffsetFaces: getResolveCoincidentTopologyPolygonOffsetFaces,
	  setResolveCoincidentTopology: setResolveCoincidentTopology,
	  setResolveCoincidentTopologyPolygonOffsetFaces: setResolveCoincidentTopologyPolygonOffsetFaces,
	  setResolveCoincidentTopologyToDefault: setResolveCoincidentTopologyToDefault,
	  setResolveCoincidentTopologyToOff: setResolveCoincidentTopologyToOff,
	  setResolveCoincidentTopologyToPolygonOffset: setResolveCoincidentTopologyToPolygonOffset
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _DataSet = __webpack_require__(96);

	var _DataSet2 = _interopRequireDefault(_DataSet);

	var _StructuredData = __webpack_require__(109);

	var _StructuredData2 = _interopRequireDefault(_StructuredData);

	var _Constants = __webpack_require__(110);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkImageData methods
	// ----------------------------------------------------------------------------

	function vtkImageData(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkImageData');

	  publicAPI.setExtent = function () {
	    for (var _len = arguments.length, inExtent = Array(_len), _key = 0; _key < _len; _key++) {
	      inExtent[_key] = arguments[_key];
	    }

	    if (model.deleted) {
	      console.log('instance deleted - can not call any method');
	      return;
	    }

	    if (!inExtent || inExtent.length !== 6) {
	      return;
	    }

	    var changeDetected = false;
	    model.extent.forEach(function (item, index) {
	      if (item !== inExtent[index]) {
	        if (changeDetected) {
	          return;
	        }
	        changeDetected = true;
	      }
	    });

	    if (changeDetected) {
	      model.extent = [].concat(inExtent);
	      model.dataDescription = _StructuredData2.default.getDataDescriptionFromExtent(model.extent);
	      publicAPI.modified();
	    }
	  };

	  publicAPI.setDimensions = function (i, j, k) {
	    return publicAPI.setExtent(0, i - 1, 0, j - 1, 0, k - 1);
	  };

	  publicAPI.getDimensions = function () {
	    return [model.extent[1] - model.extent[0] + 1, model.extent[3] - model.extent[2] + 1, model.extent[5] - model.extent[4] + 1];
	  };

	  publicAPI.getNumberOfCells = function () {
	    var dims = publicAPI.getDimensions();
	    var nCells = 1;

	    for (var i = 0; i < 3; i++) {
	      if (dims[i] === 0) {
	        return 0;
	      }
	      if (dims[i] > 1) {
	        nCells *= dims[i] - 1;
	      }
	    }

	    return nCells;
	  };

	  publicAPI.getNumberOfPoints = function () {
	    var dims = publicAPI.getDimensions();
	    return dims[0] * dims[1] * dims[2];
	  };

	  publicAPI.getPoint = function (index) {
	    var dims = publicAPI.getDimensions();
	    var ijk = [0, 0, 0];
	    var coords = [0, 0, 0];

	    if (dims[0] === 0 || dims[1] === 0 || dims[2] === 0) {
	      console.error('Requesting a point from an empty image.');
	      return null;
	    }

	    switch (model.dataDescription) {
	      case _Constants.StructuredType.EMPTY:
	        return null;

	      case _Constants.StructuredType.SINGLE_POINT:
	        break;

	      case _Constants.StructuredType.X_LINE:
	        ijk[0] = index;
	        break;

	      case _Constants.StructuredType.Y_LINE:
	        ijk[1] = index;
	        break;

	      case _Constants.StructuredType.Z_LINE:
	        ijk[2] = index;
	        break;

	      case _Constants.StructuredType.XY_PLANE:
	        ijk[0] = index % dims[0];
	        ijk[1] = index / dims[0];
	        break;

	      case _Constants.StructuredType.YZ_PLANE:
	        ijk[1] = index % dims[1];
	        ijk[2] = index / dims[1];
	        break;

	      case _Constants.StructuredType.XZ_PLANE:
	        ijk[0] = index % dims[0];
	        ijk[2] = index / dims[0];
	        break;

	      case _Constants.StructuredType.XYZ_GRID:
	        ijk[0] = index % dims[0];
	        ijk[1] = index / dims[0] % dims[1];
	        ijk[2] = index / (dims[0] * dims[1]);
	        break;

	      default:
	        console.error('Invalid dataDescription');
	        break;
	    }

	    for (var i = 0; i < 3; i++) {
	      coords[i] = model.origin[i] + (ijk[i] + model.extent[i * 2]) * model.spacing[i];
	    }

	    return coords;
	  };

	  // vtkCell *GetCell(vtkIdType cellId) VTK_OVERRIDE;
	  // void GetCell(vtkIdType cellId, vtkGenericCell *cell) VTK_OVERRIDE;
	  // void GetCellBounds(vtkIdType cellId, double bounds[6]) VTK_OVERRIDE;
	  // virtual vtkIdType FindPoint(double x, double y, double z)
	  // {
	  //   return this->vtkDataSet::FindPoint(x, y, z);
	  // }
	  // vtkIdType FindPoint(double x[3]) VTK_OVERRIDE;
	  // vtkIdType FindCell(
	  //   double x[3], vtkCell *cell, vtkIdType cellId, double tol2,
	  //   int& subId, double pcoords[3], double *weights) VTK_OVERRIDE;
	  // vtkIdType FindCell(
	  //   double x[3], vtkCell *cell, vtkGenericCell *gencell,
	  //   vtkIdType cellId, double tol2, int& subId,
	  //   double pcoords[3], double *weights) VTK_OVERRIDE;
	  // vtkCell *FindAndGetCell(double x[3], vtkCell *cell, vtkIdType cellId,
	  //                                 double tol2, int& subId, double pcoords[3],
	  //                                 double *weights) VTK_OVERRIDE;
	  // int GetCellType(vtkIdType cellId) VTK_OVERRIDE;
	  // void GetCellPoints(vtkIdType cellId, vtkIdList *ptIds) VTK_OVERRIDE
	  //   {vtkStructuredData::GetCellPoints(cellId,ptIds,this->DataDescription,
	  //                                     this->GetDimensions());}
	  // void GetPointCells(vtkIdType ptId, vtkIdList *cellIds) VTK_OVERRIDE
	  //   {vtkStructuredData::GetPointCells(ptId,cellIds,this->GetDimensions());}
	  // void ComputeBounds() VTK_OVERRIDE;
	  // int GetMaxCellSize() VTK_OVERRIDE {return 8;}; //voxel is the largest

	  publicAPI.getBounds = function () {
	    return [model.origin[0] + model.extent[0] * model.spacing[0], model.origin[0] + model.extent[1] * model.spacing[0], model.origin[1] + model.extent[2] * model.spacing[1], model.origin[1] + model.extent[3] * model.spacing[1], model.origin[2] + model.extent[4] * model.spacing[2], model.origin[2] + model.extent[5] * model.spacing[2]];
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  spacing: [1.0, 1.0, 1.0],
	  origin: [0.0, 0.0, 0.0],
	  extent: [0, -1, 0, -1, 0, -1],
	  dataDescription: _Constants.StructuredType.EMPTY
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _DataSet2.default.extend(publicAPI, model, initialValues);

	  // Set/Get methods
	  macro.setGetArray(publicAPI, model, ['origin', 'spacing'], 3);
	  macro.getArray(publicAPI, model, ['extent'], 6);

	  // Object specific methods
	  vtkImageData(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkImageData');

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getDataDescriptionFromExtent = getDataDescriptionFromExtent;

	var _Constants = __webpack_require__(110);

	function getDataDescriptionFromExtent(inExt) {
	  var dataDim = 0;
	  for (var i = 0; i < 3; ++i) {
	    if (inExt[i * 2] < inExt[i * 2 + 1]) {
	      dataDim++;
	    }
	  }

	  if (inExt[0] > inExt[1] || inExt[2] > inExt[3] || inExt[4] > inExt[5]) {
	    return _Constants.StructuredType.EMPTY;
	  }

	  if (dataDim === 3) {
	    return _Constants.StructuredType.XYZ_GRID;
	  } else if (dataDim === 2) {
	    if (inExt[0] === inExt[1]) {
	      return _Constants.StructuredType.YZ_PLANE;
	    } else if (inExt[2] === inExt[3]) {
	      return _Constants.StructuredType.XZ_PLANE;
	    }
	    return _Constants.StructuredType.XY_PLANE;
	  } else if (dataDim === 1) {
	    if (inExt[0] < inExt[1]) {
	      return _Constants.StructuredType.X_LINE;
	    } else if (inExt[2] < inExt[3]) {
	      return _Constants.StructuredType.Y_LINE;
	    }
	    return _Constants.StructuredType.Z_LINE;
	  }

	  return _Constants.StructuredType.SINGLE_POINT;
	}

	exports.default = {
	  getDataDescriptionFromExtent: getDataDescriptionFromExtent
	};

/***/ },
/* 110 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var StructuredType = exports.StructuredType = {
	  UNCHANGED: 0,
	  SINGLE_POINT: 1,
	  X_LINE: 2,
	  Y_LINE: 3,
	  Z_LINE: 4,
	  XY_PLANE: 5,
	  YZ_PLANE: 6,
	  XZ_PLANE: 7,
	  XYZ_GRID: 8,
	  EMPTY: 9
	};

	exports.default = {
	  StructuredType: StructuredType
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _ScalarsToColors = __webpack_require__(112);

	var _ScalarsToColors2 = _interopRequireDefault(_ScalarsToColors);

	var _Constants = __webpack_require__(113);

	var _Math = __webpack_require__(32);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	// Add module-level functions or api that you want to expose statically via
	// the next section...

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	var BELOW_RANGE_COLOR_INDEX = 0;
	var ABOVE_RANGE_COLOR_INDEX = 1;
	var NAN_COLOR_INDEX = 2;

	// ----------------------------------------------------------------------------
	// vtkMyClass methods
	// ----------------------------------------------------------------------------

	function vtkLookupTable(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkLookupTable');

	  //----------------------------------------------------------------------------
	  // Description:
	  // Return true if all of the values defining the mapping have an opacity
	  // equal to 1. Default implementation return true.
	  publicAPI.isOpaque = function () {
	    if (model.opaqueFlagBuildTime.getMTime() < publicAPI.getMTime()) {
	      var opaque = true;
	      if (model.nanColor[3] < 1.0) {
	        opaque = 0;
	      }
	      if (model.useBelowRangeColor && model.belowRangeColor[3] < 1.0) {
	        opaque = 0;
	      }
	      if (model.useAboveRangeColor && model.aboveRangeColor[3] < 1.0) {
	        opaque = 0;
	      }
	      for (var i = 3; i < model.table.length && opaque; i += 4) {
	        if (model.table[i] < 255) {
	          opaque = false;
	        }
	      }
	      model.opaqueFlag = opaque;
	      model.opaqueFlagBuildTime.modified();
	    }

	    return model.opaqueFlag;
	  };

	  publicAPI.usingLogScale = function () {
	    return false;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getNumberOfAvailableColors = function () {
	    return model.table.length;
	  };

	  //----------------------------------------------------------------------------
	  // Apply shift/scale to the scalar value v and return the index.
	  publicAPI.linearIndexLookup = function (v, p) {
	    var dIndex = 0;

	    if (v < p.range[0]) {
	      dIndex = p.maxIndex + BELOW_RANGE_COLOR_INDEX + 1.5;
	    } else if (v > p.range[1]) {
	      dIndex = p.maxIndex + ABOVE_RANGE_COLOR_INDEX + 1.5;
	    } else {
	      dIndex = (v + p.shift) * p.scale;

	      // This conditional is needed because when v is very close to
	      // p.Range[1], it may map above p.MaxIndex in the linear mapping
	      // above.
	      dIndex = dIndex < p.maxIndex ? dIndex : p.maxIndex;
	    }

	    return Math.floor(dIndex);
	  };

	  publicAPI.linearLookup = function (v, table, p) {
	    var index = 0;
	    if (_Math2.default.isNan(v)) {
	      index = Math.floor(p.maxIndex + 1.5 + NAN_COLOR_INDEX);
	    } else {
	      index = publicAPI.linearIndexLookup(v, p);
	    }
	    return [table[4 * index], table[4 * index + 1], table[4 * index + 2], table[4 * index + 3]];
	  };

	  publicAPI.indexedLookupFunction = function (v, table, p) {
	    var index = publicAPI.getAnnotatedValueIndexInternal(v);
	    return [table[4 * index], table[4 * index + 1], table[4 * index + 2], table[4 * index + 3]];
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.lookupShiftAndScale = function (range, p) {
	    p.shift = -range[0];
	    p.scale = Number.MAX_VALUE;
	    if (range[1] > range[0]) {
	      p.scale = (p.maxIndex + 1) / (range[1] - range[0]);
	    }
	  };

	  // Public API methods
	  publicAPI.mapScalarsThroughTable = function (input, output, outFormat, inputOffset) {
	    var lookupFunc = publicAPI.linearLookup;
	    if (model.indexedLookup) {
	      lookupFunc = publicAPI.indexedLookupFunction;
	    }

	    var trange = publicAPI.getTableRange();

	    var p = {
	      maxIndex: publicAPI.getNumberOfColors() - 1,
	      range: trange,
	      shift: 0.0,
	      scale: 0.0
	    };
	    publicAPI.lookupShiftAndScale(trange, p);

	    var alpha = publicAPI.getAlpha();
	    var length = input.getNumberOfTuples();
	    var inIncr = input.getNumberOfComponents();

	    var outputV = output.getData();
	    var inputV = input.getData();

	    if (alpha >= 1.0) {
	      if (outFormat === _Constants.ScalarMappingTarget.RGBA) {
	        for (var i = 0; i < length; i++) {
	          var cptr = lookupFunc(inputV[i * inIncr + inputOffset], model.table, p);
	          outputV[i * 4] = cptr[0];
	          outputV[i * 4 + 1] = cptr[1];
	          outputV[i * 4 + 2] = cptr[2];
	          outputV[i * 4 + 3] = cptr[3];
	        }
	      }
	    } else {
	      /* eslint-disable no-lonely-if */
	      if (outFormat === _Constants.ScalarMappingTarget.RGBA) {
	        for (var _i = 0; _i < length; _i++) {
	          var _cptr = lookupFunc(inputV[_i * inIncr + inputOffset], model.table, p);
	          outputV[_i * 4] = _cptr[0];
	          outputV[_i * 4 + 1] = _cptr[1];
	          outputV[_i * 4 + 2] = _cptr[2];
	          outputV[_i * 4 + 3] = Math.floor(_cptr[3] * alpha + 0.5);
	        }
	      }
	    } // alpha blending
	  };

	  publicAPI.forceBuild = function () {
	    var hinc = 0.0;
	    var sinc = 0.0;
	    var vinc = 0.0;
	    var ainc = 0.0;

	    var maxIndex = model.numberOfColors - 1;

	    if (maxIndex) {
	      hinc = (model.hueRange[1] - model.hueRange[0]) / maxIndex;
	      sinc = (model.saturationRange[1] - model.saturationRange[0]) / maxIndex;
	      vinc = (model.valueRange[1] - model.valueRange[0]) / maxIndex;
	      ainc = (model.alphaRange[1] - model.alphaRange[0]) / maxIndex;
	    }

	    var hsv = [];
	    var rgba = [];
	    for (var i = 0; i <= maxIndex; i++) {
	      hsv[0] = model.hueRange[0] + i * hinc;
	      hsv[1] = model.saturationRange[0] + i * sinc;
	      hsv[2] = model.valueRange[0] + i * vinc;

	      _Math2.default.hsv2rgb(hsv, rgba);
	      rgba[3] = model.alphaRange[0] + i * ainc;

	      //  case VTK_RAMP_LINEAR:
	      model.table[i * 4] = rgba[0] * 255.0 + 0.5;
	      model.table[i * 4 + 1] = rgba[1] * 255.0 + 0.5;
	      model.table[i * 4 + 2] = rgba[2] * 255.0 + 0.5;
	      model.table[i * 4 + 3] = rgba[3] * 255.0 + 0.5;
	    }

	    publicAPI.buildSpecialColors();

	    model.buildTime.modified();
	  };

	  publicAPI.buildSpecialColors = function () {
	    // Add "special" colors (NaN, below range, above range) to table here.
	    var numberOfColors = model.numberOfColors;

	    var tptr = model.table;
	    var base = (model.numberOfColors + BELOW_RANGE_COLOR_INDEX) * 4;

	    // Below range color
	    if (model.useBelowRangeColor || numberOfColors === 0) {
	      tptr[base] = model.belowRangeColor[0] * 255.0 + 0.5;
	      tptr[base + 1] = model.belowRangeColor[1] * 255.0 + 0.5;
	      tptr[base + 2] = model.belowRangeColor[2] * 255.0 + 0.5;
	      tptr[base + 3] = model.belowRangeColor[3] * 255.0 + 0.5;
	    } else {
	      // Duplicate the first color in the table.
	      tptr[base] = tptr[0];
	      tptr[base + 1] = tptr[1];
	      tptr[base + 2] = tptr[2];
	      tptr[base + 3] = tptr[3];
	    }

	    // Above range color
	    base = (model.numberOfColors + ABOVE_RANGE_COLOR_INDEX) * 4;
	    if (model.useAboveRangeColor || numberOfColors === 0) {
	      tptr[base] = model.aboveRangeColor[0] * 255.0 + 0.5;
	      tptr[base + 1] = model.aboveRangeColor[1] * 255.0 + 0.5;
	      tptr[base + 2] = model.aboveRangeColor[2] * 255.0 + 0.5;
	      tptr[base + 3] = model.aboveRangeColor[3] * 255.0 + 0.5;
	    } else {
	      // Duplicate the last color in the table.
	      tptr[base] = tptr[4 * (numberOfColors - 1) + 0];
	      tptr[base + 1] = tptr[4 * (numberOfColors - 1) + 1];
	      tptr[base + 2] = tptr[4 * (numberOfColors - 1) + 2];
	      tptr[base + 3] = tptr[4 * (numberOfColors - 1) + 3];
	    }

	    // Always use NanColor
	    base = (model.numberOfColors + NAN_COLOR_INDEX) * 4;
	    tptr[base] = model.nanColor[0] * 255.0 + 0.5;
	    tptr[base + 1] = model.nanColor[1] * 255.0 + 0.5;
	    tptr[base + 2] = model.nanColor[2] * 255.0 + 0.5;
	    tptr[base + 3] = model.nanColor[3] * 255.0 + 0.5;
	  };

	  publicAPI.setRange = function (min, max) {
	    return publicAPI.setTableRange(min, max);
	  };
	  publicAPI.getRange = function () {
	    return publicAPI.getTableRange();
	  };

	  publicAPI.build = function () {
	    if (model.table.length < 1 || publicAPI.getMTime() > model.buildTime.getMTime()) {
	      publicAPI.forceBuild();
	    }
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  numberOfColors: 256,
	  // table: null,

	  hueRange: [0.0, 0.66667],
	  saturationRange: [1.0, 1.0],
	  valueRange: [1.0, 1.0],
	  alphaRange: [1.0, 1.0],
	  tableRange: [0.0, 1.0],

	  nanColor: [0.5, 0.0, 0.0, 1.0],
	  belowRangeColor: [0.0, 0.0, 0.0, 1.0],
	  aboveRangeColor: [1.0, 1.0, 1.0, 1.0],
	  useAboveRangeColor: false,
	  useBelowRangeColor: false,

	  alpha: 1.0
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ScalarsToColors2.default.extend(publicAPI, model);

	  // Internal objects initialization
	  if (!model.table) {
	    model.table = [];
	  }

	  model.buildTime = {};
	  macro.obj(model.buildTime);
	  model.opaqueFlagBuildTime = {};
	  macro.obj(model.opaqueFlagBuildTime);

	  // Object methods
	  macro.obj(publicAPI, model);

	  // Create get-only macros
	  macro.get(publicAPI, model, ['buildTime']);

	  // Create get-set macros
	  macro.setGet(publicAPI, model, ['numberOfColors', 'useAboveRangeColor', 'useBelowRangeColor']);

	  // Create set macros for array (needs to know size)
	  macro.setArray(publicAPI, model, ['alphaRange', 'hueRange', 'saturationRange', 'valueRange', 'tableRange'], 2);

	  macro.setArray(publicAPI, model, ['nanColor', 'belowRangeColor', 'aboveRangeColor'], 4);

	  // Create get macros for array
	  macro.getArray(publicAPI, model, ['hueRange', 'saturationRange', 'valueRange', 'tableRange', 'alphaRange', 'nanColor', 'belowRangeColor', 'aboveRangeColor']);

	  // For more macro methods, see "Sources/macro.js"

	  // Object specific methods
	  vtkLookupTable(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkLookupTable');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(3);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(113);

	var _Constants2 = __webpack_require__(76);

	var _Constants3 = __webpack_require__(68);

	var _DataArray = __webpack_require__(67);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	// Add module-level functions or api that you want to expose statically via
	// the next section...

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	function intColorToUChar(c) {
	  return c;
	}
	function floatColorToUChar(c) {
	  return Math.floor(c * 255.0 + 0.5);
	}

	// ----------------------------------------------------------------------------
	// vtkMyClass methods
	// ----------------------------------------------------------------------------

	function vtkScalarsToColors(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkScalarsToColors');

	  publicAPI.setVectorModeToMagnitude = function () {
	    return publicAPI.setVectorMode(_Constants.VectorMode.MAGNITUDE);
	  };
	  publicAPI.setVectorModeToComponent = function () {
	    return publicAPI.setVectorMode(_Constants.VectorMode.COMPONENT);
	  };
	  publicAPI.setVectorModeToRGBColors = function () {
	    return publicAPI.setVectorMode(_Constants.VectorMode.RGBCOLORS);
	  };

	  publicAPI.build = function () {};

	  publicAPI.isOpaque = function () {
	    return true;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.setAnnotations = function (values, annotations) {
	    if (values && !annotations || !values && annotations) {
	      return;
	    }

	    if (values && annotations && values.getNumberOfTuples() !== annotations.getNumberOfTuples()) {
	      console.error('Values and annotations do not have the same number of tuples so ignoring');
	      return;
	    }

	    model.annotationArray = [];

	    if (annotations && values) {
	      var num = annotations.getNumberOfTuples();
	      for (var i = 0; i < num; i++) {
	        model.annotationArray.push({ value: values[i], annotation: annotations[i] });
	      }
	    }

	    publicAPI.updateAnnotatedValueMap();
	    publicAPI.modified();
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.setAnnotation = function (value, annotation) {
	    var i = publicAPI.checkForAnnotatedValue(value);
	    var modified = false;
	    if (i >= 0) {
	      if (model.annotationArray[i].annotation !== annotation) {
	        model.annotationArray[i].annotation = annotation;
	        modified = true;
	      }
	    } else {
	      model.annotationArray.push({ value: value, annotation: annotation });
	      i = model.annotationArray.length - 1;
	      modified = true;
	    }
	    if (modified) {
	      publicAPI.updateAnnotatedValueMap();
	      publicAPI.modified();
	    }
	    return i;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getNumberOfAnnotatedValues = function () {
	    return model.annotationArray.length;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getAnnotatedValue = function (idx) {
	    if (idx < 0 || idx >= model.annotationArray.length) {
	      return null;
	    }
	    return model.annotationArray[idx].value;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getAnnotation = function (idx) {
	    if (model.annotationArray[idx] === undefined) {
	      return null;
	    }
	    return model.annotationArray[idx].annotation;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getAnnotatedValueIndex = function (val) {
	    return model.annotationArray.length ? publicAPI.checkForAnnotatedValue(val) : -1;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.removeAnnotation = function (value) {
	    var i = publicAPI.checkForAnnotatedValue(value);
	    var needToRemove = i >= 0;
	    if (needToRemove) {
	      model.annotationArray.splice(i, 1);
	      publicAPI.updateAnnotatedValueMap();
	      publicAPI.modified();
	    }
	    return needToRemove;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.resetAnnotations = function () {
	    model.annotationArray = [];
	    model.annotatedValueMap = [];
	    publicAPI.modified();
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getAnnotationColor = function (val, rgba) {
	    if (model.indexedLookup) {
	      var i = publicAPI.getAnnotatedValueIndex(val);
	      publicAPI.getIndexedColor(i, rgba);
	    } else {
	      publicAPI.getColor(parseFloat(val), rgba);
	      rgba[3] = 1.0;
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.checkForAnnotatedValue = function (value) {
	    return publicAPI.getAnnotatedValueIndexInternal(value);
	  };

	  //----------------------------------------------------------------------------
	  // An unsafe version of vtkScalarsToColors::CheckForAnnotatedValue for
	  // internal use (no pointer checks performed)
	  publicAPI.getAnnotatedValueIndexInternal = function (value) {
	    if (model.annotatedValueMap[value] !== undefined) {
	      var na = model.annotationArray.length;
	      return model.annotatedValueMap[value] % na;
	    }
	    return -1;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getIndexedColor = function (val, rgba) {
	    rgba[0] = rgba[1] = rgba[2] = rgba[3] = 0.0;
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.updateAnnotatedValueMap = function () {
	    model.annotatedValueMap = [];

	    var na = model.annotationArray.length;
	    for (var i = 0; i < na; ++i) {
	      model.annotatedValueMap[model.annotationArray[i].value] = i;
	    }
	  };

	  // Description:
	  // Internal methods that map a data array into a 4-component,
	  // unsigned char RGBA array. The color mode determines the behavior
	  // of mapping. If ColorMode.DEFAULT is set, then unsigned char
	  // data arrays are treated as colors (and converted to RGBA if
	  // necessary); If ColorMode.DIRECT_SCALARS is set, then all arrays
	  // are treated as colors (integer types are clamped in the range 0-255,
	  // floating point arrays are clamped in the range 0.0-1.0. Note 'char' does
	  // not have enough values to represent a color so mapping this type is
	  // considered an error);
	  // otherwise, the data is mapped through this instance
	  // of ScalarsToColors. The component argument is used for data
	  // arrays with more than one component; it indicates which component
	  // to use to do the blending.  When the component argument is -1,
	  // then the this object uses its own selected technique to change a
	  // vector into a scalar to map.
	  publicAPI.mapScalars = function (scalars, colorMode, componentIn) {
	    var numberOfComponents = scalars.getNumberOfComponents();

	    var newColors = null;

	    // map scalars through lookup table only if needed
	    if (colorMode === _Constants2.ColorMode.DEFAULT && scalars.getDataType() === _Constants3.VtkDataTypes.UNSIGNED_CHAR || colorMode === _Constants2.ColorMode.DIRECT_SCALARS && scalars) {
	      newColors = publicAPI.convertToRGBA(scalars, numberOfComponents, scalars.getNumberOfTuples());
	    } else {
	      var newscalars = {
	        type: 'vtkDataArray',
	        name: 'temp',
	        numberOfComponents: 4,
	        dataType: _Constants3.VtkDataTypes.UNSIGNED_CHAR
	      };

	      var s = new window[newscalars.dataType](4 * scalars.getNumberOfTuples());
	      for (var i = 0; i < s.length; i++) {
	        s[i] = Math.random();
	      }
	      newscalars.values = s;
	      newscalars.size = s.length;
	      newColors = _DataArray2.default.newInstance(newscalars);

	      var component = componentIn;

	      // If mapper did not specify a component, use the VectorMode
	      if (component < 0 && numberOfComponents > 1) {
	        publicAPI.mapVectorsThroughTable(scalars, newColors, _Constants.ScalarMappingTarget.RGBA, -1, -1);
	      } else {
	        if (component < 0) {
	          component = 0;
	        }
	        if (component >= numberOfComponents) {
	          component = numberOfComponents - 1;
	        }

	        // Map the scalars to colors
	        publicAPI.mapScalarsThroughTable(scalars, newColors, _Constants.ScalarMappingTarget.RGBA, component);
	      }
	    }

	    return newColors;
	  };

	  publicAPI.mapVectorsToMagnitude = function (input, output, compsToUse) {
	    var length = input.getNumberOfTuples();
	    var inIncr = input.getNumberOfComponents();

	    var outputV = output.getData();
	    var inputV = input.getData();

	    for (var i = 0; i < length; i++) {
	      var sum = 0.0;
	      for (var j = 0; j < compsToUse; j++) {
	        sum += inputV[i * inIncr + j];
	      }
	      outputV[i] = Math.sqrt(sum);
	    }
	  };

	  //----------------------------------------------------------------------------
	  // Map a set of vector values through the table
	  publicAPI.mapVectorsThroughTable = function (input, output, outputFormat, vectorComponentIn, vectorSizeIn) {
	    var vectorMode = publicAPI.getVectorMode();
	    var vectorSize = vectorSizeIn;
	    var vectorComponent = vectorComponentIn;
	    var inComponents = input.getNumberOfComponents();

	    if (vectorMode === _Constants.VectorMode.COMPONENT) {
	      // make sure vectorComponent is within allowed range
	      if (vectorComponent === -1) {
	        // if set to -1, use default value provided by table
	        vectorComponent = publicAPI.getVectorComponent();
	      }
	      if (vectorComponent < 0) {
	        vectorComponent = 0;
	      }
	      if (vectorComponent >= inComponents) {
	        vectorComponent = inComponents - 1;
	      }
	    } else {
	      // make sure vectorSize is within allowed range
	      if (vectorSize === -1) {
	        // if set to -1, use default value provided by table
	        vectorSize = publicAPI.getVectorSize();
	      }
	      if (vectorSize <= 0) {
	        vectorComponent = 0;
	        vectorSize = inComponents;
	      } else {
	        if (vectorComponent < 0) {
	          vectorComponent = 0;
	        }
	        if (vectorComponent >= inComponents) {
	          vectorComponent = inComponents - 1;
	        }
	        if (vectorComponent + vectorSize > inComponents) {
	          vectorSize = inComponents - vectorComponent;
	        }
	      }

	      if (vectorMode === _Constants.VectorMode.MAGNITUDE && (inComponents === 1 || vectorSize === 1)) {
	        vectorMode = _Constants.VectorMode.COMPONENT;
	      }
	    }

	    // increment input pointer to the first component to map
	    var inputOffset = 0;
	    if (vectorComponent > 0) {
	      inputOffset = vectorComponent;
	    }

	    // map according to the current vector mode
	    switch (vectorMode) {
	      case _Constants.VectorMode.COMPONENT:
	        {
	          publicAPI.mapScalarsThroughTable(input, output, outputFormat, inputOffset);
	          break;
	        }

	      default:
	      case _Constants.VectorMode.MAGNITUDE:
	        {
	          var magValues = _DataArray2.default.newInstance({ numberOfComponents: 1, values: new Float32Array(input.getNumberOfTuples()) });

	          publicAPI.mapVectorsToMagnitude(input, magValues, vectorSize);
	          publicAPI.mapScalarsThroughTable(magValues, output, outputFormat, 0);
	          break;
	        }

	      case _Constants.VectorMode.RGBCOLORS:
	        {
	          // publicAPI.mapColorsToColors(
	          //   input, output, inComponents, vectorSize,
	          //   outputFormat);
	          break;
	        }
	    }
	  };

	  publicAPI.luminanceToRGBA = function (newColors, colors, alpha, convtFun) {
	    var a = convtFun(alpha);

	    var values = colors.getData();
	    var newValues = newColors.getData();
	    var size = values.length;
	    var component = 0;
	    var tuple = 1;

	    var count = 0;
	    for (var i = component; i < size; i += tuple) {
	      var l = convtFun(values[i]);
	      newValues[count * 4] = l;
	      newValues[count * 4 + 1] = l;
	      newValues[count * 4 + 2] = l;
	      newValues[count * 4 + 3] = a;
	      count++;
	    }
	  };

	  publicAPI.luminanceAlphaToRGBA = function (newColors, colors, alpha, convtFun) {
	    var values = colors.getData();
	    var newValues = newColors.getData();
	    var size = values.length;
	    var component = 0;
	    var tuple = 2;

	    var count = 0;
	    for (var i = component; i < size; i += tuple) {
	      var l = convtFun(values[i]);
	      newValues[count] = l;
	      newValues[count + 1] = l;
	      newValues[count + 2] = l;
	      newValues[count + 3] = convtFun(values[i + 1]) * alpha;
	      count += 4;
	    }
	  };

	  publicAPI.rGBToRGBA = function (newColors, colors, alpha, convtFun) {
	    var a = floatColorToUChar(alpha);

	    var values = colors.getData();
	    var newValues = newColors.getData();
	    var size = values.length;
	    var component = 0;
	    var tuple = 3;

	    var count = 0;
	    for (var i = component; i < size; i += tuple) {
	      newValues[count * 4] = convtFun(values[i]);
	      newValues[count * 4 + 1] = convtFun(values[i + 1]);
	      newValues[count * 4 + 2] = convtFun(values[i + 2]);
	      newValues[count * 4 + 3] = a;
	      count++;
	    }
	  };

	  publicAPI.rGBAToRGBA = function (newColors, colors, alpha, convtFun) {
	    var values = colors.getData();
	    var newValues = newColors.getData();
	    var size = values.length;
	    var component = 0;
	    var tuple = 4;

	    var count = 0;
	    for (var i = component; i < size; i += tuple) {
	      newValues[count * 4] = convtFun(values[i]);
	      newValues[count * 4 + 1] = convtFun(values[i + 1]);
	      newValues[count * 4 + 2] = convtFun(values[i + 2]);
	      newColors[count * 4 + 3] = convtFun(values[i + 3]) * alpha;
	      count++;
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.convertToRGBA = function (colors, numComp, numTuples) {
	    if (numComp === 4 && model.alpha >= 1.0 && colors.getDataType() === _Constants3.VtkDataTypes.UNSIGNED_CHAR) {
	      return colors;
	    }

	    var newColors = _DataArray2.default.newInstance({
	      numberOfComponents: 4,
	      empty: true,
	      size: 4 * numTuples,
	      dataType: _Constants3.VtkDataTypes.UNSIGNED_CHAR
	    });

	    if (numTuples <= 0) {
	      return newColors;
	    }

	    var alpha = model.alpha;
	    alpha = alpha > 0 ? alpha : 0;
	    alpha = alpha < 1 ? alpha : 1;

	    var convtFun = intColorToUChar;
	    if (colors.getDataType() === _Constants3.VtkDataTypes.FLOAT || colors.getDataType() === _Constants3.VtkDataTypes.DOUBLE) {
	      convtFun = floatColorToUChar;
	    }

	    switch (numComp) {
	      case 1:
	        publicAPI.luminanceToRGBA(newColors, colors, alpha, convtFun);
	        break;

	      case 2:
	        publicAPI.luminanceAlphaToRGBA(newColors, colors, convtFun);
	        break;

	      case 3:
	        publicAPI.rGBToRGBA(newColors, colors, alpha, convtFun);
	        break;

	      case 4:
	        publicAPI.rGBAToRGBA(newColors, colors, alpha, convtFun);
	        break;

	      default:
	        console.error('Cannot convert colors');
	        return null;
	    }

	    return newColors;
	  };

	  publicAPI.usingLogScale = function () {
	    return false;
	  };

	  publicAPI.getNumberOfAvailableColors = function () {
	    return 256 * 256 * 256;
	  };

	  publicAPI.setRange = function (min, max) {
	    return publicAPI.setInputRange(min, max);
	  };
	  publicAPI.getRange = function (min, max) {
	    return publicAPI.getInputRange();
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  alpha: 1.0,
	  vectorComponent: 0,
	  vectorSize: -1,
	  vectorMode: _Constants.VectorMode.COMPONENT,
	  inputRange: [0, 255],
	  annotationArray: [],
	  annotatedValueMap: [],
	  indexedLookup: false
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);

	  // Create get-set macros
	  macro.setGet(publicAPI, model, ['vectorSize', 'vectorComponent', 'vectorMode', 'alpha', 'indexedLookup']);

	  // Create set macros for array (needs to know size)
	  macro.setArray(publicAPI, model, ['inputRange'], 2);

	  // Create get macros for array
	  macro.getArray(publicAPI, model, ['inputRange']);

	  // For more macro methods, see "Sources/macro.js"

	  // Object specific methods
	  vtkScalarsToColors(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkScalarsToColors');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ },
/* 113 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var VectorMode = exports.VectorMode = {
	  MAGNITUDE: 0,
	  COMPONENT: 1,
	  RGBCOLORS: 2
	};

	var ScalarMappingTarget = exports.ScalarMappingTarget = {
	  LUMINANCE: 1,
	  LUMINANCE_ALPHA: 2,
	  RGB: 3,
	  RGBA: 4
	};

	exports.default = {
	  VectorMode: VectorMode,
	  ScalarMappingTarget: ScalarMappingTarget
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(115);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(117)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./FullScreenRenderWindow.mcss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./FullScreenRenderWindow.mcss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(116)();
	// imports


	// module
	exports.push([module.id, ".FullScreenRenderWindow_container_KMb8R {\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n}\n\n.FullScreenRenderWindow_controlPanel_3l5tg {\n  position: absolute;\n  left: 25px;\n  top: 25px;\n  background-color: white;\n  border-radius: 5px;\n  list-style: none;\n  padding: 5px 10px;\n  margin: 0;\n  display: block;\n  border: solid 1px black;\n}\n", ""]);

	// exports
	exports.locals = {
		"container": "FullScreenRenderWindow_container_KMb8R",
		"controlPanel": "FullScreenRenderWindow_controlPanel_3l5tg"
	};

/***/ },
/* 116 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
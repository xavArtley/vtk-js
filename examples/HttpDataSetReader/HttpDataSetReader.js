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

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _Actor = __webpack_require__(1);

	var _Actor2 = _interopRequireDefault(_Actor);

	var _Camera = __webpack_require__(20);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _HttpDataSetReader = __webpack_require__(22);

	var _HttpDataSetReader2 = _interopRequireDefault(_HttpDataSetReader);

	var _Mapper = __webpack_require__(47);

	var _Mapper2 = _interopRequireDefault(_Mapper);

	var _RenderWindow = __webpack_require__(54);

	var _RenderWindow2 = _interopRequireDefault(_RenderWindow);

	var _Renderer = __webpack_require__(81);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _RenderWindow3 = __webpack_require__(84);

	var _RenderWindow4 = _interopRequireDefault(_RenderWindow3);

	var _RenderWindowInteractor = __webpack_require__(85);

	var _RenderWindowInteractor2 = _interopRequireDefault(_RenderWindowInteractor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* global __BASE_PATH__ */
	var datasetToLoad = ('/vtk-js') + '/data/cow.vtp';

	// Create some control UI
	var renderWindowContainer = document.querySelector('body');
	// ----------------------

	var ren = _Renderer2.default.newInstance();
	ren.setBackground(0.32, 0.34, 0.43);

	var renWin = _RenderWindow4.default.newInstance();
	renWin.addRenderer(ren);

	var glwindow = _RenderWindow2.default.newInstance();
	glwindow.setContainer(renderWindowContainer);
	renWin.addView(glwindow);

	var iren = _RenderWindowInteractor2.default.newInstance();
	iren.setView(glwindow);

	var actor = _Actor2.default.newInstance();
	ren.addActor(actor);

	var mapper = _Mapper2.default.newInstance();
	actor.setMapper(mapper);

	var cam = _Camera2.default.newInstance();
	ren.setActiveCamera(cam);
	cam.setFocalPoint(0, 0, 0);
	cam.setPosition(0, 0, 25);
	cam.setClippingRange(0.1, 50.0);

	var reader = _HttpDataSetReader2.default.newInstance({ fetchGzip: true });
	mapper.setInputConnection(reader.getOutputPort());

	iren.initialize();
	iren.bindEvents(renderWindowContainer, document);
	iren.start();

	// ---- Fetch geometry ----------
	// Server is not sending the .gz and whith the compress header
	// Need to fetch the true file name and uncompress it locally
	reader.setUrl(datasetToLoad).then(function () {
	  reader.loadData().then(function () {
	    renWin.render();
	  });
	});

	global.reader = reader;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(2);

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Prop3D = __webpack_require__(14);

	var _Prop3D2 = _interopRequireDefault(_Prop3D);

	var _Property = __webpack_require__(18);

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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 2 */
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

	exports.glMatrix = __webpack_require__(3);
	exports.mat2 = __webpack_require__(4);
	exports.mat2d = __webpack_require__(5);
	exports.mat3 = __webpack_require__(6);
	exports.mat4 = __webpack_require__(7);
	exports.quat = __webpack_require__(8);
	exports.vec2 = __webpack_require__(11);
	exports.vec3 = __webpack_require__(9);
	exports.vec4 = __webpack_require__(10);

/***/ },
/* 3 */
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
/* 4 */
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

	var glMatrix = __webpack_require__(3);

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
/* 5 */
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

	var glMatrix = __webpack_require__(3);

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
/* 6 */
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

	var glMatrix = __webpack_require__(3);

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
/* 7 */
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

	var glMatrix = __webpack_require__(3);

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
/* 8 */
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

	var glMatrix = __webpack_require__(3);
	var mat3 = __webpack_require__(6);
	var vec3 = __webpack_require__(9);
	var vec4 = __webpack_require__(10);

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
/* 9 */
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

	var glMatrix = __webpack_require__(3);

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
/* 10 */
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

	var glMatrix = __webpack_require__(3);

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

	var glMatrix = __webpack_require__(3);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.capitalize = capitalize;
	exports.enumToString = enumToString;
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

	var _vtk = __webpack_require__(13);

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

	// ----------------------------------------------------------------------------
	// vtkObject: modified(), onModified(callback), delete()
	// ----------------------------------------------------------------------------

	function obj(publicAPI) {
	  var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var callbacks = [];
	  model.mtime = model.mtime || globalMTime;
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

	    Object.keys(map).forEach(function (name) {
	      if (Array.isArray(map[name])) {
	        publicAPI['set' + capitalize(name)].apply(publicAPI, _toConsumableArray(map[name]));
	      } else if (publicAPI['set' + capitalize(name)]) {
	        publicAPI['set' + capitalize(name)](map[name]);
	      } else {
	        // Set data on model directly
	        if (['mtime'].indexOf(name) === -1) {
	          console.log('Warning: Set value to model directly', name, map[name]);
	        }
	        model[name] = map[name];
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
	  model.inputArrayToProcess = [];

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

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = vtk;
	exports.register = register;
	var factoryMapping = {};

	function vtk(obj) {
	  if (obj.isA) {
	    return obj;
	  }
	  if (!obj.type) {
	    console.log('Invalid VTK object');
	    return null;
	  }
	  var constructor = factoryMapping[obj.type];
	  if (!constructor) {
	    console.log('No vtk class found for Object of type', obj.type);
	    return null;
	  }

	  return constructor(obj);
	}

	function register(vtkClassName, constructor) {
	  factoryMapping[vtkClassName] = constructor;
	}

	// Nest register method under the vtk function
	vtk.register = register;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(2);

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _BoundingBox = __webpack_require__(15);

	var _BoundingBox2 = _interopRequireDefault(_BoundingBox);

	var _Prop = __webpack_require__(17);

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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = exports.INIT_BOUNDS = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Plane = __webpack_require__(16);

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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(19);

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
	    return publicAPI.setInterpolation(_Constants.VTK_INTERPOLATION.FLAT);
	  };
	  publicAPI.setInterpolationToGouraud = function () {
	    return publicAPI.setInterpolation(_Constants.VTK_INTERPOLATION.GOURAUD);
	  };
	  publicAPI.setInterpolationToPhong = function () {
	    return publicAPI.setInterpolation(_Constants.VTK_INTERPOLATION.PHONG);
	  };

	  publicAPI.getInterpolationAsString = function () {
	    return _Constants.VTK_SHADING_MODEL[model.interpolation];
	  };

	  publicAPI.setRepresentationToWireframe = function () {
	    return publicAPI.setRepresentation(_Constants.VTK_REPRESENTATION.WIREFRAME);
	  };
	  publicAPI.setRepresentationToSurface = function () {
	    return publicAPI.setRepresentation(_Constants.VTK_REPRESENTATION.SURFACE);
	  };
	  publicAPI.setRepresentationToPoints = function () {
	    return publicAPI.setRepresentation(_Constants.VTK_REPRESENTATION.POINTS);
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
	  interpolation: _Constants.VTK_INTERPOLATION.GOURAUD,
	  representation: _Constants.VTK_REPRESENTATION.SURFACE,
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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var VTK_SHADING = exports.VTK_SHADING = {
	  FLAT: 0,
	  GOURAUD: 1,
	  PHONG: 2
	};

	var VTK_REPRESENTATION = exports.VTK_REPRESENTATION = {
	  POINTS: 0,
	  WIREFRAME: 1,
	  SURFACE: 2
	};

	var VTK_INTERPOLATION = exports.VTK_INTERPOLATION = {
	  FLAT: 0,
	  GOURAUD: 1,
	  PHONG: 2
	};

	exports.default = {
	  VTK_SHADING: VTK_SHADING,
	  VTK_REPRESENTATION: VTK_REPRESENTATION,
	  VTK_INTERPOLATION: VTK_INTERPOLATION
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.DEFAULT_VALUES = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(2);

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Math = __webpack_require__(21);

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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	// ----------------------------------------------------------------------------
	/* eslint-disable camelcase                                                  */
	/* eslint-disable no-cond-assign                                             */
	/* eslint-disable no-bitwise                                                 */
	// ----------------------------------------------------------------------------
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

	var randomSeed = notImplemented('randomSeed');
	var getSeed = notImplemented('getSeed');

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkHttpDataSetReader = vtkHttpDataSetReader;
	exports.extend = extend;

	var _pako = __webpack_require__(23);

	var _pako2 = _interopRequireDefault(_pako);

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _vtk = __webpack_require__(13);

	var _vtk2 = _interopRequireDefault(_vtk);

	var _Endian = __webpack_require__(39);

	var _Endian2 = _interopRequireDefault(_Endian);

	var _PolyData = __webpack_require__(40);

	var _PolyData2 = _interopRequireDefault(_PolyData);

	var _Constants = __webpack_require__(46);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* global XMLHttpRequest window */

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	var GEOMETRY_ARRAYS = {
	  vtkPolyData: function vtkPolyData(dataset) {
	    var arrayToDownload = [];
	    arrayToDownload.push(dataset.vtkPolyData.Points);
	    Object.keys(dataset.vtkPolyData).forEach(function (cellName) {
	      if (dataset.vtkPolyData[cellName]) {
	        arrayToDownload.push(dataset.vtkPolyData[cellName]);
	      }
	    });

	    return arrayToDownload;
	  },
	  vtkImageData: function vtkImageData(dataset) {
	    return [];
	  },
	  vtkUnstructuredGrid: function vtkUnstructuredGrid(dataset) {
	    var arrayToDownload = [];
	    arrayToDownload.push(dataset.vtkUnstructuredGrid.Points);
	    arrayToDownload.push(dataset.vtkUnstructuredGrid.Cells);
	    arrayToDownload.push(dataset.vtkUnstructuredGrid.CellTypes);

	    return arrayToDownload;
	  },
	  vtkRectilinearGrid: function vtkRectilinearGrid(dataset) {
	    var arrayToDownload = [];
	    arrayToDownload.push(dataset.vtkRectilinearGrid.XCoordinates);
	    arrayToDownload.push(dataset.vtkRectilinearGrid.YCoordinates);
	    arrayToDownload.push(dataset.vtkRectilinearGrid.ZCoordinates);

	    return arrayToDownload;
	  },
	  vtkMultiBlock: function vtkMultiBlock(dataset) {
	    var arrayToDownload = [];
	    Object.keys(dataset.vtkMultiBlock.Blocks).forEach(function (blockName) {
	      var fn = GEOMETRY_ARRAYS[dataset.vtkMultiBlock.Blocks[blockName].type];
	      if (fn) {
	        arrayToDownload = [].concat(arrayToDownload, fn(dataset.vtkMultiBlock.Blocks[blockName]));
	      }
	    });

	    return arrayToDownload;
	  }
	};

	// ----------------------------------------------------------------------------
	// vtkHttpDataSetReader methods
	// ----------------------------------------------------------------------------

	function vtkHttpDataSetReader(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkHttpDataSetReader');

	  // Empty output by default
	  model.output[0] = _PolyData2.default.newInstance();

	  // Internal method to fetch Array
	  function fetchArray(array) {
	    var fetchGzip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    if (array.ref && !array.ref.pending) {
	      return new Promise(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        var url = [model.baseURL, array.ref.basepath, fetchGzip ? array.ref.id + '.gz' : array.ref.id].join('/');

	        xhr.onreadystatechange = function (e) {
	          if (xhr.readyState === 1) {
	            array.ref.pending = true;
	            if (++model.requestCount === 1) {
	              publicAPI.invokeBusy(true);
	            }
	          }
	          if (xhr.readyState === 4) {
	            array.ref.pending = false;
	            if (xhr.status === 200 || xhr.status === 0) {
	              array.buffer = xhr.response;

	              if (fetchGzip) {
	                if (array.dataType === 'JSON') {
	                  array.buffer = _pako2.default.inflate(new Uint8Array(array.buffer), { to: 'string' });
	                } else {
	                  array.buffer = _pako2.default.inflate(new Uint8Array(array.buffer)).buffer;
	                }
	              }

	              if (array.dataType === 'JSON') {
	                array.values = JSON.parse(array.buffer);
	              } else {
	                if (_Endian2.default.ENDIANNESS !== array.ref.encode && _Endian2.default.ENDIANNESS) {
	                  // Need to swap bytes
	                  console.log('Swap bytes of', array.name);
	                  _Endian2.default.swapBytes(array.buffer, _Constants.TYPE_BYTES[array.dataType]);
	                }

	                array.values = new window[array.dataType](array.buffer);
	              }

	              if (array.values.length !== array.size) {
	                console.error('Error in FetchArray:', array.name, 'does not have the proper array size. Got', array.values.length, 'instead of', array.size);
	              }

	              // Done with the ref and work
	              delete array.ref;
	              if (--model.requestCount === 0) {
	                publicAPI.invokeBusy(false);
	              }
	              publicAPI.modified();
	              resolve(array);
	            } else {
	              reject(xhr, e);
	            }
	          }
	        };

	        // Make request
	        xhr.open('GET', url, true);
	        xhr.responseType = fetchGzip || array.dataType !== 'JSON' ? 'arraybuffer' : 'text';
	        xhr.send();
	      });
	    }

	    return new Promise(function (resolve, reject) {
	      resolve(array);
	    });
	  }

	  // Internal method to fill block information and state
	  function fillBlocks(dataset, block, arraysToList, enable) {
	    if (dataset.type === 'vtkMultiBlock') {
	      Object.keys(dataset.MultiBlock.Blocks).forEach(function (blockName) {
	        block[blockName] = fillBlocks(dataset.MultiBlock.Blocks[blockName], {}, arraysToList, enable);
	        block[blockName].enable = enable;
	      });
	    } else {
	      (function () {
	        block.type = dataset.type;
	        block.enable = enable;
	        var container = dataset[dataset.type];
	        _Constants.LOCATIONS.forEach(function (location) {
	          if (container[location]) {
	            Object.keys(container[location]).forEach(function (name) {
	              if (arraysToList[location + '_:|:_' + name]) {
	                arraysToList[location + '_:|:_' + name].ds.push(container);
	              } else {
	                arraysToList[location + '_:|:_' + name] = { name: name, enable: enable, location: location, ds: [container] };
	              }
	            });
	          }
	        });
	      })();
	    }

	    return block;
	  }

	  // Internal method to test if a dataset should be fetched
	  function isDatasetEnable(root, blockState, dataset) {
	    var enable = false;
	    if (root[root.type] === dataset) {
	      return blockState ? blockState.enable : true;
	    }

	    // Find corresponding datasetBlock
	    if (root.MultiBlock && root.MultiBlock.Blocks) {
	      Object.keys(root.MultiBlock.Blocks).forEach(function (blockName) {
	        if (enable) {
	          return;
	        }

	        var subRoot = root.MultiBlock.Blocks[blockName];
	        var subState = blockState[blockName];

	        if (!subState.enable) {
	          return;
	        }

	        if (isDatasetEnable(subRoot, subState, dataset)) {
	          enable = true;
	        }
	      });
	    }

	    return enable;
	  }

	  // Fetch dataset (metadata)
	  publicAPI.updateMetadata = function () {
	    return new Promise(function (resolve, reject) {
	      var xhr = new XMLHttpRequest();
	      var dataset = model.dataset;

	      xhr.onreadystatechange = function (e) {
	        if (xhr.readyState === 1) {
	          if (++model.requestCount === 1) {
	            publicAPI.invokeBusy(true);
	          }
	        }
	        if (xhr.readyState === 4) {
	          if (--model.requestCount === 0) {
	            publicAPI.invokeBusy(false);
	          }

	          if (xhr.status === 200) {
	            (function () {
	              dataset = JSON.parse(xhr.responseText);
	              model.dataset = dataset;

	              // Generate array list
	              model.arrays = [];

	              var container = dataset[dataset.type];
	              var enable = model.enableArray;
	              if (container.Blocks) {
	                (function () {
	                  model.blocks = {};
	                  var arraysToList = {};
	                  fillBlocks(dataset, model.blocks, arraysToList, enable);
	                  Object.keys(arraysToList).forEach(function (id) {
	                    model.arrays.push(arraysToList[id]);
	                  });
	                })();
	              } else {
	                // Regular dataset
	                _Constants.LOCATIONS.forEach(function (location) {
	                  if (container[location]) {
	                    Object.keys(container[location]).forEach(function (name) {
	                      model.arrays.push({ name: name, enable: enable, location: location, ds: [container] });
	                    });
	                  }
	                });
	              }

	              // Fetch geometry arrays
	              var pendingPromises = [];
	              GEOMETRY_ARRAYS[dataset.type](dataset).forEach(function (array) {
	                pendingPromises.push(fetchArray(array, model.fetchGzip));
	              });

	              // Wait for all geometry array to be fetched
	              if (pendingPromises.length) {
	                Promise.all(pendingPromises).then(function (ok) {
	                  model.output[0] = (0, _vtk2.default)(dataset);
	                  resolve(publicAPI, model.output[0]);
	                }, function (err) {
	                  reject(err);
	                });
	              } else {
	                model.output[0] = (0, _vtk2.default)(dataset);
	                resolve(publicAPI, model.output[0]);
	              }
	            })();
	          } else {
	            reject(xhr, e);
	          }
	        }
	      };

	      // Make request
	      xhr.open('GET', model.url, true);
	      xhr.responseType = 'text';
	      xhr.send();
	    });
	  };

	  // Set DataSet url
	  publicAPI.setUrl = function (url) {
	    if (url.indexOf('index.json') === -1) {
	      model.baseURL = url;
	      model.url = url + '/index.json';
	    } else {
	      model.url = url;

	      // Remove the file in the URL
	      var path = url.split('/');
	      path.pop();
	      model.baseURL = path.join('/');
	    }

	    // Fetch metadata
	    return publicAPI.updateMetadata();
	  };

	  // Fetch the actual data arrays
	  publicAPI.loadData = function () {
	    var datasetStruct = model.dataset;
	    var datasetObj = model.output[0];
	    var arrayToFecth = [];
	    var arrayMappingFunc = [];
	    model.arrays.filter(function (array) {
	      return array.enable;
	    }).forEach(function (array) {
	      array.ds.forEach(function (ds) {
	        if (isDatasetEnable(datasetStruct, model.blocks, ds)) {
	          if (ds[array.location][array.name].ref) {
	            arrayToFecth.push(ds[array.location][array.name]);
	            arrayMappingFunc.push(datasetObj['get' + array.location]().addArray);
	          }
	        }
	      });
	    });

	    return new Promise(function (resolve, reject) {
	      var lastArray = null;
	      var error = function error(xhr, e) {
	        reject(xhr, e);
	      };

	      var processNext = function processNext() {
	        if (lastArray) {
	          arrayMappingFunc.pop()((0, _vtk2.default)(lastArray));
	        }

	        if (arrayToFecth.length) {
	          lastArray = arrayToFecth.pop();
	          fetchArray(lastArray, model.fetchGzip).then(processNext, error);
	        } else {
	          datasetObj.modified();
	          resolve(publicAPI, datasetObj);
	        }
	      };

	      // Start processing queue
	      processNext();
	    });
	  };

	  publicAPI.requestData = function (inData, outData) {
	    // do nothing loadData will eventually load up the data
	  };

	  // Toggle arrays to load
	  publicAPI.enableArray = function (location, name) {
	    var enable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	    var activeArray = model.arrays.filter(function (array) {
	      return array.name === name && array.location === location;
	    });
	    if (activeArray.length === 1) {
	      activeArray[0].enable = enable;
	    }
	  };

	  // Toggle blocks to load
	  publicAPI.enableBlock = function (blockPath) {
	    var enable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    var pathSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';

	    var container = model.blocks;
	    var path = blockPath.split(pathSeparator);

	    while (container && path.length > 1) {
	      container = container[path.shift];
	    }

	    if (container && path.length === 1) {
	      container[path[0]].enable = enable;
	    }
	  };

	  // return Busy state
	  publicAPI.isBusy = function () {
	    return !!model.requestCount;
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  enableArray: true,
	  fetchGzip: false,
	  arrays: [],
	  blocks: null,
	  url: null,
	  baseURL: null,
	  requestCount: 0
	};

	// ----------------------------------------------------------------------------


	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model);
	  macro.get(publicAPI, model, ['enableArray', 'fetchGzip', 'blocks', 'url', 'baseURL']);
	  macro.getArray(publicAPI, model, ['arrays']);
	  macro.algo(publicAPI, model, 0, 1);
	  macro.event(publicAPI, model, 'busy');

	  // Object methods
	  vtkHttpDataSetReader(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Top level file is just a mixin of submodules & constants
	'use strict';

	var assign    = __webpack_require__(24).assign;

	var deflate   = __webpack_require__(25);
	var inflate   = __webpack_require__(33);
	var constants = __webpack_require__(37);

	var pako = {};

	assign(pako, deflate, inflate, constants);

	module.exports = pako;


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';


	var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
	                (typeof Uint16Array !== 'undefined') &&
	                (typeof Int32Array !== 'undefined');


	exports.assign = function (obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);
	  while (sources.length) {
	    var source = sources.shift();
	    if (!source) { continue; }

	    if (typeof source !== 'object') {
	      throw new TypeError(source + 'must be non-object');
	    }

	    for (var p in source) {
	      if (source.hasOwnProperty(p)) {
	        obj[p] = source[p];
	      }
	    }
	  }

	  return obj;
	};


	// reduce buffer size, avoiding mem copy
	exports.shrinkBuf = function (buf, size) {
	  if (buf.length === size) { return buf; }
	  if (buf.subarray) { return buf.subarray(0, size); }
	  buf.length = size;
	  return buf;
	};


	var fnTyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    if (src.subarray && dest.subarray) {
	      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
	      return;
	    }
	    // Fallback to ordinary array
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    var i, l, len, pos, chunk, result;

	    // calculate data length
	    len = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      len += chunks[i].length;
	    }

	    // join chunks
	    result = new Uint8Array(len);
	    pos = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      chunk = chunks[i];
	      result.set(chunk, pos);
	      pos += chunk.length;
	    }

	    return result;
	  }
	};

	var fnUntyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    return [].concat.apply([], chunks);
	  }
	};


	// Enable/Disable typed arrays use, for testing
	//
	exports.setTyped = function (on) {
	  if (on) {
	    exports.Buf8  = Uint8Array;
	    exports.Buf16 = Uint16Array;
	    exports.Buf32 = Int32Array;
	    exports.assign(exports, fnTyped);
	  } else {
	    exports.Buf8  = Array;
	    exports.Buf16 = Array;
	    exports.Buf32 = Array;
	    exports.assign(exports, fnUntyped);
	  }
	};

	exports.setTyped(TYPED_OK);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var zlib_deflate = __webpack_require__(26);
	var utils        = __webpack_require__(24);
	var strings      = __webpack_require__(31);
	var msg          = __webpack_require__(30);
	var ZStream      = __webpack_require__(32);

	var toString = Object.prototype.toString;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/

	var Z_NO_FLUSH      = 0;
	var Z_FINISH        = 4;

	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	var Z_SYNC_FLUSH    = 2;

	var Z_DEFAULT_COMPRESSION = -1;

	var Z_DEFAULT_STRATEGY    = 0;

	var Z_DEFLATED  = 8;

	/* ===========================================================================*/


	/**
	 * class Deflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[deflate]],
	 * [[deflateRaw]] and [[gzip]].
	 **/

	/* internal
	 * Deflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Deflate#onData]] not overriden.
	 **/

	/**
	 * Deflate.result -> Uint8Array|Array
	 *
	 * Compressed result, generated by default [[Deflate#onData]]
	 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
	 * push a chunk with explicit flush (call [[Deflate#push]] with
	 * `Z_SYNC_FLUSH` param).
	 **/

	/**
	 * Deflate.err -> Number
	 *
	 * Error code after deflate finished. 0 (Z_OK) on success.
	 * You will not need it in real life, because deflate errors
	 * are possible only on wrong options or bad `onData` / `onEnd`
	 * custom handlers.
	 **/

	/**
	 * Deflate.msg -> String
	 *
	 * Error message, if [[Deflate.err]] != 0
	 **/


	/**
	 * new Deflate(options)
	 * - options (Object): zlib deflate options.
	 *
	 * Creates new deflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `level`
	 * - `windowBits`
	 * - `memLevel`
	 * - `strategy`
	 * - `dictionary`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw deflate
	 * - `gzip` (Boolean) - create gzip wrapper
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 * - `header` (Object) - custom header for gzip
	 *   - `text` (Boolean) - true if compressed data believed to be text
	 *   - `time` (Number) - modification time, unix timestamp
	 *   - `os` (Number) - operation system code
	 *   - `extra` (Array) - array of bytes with extra data (max 65536)
	 *   - `name` (String) - file name (binary string)
	 *   - `comment` (String) - comment (binary string)
	 *   - `hcrc` (Boolean) - true if header crc should be added
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var deflate = new pako.Deflate({ level: 3});
	 *
	 * deflate.push(chunk1, false);
	 * deflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (deflate.err) { throw new Error(deflate.err); }
	 *
	 * console.log(deflate.result);
	 * ```
	 **/
	function Deflate(options) {
	  if (!(this instanceof Deflate)) return new Deflate(options);

	  this.options = utils.assign({
	    level: Z_DEFAULT_COMPRESSION,
	    method: Z_DEFLATED,
	    chunkSize: 16384,
	    windowBits: 15,
	    memLevel: 8,
	    strategy: Z_DEFAULT_STRATEGY,
	    to: ''
	  }, options || {});

	  var opt = this.options;

	  if (opt.raw && (opt.windowBits > 0)) {
	    opt.windowBits = -opt.windowBits;
	  }

	  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
	    opt.windowBits += 16;
	  }

	  this.err    = 0;      // error code, if happens (0 = Z_OK)
	  this.msg    = '';     // error message
	  this.ended  = false;  // used to avoid multiple onEnd() calls
	  this.chunks = [];     // chunks of compressed data

	  this.strm = new ZStream();
	  this.strm.avail_out = 0;

	  var status = zlib_deflate.deflateInit2(
	    this.strm,
	    opt.level,
	    opt.method,
	    opt.windowBits,
	    opt.memLevel,
	    opt.strategy
	  );

	  if (status !== Z_OK) {
	    throw new Error(msg[status]);
	  }

	  if (opt.header) {
	    zlib_deflate.deflateSetHeader(this.strm, opt.header);
	  }

	  if (opt.dictionary) {
	    var dict;
	    // Convert data if needed
	    if (typeof opt.dictionary === 'string') {
	      // If we need to compress text, change encoding to utf8.
	      dict = strings.string2buf(opt.dictionary);
	    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
	      dict = new Uint8Array(opt.dictionary);
	    } else {
	      dict = opt.dictionary;
	    }

	    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

	    if (status !== Z_OK) {
	      throw new Error(msg[status]);
	    }

	    this._dict_set = true;
	  }
	}

	/**
	 * Deflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
	 *   converted to utf8 byte sequence.
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
	 * new compressed chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
	 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
	 * can use mode Z_SYNC_FLUSH, keeping the compression context.
	 *
	 * On fail call [[Deflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * array format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Deflate.prototype.push = function (data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var status, _mode;

	  if (this.ended) { return false; }

	  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

	  // Convert data if needed
	  if (typeof data === 'string') {
	    // If we need to compress text, change encoding to utf8.
	    strm.input = strings.string2buf(data);
	  } else if (toString.call(data) === '[object ArrayBuffer]') {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }

	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;

	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }
	    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

	    if (status !== Z_STREAM_END && status !== Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }
	    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
	      if (this.options.to === 'string') {
	        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
	      } else {
	        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	      }
	    }
	  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

	  // Finalize on the last chunk.
	  if (_mode === Z_FINISH) {
	    status = zlib_deflate.deflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === Z_OK;
	  }

	  // callback interim results if Z_SYNC_FLUSH.
	  if (_mode === Z_SYNC_FLUSH) {
	    this.onEnd(Z_OK);
	    strm.avail_out = 0;
	    return true;
	  }

	  return true;
	};


	/**
	 * Deflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Deflate.prototype.onData = function (chunk) {
	  this.chunks.push(chunk);
	};


	/**
	 * Deflate#onEnd(status) -> Void
	 * - status (Number): deflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called once after you tell deflate that the input stream is
	 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
	 * or if an error happened. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Deflate.prototype.onEnd = function (status) {
	  // On success - join
	  if (status === Z_OK) {
	    if (this.options.to === 'string') {
	      this.result = this.chunks.join('');
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};


	/**
	 * deflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * Compress `data` with deflate algorithm and `options`.
	 *
	 * Supported options are:
	 *
	 * - level
	 * - windowBits
	 * - memLevel
	 * - strategy
	 * - dictionary
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
	 *
	 * console.log(pako.deflate(data));
	 * ```
	 **/
	function deflate(input, options) {
	  var deflator = new Deflate(options);

	  deflator.push(input, true);

	  // That will never happens, if you don't cheat with options :)
	  if (deflator.err) { throw deflator.msg; }

	  return deflator.result;
	}


	/**
	 * deflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function deflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return deflate(input, options);
	}


	/**
	 * gzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but create gzip wrapper instead of
	 * deflate one.
	 **/
	function gzip(input, options) {
	  options = options || {};
	  options.gzip = true;
	  return deflate(input, options);
	}


	exports.Deflate = Deflate;
	exports.deflate = deflate;
	exports.deflateRaw = deflateRaw;
	exports.gzip = gzip;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils   = __webpack_require__(24);
	var trees   = __webpack_require__(27);
	var adler32 = __webpack_require__(28);
	var crc32   = __webpack_require__(29);
	var msg     = __webpack_require__(30);

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	var Z_NO_FLUSH      = 0;
	var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	//var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	//var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	//var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;


	/* compression levels */
	//var Z_NO_COMPRESSION      = 0;
	//var Z_BEST_SPEED          = 1;
	//var Z_BEST_COMPRESSION    = 9;
	var Z_DEFAULT_COMPRESSION = -1;


	var Z_FILTERED            = 1;
	var Z_HUFFMAN_ONLY        = 2;
	var Z_RLE                 = 3;
	var Z_FIXED               = 4;
	var Z_DEFAULT_STRATEGY    = 0;

	/* Possible values of the data_type field (though see inflate()) */
	//var Z_BINARY              = 0;
	//var Z_TEXT                = 1;
	//var Z_ASCII               = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;


	/* The deflate compression method */
	var Z_DEFLATED  = 8;

	/*============================================================================*/


	var MAX_MEM_LEVEL = 9;
	/* Maximum value for memLevel in deflateInit2 */
	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_MEM_LEVEL = 8;


	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */
	var LITERALS      = 256;
	/* number of literal bytes 0..255 */
	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */
	var D_CODES       = 30;
	/* number of distance codes */
	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */
	var HEAP_SIZE     = 2 * L_CODES + 1;
	/* maximum heap size */
	var MAX_BITS  = 15;
	/* All codes must not exceed MAX_BITS bits */

	var MIN_MATCH = 3;
	var MAX_MATCH = 258;
	var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

	var PRESET_DICT = 0x20;

	var INIT_STATE = 42;
	var EXTRA_STATE = 69;
	var NAME_STATE = 73;
	var COMMENT_STATE = 91;
	var HCRC_STATE = 103;
	var BUSY_STATE = 113;
	var FINISH_STATE = 666;

	var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
	var BS_BLOCK_DONE     = 2; /* block flush performed */
	var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
	var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

	var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

	function err(strm, errorCode) {
	  strm.msg = msg[errorCode];
	  return errorCode;
	}

	function rank(f) {
	  return ((f) << 1) - ((f) > 4 ? 9 : 0);
	}

	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


	/* =========================================================================
	 * Flush as much pending output as possible. All deflate() output goes
	 * through this function so some applications may wish to modify it
	 * to avoid allocating a large strm->output buffer and copying into it.
	 * (See also read_buf()).
	 */
	function flush_pending(strm) {
	  var s = strm.state;

	  //_tr_flush_bits(s);
	  var len = s.pending;
	  if (len > strm.avail_out) {
	    len = strm.avail_out;
	  }
	  if (len === 0) { return; }

	  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
	  strm.next_out += len;
	  s.pending_out += len;
	  strm.total_out += len;
	  strm.avail_out -= len;
	  s.pending -= len;
	  if (s.pending === 0) {
	    s.pending_out = 0;
	  }
	}


	function flush_block_only(s, last) {
	  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
	  s.block_start = s.strstart;
	  flush_pending(s.strm);
	}


	function put_byte(s, b) {
	  s.pending_buf[s.pending++] = b;
	}


	/* =========================================================================
	 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
	 * IN assertion: the stream state is correct and there is enough room in
	 * pending_buf.
	 */
	function putShortMSB(s, b) {
	//  put_byte(s, (Byte)(b >> 8));
	//  put_byte(s, (Byte)(b & 0xff));
	  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
	  s.pending_buf[s.pending++] = b & 0xff;
	}


	/* ===========================================================================
	 * Read a new buffer from the current input stream, update the adler32
	 * and total number of bytes read.  All deflate() input goes through
	 * this function so some applications may wish to modify it to avoid
	 * allocating a large strm->input buffer and copying from it.
	 * (See also flush_pending()).
	 */
	function read_buf(strm, buf, start, size) {
	  var len = strm.avail_in;

	  if (len > size) { len = size; }
	  if (len === 0) { return 0; }

	  strm.avail_in -= len;

	  // zmemcpy(buf, strm->next_in, len);
	  utils.arraySet(buf, strm.input, strm.next_in, len, start);
	  if (strm.state.wrap === 1) {
	    strm.adler = adler32(strm.adler, buf, len, start);
	  }

	  else if (strm.state.wrap === 2) {
	    strm.adler = crc32(strm.adler, buf, len, start);
	  }

	  strm.next_in += len;
	  strm.total_in += len;

	  return len;
	}


	/* ===========================================================================
	 * Set match_start to the longest match starting at the given string and
	 * return its length. Matches shorter or equal to prev_length are discarded,
	 * in which case the result is equal to prev_length and match_start is
	 * garbage.
	 * IN assertions: cur_match is the head of the hash chain for the current
	 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
	 * OUT assertion: the match length is not greater than s->lookahead.
	 */
	function longest_match(s, cur_match) {
	  var chain_length = s.max_chain_length;      /* max hash chain length */
	  var scan = s.strstart; /* current string */
	  var match;                       /* matched string */
	  var len;                           /* length of current match */
	  var best_len = s.prev_length;              /* best match length so far */
	  var nice_match = s.nice_match;             /* stop if match long enough */
	  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
	      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

	  var _win = s.window; // shortcut

	  var wmask = s.w_mask;
	  var prev  = s.prev;

	  /* Stop when cur_match becomes <= limit. To simplify the code,
	   * we prevent matches with the string of window index 0.
	   */

	  var strend = s.strstart + MAX_MATCH;
	  var scan_end1  = _win[scan + best_len - 1];
	  var scan_end   = _win[scan + best_len];

	  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
	   * It is easy to get rid of this optimization if necessary.
	   */
	  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

	  /* Do not waste too much time if we already have a good match: */
	  if (s.prev_length >= s.good_match) {
	    chain_length >>= 2;
	  }
	  /* Do not look for matches beyond the end of the input. This is necessary
	   * to make deflate deterministic.
	   */
	  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

	  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

	  do {
	    // Assert(cur_match < s->strstart, "no future");
	    match = cur_match;

	    /* Skip to next match if the match length cannot increase
	     * or if the match length is less than 2.  Note that the checks below
	     * for insufficient lookahead only occur occasionally for performance
	     * reasons.  Therefore uninitialized memory will be accessed, and
	     * conditional jumps will be made that depend on those values.
	     * However the length of the match is limited to the lookahead, so
	     * the output of deflate is not affected by the uninitialized values.
	     */

	    if (_win[match + best_len]     !== scan_end  ||
	        _win[match + best_len - 1] !== scan_end1 ||
	        _win[match]                !== _win[scan] ||
	        _win[++match]              !== _win[scan + 1]) {
	      continue;
	    }

	    /* The check at best_len-1 can be removed because it will be made
	     * again later. (This heuristic is not always a win.)
	     * It is not necessary to compare scan[2] and match[2] since they
	     * are always equal when the other bytes match, given that
	     * the hash keys are equal and that HASH_BITS >= 8.
	     */
	    scan += 2;
	    match++;
	    // Assert(*scan == *match, "match[2]?");

	    /* We check for insufficient lookahead only every 8th comparison;
	     * the 256th check will be made at strstart+258.
	     */
	    do {
	      /*jshint noempty:false*/
	    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             scan < strend);

	    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

	    len = MAX_MATCH - (strend - scan);
	    scan = strend - MAX_MATCH;

	    if (len > best_len) {
	      s.match_start = cur_match;
	      best_len = len;
	      if (len >= nice_match) {
	        break;
	      }
	      scan_end1  = _win[scan + best_len - 1];
	      scan_end   = _win[scan + best_len];
	    }
	  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

	  if (best_len <= s.lookahead) {
	    return best_len;
	  }
	  return s.lookahead;
	}


	/* ===========================================================================
	 * Fill the window when the lookahead becomes insufficient.
	 * Updates strstart and lookahead.
	 *
	 * IN assertion: lookahead < MIN_LOOKAHEAD
	 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
	 *    At least one byte has been read, or avail_in == 0; reads are
	 *    performed for at least two bytes (required for the zip translate_eol
	 *    option -- not supported here).
	 */
	function fill_window(s) {
	  var _w_size = s.w_size;
	  var p, n, m, more, str;

	  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

	  do {
	    more = s.window_size - s.lookahead - s.strstart;

	    // JS ints have 32 bit, block below not needed
	    /* Deal with !@#$% 64K limit: */
	    //if (sizeof(int) <= 2) {
	    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
	    //        more = wsize;
	    //
	    //  } else if (more == (unsigned)(-1)) {
	    //        /* Very unlikely, but possible on 16 bit machine if
	    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
	    //         */
	    //        more--;
	    //    }
	    //}


	    /* If the window is almost full and there is insufficient lookahead,
	     * move the upper half to the lower one to make room in the upper half.
	     */
	    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

	      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
	      s.match_start -= _w_size;
	      s.strstart -= _w_size;
	      /* we now have strstart >= MAX_DIST */
	      s.block_start -= _w_size;

	      /* Slide the hash table (could be avoided with 32 bit values
	       at the expense of memory usage). We slide even when level == 0
	       to keep the hash table consistent if we switch back to level > 0
	       later. (Using level 0 permanently is not an optimal usage of
	       zlib, so we don't care about this pathological case.)
	       */

	      n = s.hash_size;
	      p = n;
	      do {
	        m = s.head[--p];
	        s.head[p] = (m >= _w_size ? m - _w_size : 0);
	      } while (--n);

	      n = _w_size;
	      p = n;
	      do {
	        m = s.prev[--p];
	        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
	        /* If n is not on any hash chain, prev[n] is garbage but
	         * its value will never be used.
	         */
	      } while (--n);

	      more += _w_size;
	    }
	    if (s.strm.avail_in === 0) {
	      break;
	    }

	    /* If there was no sliding:
	     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
	     *    more == window_size - lookahead - strstart
	     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
	     * => more >= window_size - 2*WSIZE + 2
	     * In the BIG_MEM or MMAP case (not yet supported),
	     *   window_size == input_size + MIN_LOOKAHEAD  &&
	     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
	     * Otherwise, window_size == 2*WSIZE so more >= 2.
	     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
	     */
	    //Assert(more >= 2, "more < 2");
	    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
	    s.lookahead += n;

	    /* Initialize the hash value now that we have some input: */
	    if (s.lookahead + s.insert >= MIN_MATCH) {
	      str = s.strstart - s.insert;
	      s.ins_h = s.window[str];

	      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
	//#if MIN_MATCH != 3
	//        Call update_hash() MIN_MATCH-3 more times
	//#endif
	      while (s.insert) {
	        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

	        s.prev[str & s.w_mask] = s.head[s.ins_h];
	        s.head[s.ins_h] = str;
	        str++;
	        s.insert--;
	        if (s.lookahead + s.insert < MIN_MATCH) {
	          break;
	        }
	      }
	    }
	    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
	     * but this is not important since only literal bytes will be emitted.
	     */

	  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

	  /* If the WIN_INIT bytes after the end of the current data have never been
	   * written, then zero those bytes in order to avoid memory check reports of
	   * the use of uninitialized (or uninitialised as Julian writes) bytes by
	   * the longest match routines.  Update the high water mark for the next
	   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
	   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
	   */
	//  if (s.high_water < s.window_size) {
	//    var curr = s.strstart + s.lookahead;
	//    var init = 0;
	//
	//    if (s.high_water < curr) {
	//      /* Previous high water mark below current data -- zero WIN_INIT
	//       * bytes or up to end of window, whichever is less.
	//       */
	//      init = s.window_size - curr;
	//      if (init > WIN_INIT)
	//        init = WIN_INIT;
	//      zmemzero(s->window + curr, (unsigned)init);
	//      s->high_water = curr + init;
	//    }
	//    else if (s->high_water < (ulg)curr + WIN_INIT) {
	//      /* High water mark at or above current data, but below current data
	//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
	//       * to end of window, whichever is less.
	//       */
	//      init = (ulg)curr + WIN_INIT - s->high_water;
	//      if (init > s->window_size - s->high_water)
	//        init = s->window_size - s->high_water;
	//      zmemzero(s->window + s->high_water, (unsigned)init);
	//      s->high_water += init;
	//    }
	//  }
	//
	//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
	//    "not enough room for search");
	}

	/* ===========================================================================
	 * Copy without compression as much as possible from the input stream, return
	 * the current block state.
	 * This function does not insert new strings in the dictionary since
	 * uncompressible data is probably not useful. This function is used
	 * only for the level=0 compression option.
	 * NOTE: this function should be optimized to avoid extra copying from
	 * window to pending_buf.
	 */
	function deflate_stored(s, flush) {
	  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
	   * to pending_buf_size, and each stored block has a 5 byte header:
	   */
	  var max_block_size = 0xffff;

	  if (max_block_size > s.pending_buf_size - 5) {
	    max_block_size = s.pending_buf_size - 5;
	  }

	  /* Copy as much as possible from input to output: */
	  for (;;) {
	    /* Fill the window as much as possible: */
	    if (s.lookahead <= 1) {

	      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
	      //  s->block_start >= (long)s->w_size, "slide too late");
	//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
	//        s.block_start >= s.w_size)) {
	//        throw  new Error("slide too late");
	//      }

	      fill_window(s);
	      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }

	      if (s.lookahead === 0) {
	        break;
	      }
	      /* flush the current block */
	    }
	    //Assert(s->block_start >= 0L, "block gone");
	//    if (s.block_start < 0) throw new Error("block gone");

	    s.strstart += s.lookahead;
	    s.lookahead = 0;

	    /* Emit a stored block if pending_buf will be full: */
	    var max_start = s.block_start + max_block_size;

	    if (s.strstart === 0 || s.strstart >= max_start) {
	      /* strstart == 0 is possible when wraparound on 16-bit machine */
	      s.lookahead = s.strstart - max_start;
	      s.strstart = max_start;
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/


	    }
	    /* Flush if we may have to slide, otherwise block_start may become
	     * negative and the data will be gone:
	     */
	    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }

	  s.insert = 0;

	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }

	  if (s.strstart > s.block_start) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_NEED_MORE;
	}

	/* ===========================================================================
	 * Compress as much as possible from the input stream, return the current
	 * block state.
	 * This function does not perform lazy evaluation of matches and inserts
	 * new strings in the dictionary only for unmatched strings or for short
	 * matches. It is used only for the fast compression options.
	 */
	function deflate_fast(s, flush) {
	  var hash_head;        /* head of the hash chain */
	  var bflush;           /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break; /* flush the current block */
	      }
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     * At this point we have always match_length < MIN_MATCH
	     */
	    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */
	    }
	    if (s.match_length >= MIN_MATCH) {
	      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

	      /*** _tr_tally_dist(s, s.strstart - s.match_start,
	                     s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;

	      /* Insert new strings in the hash table only if the match length
	       * is not too large. This saves time but degrades compression.
	       */
	      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
	        s.match_length--; /* string at strstart already in table */
	        do {
	          s.strstart++;
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
	           * always MIN_MATCH bytes ahead.
	           */
	        } while (--s.match_length !== 0);
	        s.strstart++;
	      } else
	      {
	        s.strstart += s.match_length;
	        s.match_length = 0;
	        s.ins_h = s.window[s.strstart];
	        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

	//#if MIN_MATCH != 3
	//                Call UPDATE_HASH() MIN_MATCH-3 more times
	//#endif
	        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
	         * matter since it will be recomputed at next deflate call.
	         */
	      }
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s.window[s.strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * Same as above, but achieves better compression. We use a lazy
	 * evaluation for matches: a match is finally adopted only if there is
	 * no better match at the next window position.
	 */
	function deflate_slow(s, flush) {
	  var hash_head;          /* head of hash chain */
	  var bflush;              /* set if current block must be flushed */

	  var max_insert;

	  /* Process the input block. */
	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     */
	    s.prev_length = s.match_length;
	    s.prev_match = s.match_start;
	    s.match_length = MIN_MATCH - 1;

	    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
	        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */

	      if (s.match_length <= 5 &&
	         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

	        /* If prev_match is also MIN_MATCH, match_start is garbage
	         * but we will ignore the current match anyway.
	         */
	        s.match_length = MIN_MATCH - 1;
	      }
	    }
	    /* If there was a match at the previous step and the current
	     * match is not better, output the previous match:
	     */
	    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
	      max_insert = s.strstart + s.lookahead - MIN_MATCH;
	      /* Do not insert strings in hash table beyond this. */

	      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

	      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
	                     s.prev_length - MIN_MATCH, bflush);***/
	      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
	      /* Insert in hash table all strings up to the end of the match.
	       * strstart-1 and strstart are already inserted. If there is not
	       * enough lookahead, the last two strings are not inserted in
	       * the hash table.
	       */
	      s.lookahead -= s.prev_length - 1;
	      s.prev_length -= 2;
	      do {
	        if (++s.strstart <= max_insert) {
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	        }
	      } while (--s.prev_length !== 0);
	      s.match_available = 0;
	      s.match_length = MIN_MATCH - 1;
	      s.strstart++;

	      if (bflush) {
	        /*** FLUSH_BLOCK(s, 0); ***/
	        flush_block_only(s, false);
	        if (s.strm.avail_out === 0) {
	          return BS_NEED_MORE;
	        }
	        /***/
	      }

	    } else if (s.match_available) {
	      /* If there was no match at the previous position, output a
	       * single literal. If there was a match but the current match
	       * is longer, truncate the previous match to a single literal.
	       */
	      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	      if (bflush) {
	        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
	        flush_block_only(s, false);
	        /***/
	      }
	      s.strstart++;
	      s.lookahead--;
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	    } else {
	      /* There is no previous match to compare with, wait for
	       * the next step to decide.
	       */
	      s.match_available = 1;
	      s.strstart++;
	      s.lookahead--;
	    }
	  }
	  //Assert (flush != Z_NO_FLUSH, "no flush?");
	  if (s.match_available) {
	    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	    s.match_available = 0;
	  }
	  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_BLOCK_DONE;
	}


	/* ===========================================================================
	 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
	 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
	 * deflate switches away from Z_RLE.)
	 */
	function deflate_rle(s, flush) {
	  var bflush;            /* set if current block must be flushed */
	  var prev;              /* byte at distance one to match */
	  var scan, strend;      /* scan goes up to strend for length of run */

	  var _win = s.window;

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the longest run, plus one for the unrolled loop.
	     */
	    if (s.lookahead <= MAX_MATCH) {
	      fill_window(s);
	      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* See how many times the previous byte repeats */
	    s.match_length = 0;
	    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
	      scan = s.strstart - 1;
	      prev = _win[scan];
	      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
	        strend = s.strstart + MAX_MATCH;
	        do {
	          /*jshint noempty:false*/
	        } while (prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 scan < strend);
	        s.match_length = MAX_MATCH - (strend - scan);
	        if (s.match_length > s.lookahead) {
	          s.match_length = s.lookahead;
	        }
	      }
	      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
	    }

	    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
	    if (s.match_length >= MIN_MATCH) {
	      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

	      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;
	      s.strstart += s.match_length;
	      s.match_length = 0;
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s->window[s->strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
	 * (It will be regenerated if this run of deflate switches away from Huffman.)
	 */
	function deflate_huff(s, flush) {
	  var bflush;             /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we have a literal to write. */
	    if (s.lookahead === 0) {
	      fill_window(s);
	      if (s.lookahead === 0) {
	        if (flush === Z_NO_FLUSH) {
	          return BS_NEED_MORE;
	        }
	        break;      /* flush the current block */
	      }
	    }

	    /* Output a literal byte */
	    s.match_length = 0;
	    //Tracevv((stderr,"%c", s->window[s->strstart]));
	    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
	    s.lookahead--;
	    s.strstart++;
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* Values for max_lazy_match, good_match and max_chain_length, depending on
	 * the desired pack level (0..9). The values given below have been tuned to
	 * exclude worst case performance for pathological files. Better values may be
	 * found for specific files.
	 */
	function Config(good_length, max_lazy, nice_length, max_chain, func) {
	  this.good_length = good_length;
	  this.max_lazy = max_lazy;
	  this.nice_length = nice_length;
	  this.max_chain = max_chain;
	  this.func = func;
	}

	var configuration_table;

	configuration_table = [
	  /*      good lazy nice chain */
	  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
	  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
	  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
	  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

	  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
	  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
	  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
	  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
	  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
	  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
	];


	/* ===========================================================================
	 * Initialize the "longest match" routines for a new zlib stream
	 */
	function lm_init(s) {
	  s.window_size = 2 * s.w_size;

	  /*** CLEAR_HASH(s); ***/
	  zero(s.head); // Fill with NIL (= 0);

	  /* Set the default configuration parameters:
	   */
	  s.max_lazy_match = configuration_table[s.level].max_lazy;
	  s.good_match = configuration_table[s.level].good_length;
	  s.nice_match = configuration_table[s.level].nice_length;
	  s.max_chain_length = configuration_table[s.level].max_chain;

	  s.strstart = 0;
	  s.block_start = 0;
	  s.lookahead = 0;
	  s.insert = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  s.ins_h = 0;
	}


	function DeflateState() {
	  this.strm = null;            /* pointer back to this zlib stream */
	  this.status = 0;            /* as the name implies */
	  this.pending_buf = null;      /* output still pending */
	  this.pending_buf_size = 0;  /* size of pending_buf */
	  this.pending_out = 0;       /* next pending byte to output to the stream */
	  this.pending = 0;           /* nb of bytes in the pending buffer */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.gzhead = null;         /* gzip header information to write */
	  this.gzindex = 0;           /* where in extra, name, or comment */
	  this.method = Z_DEFLATED; /* can only be DEFLATED */
	  this.last_flush = -1;   /* value of flush param for previous deflate call */

	  this.w_size = 0;  /* LZ77 window size (32K by default) */
	  this.w_bits = 0;  /* log2(w_size)  (8..16) */
	  this.w_mask = 0;  /* w_size - 1 */

	  this.window = null;
	  /* Sliding window. Input bytes are read into the second half of the window,
	   * and move to the first half later to keep a dictionary of at least wSize
	   * bytes. With this organization, matches are limited to a distance of
	   * wSize-MAX_MATCH bytes, but this ensures that IO is always
	   * performed with a length multiple of the block size.
	   */

	  this.window_size = 0;
	  /* Actual size of window: 2*wSize, except when the user input buffer
	   * is directly used as sliding window.
	   */

	  this.prev = null;
	  /* Link to older string with same hash index. To limit the size of this
	   * array to 64K, this link is maintained only for the last 32K strings.
	   * An index in this array is thus a window index modulo 32K.
	   */

	  this.head = null;   /* Heads of the hash chains or NIL. */

	  this.ins_h = 0;       /* hash index of string to be inserted */
	  this.hash_size = 0;   /* number of elements in hash table */
	  this.hash_bits = 0;   /* log2(hash_size) */
	  this.hash_mask = 0;   /* hash_size-1 */

	  this.hash_shift = 0;
	  /* Number of bits by which ins_h must be shifted at each input
	   * step. It must be such that after MIN_MATCH steps, the oldest
	   * byte no longer takes part in the hash key, that is:
	   *   hash_shift * MIN_MATCH >= hash_bits
	   */

	  this.block_start = 0;
	  /* Window position at the beginning of the current output block. Gets
	   * negative when the window is moved backwards.
	   */

	  this.match_length = 0;      /* length of best match */
	  this.prev_match = 0;        /* previous match */
	  this.match_available = 0;   /* set if previous match exists */
	  this.strstart = 0;          /* start of string to insert */
	  this.match_start = 0;       /* start of matching string */
	  this.lookahead = 0;         /* number of valid bytes ahead in window */

	  this.prev_length = 0;
	  /* Length of the best match at previous step. Matches not greater than this
	   * are discarded. This is used in the lazy match evaluation.
	   */

	  this.max_chain_length = 0;
	  /* To speed up deflation, hash chains are never searched beyond this
	   * length.  A higher limit improves compression ratio but degrades the
	   * speed.
	   */

	  this.max_lazy_match = 0;
	  /* Attempt to find a better match only when the current match is strictly
	   * smaller than this value. This mechanism is used only for compression
	   * levels >= 4.
	   */
	  // That's alias to max_lazy_match, don't use directly
	  //this.max_insert_length = 0;
	  /* Insert new strings in the hash table only if the match length is not
	   * greater than this length. This saves time but degrades compression.
	   * max_insert_length is used only for compression levels <= 3.
	   */

	  this.level = 0;     /* compression level (1..9) */
	  this.strategy = 0;  /* favor or force Huffman coding*/

	  this.good_match = 0;
	  /* Use a faster search when the previous match is longer than this */

	  this.nice_match = 0; /* Stop searching when current match exceeds this */

	              /* used by trees.c: */

	  /* Didn't use ct_data typedef below to suppress compiler warning */

	  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
	  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
	  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

	  // Use flat array of DOUBLE size, with interleaved fata,
	  // because JS does not support effective
	  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
	  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
	  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
	  zero(this.dyn_ltree);
	  zero(this.dyn_dtree);
	  zero(this.bl_tree);

	  this.l_desc   = null;         /* desc. for literal tree */
	  this.d_desc   = null;         /* desc. for distance tree */
	  this.bl_desc  = null;         /* desc. for bit length tree */

	  //ush bl_count[MAX_BITS+1];
	  this.bl_count = new utils.Buf16(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
	  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
	  zero(this.heap);

	  this.heap_len = 0;               /* number of elements in the heap */
	  this.heap_max = 0;               /* element of largest frequency */
	  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
	   * The same heap array is used to build all trees.
	   */

	  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
	  zero(this.depth);
	  /* Depth of each subtree used as tie breaker for trees of equal frequency
	   */

	  this.l_buf = 0;          /* buffer index for literals or lengths */

	  this.lit_bufsize = 0;
	  /* Size of match buffer for literals/lengths.  There are 4 reasons for
	   * limiting lit_bufsize to 64K:
	   *   - frequencies can be kept in 16 bit counters
	   *   - if compression is not successful for the first block, all input
	   *     data is still in the window so we can still emit a stored block even
	   *     when input comes from standard input.  (This can also be done for
	   *     all blocks if lit_bufsize is not greater than 32K.)
	   *   - if compression is not successful for a file smaller than 64K, we can
	   *     even emit a stored file instead of a stored block (saving 5 bytes).
	   *     This is applicable only for zip (not gzip or zlib).
	   *   - creating new Huffman trees less frequently may not provide fast
	   *     adaptation to changes in the input data statistics. (Take for
	   *     example a binary file with poorly compressible code followed by
	   *     a highly compressible string table.) Smaller buffer sizes give
	   *     fast adaptation but have of course the overhead of transmitting
	   *     trees more frequently.
	   *   - I can't count above 4
	   */

	  this.last_lit = 0;      /* running index in l_buf */

	  this.d_buf = 0;
	  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
	   * the same number of elements. To use different lengths, an extra flag
	   * array would be necessary.
	   */

	  this.opt_len = 0;       /* bit length of current block with optimal trees */
	  this.static_len = 0;    /* bit length of current block with static trees */
	  this.matches = 0;       /* number of string matches in current block */
	  this.insert = 0;        /* bytes at end of window left to insert */


	  this.bi_buf = 0;
	  /* Output buffer. bits are inserted starting at the bottom (least
	   * significant bits).
	   */
	  this.bi_valid = 0;
	  /* Number of valid bits in bi_buf.  All bits above the last valid bit
	   * are always zero.
	   */

	  // Used for window memory init. We safely ignore it for JS. That makes
	  // sense only for pointers and memory check tools.
	  //this.high_water = 0;
	  /* High water mark offset in window for initialized bytes -- bytes above
	   * this are set to zero in order to avoid memory check warnings when
	   * longest match routines access bytes past the input.  This is then
	   * updated to the new high water mark.
	   */
	}


	function deflateResetKeep(strm) {
	  var s;

	  if (!strm || !strm.state) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.total_in = strm.total_out = 0;
	  strm.data_type = Z_UNKNOWN;

	  s = strm.state;
	  s.pending = 0;
	  s.pending_out = 0;

	  if (s.wrap < 0) {
	    s.wrap = -s.wrap;
	    /* was made negative by deflate(..., Z_FINISH); */
	  }
	  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
	  strm.adler = (s.wrap === 2) ?
	    0  // crc32(0, Z_NULL, 0)
	  :
	    1; // adler32(0, Z_NULL, 0)
	  s.last_flush = Z_NO_FLUSH;
	  trees._tr_init(s);
	  return Z_OK;
	}


	function deflateReset(strm) {
	  var ret = deflateResetKeep(strm);
	  if (ret === Z_OK) {
	    lm_init(strm.state);
	  }
	  return ret;
	}


	function deflateSetHeader(strm, head) {
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
	  strm.state.gzhead = head;
	  return Z_OK;
	}


	function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
	  if (!strm) { // === Z_NULL
	    return Z_STREAM_ERROR;
	  }
	  var wrap = 1;

	  if (level === Z_DEFAULT_COMPRESSION) {
	    level = 6;
	  }

	  if (windowBits < 0) { /* suppress zlib wrapper */
	    wrap = 0;
	    windowBits = -windowBits;
	  }

	  else if (windowBits > 15) {
	    wrap = 2;           /* write gzip wrapper instead */
	    windowBits -= 16;
	  }


	  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
	    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
	    strategy < 0 || strategy > Z_FIXED) {
	    return err(strm, Z_STREAM_ERROR);
	  }


	  if (windowBits === 8) {
	    windowBits = 9;
	  }
	  /* until 256-byte window bug fixed */

	  var s = new DeflateState();

	  strm.state = s;
	  s.strm = strm;

	  s.wrap = wrap;
	  s.gzhead = null;
	  s.w_bits = windowBits;
	  s.w_size = 1 << s.w_bits;
	  s.w_mask = s.w_size - 1;

	  s.hash_bits = memLevel + 7;
	  s.hash_size = 1 << s.hash_bits;
	  s.hash_mask = s.hash_size - 1;
	  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

	  s.window = new utils.Buf8(s.w_size * 2);
	  s.head = new utils.Buf16(s.hash_size);
	  s.prev = new utils.Buf16(s.w_size);

	  // Don't need mem init magic for JS.
	  //s.high_water = 0;  /* nothing written to s->window yet */

	  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

	  s.pending_buf_size = s.lit_bufsize * 4;
	  s.pending_buf = new utils.Buf8(s.pending_buf_size);

	  s.d_buf = s.lit_bufsize >> 1;
	  s.l_buf = (1 + 2) * s.lit_bufsize;

	  s.level = level;
	  s.strategy = strategy;
	  s.method = method;

	  return deflateReset(strm);
	}

	function deflateInit(strm, level) {
	  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
	}


	function deflate(strm, flush) {
	  var old_flush, s;
	  var beg, val; // for gzip header write only

	  if (!strm || !strm.state ||
	    flush > Z_BLOCK || flush < 0) {
	    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
	  }

	  s = strm.state;

	  if (!strm.output ||
	      (!strm.input && strm.avail_in !== 0) ||
	      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
	    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
	  }

	  s.strm = strm; /* just in case */
	  old_flush = s.last_flush;
	  s.last_flush = flush;

	  /* Write the header */
	  if (s.status === INIT_STATE) {

	    if (s.wrap === 2) { // GZIP header
	      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
	      put_byte(s, 31);
	      put_byte(s, 139);
	      put_byte(s, 8);
	      if (!s.gzhead) { // s->gzhead == Z_NULL
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, OS_CODE);
	        s.status = BUSY_STATE;
	      }
	      else {
	        put_byte(s, (s.gzhead.text ? 1 : 0) +
	                    (s.gzhead.hcrc ? 2 : 0) +
	                    (!s.gzhead.extra ? 0 : 4) +
	                    (!s.gzhead.name ? 0 : 8) +
	                    (!s.gzhead.comment ? 0 : 16)
	                );
	        put_byte(s, s.gzhead.time & 0xff);
	        put_byte(s, (s.gzhead.time >> 8) & 0xff);
	        put_byte(s, (s.gzhead.time >> 16) & 0xff);
	        put_byte(s, (s.gzhead.time >> 24) & 0xff);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, s.gzhead.os & 0xff);
	        if (s.gzhead.extra && s.gzhead.extra.length) {
	          put_byte(s, s.gzhead.extra.length & 0xff);
	          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
	        }
	        if (s.gzhead.hcrc) {
	          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
	        }
	        s.gzindex = 0;
	        s.status = EXTRA_STATE;
	      }
	    }
	    else // DEFLATE header
	    {
	      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
	      var level_flags = -1;

	      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
	        level_flags = 0;
	      } else if (s.level < 6) {
	        level_flags = 1;
	      } else if (s.level === 6) {
	        level_flags = 2;
	      } else {
	        level_flags = 3;
	      }
	      header |= (level_flags << 6);
	      if (s.strstart !== 0) { header |= PRESET_DICT; }
	      header += 31 - (header % 31);

	      s.status = BUSY_STATE;
	      putShortMSB(s, header);

	      /* Save the adler32 of the preset dictionary: */
	      if (s.strstart !== 0) {
	        putShortMSB(s, strm.adler >>> 16);
	        putShortMSB(s, strm.adler & 0xffff);
	      }
	      strm.adler = 1; // adler32(0L, Z_NULL, 0);
	    }
	  }

	//#ifdef GZIP
	  if (s.status === EXTRA_STATE) {
	    if (s.gzhead.extra/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */

	      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            break;
	          }
	        }
	        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
	        s.gzindex++;
	      }
	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (s.gzindex === s.gzhead.extra.length) {
	        s.gzindex = 0;
	        s.status = NAME_STATE;
	      }
	    }
	    else {
	      s.status = NAME_STATE;
	    }
	  }
	  if (s.status === NAME_STATE) {
	    if (s.gzhead.name/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.name.length) {
	          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.gzindex = 0;
	        s.status = COMMENT_STATE;
	      }
	    }
	    else {
	      s.status = COMMENT_STATE;
	    }
	  }
	  if (s.status === COMMENT_STATE) {
	    if (s.gzhead.comment/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.comment.length) {
	          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.status = HCRC_STATE;
	      }
	    }
	    else {
	      s.status = HCRC_STATE;
	    }
	  }
	  if (s.status === HCRC_STATE) {
	    if (s.gzhead.hcrc) {
	      if (s.pending + 2 > s.pending_buf_size) {
	        flush_pending(strm);
	      }
	      if (s.pending + 2 <= s.pending_buf_size) {
	        put_byte(s, strm.adler & 0xff);
	        put_byte(s, (strm.adler >> 8) & 0xff);
	        strm.adler = 0; //crc32(0L, Z_NULL, 0);
	        s.status = BUSY_STATE;
	      }
	    }
	    else {
	      s.status = BUSY_STATE;
	    }
	  }
	//#endif

	  /* Flush as much pending output as possible */
	  if (s.pending !== 0) {
	    flush_pending(strm);
	    if (strm.avail_out === 0) {
	      /* Since avail_out is 0, deflate will be called again with
	       * more output space, but possibly with both pending and
	       * avail_in equal to zero. There won't be anything to do,
	       * but this is not an error situation so make sure we
	       * return OK instead of BUF_ERROR at next call of deflate:
	       */
	      s.last_flush = -1;
	      return Z_OK;
	    }

	    /* Make sure there is something to do and avoid duplicate consecutive
	     * flushes. For repeated and useless calls with Z_FINISH, we keep
	     * returning Z_STREAM_END instead of Z_BUF_ERROR.
	     */
	  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
	    flush !== Z_FINISH) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* User must not provide more input after the first FINISH: */
	  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* Start a new block or continue the current one.
	   */
	  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
	    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
	    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
	      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
	        configuration_table[s.level].func(s, flush));

	    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
	      s.status = FINISH_STATE;
	    }
	    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
	      if (strm.avail_out === 0) {
	        s.last_flush = -1;
	        /* avoid BUF_ERROR next call, see above */
	      }
	      return Z_OK;
	      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
	       * of deflate should use the same flush parameter to make sure
	       * that the flush is complete. So we don't have to output an
	       * empty block here, this will be done at next call. This also
	       * ensures that for a very small output buffer, we emit at most
	       * one empty block.
	       */
	    }
	    if (bstate === BS_BLOCK_DONE) {
	      if (flush === Z_PARTIAL_FLUSH) {
	        trees._tr_align(s);
	      }
	      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

	        trees._tr_stored_block(s, 0, 0, false);
	        /* For a full flush, this empty block will be recognized
	         * as a special marker by inflate_sync().
	         */
	        if (flush === Z_FULL_FLUSH) {
	          /*** CLEAR_HASH(s); ***/             /* forget history */
	          zero(s.head); // Fill with NIL (= 0);

	          if (s.lookahead === 0) {
	            s.strstart = 0;
	            s.block_start = 0;
	            s.insert = 0;
	          }
	        }
	      }
	      flush_pending(strm);
	      if (strm.avail_out === 0) {
	        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
	        return Z_OK;
	      }
	    }
	  }
	  //Assert(strm->avail_out > 0, "bug2");
	  //if (strm.avail_out <= 0) { throw new Error("bug2");}

	  if (flush !== Z_FINISH) { return Z_OK; }
	  if (s.wrap <= 0) { return Z_STREAM_END; }

	  /* Write the trailer */
	  if (s.wrap === 2) {
	    put_byte(s, strm.adler & 0xff);
	    put_byte(s, (strm.adler >> 8) & 0xff);
	    put_byte(s, (strm.adler >> 16) & 0xff);
	    put_byte(s, (strm.adler >> 24) & 0xff);
	    put_byte(s, strm.total_in & 0xff);
	    put_byte(s, (strm.total_in >> 8) & 0xff);
	    put_byte(s, (strm.total_in >> 16) & 0xff);
	    put_byte(s, (strm.total_in >> 24) & 0xff);
	  }
	  else
	  {
	    putShortMSB(s, strm.adler >>> 16);
	    putShortMSB(s, strm.adler & 0xffff);
	  }

	  flush_pending(strm);
	  /* If avail_out is zero, the application will call deflate again
	   * to flush the rest.
	   */
	  if (s.wrap > 0) { s.wrap = -s.wrap; }
	  /* write the trailer only once! */
	  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
	}

	function deflateEnd(strm) {
	  var status;

	  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }

	  status = strm.state.status;
	  if (status !== INIT_STATE &&
	    status !== EXTRA_STATE &&
	    status !== NAME_STATE &&
	    status !== COMMENT_STATE &&
	    status !== HCRC_STATE &&
	    status !== BUSY_STATE &&
	    status !== FINISH_STATE
	  ) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.state = null;

	  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
	}


	/* =========================================================================
	 * Initializes the compression dictionary from the given byte
	 * sequence without producing any compressed output.
	 */
	function deflateSetDictionary(strm, dictionary) {
	  var dictLength = dictionary.length;

	  var s;
	  var str, n;
	  var wrap;
	  var avail;
	  var next;
	  var input;
	  var tmpDict;

	  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }

	  s = strm.state;
	  wrap = s.wrap;

	  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
	    return Z_STREAM_ERROR;
	  }

	  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
	  if (wrap === 1) {
	    /* adler32(strm->adler, dictionary, dictLength); */
	    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
	  }

	  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

	  /* if dictionary would fill window, just replace the history */
	  if (dictLength >= s.w_size) {
	    if (wrap === 0) {            /* already empty otherwise */
	      /*** CLEAR_HASH(s); ***/
	      zero(s.head); // Fill with NIL (= 0);
	      s.strstart = 0;
	      s.block_start = 0;
	      s.insert = 0;
	    }
	    /* use the tail */
	    // dictionary = dictionary.slice(dictLength - s.w_size);
	    tmpDict = new utils.Buf8(s.w_size);
	    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
	    dictionary = tmpDict;
	    dictLength = s.w_size;
	  }
	  /* insert dictionary into window and hash */
	  avail = strm.avail_in;
	  next = strm.next_in;
	  input = strm.input;
	  strm.avail_in = dictLength;
	  strm.next_in = 0;
	  strm.input = dictionary;
	  fill_window(s);
	  while (s.lookahead >= MIN_MATCH) {
	    str = s.strstart;
	    n = s.lookahead - (MIN_MATCH - 1);
	    do {
	      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

	      s.prev[str & s.w_mask] = s.head[s.ins_h];

	      s.head[s.ins_h] = str;
	      str++;
	    } while (--n);
	    s.strstart = str;
	    s.lookahead = MIN_MATCH - 1;
	    fill_window(s);
	  }
	  s.strstart += s.lookahead;
	  s.block_start = s.strstart;
	  s.insert = s.lookahead;
	  s.lookahead = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  strm.next_in = next;
	  strm.input = input;
	  strm.avail_in = avail;
	  s.wrap = wrap;
	  return Z_OK;
	}


	exports.deflateInit = deflateInit;
	exports.deflateInit2 = deflateInit2;
	exports.deflateReset = deflateReset;
	exports.deflateResetKeep = deflateResetKeep;
	exports.deflateSetHeader = deflateSetHeader;
	exports.deflate = deflate;
	exports.deflateEnd = deflateEnd;
	exports.deflateSetDictionary = deflateSetDictionary;
	exports.deflateInfo = 'pako deflate (from Nodeca project)';

	/* Not implemented
	exports.deflateBound = deflateBound;
	exports.deflateCopy = deflateCopy;
	exports.deflateParams = deflateParams;
	exports.deflatePending = deflatePending;
	exports.deflatePrime = deflatePrime;
	exports.deflateTune = deflateTune;
	*/


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var utils = __webpack_require__(24);

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	//var Z_FILTERED          = 1;
	//var Z_HUFFMAN_ONLY      = 2;
	//var Z_RLE               = 3;
	var Z_FIXED               = 4;
	//var Z_DEFAULT_STRATEGY  = 0;

	/* Possible values of the data_type field (though see inflate()) */
	var Z_BINARY              = 0;
	var Z_TEXT                = 1;
	//var Z_ASCII             = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;

	/*============================================================================*/


	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

	// From zutil.h

	var STORED_BLOCK = 0;
	var STATIC_TREES = 1;
	var DYN_TREES    = 2;
	/* The three kinds of block type */

	var MIN_MATCH    = 3;
	var MAX_MATCH    = 258;
	/* The minimum and maximum match lengths */

	// From deflate.h
	/* ===========================================================================
	 * Internal compression state.
	 */

	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */

	var LITERALS      = 256;
	/* number of literal bytes 0..255 */

	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */

	var D_CODES       = 30;
	/* number of distance codes */

	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */

	var HEAP_SIZE     = 2 * L_CODES + 1;
	/* maximum heap size */

	var MAX_BITS      = 15;
	/* All codes must not exceed MAX_BITS bits */

	var Buf_size      = 16;
	/* size of bit buffer in bi_buf */


	/* ===========================================================================
	 * Constants
	 */

	var MAX_BL_BITS = 7;
	/* Bit length codes must not exceed MAX_BL_BITS bits */

	var END_BLOCK   = 256;
	/* end of block literal code */

	var REP_3_6     = 16;
	/* repeat previous bit length 3-6 times (2 bits of repeat count) */

	var REPZ_3_10   = 17;
	/* repeat a zero length 3-10 times  (3 bits of repeat count) */

	var REPZ_11_138 = 18;
	/* repeat a zero length 11-138 times  (7 bits of repeat count) */

	/* eslint-disable comma-spacing,array-bracket-spacing */
	var extra_lbits =   /* extra bits for each length code */
	  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

	var extra_dbits =   /* extra bits for each distance code */
	  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

	var extra_blbits =  /* extra bits for each bit length code */
	  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

	var bl_order =
	  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
	/* eslint-enable comma-spacing,array-bracket-spacing */

	/* The lengths of the bit length codes are sent in order of decreasing
	 * probability, to avoid transmitting the lengths for unused bit length codes.
	 */

	/* ===========================================================================
	 * Local data. These are initialized only once.
	 */

	// We pre-fill arrays with 0 to avoid uninitialized gaps

	var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

	// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
	var static_ltree  = new Array((L_CODES + 2) * 2);
	zero(static_ltree);
	/* The static literal tree. Since the bit lengths are imposed, there is no
	 * need for the L_CODES extra codes used during heap construction. However
	 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
	 * below).
	 */

	var static_dtree  = new Array(D_CODES * 2);
	zero(static_dtree);
	/* The static distance tree. (Actually a trivial tree since all codes use
	 * 5 bits.)
	 */

	var _dist_code    = new Array(DIST_CODE_LEN);
	zero(_dist_code);
	/* Distance codes. The first 256 values correspond to the distances
	 * 3 .. 258, the last 256 values correspond to the top 8 bits of
	 * the 15 bit distances.
	 */

	var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
	zero(_length_code);
	/* length code for each normalized match length (0 == MIN_MATCH) */

	var base_length   = new Array(LENGTH_CODES);
	zero(base_length);
	/* First normalized length for each code (0 = MIN_MATCH) */

	var base_dist     = new Array(D_CODES);
	zero(base_dist);
	/* First normalized distance for each code (0 = distance of 1) */


	function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

	  this.static_tree  = static_tree;  /* static tree or NULL */
	  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
	  this.extra_base   = extra_base;   /* base index for extra_bits */
	  this.elems        = elems;        /* max number of elements in the tree */
	  this.max_length   = max_length;   /* max bit length for the codes */

	  // show if `static_tree` has data or dummy - needed for monomorphic objects
	  this.has_stree    = static_tree && static_tree.length;
	}


	var static_l_desc;
	var static_d_desc;
	var static_bl_desc;


	function TreeDesc(dyn_tree, stat_desc) {
	  this.dyn_tree = dyn_tree;     /* the dynamic tree */
	  this.max_code = 0;            /* largest code with non zero frequency */
	  this.stat_desc = stat_desc;   /* the corresponding static tree */
	}



	function d_code(dist) {
	  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
	}


	/* ===========================================================================
	 * Output a short LSB first on the stream.
	 * IN assertion: there is enough room in pendingBuf.
	 */
	function put_short(s, w) {
	//    put_byte(s, (uch)((w) & 0xff));
	//    put_byte(s, (uch)((ush)(w) >> 8));
	  s.pending_buf[s.pending++] = (w) & 0xff;
	  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
	}


	/* ===========================================================================
	 * Send a value on a given number of bits.
	 * IN assertion: length <= 16 and value fits in length bits.
	 */
	function send_bits(s, value, length) {
	  if (s.bi_valid > (Buf_size - length)) {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    put_short(s, s.bi_buf);
	    s.bi_buf = value >> (Buf_size - s.bi_valid);
	    s.bi_valid += length - Buf_size;
	  } else {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    s.bi_valid += length;
	  }
	}


	function send_code(s, c, tree) {
	  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
	}


	/* ===========================================================================
	 * Reverse the first len bits of a code, using straightforward code (a faster
	 * method would use a table)
	 * IN assertion: 1 <= len <= 15
	 */
	function bi_reverse(code, len) {
	  var res = 0;
	  do {
	    res |= code & 1;
	    code >>>= 1;
	    res <<= 1;
	  } while (--len > 0);
	  return res >>> 1;
	}


	/* ===========================================================================
	 * Flush the bit buffer, keeping at most 7 bits in it.
	 */
	function bi_flush(s) {
	  if (s.bi_valid === 16) {
	    put_short(s, s.bi_buf);
	    s.bi_buf = 0;
	    s.bi_valid = 0;

	  } else if (s.bi_valid >= 8) {
	    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
	    s.bi_buf >>= 8;
	    s.bi_valid -= 8;
	  }
	}


	/* ===========================================================================
	 * Compute the optimal bit lengths for a tree and update the total bit length
	 * for the current block.
	 * IN assertion: the fields freq and dad are set, heap[heap_max] and
	 *    above are the tree nodes sorted by increasing frequency.
	 * OUT assertions: the field len is set to the optimal bit length, the
	 *     array bl_count contains the frequencies for each bit length.
	 *     The length opt_len is updated; static_len is also updated if stree is
	 *     not null.
	 */
	function gen_bitlen(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc;    /* the tree descriptor */
	{
	  var tree            = desc.dyn_tree;
	  var max_code        = desc.max_code;
	  var stree           = desc.stat_desc.static_tree;
	  var has_stree       = desc.stat_desc.has_stree;
	  var extra           = desc.stat_desc.extra_bits;
	  var base            = desc.stat_desc.extra_base;
	  var max_length      = desc.stat_desc.max_length;
	  var h;              /* heap index */
	  var n, m;           /* iterate over the tree elements */
	  var bits;           /* bit length */
	  var xbits;          /* extra bits */
	  var f;              /* frequency */
	  var overflow = 0;   /* number of elements with bit length too large */

	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    s.bl_count[bits] = 0;
	  }

	  /* In a first pass, compute the optimal bit lengths (which may
	   * overflow in the case of the bit length tree).
	   */
	  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

	  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
	    n = s.heap[h];
	    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
	    if (bits > max_length) {
	      bits = max_length;
	      overflow++;
	    }
	    tree[n * 2 + 1]/*.Len*/ = bits;
	    /* We overwrite tree[n].Dad which is no longer needed */

	    if (n > max_code) { continue; } /* not a leaf node */

	    s.bl_count[bits]++;
	    xbits = 0;
	    if (n >= base) {
	      xbits = extra[n - base];
	    }
	    f = tree[n * 2]/*.Freq*/;
	    s.opt_len += f * (bits + xbits);
	    if (has_stree) {
	      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
	    }
	  }
	  if (overflow === 0) { return; }

	  // Trace((stderr,"\nbit length overflow\n"));
	  /* This happens for example on obj2 and pic of the Calgary corpus */

	  /* Find the first bit length which could increase: */
	  do {
	    bits = max_length - 1;
	    while (s.bl_count[bits] === 0) { bits--; }
	    s.bl_count[bits]--;      /* move one leaf down the tree */
	    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
	    s.bl_count[max_length]--;
	    /* The brother of the overflow item also moves one step up,
	     * but this does not affect bl_count[max_length]
	     */
	    overflow -= 2;
	  } while (overflow > 0);

	  /* Now recompute all bit lengths, scanning in increasing frequency.
	   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
	   * lengths instead of fixing only the wrong ones. This idea is taken
	   * from 'ar' written by Haruhiko Okumura.)
	   */
	  for (bits = max_length; bits !== 0; bits--) {
	    n = s.bl_count[bits];
	    while (n !== 0) {
	      m = s.heap[--h];
	      if (m > max_code) { continue; }
	      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
	        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
	        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
	        tree[m * 2 + 1]/*.Len*/ = bits;
	      }
	      n--;
	    }
	  }
	}


	/* ===========================================================================
	 * Generate the codes for a given tree and bit counts (which need not be
	 * optimal).
	 * IN assertion: the array bl_count contains the bit length statistics for
	 * the given tree and the field len is set for all tree elements.
	 * OUT assertion: the field code is set for all tree elements of non
	 *     zero code length.
	 */
	function gen_codes(tree, max_code, bl_count)
	//    ct_data *tree;             /* the tree to decorate */
	//    int max_code;              /* largest code with non zero frequency */
	//    ushf *bl_count;            /* number of codes at each bit length */
	{
	  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
	  var code = 0;              /* running code value */
	  var bits;                  /* bit index */
	  var n;                     /* code index */

	  /* The distribution counts are first used to generate the code values
	   * without bit reversal.
	   */
	  for (bits = 1; bits <= MAX_BITS; bits++) {
	    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
	  }
	  /* Check that the bit counts in bl_count are consistent. The last code
	   * must be all ones.
	   */
	  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
	  //        "inconsistent bit counts");
	  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

	  for (n = 0;  n <= max_code; n++) {
	    var len = tree[n * 2 + 1]/*.Len*/;
	    if (len === 0) { continue; }
	    /* Now reverse the bits */
	    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

	    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
	    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
	  }
	}


	/* ===========================================================================
	 * Initialize the various 'constant' tables.
	 */
	function tr_static_init() {
	  var n;        /* iterates over tree elements */
	  var bits;     /* bit counter */
	  var length;   /* length value */
	  var code;     /* code value */
	  var dist;     /* distance index */
	  var bl_count = new Array(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  // do check in _tr_init()
	  //if (static_init_done) return;

	  /* For some embedded targets, global variables are not initialized: */
	/*#ifdef NO_INIT_GLOBAL_POINTERS
	  static_l_desc.static_tree = static_ltree;
	  static_l_desc.extra_bits = extra_lbits;
	  static_d_desc.static_tree = static_dtree;
	  static_d_desc.extra_bits = extra_dbits;
	  static_bl_desc.extra_bits = extra_blbits;
	#endif*/

	  /* Initialize the mapping length (0..255) -> length code (0..28) */
	  length = 0;
	  for (code = 0; code < LENGTH_CODES - 1; code++) {
	    base_length[code] = length;
	    for (n = 0; n < (1 << extra_lbits[code]); n++) {
	      _length_code[length++] = code;
	    }
	  }
	  //Assert (length == 256, "tr_static_init: length != 256");
	  /* Note that the length 255 (match length 258) can be represented
	   * in two different ways: code 284 + 5 bits or code 285, so we
	   * overwrite length_code[255] to use the best encoding:
	   */
	  _length_code[length - 1] = code;

	  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
	  dist = 0;
	  for (code = 0; code < 16; code++) {
	    base_dist[code] = dist;
	    for (n = 0; n < (1 << extra_dbits[code]); n++) {
	      _dist_code[dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: dist != 256");
	  dist >>= 7; /* from now on, all distances are divided by 128 */
	  for (; code < D_CODES; code++) {
	    base_dist[code] = dist << 7;
	    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
	      _dist_code[256 + dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

	  /* Construct the codes of the static literal tree */
	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    bl_count[bits] = 0;
	  }

	  n = 0;
	  while (n <= 143) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  while (n <= 255) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 9;
	    n++;
	    bl_count[9]++;
	  }
	  while (n <= 279) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 7;
	    n++;
	    bl_count[7]++;
	  }
	  while (n <= 287) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  /* Codes 286 and 287 do not exist, but we must include them in the
	   * tree construction to get a canonical Huffman tree (longest code
	   * all ones)
	   */
	  gen_codes(static_ltree, L_CODES + 1, bl_count);

	  /* The static distance tree is trivial: */
	  for (n = 0; n < D_CODES; n++) {
	    static_dtree[n * 2 + 1]/*.Len*/ = 5;
	    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
	  }

	  // Now data ready and we can init static trees
	  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
	  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
	  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

	  //static_init_done = true;
	}


	/* ===========================================================================
	 * Initialize a new block.
	 */
	function init_block(s) {
	  var n; /* iterates over tree elements */

	  /* Initialize the trees. */
	  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
	  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
	  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

	  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
	  s.opt_len = s.static_len = 0;
	  s.last_lit = s.matches = 0;
	}


	/* ===========================================================================
	 * Flush the bit buffer and align the output on a byte boundary
	 */
	function bi_windup(s)
	{
	  if (s.bi_valid > 8) {
	    put_short(s, s.bi_buf);
	  } else if (s.bi_valid > 0) {
	    //put_byte(s, (Byte)s->bi_buf);
	    s.pending_buf[s.pending++] = s.bi_buf;
	  }
	  s.bi_buf = 0;
	  s.bi_valid = 0;
	}

	/* ===========================================================================
	 * Copy a stored block, storing first the length and its
	 * one's complement if requested.
	 */
	function copy_block(s, buf, len, header)
	//DeflateState *s;
	//charf    *buf;    /* the input data */
	//unsigned len;     /* its length */
	//int      header;  /* true if block header must be written */
	{
	  bi_windup(s);        /* align on byte boundary */

	  if (header) {
	    put_short(s, len);
	    put_short(s, ~len);
	  }
	//  while (len--) {
	//    put_byte(s, *buf++);
	//  }
	  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
	  s.pending += len;
	}

	/* ===========================================================================
	 * Compares to subtrees, using the tree depth as tie breaker when
	 * the subtrees have equal frequency. This minimizes the worst case length.
	 */
	function smaller(tree, n, m, depth) {
	  var _n2 = n * 2;
	  var _m2 = m * 2;
	  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
	         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
	}

	/* ===========================================================================
	 * Restore the heap property by moving down the tree starting at node k,
	 * exchanging a node with the smallest of its two sons if necessary, stopping
	 * when the heap property is re-established (each father smaller than its
	 * two sons).
	 */
	function pqdownheap(s, tree, k)
	//    deflate_state *s;
	//    ct_data *tree;  /* the tree to restore */
	//    int k;               /* node to move down */
	{
	  var v = s.heap[k];
	  var j = k << 1;  /* left son of k */
	  while (j <= s.heap_len) {
	    /* Set j to the smallest of the two sons: */
	    if (j < s.heap_len &&
	      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
	      j++;
	    }
	    /* Exit if v is smaller than both sons */
	    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

	    /* Exchange v with the smallest son */
	    s.heap[k] = s.heap[j];
	    k = j;

	    /* And continue down the tree, setting j to the left son of k */
	    j <<= 1;
	  }
	  s.heap[k] = v;
	}


	// inlined manually
	// var SMALLEST = 1;

	/* ===========================================================================
	 * Send the block data compressed using the given Huffman trees
	 */
	function compress_block(s, ltree, dtree)
	//    deflate_state *s;
	//    const ct_data *ltree; /* literal tree */
	//    const ct_data *dtree; /* distance tree */
	{
	  var dist;           /* distance of matched string */
	  var lc;             /* match length or unmatched char (if dist == 0) */
	  var lx = 0;         /* running index in l_buf */
	  var code;           /* the code to send */
	  var extra;          /* number of extra bits to send */

	  if (s.last_lit !== 0) {
	    do {
	      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
	      lc = s.pending_buf[s.l_buf + lx];
	      lx++;

	      if (dist === 0) {
	        send_code(s, lc, ltree); /* send a literal byte */
	        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
	      } else {
	        /* Here, lc is the match length - MIN_MATCH */
	        code = _length_code[lc];
	        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
	        extra = extra_lbits[code];
	        if (extra !== 0) {
	          lc -= base_length[code];
	          send_bits(s, lc, extra);       /* send the extra length bits */
	        }
	        dist--; /* dist is now the match distance - 1 */
	        code = d_code(dist);
	        //Assert (code < D_CODES, "bad d_code");

	        send_code(s, code, dtree);       /* send the distance code */
	        extra = extra_dbits[code];
	        if (extra !== 0) {
	          dist -= base_dist[code];
	          send_bits(s, dist, extra);   /* send the extra distance bits */
	        }
	      } /* literal or match pair ? */

	      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
	      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
	      //       "pendingBuf overflow");

	    } while (lx < s.last_lit);
	  }

	  send_code(s, END_BLOCK, ltree);
	}


	/* ===========================================================================
	 * Construct one Huffman tree and assigns the code bit strings and lengths.
	 * Update the total bit length for the current block.
	 * IN assertion: the field freq is set for all tree elements.
	 * OUT assertions: the fields len and code are set to the optimal bit length
	 *     and corresponding code. The length opt_len is updated; static_len is
	 *     also updated if stree is not null. The field max_code is set.
	 */
	function build_tree(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc; /* the tree descriptor */
	{
	  var tree     = desc.dyn_tree;
	  var stree    = desc.stat_desc.static_tree;
	  var has_stree = desc.stat_desc.has_stree;
	  var elems    = desc.stat_desc.elems;
	  var n, m;          /* iterate over heap elements */
	  var max_code = -1; /* largest code with non zero frequency */
	  var node;          /* new node being created */

	  /* Construct the initial heap, with least frequent element in
	   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
	   * heap[0] is not used.
	   */
	  s.heap_len = 0;
	  s.heap_max = HEAP_SIZE;

	  for (n = 0; n < elems; n++) {
	    if (tree[n * 2]/*.Freq*/ !== 0) {
	      s.heap[++s.heap_len] = max_code = n;
	      s.depth[n] = 0;

	    } else {
	      tree[n * 2 + 1]/*.Len*/ = 0;
	    }
	  }

	  /* The pkzip format requires that at least one distance code exists,
	   * and that at least one bit should be sent even if there is only one
	   * possible code. So to avoid special checks later on we force at least
	   * two codes of non zero frequency.
	   */
	  while (s.heap_len < 2) {
	    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
	    tree[node * 2]/*.Freq*/ = 1;
	    s.depth[node] = 0;
	    s.opt_len--;

	    if (has_stree) {
	      s.static_len -= stree[node * 2 + 1]/*.Len*/;
	    }
	    /* node is 0 or 1 so it does not have extra bits */
	  }
	  desc.max_code = max_code;

	  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
	   * establish sub-heaps of increasing lengths:
	   */
	  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

	  /* Construct the Huffman tree by repeatedly combining the least two
	   * frequent nodes.
	   */
	  node = elems;              /* next internal node of the tree */
	  do {
	    //pqremove(s, tree, n);  /* n = node of least frequency */
	    /*** pqremove ***/
	    n = s.heap[1/*SMALLEST*/];
	    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
	    pqdownheap(s, tree, 1/*SMALLEST*/);
	    /***/

	    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

	    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
	    s.heap[--s.heap_max] = m;

	    /* Create a new node father of n and m */
	    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
	    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
	    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

	    /* and insert the new node in the heap */
	    s.heap[1/*SMALLEST*/] = node++;
	    pqdownheap(s, tree, 1/*SMALLEST*/);

	  } while (s.heap_len >= 2);

	  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

	  /* At this point, the fields freq and dad are set. We can now
	   * generate the bit lengths.
	   */
	  gen_bitlen(s, desc);

	  /* The field len is now set, we can generate the bit codes */
	  gen_codes(tree, max_code, s.bl_count);
	}


	/* ===========================================================================
	 * Scan a literal or distance tree to determine the frequencies of the codes
	 * in the bit length tree.
	 */
	function scan_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree;   /* the tree to be scanned */
	//    int max_code;    /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }
	  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      s.bl_tree[curlen * 2]/*.Freq*/ += count;

	    } else if (curlen !== 0) {

	      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
	      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

	    } else if (count <= 10) {
	      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

	    } else {
	      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
	    }

	    count = 0;
	    prevlen = curlen;

	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Send a literal or distance tree in compressed form, using the codes in
	 * bl_tree.
	 */
	function send_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree; /* the tree to be scanned */
	//    int max_code;       /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  /* tree[max_code+1].Len = -1; */  /* guard already set */
	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

	    } else if (curlen !== 0) {
	      if (curlen !== prevlen) {
	        send_code(s, curlen, s.bl_tree);
	        count--;
	      }
	      //Assert(count >= 3 && count <= 6, " 3_6?");
	      send_code(s, REP_3_6, s.bl_tree);
	      send_bits(s, count - 3, 2);

	    } else if (count <= 10) {
	      send_code(s, REPZ_3_10, s.bl_tree);
	      send_bits(s, count - 3, 3);

	    } else {
	      send_code(s, REPZ_11_138, s.bl_tree);
	      send_bits(s, count - 11, 7);
	    }

	    count = 0;
	    prevlen = curlen;
	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Construct the Huffman tree for the bit lengths and return the index in
	 * bl_order of the last bit length code to send.
	 */
	function build_bl_tree(s) {
	  var max_blindex;  /* index of last bit length code of non zero freq */

	  /* Determine the bit length frequencies for literal and distance trees */
	  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
	  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

	  /* Build the bit length tree: */
	  build_tree(s, s.bl_desc);
	  /* opt_len now includes the length of the tree representations, except
	   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
	   */

	  /* Determine the number of bit length codes to send. The pkzip format
	   * requires that at least 4 bit length codes be sent. (appnote.txt says
	   * 3 but the actual value used is 4.)
	   */
	  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
	    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
	      break;
	    }
	  }
	  /* Update opt_len to include the bit length tree and counts */
	  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
	  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
	  //        s->opt_len, s->static_len));

	  return max_blindex;
	}


	/* ===========================================================================
	 * Send the header for a block using dynamic Huffman trees: the counts, the
	 * lengths of the bit length codes, the literal tree and the distance tree.
	 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
	 */
	function send_all_trees(s, lcodes, dcodes, blcodes)
	//    deflate_state *s;
	//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
	{
	  var rank;                    /* index in bl_order */

	  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
	  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
	  //        "too many codes");
	  //Tracev((stderr, "\nbl counts: "));
	  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
	  send_bits(s, dcodes - 1,   5);
	  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
	  for (rank = 0; rank < blcodes; rank++) {
	    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
	    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
	  }
	  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
	  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
	  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
	}


	/* ===========================================================================
	 * Check if the data type is TEXT or BINARY, using the following algorithm:
	 * - TEXT if the two conditions below are satisfied:
	 *    a) There are no non-portable control characters belonging to the
	 *       "black list" (0..6, 14..25, 28..31).
	 *    b) There is at least one printable character belonging to the
	 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
	 * - BINARY otherwise.
	 * - The following partially-portable control characters form a
	 *   "gray list" that is ignored in this detection algorithm:
	 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
	 * IN assertion: the fields Freq of dyn_ltree are set.
	 */
	function detect_data_type(s) {
	  /* black_mask is the bit mask of black-listed bytes
	   * set bits 0..6, 14..25, and 28..31
	   * 0xf3ffc07f = binary 11110011111111111100000001111111
	   */
	  var black_mask = 0xf3ffc07f;
	  var n;

	  /* Check for non-textual ("black-listed") bytes. */
	  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
	    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
	      return Z_BINARY;
	    }
	  }

	  /* Check for textual ("white-listed") bytes. */
	  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
	      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
	    return Z_TEXT;
	  }
	  for (n = 32; n < LITERALS; n++) {
	    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
	      return Z_TEXT;
	    }
	  }

	  /* There are no "black-listed" or "white-listed" bytes:
	   * this stream either is empty or has tolerated ("gray-listed") bytes only.
	   */
	  return Z_BINARY;
	}


	var static_init_done = false;

	/* ===========================================================================
	 * Initialize the tree data structures for a new zlib stream.
	 */
	function _tr_init(s)
	{

	  if (!static_init_done) {
	    tr_static_init();
	    static_init_done = true;
	  }

	  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
	  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
	  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

	  s.bi_buf = 0;
	  s.bi_valid = 0;

	  /* Initialize the first block of the first file: */
	  init_block(s);
	}


	/* ===========================================================================
	 * Send a stored block
	 */
	function _tr_stored_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
	  copy_block(s, buf, stored_len, true); /* with header */
	}


	/* ===========================================================================
	 * Send one empty static block to give enough lookahead for inflate.
	 * This takes 10 bits, of which 7 may remain in the bit buffer.
	 */
	function _tr_align(s) {
	  send_bits(s, STATIC_TREES << 1, 3);
	  send_code(s, END_BLOCK, static_ltree);
	  bi_flush(s);
	}


	/* ===========================================================================
	 * Determine the best encoding for the current block: dynamic trees, static
	 * trees or store, and output the encoded block to the zip file.
	 */
	function _tr_flush_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block, or NULL if too old */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
	  var max_blindex = 0;        /* index of last bit length code of non zero freq */

	  /* Build the Huffman trees unless a stored block is forced */
	  if (s.level > 0) {

	    /* Check if the file is binary or text */
	    if (s.strm.data_type === Z_UNKNOWN) {
	      s.strm.data_type = detect_data_type(s);
	    }

	    /* Construct the literal and distance trees */
	    build_tree(s, s.l_desc);
	    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));

	    build_tree(s, s.d_desc);
	    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));
	    /* At this point, opt_len and static_len are the total bit lengths of
	     * the compressed block data, excluding the tree representations.
	     */

	    /* Build the bit length tree for the above two trees, and get the index
	     * in bl_order of the last bit length code to send.
	     */
	    max_blindex = build_bl_tree(s);

	    /* Determine the best encoding. Compute the block lengths in bytes. */
	    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
	    static_lenb = (s.static_len + 3 + 7) >>> 3;

	    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
	    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
	    //        s->last_lit));

	    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

	  } else {
	    // Assert(buf != (char*)0, "lost buf");
	    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
	  }

	  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
	    /* 4: two words for the lengths */

	    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
	     * Otherwise we can't have processed more than WSIZE input bytes since
	     * the last block flush, because compression would have been
	     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
	     * transform a block into a stored block.
	     */
	    _tr_stored_block(s, buf, stored_len, last);

	  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

	    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
	    compress_block(s, static_ltree, static_dtree);

	  } else {
	    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
	    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
	    compress_block(s, s.dyn_ltree, s.dyn_dtree);
	  }
	  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
	  /* The above check is made mod 2^32, for files larger than 512 MB
	   * and uLong implemented on 32 bits.
	   */
	  init_block(s);

	  if (last) {
	    bi_windup(s);
	  }
	  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
	  //       s->compressed_len-7*last));
	}

	/* ===========================================================================
	 * Save the match info and tally the frequency counts. Return true if
	 * the current block must be flushed.
	 */
	function _tr_tally(s, dist, lc)
	//    deflate_state *s;
	//    unsigned dist;  /* distance of matched string */
	//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
	{
	  //var out_length, in_length, dcode;

	  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
	  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

	  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
	  s.last_lit++;

	  if (dist === 0) {
	    /* lc is the unmatched char */
	    s.dyn_ltree[lc * 2]/*.Freq*/++;
	  } else {
	    s.matches++;
	    /* Here, lc is the match length - MIN_MATCH */
	    dist--;             /* dist = match distance - 1 */
	    //Assert((ush)dist < (ush)MAX_DIST(s) &&
	    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
	    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

	    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
	    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
	  }

	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility

	//#ifdef TRUNCATE_BLOCK
	//  /* Try to guess if it is profitable to stop the current block here */
	//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
	//    /* Compute an upper bound for the compressed length */
	//    out_length = s.last_lit*8;
	//    in_length = s.strstart - s.block_start;
	//
	//    for (dcode = 0; dcode < D_CODES; dcode++) {
	//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
	//    }
	//    out_length >>>= 3;
	//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
	//    //       s->last_lit, in_length, out_length,
	//    //       100L - out_length*100L/in_length));
	//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
	//      return true;
	//    }
	//  }
	//#endif

	  return (s.last_lit === s.lit_bufsize - 1);
	  /* We avoid equality with lit_bufsize because of wraparound at 64K
	   * on 16 bit machines and because stored blocks are restricted to
	   * 64K-1 bytes.
	   */
	}

	exports._tr_init  = _tr_init;
	exports._tr_stored_block = _tr_stored_block;
	exports._tr_flush_block  = _tr_flush_block;
	exports._tr_tally = _tr_tally;
	exports._tr_align = _tr_align;


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	// Note: adler32 takes 12% for level 0 and 2% for level 6.
	// It doesn't worth to make additional optimizationa as in original.
	// Small size is preferable.

	function adler32(adler, buf, len, pos) {
	  var s1 = (adler & 0xffff) |0,
	      s2 = ((adler >>> 16) & 0xffff) |0,
	      n = 0;

	  while (len !== 0) {
	    // Set limit ~ twice less than 5552, to keep
	    // s2 in 31-bits, because we force signed ints.
	    // in other case %= will fail.
	    n = len > 2000 ? 2000 : len;
	    len -= n;

	    do {
	      s1 = (s1 + buf[pos++]) |0;
	      s2 = (s2 + s1) |0;
	    } while (--n);

	    s1 %= 65521;
	    s2 %= 65521;
	  }

	  return (s1 | (s2 << 16)) |0;
	}


	module.exports = adler32;


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	// Note: we can't get significant speed boost here.
	// So write code to minimize size - no pregenerated tables
	// and array tools dependencies.


	// Use ordinary array, since untyped makes no boost here
	function makeTable() {
	  var c, table = [];

	  for (var n = 0; n < 256; n++) {
	    c = n;
	    for (var k = 0; k < 8; k++) {
	      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
	    }
	    table[n] = c;
	  }

	  return table;
	}

	// Create table on load. Just 255 signed longs. Not a problem.
	var crcTable = makeTable();


	function crc32(crc, buf, len, pos) {
	  var t = crcTable,
	      end = pos + len;

	  crc ^= -1;

	  for (var i = pos; i < end; i++) {
	    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
	  }

	  return (crc ^ (-1)); // >>> 0;
	}


	module.exports = crc32;


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  2:      'need dictionary',     /* Z_NEED_DICT       2  */
	  1:      'stream end',          /* Z_STREAM_END      1  */
	  0:      '',                    /* Z_OK              0  */
	  '-1':   'file error',          /* Z_ERRNO         (-1) */
	  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
	  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
	  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
	  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
	  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// String encode/decode helpers
	'use strict';


	var utils = __webpack_require__(24);


	// Quick check if we can use fast array to bin string conversion
	//
	// - apply(Array) can fail on Android 2.2
	// - apply(Uint8Array) can fail on iOS 5.1 Safary
	//
	var STR_APPLY_OK = true;
	var STR_APPLY_UIA_OK = true;

	try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
	try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


	// Table with utf8 lengths (calculated by first byte of sequence)
	// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
	// because max possible codepoint is 0x10ffff
	var _utf8len = new utils.Buf8(256);
	for (var q = 0; q < 256; q++) {
	  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
	}
	_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


	// convert string to array (typed, when possible)
	exports.string2buf = function (str) {
	  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

	  // count binary size
	  for (m_pos = 0; m_pos < str_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
	      c2 = str.charCodeAt(m_pos + 1);
	      if ((c2 & 0xfc00) === 0xdc00) {
	        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	        m_pos++;
	      }
	    }
	    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
	  }

	  // allocate buffer
	  buf = new utils.Buf8(buf_len);

	  // convert
	  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
	      c2 = str.charCodeAt(m_pos + 1);
	      if ((c2 & 0xfc00) === 0xdc00) {
	        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	        m_pos++;
	      }
	    }
	    if (c < 0x80) {
	      /* one byte */
	      buf[i++] = c;
	    } else if (c < 0x800) {
	      /* two bytes */
	      buf[i++] = 0xC0 | (c >>> 6);
	      buf[i++] = 0x80 | (c & 0x3f);
	    } else if (c < 0x10000) {
	      /* three bytes */
	      buf[i++] = 0xE0 | (c >>> 12);
	      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	      buf[i++] = 0x80 | (c & 0x3f);
	    } else {
	      /* four bytes */
	      buf[i++] = 0xf0 | (c >>> 18);
	      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
	      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	      buf[i++] = 0x80 | (c & 0x3f);
	    }
	  }

	  return buf;
	};

	// Helper (used in 2 places)
	function buf2binstring(buf, len) {
	  // use fallback for big arrays to avoid stack overflow
	  if (len < 65537) {
	    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
	      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
	    }
	  }

	  var result = '';
	  for (var i = 0; i < len; i++) {
	    result += String.fromCharCode(buf[i]);
	  }
	  return result;
	}


	// Convert byte array to binary string
	exports.buf2binstring = function (buf) {
	  return buf2binstring(buf, buf.length);
	};


	// Convert binary string (typed, when possible)
	exports.binstring2buf = function (str) {
	  var buf = new utils.Buf8(str.length);
	  for (var i = 0, len = buf.length; i < len; i++) {
	    buf[i] = str.charCodeAt(i);
	  }
	  return buf;
	};


	// convert array to string
	exports.buf2string = function (buf, max) {
	  var i, out, c, c_len;
	  var len = max || buf.length;

	  // Reserve max possible length (2 words per char)
	  // NB: by unknown reasons, Array is significantly faster for
	  //     String.fromCharCode.apply than Uint16Array.
	  var utf16buf = new Array(len * 2);

	  for (out = 0, i = 0; i < len;) {
	    c = buf[i++];
	    // quick process ascii
	    if (c < 0x80) { utf16buf[out++] = c; continue; }

	    c_len = _utf8len[c];
	    // skip 5 & 6 byte codes
	    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

	    // apply mask on first byte
	    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
	    // join the rest
	    while (c_len > 1 && i < len) {
	      c = (c << 6) | (buf[i++] & 0x3f);
	      c_len--;
	    }

	    // terminated by end of string?
	    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

	    if (c < 0x10000) {
	      utf16buf[out++] = c;
	    } else {
	      c -= 0x10000;
	      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
	      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
	    }
	  }

	  return buf2binstring(utf16buf, out);
	};


	// Calculate max possible position in utf8 buffer,
	// that will not break sequence. If that's not possible
	// - (very small limits) return max size as is.
	//
	// buf[] - utf8 bytes array
	// max   - length limit (mandatory);
	exports.utf8border = function (buf, max) {
	  var pos;

	  max = max || buf.length;
	  if (max > buf.length) { max = buf.length; }

	  // go back from last position, until start of sequence found
	  pos = max - 1;
	  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

	  // Fuckup - very small and broken sequence,
	  // return max, because we should return something anyway.
	  if (pos < 0) { return max; }

	  // If we came to start of buffer - that means vuffer is too small,
	  // return max too.
	  if (pos === 0) { return max; }

	  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';


	function ZStream() {
	  /* next input byte */
	  this.input = null; // JS specific, because we have no pointers
	  this.next_in = 0;
	  /* number of bytes available at input */
	  this.avail_in = 0;
	  /* total number of input bytes read so far */
	  this.total_in = 0;
	  /* next output byte should be put there */
	  this.output = null; // JS specific, because we have no pointers
	  this.next_out = 0;
	  /* remaining free space at output */
	  this.avail_out = 0;
	  /* total number of bytes output so far */
	  this.total_out = 0;
	  /* last error message, NULL if no error */
	  this.msg = ''/*Z_NULL*/;
	  /* not visible by applications */
	  this.state = null;
	  /* best guess about the data type: binary or text */
	  this.data_type = 2/*Z_UNKNOWN*/;
	  /* adler32 value of the uncompressed data */
	  this.adler = 0;
	}

	module.exports = ZStream;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var zlib_inflate = __webpack_require__(34);
	var utils        = __webpack_require__(24);
	var strings      = __webpack_require__(31);
	var c            = __webpack_require__(37);
	var msg          = __webpack_require__(30);
	var ZStream      = __webpack_require__(32);
	var GZheader     = __webpack_require__(38);

	var toString = Object.prototype.toString;

	/**
	 * class Inflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[inflate]]
	 * and [[inflateRaw]].
	 **/

	/* internal
	 * inflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Inflate#onData]] not overriden.
	 **/

	/**
	 * Inflate.result -> Uint8Array|Array|String
	 *
	 * Uncompressed result, generated by default [[Inflate#onData]]
	 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
	 * push a chunk with explicit flush (call [[Inflate#push]] with
	 * `Z_SYNC_FLUSH` param).
	 **/

	/**
	 * Inflate.err -> Number
	 *
	 * Error code after inflate finished. 0 (Z_OK) on success.
	 * Should be checked if broken data possible.
	 **/

	/**
	 * Inflate.msg -> String
	 *
	 * Error message, if [[Inflate.err]] != 0
	 **/


	/**
	 * new Inflate(options)
	 * - options (Object): zlib inflate options.
	 *
	 * Creates new inflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `windowBits`
	 * - `dictionary`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw inflate
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 * By default, when no options set, autodetect deflate/gzip data format via
	 * wrapper header.
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var inflate = new pako.Inflate({ level: 3});
	 *
	 * inflate.push(chunk1, false);
	 * inflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (inflate.err) { throw new Error(inflate.err); }
	 *
	 * console.log(inflate.result);
	 * ```
	 **/
	function Inflate(options) {
	  if (!(this instanceof Inflate)) return new Inflate(options);

	  this.options = utils.assign({
	    chunkSize: 16384,
	    windowBits: 0,
	    to: ''
	  }, options || {});

	  var opt = this.options;

	  // Force window size for `raw` data, if not set directly,
	  // because we have no header for autodetect.
	  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
	    opt.windowBits = -opt.windowBits;
	    if (opt.windowBits === 0) { opt.windowBits = -15; }
	  }

	  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
	  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
	      !(options && options.windowBits)) {
	    opt.windowBits += 32;
	  }

	  // Gzip header has no info about windows size, we can do autodetect only
	  // for deflate. So, if window size not set, force it to max when gzip possible
	  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
	    // bit 3 (16) -> gzipped data
	    // bit 4 (32) -> autodetect gzip/deflate
	    if ((opt.windowBits & 15) === 0) {
	      opt.windowBits |= 15;
	    }
	  }

	  this.err    = 0;      // error code, if happens (0 = Z_OK)
	  this.msg    = '';     // error message
	  this.ended  = false;  // used to avoid multiple onEnd() calls
	  this.chunks = [];     // chunks of compressed data

	  this.strm   = new ZStream();
	  this.strm.avail_out = 0;

	  var status  = zlib_inflate.inflateInit2(
	    this.strm,
	    opt.windowBits
	  );

	  if (status !== c.Z_OK) {
	    throw new Error(msg[status]);
	  }

	  this.header = new GZheader();

	  zlib_inflate.inflateGetHeader(this.strm, this.header);
	}

	/**
	 * Inflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
	 * new output chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
	 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
	 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
	 *
	 * On fail call [[Inflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Inflate.prototype.push = function (data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var dictionary = this.options.dictionary;
	  var status, _mode;
	  var next_out_utf8, tail, utf8str;
	  var dict;

	  // Flag to properly process Z_BUF_ERROR on testing inflate call
	  // when we check that all output data was flushed.
	  var allowBufError = false;

	  if (this.ended) { return false; }
	  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

	  // Convert data if needed
	  if (typeof data === 'string') {
	    // Only binary strings can be decompressed on practice
	    strm.input = strings.binstring2buf(data);
	  } else if (toString.call(data) === '[object ArrayBuffer]') {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }

	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;

	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }

	    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

	    if (status === c.Z_NEED_DICT && dictionary) {
	      // Convert data if needed
	      if (typeof dictionary === 'string') {
	        dict = strings.string2buf(dictionary);
	      } else if (toString.call(dictionary) === '[object ArrayBuffer]') {
	        dict = new Uint8Array(dictionary);
	      } else {
	        dict = dictionary;
	      }

	      status = zlib_inflate.inflateSetDictionary(this.strm, dict);

	    }

	    if (status === c.Z_BUF_ERROR && allowBufError === true) {
	      status = c.Z_OK;
	      allowBufError = false;
	    }

	    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }

	    if (strm.next_out) {
	      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

	        if (this.options.to === 'string') {

	          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

	          tail = strm.next_out - next_out_utf8;
	          utf8str = strings.buf2string(strm.output, next_out_utf8);

	          // move tail
	          strm.next_out = tail;
	          strm.avail_out = chunkSize - tail;
	          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

	          this.onData(utf8str);

	        } else {
	          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	        }
	      }
	    }

	    // When no more input data, we should check that internal inflate buffers
	    // are flushed. The only way to do it when avail_out = 0 - run one more
	    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
	    // Here we set flag to process this error properly.
	    //
	    // NOTE. Deflate does not return error in this case and does not needs such
	    // logic.
	    if (strm.avail_in === 0 && strm.avail_out === 0) {
	      allowBufError = true;
	    }

	  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

	  if (status === c.Z_STREAM_END) {
	    _mode = c.Z_FINISH;
	  }

	  // Finalize on the last chunk.
	  if (_mode === c.Z_FINISH) {
	    status = zlib_inflate.inflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === c.Z_OK;
	  }

	  // callback interim results if Z_SYNC_FLUSH.
	  if (_mode === c.Z_SYNC_FLUSH) {
	    this.onEnd(c.Z_OK);
	    strm.avail_out = 0;
	    return true;
	  }

	  return true;
	};


	/**
	 * Inflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Inflate.prototype.onData = function (chunk) {
	  this.chunks.push(chunk);
	};


	/**
	 * Inflate#onEnd(status) -> Void
	 * - status (Number): inflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called either after you tell inflate that the input stream is
	 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
	 * or if an error happened. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Inflate.prototype.onEnd = function (status) {
	  // On success - join
	  if (status === c.Z_OK) {
	    if (this.options.to === 'string') {
	      // Glue & convert here, until we teach pako to send
	      // utf8 alligned strings to onData
	      this.result = this.chunks.join('');
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};


	/**
	 * inflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Decompress `data` with inflate/ungzip and `options`. Autodetect
	 * format via wrapper header by default. That's why we don't provide
	 * separate `ungzip` method.
	 *
	 * Supported options are:
	 *
	 * - windowBits
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
	 *   , output;
	 *
	 * try {
	 *   output = pako.inflate(input);
	 * } catch (err)
	 *   console.log(err);
	 * }
	 * ```
	 **/
	function inflate(input, options) {
	  var inflator = new Inflate(options);

	  inflator.push(input, true);

	  // That will never happens, if you don't cheat with options :)
	  if (inflator.err) { throw inflator.msg; }

	  return inflator.result;
	}


	/**
	 * inflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * The same as [[inflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function inflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return inflate(input, options);
	}


	/**
	 * ungzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Just shortcut to [[inflate]], because it autodetects format
	 * by header.content. Done for convenience.
	 **/


	exports.Inflate = Inflate;
	exports.inflate = inflate;
	exports.inflateRaw = inflateRaw;
	exports.ungzip  = inflate;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var utils         = __webpack_require__(24);
	var adler32       = __webpack_require__(28);
	var crc32         = __webpack_require__(29);
	var inflate_fast  = __webpack_require__(35);
	var inflate_table = __webpack_require__(36);

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	//var Z_NO_FLUSH      = 0;
	//var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	//var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;

	/* The deflate compression method */
	var Z_DEFLATED  = 8;


	/* STATES ====================================================================*/
	/* ===========================================================================*/


	var    HEAD = 1;       /* i: waiting for magic header */
	var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
	var    TIME = 3;       /* i: waiting for modification time (gzip) */
	var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
	var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
	var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
	var    NAME = 7;       /* i: waiting for end of file name (gzip) */
	var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
	var    HCRC = 9;       /* i: waiting for header crc (gzip) */
	var    DICTID = 10;    /* i: waiting for dictionary check value */
	var    DICT = 11;      /* waiting for inflateSetDictionary() call */
	var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
	var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
	var        STORED = 14;    /* i: waiting for stored size (length and complement) */
	var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
	var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
	var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
	var        LENLENS = 18;   /* i: waiting for code length code lengths */
	var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
	var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
	var            LEN = 21;       /* i: waiting for length/lit/eob code */
	var            LENEXT = 22;    /* i: waiting for length extra bits */
	var            DIST = 23;      /* i: waiting for distance code */
	var            DISTEXT = 24;   /* i: waiting for distance extra bits */
	var            MATCH = 25;     /* o: waiting for output space to copy string */
	var            LIT = 26;       /* o: waiting for output space to write literal */
	var    CHECK = 27;     /* i: waiting for 32-bit check value */
	var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
	var    DONE = 29;      /* finished check, done -- remain here until reset */
	var    BAD = 30;       /* got a data error -- remain here until reset */
	var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
	var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

	/* ===========================================================================*/



	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_WBITS = MAX_WBITS;


	function zswap32(q) {
	  return  (((q >>> 24) & 0xff) +
	          ((q >>> 8) & 0xff00) +
	          ((q & 0xff00) << 8) +
	          ((q & 0xff) << 24));
	}


	function InflateState() {
	  this.mode = 0;             /* current inflate mode */
	  this.last = false;          /* true if processing last block */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.havedict = false;      /* true if dictionary provided */
	  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
	  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
	  this.check = 0;             /* protected copy of check value */
	  this.total = 0;             /* protected copy of output count */
	  // TODO: may be {}
	  this.head = null;           /* where to save gzip header information */

	  /* sliding window */
	  this.wbits = 0;             /* log base 2 of requested window size */
	  this.wsize = 0;             /* window size or zero if not using window */
	  this.whave = 0;             /* valid bytes in the window */
	  this.wnext = 0;             /* window write index */
	  this.window = null;         /* allocated sliding window, if needed */

	  /* bit accumulator */
	  this.hold = 0;              /* input bit accumulator */
	  this.bits = 0;              /* number of bits in "in" */

	  /* for string and stored block copying */
	  this.length = 0;            /* literal or length of data to copy */
	  this.offset = 0;            /* distance back to copy string from */

	  /* for table and code decoding */
	  this.extra = 0;             /* extra bits needed */

	  /* fixed and dynamic code tables */
	  this.lencode = null;          /* starting table for length/literal codes */
	  this.distcode = null;         /* starting table for distance codes */
	  this.lenbits = 0;           /* index bits for lencode */
	  this.distbits = 0;          /* index bits for distcode */

	  /* dynamic table building */
	  this.ncode = 0;             /* number of code length code lengths */
	  this.nlen = 0;              /* number of length code lengths */
	  this.ndist = 0;             /* number of distance code lengths */
	  this.have = 0;              /* number of code lengths in lens[] */
	  this.next = null;              /* next available space in codes[] */

	  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
	  this.work = new utils.Buf16(288); /* work area for code table building */

	  /*
	   because we don't have pointers in js, we use lencode and distcode directly
	   as buffers so we don't need codes
	  */
	  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
	  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
	  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
	  this.sane = 0;                   /* if false, allow invalid distance too far */
	  this.back = 0;                   /* bits back of last unprocessed length/lit */
	  this.was = 0;                    /* initial length of match */
	}

	function inflateResetKeep(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  strm.total_in = strm.total_out = state.total = 0;
	  strm.msg = ''; /*Z_NULL*/
	  if (state.wrap) {       /* to support ill-conceived Java test suite */
	    strm.adler = state.wrap & 1;
	  }
	  state.mode = HEAD;
	  state.last = 0;
	  state.havedict = 0;
	  state.dmax = 32768;
	  state.head = null/*Z_NULL*/;
	  state.hold = 0;
	  state.bits = 0;
	  //state.lencode = state.distcode = state.next = state.codes;
	  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
	  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

	  state.sane = 1;
	  state.back = -1;
	  //Tracev((stderr, "inflate: reset\n"));
	  return Z_OK;
	}

	function inflateReset(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  state.wsize = 0;
	  state.whave = 0;
	  state.wnext = 0;
	  return inflateResetKeep(strm);

	}

	function inflateReset2(strm, windowBits) {
	  var wrap;
	  var state;

	  /* get the state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;

	  /* extract wrap request from windowBits parameter */
	  if (windowBits < 0) {
	    wrap = 0;
	    windowBits = -windowBits;
	  }
	  else {
	    wrap = (windowBits >> 4) + 1;
	    if (windowBits < 48) {
	      windowBits &= 15;
	    }
	  }

	  /* set number of window bits, free window if different */
	  if (windowBits && (windowBits < 8 || windowBits > 15)) {
	    return Z_STREAM_ERROR;
	  }
	  if (state.window !== null && state.wbits !== windowBits) {
	    state.window = null;
	  }

	  /* update state and reset the rest of it */
	  state.wrap = wrap;
	  state.wbits = windowBits;
	  return inflateReset(strm);
	}

	function inflateInit2(strm, windowBits) {
	  var ret;
	  var state;

	  if (!strm) { return Z_STREAM_ERROR; }
	  //strm.msg = Z_NULL;                 /* in case we return an error */

	  state = new InflateState();

	  //if (state === Z_NULL) return Z_MEM_ERROR;
	  //Tracev((stderr, "inflate: allocated\n"));
	  strm.state = state;
	  state.window = null/*Z_NULL*/;
	  ret = inflateReset2(strm, windowBits);
	  if (ret !== Z_OK) {
	    strm.state = null/*Z_NULL*/;
	  }
	  return ret;
	}

	function inflateInit(strm) {
	  return inflateInit2(strm, DEF_WBITS);
	}


	/*
	 Return state with length and distance decoding tables and index sizes set to
	 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
	 If BUILDFIXED is defined, then instead this routine builds the tables the
	 first time it's called, and returns those tables the first time and
	 thereafter.  This reduces the size of the code by about 2K bytes, in
	 exchange for a little execution time.  However, BUILDFIXED should not be
	 used for threaded applications, since the rewriting of the tables and virgin
	 may not be thread-safe.
	 */
	var virgin = true;

	var lenfix, distfix; // We have no pointers in JS, so keep tables separate

	function fixedtables(state) {
	  /* build fixed huffman tables if first call (may not be thread safe) */
	  if (virgin) {
	    var sym;

	    lenfix = new utils.Buf32(512);
	    distfix = new utils.Buf32(32);

	    /* literal/length table */
	    sym = 0;
	    while (sym < 144) { state.lens[sym++] = 8; }
	    while (sym < 256) { state.lens[sym++] = 9; }
	    while (sym < 280) { state.lens[sym++] = 7; }
	    while (sym < 288) { state.lens[sym++] = 8; }

	    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

	    /* distance table */
	    sym = 0;
	    while (sym < 32) { state.lens[sym++] = 5; }

	    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

	    /* do this just once */
	    virgin = false;
	  }

	  state.lencode = lenfix;
	  state.lenbits = 9;
	  state.distcode = distfix;
	  state.distbits = 5;
	}


	/*
	 Update the window with the last wsize (normally 32K) bytes written before
	 returning.  If window does not exist yet, create it.  This is only called
	 when a window is already in use, or when output has been written during this
	 inflate call, but the end of the deflate stream has not been reached yet.
	 It is also called to create a window for dictionary data when a dictionary
	 is loaded.

	 Providing output buffers larger than 32K to inflate() should provide a speed
	 advantage, since only the last 32K of output is copied to the sliding window
	 upon return from inflate(), and since all distances after the first 32K of
	 output will fall in the output data, making match copies simpler and faster.
	 The advantage may be dependent on the size of the processor's data caches.
	 */
	function updatewindow(strm, src, end, copy) {
	  var dist;
	  var state = strm.state;

	  /* if it hasn't been done already, allocate space for the window */
	  if (state.window === null) {
	    state.wsize = 1 << state.wbits;
	    state.wnext = 0;
	    state.whave = 0;

	    state.window = new utils.Buf8(state.wsize);
	  }

	  /* copy state->wsize or less output bytes into the circular window */
	  if (copy >= state.wsize) {
	    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
	    state.wnext = 0;
	    state.whave = state.wsize;
	  }
	  else {
	    dist = state.wsize - state.wnext;
	    if (dist > copy) {
	      dist = copy;
	    }
	    //zmemcpy(state->window + state->wnext, end - copy, dist);
	    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
	    copy -= dist;
	    if (copy) {
	      //zmemcpy(state->window, end - copy, copy);
	      utils.arraySet(state.window, src, end - copy, copy, 0);
	      state.wnext = copy;
	      state.whave = state.wsize;
	    }
	    else {
	      state.wnext += dist;
	      if (state.wnext === state.wsize) { state.wnext = 0; }
	      if (state.whave < state.wsize) { state.whave += dist; }
	    }
	  }
	  return 0;
	}

	function inflate(strm, flush) {
	  var state;
	  var input, output;          // input/output buffers
	  var next;                   /* next input INDEX */
	  var put;                    /* next output INDEX */
	  var have, left;             /* available input and output */
	  var hold;                   /* bit buffer */
	  var bits;                   /* bits in bit buffer */
	  var _in, _out;              /* save starting available input and output */
	  var copy;                   /* number of stored or match bytes to copy */
	  var from;                   /* where to copy match bytes from */
	  var from_source;
	  var here = 0;               /* current decoding table entry */
	  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
	  //var last;                   /* parent table entry */
	  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
	  var len;                    /* length to copy for repeats, bits to drop */
	  var ret;                    /* return code */
	  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
	  var opts;

	  var n; // temporary var for NEED_BITS

	  var order = /* permutation of code lengths */
	    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


	  if (!strm || !strm.state || !strm.output ||
	      (!strm.input && strm.avail_in !== 0)) {
	    return Z_STREAM_ERROR;
	  }

	  state = strm.state;
	  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


	  //--- LOAD() ---
	  put = strm.next_out;
	  output = strm.output;
	  left = strm.avail_out;
	  next = strm.next_in;
	  input = strm.input;
	  have = strm.avail_in;
	  hold = state.hold;
	  bits = state.bits;
	  //---

	  _in = have;
	  _out = left;
	  ret = Z_OK;

	  inf_leave: // goto emulation
	  for (;;) {
	    switch (state.mode) {
	    case HEAD:
	      if (state.wrap === 0) {
	        state.mode = TYPEDO;
	        break;
	      }
	      //=== NEEDBITS(16);
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
	        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//

	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = FLAGS;
	        break;
	      }
	      state.flags = 0;           /* expect zlib header */
	      if (state.head) {
	        state.head.done = false;
	      }
	      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
	        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
	        strm.msg = 'incorrect header check';
	        state.mode = BAD;
	        break;
	      }
	      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
	        strm.msg = 'unknown compression method';
	        state.mode = BAD;
	        break;
	      }
	      //--- DROPBITS(4) ---//
	      hold >>>= 4;
	      bits -= 4;
	      //---//
	      len = (hold & 0x0f)/*BITS(4)*/ + 8;
	      if (state.wbits === 0) {
	        state.wbits = len;
	      }
	      else if (len > state.wbits) {
	        strm.msg = 'invalid window size';
	        state.mode = BAD;
	        break;
	      }
	      state.dmax = 1 << len;
	      //Tracev((stderr, "inflate:   zlib header ok\n"));
	      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	      state.mode = hold & 0x200 ? DICTID : TYPE;
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      break;
	    case FLAGS:
	      //=== NEEDBITS(16); */
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.flags = hold;
	      if ((state.flags & 0xff) !== Z_DEFLATED) {
	        strm.msg = 'unknown compression method';
	        state.mode = BAD;
	        break;
	      }
	      if (state.flags & 0xe000) {
	        strm.msg = 'unknown header flags set';
	        state.mode = BAD;
	        break;
	      }
	      if (state.head) {
	        state.head.text = ((hold >> 8) & 1);
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = TIME;
	      /* falls through */
	    case TIME:
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if (state.head) {
	        state.head.time = hold;
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC4(state.check, hold)
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        hbuf[2] = (hold >>> 16) & 0xff;
	        hbuf[3] = (hold >>> 24) & 0xff;
	        state.check = crc32(state.check, hbuf, 4, 0);
	        //===
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = OS;
	      /* falls through */
	    case OS:
	      //=== NEEDBITS(16); */
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if (state.head) {
	        state.head.xflags = (hold & 0xff);
	        state.head.os = (hold >> 8);
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = EXLEN;
	      /* falls through */
	    case EXLEN:
	      if (state.flags & 0x0400) {
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.length = hold;
	        if (state.head) {
	          state.head.extra_len = hold;
	        }
	        if (state.flags & 0x0200) {
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = (hold >>> 8) & 0xff;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	      }
	      else if (state.head) {
	        state.head.extra = null/*Z_NULL*/;
	      }
	      state.mode = EXTRA;
	      /* falls through */
	    case EXTRA:
	      if (state.flags & 0x0400) {
	        copy = state.length;
	        if (copy > have) { copy = have; }
	        if (copy) {
	          if (state.head) {
	            len = state.head.extra_len - state.length;
	            if (!state.head.extra) {
	              // Use untyped array for more conveniend processing later
	              state.head.extra = new Array(state.head.extra_len);
	            }
	            utils.arraySet(
	              state.head.extra,
	              input,
	              next,
	              // extra field is limited to 65536 bytes
	              // - no need for additional size check
	              copy,
	              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
	              len
	            );
	            //zmemcpy(state.head.extra + len, next,
	            //        len + copy > state.head.extra_max ?
	            //        state.head.extra_max - len : copy);
	          }
	          if (state.flags & 0x0200) {
	            state.check = crc32(state.check, input, copy, next);
	          }
	          have -= copy;
	          next += copy;
	          state.length -= copy;
	        }
	        if (state.length) { break inf_leave; }
	      }
	      state.length = 0;
	      state.mode = NAME;
	      /* falls through */
	    case NAME:
	      if (state.flags & 0x0800) {
	        if (have === 0) { break inf_leave; }
	        copy = 0;
	        do {
	          // TODO: 2 or 1 bytes?
	          len = input[next + copy++];
	          /* use constant limit because in js we should not preallocate memory */
	          if (state.head && len &&
	              (state.length < 65536 /*state.head.name_max*/)) {
	            state.head.name += String.fromCharCode(len);
	          }
	        } while (len && copy < have);

	        if (state.flags & 0x0200) {
	          state.check = crc32(state.check, input, copy, next);
	        }
	        have -= copy;
	        next += copy;
	        if (len) { break inf_leave; }
	      }
	      else if (state.head) {
	        state.head.name = null;
	      }
	      state.length = 0;
	      state.mode = COMMENT;
	      /* falls through */
	    case COMMENT:
	      if (state.flags & 0x1000) {
	        if (have === 0) { break inf_leave; }
	        copy = 0;
	        do {
	          len = input[next + copy++];
	          /* use constant limit because in js we should not preallocate memory */
	          if (state.head && len &&
	              (state.length < 65536 /*state.head.comm_max*/)) {
	            state.head.comment += String.fromCharCode(len);
	          }
	        } while (len && copy < have);
	        if (state.flags & 0x0200) {
	          state.check = crc32(state.check, input, copy, next);
	        }
	        have -= copy;
	        next += copy;
	        if (len) { break inf_leave; }
	      }
	      else if (state.head) {
	        state.head.comment = null;
	      }
	      state.mode = HCRC;
	      /* falls through */
	    case HCRC:
	      if (state.flags & 0x0200) {
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (hold !== (state.check & 0xffff)) {
	          strm.msg = 'header crc mismatch';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	      }
	      if (state.head) {
	        state.head.hcrc = ((state.flags >> 9) & 1);
	        state.head.done = true;
	      }
	      strm.adler = state.check = 0;
	      state.mode = TYPE;
	      break;
	    case DICTID:
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      strm.adler = state.check = zswap32(hold);
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = DICT;
	      /* falls through */
	    case DICT:
	      if (state.havedict === 0) {
	        //--- RESTORE() ---
	        strm.next_out = put;
	        strm.avail_out = left;
	        strm.next_in = next;
	        strm.avail_in = have;
	        state.hold = hold;
	        state.bits = bits;
	        //---
	        return Z_NEED_DICT;
	      }
	      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	      state.mode = TYPE;
	      /* falls through */
	    case TYPE:
	      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case TYPEDO:
	      if (state.last) {
	        //--- BYTEBITS() ---//
	        hold >>>= bits & 7;
	        bits -= bits & 7;
	        //---//
	        state.mode = CHECK;
	        break;
	      }
	      //=== NEEDBITS(3); */
	      while (bits < 3) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.last = (hold & 0x01)/*BITS(1)*/;
	      //--- DROPBITS(1) ---//
	      hold >>>= 1;
	      bits -= 1;
	      //---//

	      switch ((hold & 0x03)/*BITS(2)*/) {
	      case 0:                             /* stored block */
	        //Tracev((stderr, "inflate:     stored block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = STORED;
	        break;
	      case 1:                             /* fixed block */
	        fixedtables(state);
	        //Tracev((stderr, "inflate:     fixed codes block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = LEN_;             /* decode codes */
	        if (flush === Z_TREES) {
	          //--- DROPBITS(2) ---//
	          hold >>>= 2;
	          bits -= 2;
	          //---//
	          break inf_leave;
	        }
	        break;
	      case 2:                             /* dynamic block */
	        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = TABLE;
	        break;
	      case 3:
	        strm.msg = 'invalid block type';
	        state.mode = BAD;
	      }
	      //--- DROPBITS(2) ---//
	      hold >>>= 2;
	      bits -= 2;
	      //---//
	      break;
	    case STORED:
	      //--- BYTEBITS() ---// /* go to byte boundary */
	      hold >>>= bits & 7;
	      bits -= bits & 7;
	      //---//
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
	        strm.msg = 'invalid stored block lengths';
	        state.mode = BAD;
	        break;
	      }
	      state.length = hold & 0xffff;
	      //Tracev((stderr, "inflate:       stored length %u\n",
	      //        state.length));
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = COPY_;
	      if (flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case COPY_:
	      state.mode = COPY;
	      /* falls through */
	    case COPY:
	      copy = state.length;
	      if (copy) {
	        if (copy > have) { copy = have; }
	        if (copy > left) { copy = left; }
	        if (copy === 0) { break inf_leave; }
	        //--- zmemcpy(put, next, copy); ---
	        utils.arraySet(output, input, next, copy, put);
	        //---//
	        have -= copy;
	        next += copy;
	        left -= copy;
	        put += copy;
	        state.length -= copy;
	        break;
	      }
	      //Tracev((stderr, "inflate:       stored end\n"));
	      state.mode = TYPE;
	      break;
	    case TABLE:
	      //=== NEEDBITS(14); */
	      while (bits < 14) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
	      //--- DROPBITS(5) ---//
	      hold >>>= 5;
	      bits -= 5;
	      //---//
	      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
	      //--- DROPBITS(5) ---//
	      hold >>>= 5;
	      bits -= 5;
	      //---//
	      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
	      //--- DROPBITS(4) ---//
	      hold >>>= 4;
	      bits -= 4;
	      //---//
	//#ifndef PKZIP_BUG_WORKAROUND
	      if (state.nlen > 286 || state.ndist > 30) {
	        strm.msg = 'too many length or distance symbols';
	        state.mode = BAD;
	        break;
	      }
	//#endif
	      //Tracev((stderr, "inflate:       table sizes ok\n"));
	      state.have = 0;
	      state.mode = LENLENS;
	      /* falls through */
	    case LENLENS:
	      while (state.have < state.ncode) {
	        //=== NEEDBITS(3);
	        while (bits < 3) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
	        //--- DROPBITS(3) ---//
	        hold >>>= 3;
	        bits -= 3;
	        //---//
	      }
	      while (state.have < 19) {
	        state.lens[order[state.have++]] = 0;
	      }
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      //state.next = state.codes;
	      //state.lencode = state.next;
	      // Switch to use dynamic table
	      state.lencode = state.lendyn;
	      state.lenbits = 7;

	      opts = { bits: state.lenbits };
	      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
	      state.lenbits = opts.bits;

	      if (ret) {
	        strm.msg = 'invalid code lengths set';
	        state.mode = BAD;
	        break;
	      }
	      //Tracev((stderr, "inflate:       code lengths ok\n"));
	      state.have = 0;
	      state.mode = CODELENS;
	      /* falls through */
	    case CODELENS:
	      while (state.have < state.nlen + state.ndist) {
	        for (;;) {
	          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        if (here_val < 16) {
	          //--- DROPBITS(here.bits) ---//
	          hold >>>= here_bits;
	          bits -= here_bits;
	          //---//
	          state.lens[state.have++] = here_val;
	        }
	        else {
	          if (here_val === 16) {
	            //=== NEEDBITS(here.bits + 2);
	            n = here_bits + 2;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            if (state.have === 0) {
	              strm.msg = 'invalid bit length repeat';
	              state.mode = BAD;
	              break;
	            }
	            len = state.lens[state.have - 1];
	            copy = 3 + (hold & 0x03);//BITS(2);
	            //--- DROPBITS(2) ---//
	            hold >>>= 2;
	            bits -= 2;
	            //---//
	          }
	          else if (here_val === 17) {
	            //=== NEEDBITS(here.bits + 3);
	            n = here_bits + 3;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            len = 0;
	            copy = 3 + (hold & 0x07);//BITS(3);
	            //--- DROPBITS(3) ---//
	            hold >>>= 3;
	            bits -= 3;
	            //---//
	          }
	          else {
	            //=== NEEDBITS(here.bits + 7);
	            n = here_bits + 7;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            len = 0;
	            copy = 11 + (hold & 0x7f);//BITS(7);
	            //--- DROPBITS(7) ---//
	            hold >>>= 7;
	            bits -= 7;
	            //---//
	          }
	          if (state.have + copy > state.nlen + state.ndist) {
	            strm.msg = 'invalid bit length repeat';
	            state.mode = BAD;
	            break;
	          }
	          while (copy--) {
	            state.lens[state.have++] = len;
	          }
	        }
	      }

	      /* handle error breaks in while */
	      if (state.mode === BAD) { break; }

	      /* check for end-of-block code (better have one) */
	      if (state.lens[256] === 0) {
	        strm.msg = 'invalid code -- missing end-of-block';
	        state.mode = BAD;
	        break;
	      }

	      /* build code tables -- note: do not change the lenbits or distbits
	         values here (9 and 6) without reading the comments in inftrees.h
	         concerning the ENOUGH constants, which depend on those values */
	      state.lenbits = 9;

	      opts = { bits: state.lenbits };
	      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      // state.next_index = opts.table_index;
	      state.lenbits = opts.bits;
	      // state.lencode = state.next;

	      if (ret) {
	        strm.msg = 'invalid literal/lengths set';
	        state.mode = BAD;
	        break;
	      }

	      state.distbits = 6;
	      //state.distcode.copy(state.codes);
	      // Switch to use dynamic table
	      state.distcode = state.distdyn;
	      opts = { bits: state.distbits };
	      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      // state.next_index = opts.table_index;
	      state.distbits = opts.bits;
	      // state.distcode = state.next;

	      if (ret) {
	        strm.msg = 'invalid distances set';
	        state.mode = BAD;
	        break;
	      }
	      //Tracev((stderr, 'inflate:       codes ok\n'));
	      state.mode = LEN_;
	      if (flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case LEN_:
	      state.mode = LEN;
	      /* falls through */
	    case LEN:
	      if (have >= 6 && left >= 258) {
	        //--- RESTORE() ---
	        strm.next_out = put;
	        strm.avail_out = left;
	        strm.next_in = next;
	        strm.avail_in = have;
	        state.hold = hold;
	        state.bits = bits;
	        //---
	        inflate_fast(strm, _out);
	        //--- LOAD() ---
	        put = strm.next_out;
	        output = strm.output;
	        left = strm.avail_out;
	        next = strm.next_in;
	        input = strm.input;
	        have = strm.avail_in;
	        hold = state.hold;
	        bits = state.bits;
	        //---

	        if (state.mode === TYPE) {
	          state.back = -1;
	        }
	        break;
	      }
	      state.back = 0;
	      for (;;) {
	        here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
	        here_bits = here >>> 24;
	        here_op = (here >>> 16) & 0xff;
	        here_val = here & 0xffff;

	        if (here_bits <= bits) { break; }
	        //--- PULLBYTE() ---//
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	        //---//
	      }
	      if (here_op && (here_op & 0xf0) === 0) {
	        last_bits = here_bits;
	        last_op = here_op;
	        last_val = here_val;
	        for (;;) {
	          here = state.lencode[last_val +
	                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((last_bits + here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        //--- DROPBITS(last.bits) ---//
	        hold >>>= last_bits;
	        bits -= last_bits;
	        //---//
	        state.back += last_bits;
	      }
	      //--- DROPBITS(here.bits) ---//
	      hold >>>= here_bits;
	      bits -= here_bits;
	      //---//
	      state.back += here_bits;
	      state.length = here_val;
	      if (here_op === 0) {
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        state.mode = LIT;
	        break;
	      }
	      if (here_op & 32) {
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.back = -1;
	        state.mode = TYPE;
	        break;
	      }
	      if (here_op & 64) {
	        strm.msg = 'invalid literal/length code';
	        state.mode = BAD;
	        break;
	      }
	      state.extra = here_op & 15;
	      state.mode = LENEXT;
	      /* falls through */
	    case LENEXT:
	      if (state.extra) {
	        //=== NEEDBITS(state.extra);
	        n = state.extra;
	        while (bits < n) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
	        //--- DROPBITS(state.extra) ---//
	        hold >>>= state.extra;
	        bits -= state.extra;
	        //---//
	        state.back += state.extra;
	      }
	      //Tracevv((stderr, "inflate:         length %u\n", state.length));
	      state.was = state.length;
	      state.mode = DIST;
	      /* falls through */
	    case DIST:
	      for (;;) {
	        here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
	        here_bits = here >>> 24;
	        here_op = (here >>> 16) & 0xff;
	        here_val = here & 0xffff;

	        if ((here_bits) <= bits) { break; }
	        //--- PULLBYTE() ---//
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	        //---//
	      }
	      if ((here_op & 0xf0) === 0) {
	        last_bits = here_bits;
	        last_op = here_op;
	        last_val = here_val;
	        for (;;) {
	          here = state.distcode[last_val +
	                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((last_bits + here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        //--- DROPBITS(last.bits) ---//
	        hold >>>= last_bits;
	        bits -= last_bits;
	        //---//
	        state.back += last_bits;
	      }
	      //--- DROPBITS(here.bits) ---//
	      hold >>>= here_bits;
	      bits -= here_bits;
	      //---//
	      state.back += here_bits;
	      if (here_op & 64) {
	        strm.msg = 'invalid distance code';
	        state.mode = BAD;
	        break;
	      }
	      state.offset = here_val;
	      state.extra = (here_op) & 15;
	      state.mode = DISTEXT;
	      /* falls through */
	    case DISTEXT:
	      if (state.extra) {
	        //=== NEEDBITS(state.extra);
	        n = state.extra;
	        while (bits < n) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
	        //--- DROPBITS(state.extra) ---//
	        hold >>>= state.extra;
	        bits -= state.extra;
	        //---//
	        state.back += state.extra;
	      }
	//#ifdef INFLATE_STRICT
	      if (state.offset > state.dmax) {
	        strm.msg = 'invalid distance too far back';
	        state.mode = BAD;
	        break;
	      }
	//#endif
	      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
	      state.mode = MATCH;
	      /* falls through */
	    case MATCH:
	      if (left === 0) { break inf_leave; }
	      copy = _out - left;
	      if (state.offset > copy) {         /* copy from window */
	        copy = state.offset - copy;
	        if (copy > state.whave) {
	          if (state.sane) {
	            strm.msg = 'invalid distance too far back';
	            state.mode = BAD;
	            break;
	          }
	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//          Trace((stderr, "inflate.c too far\n"));
	//          copy -= state.whave;
	//          if (copy > state.length) { copy = state.length; }
	//          if (copy > left) { copy = left; }
	//          left -= copy;
	//          state.length -= copy;
	//          do {
	//            output[put++] = 0;
	//          } while (--copy);
	//          if (state.length === 0) { state.mode = LEN; }
	//          break;
	//#endif
	        }
	        if (copy > state.wnext) {
	          copy -= state.wnext;
	          from = state.wsize - copy;
	        }
	        else {
	          from = state.wnext - copy;
	        }
	        if (copy > state.length) { copy = state.length; }
	        from_source = state.window;
	      }
	      else {                              /* copy from output */
	        from_source = output;
	        from = put - state.offset;
	        copy = state.length;
	      }
	      if (copy > left) { copy = left; }
	      left -= copy;
	      state.length -= copy;
	      do {
	        output[put++] = from_source[from++];
	      } while (--copy);
	      if (state.length === 0) { state.mode = LEN; }
	      break;
	    case LIT:
	      if (left === 0) { break inf_leave; }
	      output[put++] = state.length;
	      left--;
	      state.mode = LEN;
	      break;
	    case CHECK:
	      if (state.wrap) {
	        //=== NEEDBITS(32);
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          // Use '|' insdead of '+' to make sure that result is signed
	          hold |= input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        _out -= left;
	        strm.total_out += _out;
	        state.total += _out;
	        if (_out) {
	          strm.adler = state.check =
	              /*UPDATE(state.check, put - _out, _out);*/
	              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

	        }
	        _out = left;
	        // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
	        if ((state.flags ? hold : zswap32(hold)) !== state.check) {
	          strm.msg = 'incorrect data check';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        //Tracev((stderr, "inflate:   check matches trailer\n"));
	      }
	      state.mode = LENGTH;
	      /* falls through */
	    case LENGTH:
	      if (state.wrap && state.flags) {
	        //=== NEEDBITS(32);
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (hold !== (state.total & 0xffffffff)) {
	          strm.msg = 'incorrect length check';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        //Tracev((stderr, "inflate:   length matches trailer\n"));
	      }
	      state.mode = DONE;
	      /* falls through */
	    case DONE:
	      ret = Z_STREAM_END;
	      break inf_leave;
	    case BAD:
	      ret = Z_DATA_ERROR;
	      break inf_leave;
	    case MEM:
	      return Z_MEM_ERROR;
	    case SYNC:
	      /* falls through */
	    default:
	      return Z_STREAM_ERROR;
	    }
	  }

	  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

	  /*
	     Return from inflate(), updating the total counts and the check value.
	     If there was no progress during the inflate() call, return a buffer
	     error.  Call updatewindow() to create and/or update the window state.
	     Note: a memory error from inflate() is non-recoverable.
	   */

	  //--- RESTORE() ---
	  strm.next_out = put;
	  strm.avail_out = left;
	  strm.next_in = next;
	  strm.avail_in = have;
	  state.hold = hold;
	  state.bits = bits;
	  //---

	  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
	                      (state.mode < CHECK || flush !== Z_FINISH))) {
	    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
	      state.mode = MEM;
	      return Z_MEM_ERROR;
	    }
	  }
	  _in -= strm.avail_in;
	  _out -= strm.avail_out;
	  strm.total_in += _in;
	  strm.total_out += _out;
	  state.total += _out;
	  if (state.wrap && _out) {
	    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
	      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
	  }
	  strm.data_type = state.bits + (state.last ? 64 : 0) +
	                    (state.mode === TYPE ? 128 : 0) +
	                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
	  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
	    ret = Z_BUF_ERROR;
	  }
	  return ret;
	}

	function inflateEnd(strm) {

	  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
	    return Z_STREAM_ERROR;
	  }

	  var state = strm.state;
	  if (state.window) {
	    state.window = null;
	  }
	  strm.state = null;
	  return Z_OK;
	}

	function inflateGetHeader(strm, head) {
	  var state;

	  /* check state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

	  /* save header structure */
	  state.head = head;
	  head.done = false;
	  return Z_OK;
	}

	function inflateSetDictionary(strm, dictionary) {
	  var dictLength = dictionary.length;

	  var state;
	  var dictid;
	  var ret;

	  /* check state */
	  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
	  state = strm.state;

	  if (state.wrap !== 0 && state.mode !== DICT) {
	    return Z_STREAM_ERROR;
	  }

	  /* check for correct dictionary identifier */
	  if (state.mode === DICT) {
	    dictid = 1; /* adler32(0, null, 0)*/
	    /* dictid = adler32(dictid, dictionary, dictLength); */
	    dictid = adler32(dictid, dictionary, dictLength, 0);
	    if (dictid !== state.check) {
	      return Z_DATA_ERROR;
	    }
	  }
	  /* copy dictionary to window using updatewindow(), which will amend the
	   existing dictionary if appropriate */
	  ret = updatewindow(strm, dictionary, dictLength, dictLength);
	  if (ret) {
	    state.mode = MEM;
	    return Z_MEM_ERROR;
	  }
	  state.havedict = 1;
	  // Tracev((stderr, "inflate:   dictionary set\n"));
	  return Z_OK;
	}

	exports.inflateReset = inflateReset;
	exports.inflateReset2 = inflateReset2;
	exports.inflateResetKeep = inflateResetKeep;
	exports.inflateInit = inflateInit;
	exports.inflateInit2 = inflateInit2;
	exports.inflate = inflate;
	exports.inflateEnd = inflateEnd;
	exports.inflateGetHeader = inflateGetHeader;
	exports.inflateSetDictionary = inflateSetDictionary;
	exports.inflateInfo = 'pako inflate (from Nodeca project)';

	/* Not implemented
	exports.inflateCopy = inflateCopy;
	exports.inflateGetDictionary = inflateGetDictionary;
	exports.inflateMark = inflateMark;
	exports.inflatePrime = inflatePrime;
	exports.inflateSync = inflateSync;
	exports.inflateSyncPoint = inflateSyncPoint;
	exports.inflateUndermine = inflateUndermine;
	*/


/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	// See state defs from inflate.js
	var BAD = 30;       /* got a data error -- remain here until reset */
	var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

	/*
	   Decode literal, length, and distance codes and write out the resulting
	   literal and match bytes until either not enough input or output is
	   available, an end-of-block is encountered, or a data error is encountered.
	   When large enough input and output buffers are supplied to inflate(), for
	   example, a 16K input buffer and a 64K output buffer, more than 95% of the
	   inflate execution time is spent in this routine.

	   Entry assumptions:

	        state.mode === LEN
	        strm.avail_in >= 6
	        strm.avail_out >= 258
	        start >= strm.avail_out
	        state.bits < 8

	   On return, state.mode is one of:

	        LEN -- ran out of enough output space or enough available input
	        TYPE -- reached end of block code, inflate() to interpret next block
	        BAD -- error in block data

	   Notes:

	    - The maximum input bits used by a length/distance pair is 15 bits for the
	      length code, 5 bits for the length extra, 15 bits for the distance code,
	      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
	      Therefore if strm.avail_in >= 6, then there is enough input to avoid
	      checking for available input while decoding.

	    - The maximum bytes that a single length/distance pair can output is 258
	      bytes, which is the maximum length that can be coded.  inflate_fast()
	      requires strm.avail_out >= 258 for each loop to avoid checking for
	      output space.
	 */
	module.exports = function inflate_fast(strm, start) {
	  var state;
	  var _in;                    /* local strm.input */
	  var last;                   /* have enough input while in < last */
	  var _out;                   /* local strm.output */
	  var beg;                    /* inflate()'s initial strm.output */
	  var end;                    /* while out < end, enough space available */
	//#ifdef INFLATE_STRICT
	  var dmax;                   /* maximum distance from zlib header */
	//#endif
	  var wsize;                  /* window size or zero if not using window */
	  var whave;                  /* valid bytes in the window */
	  var wnext;                  /* window write index */
	  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
	  var s_window;               /* allocated sliding window, if wsize != 0 */
	  var hold;                   /* local strm.hold */
	  var bits;                   /* local strm.bits */
	  var lcode;                  /* local strm.lencode */
	  var dcode;                  /* local strm.distcode */
	  var lmask;                  /* mask for first level of length codes */
	  var dmask;                  /* mask for first level of distance codes */
	  var here;                   /* retrieved table entry */
	  var op;                     /* code bits, operation, extra bits, or */
	                              /*  window position, window bytes to copy */
	  var len;                    /* match length, unused bytes */
	  var dist;                   /* match distance */
	  var from;                   /* where to copy match from */
	  var from_source;


	  var input, output; // JS specific, because we have no pointers

	  /* copy state to local variables */
	  state = strm.state;
	  //here = state.here;
	  _in = strm.next_in;
	  input = strm.input;
	  last = _in + (strm.avail_in - 5);
	  _out = strm.next_out;
	  output = strm.output;
	  beg = _out - (start - strm.avail_out);
	  end = _out + (strm.avail_out - 257);
	//#ifdef INFLATE_STRICT
	  dmax = state.dmax;
	//#endif
	  wsize = state.wsize;
	  whave = state.whave;
	  wnext = state.wnext;
	  s_window = state.window;
	  hold = state.hold;
	  bits = state.bits;
	  lcode = state.lencode;
	  dcode = state.distcode;
	  lmask = (1 << state.lenbits) - 1;
	  dmask = (1 << state.distbits) - 1;


	  /* decode literals and length/distances until end-of-block or not enough
	     input data or output space */

	  top:
	  do {
	    if (bits < 15) {
	      hold += input[_in++] << bits;
	      bits += 8;
	      hold += input[_in++] << bits;
	      bits += 8;
	    }

	    here = lcode[hold & lmask];

	    dolen:
	    for (;;) { // Goto emulation
	      op = here >>> 24/*here.bits*/;
	      hold >>>= op;
	      bits -= op;
	      op = (here >>> 16) & 0xff/*here.op*/;
	      if (op === 0) {                          /* literal */
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        output[_out++] = here & 0xffff/*here.val*/;
	      }
	      else if (op & 16) {                     /* length base */
	        len = here & 0xffff/*here.val*/;
	        op &= 15;                           /* number of extra bits */
	        if (op) {
	          if (bits < op) {
	            hold += input[_in++] << bits;
	            bits += 8;
	          }
	          len += hold & ((1 << op) - 1);
	          hold >>>= op;
	          bits -= op;
	        }
	        //Tracevv((stderr, "inflate:         length %u\n", len));
	        if (bits < 15) {
	          hold += input[_in++] << bits;
	          bits += 8;
	          hold += input[_in++] << bits;
	          bits += 8;
	        }
	        here = dcode[hold & dmask];

	        dodist:
	        for (;;) { // goto emulation
	          op = here >>> 24/*here.bits*/;
	          hold >>>= op;
	          bits -= op;
	          op = (here >>> 16) & 0xff/*here.op*/;

	          if (op & 16) {                      /* distance base */
	            dist = here & 0xffff/*here.val*/;
	            op &= 15;                       /* number of extra bits */
	            if (bits < op) {
	              hold += input[_in++] << bits;
	              bits += 8;
	              if (bits < op) {
	                hold += input[_in++] << bits;
	                bits += 8;
	              }
	            }
	            dist += hold & ((1 << op) - 1);
	//#ifdef INFLATE_STRICT
	            if (dist > dmax) {
	              strm.msg = 'invalid distance too far back';
	              state.mode = BAD;
	              break top;
	            }
	//#endif
	            hold >>>= op;
	            bits -= op;
	            //Tracevv((stderr, "inflate:         distance %u\n", dist));
	            op = _out - beg;                /* max distance in output */
	            if (dist > op) {                /* see if copy from window */
	              op = dist - op;               /* distance back in window */
	              if (op > whave) {
	                if (state.sane) {
	                  strm.msg = 'invalid distance too far back';
	                  state.mode = BAD;
	                  break top;
	                }

	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//                if (len <= op - whave) {
	//                  do {
	//                    output[_out++] = 0;
	//                  } while (--len);
	//                  continue top;
	//                }
	//                len -= op - whave;
	//                do {
	//                  output[_out++] = 0;
	//                } while (--op > whave);
	//                if (op === 0) {
	//                  from = _out - dist;
	//                  do {
	//                    output[_out++] = output[from++];
	//                  } while (--len);
	//                  continue top;
	//                }
	//#endif
	              }
	              from = 0; // window index
	              from_source = s_window;
	              if (wnext === 0) {           /* very common case */
	                from += wsize - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              else if (wnext < op) {      /* wrap around window */
	                from += wsize + wnext - op;
	                op -= wnext;
	                if (op < len) {         /* some from end of window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = 0;
	                  if (wnext < len) {  /* some from start of window */
	                    op = wnext;
	                    len -= op;
	                    do {
	                      output[_out++] = s_window[from++];
	                    } while (--op);
	                    from = _out - dist;      /* rest from output */
	                    from_source = output;
	                  }
	                }
	              }
	              else {                      /* contiguous in window */
	                from += wnext - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              while (len > 2) {
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                len -= 3;
	              }
	              if (len) {
	                output[_out++] = from_source[from++];
	                if (len > 1) {
	                  output[_out++] = from_source[from++];
	                }
	              }
	            }
	            else {
	              from = _out - dist;          /* copy direct from output */
	              do {                        /* minimum length is three */
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                len -= 3;
	              } while (len > 2);
	              if (len) {
	                output[_out++] = output[from++];
	                if (len > 1) {
	                  output[_out++] = output[from++];
	                }
	              }
	            }
	          }
	          else if ((op & 64) === 0) {          /* 2nd level distance code */
	            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	            continue dodist;
	          }
	          else {
	            strm.msg = 'invalid distance code';
	            state.mode = BAD;
	            break top;
	          }

	          break; // need to emulate goto via "continue"
	        }
	      }
	      else if ((op & 64) === 0) {              /* 2nd level length code */
	        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	        continue dolen;
	      }
	      else if (op & 32) {                     /* end-of-block */
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.mode = TYPE;
	        break top;
	      }
	      else {
	        strm.msg = 'invalid literal/length code';
	        state.mode = BAD;
	        break top;
	      }

	      break; // need to emulate goto via "continue"
	    }
	  } while (_in < last && _out < end);

	  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
	  len = bits >> 3;
	  _in -= len;
	  bits -= len << 3;
	  hold &= (1 << bits) - 1;

	  /* update state and return */
	  strm.next_in = _in;
	  strm.next_out = _out;
	  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
	  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
	  state.hold = hold;
	  state.bits = bits;
	  return;
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var utils = __webpack_require__(24);

	var MAXBITS = 15;
	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	var lbase = [ /* Length codes 257..285 base */
	  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
	  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
	];

	var lext = [ /* Length codes 257..285 extra */
	  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
	  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
	];

	var dbase = [ /* Distance codes 0..29 base */
	  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
	  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
	  8193, 12289, 16385, 24577, 0, 0
	];

	var dext = [ /* Distance codes 0..29 extra */
	  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
	  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
	  28, 28, 29, 29, 64, 64
	];

	module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
	{
	  var bits = opts.bits;
	      //here = opts.here; /* table entry for duplication */

	  var len = 0;               /* a code's length in bits */
	  var sym = 0;               /* index of code symbols */
	  var min = 0, max = 0;          /* minimum and maximum code lengths */
	  var root = 0;              /* number of index bits for root table */
	  var curr = 0;              /* number of index bits for current table */
	  var drop = 0;              /* code bits to drop for sub-table */
	  var left = 0;                   /* number of prefix codes available */
	  var used = 0;              /* code entries in table used */
	  var huff = 0;              /* Huffman code */
	  var incr;              /* for incrementing code, index */
	  var fill;              /* index for replicating entries */
	  var low;               /* low bits for current root entry */
	  var mask;              /* mask for low root bits */
	  var next;             /* next available space in table */
	  var base = null;     /* base value table to use */
	  var base_index = 0;
	//  var shoextra;    /* extra bits table to use */
	  var end;                    /* use base and extra for symbol > end */
	  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
	  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
	  var extra = null;
	  var extra_index = 0;

	  var here_bits, here_op, here_val;

	  /*
	   Process a set of code lengths to create a canonical Huffman code.  The
	   code lengths are lens[0..codes-1].  Each length corresponds to the
	   symbols 0..codes-1.  The Huffman code is generated by first sorting the
	   symbols by length from short to long, and retaining the symbol order
	   for codes with equal lengths.  Then the code starts with all zero bits
	   for the first code of the shortest length, and the codes are integer
	   increments for the same length, and zeros are appended as the length
	   increases.  For the deflate format, these bits are stored backwards
	   from their more natural integer increment ordering, and so when the
	   decoding tables are built in the large loop below, the integer codes
	   are incremented backwards.

	   This routine assumes, but does not check, that all of the entries in
	   lens[] are in the range 0..MAXBITS.  The caller must assure this.
	   1..MAXBITS is interpreted as that code length.  zero means that that
	   symbol does not occur in this code.

	   The codes are sorted by computing a count of codes for each length,
	   creating from that a table of starting indices for each length in the
	   sorted table, and then entering the symbols in order in the sorted
	   table.  The sorted table is work[], with that space being provided by
	   the caller.

	   The length counts are used for other purposes as well, i.e. finding
	   the minimum and maximum length codes, determining if there are any
	   codes at all, checking for a valid set of lengths, and looking ahead
	   at length counts to determine sub-table sizes when building the
	   decoding tables.
	   */

	  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
	  for (len = 0; len <= MAXBITS; len++) {
	    count[len] = 0;
	  }
	  for (sym = 0; sym < codes; sym++) {
	    count[lens[lens_index + sym]]++;
	  }

	  /* bound code lengths, force root to be within code lengths */
	  root = bits;
	  for (max = MAXBITS; max >= 1; max--) {
	    if (count[max] !== 0) { break; }
	  }
	  if (root > max) {
	    root = max;
	  }
	  if (max === 0) {                     /* no symbols to code at all */
	    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
	    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
	    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;


	    //table.op[opts.table_index] = 64;
	    //table.bits[opts.table_index] = 1;
	    //table.val[opts.table_index++] = 0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;

	    opts.bits = 1;
	    return 0;     /* no symbols, but wait for decoding to report error */
	  }
	  for (min = 1; min < max; min++) {
	    if (count[min] !== 0) { break; }
	  }
	  if (root < min) {
	    root = min;
	  }

	  /* check for an over-subscribed or incomplete set of lengths */
	  left = 1;
	  for (len = 1; len <= MAXBITS; len++) {
	    left <<= 1;
	    left -= count[len];
	    if (left < 0) {
	      return -1;
	    }        /* over-subscribed */
	  }
	  if (left > 0 && (type === CODES || max !== 1)) {
	    return -1;                      /* incomplete set */
	  }

	  /* generate offsets into symbol table for each length for sorting */
	  offs[1] = 0;
	  for (len = 1; len < MAXBITS; len++) {
	    offs[len + 1] = offs[len] + count[len];
	  }

	  /* sort symbols by length, by symbol order within each length */
	  for (sym = 0; sym < codes; sym++) {
	    if (lens[lens_index + sym] !== 0) {
	      work[offs[lens[lens_index + sym]]++] = sym;
	    }
	  }

	  /*
	   Create and fill in decoding tables.  In this loop, the table being
	   filled is at next and has curr index bits.  The code being used is huff
	   with length len.  That code is converted to an index by dropping drop
	   bits off of the bottom.  For codes where len is less than drop + curr,
	   those top drop + curr - len bits are incremented through all values to
	   fill the table with replicated entries.

	   root is the number of index bits for the root table.  When len exceeds
	   root, sub-tables are created pointed to by the root entry with an index
	   of the low root bits of huff.  This is saved in low to check for when a
	   new sub-table should be started.  drop is zero when the root table is
	   being filled, and drop is root when sub-tables are being filled.

	   When a new sub-table is needed, it is necessary to look ahead in the
	   code lengths to determine what size sub-table is needed.  The length
	   counts are used for this, and so count[] is decremented as codes are
	   entered in the tables.

	   used keeps track of how many table entries have been allocated from the
	   provided *table space.  It is checked for LENS and DIST tables against
	   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
	   the initial root table size constants.  See the comments in inftrees.h
	   for more information.

	   sym increments through all symbols, and the loop terminates when
	   all codes of length max, i.e. all codes, have been processed.  This
	   routine permits incomplete codes, so another loop after this one fills
	   in the rest of the decoding tables with invalid code markers.
	   */

	  /* set up for code type */
	  // poor man optimization - use if-else instead of switch,
	  // to avoid deopts in old v8
	  if (type === CODES) {
	    base = extra = work;    /* dummy value--not used */
	    end = 19;

	  } else if (type === LENS) {
	    base = lbase;
	    base_index -= 257;
	    extra = lext;
	    extra_index -= 257;
	    end = 256;

	  } else {                    /* DISTS */
	    base = dbase;
	    extra = dext;
	    end = -1;
	  }

	  /* initialize opts for loop */
	  huff = 0;                   /* starting code */
	  sym = 0;                    /* starting code symbol */
	  len = min;                  /* starting code length */
	  next = table_index;              /* current table to fill in */
	  curr = root;                /* current table index bits */
	  drop = 0;                   /* current bits to drop from code for index */
	  low = -1;                   /* trigger new sub-table when len > root */
	  used = 1 << root;          /* use root table entries */
	  mask = used - 1;            /* mask for comparing low */

	  /* check available table space */
	  if ((type === LENS && used > ENOUGH_LENS) ||
	    (type === DISTS && used > ENOUGH_DISTS)) {
	    return 1;
	  }

	  var i = 0;
	  /* process all codes and make table entries */
	  for (;;) {
	    i++;
	    /* create table entry */
	    here_bits = len - drop;
	    if (work[sym] < end) {
	      here_op = 0;
	      here_val = work[sym];
	    }
	    else if (work[sym] > end) {
	      here_op = extra[extra_index + work[sym]];
	      here_val = base[base_index + work[sym]];
	    }
	    else {
	      here_op = 32 + 64;         /* end of block */
	      here_val = 0;
	    }

	    /* replicate for those indices with low len bits equal to huff */
	    incr = 1 << (len - drop);
	    fill = 1 << curr;
	    min = fill;                 /* save offset to next table */
	    do {
	      fill -= incr;
	      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
	    } while (fill !== 0);

	    /* backwards increment the len-bit code huff */
	    incr = 1 << (len - 1);
	    while (huff & incr) {
	      incr >>= 1;
	    }
	    if (incr !== 0) {
	      huff &= incr - 1;
	      huff += incr;
	    } else {
	      huff = 0;
	    }

	    /* go to next symbol, update count, len */
	    sym++;
	    if (--count[len] === 0) {
	      if (len === max) { break; }
	      len = lens[lens_index + work[sym]];
	    }

	    /* create new sub-table if needed */
	    if (len > root && (huff & mask) !== low) {
	      /* if first time, transition to sub-tables */
	      if (drop === 0) {
	        drop = root;
	      }

	      /* increment past last table */
	      next += min;            /* here min is 1 << curr */

	      /* determine length of next table */
	      curr = len - drop;
	      left = 1 << curr;
	      while (curr + drop < max) {
	        left -= count[curr + drop];
	        if (left <= 0) { break; }
	        curr++;
	        left <<= 1;
	      }

	      /* check for enough space */
	      used += 1 << curr;
	      if ((type === LENS && used > ENOUGH_LENS) ||
	        (type === DISTS && used > ENOUGH_DISTS)) {
	        return 1;
	      }

	      /* point entry in root table to sub-table */
	      low = huff & mask;
	      /*table.op[low] = curr;
	      table.bits[low] = root;
	      table.val[low] = next - opts.table_index;*/
	      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
	    }
	  }

	  /* fill in remaining table entry if code is incomplete (guaranteed to have
	   at most one remaining entry, since if the code is incomplete, the
	   maximum code length that was allowed to get this far is one bit) */
	  if (huff !== 0) {
	    //table.op[next + huff] = 64;            /* invalid code marker */
	    //table.bits[next + huff] = len - drop;
	    //table.val[next + huff] = 0;
	    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
	  }

	  /* set return parameters */
	  //opts.table_index += used;
	  opts.bits = root;
	  return 0;
	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';


	module.exports = {

	  /* Allowed flush values; see deflate() and inflate() below for details */
	  Z_NO_FLUSH:         0,
	  Z_PARTIAL_FLUSH:    1,
	  Z_SYNC_FLUSH:       2,
	  Z_FULL_FLUSH:       3,
	  Z_FINISH:           4,
	  Z_BLOCK:            5,
	  Z_TREES:            6,

	  /* Return codes for the compression/decompression functions. Negative values
	  * are errors, positive values are used for special but normal events.
	  */
	  Z_OK:               0,
	  Z_STREAM_END:       1,
	  Z_NEED_DICT:        2,
	  Z_ERRNO:           -1,
	  Z_STREAM_ERROR:    -2,
	  Z_DATA_ERROR:      -3,
	  //Z_MEM_ERROR:     -4,
	  Z_BUF_ERROR:       -5,
	  //Z_VERSION_ERROR: -6,

	  /* compression levels */
	  Z_NO_COMPRESSION:         0,
	  Z_BEST_SPEED:             1,
	  Z_BEST_COMPRESSION:       9,
	  Z_DEFAULT_COMPRESSION:   -1,


	  Z_FILTERED:               1,
	  Z_HUFFMAN_ONLY:           2,
	  Z_RLE:                    3,
	  Z_FIXED:                  4,
	  Z_DEFAULT_STRATEGY:       0,

	  /* Possible values of the data_type field (though see inflate()) */
	  Z_BINARY:                 0,
	  Z_TEXT:                   1,
	  //Z_ASCII:                1, // = Z_TEXT (deprecated)
	  Z_UNKNOWN:                2,

	  /* The deflate compression method */
	  Z_DEFLATED:               8
	  //Z_NULL:                 null // Use -1 or null inline, depending on var type
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';


	function GZheader() {
	  /* true if compressed data believed to be text */
	  this.text       = 0;
	  /* modification time */
	  this.time       = 0;
	  /* extra flags (not used when writing a gzip file) */
	  this.xflags     = 0;
	  /* operating system */
	  this.os         = 0;
	  /* pointer to extra field or Z_NULL if none */
	  this.extra      = null;
	  /* extra field length (valid if extra != Z_NULL) */
	  this.extra_len  = 0; // Actually, we don't need it in JS,
	                       // but leave for few code modifications

	  //
	  // Setup limits is not necessary because in js we should not preallocate memory
	  // for inflate use constant limit in 65536 bytes
	  //

	  /* space at extra (only when reading header) */
	  // this.extra_max  = 0;
	  /* pointer to zero-terminated file name or Z_NULL */
	  this.name       = '';
	  /* space at name (only when reading header) */
	  // this.name_max   = 0;
	  /* pointer to zero-terminated comment or Z_NULL */
	  this.comment    = '';
	  /* space at comment (only when reading header) */
	  // this.comm_max   = 0;
	  /* true if there was or will be a header crc */
	  this.hcrc       = 0;
	  /* true when done reading gzip header (not used when writing a gzip file) */
	  this.done       = false;
	}

	module.exports = GZheader;


/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getEndianness = getEndianness;
	exports.swapBytes = swapBytes;
	function getEndianness() {
	  var a = new ArrayBuffer(4);
	  var b = new Uint8Array(a);
	  var c = new Uint32Array(a);
	  b[0] = 0xa1;
	  b[1] = 0xb2;
	  b[2] = 0xc3;
	  b[3] = 0xd4;
	  if (c[0] === 0xd4c3b2a1) return 'LittleEndian';
	  if (c[0] === 0xa1b2c3d4) return 'BigEndian';
	  return null;
	}

	var ENDIANNESS = exports.ENDIANNESS = getEndianness();

	function swapBytes(buffer, wordSize) {
	  if (wordSize < 2) {
	    return;
	  }

	  var bytes = new Int8Array(buffer);
	  var size = bytes.length;
	  var tempBuffer = [];

	  for (var i = 0; i < size; i += wordSize) {
	    for (var j = 0; j < wordSize; j++) {
	      tempBuffer.push(bytes[i + j]);
	    }
	    for (var _j = 0; _j < wordSize; _j++) {
	      bytes[i + _j] = tempBuffer.pop();
	    }
	  }
	}

	exports.default = {
	  ENDIANNESS: ENDIANNESS,
	  getEndianness: getEndianness,
	  swapBytes: swapBytes
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _PointSet = __webpack_require__(41);

	var _PointSet2 = _interopRequireDefault(_PointSet);

	var _DataArray = __webpack_require__(44);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	var STATIC = exports.STATIC = {};

	// ----------------------------------------------------------------------------
	// vtkPolyData methods
	// ----------------------------------------------------------------------------

	function vtkPolyData(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkPolyData');

	  // Concreate Points
	  if (model.vtkPolyData && model.vtkPolyData.Points) {
	    model.points = _DataArray2.default.newInstance(model.vtkPolyData.Points);
	  }

	  // build empty cell arrays and set methods
	  ['Verts', 'Lines', 'Polys', 'Strips'].forEach(function (type) {
	    var lowerType = type.toLowerCase();
	    // Don't create array if already available
	    if (model[lowerType]) {
	      return;
	    }
	    if (model.vtkPolyData && model.vtkPolyData[type]) {
	      model[lowerType] = _DataArray2.default.newInstance(model.vtkPolyData[type]);
	    } else {
	      model[lowerType] = _DataArray2.default.newInstance({ empty: true });
	    }
	  });

	  /* eslint-disable no-use-before-define */
	  publicAPI.shallowCopy = function () {
	    var modelInstance = {};
	    var fieldList = ['pointData', 'cellData', 'fieldData', // Dataset
	    'points', // PointSet
	    'verts', 'lines', 'polys', 'strips'];

	    // Start to shallow copy each piece
	    fieldList.forEach(function (field) {
	      modelInstance[field] = model[field].shallowCopy();
	    });

	    // Create instance
	    var newPoly = newInstance(modelInstance);

	    // Reset mtime to original value
	    newPoly.set({ mtime: model.mtime });

	    return newPoly;
	  };
	  /* eslint-enable no-use-before-define */
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  PolyData: null,
	  verts: null,
	  lines: null,
	  polys: null,
	  strips: null
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

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _DataSet = __webpack_require__(42);

	var _DataSet2 = _interopRequireDefault(_DataSet);

	var _DataArray = __webpack_require__(44);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	var STATIC = exports.STATIC = {};

	// ----------------------------------------------------------------------------
	// vtkPointSet methods
	// ----------------------------------------------------------------------------

	function vtkPointSet(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkPointSet');

	  // Create empty points
	  if (!model.points) {
	    model.points = _DataArray2.default.newInstance({ empty: true });
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
	  points: null
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

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _BoundingBox = __webpack_require__(15);

	var _BoundingBox2 = _interopRequireDefault(_BoundingBox);

	var _DataSetAttributes = __webpack_require__(43);

	var _DataSetAttributes2 = _interopRequireDefault(_DataSetAttributes);

	var _Math = __webpack_require__(21);

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
	  return _Math2.default.createUninitializedBounds();
	}

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	var STATIC = exports.STATIC = {
	  getBounds: getBounds
	};

	// ----------------------------------------------------------------------------
	// vtkDataSet methods
	// ----------------------------------------------------------------------------

	function vtkDataSet(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkDataSet');

	  // Expose dataset
	  var dataset = model.type ? model[model.type] || {} : {};
	  publicAPI.dataset = dataset;

	  if (!model.pointData) {
	    model.pointData = _DataSetAttributes2.default.newInstance({ dataArrays: dataset.PointData });
	  }
	  if (!model.cellData) {
	    model.cellData = _DataSetAttributes2.default.newInstance({ dataArrays: dataset.CellData });
	  }
	  if (!model.fieldData) {
	    model.fieldData = _DataSetAttributes2.default.newInstance({ dataArrays: dataset.FieldData });
	  }
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);
	  macro.get(publicAPI, model, ['pointData', 'cellData', 'fieldData']);

	  // Object specific methods
	  vtkDataSet(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkDataSet');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _DataArray = __webpack_require__(44);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	var _vtk = __webpack_require__(13);

	var _vtk2 = _interopRequireDefault(_vtk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkDataSetAttributes methods
	// ----------------------------------------------------------------------------

	/* eslint-disable no-unused-vars */
	// Needed so the VTK factory is filled with them
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
	    var array = model.arrays[model.activeNormals];
	    if (array) {
	      return array;
	    }
	    return null;
	  };

	  publicAPI.getTCoords = function () {
	    var array = model.arrays[model.activeTCoords];
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
	    publicAPI.modified();
	  };

	  publicAPI.removeArray = function (name) {
	    var array = model.arrays[name];
	    delete model.arrays[name];
	    publicAPI.modified();
	    return array;
	  };

	  publicAPI.getArrayNames = function () {
	    return Object.keys(model.arrays);
	  };
	  publicAPI.getAbstractArray = function (name) {
	    return model.arrays[name];
	  };
	  publicAPI.getArray = function (name) {
	    return model.arrays[name];
	  };

	  // Process dataArrays if any
	  if (model.dataArrays && Object.keys(model.dataArrays).length) {
	    Object.keys(model.dataArrays).forEach(function (name) {
	      if (!model.dataArrays[name].ref && model.dataArrays[name].type === 'vtkDataArray') {
	        publicAPI.addArray(_DataArray2.default.newInstance(model.dataArrays[name]));
	      }
	    });
	  }

	  /* eslint-disable no-use-before-define */
	  publicAPI.shallowCopy = function () {
	    var newIntsanceModel = Object.assign({}, model, { arrays: null, dataArrays: null });
	    var copyInst = newInstance(newIntsanceModel);

	    // Shallow copy each array
	    publicAPI.getArrayNames().forEach(function (name) {
	      copyInst.addArray(publicAPI.getArray(name).shallowCopy());
	    });

	    // Reset mtime to original value
	    copyInst.set({ mtime: model.mtime });

	    return copyInst;
	  };
	  /* eslint-enable no-use-before-define */
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	// import vtkStringArray from '../../../Common/Core/vtkStringArray';

	var DEFAULT_VALUES = {
	  activeScalars: '',
	  activeVectors: '',
	  activeTensors: '',
	  activeNormals: '',
	  activeTCoords: '',
	  activeGlobalIds: '',
	  activePedigreeIds: '',
	  arrays: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Object methods
	  macro.obj(publicAPI, model);
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(45);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/* global window */

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

	function insureRangeSize(rangeArray) {
	  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

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

	function getDataType(typedArray) {
	  return Object.prototype.toString.call(typedArray).split(' ')[1].slice(0, -1);
	}

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	var STATIC = exports.STATIC = {
	  computeRange: computeRange,
	  extractCellSizes: extractCellSizes,
	  getNumberOfCells: getNumberOfCells,
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
	      dataChange();
	    }
	  };

	  publicAPI.getData = function () {
	    return model.values;
	  };

	  publicAPI.getRange = function () {
	    var componentIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

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
	    var idx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
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

	  publicAPI.setData = function (typedArray, numberOfComponents) {
	    model.values = typedArray;
	    model.size = typedArray.length;
	    model.dataType = getDataType(typedArray);
	    if (numberOfComponents) {
	      model.tuple = numberOfComponents;
	    }
	    if (model.size % model.tuple !== 0) {
	      model.tuple = 1;
	    }
	    dataChange();
	  };

	  /* eslint-disable no-use-before-define */
	  publicAPI.shallowCopy = function () {
	    return newInstance(Object.assign({}, model));
	  };
	  /* eslint-enable no-use-before-define */
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  type: 'vtkDataArray',
	  name: '',
	  tuple: 1,
	  size: 0,
	  dataType: _Constants.VTK_DEFAULT_DATATYPE,
	  values: null,
	  ranges: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  if (model.values) {
	    model.size = model.values.length;
	    model.dataType = getDataType(model.values);
	  }

	  if (!model.empty && (!model.values || !model.size) || model.type !== 'vtkDataArray') {
	    throw Error('Can not create vtkDataArray object without: size > 0, values or type = vtkDataArray');
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

	var newInstance = exports.newInstance = macro.newInstance(extend, 'vtkDataArray');

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, STATIC);

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var VTK_BYTE_SIZE = exports.VTK_BYTE_SIZE = {
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

	var VTK_DATATYPES = exports.VTK_DATATYPES = {
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

	var VTK_DEFAULT_DATATYPE = exports.VTK_DEFAULT_DATATYPE = 'Float32Array';

	exports.default = {
	  VTK_DEFAULT_DATATYPE: VTK_DEFAULT_DATATYPE,
	  VTK_BYTE_SIZE: VTK_BYTE_SIZE,
	  VTK_DATATYPES: VTK_DATATYPES
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var LOCATIONS = exports.LOCATIONS = ['PointData', 'CellData', 'FieldData'];

	var TYPE_BYTES = exports.TYPE_BYTES = {
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

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _CoincidentTopologyHelper = __webpack_require__(48);

	var CoincidentTopologyHelper = _interopRequireWildcard(_CoincidentTopologyHelper);

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Static = __webpack_require__(49);

	var _Static2 = _interopRequireDefault(_Static);

	var _LookupTable = __webpack_require__(50);

	var _LookupTable2 = _interopRequireDefault(_LookupTable);

	var _Math = __webpack_require__(21);

	var _Math2 = _interopRequireDefault(_Math);

	var _Constants = __webpack_require__(53);

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
	    if (!model.static) {
	      model.inputData[0] = null;
	    }
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
	    return macro.enumToString(_Constants.VTK_COLOR_MODE, model.colorMode);
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
	    return macro.enumToString(_Constants.VTK_SCALAR_MODE, model.scalarMode);
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
	    if (!input) {
	      return null;
	    }

	    var scalars = null;

	    // get and scalar data according to scalar mode
	    if (scalarMode === _Constants.VTK_SCALAR_MODE.DEFAULT) {
	      scalars = input.getPointData().getScalars();
	      if (!scalars) {
	        scalars = input.getCellData().getScalars();
	      }
	    } else if (scalarMode === _Constants.VTK_SCALAR_MODE.USE_POINT_DATA) {
	      scalars = input.getPointData().getScalars();
	    } else if (scalarMode === _Constants.VTK_SCALAR_MODE.USE_CELL_DATA) {
	      scalars = input.getCellData().getScalars();
	    } else if (scalarMode === _Constants.VTK_SCALAR_MODE.USE_POINT_FIELD_DATA) {
	      var pd = input.getPointData();
	      if (arrayAccessMode === _Constants.VTK_GET_ARRAY.BY_ID) {
	        scalars = pd.getAbstractArray(arrayId);
	      } else {
	        scalars = pd.getAbstractArray(arrayName);
	      }
	    } else if (scalarMode === _Constants.VTK_SCALAR_MODE.USE_CELL_FIELD_DATA) {
	      var cd = input.getCellData();
	      if (arrayAccessMode === _Constants.VTK_GET_ARRAY.BY_ID) {
	        scalars = cd.getAbstractArray(arrayId);
	      } else {
	        scalars = cd.getAbstractArray(arrayName);
	      }
	    } else if (scalarMode === _Constants.VTK_SCALAR_MODE.USE_FIELD_DATA) {
	      var fd = input.getFieldData();
	      if (arrayAccessMode === _Constants.VTK_GET_ARRAY.BY_ID) {
	        scalars = fd.getAbstractArray(arrayId);
	      } else {
	        scalars = fd.getAbstractArray(arrayName);
	      }
	    }

	    return scalars;
	  };

	  publicAPI.mapScalars = function (input, alpha) {
	    var scalars = publicAPI.getAbstractScalars(input, model.scalarMode, model.arrayAccessMode, model.arrayId, model.colorByArrayName);

	    if (scalars === null) {
	      model.colorMapColors = null;
	      return;
	    }
	    var lut = publicAPI.getLookupTable();
	    if (lut) {
	      // Ensure that the lookup table is built
	      lut.build();
	      model.colorMapColors = lut.mapScalars(scalars, model.colorMode, 0);
	    }
	  };

	  publicAPI.setScalarMaterialModeToDefault = function () {
	    return publicAPI.setScalarMaterialMode(_Constants.VTK_MATERIALMODE.DEFAULT);
	  };
	  publicAPI.setScalarMaterialModeToAmbient = function () {
	    return publicAPI.setScalarMaterialMode(_Constants.VTK_MATERIALMODE.AMBIENT);
	  };
	  publicAPI.setScalarMaterialModeToDiffuse = function () {
	    return publicAPI.setScalarMaterialMode(_Constants.VTK_MATERIALMODE.DIFFUSE);
	  };
	  publicAPI.setScalarMaterialModeToAmbientAndDiffuse = function () {
	    return publicAPI.setScalarMaterialMode(_Constants.VTK_MATERIALMODE.AMBIENT_AND_DIFFUSE);
	  };
	  publicAPI.getScalarMaterialModeAsString = function () {
	    return macro.enumToString(_Constants.VTK_MATERIALMODE, model.scalarMaterialMode);
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
	    console.log('vtkMapper::canUseTextureMapForColoring - NOT IMPLEMENTED');
	    return false;
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
	  publicAPI.getColorModeAsString = notImplemented('getColorModeAsString');
	  publicAPI.getScalarModeAsString = notImplemented('GetScalarModeAsString');
	  publicAPI.getScalarMaterialModeAsString = notImplemented('GetScalarMaterialModeAsString');
	  publicAPI.scalarToTextureCoordinate = notImplemented('ScalarToTextureCoordinate');
	  publicAPI.createColorTextureCoordinates = notImplemented('CreateColorTextureCoordinates');
	  publicAPI.mapScalarsToTexture = notImplemented('MapScalarsToTexture');
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
	  invertibleScalars: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Build VTK API
	  macro.obj(publicAPI, model); // FIXME parent is not vtkObject
	  macro.algo(publicAPI, model, 1, 0);
	  macro.get(publicAPI, model, ['colorCoordinates', 'colorMapColors', 'colorTextureMap']);
	  macro.setGet(publicAPI, model, ['colorByArrayComponent', 'colorByArrayName', 'colorMode', 'fieldDataTupleId', 'interpolateScalarsBeforeMapping', 'lookupTable', 'renderTime', 'scalarMaterialMode', 'scalarMode', 'scalarVisibility', 'static', 'useLookupTableScalarRange']);
	  macro.setGetArray(publicAPI, model, ['scalarRange'], 2);

	  // Object methods
	  vtkMapper(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend }, staticOffsetAPI, _Static2.default);

/***/ },
/* 48 */
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
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _ScalarsToColors = __webpack_require__(51);

	var _ScalarsToColors2 = _interopRequireDefault(_ScalarsToColors);

	var _Math = __webpack_require__(21);

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
	// const NUMBER_OF_SPECIAL_COLORS = ABOVE_RANGE_COLOR_INDEX + 1;

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
	      // if (model.NanColor[3] < 1.0) { opaque = 0; }
	      // if (this->UseBelowRangeColor && this->BelowRangeColor[3] < 1.0) { opaque = 0; }
	      // if (this->UseAboveRangeColor && this->AboveRangeColor[3] < 1.0) { opaque = 0; }
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
	    var index = publicAPI.linearIndexLookup(v, p);
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
	  publicAPI.mapScalarsThroughTable = function (input, output, outFormat) {
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
	      if (outFormat === 'VTK_RGBA') {
	        for (var i = 0; i < length; i++) {
	          var cptr = publicAPI.linearLookup(inputV[i * inIncr], model.table, p);
	          outputV[i * 4] = cptr[0];
	          outputV[i * 4 + 1] = cptr[1];
	          outputV[i * 4 + 2] = cptr[2];
	          outputV[i * 4 + 3] = cptr[3];
	        }
	      }
	    } else {
	      /* eslint-disable no-lonely-if */
	      if (outFormat === 'VTK_RGBA') {
	        for (var _i = 0; _i < length; _i++) {
	          var _cptr = publicAPI.linearLookup(inputV[_i * inIncr], model.table, p);
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
	    // // Add "special" colors (NaN, below range, above range) to table here.
	    // const numberOfColors = model.table.length;

	    // // Below range color
	    // if (publicAPI.getUseBelowRangeColor() || numberOfColors === 0) {
	    //   vtkLookupTable::GetColorAsUnsignedChars(this->GetBelowRangeColor(), color);
	    //   tptr[0] = color[0];
	    //   tptr[1] = color[1];
	    //   tptr[2] = color[2];
	    //   tptr[3] = color[3];
	    //   }
	    // else
	    //   {
	    //   // Duplicate the first color in the table.
	    //   tptr[0] = table[0];
	    //   tptr[1] = table[1];
	    //   tptr[2] = table[2];
	    //   tptr[3] = table[3];
	    //   }

	    // // Above range color
	    // tptr = table + 4*(numberOfColors + vtkLookupTable::ABOVE_RANGE_COLOR_INDEX);
	    // if (this->GetUseAboveRangeColor() || numberOfColors == 0)
	    //   {
	    //   vtkLookupTable::GetColorAsUnsignedChars(this->GetAboveRangeColor(), color);
	    //   tptr[0] = color[0];
	    //   tptr[1] = color[1];
	    //   tptr[2] = color[2];
	    //   tptr[3] = color[3];
	    //   }
	    // else
	    //   {
	    //   // Duplicate the last color in the table.
	    //   tptr[0] = table[4*(numberOfColors-1) + 0];
	    //   tptr[1] = table[4*(numberOfColors-1) + 1];
	    //   tptr[2] = table[4*(numberOfColors-1) + 2];
	    //   tptr[3] = table[4*(numberOfColors-1) + 3];
	    //   }

	    // // Always use NanColor
	    // vtkLookupTable::GetColorAsUnsignedChars(this->GetNanColor(), color);
	    // tptr = table + 4*(numberOfColors + vtkLookupTable::NAN_COLOR_INDEX);
	    // tptr[0] = color[0];
	    // tptr[1] = color[1];
	    // tptr[2] = color[2];
	    // tptr[3] = color[3];
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
	  table: null,

	  hueRange: [0.0, 0.66667],
	  saturationRange: [1.0, 1.0],
	  valueRange: [1.0, 1.0],
	  alphaRange: [1.0, 1.0],
	  tableRange: [0.0, 1.0],

	  alpha: 1.0,
	  buildTime: null,
	  opaqueFlagBuildTime: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ScalarsToColors2.default.extend(publicAPI, model);

	  // Internal objects initialization
	  model.table = [];

	  model.buildTime = {};
	  macro.obj(model.buildTime);
	  model.opaqueFlagBuildTime = {};
	  macro.obj(model.opaqueFlagBuildTime);

	  // Object methods
	  macro.obj(publicAPI, model);

	  // Create get-only macros
	  macro.get(publicAPI, model, ['buildTime']);

	  // Create get-set macros
	  macro.setGet(publicAPI, model, ['numberOfColors']);

	  // Create set macros for array (needs to know size)
	  macro.setArray(publicAPI, model, ['alphaRange', 'hueRange', 'saturationRange', 'valueRange', 'tableRange'], 2);

	  // Create get macros for array
	  macro.getArray(publicAPI, model, ['hueRange', 'saturationRange', 'valueRange', 'tableRange', 'alphaRange']);

	  // For more macro methods, see "Sources/macro.js"

	  // Object specific methods
	  vtkLookupTable(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(52);

	var _Constants2 = __webpack_require__(53);

	var _Constants3 = __webpack_require__(45);

	var _DataArray = __webpack_require__(44);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	/* global window */

	// Add module-level functions or api that you want to expose statically via
	// the next section...

	// ----------------------------------------------------------------------------
	// Static API
	// ----------------------------------------------------------------------------

	function intColorToUChar(c) {
	  return c;
	} // { ENUM_1: 0, ENUM_2: 1, ... }

	function floatColorToUChar(c) {
	  return Math.floor(c * 255.0 + 0.5);
	}

	// ----------------------------------------------------------------------------
	// vtkMyClass methods
	// ----------------------------------------------------------------------------

	function vtkScalarsToColors(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkScalarsToColors');

	  // Description:
	  // Internal methods that map a data array into a 4-component,
	  // unsigned char RGBA array. The color mode determines the behavior
	  // of mapping. If VTK_COLOR_MODE_DEFAULT is set, then unsigned char
	  // data arrays are treated as colors (and converted to RGBA if
	  // necessary); If VTK_COLOR_MODE_DIRECT_SCALARS is set, then all arrays
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
	    if (colorMode === _Constants2.VTK_COLOR_MODE.DEFAULT && scalars.getDataType() === _Constants3.VTK_DATATYPES.UNSIGNED_CHAR || colorMode === _Constants2.VTK_COLOR_MODE.DIRECT_SCALARS && scalars) {
	      newColors = publicAPI.convertToRGBA(scalars, numberOfComponents, scalars.getNumberOfTuples());
	    } else {
	      var newscalars = {
	        type: 'vtkDataArray',
	        name: 'temp',
	        tuple: 4,
	        dataType: 'Uint8ClampedArray'
	      };

	      var s = new window[newscalars.dataType](4 * scalars.getNumberOfTuples());
	      for (var i = 0; i < s.length; i++) {
	        s[i] = Math.random();
	      }
	      newscalars.values = s;
	      newscalars.size = s.length;
	      newColors = _DataArray2.default.newInstance(newscalars);

	      // let component = componentIn;

	      // // If mapper did not specify a component, use the VectorMode
	      // if (component < 0 && numberOfComponents > 1) {
	      //   publicAPI.mapVectorsThroughTable(scalars,
	      //                                newColors,
	      //                                VTK_RGBA);
	      // } else {
	      //   if (component < 0) {
	      //     component = 0;
	      //   }
	      //   if (component >= numberOfComponents) {
	      //     component = numberOfComponents - 1;
	      //   }

	      // Map the scalars to colors
	      publicAPI.mapScalarsThroughTable(scalars, newColors, 'VTK_RGBA');
	      // }
	    }

	    return newColors;
	  };

	  publicAPI.luminanceToRGBA = function (newColors, colors, alpha, convtFun) {
	    var a = convtFun(alpha);

	    var values = colors.getData();
	    var size = values.length;
	    var component = 0;
	    var tuple = 1;

	    var count = 0;
	    for (var i = component; i < size; i += tuple) {
	      var l = convtFun(values[i]);
	      newColors[count * 4] = l;
	      newColors[count * 4 + 1] = l;
	      newColors[count * 4 + 2] = l;
	      newColors[count * 4 + 3] = a;
	      count++;
	    }
	  };

	  publicAPI.luminanceAlphaToRGBA = function (newColors, colors, alpha, convtFun) {
	    var values = colors.getData();
	    var size = values.length;
	    var component = 0;
	    var tuple = 2;

	    var count = 0;
	    for (var i = component; i < size; i += tuple) {
	      var l = convtFun(values[i]);
	      newColors[count] = l;
	      newColors[count + 1] = l;
	      newColors[count + 2] = l;
	      newColors[count + 3] = convtFun(values[i + 1]);
	      count += 4;
	    }
	  };

	  publicAPI.rGBToRGBA = function (newColors, colors, alpha, convtFun) {
	    var a = convtFun(alpha);

	    var values = colors.getData();
	    var size = values.length;
	    var component = 0;
	    var tuple = 3;

	    var count = 0;
	    for (var i = component; i < size; i += tuple) {
	      newColors[count * 4] = convtFun(values[i]);
	      newColors[count * 4 + 1] = convtFun(values[i + 1]);
	      newColors[count * 4 + 2] = convtFun(values[i + 2]);
	      newColors[count * 4 + 3] = a;
	      count++;
	    }
	  };

	  publicAPI.rGBAToRGBA = function (newColors, colors, alpha, convtFun) {
	    var values = colors.getData();
	    var size = values.length;
	    var component = 0;
	    var tuple = 4;

	    var count = 0;
	    for (var i = component; i < size; i += tuple) {
	      newColors[count * 4] = convtFun(values[i]);
	      newColors[count * 4 + 1] = convtFun(values[i + 1]);
	      newColors[count * 4 + 2] = convtFun(values[i + 2]);
	      newColors[count * 4 + 3] = convtFun(values[i + 3]) * alpha;
	      count++;
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.convertToRGBA = function (colors, numComp, numTuples) {
	    if (numComp === 4 && model.alpha >= 1.0 && colors.getDataType() === _Constants3.VTK_DATATYPES.UNSIGNED_CHAR) {
	      return colors;
	    }

	    var newColors = _DataArray2.default.newInstance({ dataType: _Constants3.VTK_DATATYPES.UNSIGNED_CHAR });
	    newColors.setNumberOfComponents(4);
	    newColors.setNumberOfTuples(numTuples);

	    if (numTuples <= 0) {
	      return newColors;
	    }

	    var alpha = model.alpha;
	    alpha = alpha > 0 ? alpha : 0;
	    alpha = alpha < 1 ? alpha : 1;

	    var convtFun = intColorToUChar;
	    if (colors.getDataType() === _Constants3.VTK_DATATYPES.FLOAT || colors.getDataType() === _Constants3.VTK_DATATYPES.DOUBLE) {
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

	  publicAPI.setRange = function (min, max) {
	    return publicAPI.setInputRange(min, max);
	  };
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  alpha: 1.0,
	  vectorComponent: 0,
	  vectorSize: -1,
	  vectorMode: _Constants.VECTOR_MODE.COMPONENT,
	  inputRange: [0, 255]
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Internal objects initialization
	  // model.myProp2 = new Thing() || {};

	  // Object methods
	  macro.obj(publicAPI, model);

	  // Create get-only macros
	  // macro.get(publicAPI, model, ['myProp2', 'myProp4']);

	  // Create get-set macros
	  macro.setGet(publicAPI, model, ['vectorComponent', 'alpha']);

	  // Create get-set macros for enum type
	  // macro.setGet(publicAPI, model, [
	  //   { name: 'vectorMode', enum: VECTOR_MODE, type: 'enum' },
	  // ]);

	  // For more macro methods, see "Sources/macro.js"

	  // Object specific methods
	  vtkScalarsToColors(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var VECTOR_MODE = exports.VECTOR_MODE = {
	  MAGNITUDE: 0,
	  COMPONENT: 1,
	  RGBCOLORS: 2
	};

	exports.default = { VECTOR_MODE: VECTOR_MODE };

/***/ },
/* 53 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var VTK_COLOR_MODE = exports.VTK_COLOR_MODE = {
	  DEFAULT: 0,
	  MAP_SCALARS: 1,
	  DIRECT_SCALARS: 2
	};

	var VTK_SCALAR_MODE = exports.VTK_SCALAR_MODE = {
	  DEFAULT: 0,
	  USE_POINT_DATA: 1,
	  USE_CELL_DATA: 2,
	  USE_POINT_FIELD_DATA: 3,
	  USE_CELL_FIELD_DATA: 4,
	  USE_FIELD_DATA: 5
	};

	var VTK_MATERIALMODE = exports.VTK_MATERIALMODE = {
	  DEFAULT: 0,
	  AMBIENT: 1,
	  DIFFUSE: 2,
	  AMBIENT_AND_DIFFUSE: 3
	};

	var VTK_GET_ARRAY = exports.VTK_GET_ARRAY = {
	  BY_ID: 0,
	  BY_NAME: 1
	};

	exports.default = { VTK_COLOR_MODE: VTK_COLOR_MODE, VTK_MATERIALMODE: VTK_MATERIALMODE, VTK_GET_ARRAY: VTK_GET_ARRAY, VTK_SCALAR_MODE: VTK_SCALAR_MODE };

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkOpenGLRenderWindow = vtkOpenGLRenderWindow;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNodeFactory = __webpack_require__(55);

	var _ViewNodeFactory2 = _interopRequireDefault(_ViewNodeFactory);

	var _ShaderCache = __webpack_require__(78);

	var _ShaderCache2 = _interopRequireDefault(_ShaderCache);

	var _ViewNode = __webpack_require__(58);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	var _TextureUnitManager = __webpack_require__(80);

	var _TextureUnitManager2 = _interopRequireDefault(_TextureUnitManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/* global document */

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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkOpenGLViewNodeFactory = vtkOpenGLViewNodeFactory;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNodeFactory = __webpack_require__(56);

	var _ViewNodeFactory2 = _interopRequireDefault(_ViewNodeFactory);

	var _Actor = __webpack_require__(57);

	var _Actor2 = _interopRequireDefault(_Actor);

	var _Actor2D = __webpack_require__(59);

	var _Actor2D2 = _interopRequireDefault(_Actor2D);

	var _Camera = __webpack_require__(60);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _ImageMapper = __webpack_require__(61);

	var _ImageMapper2 = _interopRequireDefault(_ImageMapper);

	var _ImageSlice = __webpack_require__(75);

	var _ImageSlice2 = _interopRequireDefault(_ImageSlice);

	var _PolyDataMapper = __webpack_require__(76);

	var _PolyDataMapper2 = _interopRequireDefault(_PolyDataMapper);

	var _RenderWindow = __webpack_require__(54);

	var _RenderWindow2 = _interopRequireDefault(_RenderWindow);

	var _Renderer = __webpack_require__(77);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _Texture = __webpack_require__(70);

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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(2);

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNode = __webpack_require__(58);

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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.PASS_TYPES = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNode = __webpack_require__(58);

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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(2);

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNode = __webpack_require__(58);

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
	    // ren.getTiledSizeAndOrigin(&usize, &vsize, lowerLeft, lowerLeft+1);
	    // sconst gl = model.context;
	    // gl.viewport(lowerLeft[0], lowerLeft[1], usize, vsize);
	  };

	  publicAPI.getKeyMatrices = function (ren) {
	    // has the camera changed?
	    if (ren !== model.lastRenderer || publicAPI.getMTime() > model.keyMatrixTime.getMTime() || ren.getMTime() > model.keyMatrixTime.getMTime()) {
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkOpenGLImageMapper = vtkOpenGLImageMapper;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Helper = __webpack_require__(62);

	var _Helper2 = _interopRequireDefault(_Helper);

	var _Math = __webpack_require__(21);

	var _Math2 = _interopRequireDefault(_Math);

	var _DataArray = __webpack_require__(44);

	var _DataArray2 = _interopRequireDefault(_DataArray);

	var _Texture = __webpack_require__(70);

	var _Texture2 = _interopRequireDefault(_Texture);

	var _ShaderProgram = __webpack_require__(67);

	var _ShaderProgram2 = _interopRequireDefault(_ShaderProgram);

	var _Texture3 = __webpack_require__(72);

	var _Texture4 = _interopRequireDefault(_Texture3);

	var _ViewNode = __webpack_require__(58);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	var _Constants = __webpack_require__(19);

	var _vtkPolyDataVS = __webpack_require__(73);

	var _vtkPolyDataVS2 = _interopRequireDefault(_vtkPolyDataVS);

	var _vtkPolyDataFS = __webpack_require__(74);

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

	      var points = _DataArray2.default.newInstance({ tuple: 3, values: ptsArray });
	      points.setName('points');
	      var tcoords = _DataArray2.default.newInstance({ tuple: 2, values: tcoordArray });
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
	      var cells = _DataArray2.default.newInstance({ tuple: 1, values: cellArray });

	      var cellOffset = 0;
	      cellOffset += model.tris.getCABO().createVBO(cells, 'polys', _Constants.VTK_REPRESENTATION.SURFACE, { points: points, tcoords: tcoords, cellOffset: cellOffset });
	      console.log('FIXME(Ken) - unused', cellOffset);
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkOpenGLHelper = vtkOpenGLHelper;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _CellArrayBufferObject = __webpack_require__(63);

	var _CellArrayBufferObject2 = _interopRequireDefault(_CellArrayBufferObject);

	var _ShaderProgram = __webpack_require__(67);

	var _ShaderProgram2 = _interopRequireDefault(_ShaderProgram);

	var _VertexArrayObject = __webpack_require__(69);

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
	}

	// ----------------------------------------------------------------------------
	// Object factory
	// ----------------------------------------------------------------------------

	var DEFAULT_VALUES = {
	  program: null,
	  shaderSourceTime: null,
	  VAO: null,
	  attributeUpdateTime: null,
	  CABO: null
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

	  macro.setGet(publicAPI, model, ['program', 'shaderSourceTime', 'VAO', 'attributeUpdateTime', 'CABO']);

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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _BufferObject = __webpack_require__(64);

	var _BufferObject2 = _interopRequireDefault(_BufferObject);

	var _DynamicTypedArray = __webpack_require__(66);

	var _DynamicTypedArray2 = _interopRequireDefault(_DynamicTypedArray);

	var _Constants = __webpack_require__(65);

	var _Constants2 = __webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// vtkOpenGLCellArrayBufferObject methods
	// ----------------------------------------------------------------------------

	function vtkOpenGLCellArrayBufferObject(publicAPI, model) {
	  // Set our className
	  model.classHierarchy.push('vtkOpenGLCellArrayBufferObject');

	  var packedVBO = new _DynamicTypedArray2.default({ chunkSize: 65500, arrayType: 'Float32Array' }); // the data

	  publicAPI.setType(_Constants.OBJECT_TYPE.ARRAY_BUFFER);

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
	    if (outRep === _Constants2.VTK_REPRESENTATION.POINTS || inRep === 'verts') {
	      func = cellBuilders.anythingToPoints;
	    } else if (outRep === _Constants2.VTK_REPRESENTATION.WIREFRAME || inRep === 'lines') {
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
	    publicAPI.upload(vboArray, _Constants.OBJECT_TYPE.ARRAY_BUFFER);
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

	  macro.get(publicAPI, model, ['elementCount', 'stride', 'vertexOffset', 'normalOffset', 'tCoordOffset', 'tCoordComponents', 'colorOffset', 'colorComponents']);

	  // Object specific methods
	  vtkOpenGLCellArrayBufferObject(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.STATIC = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(65);

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
	      case _Constants.OBJECT_TYPE.ELEMENT_ARRAY_BUFFER:
	        return model.context.ELEMENT_ARRAY_BUFFER;
	      case _Constants.OBJECT_TYPE.TEXTURE_BUFFER:
	        if ('TEXTURE_BUFFER' in model.context) {
	          return model.context.TEXTURE_BUFFER;
	        }
	      /* eslint-disable no-fallthrough */
	      // Intentional fallthrough in case there is no TEXTURE_BUFFER in WebGL
	      default:
	      /* eslint-enable no-fallthrough */
	      case _Constants.OBJECT_TYPE.ARRAY_BUFFER:
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
	      model.context.deleteBuffers(internalHandle);
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
	  objectType: _Constants.OBJECT_TYPE.ARRAY_BUFFER,
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
/* 65 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var OBJECT_TYPE = exports.OBJECT_TYPE = {
	  ARRAY_BUFFER: 0,
	  ELEMENT_ARRAY_BUFFER: 1,
	  TEXTURE_BUFFER: 2
	};

	exports.default = { OBJECT_TYPE: OBJECT_TYPE };

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* global window */

	var DynamicTypedArray = function () {
	  function DynamicTypedArray() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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

	exports.default = DynamicTypedArray;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.substitute = substitute;
	exports.vtkShaderProgram = vtkShaderProgram;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Shader = __webpack_require__(68);

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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkShader = vtkShader;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(65);

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
	    if (!program.isBound() || buffer.getHandle() === 0 || buffer.getType() !== _Constants.OBJECT_TYPE.ARRAY_BUFFER) {
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Constants = __webpack_require__(71);

	var _Constants2 = __webpack_require__(45);

	var _ViewNode = __webpack_require__(58);

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
	        publicAPI.setMinificationFilter(_Constants.VTK_FILTER.LINEAR_MIPMAP_LINEAR);
	      } else {
	        publicAPI.setMinificationFilter(_Constants.VTK_FILTER.LINEAR);
	      }
	      publicAPI.setMagnificationFilter(_Constants.VTK_FILTER.LINEAR);
	    } else {
	      publicAPI.setMinificationFilter(_Constants.VTK_FILTER.NEAREST);
	      publicAPI.setMagnificationFilter(_Constants.VTK_FILTER.NEAREST);
	    }
	    // create the texture if it is not done already
	    if (!model.handle) {
	      var input = model.renderable.getInputData();
	      var ext = input.getExtent();
	      var inScalars = input.getPointData().getScalars();
	      if (model.renderable.getInterpolate()) {
	        model.generateMipmap = true;
	        publicAPI.setMinificationFilter(_Constants.VTK_FILTER.LINEAR_MIPMAP_LINEAR);
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
	      // case VTK_DATATYPES.SIGNED_CHAR:
	      //   return model.context.BYTE;
	      case _Constants2.VTK_DATATYPES.UNSIGNED_CHAR:
	        return model.context.UNSIGNED_BYTE;
	      // case VTK_DATATYPES.SHORT:
	      //   return model.context.SHORT;
	      // case VTK_DATATYPES.UNSIGNED_SHORT:
	      //   return model.context.UNSIGNED_SHORT;
	      // case VTK_DATATYPES.INT:
	      //   return model.context.INT;
	      // case VTK_DATATYPES.UNSIGNED_INT:
	      //   return model.context.UNSIGNED_INT;
	      case _Constants2.VTK_DATATYPES.FLOAT:
	      case _Constants2.VTK_DATATYPES.VOID: // used for depth component textures.
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
	      case _Constants.VTK_FILTER.NEAREST:
	        return model.context.NEAREST;
	      case _Constants.VTK_FILTER.LINEAR:
	        return model.context.LINEAR;
	      case _Constants.VTK_FILTER.NEAREST_MIPMAP_NEAREST:
	        return model.context.NEAREST_MIPMAP_NEAREST;
	      case _Constants.VTK_FILTER.NEAREST_MIPMAP_LINEAR:
	        return model.context.NEAREST_MIPMAP_LINEAR;
	      case _Constants.VTK_FILTER.LINEAR_MIPMAP_NEAREST:
	        return model.context.LINEAR_MIPMAP_NEAREST;
	      case _Constants.VTK_FILTER.LINEAR_MIPMAP_LINEAR:
	        return model.context.LINEAR_MIPMAP_LINEAR;
	      default:
	        return model.context.NEAREST;
	    }
	  };

	  //----------------------------------------------------------------------------
	  publicAPI.getOpenGLWrapMode = function (vtktype) {
	    switch (vtktype) {
	      case _Constants.VTK_WRAP.CLAMP_TO_EDGE:
	        return model.context.CLAMP_TO_EDGE;
	      case _Constants.VTK_WRAP.REPEAT:
	        return model.context.REPEAT;
	      case _Constants.VTK_WRAP.MIRRORED_REPEAT:
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
	    if (dataType !== _Constants2.VTK_DATATYPES.FLOAT && model.openGLDataType === model.context.FLOAT) {
	      var pixCount = model.width * model.height * model.components;
	      var newArray = new Float32Array(pixCount);
	      for (var i = 0; i < pixCount; i++) {
	        newArray[i] = data[i];
	      }
	      pixData = newArray;
	    }
	    // if the opengl data type is ubyte
	    // then the data array must be u8, we currently simply truncate the data
	    if (dataType !== _Constants2.VTK_DATATYPES.UNSIGNED_CHAR && model.openGLDataType === model.context.UNSIGNED_BYTE) {
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
	  wrapS: _Constants.VTK_WRAP.CLAMP_TO_EDGE,
	  wrapT: _Constants.VTK_WRAP.CLAMP_TO_EDGE,
	  wrapR: _Constants.VTK_WRAP.CLAMP_TO_EDGE,
	  minificationFilter: _Constants.VTK_FILTER.NEAREST,
	  magnificationFilter: _Constants.VTK_FILTER.NEAREST,
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

	  macro.setGet(publicAPI, model, ['context', 'keyMatrixTime', 'minificationFilter', 'magnificationFilter']);

	  macro.get(publicAPI, model, ['components']);

	  // Object methods
	  vtkOpenGLTexture(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var VTK_WRAP = exports.VTK_WRAP = {
	  CLAMP_TO_EDGE: 0,
	  REPEAT: 1,
	  MIRRORED_REPEAT: 2
	};

	var VTK_FILTER = exports.VTK_FILTER = {
	  NEAREST: 0,
	  LINEAR: 1,
	  NEAREST_MIPMAP_NEAREST: 2,
	  NEAREST_MIPMAP_LINEAR: 3,
	  LINEAR_MIPMAP_NEAREST: 4,
	  LINEAR_MIPMAP_LINEAR: 5
	};

	exports.default = {
	  VTK_WRAP: VTK_WRAP,
	  VTK_FILTER: VTK_FILTER
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = "//VTK::System::Dec\n\n/*=========================================================================\n\n  Program:   Visualization Toolkit\n  Module:    vtkPolyDataVS.glsl\n\n  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen\n  All rights reserved.\n  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.\n\n     This software is distributed WITHOUT ANY WARRANTY; without even\n     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR\n     PURPOSE.  See the above copyright notice for more information.\n\n=========================================================================*/\n\nattribute vec4 vertexMC;\n\n// frag position in VC\n//VTK::PositionVC::Dec\n\n// optional normal declaration\n//VTK::Normal::Dec\n\n// extra lighting parameters\n//VTK::Light::Dec\n\n// Texture coordinates\n//VTK::TCoord::Dec\n\n// material property values\n//VTK::Color::Dec\n\n// clipping plane vars\n//VTK::Clip::Dec\n\n// camera and actor matrix values\n//VTK::Camera::Dec\n\n// Apple Bug\n//VTK::PrimID::Dec\n\nvoid main()\n{\n  //VTK::Color::Impl\n\n  //VTK::Normal::Impl\n\n  //VTK::TCoord::Impl\n\n  //VTK::Clip::Impl\n\n  //VTK::PrimID::Impl\n\n  //VTK::PositionVC::Impl\n\n  //VTK::Light::Impl\n}\n"

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = "//VTK::System::Dec\n\n/*=========================================================================\n\n  Program:   Visualization Toolkit\n  Module:    vtkPolyDataFS.glsl\n\n  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen\n  All rights reserved.\n  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.\n\n     This software is distributed WITHOUT ANY WARRANTY; without even\n     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR\n     PURPOSE.  See the above copyright notice for more information.\n\n=========================================================================*/\n// Template for the polydata mappers fragment shader\n\nuniform int PrimitiveIDOffset;\n\n// VC position of this fragment\n//VTK::PositionVC::Dec\n\n// optional color passed in from the vertex shader, vertexColor\n//VTK::Color::Dec\n\n// optional surface normal declaration\n//VTK::Normal::Dec\n\n// extra lighting parameters\n//VTK::Light::Dec\n\n// Texture coordinates\n//VTK::TCoord::Dec\n\n// picking support\n//VTK::Picking::Dec\n\n// Depth Peeling Support\n//VTK::DepthPeeling::Dec\n\n// clipping plane vars\n//VTK::Clip::Dec\n\n// the output of this shader\n//VTK::Output::Dec\n\n// Apple Bug\n//VTK::PrimID::Dec\n\n// handle coincident offsets\n//VTK::Coincident::Dec\n\nvoid main()\n{\n  // VC position of this fragment. This should not branch/return/discard.\n  //VTK::PositionVC::Impl\n\n  // Place any calls that require uniform flow (e.g. dFdx) here.\n  //VTK::UniformFlow::Impl\n\n  // Early depth peeling abort:\n  //VTK::DepthPeeling::PreColor\n\n  // Apple Bug\n  //VTK::PrimID::Impl\n\n  //VTK::Clip::Impl\n\n  //VTK::Color::Impl\n\n  // Generate the normal if we are not passed in one\n  //VTK::Normal::Impl\n\n  //VTK::Light::Impl\n\n  //VTK::TCoord::Impl\n\n  if (gl_FragData[0].a <= 0.0)\n    {\n    discard;\n    }\n\n  //VTK::DepthPeeling::Impl\n\n  //VTK::Picking::Impl\n\n  // handle coincident offsets\n  //VTK::Coincident::Impl\n}\n"

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(2);

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNode = __webpack_require__(58);

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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.vtkOpenGLPolyDataMapper = vtkOpenGLPolyDataMapper;
	exports.extend = extend;

	var _glMatrix = __webpack_require__(2);

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Helper = __webpack_require__(62);

	var _Helper2 = _interopRequireDefault(_Helper);

	var _Math = __webpack_require__(21);

	var _Math2 = _interopRequireDefault(_Math);

	var _ShaderProgram = __webpack_require__(67);

	var _ShaderProgram2 = _interopRequireDefault(_ShaderProgram);

	var _ViewNode = __webpack_require__(58);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

	var _Constants = __webpack_require__(19);

	var _Constants2 = __webpack_require__(53);

	var _vtkPolyDataVS = __webpack_require__(73);

	var _vtkPolyDataVS2 = _interopRequireDefault(_vtkPolyDataVS);

	var _vtkPolyDataFS = __webpack_require__(74);

	var _vtkPolyDataFS2 = _interopRequireDefault(_vtkPolyDataFS);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/* eslint-disable no-lonely-if */

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
	      model.points.setContext(model.context);
	      model.lines.setContext(model.context);
	      model.tris.setContext(model.context);
	      model.triStrips.setContext(model.context);
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

	    var lastLightComplexity = model.lastLightComplexity.get(model.lastBoundBO);

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
	    if (model.lastBoundBO.getCABO().getColorComponents() !== 0) {
	      colorDec = colorDec.concat(['varying vec4 vertexColorVSOutput;']);
	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::Color::Dec', ['attribute vec4 scalarColor;', 'varying vec4 vertexColorVSOutput;']).result;
	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::Color::Impl', ['vertexColorVSOutput =  scalarColor;']).result;
	      GSSource = _ShaderProgram2.default.substitute(GSSource, '//VTK::Color::Dec', ['in vec4 vertexColorVSOutput[];', 'out vec4 vertexColorGSOutput;']).result;
	      GSSource = _ShaderProgram2.default.substitute(GSSource, '//VTK::Color::Impl', ['vertexColorGSOutput = vertexColorVSOutput[i];']).result;
	    }

	    var scalarMatMode = model.renderable.getScalarMaterialMode();

	    if (model.lastBoundBO.getCABO().getColorComponents() !== 0) {
	      if (scalarMatMode === _Constants2.VTK_MATERIALMODE.AMBIENT || scalarMatMode === _Constants2.VTK_MATERIALMODE.DEFAULT && actor.getProperty().getAmbient() > actor.getProperty().getDiffuse()) {
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Impl', colorImpl.concat(['  ambientColor = vertexColorVSOutput.rgb;', '  opacity = opacity*vertexColorVSOutput.a;'])).result;
	      } else if (scalarMatMode === _Constants2.VTK_MATERIALMODE.DIFFUSE || scalarMatMode === _Constants2.VTK_MATERIALMODE.DEFAULT && actor.getProperty().getAmbient() <= actor.getProperty().getDiffuse()) {
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Impl', colorImpl.concat(['  diffuseColor = vertexColorVSOutput.rgb;', '  opacity = opacity*vertexColorVSOutput.a;'])).result;
	      } else {
	        FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Impl', colorImpl.concat(['  diffuseColor = vertexColorVSOutput.rgb;', '  ambientColor = vertexColorVSOutput.rgb;', '  opacity = opacity*vertexColorVSOutput.a;'])).result;
	      }
	    } else {
	      FSSource = _ShaderProgram2.default.substitute(FSSource, '//VTK::Color::Impl', colorImpl).result;
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

	    var lastLightComplexity = model.lastLightComplexity.get(model.lastBoundBO);

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
	    if (model.lastLightComplexity.get(model.lastBoundBO) > 0) {
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
	          if (actor.getProperty().getRepresentation() === _Constants.VTK_REPRESENTATION.WIREFRAME) {
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
	    if (actor.getProperty().getRepresentation() === _Constants.VTK_REPRESENTATION.POINTS) {
	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::PositionVC::Impl', ['//VTK::PositionVC::Impl', '  gl_PointSize = ' + actor.getProperty().getPointSize().toFixed(1) + ';'], false).result;
	    }

	    // do we need the vertex in the shader in View Coordinates
	    if (model.lastLightComplexity.get(model.lastBoundBO) > 0) {
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

	      VSSource = _ShaderProgram2.default.substitute(VSSource, '//VTK::TCoord::Impl', 'tcoordVCVSOutput = tcoordMC;').result;

	      // we only handle the first texture by default
	      // additional textures are activated and we set the uniform
	      // for the texture unit they are assigned to, but you have to
	      // add in the shader code to do something with them
	      var tus = model.openGLActor.getActiveTextures();
	      var tNumComp = tus[0].getComponents();

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

	  publicAPI.replaceShaderValues = function (shaders, ren, actor) {
	    publicAPI.replaceShaderColor(shaders, ren, actor);
	    publicAPI.replaceShaderNormal(shaders, ren, actor);
	    publicAPI.replaceShaderLight(shaders, ren, actor);
	    publicAPI.replaceShaderTCoord(shaders, ren, actor);
	    publicAPI.replaceShaderPositionVC(shaders, ren, actor);
	  };

	  publicAPI.getNeedToRebuildShaders = function (cellBO, ren, actor) {
	    var lightComplexity = 0;

	    // wacky backwards compatibility with old VTK lighting
	    // soooo there are many factors that determine if a primative is lit or not.
	    // three that mix in a complex way are representation POINT, Interpolation FLAT
	    // and having normals or not.
	    var needLighting = false;
	    var haveNormals = false; // (model.currentInput.getPointData().getNormals() != null);
	    if (actor.getProperty().getRepresentation() === _Constants.VTK_REPRESENTATION.POINTS) {
	      needLighting = actor.getProperty().getInterpolation() !== _Constants.VTK_SHADING.FLAT && haveNormals;
	    } else {
	      var isTrisOrStrips = cellBO === model.tris || cellBO === model.triStrips;
	      needLighting = isTrisOrStrips || !isTrisOrStrips && actor.getProperty().getInterpolation() !== _Constants.VTK_SHADING.FLAT && haveNormals;
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

	    if (model.lastLightComplexity.get(cellBO) !== lightComplexity) {
	      model.lightComplexityChanged.get(cellBO).modified();
	      model.lastLightComplexity.set(cellBO, lightComplexity);
	    }

	    // has something changed that would require us to recreate the shader?
	    // candidates are
	    // property modified (representation interpolation and lighting)
	    // input modified
	    // light complexity changed
	    if (cellBO.getProgram() === 0 || cellBO.getShaderSourceTime().getMTime() < publicAPI.getMTime() || cellBO.getShaderSourceTime().getMTime() < actor.getMTime() || cellBO.getShaderSourceTime().getMTime() < model.currentInput.getMTime() || cellBO.getShaderSourceTime().getMTime() < model.lightComplexityChanged.get(cellBO).getMTime()) {
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
	      if (cellBO.getProgram().isAttributeUsed('normalMC') && cellBO.getCABO().getNormalOffset() && model.lastLightComplexity.get(cellBO) > 0) {
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
	    if (model.lastLightComplexity.get(cellBO) < 2) {
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
	    if (model.lastLightComplexity.get(cellBO) < 3) {
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
	    var aColor = ppty.getAmbientColor();
	    var aIntensity = ppty.getAmbient();
	    var ambientColor = [aColor[0] * aIntensity, aColor[1] * aIntensity, aColor[2] * aIntensity];
	    var dColor = ppty.getDiffuseColor();
	    var dIntensity = ppty.getDiffuse();
	    var diffuseColor = [dColor[0] * dIntensity, dColor[1] * dIntensity, dColor[2] * dIntensity];

	    program.setUniformf('opacityUniform', opacity);
	    program.setUniform3f('ambientColorUniform', ambientColor);
	    program.setUniform3f('diffuseColorUniform', diffuseColor);
	    // we are done unless we have lighting
	    if (model.lastLightComplexity.get(cellBO) < 1) {
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

	    // Bind the OpenGL, this is shared between the different primitive/cell types.
	    model.lastBoundBO = null;
	  };

	  publicAPI.renderPieceDraw = function (ren, actor) {
	    var representation = actor.getProperty().getRepresentation();

	    var gl = model.context;

	    // draw points
	    if (model.points.getCABO().getElementCount()) {
	      // Update/build/etc the shader.
	      publicAPI.updateShaders(model.points, ren, actor);
	      gl.drawArrays(gl.POINTS, 0, model.points.getCABO().getElementCount());
	      model.primitiveIDOffset += model.points.getCABO().getElementCount();
	    }

	    // draw lines
	    if (model.lines.getCABO().getElementCount()) {
	      publicAPI.updateShaders(model.lines, ren, actor);
	      if (representation === _Constants.VTK_REPRESENTATION.POINTS) {
	        gl.drawArrays(gl.POINTS, 0, model.lines.getCABO().getElementCount());
	      } else {
	        gl.drawArrays(gl.LINES, 0, model.lines.getCABO().getElementCount());
	      }
	      model.primitiveIDOffset += model.lines.getCABO().getElementCount() / 2;
	    }

	    // draw polygons
	    if (model.tris.getCABO().getElementCount()) {
	      // First we do the triangles, update the shader, set uniforms, etc.
	      publicAPI.updateShaders(model.tris, ren, actor);
	      var mode = gl.POINTS;
	      if (representation === _Constants.VTK_REPRESENTATION.WIREFRAME) {
	        mode = gl.LINES;
	      }
	      if (representation === _Constants.VTK_REPRESENTATION.SURFACE) {
	        mode = gl.TRIANGLES;
	      }
	      gl.drawArrays(mode, 0, model.tris.getCABO().getElementCount());
	      model.primitiveIDOffset += model.tris.getCABO().getElementCount() / 3;
	    }

	    // draw strips
	    if (model.triStrips.getCABO().getElementCount()) {
	      // Use the tris shader program/VAO, but triStrips ibo.
	      model.updateShaders(model.triStrips, ren, actor);
	      if (representation === _Constants.VTK_REPRESENTATION.POINTS) {
	        gl.drawArrays(gl.POINTS, 0, model.triStrips.getCABO().getElementCount());
	      }
	      if (representation === _Constants.VTK_REPRESENTATION.WIREFRAME) {
	        gl.drawArays(gl.LINES, 0, model.triStrips.getCABO().getElementCount());
	      }
	      if (representation === _Constants.VTK_REPRESENTATION.SURFACE) {
	        gl.drawArrays(gl.TRIANGLES, 0, model.triStrips.getCABO().getElementCount());
	      }
	      // just be safe and divide by 3
	      model.primitiveIDOffset += model.triStrips.getCABO().getElementCount() / 3;
	    }
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
	    // publicAPI.renderEdges(ren, actor);
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
	      if ((scalarMode === _Constants2.VTK_SCALAR_MODE.USE_CELL_DATA || scalarMode === _Constants2.VTK_SCALAR_MODE.USE_CELL_FIELD_DATA || scalarMode === _Constants2.VTK_SCALAR_MODE.USE_FIELD_DATA || !poly.getPointData().getScalars()) && scalarMode !== _Constants2.VTK_SCALAR_MODE.USE_POINT_FIELD_DATA && c) {
	        model.haveCellScalars = true;
	      }
	    }

	    // Do we have normals?
	    var n = actor.getProperty().getInterpolation() !== _Constants.VTK_SHADING.FLAT ? poly.getPointData().getNormals() : null;
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
	    var toString = poly.getMTime() + 'A' + representation + 'B' + poly.getMTime() + 'C' + (n ? n.getMTime() : 1) + 'C' + (model.colors ? model.colors.getMTime() : 1);

	    var tcoords = poly.getPointData().getTCoords();
	    if (!model.openGLActor.getActiveTextures().length) {
	      tcoords = null;
	    }

	    if (model.VBOBuildString !== toString) {
	      // Build the VBOs
	      var points = poly.getPoints();

	      var cellOffset = 0;
	      cellOffset += model.points.getCABO().createVBO(poly.getVerts(), 'verts', representation, {
	        points: points,
	        normals: n,
	        tcoords: tcoords,
	        colors: c,
	        cellOffset: cellOffset,
	        haveCellScalars: model.haveCellScalars,
	        haveCellNormals: model.haveCellNormals
	      });
	      cellOffset += model.lines.getCABO().createVBO(poly.getLines(), 'lines', representation, {
	        points: points,
	        normals: n,
	        tcoords: tcoords,
	        colors: c,
	        cellOffset: cellOffset,
	        haveCellScalars: model.haveCellScalars,
	        haveCellNormals: model.haveCellNormals
	      });
	      cellOffset += model.tris.getCABO().createVBO(poly.getPolys(), 'polys', representation, {
	        points: points,
	        normals: n,
	        tcoords: tcoords,
	        colors: c,
	        cellOffset: cellOffset,
	        haveCellScalars: model.haveCellScalars,
	        haveCellNormals: model.haveCellNormals
	      });
	      cellOffset += model.triStrips.getCABO().createVBO(poly.getStrips(), 'strips', representation, {
	        points: points,
	        normals: n,
	        tcoords: tcoords,
	        colors: c,
	        cellOffset: cellOffset,
	        haveCellScalars: model.haveCellScalars,
	        haveCellNormals: model.haveCellNormals
	      });

	      // FIXME: cellOffset not used... (Ken?)
	      console.log('FIXME(Ken):', cellOffset);

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
	  lastLightComplexity: null
	};

	// ----------------------------------------------------------------------------

	function extend(publicAPI, model) {
	  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.assign(model, DEFAULT_VALUES, initialValues);

	  // Inheritance
	  _ViewNode2.default.extend(publicAPI, model);

	  model.points = _Helper2.default.newInstance();
	  model.lines = _Helper2.default.newInstance();
	  model.tris = _Helper2.default.newInstance();
	  model.triStrips = _Helper2.default.newInstance();

	  // Build VTK API
	  macro.setGet(publicAPI, model, ['context']);

	  model.VBOBuildTime = {};
	  macro.obj(model.VBOBuildTime);

	  model.lightComplexityChanged = new Map();
	  model.lightComplexityChanged.set(model.points, {});
	  macro.obj(model.lightComplexityChanged.get(model.points));
	  model.lightComplexityChanged.set(model.lines, {});
	  macro.obj(model.lightComplexityChanged.get(model.lines));
	  model.lightComplexityChanged.set(model.tris, {});
	  macro.obj(model.lightComplexityChanged.get(model.tris));
	  model.lightComplexityChanged.set(model.triStrips, {});
	  macro.obj(model.lightComplexityChanged.get(model.triStrips));

	  model.lastLightComplexity = new Map();
	  model.lastLightComplexity.set(model.points, 0);
	  model.lastLightComplexity.set(model.lines, 0);
	  model.lastLightComplexity.set(model.tris, 0);
	  model.lastLightComplexity.set(model.triStrips, 0);

	  // Object methods
	  vtkOpenGLPolyDataMapper(publicAPI, model);
	}

	// ----------------------------------------------------------------------------

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

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

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _ViewNode = __webpack_require__(58);

	var _ViewNode2 = _interopRequireDefault(_ViewNode);

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

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _ShaderProgram = __webpack_require__(67);

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

	var _macro = __webpack_require__(12);

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

	var _glMatrix = __webpack_require__(2);

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Camera = __webpack_require__(20);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _Light = __webpack_require__(82);

	var _Light2 = _interopRequireDefault(_Light);

	var _Math = __webpack_require__(21);

	var _Math2 = _interopRequireDefault(_Math);

	var _Viewport = __webpack_require__(83);

	var _Viewport2 = _interopRequireDefault(_Viewport);

	var _BoundingBox = __webpack_require__(15);

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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.LIGHT_TYPES = undefined;
	exports.vtkLight = vtkLight;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Math = __webpack_require__(21);

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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend, LIGHT_TYPES: LIGHT_TYPES };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

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
	  publicAPI.GetTiledSize = notImplemented('GetTiledSize');
	  publicAPI.GetTiledSizeAndOrigin = notImplemented('GetTiledSizeAndOrigin');
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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = exports.DEFAULT_VALUES = undefined;
	exports.vtkRenderWindow = vtkRenderWindow;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = { newInstance: newInstance, extend: extend };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _Math = __webpack_require__(21);

	var _Math2 = _interopRequireDefault(_Math);

	var _InteractorStyleTrackballCamera = __webpack_require__(86);

	var _InteractorStyleTrackballCamera2 = _interopRequireDefault(_InteractorStyleTrackballCamera);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	var eventsWeHandle = ['Enter', 'Leave', 'MouseMove', 'LeftButtonPress', 'LeftButtonRelease', 'MiddleButtonPress', 'MiddleButtonRelease', 'RightButtonPress', 'RightButtonRelease', 'MouseWheelForward', 'MouseWheelBackward', 'Expose', 'Configure', 'Timer', 'KeyPress', 'KeyRelease', 'Char', 'Delete', 'StartPinch', 'Pinch', 'EndPinch', 'StartPan', 'Pan', 'EndPan', 'StartRotate', 'Rotate', 'EndRotate', 'Tap', 'LongTap', 'Swipe'];

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

	  publicAPI.bindEvents = function (canvas, document) {
	    model.canvas = canvas;
	    canvas.addEventListener('mousedown', publicAPI.handleMouseDown);
	    document.querySelector('body').addEventListener('keypress', publicAPI.handleKeyPress);
	    canvas.addEventListener('mouseup', publicAPI.handleMouseUp);
	    canvas.addEventListener('mousemove', publicAPI.handleMouseMove);
	    canvas.addEventListener('touchstart', publicAPI.handleTouchStart, false);
	    canvas.addEventListener('touchend', publicAPI.handleTouchEnd, false);
	    canvas.addEventListener('touchcancel', publicAPI.handleTouchEnd, false);
	    canvas.addEventListener('touchmove', publicAPI.handleTouchMove, false);
	  };

	  publicAPI.unbindEvents = function (canvas, document) {
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
	    publicAPI.setEventPosition(event.clientX, model.canvas.clientHeight - event.clientY + 1, 0, 0);
	    model.controlKey = event.ctrlKey;
	    model.altKey = event.altKey;
	    model.shiftKey = event.shiftKey;
	    model.keyCode = String.fromCharCode(event.charCode);
	    publicAPI.charEvent();
	  };

	  publicAPI.handleMouseDown = function (event) {
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
	    publicAPI.setEventPosition(event.clientX, model.canvas.clientHeight - event.clientY + 1, 0, 0);
	    publicAPI.mouseMoveEvent();
	  };

	  publicAPI.handleMouseUp = function (event) {
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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _InteractorStyle = __webpack_require__(87);

	var _InteractorStyle2 = _interopRequireDefault(_InteractorStyle);

	var _Math = __webpack_require__(21);

	var _Math2 = _interopRequireDefault(_Math);

	var _Constants = __webpack_require__(89);

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
	      case _Constants.STATES.VTKIS_ROTATE:
	        publicAPI.findPokedRenderer(pos.x, pos.y);
	        publicAPI.rotate();
	        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
	        break;

	      case _Constants.STATES.VTKIS_PAN:
	        publicAPI.findPokedRenderer(pos.x, pos.y);
	        publicAPI.pan();
	        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
	        break;

	      case _Constants.STATES.VTKIS_DOLLY:
	        publicAPI.findPokedRenderer(pos.x, pos.y);
	        publicAPI.dolly();
	        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
	        break;

	      case _Constants.STATES.VTKIS_SPIN:
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
	      if (model.interactor.getControlKey()) {
	        publicAPI.startDolly();
	      } else {
	        publicAPI.startPan();
	      }
	    } else {
	      if (model.interactor.getControlKey()) {
	        publicAPI.startSpin();
	      } else {
	        publicAPI.startRotate();
	      }
	    }
	  };

	  //--------------------------------------------------------------------------
	  publicAPI.handleLeftButtonRelease = function () {
	    switch (model.state) {
	      case _Constants.STATES.VTKIS_DOLLY:
	        publicAPI.endDolly();
	        break;

	      case _Constants.STATES.VTKIS_PAN:
	        publicAPI.endPan();
	        break;

	      case _Constants.STATES.VTKIS_SPIN:
	        publicAPI.endSpin();
	        break;

	      case _Constants.STATES.VTKIS_ROTATE:
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

	var macro = _interopRequireWildcard(_macro);

	var _InteractorObserver = __webpack_require__(88);

	var _InteractorObserver2 = _interopRequireDefault(_InteractorObserver);

	var _Constants = __webpack_require__(89);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// { ENUM_1: 0, ENUM_2: 1, ... }

	// ----------------------------------------------------------------------------
	// Global methods
	// ----------------------------------------------------------------------------

	// Add module-level functions or api that you want to expose statically via
	// the next section...

	var stateNames = {
	  Rotate: _Constants.STATES.VTKIS_ROTATE,
	  Pan: _Constants.STATES.VTKIS_PAN,
	  Spin: _Constants.STATES.VTKIS_SPIN,
	  Dolly: _Constants.STATES.VTKIS_DOLLY,
	  Zoom: _Constants.STATES.VTKIS_ZOOM,
	  Timer: _Constants.STATES.VTKIS_TIMER,
	  TwoPointer: _Constants.STATES.VTKIS_TWO_POINTER,
	  UniformScale: _Constants.STATES.VTKIS_USCALE
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
	      if (model.state !== _Constants.STATES.VTKIS_NONE) {
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
	    if (model.animationState === _Constants.STATES.VTKIS_ANIM_OFF) {
	      var rwi = model.interactor;
	      rwi.getRenderWindow().setDesiredUpdateRate(rwi.getDesiredUpdateRate());
	      model.invokeStartInteractionEvent({ type: 'StartInteractionEvent' });
	    }
	  };

	  publicAPI.stopState = function () {
	    model.state = _Constants.STATES.VTKIS_NONE;
	    if (model.animationState === _Constants.STATES.VTKIS_ANIM_OFF) {
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
	  state: _Constants.STATES.VTKIS_NONE,
	  animState: _Constants.STATES.VTKIS_ANIM_OFF,
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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newInstance = undefined;
	exports.extend = extend;

	var _macro = __webpack_require__(12);

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

	var newInstance = exports.newInstance = macro.newInstance(extend);

	// ----------------------------------------------------------------------------

	exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ },
/* 89 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var STATES = exports.STATES = {
	  VTKIS_START: 0,
	  VTKIS_NONE: 0,

	  VTKIS_ROTATE: 1,
	  VTKIS_PAN: 2,
	  VTKIS_SPIN: 3,
	  VTKIS_DOLLY: 4,
	  VTKIS_ZOOM: 5,
	  VTKIS_USCALE: 6,
	  VTKIS_TIMER: 7,
	  VTKIS_FORWARDFLY: 8,
	  VTKIS_REVERSEFLY: 9,
	  VTKIS_TWO_POINTER: 10,

	  VTKIS_ANIM_OFF: 0,
	  VTKIS_ANIM_ON: 1,

	  VTKIS_WINDOW_LEVEL: 1024,
	  VTKIS_PICK: 1025,
	  VTKIS_SLICE: 1026
	};

	exports.default = {
	  STATES: STATES
	};

/***/ }
/******/ ]);
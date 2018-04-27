import { newInstance } from 'vtk.js/Sources/macro/Core/NewInstance';
import { obj } from 'vtk.js/Sources/macro/Core/VtkObject';
import { setGet } from 'vtk.js/Sources/macro/Core/GetterAndSetter';
import vtkMath from 'vtk.js/Sources/Common/Core/Math';

// ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Static API
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// vtkCone methods
// ----------------------------------------------------------------------------

function vtkCone(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkCone');

  publicAPI.evaluateFunction = (x) => {
    const tanTheta = Math.tan(vtkMath.radiansFromDegrees(model.angle));
    const retVal =
      x[1] * x[1] + x[2] * x[2] - x[0] * x[0] * tanTheta * tanTheta;

    return retVal;
  };

  publicAPI.evaluateGradient = (x) => {
    const tanTheta = Math.tan(vtkMath.radiansFromDegrees(model.angle));
    const retVal = [-2.0 * x[0] * tanTheta * tanTheta, 2.0 * x[1], 2.0 * x[2]];
    return retVal;
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------
const DEFAULT_VALUES = {
  angle: 15.0,
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Object methods
  obj(publicAPI, model);
  setGet(publicAPI, model, ['angle']);

  vtkCone(publicAPI, model);
}

// ----------------------------------------------------------------------------

export default Object.assign({
  newInstance: newInstance(extend, 'vtkCone'),
  extend,
});

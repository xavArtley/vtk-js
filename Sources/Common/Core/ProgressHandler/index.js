import { event } from 'vtk.js/Sources/macro/Core/Event';
import { get } from 'vtk.js/Sources/macro/Core/GetterAndSetter';
import { newInstance } from 'vtk.js/Sources/macro/Core/NewInstance';
import { obj } from 'vtk.js/Sources/macro/Core/VtkObject';

// ----------------------------------------------------------------------------
// vtkProgressHandler methods
// ----------------------------------------------------------------------------

function vtkProgressHandler(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkProgressHandler');

  publicAPI.startWork = () => {
    model.workCount += 1;
    if (model.workCount === 1) {
      publicAPI.invokeChange(true);
    }
  };

  publicAPI.stopWork = () => {
    model.workCount -= 1;
    if (model.workCount === 0) {
      publicAPI.invokeChange(false);
    }
  };

  publicAPI.isWorking = () => !!model.workCount;

  publicAPI.wrapPromise = (promise) => {
    publicAPI.startWork();
    return new Promise((resolve, reject) => {
      promise.then(
        (resolveArgs) => {
          publicAPI.stopWork();
          resolve(resolveArgs);
        },
        (rejectArgs) => {
          publicAPI.stopWork();
          reject(rejectArgs);
        }
      );
    });
  };

  publicAPI.wrapPromiseFunction = (fn) => (...args) =>
    publicAPI.wrapPromise(fn(...args));
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  workCount: 0,
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Object methods
  obj(publicAPI, model);
  event(publicAPI, model, 'change');
  get(publicAPI, model, ['workCount']);

  // Object specific methods
  vtkProgressHandler(publicAPI, model);
}

// ----------------------------------------------------------------------------

export default {
  newInstance: newInstance(extend, 'vtkProgressHandler'),
  extend,
};

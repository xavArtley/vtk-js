import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray';
import { newInstance } from 'vtk.js/Sources/macro/Core/NewInstance';
import { VtkDataTypes } from 'vtk.js/Sources/Common/Core/DataArray/Constants';
import { vtkErrorMacro } from 'vtk.js/Sources/macro/Core/Logger';

const INVALID_BOUNDS = [1, -1, 1, -1, 1, -1];

// ----------------------------------------------------------------------------
// vtkPoints methods
// ----------------------------------------------------------------------------

function vtkPoints(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkPoints');

  // Forwarding methods
  publicAPI.getNumberOfPoints = publicAPI.getNumberOfTuples;

  publicAPI.setNumberOfPoints = (nbPoints, dimension = 3) => {
    if (publicAPI.getNumberOfPoints() !== nbPoints) {
      model.size = nbPoints * dimension;
      model.values = new window[model.dataType](model.size);
      publicAPI.setNumberOfComponents(dimension);
      publicAPI.modified();
    }
  };

  publicAPI.setPoint = (idx, ...xyz) => {
    const offset = idx * model.numberOfComponents;
    for (let i = 0; i < model.numberOfComponents; i++) {
      model.values[offset + i] = xyz[i];
    }
  };

  publicAPI.getPoint = publicAPI.getTuple;

  publicAPI.getBounds = () => {
    if (publicAPI.getNumberOfComponents() === 3) {
      const xRange = publicAPI.getRange(0);
      model.bounds[0] = xRange[0];
      model.bounds[1] = xRange[1];
      const yRange = publicAPI.getRange(1);
      model.bounds[2] = yRange[0];
      model.bounds[3] = yRange[1];
      const zRange = publicAPI.getRange(2);
      model.bounds[4] = zRange[0];
      model.bounds[5] = zRange[1];
      return model.bounds;
    }

    if (publicAPI.getNumberOfComponents() !== 2) {
      vtkErrorMacro(`getBounds called on an array with components of
        ${publicAPI.getNumberOfComponents()}`);
      return INVALID_BOUNDS;
    }

    const xRange = publicAPI.getRange(0);
    model.bounds[0] = xRange[0];
    model.bounds[1] = xRange[1];
    const yRange = publicAPI.getRange(1);
    model.bounds[2] = yRange[0];
    model.bounds[3] = yRange[1];
    model.bounds[4] = 0;
    model.bounds[5] = 0;

    return model.bounds;
  };

  // Trigger the computation of bounds
  publicAPI.computeBounds = publicAPI.getBounds;
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  empty: true,
  numberOfComponents: 3,
  dataType: VtkDataTypes.FLOAT,
  bounds: [1, -1, 1, -1, 1, -1],
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  vtkDataArray.extend(publicAPI, model, initialValues);
  vtkPoints(publicAPI, model);
}

// ----------------------------------------------------------------------------

export default { newInstance: newInstance(extend, 'vtkPoints'), extend };

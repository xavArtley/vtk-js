//
// Not working due to CORS limitation
//
// => But could be extended with an edited workflow where we let the user download the file
//    and drop it so we can load it with either the metadata we can extract from the datasets
//    or trying to extract them from the file name.

/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */

import 'babel-polyfill';
import 'vtk.js/Sources/favicon';
import JSZip from 'jszip';

import HttpDataAccessHelper       from 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import vtkFullScreenRenderWindow  from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkVolumeController        from 'vtk.js/Sources/Interaction/UI/VolumeController';

import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray';
import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData';
import vtkMapper    from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
import vtkActor     from 'vtk.js/Sources/Rendering/Core/Volume';

import style from './OpenSciVizDataSetViewer.mcss';

const TYPE_MAPPING = {
  int8: { size: 1, Array: Int8Array },
  uint8: { size: 1, Array: Uint8Array },
  uint16: { size: 2, Array: Uint16Array },
  int16: { size: 2, Array: Int16Array },
  float32: { size: 4, Array: Float32Array },
  float64: { size: 8, Array: Float64Array },
};

const iOS = /iPad|iPhone|iPod/.test(window.navigator.platform);
const datasets = [];
const exampleContainer = document.querySelector('.content');
const rootBody = document.querySelector('body');
const myContainer = exampleContainer || rootBody;

// Add class to body if iOS device --------------------------------------------

if (iOS) {
  document.querySelector('body').classList.add('is-ios-device');
}

function emptyContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function formatSize(size) {
  const units = [' B', ' KB', ' MB', ' GB', ' TB'];
  let remain = size;
  while (remain > 1000) {
    remain /= 1000;
    units.shift();
  }
  return `${remain.toFixed(2)}${units[0]}`;
}

function downloadDataSet(event) {
  let el = event.target;
  while (el.dataset.index === undefined) {
    el = el.parentNode;
  }
  const dataset = datasets[el.dataset.index];
  open(dataset.url);
}

function loadDataSet(event) {
  let el = event.target;
  while (el.dataset.index === undefined) {
    el = el.parentNode;
  }
  const dataset = datasets[el.dataset.index];
  HttpDataAccessHelper.fetchBinary(dataset.url).then((byteArray) => {
    emptyContainer(myContainer);
    const spacing = dataset.spacing;
    const extent = [
      0, dataset.size[0] - 1,
      0, dataset.size[1] - 1,
      0, dataset.size[2] - 1,
    ];
    const ds = vtkImageData.newInstance({ extent, spacing });
    const values = new TYPE_MAPPING[dataset.type].Array(byteArray);
    const dataArray = vtkDataArray.newInstance({ values, name: 'scalars' });
    ds.getPointData().setScalars(dataArray);

    const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();
    const mapper = vtkMapper.newInstance();
    const actor = vtkActor.newInstance();
    actor.setMapper(mapper);
    mapper.setInputData(ds);
    renderer.addVolume(actor);
    renderer.resetCamera();
    renderWindow.render();

    // Control UI
    const controllerWidget = vtkVolumeController.newInstance({ size: [400, 150] });
    const isBackgroundDark = true;
    controllerWidget.setContainer(myContainer);
    controllerWidget.setupContent(renderWindow, actor, isBackgroundDark);
    fullScreenRenderer.setResizeCallback(({ width, height }) => {
      // 2px padding + 2x1px boder + 5px edge = 14
      if (width > 414) {
        controllerWidget.setSize(400, 150);
      } else {
        controllerWidget.setSize(width - 14, 150);
      }
      controllerWidget.render();
    });
  });
}

function listDatasets(container) {
  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('class', style.container);
  container.appendChild(mainContainer);

  const txtBuffer = [];
  let count = datasets.length;
  while (count--) {
    const dataset = datasets[count];
    const size = formatSize(TYPE_MAPPING[dataset.type].size * dataset.size[0] * dataset.size[1] * dataset.size[2]);
    txtBuffer.push(`<div class="${style.dataset}" data-index="${count}">
      <section class="${style.title}">
        <label class="${style.name} js-view">${dataset.name}</label>
        <div class="${style.info}">${dataset.size.join('x')} - ${dataset.type}</div>
        <div class="${style.size} js-download">${size}</div>
      </section>
      <div class="${style.description}">${dataset.description}</div>
      <div class="${style.acknowledgement}">${dataset.acknowledgement}</div>
    </div>`);
  }
  mainContainer.innerHTML = txtBuffer.join('\n');

  // Attach viewer
  let elements = container.querySelectorAll('.js-view');
  count = elements.length;
  while (count--) {
    elements[count].addEventListener('click', loadDataSet);
  }

  // Attach downloader
  elements = container.querySelectorAll('.js-download');
  count = elements.length;
  while (count--) {
    elements[count].addEventListener('click', downloadDataSet);
  }
}

function loadDataSetMetadata(container, url) {
  let workLoad = 0;
  HttpDataAccessHelper.fetchBinary(url)
      .then((zipContent) => {
        const zip = new JSZip();
        zip
          .loadAsync(zipContent)
          .then(() => {
            zip.forEach((relativePath, zipEntry) => {
              if (relativePath.match(/\.json$/i) && !relativePath.match(/template\.json$/i)) {
                console.log(relativePath);
                workLoad++;
                zipEntry.async('string').then((txt) => {
                  datasets.push(JSON.parse(txt));
                  workLoad--;
                  if (workLoad === 0) {
                    listDatasets(container);
                  }
                });
              }
            });
          });
      });
}

// Load dataset listing dynamically
// https://github.com/pavolzetor/open-scivis-datasets/archive/master.zip
// /data/open-sciviz-datasets/open-scivis-datasets.zip
loadDataSetMetadata(myContainer, '/data/open-sciviz-datasets/open-scivis-datasets.zip');

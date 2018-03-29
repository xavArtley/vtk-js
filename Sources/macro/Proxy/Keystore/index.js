/* eslint-disable import/prefer-default-export */

// ----------------------------------------------------------------------------
// keystore(publicAPI, model, initialKeystore)
//
//    - initialKeystore: Initial keystore. This can be either a Map or an
//      object.
//
// Generated API
//  setKey(key, value) : mixed (returns value)
//  getKey(key) : mixed
//  getAllKeys() : [mixed]
//  deleteKey(key) : Boolean
// ----------------------------------------------------------------------------

export function keystore(publicAPI, model, initialKeystore = {}) {
  model.keystore = Object.assign(model.keystore || {}, initialKeystore);

  publicAPI.setKey = (key, value) => {
    model.keystore[key] = value;
  };
  publicAPI.getKey = (key, value) => model.keystore[key];
  publicAPI.getAllKeys = (key, value) => Object.keys(model.keystore);
  publicAPI.deleteKey = (key, value) => delete model.keystore[key];
  publicAPI.clearKeystore = () =>
    publicAPI.getAllKeys().forEach((key) => delete model.keystore[key]);
}

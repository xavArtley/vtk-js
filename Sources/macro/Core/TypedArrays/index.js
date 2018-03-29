export const TYPED_ARRAYS = {
  Float32Array,
  Float64Array,
  Uint8Array,
  Int8Array,
  Uint16Array,
  Int16Array,
  Uint32Array,
  Int32Array,
};

export function createTypedArray(name, ...args) {
  return new TYPED_ARRAYS[name](...args);
}

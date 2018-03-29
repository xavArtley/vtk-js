// ----------------------------------------------------------------------------
// Logging function calls
// ----------------------------------------------------------------------------
/* eslint-disable no-prototype-builtins                                      */

const fakeConsole = {};

function noOp() {}

const consoleMethods = [
  'log',
  'debug',
  'info',
  'warn',
  'error',
  'time',
  'timeEnd',
  'group',
  'groupEnd',
];
consoleMethods.forEach((methodName) => {
  fakeConsole[methodName] = noOp;
});

global.console = console.hasOwnProperty('log') ? console : fakeConsole;

const loggerFunctions = {
  debug: noOp, // Don't print debug by default
  error: global.console.error || noOp,
  info: global.console.info || noOp,
  log: global.console.log || noOp,
  warn: global.console.warn || noOp,
};

export function setLoggerFunction(name, fn) {
  if (loggerFunctions[name]) {
    loggerFunctions[name] = fn || noOp;
  }
}

export function vtkLogMacro(...args) {
  loggerFunctions.log(...args);
}

export function vtkInfoMacro(...args) {
  loggerFunctions.info(...args);
}

export function vtkDebugMacro(...args) {
  loggerFunctions.debug(...args);
}

export function vtkErrorMacro(...args) {
  loggerFunctions.error(...args);
}

export function vtkWarningMacro(...args) {
  loggerFunctions.warn(...args);
}

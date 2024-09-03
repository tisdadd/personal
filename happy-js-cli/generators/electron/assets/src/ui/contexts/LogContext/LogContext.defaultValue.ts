// disabling for error messages when not properly wrapped
/* eslint-disable no-console */
import defaultState from './LogProvider/LogProvider.defaultState';

export default {
  ...defaultState,
  log: (message: unknown) => {
    console.log(`Please wrap in LogProvider for real functionality - received ${message}`);
  },
  warn: (message: unknown) => {
    console.log(`Please wrap in LogProvider for real functionality - received ${message}`);
  },
  error: (message: unknown) => {
    console.log(`Please wrap in LogProvider for real functionality - received ${message}`);
  },
  info: (message: unknown) => {
    console.log(`Please wrap in LogProvider for real functionality - received ${message}`);
  },
};

// disabling for error messages when not properly wrapped
/* eslint-disable no-console */
import defaultState from './[FTName]Provider/[FTName]Provider.defaultState';

export default {
  ...defaultState,
  log: (message: any) => {
    console.log(`Please wrap in [FTName]Provider for real functionality - received ${message}`);
  },
  warn: (message: any) => {
    console.log(`Please wrap in [FTName]Provider for real functionality - received ${message}`);
  },
  error: (message: any) => {
    console.log(`Please wrap in [FTName]Provider for real functionality - received ${message}`);
  },
  info: (message: any) => {
    console.log(`Please wrap in [FTName]Provider for real functionality - received ${message}`);
  },
};

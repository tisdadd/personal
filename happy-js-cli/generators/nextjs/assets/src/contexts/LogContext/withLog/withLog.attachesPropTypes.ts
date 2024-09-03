type WithLogAttachedPropTypes = {
  log: {
    on: boolean,
    setOn: (on: boolean) => void,
    log: (message: any) => void,
    warn: (message: any) => void,
    error: (message: any) => void,
    info: (message: any) => void,
  }
};

export default WithLogAttachedPropTypes;

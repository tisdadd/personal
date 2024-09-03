type WithLogAttachedPropTypes = {
  log: {
    on: boolean,
    setOn: (on: boolean) => void,
    log: (message: unknown) => void,
    warn: (message: unknown) => void,
    error: (message: unknown) => void,
    info: (message: unknown) => void,
  }
};

export default WithLogAttachedPropTypes;

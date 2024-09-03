type With[FTName]AttachedPropTypes = {
 <FTName | lowercasefirstchar>: {
    on: boolean,
    setOn: (on: boolean) => void,
    log: (message: any) => void,
    warn: (message: any) => void,
    error: (message: any) => void,
    info: (message: any) => void,
  }
};

export default With[FTName]AttachedPropTypes;

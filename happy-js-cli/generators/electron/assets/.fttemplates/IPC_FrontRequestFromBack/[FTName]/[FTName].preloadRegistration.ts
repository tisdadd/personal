import { ipcRenderer } from 'electron';
import PreloadRegistrationParameterType from '../PreloadRegistrationParameter.type';
import processName from './[FTName].processName';

function [FTName]() {
  return ipcRenderer.invoke(processName);
}

function register(objectToRegisterWithIn: PreloadRegistrationParameterType) {
  const objectToRegisterWith = objectToRegisterWithIn;

  // process name is safely controlled by us
  // eslint-disable-next-line security/detect-object-injection
  objectToRegisterWith[processName] = [FTName];
}

export default register;

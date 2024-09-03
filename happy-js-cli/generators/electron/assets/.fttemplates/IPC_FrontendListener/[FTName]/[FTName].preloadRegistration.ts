import { ipcRenderer } from 'electron';
import FrontendCallbackParameterType from '../FrontendCallbackParameter.type';
import PreloadRegistrationParameterType from '../PreloadRegistrationParameter.type';
import processName from './[FTName].processName';

function [FTName](callback: FrontendCallbackParameterType) {
  return ipcRenderer.on(processName, callback);
}

function register(objectToRegisterWithIn: PreloadRegistrationParameterType) {
  const objectToRegisterWith = objectToRegisterWithIn;

  // process name is safely controlled by us
  // eslint-disable-next-line security/detect-object-injection
  objectToRegisterWith[processName] = [FTName];
}

export default register;

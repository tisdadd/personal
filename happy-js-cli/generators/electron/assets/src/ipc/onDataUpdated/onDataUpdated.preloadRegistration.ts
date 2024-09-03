import { ipcRenderer } from 'electron';
import FrontendCallbackParameterType from '../FrontendCallbackParameter.type';
import PreloadRegistrationParameterType from '../PreloadRegistrationParameter.type';
import processName from './onDataUpdated.processName';

function onDataUpdated(callback: FrontendCallbackParameterType) {
  return ipcRenderer.on(processName, callback);
}

function register(objectToRegisterWithIn: PreloadRegistrationParameterType) {
  const objectToRegisterWith = objectToRegisterWithIn;

  // process name is safely controlled by us
  // eslint-disable-next-line security/detect-object-injection
  objectToRegisterWith[processName] = onDataUpdated;
}

export default register;

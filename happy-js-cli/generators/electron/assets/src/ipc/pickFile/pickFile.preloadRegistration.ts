import { ipcRenderer } from 'electron';
import PreloadRegistrationParameterType from '../PreloadRegistrationParameter.type';
import processName from './pickFile.processName';

function pickFile() {
  return ipcRenderer.send(processName);
}

function register(objectToRegisterWithIn: PreloadRegistrationParameterType) {
  const objectToRegisterWith = objectToRegisterWithIn;

  // process name is safely controlled by us
  // eslint-disable-next-line security/detect-object-injection
  objectToRegisterWith[processName] = pickFile;
}

export default register;

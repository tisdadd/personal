import { ipcRenderer } from 'electron';
import PreloadRegistrationParameterType from '../PreloadRegistrationParameter.type';
import processName from './editData.processName';

function editData(data: unknown) {
  return ipcRenderer.send(processName, data);
}

function register(objectToRegisterWithIn: PreloadRegistrationParameterType) {
  const objectToRegisterWith = objectToRegisterWithIn;

  // process name is safely controlled by us
  // eslint-disable-next-line security/detect-object-injection
  objectToRegisterWith[processName] = editData;
}

export default register;

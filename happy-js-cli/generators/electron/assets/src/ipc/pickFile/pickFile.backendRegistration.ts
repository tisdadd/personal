import { ipcMain } from 'electron';
import processName from './pickFile.processName';

import BackendRegistrationParameterType from '../BackendRegistrationParameter.type';
import pickFile from './pickFile';
import validateSender from '../validateSender';

function register(params: BackendRegistrationParameterType) {
  ipcMain.on(processName, (event) => {
    if (!validateSender(event)) {
      throw new Error('Not a valid sender');
    }
    pickFile(params);
  });
}

export default register;

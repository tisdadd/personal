import { ipcMain } from 'electron';
import processName from './resetDatabase.processName';

import BackendRegistrationParameterType from '../BackendRegistrationParameter.type';
import resetDatabase from './resetDatabase';
import validateSender from '../validateSender';

function register(params: BackendRegistrationParameterType) {
  ipcMain.on(processName, (event) => {
    if (!validateSender(event)) {
      throw new Error('Invalid sender for request');
    }
    resetDatabase(params);
  });
}

export default register;

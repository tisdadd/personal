import { ipcMain } from 'electron';
import processName from './[FTName].processName';

import BackendRegistrationParameterType from '../BackendRegistrationParameter.type';
import [FTName] from './[FTName]';
import validateSender from '../validateSender';


function register(params: BackendRegistrationParameterType) {
  ipcMain.on(processName, (event) => {
    if (!validateSender(event)) {
      throw new Error('Not a valid sender');
    }
    [FTName](params);
  });
}

export default register;

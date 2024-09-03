import { ipcMain } from 'electron';
import processName from './[FTName].processName';

import [FTName] from './[FTName]';
import validateSender from '../validateSender';

function register() {

  ipcMain.on(processName, (event, ...args) => {
    if (!validateSender(event)) {
      throw new Error('Not a valid sender');
    }
    [FTName].call(this, ...args);
  });
}

export default register;

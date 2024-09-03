import { ipcMain } from 'electron';
import processName from './[FTName].processName';

import [FTName] from './[FTName]';
import validateSender from '../validateSender';


function register() {
  ipcMain.handle(processName, (event, ...args) => {
    if (validateSender(event)) {
      return [FTName].call(this, ...args);
    }
    throw new Error('Not valid sender');
  });
}

export default register;

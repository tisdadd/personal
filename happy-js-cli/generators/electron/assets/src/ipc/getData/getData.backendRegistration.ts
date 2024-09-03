import { ipcMain } from 'electron';
import processName from './getData.processName';
import validateSender from '../validateSender';

import getData from './getData';

function register() {
  ipcMain.handle(processName, (event, ...args) => {
    if (validateSender(event)) {
      return getData.call(this, ...args);
    }
    throw new Error('Not valid sender');
  });
}

export default register;

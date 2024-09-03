import { ipcMain } from 'electron';
import processName from './editData.processName';

import editData from './editData';
import validateSender from '../validateSender';

function register() {
  ipcMain.on(processName, (event, ...args) => {
    if (!validateSender(event)) {
      throw new Error('Not a valid sender');
    }
    editData.call(this, ...args);
  });
}

export default register;

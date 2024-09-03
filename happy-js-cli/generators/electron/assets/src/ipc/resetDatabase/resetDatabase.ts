import BackendRegistrationParameterType from '../BackendRegistrationParameter.type';
import simpleDatabase from '../../backend/simpleDatabase';

import onDataUpdatedProcessName from '../onDataUpdated/onDataUpdated.processName';

async function resetDatabase({ windows }: BackendRegistrationParameterType) {
  await simpleDatabase.remove({
    _id: {
      $ne: -1,
    },
  });

  if (windows.length > 0) {
    windows.forEach((innerWindow) => {
      innerWindow.webContents.send(onDataUpdatedProcessName, []);
    });
  }
}

export default resetDatabase;

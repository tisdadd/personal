import { dialog } from 'electron';
import csvToJson from 'csvtojson';
import simpleDatabase from '../../backend/simpleDatabase';
import BackendRegistrationParameterType from '../BackendRegistrationParameter.type';
import onDataUpdatedProcessName from '../onDataUpdated/onDataUpdated.processName';

async function pickFile({ windows } : BackendRegistrationParameterType) {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [{
      name: 'CSV',
      extensions: ['csv'],
    }],
  });

  const jsonPromises: PromiseLike<unknown>[] = [];

  filePaths.forEach((filePath) => jsonPromises.push(csvToJson().fromFile(filePath)));

  const settled = await Promise.allSettled(jsonPromises);

  const insertedPromises: PromiseLike<unknown>[] = [];

  settled.forEach((result) => {
    if (result.status === 'fulfilled') {
      insertedPromises.push(simpleDatabase.insertAsync(result.value));
    }
  });

  await Promise.allSettled(insertedPromises);

  if (windows.length > 0) {
    const data = await simpleDatabase.getAllData();
    windows.forEach((innerWindow) => {
      innerWindow.webContents.send(onDataUpdatedProcessName, data);
    });
  }
}

export default pickFile;

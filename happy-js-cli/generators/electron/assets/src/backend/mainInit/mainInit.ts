import {
  app,
} from 'electron';
import createWindow from './util/createWindow';
import explicitPermissions from './util/explicitPermissions';
import injectCSP from './util/injectCSP';
import './util/windowBehaviors';
import safeAttachWebview from './util/safeAttachWebview';
import safeNavigate from './util/safeNavigate';
import safeOpen from './util/safeOpen';

// force sandboxes for each window
app.enableSandbox();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// part of the default electron-forge setup
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

function initialize() {
  explicitPermissions();
  injectCSP();
  createWindow();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initialize);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

app.on('web-contents-created', (_event, contents) => {
  contents.on('will-attach-webview', safeAttachWebview);

  contents.on('will-navigate', safeNavigate);

  contents.setWindowOpenHandler(safeOpen);
});

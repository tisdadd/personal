> [Up One Level](../readme.md)

# onDataUpdated

The `onDataUpdated` ipc process. By registering this with the frontend, we can send a message elsewhere using the name and the renderer knows how to use it. Example `window.webContents.send(onDataUpdatedProcessName, updatedData);` where window is an instance of `BrowserWindow` and onDataUpdatedProcessName is the string from `onDataUpdated.processName.ts`.

- onDataUpdated.preloadRegistration.ts - The script that registers this IPC process on the preload (renderer) process.
- onDataUpdated.processName.ts - The string name of this IPC process.
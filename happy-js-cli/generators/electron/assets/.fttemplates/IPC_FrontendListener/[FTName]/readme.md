> [Up One Level](../readme.md)

# [FTName]

The `[FTName]` ipc process. By registering this with the frontend, we can send a message elsewhere using the name and the renderer knows how to use it. Example `window.webContents.send([FTName]ProcessName, updatedData);` where window is an instance of `BrowserWindow` and [FTName]ProcessName is the string from `[FTName].processName.ts`.

- [FTName].preloadRegistration.ts - The script that registers this IPC process on the preload (renderer) process.
- [FTName].processName.ts - The string name of this IPC process.
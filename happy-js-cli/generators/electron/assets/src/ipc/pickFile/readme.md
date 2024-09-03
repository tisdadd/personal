> [Up One Level](../readme.md)

# pickFile

The `pickFile` ipc process. Used to pick a CSV file to upload to NeDB. Additionally, it calls the onDataUpdated in the renderer process once it completes with all the data now in the database.

- pickFile.backendRegistration.ts - The script that registers this IPC process on the backend (main) process.
- pickFile.preloadRegistration.ts - The script that registers this IPC process on the preload (renderer) process.
- pickFile.processName.ts - The string name of this IPC process.
- pickFile.ts - The logic for this process.
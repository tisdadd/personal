> [Up One Level](../readme.md)

# ipc

Inter Process Communication stuff goes here. Use the [folder templates](https://github.com/Huuums/vscode-folder-templates) that start with IPC to generate easily.

- [editData/](editData/readme.md) - Part of the example application - for editing part of an NeDB document.
- [getData/](getData/readme.md) - Part of the example application - for getting all of the NeDB data.
- [onDataUpdated/](onDataUpdated/readme.md) - Part of the example application - alerts when data was updated.
- [pickFile/](pickFile/readme.md) - Part of the example application - for selecting a CSV to process into NeDB, then uses onDataUpdated to send full database to UI if subscribed.
- [resetDatabase/](resetDatabase/readme.md) - Part of the example application - for resetting the NeDB database.
- BackendRegistrationParameter.type.ts - The typescript type for the BackendRegistrationParameters used in the ipc processes `*.backendRegistration.ts`
- backendRegistrationScript.ts - A script generated to register backend processes with.
- BaseBackendRegistrationParameter.type.ts - The typescript type for what is passed to the backendRegistrationScript before it processes more for the *.backendRegistration.ts scripts.
- FrontendCallbackParameter.type.ts - The type of the frontend callback parameters.
- generateIpcRegistrationScript.ts - Generates the `backendRegistrationScript.ts`, `preloadRegistrationScript.ts`, and `../types/window.d.ts` files.
- PreloadRegistrationParameter.type.ts - Parameter type used for the preload registrations.
- preloadRegistrationScript.ts - Generated for registering with the preload process.
- validateSender.ts - Validates that the IPC message came from an expected host.
> [Up One Level](../readme.md)

# forgePlugins

Plugins for the electron forge infrastructure, utilized in the [forge config](../../forge.config.ts).

- CleanExtraData.ts - Cleans up extra files after the packaging process
- GenerateElectronegativityReport.js - Runs `npm run generateElectronegativity` as the import doesn't work right and screws up official plugin.
- RunGeneratorScript.ts - Runs the `../ipc/generateIpcRegistrationScript.ts` to get easy IPC registrations.
> [Up One Level](../readme.md)

# src

The main source code of the application.

- app.controller.spec.ts - Tests for the app controller
- app.controller.ts - The root [controller](https://docs.nestjs.com/controllers) of the application, acts as the index (hit root of the API to see).
- app.module.ts - The root [module](https://docs.nestjs.com/modules) of the application. Everything else ends up registered here eventually if using the CLI.
- app.service.ts - The root [provider](https://docs.nestjs.com/providers) of the application. It does the functionality/utility for the service, and is injectable.
- main.ts - The entry point to the application.
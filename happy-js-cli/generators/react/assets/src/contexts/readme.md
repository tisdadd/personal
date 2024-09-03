> [Up One Level](../readme.md)

# Contexts

This is the place for custom contexts for use throughout the application, including their related Providers, Higher Order Components, and Hooks as needed. Should your project require less granular control, and more application wide for everything please consider looking into [recoil](https://recoiljs.org/) and [redux](https://redux.js.org/). Also, please document naming conventions utilized if needed for state management.

- [LogContext/](LogContext/readme.md) - A simple context for logging. Initially provides just to the console, and the ability to disable. The provider utility functions should be updated as needed on a per project basis.
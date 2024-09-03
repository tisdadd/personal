> [Up One Level](../readme.md)

# Components

Components used throughout the application. Note that using RootContexts and RootLayout allows for pages to easily share context, and for Storybook to have an easy sharing as well.

- DrawerAppBar.tsx - Sample from MUI site edited for demo to use react-router-dom link and get parts from the navItems.tsx.
- navItems.tsx - An array of items defining where to go in the app.
- RootContexts.tsx - A place to put the root context providers.
- RootLayout.tsx - A place to put the root layout components.
- theme.ts - A theme for the Material UI system. Note that, in a real application, you may want it much more fleshed out for your own customizations, with default styles if different from the material defaults.
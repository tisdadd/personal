> [Up One Level](../readme.md)

# mainInit util

Functions to help keep mainInit base clean.

- createWindow.ts - Creates and loads the browser window(s).
- explicitPermissions.ts - Denies all permissions by default to the renderer, must explicitly list allowed
- injectCSP.ts - Inject the Content Security Policy headers when not in development
- safeAttachWebview.ts - Disables launching extra web views by default through the `<webview>` tag.
- safeNavigate.ts - Force explicit listing external sites to navigate to.
- safeOpen.ts - Open external urls that are listed.
- windowBehaviors.ts - Handle extra window behavior to act more like mac/windows on the right platforms.
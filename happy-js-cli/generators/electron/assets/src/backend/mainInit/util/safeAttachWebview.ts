function safeAttachWebview(event: Event, webPreferencesIn: Electron.WebPreferences) {
  const webPreferences = webPreferencesIn;
  // Strip away preload scripts if unused or verify their location is legitimate
  delete webPreferences.preload;

  // Disable Node.js integration
  webPreferences.nodeIntegration = false;

  // Verify URL being loaded
  // if (!params.src.startsWith('https://example.com/')) {
  event.preventDefault();
  // }
}

export default safeAttachWebview;

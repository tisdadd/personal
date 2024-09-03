import {
  session,
} from 'electron';

// mostly from https://github.com/reZach/secure-electron-template/blob/master/app/electron/main.js
function handlePermissionRequest(
  webContents: Electron.WebContents,
  permission: string,
  permCallback: (permissionGranted: boolean)=>void,
) {
  // Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest
  const allowedPermissions: string[] = [];

  if (allowedPermissions.includes(permission)) {
    permCallback(true); // Approve permission request
  } else {
    // want to record permissions being requested
    // eslint-disable-next-line no-console
    console.error(
      `The application tried to request permission for '${permission}'. This permission was not in the allowed permissions and has been blocked.`,
    );

    permCallback(false); // Deny
  }
}

function explicitPermissions() {
  session.defaultSession.setPermissionRequestHandler(handlePermissionRequest);
}

export default explicitPermissions;

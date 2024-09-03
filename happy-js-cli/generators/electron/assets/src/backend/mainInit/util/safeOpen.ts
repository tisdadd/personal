import { HandlerDetails, shell } from 'electron';

function isSafeForExternalOpen(url: string) {
  const allowedExternalOpening: string[] = [
    'https://reactjs.org/',
  ];
  return allowedExternalOpening.includes(url);
}

function safeOpen({ url }: HandlerDetails): {
  action: 'deny'
} {
  // In this example, we'll ask the operating system
  // to open this event's url in the default browser.
  //
  // See the following item for considerations regarding what
  // URLs should be allowed through to shell.openExternal.
  if (isSafeForExternalOpen(url)) {
    setImmediate(() => {
      // Disabled as recommendation is to review - we by default are denying all.
      // if it reaches this point, we are ok with it
      shell.openExternal(url); /* eng-disable OPEN_EXTERNAL_JS_CHECK */
    });
  } else {
    // want to record permissions being requested
    // eslint-disable-next-line no-console
    console.error(
      `The application tried to open '${url}'. This url was not in the allowed urls and has been blocked.`,
    );
  }

  // generally, don't open unless it is explicitly granted
  return { action: 'deny' };
}

export default safeOpen;

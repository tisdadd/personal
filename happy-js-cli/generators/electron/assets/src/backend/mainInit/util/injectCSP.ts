import { session } from 'electron';

function injectCSP() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const contentUrl = '\'self\'';
  const contentSecurityPolicy = isDevelopment ? '' : `
  default-src ${contentUrl};
  base-uri ${contentUrl};
  font-src ${contentUrl} data:;
  form-action ${contentUrl};
  frame-ancestors ${contentUrl};
  img-src ${contentUrl} data:;
  object-src ${contentUrl};
  script-src ${contentUrl};
  script-src-attr 'none';
  style-src ${contentUrl};
  upgrade-insecure-requests;
`;

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
      },
    });
  });
}

export default injectCSP;

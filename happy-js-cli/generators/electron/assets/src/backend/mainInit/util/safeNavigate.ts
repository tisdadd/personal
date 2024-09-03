import { URL } from 'url';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
const webpackEntryUrl = new URL(MAIN_WINDOW_WEBPACK_ENTRY);

function safeNavigate(event: Event, navigationUrl: string) {
  const allowedOrigins: string[] = [
    webpackEntryUrl.origin,
  ];

  const parsedUrl = new URL(navigationUrl);

  if (!allowedOrigins.includes(parsedUrl.origin)) {
    event.preventDefault();
    // want to record url being requested
    // eslint-disable-next-line no-console
    console.error(
      `The application tried to navigate to '${navigationUrl}'. This url's origin was not in the allowed origins and has been blocked.`,
    );
  }
}

export default safeNavigate;

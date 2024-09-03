declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const allowedHosts: string[] = [
  new URL(MAIN_WINDOW_WEBPACK_ENTRY).host,
];

if (process.env.INCLUDE_STORYBOOK_WINDOW === 'true') {
  allowedHosts.push(new URL('http://localhost:6006').host);
}

type ValidateSenderParamType = {
  senderFrame: {
    url: string,
  }
};

function validateSender({
  senderFrame: {
    url,
  },
}: ValidateSenderParamType) {
  if (allowedHosts.includes(new URL(url).host)) {
    return true;
  }
  return false;
}

export default validateSender;

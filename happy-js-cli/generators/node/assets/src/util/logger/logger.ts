import log from './util/log';
import error from './util/error';
import warn from './util/warn';
import info from './util/info';

const on: boolean = process.env.DISABLE_LOGGING !== 'true';

const logger = {
  log: (message: any) => {
    log({ on, message });
  },
  error: (message: any) => {
    error({ on, message });
  },
  warn: (message: any) => {
    warn({ on, message });
  },
  info: (message: any) => {
    info({ on, message });
  },
};

export default logger;

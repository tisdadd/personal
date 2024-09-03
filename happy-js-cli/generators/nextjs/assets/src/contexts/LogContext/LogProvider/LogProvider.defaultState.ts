import env from '../../../env';

export default {
  on: env.REACT_APP_DISABLE_LOGGING !== 'true',
};

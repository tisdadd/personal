import LogLevelType from './LogLevelInput.type';

const error = ({ on, message }: LogLevelType) => {
  if (on) {
    // default logging style is console logging
    // eslint-disable-next-line no-console
    console.error(message);
  }
};

export default error;

import LogLevelType from './LogLevelInput.type';

const warn = ({ on, message }: LogLevelType) => {
  if (on) {
    // default logging style is console logging
    // eslint-disable-next-line no-console
    console.warn(message);
  }
};

export default warn;

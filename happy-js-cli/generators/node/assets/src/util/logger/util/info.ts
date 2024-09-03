import LogLevelType from './LogLevelInput.type';

const info = ({ on, message }: LogLevelType) => {
  if (on) {
    // default logging style is console logging
    // eslint-disable-next-line no-console
    console.info(message);
  }
};

export default info;

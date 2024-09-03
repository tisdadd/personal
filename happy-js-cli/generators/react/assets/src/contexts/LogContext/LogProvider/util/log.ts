import LogLevelType from './LogLevelInput.type';

const log = ({ on, message }: LogLevelType) => {
  if (on) {
    // default logging style is console logging
    // eslint-disable-next-line no-console
    console.log(message);
  }
};

export default log;

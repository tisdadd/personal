const log = ({ on, message }) => {
  if (on) {
    // default logging style is console logging
    // eslint-disable-next-line no-console
    console.log(message);
  }
};

export default log;

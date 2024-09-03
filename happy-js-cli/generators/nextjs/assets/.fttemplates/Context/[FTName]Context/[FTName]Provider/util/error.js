const error = ({ on, message }) => {
  if (on) {
    // default logging style is console logging
    // eslint-disable-next-line no-console
    console.error(message);
  }
};

export default error;

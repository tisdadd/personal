const info = ({ on, message }) => {
  if (on) {
    // default logging style is console.logging
    // eslint-disable-next-line no-console
    console.info(message);
  }
};

export default info;

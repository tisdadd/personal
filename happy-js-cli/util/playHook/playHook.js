async function playHook({ generators, hook, data }) {
  // eslint-disable-next-line no-restricted-syntax
  for (const generator of generators) {
    const hookFunction = generator[hook];
    if (hookFunction) {
      // eslint-disable-next-line no-await-in-loop
      await hookFunction(data);
    }
  }
}

export default playHook;

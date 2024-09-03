function generateCliArgValues({ options: optionsIn, args }, argDefinition) {
  const options = optionsIn;
  Object.entries(argDefinition).forEach(([key, { normalizedName, default: defaultValue }]) => {
    options[normalizedName] = args[key] || defaultValue;
  });
}

export default generateCliArgValues;

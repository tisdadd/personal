function generateCliArgTypes({ argFields: argsIn }, argDefinition) {
  const argFields = argsIn;
  Object.entries(argDefinition).forEach(([key, { type }]) => {
    if (type) {
      argFields[key] = type;
    }
  });
}

export default generateCliArgTypes;

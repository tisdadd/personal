const definition = {
  '--include-chakra': {
    description: 'Include Chakra (for NextJS, React, Electron)',
    type: Boolean,
    projectTypes: ['NextJS', 'React', 'Electron'],
    default: false,
    normalizedName: 'includeChakra',
  },
};

export default definition;

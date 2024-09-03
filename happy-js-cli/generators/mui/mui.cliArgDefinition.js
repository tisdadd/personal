const definition = {
  '--include-mui': {
    description: 'Include MUI (Material UI) (for NextJS, React, Electron)',
    type: Boolean,
    projectTypes: ['NextJS', 'React', 'Electron'],
    default: false,
    normalizedName: 'includeMui',
  },
};

export default definition;

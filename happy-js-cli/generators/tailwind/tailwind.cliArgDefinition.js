const definition = {
  '--include-tailwind': {
    description: 'Include Tailwind CSS (for NextJS, React, Electron, Expo through NativeWind)',
    type: Boolean,
    projectTypes: ['NextJS', 'React', 'Electron', 'Expo'],
    default: false,
    normalizedName: 'includeTailwind',
  },
};

export default definition;

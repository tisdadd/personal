const definition = {
  devDependencies: [
    'eslint-plugin-security',
    'eslint-config-airbnb-typescript',
  ],
  dependencies: [
    '@nestjs/throttler',
    '@nestjs/swagger',
    'helmet',
  ],
  removeFiles: [
    'README.md',
  ],
};

export default definition;

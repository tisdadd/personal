export const DEFAULT_PROJECT_TYPE = 'React';

export function setProjectTypeOption({ optionDescriptions, type }) {
  let types = [type];
  if (optionDescriptions['--project-type']) {
    types = [
      ...optionDescriptions['--project-type']
        .replace('Project Type (', '')
        .replace(')', '')
        .split(', '),
      ...types,
    ];
  }
  // eslint-disable-next-line no-param-reassign
  optionDescriptions['--project-type'] = `Project Type (${types.join(', ')})`;
}

import { setProjectTypeOption } from './setProjectTypeOption.js';

describe('setProjectTypeOption', () => {
  test('sets project type option with given type', () => {
    const optionDescriptions = {};
    setProjectTypeOption({ optionDescriptions, type: 'web' });
    expect(optionDescriptions['--project-type']).toBe('Project Type (web)');
  });

  test('adds given type to existing project type option', () => {
    const optionDescriptions = { '--project-type': 'Project Type (mobile)' };
    setProjectTypeOption({ optionDescriptions, type: 'web' });
    expect(optionDescriptions['--project-type']).toBe(
      'Project Type (mobile, web)',
    );
  });

  test('ignores duplicate type in project type option', () => {
    const optionDescriptions = { '--project-type': 'Project Type (web)' };
    setProjectTypeOption({ optionDescriptions, type: 'web' });
    expect(optionDescriptions['--project-type']).toBe(
      'Project Type (web, web)',
    );
  });
});

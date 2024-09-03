import setProjectTypeQuestion from './setProjectTypeQuestion.js';

describe('setProjectTypeQuestion function', () => {
  it('should add the choice to the existing projectType question if it exists', () => {
    const questions = [
      { name: 'anotherQuestion', message: 'Another question?' },
      { name: 'projectType', message: 'Project Type?', choices: ['choice1'] },
    ];
    const options = {
      projectType: 'defaultProjectType',
    };
    const args = {};
    const choice = 'newChoice';

    setProjectTypeQuestion({
      questions, options, args, choice,
    });

    expect(questions[1].choices).toEqual(['choice1', 'newChoice']);
  });

  it("should add a new projectType question if it doesn't exist", () => {
    const questions = [
      { name: 'anotherQuestion', message: 'Another question?' },
    ];
    const options = {
      projectType: 'defaultProjectType',
    };
    const args = {};
    const choice = 'newChoice';

    setProjectTypeQuestion({
      questions, options, args, choice,
    });

    expect(questions.length).toEqual(2);
    expect(questions[0].name).toEqual('projectType');
    expect(questions[0].choices).toEqual(['newChoice']);
  });

  it('should set the default to the options projectType if no args are passed', () => {
    const questions = [
      { name: 'anotherQuestion', message: 'Another question?' },
    ];
    const options = {
      projectType: 'defaultProjectType',
    };
    const args = {};
    const choice = 'newChoice';

    setProjectTypeQuestion({
      questions, options, args, choice,
    });

    expect(questions[0].default).toEqual('defaultProjectType');
  });

  it('should set the default to undefined if --project-type arg is passed', () => {
    const questions = [
      { name: 'anotherQuestion', message: 'Another question?' },
      { name: 'projectType', message: 'Project Type?', choices: ['choice1'] },
    ];
    const options = {
      projectType: 'defaultProjectType',
    };
    const args = {
      '--project-type': true,
    };
    const choice = 'newChoice';

    setProjectTypeQuestion({
      questions, options, args, choice,
    });

    expect(questions[1].default).toBeUndefined();
  });
});

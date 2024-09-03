import setProjectTypeQuestion from './setProjectTypeQuestion/index.js';

function generatePromptQuestions(params, argDefinition) {
  const { questions, args } = params;
  Object.entries(argDefinition).forEach(([key, {
    description, projectTypes, normalizedName, default: defaultValue, type,
  }]) => {
    if (key === '--project-type') {
      setProjectTypeQuestion({ ...params, choice: description });
    } else {
      const question = {
        when: ({ projectType }) => !args[key] && projectTypes.indexOf(projectType) > -1,
        name: normalizedName,
        message: description,
        default: defaultValue,
      };
      if (type === Boolean) {
        question.type = 'confirm';
      }
      questions.push(question);
    }
  });
}

export default generatePromptQuestions;

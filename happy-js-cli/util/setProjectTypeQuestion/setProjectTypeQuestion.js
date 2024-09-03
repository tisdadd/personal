function setProjectTypeQuestion({
  questions, options, args, choice,
}) {
  const question = questions.find(
    ({ name }) => name === 'projectType',
  );

  if (question) {
    question.choices.push(choice);
  } else {
    questions.unshift({
      when: !args['--project-type'],
      type: 'list',
      name: 'projectType',
      message: 'Project Type?',
      choices: [choice],
      default: options.projectType,
    });
  }
}

export default setProjectTypeQuestion;

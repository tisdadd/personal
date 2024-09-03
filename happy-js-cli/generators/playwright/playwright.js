export default function getHooks() {
  return {
    priorityIndex: 10,
    cliOptionDescriptions({ optionDescriptions }) {
      optionDescriptions['--enable-playwright'] = 'Enable Playwright';
    },
    cliArgFields({ argFields }) {
      argFields['--enable-playwright'] = Boolean;
    },
    cliOptions({ options, args }) {
      options.enablePlaywright = args['--enable-playwright'] || false;
    },
    promptQuestions({ questions, options, args }) {
      questions.push({
        when: ({ projectType: type }) => !args['--enable-playwright']
          && (type === 'React' || type === 'NextJS'),
        name: 'enablePlaywright',
        message: 'Enable Playwright?',
        default: options.enablePlaywright,
      });
    },
  };
}

import { setProjectTypeOption } from './setProjectTypeOption/index.js';

function generateOptionDescriptions({ optionDescriptions: optionsIn }, argDefinition) {
  const optionDescriptions = optionsIn;

  Object.entries(argDefinition).forEach(([key, { description }]) => {
    if (description) {
      if (key !== '--project-type') {
        optionDescriptions[key] = description;
      } else {
        setProjectTypeOption({ optionDescriptions, type: description });
      }
    }
  });
}

export default generateOptionDescriptions;

import deleteProjectFiles from '../../../util/deleteProjectFiles.js';
import definition from '../tailwind.definition.js';

async function reactCleanup({ finalDirectory }) {
  const removeFiles = [
    ...definition.removeFiles,
    'src/views/DefaultReactView/DefaultReactView.css',
    'src/views/DefaultReactView/components/Logo/Logo.css',
  ];

  deleteProjectFiles(finalDirectory, removeFiles);
}

export default reactCleanup;

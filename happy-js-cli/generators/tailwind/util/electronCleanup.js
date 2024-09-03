import deleteProjectFiles from '../../../util/deleteProjectFiles.js';
import definition from '../tailwind.definition.js';

async function electronCleanup({ finalDirectory }) {
  const removeFiles = [
    ...definition.removeFiles,
    'src/ui/views/DefaultReactView/DefaultReactView.css',
    'src/ui/views/DefaultReactView/components/Logo/Logo.css',
  ];

  deleteProjectFiles(finalDirectory, removeFiles);
}

export default electronCleanup;

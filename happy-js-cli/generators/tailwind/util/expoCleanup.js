import deleteProjectFiles from '../../../util/deleteProjectFiles.js';
import definition from '../tailwind.definition.js';

async function electronCleanup({ finalDirectory }) {
  const removeFiles = [
    ...definition.removeFiles,
    'src/views/DefaultExpoView/DefaultExpoView.styles.ts',
    'src/views/DefaultReactView/DefaultReactView.styles.ts',
    'src/views/DefaultReactView/components/Logo/Logo.styles.ts',
  ];

  deleteProjectFiles(finalDirectory, removeFiles);
}

export default electronCleanup;

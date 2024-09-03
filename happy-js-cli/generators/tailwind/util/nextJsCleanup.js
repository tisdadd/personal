import { fs } from 'zx';
import { join } from 'path';
import deleteProjectFiles from '../../../util/deleteProjectFiles.js';
import definition from '../tailwind.definition.js';

async function nextJsCleanup({ finalDirectory }) {
  const isUsingSrc = fs.existsSync(join(finalDirectory, 'src', 'pages'));
  const perceivedProjectRoot = isUsingSrc ? join(finalDirectory, 'src') : finalDirectory;

  if (isUsingSrc) {
    await fs.move(
      join(finalDirectory, 'styles'),
      join(perceivedProjectRoot, 'styles'),
      {
        overwrite: true,
      },
    );
  }

  const removeFiles = [
    ...definition.removeFiles,
    'src/views/DefaultNextView/DefaultNextView.module.css',
    'src/views/DefaultNextView/components/Logo/Logo.module.css',
  ];

  deleteProjectFiles(finalDirectory, removeFiles);
}

export default nextJsCleanup;

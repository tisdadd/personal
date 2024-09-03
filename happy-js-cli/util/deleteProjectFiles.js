import { fs } from 'zx';
import { join } from 'path';

function deleteProjectFiles(rootDir, fileArray) {
  fileArray.forEach((filePath) => {
    const toDelete = join(rootDir, filePath);
    if (fs.existsSync(toDelete)) {
      if (fs.lstatSync(toDelete).isDirectory()) {
        fs.rmSync(toDelete, { recursive: true });
      } else {
        fs.rmSync(toDelete);
      }
    }
  });
}

export default deleteProjectFiles;

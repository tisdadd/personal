import { fs } from 'zx';
import jsonFormat from 'json-format';

async function updateJsonFile(filePath, replacementFunction) {
  const json = await fs.readJSON(filePath);
  replacementFunction(json);
  await fs.writeFile(filePath, jsonFormat(json, { type: 'space' }));
}

export default updateJsonFile;

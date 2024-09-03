import { fs } from 'zx';

async function replaceFileText(filePath, textToReplaceOrRegex, replacementText) {
  let fileText = await fs.readFile(filePath, 'utf8');
  fileText = fileText.replace(textToReplaceOrRegex, replacementText);
  await fs.writeFile(filePath, fileText);
}

export default replaceFileText;

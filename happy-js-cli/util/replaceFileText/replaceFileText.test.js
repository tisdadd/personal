import { jest } from '@jest/globals';

const readFile = jest.fn()
const writeFile = jest.fn()

jest.unstable_mockModule('zx', () => ({
    fs: {
        readFile,
        writeFile
    }
}));

const {default: replaceFileText} = await import('./replaceFileText.js');

describe('replaceFileText', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should replace the specified text in a file', async () => {
    const filePath = '/path/to/file.txt';
    const textToReplace = 'hello';
    const replacementText = 'hi';
    const fileText = `This is a sample file with the text "${textToReplace}".`;
    const expectedFileText = `This is a sample file with the text "${replacementText}".`;

    readFile.mockResolvedValue(fileText)
    writeFile.mockResolvedValue()

    // Call the function.
    await replaceFileText(filePath, textToReplace, replacementText);

    // Verify that the file was read and written with the expected arguments.
    expect(readFile).toHaveBeenCalledWith(filePath, 'utf8');
    expect(writeFile).toHaveBeenCalledWith(filePath, expectedFileText);
  });

  it('should replace the specified regex pattern in a file', async () => {
    const filePath = '/path/to/file.txt';
    const regexPattern = /hel+o/g;
    const replacementText = 'hi';
    const fileText = `This is a sample file with the text "hello", and also "helo", and "helllo".`;
    const expectedFileText = `This is a sample file with the text "${replacementText}", and also "${replacementText}", and "${replacementText}".`;

    readFile.mockResolvedValue(fileText)
    writeFile.mockResolvedValue()

    // Call the function.
    await replaceFileText(filePath, regexPattern, replacementText);

    // Verify that the file was read and written with the expected arguments.
    expect(readFile).toHaveBeenCalledWith(filePath, 'utf8');
    expect(writeFile).toHaveBeenCalledWith(filePath, expectedFileText);
  });
});

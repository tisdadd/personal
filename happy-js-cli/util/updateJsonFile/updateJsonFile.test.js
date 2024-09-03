import { jest } from '@jest/globals';
import jsonFormat from 'json-format';

const readJSON = jest.fn()
const writeFile = jest.fn()

jest.unstable_mockModule('zx', () => ({
    fs: {
        readJSON,
        writeFile
    }
}));

const {default: updateJsonFile} = await import('./updateJsonFile.js');

describe('updateJsonFile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the JSON object in a file', async () => {
    const filePath = '/path/to/file.json';
    const json = { name: 'Alice', age: 30 };
    const updatedJson = { name: 'Bob', age: 35 };
    const replacementFunction = jest.fn().mockImplementation((json) => {
      json.name = 'Bob';
      json.age = 35;
    });
    const expectedJsonText = jsonFormat(updatedJson, { type: 'space' });

    readJSON.mockResolvedValue(json)
    writeFile.mockResolvedValue()

    await updateJsonFile(filePath, replacementFunction);

    expect(readJSON).toHaveBeenCalledWith(filePath);
    expect(replacementFunction).toHaveBeenCalledWith(json);
    expect(writeFile).toHaveBeenCalledWith(filePath, expectedJsonText);
  });

  it('should not update the JSON object if the replacement function does not modify it', async () => {
    const filePath = '/path/to/file.json';
    const json = { name: 'Alice', age: 30 };
    const replacementFunction = jest.fn();
    const expectedJsonText = jsonFormat(json, { type: 'space' });

    readJSON.mockResolvedValue(json)
    writeFile.mockResolvedValue()

    await updateJsonFile(filePath, replacementFunction);

    expect(readJSON).toHaveBeenCalledWith(filePath);
    expect(replacementFunction).toHaveBeenCalledWith(json);
    expect(writeFile).toHaveBeenCalledWith(filePath, expectedJsonText);
  });
});

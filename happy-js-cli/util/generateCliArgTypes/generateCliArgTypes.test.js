import generateCliArgTypes from './generateCliArgTypes.js';

describe('generateCliArgTypes', () => {
  it('should add new fields to an empty argFields object', () => {
    const argDefinition = {
      foo: { type: 'string' },
      bar: { type: 'number' },
    };
    const expectedArgFields = {
      foo: 'string',
      bar: 'number',
    };

    const actualArgFields = {};
    generateCliArgTypes({ argFields: actualArgFields }, argDefinition);

    expect(actualArgFields).toEqual(expectedArgFields);
  });

  it('should update existing fields in argFields object', () => {
    const argFields = {
      foo: 'boolean',
      bar: 'number',
    };
    const argDefinition = {
      foo: { type: 'string' },
      bar: { type: 'string' },
    };
    const expectedArgFields = {
      foo: 'string',
      bar: 'string',
    };

    generateCliArgTypes({ argFields }, argDefinition);

    expect(argFields).toEqual(expectedArgFields);
  });

  it('should not modify argFields if argDefinition is empty', () => {
    const argFields = {
      foo: 'boolean',
      bar: 'number',
    };
    const argDefinition = {};

    generateCliArgTypes({ argFields }, argDefinition);

    expect(argFields).toEqual(argFields);
  });

  it('should not modify argFields if argDefinition does not have type field', () => {
    const argFields = {
      foo: 'boolean',
      bar: 'number',
    };
    const argDefinition = {
      foo: {},
      bar: {},
    };

    generateCliArgTypes({ argFields }, argDefinition);

    expect(argFields).toEqual(argFields);
  });
});

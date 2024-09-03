import { describe, expect, it } from '@jest/globals';

import { Column } from 'ka-table/models';
import { DataType } from 'ka-table';
import columnParser from './columnParser';

describe('columnParser', () => {
  it('parses an array of object to get columns', () => {
    const data = [{ apple: 1, banana: 'tada' }];

    const expected: Column[] = [{
      key: 'apple',
      title: 'Apple',
      dataType: DataType.Number,
      width: 200,
    }, {
      key: 'banana',
      title: 'Banana',
      dataType: DataType.String,
      width: 200,
    }];

    const result = columnParser(data);

    expect(result).toEqual(expected);
  });
});

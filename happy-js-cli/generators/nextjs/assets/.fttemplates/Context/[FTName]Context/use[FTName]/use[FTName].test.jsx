import React from 'react';
import { render } from '@testing-library/react';

import defaultValue from '../[FTName]Context.defaultValue';
import use[FTName] from './use[FTName]';

describe('use[FTName]() Hook', () => {
  it('Gives some default values', () => {
    let valuesGiven;

    function Sample() {
      valuesGiven = use[FTName]();
      return <div>Test</div>;
    }

    render(<Sample />);

    Object.entries(defaultValue).forEach(([key, value]) => {
      expect(valuesGiven[key]).toStrictEqual(value);
    });
  });
});

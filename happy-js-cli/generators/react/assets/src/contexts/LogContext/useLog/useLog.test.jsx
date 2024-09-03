import React from 'react';
import { render } from '@testing-library/react';

import defaultValue from '../LogContext.defaultValue';
import useLog from './useLog';

describe('useLog() Hook', () => {
  it('Gives some default values', () => {
    let valuesGiven;

    function Sample() {
      valuesGiven = useLog();
      return <div>Test</div>;
    }

    render(<Sample />);

    Object.entries(defaultValue).forEach(([key, value]) => {
      // safe to disable - the key is not user provided - default state is programmed
      // eslint-disable-next-line security/detect-object-injection
      expect(valuesGiven[key]).toStrictEqual(value);
    });
  });
});

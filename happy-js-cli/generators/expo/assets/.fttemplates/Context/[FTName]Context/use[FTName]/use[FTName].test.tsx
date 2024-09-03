import React from 'react';
import { View, Text } from 'react-native';
import { render } from '@testing-library/react-native';

import defaultValue from '../[FTName]Context.defaultValue';
import use[FTName] from './use[FTName]';

describe('use[FTName]() Hook', () => {
  it('Gives some default values', () => {
    let valuesGiven: any;

    function Sample() {
      valuesGiven = use[FTName]();
      return <View><Text>Test</Text></View>;
    }

    render(<Sample />);

    Object.entries(defaultValue).forEach(([key, value]) => {
      // safe to disable - the key is not user provided - default state is programmed
      // eslint-disable-next-line security/detect-object-injection
      expect(valuesGiven[key]).toStrictEqual(value);
    });
  });
});

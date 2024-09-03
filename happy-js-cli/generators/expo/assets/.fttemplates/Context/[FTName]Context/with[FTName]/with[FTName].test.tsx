import React from 'react';
import { View, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import with[FTName] from './with[FTName]';

describe('with[FTName](Component)', () => {
  it('Renders its children', () => {
    const testText = 'Testing';

    function Sample() {
      return <View><Text>{testText}</Text></View>;
    }

    const Wrapped = with[FTName](Sample);

    render(<Wrapped />);

    expect(screen.getByText(testText)).toBeOnTheScreen();
  });

  // it('Attaches some default props', () => {
  //   let propsPassed: any;

  //   function Sample(props: ReactPropTypes) {
  //     propsPassed = props;
  //     return <div>Test</div>;
  //   }

  //   const Wrapped = with[FTName](Sample);

  //   render(<Wrapped />);

  //   Object.entries(defaultValue).forEach(([key, value]) => {
  //     expect(propsPassed.[FTName][key]).toStrictEqual(value);
  //   });
  // });
});

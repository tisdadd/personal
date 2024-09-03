import React from 'react';
import { View, Text } from 'react-native';
import {
  render,
  screen,
  // waitFor,
  // fireEvent
} from '@testing-library/react-native';
// import simulant from "simulant";

import LogContext from '../LogContext';
import defaultState from './LogProvider.defaultState';
import LogProvider from './LogProvider';

describe('<LogProvider />', () => {
  it('Renders its children', () => {
    const testText = 'Testing';

    render(
      <LogProvider>
        <View><Text>{testText}</Text></View>
      </LogProvider>,
    );

    expect(screen.getByText(testText)).toBeOnTheScreen();
  });

  it('Has some default values', () => {
    let valuePassed: any;

    render(
      <LogProvider>
        <LogContext.Consumer>
          {(value) => {
            valuePassed = value;
            return <View>Test</View>;
          }}
        </LogContext.Consumer>
      </LogProvider>,
    );

    Object.entries(defaultState).forEach(([key, value]) => {
      // safe to disable - the key is not user provided - default state is programmed
      // eslint-disable-next-line security/detect-object-injection
      expect(valuePassed[key]).toStrictEqual(value);
    });
  });

  // it("with state of on to be toggled on/off through button combo", async () => {
  //   let valuePassed;
  //   const testText = "Testing";

  //   const { getByText } = render(
  //     <LogProvider>
  //       <LogContext.Consumer>
  //         {(value) => {
  //           valuePassed = value;
  //           return <div>{testText}</div>;
  //         }}
  //       </LogContext.Consumer>
  //     </LogProvider>
  //   );
  //   const element = getByText(testText);
  //   const originalOn = valuePassed.on;

  //   const fullSequence = () => {
  //     simulant.fire(element, "keydown", { key: "Shift" });
  //     simulant.fire(element, "keypress", { key: "Shift" });

  //     simulant.fire(element, "keydown", { key: "m" });
  //     simulant.fire(element, "keypress", { key: "m" });

  //     simulant.fire(element, "keydown", { key: "z" });

  //     simulant.fire(element, "keyup", { key: "Shift" });
  //     simulant.fire(element, "keyup", { key: "m" });
  //     simulant.fire(element, "keyup", { key: "z" });
  //   };

  //   fullSequence();

  //   await waitFor(() => {
  //     expect(valuePassed.on).toBe(!originalOn);
  //   });

  //   fullSequence();

  //   await waitFor(() => {
  //     expect(valuePassed.on).toBe(originalOn);
  //   });
  // });
});

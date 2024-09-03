import React from 'react';
import {
  render,
  screen,
  // waitFor,
  // fireEvent
} from '@testing-library/react';
// import simulant from "simulant";

import [FTName]Context from '../[FTName]Context';
import defaultState from './[FTName]Provider.defaultState';
import [FTName]Provider from './[FTName]Provider';

describe('<[FTName]Provider />', () => {
  it('Renders its children', () => {
    const testText = 'Testing';

    render(
      <[FTName]Provider>
        <div>{testText}</div>
      </[FTName]Provider>,
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('Has some default values', () => {
    let valuePassed: any;

    render(
      <[FTName]Provider>
        <[FTName]Context.Consumer>
          {(value) => {
            valuePassed = value;
            return <div>Test</div>;
          }}
        </[FTName]Context.Consumer>
      </[FTName]Provider>,
    );

    Object.entries(defaultState).forEach(([key, value]) => {
      expect(valuePassed[key]).toStrictEqual(value);
    });
  });

  // it("with state of on to be toggled on/off through button combo", async () => {
  //   let valuePassed;
  //   const testText = "Testing";

  //   const { getByText } = render(
  //     <[FTName]Provider>
  //       <[FTName]Context.Consumer>
  //         {(value) => {
  //           valuePassed = value;
  //           return <div>{testText}</div>;
  //         }}
  //       </[FTName]Context.Consumer>
  //     </[FTName]Provider>
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

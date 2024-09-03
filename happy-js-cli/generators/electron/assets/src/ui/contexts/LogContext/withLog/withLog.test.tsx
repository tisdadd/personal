import React from 'react';
import { describe, expect, it } from '@jest/globals';

import { render, screen } from '@testing-library/react';
import withLog from './withLog';

describe('withLog(Component)', () => {
  it('Renders its children', () => {
    const testText = 'Testing';

    function Sample() {
      return <div>{testText}</div>;
    }

    const Wrapped = withLog(Sample);

    render(<Wrapped />);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  // it('Attaches some default props', () => {
  //   let propsPassed: any;

  //   function Sample(props: ReactPropTypes) {
  //     propsPassed = props;
  //     return <div>Test</div>;
  //   }

  //   const Wrapped = withLog(Sample);

  //   render(<Wrapped />);

  //   Object.entries(defaultValue).forEach(([key, value]) => {
  //     expect(propsPassed.Log[key]).toStrictEqual(value);
  //   });
  // });
});

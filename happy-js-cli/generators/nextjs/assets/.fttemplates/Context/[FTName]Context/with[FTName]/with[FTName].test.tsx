import React from 'react';
import { render, screen } from '@testing-library/react';
import with[FTName] from './with[FTName]';

describe('with[FTName](Component)', () => {
  it('Renders its children', () => {
    const testText = 'Testing';

    function Sample() {
      return <div>{testText}</div>;
    }

    const Wrapped = with[FTName](Sample);

    render(<Wrapped />);

    expect(screen.getByText(testText)).toBeInTheDocument();
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

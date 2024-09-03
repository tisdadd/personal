import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { describe, expect, it } from '@jest/globals';
import DefaultReactView from './DefaultReactView';

describe('<LogProvider />', () => {
  it('Renders its children', () => {
    render(
      <MemoryRouter><DefaultReactView /></MemoryRouter>,
    );

    expect(screen.getByText(/learn react/i)).toBeInTheDocument();
  });
});

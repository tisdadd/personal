import React from 'react';
import { render, screen } from '@testing-library/react';
import DefaultReactView from './DefaultReactView';

test('renders learn react link', () => {
  render(<DefaultReactView />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import SecondaryView from './SecondaryView';

test('renders learn react link', () => {
  render(<SecondaryView />);
  const linkElement = screen.getByText(/surprise/i);
  expect(linkElement).toBeInTheDocument();
});

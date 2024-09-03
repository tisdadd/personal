import React from 'react';
import { render, screen } from '@testing-library/react';
import DefaultNextView from './DefaultNextView';

test('renders docs link', () => {
  render(<DefaultNextView />);
  const linkElement = screen.getByText(/Templates/i);
  expect(linkElement).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import [FTName]View from './[FTName]View';

test('renders learn react link', () => {
  render(<[FTName]View />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeOnTheScreen();
});

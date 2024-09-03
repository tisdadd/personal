import { render, screen } from '@testing-library/react';
import App from './App';

test('renders', () => {
  render(<App />);
  // at time of this test, a button to shuffle questions should exist
  const element = screen.queryByText("Shuffle Questions");
  expect(element).toBeInTheDocument();
});

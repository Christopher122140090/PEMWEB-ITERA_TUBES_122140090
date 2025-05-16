import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Product Management text', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Product Management/i);
  expect(linkElements.length).toBeGreaterThan(0);
});

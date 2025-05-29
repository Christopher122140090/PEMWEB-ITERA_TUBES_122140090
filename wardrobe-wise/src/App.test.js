import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Login text', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Login/i);
  expect(linkElements.length).toBeGreaterThan(0);
});

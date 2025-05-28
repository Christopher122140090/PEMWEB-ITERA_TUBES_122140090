import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StockMonitoring from '../StockMonitoring';

test('renders low stock products list', async () => {
  await act(async () => {
    render(<StockMonitoring />);
  });
  expect(screen.getByText(/Stock Monitoring/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText('Product C')).toBeInTheDocument();
    expect(screen.getByText('Product D')).toBeInTheDocument();
  });
});

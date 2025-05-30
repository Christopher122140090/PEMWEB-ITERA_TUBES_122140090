import React from 'react';
import { render, screen } from '@testing-library/react';
import StockMonitoring from '../pages/StockMonitoring';

describe('StockMonitoring Component', () => {
  test('renders Stock Monitoring page', () => {
    render(<StockMonitoring />);
    expect(screen.getByText(/Stock Monitoring/i)).toBeInTheDocument();
  });
});

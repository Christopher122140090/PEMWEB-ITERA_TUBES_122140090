import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import StockMonitoring from '../StockMonitoring';
import * as api from '../../services/api';

jest.mock('../../services/api');

describe('StockMonitoring', () => {
  beforeEach(() => {
    api.getInventory.mockResolvedValue({
      data: [
        { id: 1, name: 'Product A', stock: 2 },
        { id: 2, name: 'Product B', stock: 1 },
      ],
    });
  });

  test('renders low stock products list', async () => {
    render(<StockMonitoring />);
    expect(screen.getByText(/Stock Monitoring/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.getByText('Product B')).toBeInTheDocument();
    });
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductManagement from '../ProductManagement';
import * as api from '../../services/api';

jest.mock('../../services/api');

describe('ProductManagement Component', () => {
  const mockProducts = [
    { id: 1, name: 'Product A', price: '10000', stock: '50' },
    { id: 2, name: 'Product B', price: '15000', stock: '30' },
  ];

  beforeEach(() => {
    api.getProducts.mockResolvedValue({ data: mockProducts });
  });

  test('renders product list', async () => {
    await act(async () => {
      render(<ProductManagement />);
    });
    expect(screen.getByText(/Product Management/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.getByText('Product B')).toBeInTheDocument();
    });
  });

  test('opens add product dialog', async () => {
    await act(async () => {
      render(<ProductManagement />);
    });
    fireEvent.click(screen.getAllByText(/Add Product/i)[0]);
    expect(screen.getAllByText(/Add Product/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  });

  test('opens edit product dialog', async () => {
    await act(async () => {
      render(<ProductManagement />);
    });
    await waitFor(() => screen.getByText('Product A'));
    fireEvent.click(screen.getAllByText(/Edit/i)[0]);
    expect(screen.getByText(/Edit Product/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Product A')).toBeInTheDocument();
  });
});

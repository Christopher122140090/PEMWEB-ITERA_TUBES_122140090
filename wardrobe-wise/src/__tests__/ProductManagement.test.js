import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductManagement from '../pages/ProductManagement';

describe('ProductManagement Component', () => {
  test('renders Product Management page', () => {
    render(<ProductManagement />);
    expect(screen.getByText(/Product Management/i)).toBeInTheDocument();
  });
});

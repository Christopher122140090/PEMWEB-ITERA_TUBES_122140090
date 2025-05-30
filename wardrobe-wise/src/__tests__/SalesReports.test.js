import React from 'react';
import { render, screen } from '@testing-library/react';
import SalesReports from '../pages/SalesReports';

describe('SalesReports Component', () => {
  test('renders Sales Reports page', () => {
    render(<SalesReports />);
    expect(screen.getByText(/Sales Reports/i)).toBeInTheDocument();
  });
});

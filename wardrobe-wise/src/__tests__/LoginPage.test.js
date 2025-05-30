import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';

describe('LoginPage Component', () => {
  test('allows user to input username and password', () => {
    render(<LoginPage />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: 'christopher' } });
    fireEvent.change(passwordInput, { target: { value: 'cronous2407' } });

    expect(usernameInput.value).toBe('christopher');
    expect(passwordInput.value).toBe('cronous2407');
  });
});

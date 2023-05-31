import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../scr/data/pages/logpage/LoginForm';

describe('LoginForm', () => {
  test('disables button when input fields are empty', () => {
    render(<LoginForm />);

    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeDisabled();
  });

  test('enables button when input fields are filled', () => {
    render(<LoginForm />);

    const electrophysiologistInput = screen.getByTestId('electrophysiologistName');
    const surgeonInput = screen.getByTestId('surgeonName');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(electrophysiologistInput, 'John');
    userEvent.type(surgeonInput, 'Jane');

    expect(loginButton).toBeEnabled();
  });
});

// Additional tests for LoginInputField can be added separately
describe('LoginInputField', () => {
  test('updates value when typing', () => {
    render(<LoginInputField />);

    const inputField = screen.getByTestId('inputField');
    userEvent.type(inputField, 'Example text');

    expect(inputField.value).toBe('Example text');
  });
});
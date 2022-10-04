import React from 'react';
import { render, screen } from '@testing-library/react';
import FormPage from './FormPage';

describe('FormPage', () => {
  it('renders FormPage', () => {
    render(<FormPage />);
    expect(screen.getByTestId('form-page')).toBeInTheDocument();
    expect(screen.getByTestId('forms')).toBeInTheDocument();
  });
});

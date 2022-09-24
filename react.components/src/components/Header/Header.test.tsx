import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'components/App/App';

describe('Header', () => {
  it('renders Header', () => {
    render(<App />);
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
    expect(screen.getByText(/main/i)).toBeInTheDocument();
  });
});

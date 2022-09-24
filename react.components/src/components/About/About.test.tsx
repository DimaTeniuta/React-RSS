import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders About', () => {
    render(<About />);
    expect(screen.getByText(/rolling scopes school/i)).toBeInTheDocument();
    expect(screen.getByText(/react course/i)).toBeInTheDocument();
  });
});

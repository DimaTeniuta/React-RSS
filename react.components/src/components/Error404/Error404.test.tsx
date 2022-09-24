import React from 'react';
import { render, screen } from '@testing-library/react';
import Error404 from './Error404';

describe('Error404', () => {
  it('renders Error404', () => {
    const titleTest = 'title test';
    const childrenTest = 'children test';
    render(<Error404 title={titleTest}>{childrenTest}</Error404>);
    expect(screen.getByText(childrenTest)).toBeInTheDocument();
    expect(screen.getByText(childrenTest)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from 'pages/AboutPage';
import ErrorPage from 'pages/ErrorPage';

describe('ModalWindow', () => {
  it('renders AboutPage', () => {
    render(<AboutPage />);
    expect(screen.getByText(/rolling scopes school/i)).toBeInTheDocument();
    expect(screen.getByText(/react course/i)).toBeInTheDocument();
  });

  it('renders Error404', () => {
    const titleTest = '404';
    const childrenTest = 'This is not web page you are looking for';
    render(<ErrorPage />);
    expect(screen.getByText(titleTest)).toBeInTheDocument();
    expect(screen.getByText(childrenTest)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import Header from 'components/Header/Header';
import AppRouter from 'components/AppRouter';

describe('App', () => {
  it('router test', () => {
    render(<App />);
    const aboutLink = screen.getByTestId('about-link');
    const mainLink = screen.getByTestId('main-link');
    userEvent.click(mainLink);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('render Error404 page', () => {
    render(
      <MemoryRouter initialEntries={['/wrongPath']}>
        <Header />
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
  });
});

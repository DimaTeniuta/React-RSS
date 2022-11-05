import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import Header from 'components/Header/Header';
import AppRouter from 'route/AppRouter';

describe('App', () => {
  it('router test', () => {
    render(<App />);
    const aboutLink = screen.getByTestId('aboutLink');
    const mainLink = screen.getByTestId('mainLink');
    const formLink = screen.getByTestId('formLink');
    userEvent.click(mainLink);
    expect(screen.getByTestId('mainPage')).toBeInTheDocument();
    userEvent.click(formLink);
    expect(screen.getByTestId('formPage')).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(screen.getByTestId('modal-test')).toBeInTheDocument();
    const titleTest2 = 'Rolling Scopes School';
    const childrenTest2 = 'React Course';
    expect(screen.getByText(titleTest2)).toBeInTheDocument();
    expect(screen.getByText(childrenTest2)).toBeInTheDocument();
  });

  it('render Error404 page', () => {
    render(
      <MemoryRouter initialEntries={['/wrongPath']}>
        <Header />
        <AppRouter />
      </MemoryRouter>
    );
    const titleTest = '404';
    const childrenTest = 'This is not web page you are looking for';
    expect(screen.getByText(titleTest)).toBeInTheDocument();
    expect(screen.getByText(childrenTest)).toBeInTheDocument();
    expect(screen.getByTestId('modal-test')).toBeInTheDocument();
  });
});

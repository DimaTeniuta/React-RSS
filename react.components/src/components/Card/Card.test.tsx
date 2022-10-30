import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import MainPage from 'components/pages/MainPage/MainPage';
import React from 'react';

describe('Card', () => {
  it('Card renders', async () => {
    render(<App />);
    const main = screen.getByTestId('mainLink');
    userEvent.click(main);

    expect(await screen.findAllByRole('img')).toHaveLength(10);
    expect(await screen.findAllByText(/more details/i)).toHaveLength(10);
    expect(screen.queryByTestId('modalWindowWrap')).not.toBeInTheDocument();
  });

  it('render 30 cards', async () => {
    render(<App />);
    const main = screen.getByTestId('mainLink');
    userEvent.click(main);
    const cards = await screen.findAllByTestId('test-card');
    expect(cards.length).toBe(10);
  });

  it('Cards snapshot', () => {
    const cards = render(<MainPage />);
    expect(cards).toMatchSnapshot();
  });
});

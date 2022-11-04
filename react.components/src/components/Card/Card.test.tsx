import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import React from 'react';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';

describe('Card', () => {
  it('Card renders', async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
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

  it('render separate page', async () => {
    render(<App />);
    const main = screen.getByTestId('mainLink');
    await waitFor(() => {
      userEvent.click(main);
    });
    const btns = await screen.findAllByTestId('cardBtn');
    await waitFor(() => {
      userEvent.click(btns[6]);
      expect(screen.getByTestId('cardPage-test')).toBeInTheDocument();
    });
  });
});

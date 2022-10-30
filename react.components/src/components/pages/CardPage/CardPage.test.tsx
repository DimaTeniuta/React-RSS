import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import React from 'react';

describe('CardPage', () => {
  it('renders CardPage', async () => {
    render(<App />);
    const main = screen.getByTestId('mainLink');
    await waitFor(() => {
      userEvent.click(main);
    });
    const btns = await screen.findAllByTestId('cardBtn');
    await waitFor(() => {
      userEvent.click(btns[6]);
      expect(screen.getByTestId('cardPage-test')).toBeInTheDocument();
      expect(screen.getByAltText('card-image')).toBeInTheDocument();
    });
    await waitFor(() => {
      userEvent.click(screen.getByTestId('BackBtn'));
    });
    await waitFor(() => {
      expect(screen.getByTestId('mainPage')).toBeInTheDocument();
    });
  });
});

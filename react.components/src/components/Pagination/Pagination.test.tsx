import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import React from 'react';

describe('Pagination', () => {
  it('disabled buttons', async () => {
    render(<App />);
    const main = screen.getByTestId('mainLink');
    await waitFor(() => {
      userEvent.click(main);
    });
    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
      expect(screen.getByText('1 / 1000')).toBeInTheDocument();
      expect(screen.getByTestId('firstPageBtn')).toBeDisabled();
      expect(screen.getByTestId('prevPageBtn')).toBeDisabled();
      expect(screen.getByTestId('nextPageBtn')).not.toBeDisabled();
      expect(screen.getByTestId('lastPageBtn')).not.toBeDisabled();
    });

    userEvent.click(screen.getByTestId('nextPageBtn'));
    await waitFor(() => {
      expect(screen.getByText('2 / 1000')).toBeInTheDocument();
      expect(screen.getByTestId('firstPageBtn')).not.toBeDisabled();
      expect(screen.getByTestId('prevPageBtn')).not.toBeDisabled();
      expect(screen.getByTestId('nextPageBtn')).not.toBeDisabled();
      expect(screen.getByTestId('lastPageBtn')).not.toBeDisabled();
    });

    userEvent.click(screen.getByTestId('prevPageBtn'));
    await waitFor(() => {
      expect(screen.getByTestId('firstPageBtn')).toBeDisabled();
      expect(screen.getByTestId('prevPageBtn')).toBeDisabled();
      expect(screen.getByTestId('nextPageBtn')).not.toBeDisabled();
      expect(screen.getByTestId('lastPageBtn')).not.toBeDisabled();
    });

    userEvent.click(screen.getByTestId('lastPageBtn'));
    await waitFor(() => {
      expect(screen.getByTestId('firstPageBtn')).not.toBeDisabled();
      expect(screen.getByTestId('prevPageBtn')).not.toBeDisabled();
      expect(screen.getByTestId('nextPageBtn')).toBeDisabled();
      expect(screen.getByTestId('lastPageBtn')).toBeDisabled();
    });

    userEvent.click(screen.getByTestId('firstPageBtn'));
    await waitFor(() => {
      expect(screen.getByTestId('firstPageBtn')).toBeDisabled();
      expect(screen.getByTestId('prevPageBtn')).toBeDisabled();
      expect(screen.getByTestId('nextPageBtn')).not.toBeDisabled();
      expect(screen.getByTestId('lastPageBtn')).not.toBeDisabled();
    });
  });

  it('disabled all buttons', async () => {
    render(<App />);
    const main = screen.getByTestId('mainLink');
    await waitFor(() => {
      userEvent.click(main);
    });
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'ws';
    userEvent.type(input, testValue);
    userEvent.click(screen.getByTestId('test-search-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('firstPageBtn')).toBeDisabled();
      expect(screen.getByTestId('prevPageBtn')).toBeDisabled();
      expect(screen.getByTestId('nextPageBtn')).toBeDisabled();
      expect(screen.getByTestId('lastPageBtn')).toBeDisabled();
    });
  });
});

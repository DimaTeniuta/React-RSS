import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main';
import userEvent from '@testing-library/user-event';

const localStorageMock = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string): string | null {
      return store[key];
    },

    setItem(key: string, value: string): void {
      store[key] = value;
    },

    clear(): void {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Main', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders Main', () => {
    render(<Main />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('should download current data', async () => {
    render(<Main />);
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    const btn = screen.getByTestId('test-search-btn');
    userEvent.click(btn);
    const card = await screen.findByText(/blank paper and pencil/i);
    expect(card).toBeInTheDocument();
  });

  it('get value from localStorage', () => {
    const { unmount } = render(<Main />);
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    const btn = screen.getByTestId('test-search-btn');
    userEvent.click(btn);
    unmount();
    const result = JSON.parse(localStorage.getItem('lastRequest') as string);
    expect(result).toBe(testValue);
  });
});
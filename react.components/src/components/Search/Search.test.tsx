import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';
import { localStorageMock } from 'data/mockData';
import userEvent from '@testing-library/user-event';
import { setupStore } from 'store/store';
import { Provider } from 'react-redux';
import App from 'App';
import axios from 'axios';

jest.mock('axios');
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
const store = setupStore();

describe('Search', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders search', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.queryByTestId('clearBtn')).toBeInTheDocument();
  });

  it('save input value in localStorage', () => {
    const { unmount } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    userEvent.click(screen.getByTestId('test-search-btn'));
    unmount();
    expect(localStorage.getItem('inputValue')).toEqual(JSON.stringify(testValue));
  });

  it('get value in input from localStorage', () => {
    const { unmount } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    userEvent.click(screen.getByTestId('test-search-btn'));
    unmount();
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('clear input', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const btn = screen.getByTestId('clearBtn');
    userEvent.click(btn);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('');
  });

  it('send request using keyboard', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const main = screen.getByTestId('mainLink');
    userEvent.click(main);
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    userEvent.keyboard('[Enter]');
    expect(axios.get).toBeCalledTimes(2);
  });
});

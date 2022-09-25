import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { localStorageMock } from 'data/mockData';
import MainPage from './MainPage';

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Main', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders Main', () => {
    render(<MainPage />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('should download current data', async () => {
    render(<MainPage />);
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    const btn = screen.getByTestId('test-search-btn');
    userEvent.click(btn);
    const card = await screen.findByText(/blank paper and pencil/i);
    expect(card).toBeInTheDocument();
  });

  it('get value from localStorage', () => {
    const { unmount } = render(<MainPage />);
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    const btn = screen.getByTestId('test-search-btn');
    userEvent.click(btn);
    unmount();
    const result = JSON.parse(localStorage.getItem('inputValue') as string);
    expect(result).toBe(testValue);
  });
});

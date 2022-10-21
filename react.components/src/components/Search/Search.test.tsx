import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';
import { localStorageMock } from 'data/mockData';
import userEvent from '@testing-library/user-event';

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
const mockLoader = jest.fn();
const mockFn = jest.fn();

describe('Search', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders search', () => {
    render(<Search setData={mockFn} showLoader={mockLoader} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.queryByTestId('clear-btn')).toBeInTheDocument();
  });

  it('save input value in localStorage', () => {
    const { unmount } = render(<Search setData={mockFn} showLoader={mockLoader} />);
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    unmount();
    expect(localStorage.getItem('inputValue')).toEqual(JSON.stringify(testValue));
  });

  it('get value in input from localStorage', () => {
    const { unmount } = render(<Search setData={mockFn} showLoader={mockLoader} />);
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    unmount();
    render(<Search setData={mockFn} showLoader={mockLoader} />);
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('clear input', () => {
    render(<Search setData={mockFn} showLoader={mockLoader} />);
    const btn = screen.getByTestId('clear-btn');
    userEvent.click(btn);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('');
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';
import { localStorageMock } from 'data/mockData';
import userEvent from '@testing-library/user-event';

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Search', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders search', () => {
    const mockFn = jest.fn();
    render(<Search getData={mockFn} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.queryByTestId('clear-btn')).toBeInTheDocument();
  });

  it('save input value in localStorage', () => {
    const mockFn = jest.fn();
    const { unmount } = render(<Search getData={mockFn} />);
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    unmount();
    expect(localStorage.getItem('inputValue')).toEqual(JSON.stringify(testValue));
  });

  it('get value in input from localStorage', () => {
    const mockFn = jest.fn();
    const { unmount } = render(<Search getData={mockFn} />);
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    unmount();
    render(<Search getData={mockFn} />);
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('clear input', () => {
    const mockFn = jest.fn();
    render(<Search getData={mockFn} />);
    const btn = screen.getByTestId('clear-btn');
    userEvent.click(btn);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('');
  });
});

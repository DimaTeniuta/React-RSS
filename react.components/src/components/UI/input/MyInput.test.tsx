import React from 'react';
import { render, screen } from '@testing-library/react';
import MyInput from './MyInput';
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

describe('MyInput', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('save input value in localStorage', () => {
    const getInputValue = jest.fn();
    const { unmount } = render(
      <MyInput getValue={getInputValue} type="text" placeholder="Search" autoFocus={true} />
    );
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test-1';
    userEvent.type(input, testValue);
    unmount();
    expect(localStorage.getItem('inputValue')).toEqual(JSON.stringify(testValue));
  });

  it('get value in input from localStorage', () => {
    const getInputValue = jest.fn();
    const { unmount } = render(
      <MyInput getValue={getInputValue} type="text" placeholder="Search" autoFocus={true} />
    );
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    unmount();
    render(<MyInput getValue={getInputValue} type="text" placeholder="Search" autoFocus={true} />);
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('input focus', () => {
    const getInputValue = jest.fn();
    render(<MyInput getValue={getInputValue} type="text" placeholder="Search" autoFocus={true} />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveFocus();
  });
});

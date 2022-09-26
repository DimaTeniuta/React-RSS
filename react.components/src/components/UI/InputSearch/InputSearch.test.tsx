import React from 'react';
import { render, screen } from '@testing-library/react';
import InputSearch from './InputSearch';
import userEvent from '@testing-library/user-event';
import { localStorageMock } from 'data/mockData';

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('InputSearch', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('save input value in localStorage', () => {
    const getInputValue = jest.fn();
    const mockOnKeyDown = jest.fn();
    const { unmount } = render(
      <InputSearch
        isClearBtn={true}
        onKeyEnter={mockOnKeyDown}
        getValue={getInputValue}
        type="text"
        placeholder="Search"
        autoFocus={true}
      />
    );
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test-1';
    userEvent.type(input, testValue);
    unmount();
    expect(localStorage.getItem('inputValue')).toEqual(JSON.stringify(testValue));
  });

  it('get value in input from localStorage', () => {
    const getInputValue = jest.fn();
    const mockOnKeyDown = jest.fn();
    const { unmount } = render(
      <InputSearch
        isClearBtn={true}
        onKeyEnter={mockOnKeyDown}
        getValue={getInputValue}
        type="text"
        placeholder="Search"
        autoFocus={true}
      />
    );
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    unmount();
    render(
      <InputSearch
        isClearBtn={true}
        onKeyEnter={mockOnKeyDown}
        getValue={getInputValue}
        type="text"
        placeholder="Search"
        autoFocus={true}
      />
    );
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('input focus', () => {
    const getInputValue = jest.fn();
    const mockOnKeyDown = jest.fn();
    render(
      <InputSearch
        isClearBtn={true}
        onKeyEnter={mockOnKeyDown}
        getValue={getInputValue}
        type="text"
        placeholder="Search"
        autoFocus={true}
      />
    );
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveFocus();
  });

  it('function call', () => {
    const getInputValue = jest.fn();
    const mockOnKeyDown = jest.fn();
    render(
      <InputSearch
        isClearBtn={true}
        onKeyEnter={mockOnKeyDown}
        getValue={getInputValue}
        type="text"
        placeholder="Search"
        autoFocus={true}
      />
    );
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    expect(getInputValue).toBeCalledTimes(4);
  });

  it('hide clear btn', () => {
    const getInputValue = jest.fn();
    const mockOnKeyDown = jest.fn();
    render(
      <InputSearch
        isClearBtn={false}
        onKeyEnter={mockOnKeyDown}
        getValue={getInputValue}
        type="text"
        placeholder="Search"
        autoFocus={true}
      />
    );
    expect(screen.queryByTestId('clear-btn')).not.toBeInTheDocument();
  });

  it('renders clear button', () => {
    const getInputValue = jest.fn();
    const mockOnKeyDown = jest.fn();
    render(
      <InputSearch
        isClearBtn={true}
        onKeyEnter={mockOnKeyDown}
        getValue={getInputValue}
        type="text"
        placeholder="Search"
        autoFocus={true}
      />
    );
    expect(screen.queryByTestId('clear-btn')).toBeInTheDocument();
  });
});

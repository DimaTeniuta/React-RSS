import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('renders button', () => {
    const childrenTest = 'test';
    render(<Button>{childrenTest}</Button>);
    expect(screen.getByText(childrenTest)).toBeInTheDocument();
  });

  it('click', () => {
    const childrenTest = 'test';
    const fakeFunc = jest.fn();
    render(<Button onClick={fakeFunc}>{childrenTest}</Button>);
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    expect(fakeFunc).toHaveBeenCalled();
  });
});

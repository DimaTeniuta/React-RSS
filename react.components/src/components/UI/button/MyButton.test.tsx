import React from 'react';
import { render, screen } from '@testing-library/react';
import MyButton from './MyButton';
import userEvent from '@testing-library/user-event';

describe('MyButton', () => {
  it('renders button', () => {
    const childrenTest = 'test';
    render(<MyButton>{childrenTest}</MyButton>);
    expect(screen.getByText(childrenTest)).toBeInTheDocument();
  });

  it('click', () => {
    const childrenTest = 'test';
    const fakeFunc = jest.fn();
    render(<MyButton onClick={fakeFunc}>{childrenTest}</MyButton>);
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    expect(fakeFunc).toHaveBeenCalled();
  });
});

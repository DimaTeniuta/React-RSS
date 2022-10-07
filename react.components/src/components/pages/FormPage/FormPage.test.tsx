import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FormPage from './FormPage';
import userEvent from '@testing-library/user-event';
import { fakeFile } from 'data/mockData';
import { act } from 'react-dom/test-utils';

describe('FormPage', () => {
  it('renders FormPage', () => {
    render(<FormPage />);
    expect(screen.getByTestId('form-page')).toBeInTheDocument();
    expect(screen.getByTestId('forms')).toBeInTheDocument();
  });

  it('display card', async () => {
    global.URL.createObjectURL = jest.fn();
    render(<FormPage />);
    const nameInput = screen.getByTestId('inputName');
    const surnameInput = screen.getByTestId('inputSurname');
    const dateInput = screen.getByTestId('inputDate');
    const select = screen.getByTestId('select');
    const inputFile = screen.getByTestId('inputFile');
    const checkbox = screen.getByTestId('inputCheckbox');
    userEvent.type(nameInput, 'Test');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    userEvent.type(surnameInput, 'Test');
    userEvent.type(dateInput, '2020-01-01');
    userEvent.selectOptions(select, 'Belarus');
    await act(async () => {
      await waitFor(() => {
        userEvent.upload(inputFile, fakeFile);
      });
    });
    userEvent.click(checkbox);
    userEvent.click(btn);

    const cards = await screen.findAllByTestId('formCard');
    expect(cards.length).toBe(1);
  });
});
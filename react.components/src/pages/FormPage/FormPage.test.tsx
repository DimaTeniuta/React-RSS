import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fakeFile } from 'data/mockData';
import App from 'App';

describe('FormPage', () => {
  it('renders FormPage', () => {
    render(<App />);
    const form = screen.getByTestId('formLink');
    userEvent.click(form);
    expect(screen.getByTestId('formPage')).toBeInTheDocument();
    expect(screen.getByTestId('forms')).toBeInTheDocument();
  });

  it('display card', async () => {
    global.URL.createObjectURL = jest.fn();
    render(<App />);
    const form = screen.getByTestId('formLink');
    userEvent.click(form);
    const nameInput = screen.getByTestId('inputName');
    const surnameInput = screen.getByTestId('inputSurname');
    const dateInput = screen.getByTestId('inputDate');
    const select = screen.getByTestId('select');
    const inputFile = screen.getByTestId('inputFile');
    const checkbox = screen.getByTestId('inputCheckbox');
    expect(screen.getByText('Post')).toBeDisabled();
    userEvent.type(nameInput, 'Test');
    userEvent.type(surnameInput, 'Test');
    userEvent.type(dateInput, '2020-01-01');
    userEvent.selectOptions(select, 'Belarus');
    userEvent.click(checkbox);
    userEvent.click(screen.getByText('Post'));
    await waitFor(() => {
      userEvent.upload(inputFile, fakeFile);
      Object.defineProperty(inputFile, 'value', {
        value: [fakeFile],
      });
      const cards = screen.getByTestId('formCard');
      expect(cards).toBeInTheDocument();
    });
  });
});
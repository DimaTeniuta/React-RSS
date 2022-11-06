import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fakeFile } from 'data/mockData';
import { act } from 'react-dom/test-utils';
import App from 'App';

describe('Forms', () => {
  it('renders form', () => {
    render(<App />);
    const form = screen.getByTestId('formLink');
    userEvent.click(form);
    expect(screen.getByTestId('inputFile')).toBeInTheDocument();
    expect(screen.getByTestId('inputCheckbox')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });
});

describe('Forms validation', () => {
  it('validation inputName', async () => {
    render(<App />);
    const form = screen.getByTestId('formLink');
    userEvent.click(form);
    const nameInput = screen.getByTestId('inputName');
    userEvent.type(nameInput, 'Test1');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    await waitFor(() => {
      expect(
        screen.getByText('The text should contain only the letters a-z, A-Z')
      ).toBeInTheDocument();
    });
    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'Te');
    await waitFor(() => {
      const texts = screen.getAllByText('The text must be longer than 3 characters');
      expect(texts[0]).toBeInTheDocument();
    });
    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'Test');
    await waitFor(() => {
      expect(
        screen.queryByText('The text should contain only the letters a-z, A-Z')
      ).not.toBeInTheDocument();
    });
  });

  it('validation select', () => {
    render(<App />);
    const form = screen.getByTestId('formLink');
    userEvent.click(form);
    const nameInput = screen.getByTestId('inputName');
    userEvent.type(nameInput, 'Test');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    const select = screen.getByTestId('select');
    waitFor(() => {
      expect(screen.getByText('Chose country')).toBeInTheDocument();
    });
    userEvent.selectOptions(select, 'Belarus');
    expect(screen.queryByText('Chose country')).not.toBeInTheDocument();
  });

  it('validation inputFile', () => {
    render(<App />);
    const form = screen.getByTestId('formLink');
    userEvent.click(form);
    const nameInput = screen.getByTestId('inputName');
    userEvent.type(nameInput, 'Test');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    const inputFile = screen.getByTestId('inputFile');
    waitFor(async () => {
      expect(screen.getByText('Upload an image in JPG or PNG format')).toBeInTheDocument();
    });
    userEvent.upload(inputFile, fakeFile);
    expect(screen.queryByText('Upload an image in JPG or PNG format')).not.toBeInTheDocument();
  });

  it('validation inputCheckbox', () => {
    render(<App />);
    const form = screen.getByTestId('formLink');
    userEvent.click(form);
    const checkbox = screen.getByTestId('inputCheckbox');
    userEvent.click(checkbox);
    expect(screen.getByText('Post')).not.toBeDisabled();
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
    userEvent.click(checkbox);
    waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });
});

describe('test submit', () => {
  it('successful submit', async () => {
    render(<App />);
    const form = screen.getByTestId('formLink');
    userEvent.click(form);
    expect(screen.queryByTestId('readyFile')).not.toBeInTheDocument();
    await waitFor(() => {
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
      waitFor(() => {
        userEvent.upload(inputFile, fakeFile);
        Object.defineProperty(inputFile, 'value', {
          value: [fakeFile],
        });
      });
      waitFor(() => {
        expect(screen.getByTestId('readyFile')).toBeInTheDocument();
        expect(screen.getByText('Post')).not.toBeDisabled();
        userEvent.click(screen.getByText('Post'));
        expect(screen.getByText('Post')).toBeDisabled();
        expect(screen.getByTestId('finalText')).toBeInTheDocument();
        expect(screen.getByTestId('finalImg')).toBeInTheDocument();
      });
    });
  });

  it('toggle InputFile image', async () => {
    render(<App />);
    const form = screen.getByTestId('formLink');
    userEvent.click(form);
    const nameInput = screen.getByTestId('inputName');
    const inputFile = screen.getByTestId('inputFile');
    userEvent.type(nameInput, 'Test');
    expect(screen.queryByTestId('readyFile')).not.toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByText('Post'));
      expect(screen.queryByTestId('readyFile')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      userEvent.upload(inputFile, fakeFile);
      Object.defineProperty(inputFile, 'value', {
        value: [fakeFile],
      });
    });
    waitFor(() => {
      expect(screen.getByTestId('readyFile')).toBeInTheDocument();
    });
    await waitFor(() => {
      userEvent.upload(inputFile, []);
      Object.defineProperty(inputFile, 'value', {
        value: [],
      });
    });
    await waitFor(() => {
      expect(screen.queryByTestId('readyFile')).not.toBeInTheDocument();
    });
  });

  it('disabled button', async () => {
    render(<App />);
    const form = screen.getByTestId('formLink');
    userEvent.click(form);
    expect(screen.queryByTestId('readyFile')).not.toBeInTheDocument();
    const nameInput = screen.getByTestId('inputName');
    const surnameInput = screen.getByTestId('inputSurname');
    const dateInput = screen.getByTestId('inputDate');
    const select = screen.getByTestId('select');
    const inputFile = screen.getByTestId('inputFile');
    const checkbox = screen.getByTestId('inputCheckbox');
    userEvent.type(nameInput, 'Test');
    userEvent.type(surnameInput, 'Test');
    userEvent.type(dateInput, '2020-01-01');
    userEvent.selectOptions(select, 'Belarus');
    userEvent.click(checkbox);
    expect(screen.getByText('Post')).not.toBeDisabled();
    await waitFor(() => {
      userEvent.click(screen.getByText('Post'));
      expect(screen.getByText('Post')).toBeDisabled();
    });
    await waitFor(() => {
      userEvent.upload(inputFile, fakeFile);
      Object.defineProperty(inputFile, 'value', {
        value: [fakeFile],
      });
      expect(screen.getByText('Post')).not.toBeDisabled();
    });
    await waitFor(() => {
      expect(screen.getByText('Post')).not.toBeDisabled();
    });
  });

  it('not to be disabled button', async () => {
    render(<App />);
    const form = screen.getByTestId('formLink');
    userEvent.click(form);
    const nameInput = screen.getByTestId('inputName');
    const surnameInput = screen.getByTestId('inputSurname');
    const dateInput = screen.getByTestId('inputDate');
    const select = screen.getByTestId('select');
    const inputFile = screen.getByTestId('inputFile');
    const checkbox = screen.getByTestId('inputCheckbox');
    userEvent.type(nameInput, 'Test');
    userEvent.type(surnameInput, 'Test');
    userEvent.type(dateInput, '2020-01-01');
    userEvent.selectOptions(select, 'Belarus');
    userEvent.click(checkbox);
    await waitFor(() => {
      userEvent.click(screen.getByText('Post'));
    });
    await waitFor(() => {
      userEvent.upload(inputFile, fakeFile);
      Object.defineProperty(inputFile, 'value', {
        value: [fakeFile],
      });
    });
    expect(screen.getByText('Post')).not.toBeDisabled();
    const main = screen.getByTestId('mainLink');
    userEvent.click(main);
    await waitFor(() => {
      userEvent.click(form);
      expect(screen.getByText('Post')).not.toBeDisabled();
    });
    await waitFor(() => {
      userEvent.type(nameInput, 'Test1');
      expect(screen.getByText('Post')).toBeDisabled();
      expect(screen.getByTestId('readyFile')).toBeInTheDocument();
    });
  });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Forms from './Forms';
import userEvent from '@testing-library/user-event';

import { fakeFile } from 'data/mockData';
import { act } from 'react-dom/test-utils';

const mockGetData = jest.fn();

describe('Forms', () => {
  it('renders form', () => {
    render(<Forms addData={mockGetData} />);
    expect(screen.getByTestId('inputFile')).toBeInTheDocument();
    expect(screen.getByTestId('inputCheckbox')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });
});

describe('Forms validation', () => {
  it('validation inputName', async () => {
    render(<Forms addData={mockGetData} />);
    const nameInput = screen.getByTestId('inputName');
    userEvent.type(nameInput, 'Test1');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    waitFor(() => {
      expect(
        screen.getByText('The text should contain only the letters a-z, A-Z')
      ).toBeInTheDocument();
    });
    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'Te');
    waitFor(() => {
      const texts = screen.getAllByText('The text must be longer than 3 characters');
      expect(texts[0]).toBeInTheDocument();
    });
    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'Test1');
    expect(
      screen.queryByText('The text should contain only the letters a-z, A-Z')
    ).not.toBeInTheDocument();
  });

  it('validation inputDate', () => {
    render(<Forms addData={mockGetData} />);
    const dateInput = screen.getByTestId('inputDate');
    userEvent.type(dateInput, '20202-01-01');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    waitFor(() => {
      expect(screen.getByText('The date must be in the format: DD-MM-YYYY')).toBeInTheDocument();
    });
    userEvent.clear(dateInput);
    userEvent.type(dateInput, '2020-01-01');
    expect(
      screen.queryByText('The date must be in the format: DD-MM-YYYY')
    ).not.toBeInTheDocument();
  });

  it('validation select', () => {
    render(<Forms addData={mockGetData} />);
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
    render(<Forms addData={mockGetData} />);
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
    render(<Forms addData={mockGetData} />);
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
    render(<Forms addData={mockGetData} />);
    expect(screen.queryByTestId('readyFile')).not.toBeInTheDocument();
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
    await act(async () => {
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
      expect(screen.getByTestId('final-text')).toBeInTheDocument();
      expect(screen.getByTestId('final-img')).toBeInTheDocument();
      expect(mockGetData).toBeCalledTimes(1);
    });
  });

  it('disabled button', async () => {
    render(<Forms addData={mockGetData} />);
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
    await act(async () => {
      userEvent.click(screen.getByText('Post'));
    });
    expect(screen.getByText('Post')).toBeDisabled();
    await act(async () => {
      userEvent.upload(inputFile, fakeFile);
      Object.defineProperty(inputFile, 'value', {
        value: [fakeFile],
      });
    });
    waitFor(() => {
      expect(screen.getByText('Post')).not.toBeDisabled();
      userEvent.click(screen.getByText('Post'));
      expect(screen.getByText('Post')).toBeDisabled();
    });
  });

  it('toggle InputFile image', async () => {
    render(<Forms addData={mockGetData} />);
    const nameInput = screen.getByTestId('inputName');
    const inputFile = screen.getByTestId('inputFile');
    userEvent.type(nameInput, 'Test');
    expect(screen.queryByTestId('readyFile')).not.toBeInTheDocument();
    await act(async () => {
      userEvent.upload(inputFile, fakeFile);
      Object.defineProperty(inputFile, 'value', {
        value: [fakeFile],
      });
    });
    waitFor(() => {
      expect(screen.getByTestId('readyFile')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('readyFile')).not.toBeInTheDocument();
    await act(async () => {
      userEvent.upload(inputFile, []);
      Object.defineProperty(inputFile, 'value', {
        value: [],
      });
    });
    waitFor(() => {
      expect(screen.queryByTestId('readyFile')).not.toBeInTheDocument();
    });
  });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Forms from './Forms';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { fakeFile } from 'data/mockData';

const mockGetData = jest.fn();
const fakeFileWithWrongFormat = new File(['test'], 'test.pdf', { type: 'image/pdf' });

describe('Forms', () => {
  it('renders form', () => {
    render(<Forms addData={mockGetData} />);
    expect(screen.getByTestId('inputFile')).toBeInTheDocument();
    expect(screen.getByTestId('inputCheckbox')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });

  it('renders final text', async () => {
    render(<Forms addData={mockGetData} />);
    const nameInput = screen.getByTestId('inputName');
    const surnameInput = screen.getByTestId('inputSurname');
    const dateInput = screen.getByTestId('inputDate');
    const select = screen.getByTestId('select');
    const inputFile = screen.getByTestId('inputFile');
    const checkbox = screen.getByTestId('inputCheckbox');
    userEvent.type(nameInput, 'Test');
    const btn = screen.getByText('Post');
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
    const finalText = screen.getByTestId('final-text');
    const finalImg = screen.getByTestId('final-img');
    expect(finalText).toBeInTheDocument();
    expect(finalImg).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    userEvent.type(nameInput, 'Test');
    expect(finalText).not.toBeInTheDocument();
    expect(finalImg).not.toBeInTheDocument();
    expect(screen.queryByText('Done')).not.toBeInTheDocument();
  });
});

describe('Forms disabled button', () => {
  it('disabled btn before change inputs values', () => {
    render(<Forms addData={mockGetData} />);
    const btn = screen.getByText('Post');
    expect(btn).toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
  });

  it('disabled btn after change name value', () => {
    render(<Forms addData={mockGetData} />);
    const nameInput = screen.getByTestId('inputName');
    const btn = screen.getByText('Post');
    expect(btn).toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
    userEvent.type(nameInput, 'Test');
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
  });

  it('disabled btn after change surname value', () => {
    render(<Forms addData={mockGetData} />);
    const surnameInput = screen.getByTestId('inputSurname');
    const btn = screen.getByText('Post');
    expect(btn).toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
    userEvent.type(surnameInput, 'Test');
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
  });

  it('disabled btn after change inputDate value', () => {
    render(<Forms addData={mockGetData} />);
    const inputDate = screen.getByTestId('inputDate');
    const btn = screen.getByText('Post');
    expect(btn).toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
    userEvent.type(inputDate, '2020-01-01');
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
  });

  it('disabled btn after change select value', () => {
    render(<Forms addData={mockGetData} />);
    const select = screen.getByTestId('select');
    const btn = screen.getByText('Post');
    expect(btn).toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
    userEvent.selectOptions(select, 'Belarus');
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
  });

  it('disabled btn after change switches value', () => {
    render(<Forms addData={mockGetData} />);
    const inputSwitch = screen.getByTestId('switch');
    const btn = screen.getByText('Post');
    expect(btn).toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
    userEvent.click(inputSwitch);
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
  });

  it('disabled btn after change inputCheckbox value', () => {
    render(<Forms addData={mockGetData} />);
    const checkbox = screen.getByTestId('inputCheckbox');
    const btn = screen.getByText('Post');
    expect(btn).toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
    userEvent.click(checkbox);
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    expect(btn).toBeDisabled();
  });
});

describe('Forms validation', () => {
  it('validation inputName', () => {
    render(<Forms addData={mockGetData} />);
    const nameInput = screen.getByTestId('inputName');
    userEvent.type(nameInput, 'Test1');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    expect(
      screen.getByText('The name should contain only the letters a-z, A-Z')
    ).toBeInTheDocument();
    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'Te');
    expect(screen.getByText('The name must be longer than 3 characters')).toBeInTheDocument();
    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'Test');
    expect(screen.queryByText('The name must be longer than 3 characters')).not.toBeInTheDocument();
    expect(
      screen.queryByText('The name should contain only the letters a-z, A-Z')
    ).not.toBeInTheDocument();
  });

  it('validation inputSurname', () => {
    render(<Forms addData={mockGetData} />);
    const surnameInput = screen.getByTestId('inputSurname');
    userEvent.type(surnameInput, 'Test1');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    expect(
      screen.getByText('The name should contain only the letters a-z, A-Z')
    ).toBeInTheDocument();
    userEvent.clear(surnameInput);
    userEvent.type(surnameInput, 'Te');
    expect(screen.getByText('The surname must be longer than 3 characters')).toBeInTheDocument();
    userEvent.clear(surnameInput);
    userEvent.type(surnameInput, 'Test');
    expect(
      screen.queryByText('The surname must be longer than 3 characters')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('The name should contain only the letters a-z, A-Z')
    ).not.toBeInTheDocument();
  });

  it('validation inputDate', () => {
    render(<Forms addData={mockGetData} />);
    const dateInput = screen.getByTestId('inputDate');
    userEvent.type(dateInput, '20202-01-01');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    expect(screen.getByText('The date must be in the format: DD-MM-YYYY')).toBeInTheDocument();
    userEvent.clear(dateInput);
    userEvent.type(dateInput, '2020-01-01');
    expect(
      screen.queryByText('The date must be in the format: DD-MM-YYYY')
    ).not.toBeInTheDocument();
  });

  it('validation select', () => {
    render(<Forms addData={mockGetData} />);
    const nameInput = screen.getByTestId('inputName');
    userEvent.type(nameInput, 'Test1');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    const select = screen.getByTestId('select');
    expect(screen.getByText('Chose country')).toBeInTheDocument();
    userEvent.selectOptions(select, 'Belarus');
    expect(screen.queryByText('Chose country')).not.toBeInTheDocument();
  });

  it('validation inputFile', async () => {
    render(<Forms addData={mockGetData} />);
    const nameInput = screen.getByTestId('inputName');
    userEvent.type(nameInput, 'Test1');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    const inputFile = screen.getByTestId('inputFile');
    expect(screen.getByText('Upload an image in JPG or PNG format')).toBeInTheDocument();
    await act(async () => {
      await waitFor(() => {
        userEvent.upload(inputFile, fakeFileWithWrongFormat);
      });
    });
    expect(screen.getByText('The image must be in JPG or PNG format')).toBeInTheDocument();
    await act(async () => {
      await waitFor(() => {
        userEvent.upload(inputFile, fakeFile);
      });
    });
    expect(screen.queryByText('Upload an image in JPG or PNG format')).not.toBeInTheDocument();
    expect(screen.queryByText('The image must be in JPG or PNG format')).not.toBeInTheDocument();
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
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
});

describe('Forms after success validation', () => {
  it('isDisable button after success validation', async () => {
    render(<Forms addData={mockGetData} />);
    const nameInput = screen.getByTestId('inputName');
    const surnameInput = screen.getByTestId('inputSurname');
    const dateInput = screen.getByTestId('inputDate');
    const select = screen.getByTestId('select');
    const inputFile = screen.getByTestId('inputFile');
    const checkbox = screen.getByTestId('inputCheckbox');
    userEvent.type(nameInput, 'Test');
    const btn = screen.getByText('Post');
    expect(screen.queryByText('Post')).not.toBeDisabled();
    userEvent.click(btn);
    expect(screen.getByText('Post')).toBeDisabled();

    userEvent.type(surnameInput, 'Test');
    userEvent.type(dateInput, '2020-01-01');
    userEvent.selectOptions(select, 'Belarus');
    await act(async () => {
      await waitFor(() => {
        userEvent.upload(inputFile, fakeFile);
      });
    });
    userEvent.click(checkbox);
    expect(screen.queryByText('Post')).not.toBeDisabled();
  });

  it('send data', async () => {
    render(<Forms addData={mockGetData} />);
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
    expect(mockGetData).toBeCalledTimes(1);
  });
});

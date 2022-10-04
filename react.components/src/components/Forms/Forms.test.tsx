import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Forms from './Forms';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const mockGetData = jest.fn();
const fakeFile = new File(['test'], 'test.png', { type: 'image/png' });
const fakeFileWithWrongFormat = new File(['test'], 'test.pdf', { type: 'image/pdf' });

describe('Forms', () => {
  it('renders form', () => {
    render(<Forms getData={mockGetData} />);
    expect(screen.getByTestId('inputFile')).toBeInTheDocument();
    expect(screen.getByTestId('inputCheckbox')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });
});

describe('Forms disabled button', () => {
  it('disabled btn before change inputs values', () => {
    render(<Forms getData={mockGetData} />);
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    expect(screen.getByText('Post')).toBeDisabled();
  });

  it('isDisabled btn after change name value', () => {
    render(<Forms getData={mockGetData} />);
    const nameInput = screen.getByTestId('inputName');
    userEvent.type(nameInput, 'Test');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    expect(screen.getByText('Post')).toBeDisabled();
  });

  it('isDisabled btn after change surname value', () => {
    render(<Forms getData={mockGetData} />);
    const surnameInput = screen.getByTestId('inputSurname');
    userEvent.type(surnameInput, 'Test');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    expect(screen.getByText('Post')).toBeDisabled();
  });

  it('isDisabled btn after change inputDate value', () => {
    render(<Forms getData={mockGetData} />);
    const inputDate = screen.getByTestId('inputDate');
    userEvent.type(inputDate, '01.01.2022');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    expect(screen.getByText('Post')).toBeDisabled();
  });

  it('isDisabled btn after change select value', () => {
    render(<Forms getData={mockGetData} />);
    const select = screen.getByTestId('select');
    userEvent.selectOptions(select, 'Belarus');
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    expect(screen.getByText('Post')).toBeDisabled();
  });

  it('isDisabled btn after change inputFile value', async () => {
    render(<Forms getData={mockGetData} />);
    const inputFile = screen.getByTestId('inputFile');
    await act(async () => {
      await waitFor(() => {
        userEvent.upload(inputFile, fakeFile);
      });
    });
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    expect(screen.getByText('Post')).toBeDisabled();
  });

  it('isDisabled btn after change switches value', () => {
    render(<Forms getData={mockGetData} />);
    const inputSwitch = screen.getByTestId('switch');
    expect(screen.getByText('Post')).toBeDisabled();
    userEvent.click(inputSwitch);
    const btn = screen.getByText('Post');
    expect(screen.queryByText('Post')).not.toBeDisabled();
    userEvent.click(btn);
    expect(screen.getByText('Post')).toBeDisabled();
  });

  it('isDisabled btn after change inputCheckbox value', () => {
    render(<Forms getData={mockGetData} />);
    const checkbox = screen.getByTestId('inputCheckbox');
    userEvent.click(checkbox);
    expect(screen.getByText('Post')).not.toBeDisabled();
    const btn = screen.getByText('Post');
    userEvent.click(btn);
    expect(screen.getByText('Post')).toBeDisabled();
  });
});

describe('Forms validation', () => {
  it('validation inputName', () => {
    render(<Forms getData={mockGetData} />);
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
    render(<Forms getData={mockGetData} />);
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
    render(<Forms getData={mockGetData} />);
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
    render(<Forms getData={mockGetData} />);
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
    render(<Forms getData={mockGetData} />);
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
    render(<Forms getData={mockGetData} />);
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

describe('Forms after successful validation', () => {
  it('isDisable button after successful validation', async () => {
    render(<Forms getData={mockGetData} />);
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
    render(<Forms getData={mockGetData} />);
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

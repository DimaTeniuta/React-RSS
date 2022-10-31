import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import { fakeFile } from 'data/mockData';
import React from 'react';
import { FormData } from 'types/formTypes';
import FormCard from './FormCard';

const mockData: FormData = {
  name: 'Test',
  surname: 'Test2',
  birthday: '2000.01.01',
  country: 'test-country',
  genderMale: false,
  personalData: true,
  avatar: fakeFile,
};

const mockData2: FormData = {
  name: 'Test',
  surname: 'Test2',
  birthday: '2000.01.01',
  country: 'test-country',
  genderMale: true,
  personalData: true,
  avatar: fakeFile,
};

describe('FormCard', () => {
  it('renders formCard', () => {
    global.URL.createObjectURL = jest.fn();
    render(<FormCard data={mockData} />);
    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.surname)).toBeInTheDocument();
    expect(screen.getByText(mockData.birthday)).toBeInTheDocument();
  });

  it('renders current image', () => {
    global.URL.createObjectURL = jest.fn();
    const { unmount } = render(<FormCard data={mockData} />);
    expect(screen.getByTestId('test-male')).toBeInTheDocument();
    unmount();
    render(<FormCard data={mockData2} />);
    expect(screen.getByTestId('test-female')).toBeInTheDocument();
  });

  it('show card', async () => {
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
    await waitFor(() => {
      userEvent.click(screen.getByText('Post'));
    });
    await waitFor(() => {
      expect(screen.getByTestId('formCard')).toBeInTheDocument();
    });
  });
});

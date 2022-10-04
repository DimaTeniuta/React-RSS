import { render, screen } from '@testing-library/react';
import { fakeFile } from 'data/mockData';
import React from 'react';
import { FormData } from 'types/formTypes';
import { FormCard } from './FormCard';

const mockData: FormData = {
  name: 'Test',
  surname: 'Test2',
  birthday: '2000.01.01',
  country: 'test-country',
  gender: false,
  personalData: true,
  avatar: fakeFile,
};

const mockData2: FormData = {
  name: 'Test',
  surname: 'Test2',
  birthday: '2000.01.01',
  country: 'test-country',
  gender: true,
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
});

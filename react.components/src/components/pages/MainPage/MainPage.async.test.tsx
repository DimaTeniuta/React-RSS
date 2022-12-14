import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MainPage from './MainPage';
import userEvent from '@testing-library/user-event';
import Search from 'components/Search/Search';

jest.mock('axios');

const wrongResponse = Promise.resolve({
  data: {
    results: [],
  },
});

const errorResponse = Promise.reject();

export const mockCardsData = Promise.resolve({
  data: {
    results: [
      {
        id: '1',
        description: 'Test',
        likes: 286,
        urls: {
          full: 'https://hd.unsplash.com/photo-1416339306562-f3d12fefd36f',
          small:
            'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=263af33585f9d32af39d165b000845eb',
        },
      },
      {
        id: '2',
        description: 'Test2',
        likes: 23,
        urls: {
          full: 'https://hd.unsplash.com/photo-1416339306562-f3d12fefd36f',
          small:
            'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=263af33585f9d32af39d165b000845eb',
        },
      },
      {
        id: '3',
        description: 'Test3',
        likes: 12,
        urls: {
          full: 'https://hd.unsplash.com/photo-1416339306562-f3d12fefd36f',
          small:
            'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=263af33585f9d32af39d165b000845eb',
        },
      },
    ],
  },
});

describe('MainPage async', () => {
  it('show not found message', async () => {
    (axios as jest.Mocked<typeof axios>).get.mockReturnValue(wrongResponse);
    render(<MainPage />);
    expect(axios.get).toBeCalledTimes(1);
    expect(screen.getByTestId('modal-test')).toBeInTheDocument();
  });

  it('check catch case', async () => {
    (axios as jest.Mocked<typeof axios>).get.mockReturnValue(errorResponse);
    render(<MainPage />);
    const modalWindow = await screen.findByTestId('modal-test');
    const title = await screen.findByText(/Not Found/i);
    const content = await screen.findByText(/Try entering another query/i);
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(modalWindow).toBeInTheDocument();
  });

  it('show 3 cards', async () => {
    (axios as jest.Mocked<typeof axios>).get.mockReturnValue(mockCardsData);
    render(<MainPage />);
    const cards = await screen.findAllByTestId('test-card');
    const descriptionTest = await screen.findByText(/test2/i);
    expect(descriptionTest).toBeInTheDocument();
    expect(axios.get).toBeCalledTimes(1);
    expect(cards.length).toBe(3);
    expect(screen.queryByTestId('modal-test')).not.toBeInTheDocument();
    expect(screen.getByText(/23/)).toBeInTheDocument();
  });

  it('keypress Enter in input', () => {
    (axios as jest.Mocked<typeof axios>).get.mockReturnValue(mockCardsData);
    render(<MainPage />);
    const input = screen.getByPlaceholderText(/search/i);
    const testValue = 'test';
    userEvent.type(input, testValue);
    userEvent.keyboard('[Enter]');
    expect(axios.get).toBeCalledTimes(2);
  });

  it('onkeydown enter in input', () => {
    const mockFn = jest.fn();
    render(<Search getData={mockFn} />);
    userEvent.keyboard('[Enter]');
    setTimeout(() => {
      expect(mockFn).toHaveBeenCalled();
    }, 1000);
  });
});

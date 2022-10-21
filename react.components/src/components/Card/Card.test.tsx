import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPage from 'components/pages/MainPage/MainPage';
import React from 'react';
import Card from './Card';

const mockData = {
  id: '1',
  description: 'Test',
  likes: 286,
  urls: {
    full: 'https://hd.unsplash.com/photo-1416339306562-f3d12fefd36f',
    small:
      'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=263af33585f9d32af39d165b000845eb',
  },
};

const mockClick = jest.fn();

describe('Card', () => {
  it('Card renders', () => {
    render(<Card onClick={mockClick} data={mockData} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/more details/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.description)).toBeInTheDocument();
    expect(screen.queryByTestId('modalWindowWrap')).not.toBeInTheDocument();
  });

  it('Card snapshot', () => {
    const card = render(<Card onClick={mockClick} data={mockData} />);
    expect(card).toMatchSnapshot();
  });

  it('renders image in card', () => {
    render(<Card onClick={mockClick} data={mockData} />);
    expect(screen.getByAltText('card-image')).toBeInTheDocument();
  });

  it('render 30 cards', async () => {
    render(<MainPage />);
    const cards = await screen.findAllByTestId('test-card');
    expect(cards.length).toBe(30);
  });

  it('Cards snapshot', () => {
    const cards = render(<MainPage />);
    expect(cards).toMatchSnapshot();
  });

  it('show modal window', async () => {
    render(<MainPage />);
    const btn = await screen.findAllByText('More details');
    userEvent.click(btn[1]);
    expect(screen.getByTestId('modalWindowWrap')).toBeInTheDocument();
  });

  it('toggle modal window', async () => {
    render(<MainPage />);
    const btn = await screen.findAllByText('More details');
    userEvent.click(btn[1]);
    const overlay = screen.getByTestId('modalWindowWrap');
    expect(overlay).toBeInTheDocument();
    userEvent.click(screen.getByTestId('modalWindow'));
    expect(overlay).toBeInTheDocument();
    userEvent.click(overlay);
    expect(overlay).not.toBeInTheDocument();
  });
});

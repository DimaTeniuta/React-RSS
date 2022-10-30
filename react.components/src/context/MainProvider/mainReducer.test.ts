import { MainReducer } from 'types/mainProviderTypes';
import { reducerData, reducerFirstLoad, reducerPageValue, reducerCardValue } from './mainReducer';

const mockHttpData = {
  total: 1,
  total_pages: 10,
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
};

const mockPageValue = {
  searchValue: 'test',
  orientation: 'test',
  perPage: 'test',
  page: 1,
};

describe('mainReducer', () => {
  it('reducerData', async () => {
    expect(() =>
      reducerData(mockHttpData, {
        type: MainReducer.CARD_PAGE as MainReducer.DATA,
        payload: mockHttpData,
      })
    ).toThrow('wrong type');
  });

  it('reducerFirstLoad', async () => {
    expect(() =>
      reducerFirstLoad(true, {
        type: MainReducer.CARD_PAGE as MainReducer.FIRST_LOAD,
        payload: true,
      })
    ).toThrow('wrong type');
  });

  it('reducerPageValue', async () => {
    expect(() =>
      reducerPageValue(mockPageValue, {
        type: MainReducer.CARD_PAGE as MainReducer.PAGE_VALUE,
        payload: mockPageValue,
      })
    ).toThrow('wrong type');
  });

  it('reducerCardValue', async () => {
    expect(() =>
      reducerCardValue(mockHttpData.results[0], {
        type: MainReducer.PAGE_VALUE as MainReducer.CARD_PAGE,
        payload: mockHttpData.results[1],
      })
    ).toThrow('wrong type');
  });
});

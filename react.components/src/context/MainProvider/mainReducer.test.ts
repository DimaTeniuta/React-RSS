import { fakeFile } from 'data/mockData';
import { MainReducer } from 'types/mainProviderTypes';
import { reducer } from './mainReducer';

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

const mockFormData = [
  {
    name: 'Test',
    surname: 'Test',
    birthday: '2022-01-01',
    country: 'Russia',
    avatar: fakeFile,
    personalData: true,
    genderMale: true,
  },
];

const mockPageValue = {
  searchValue: 'test',
  orientation: 'test',
  perPage: 'test',
  page: 1,
};

const mockObj = {
  formData: mockFormData,
  file: fakeFile,
  data: mockHttpData,
  firstLoad: true,
  pageValue: mockPageValue,
  cardValue: mockHttpData.results[0],
};

describe('mainReducer', () => {
  it('reducer', async () => {
    expect(() =>
      reducer(mockObj, {
        type: 'test' as MainReducer.DATA,
        payload: mockHttpData,
      })
    ).toThrow('wrong type');
  });
});

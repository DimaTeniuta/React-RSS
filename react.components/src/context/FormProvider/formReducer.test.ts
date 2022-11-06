import { fakeFile } from 'data/mockData';
import { FormReducer } from 'types/formProviderTypes';
import { reducerForm } from './formReducer';

const mockFormData = {
  name: 'Test',
  surname: 'Test',
  birthday: '2022-01-01',
  country: 'Russia',
  avatar: fakeFile,
  personalData: true,
  genderMale: true,
};

const mockObj = {
  data: [mockFormData],
  file: fakeFile,
};

describe('mainReducer', () => {
  it('reducerFormData', async () => {
    expect(() =>
      reducerForm(mockObj, {
        type: 'test' as FormReducer.DATA,
        payload: mockFormData,
      })
    ).toThrow('wrong type');
  });
});

import { waitFor } from '@testing-library/react';
import { fakeFile } from 'data/mockData';
import { FormReducer } from 'types/formProviderTypes';
import { reducerFormData, reducerFormFile } from './formReducer';

const mockFormData = {
  name: 'Test',
  surname: 'Test',
  birthday: '2022-01-01',
  country: 'Russia',
  avatar: fakeFile,
  personalData: true,
  genderMale: true,
};

describe('mainReducer', () => {
  it('reducerFormData', async () => {
    await waitFor(() => {
      expect(() =>
        reducerFormData([], {
          type: FormReducer.FILE as FormReducer.DATA,
          payload: mockFormData,
        })
      ).toThrow('wrong type');
    });
  });

  it('reducerFormFile', async () => {
    await waitFor(() => {
      expect(() =>
        reducerFormFile(fakeFile, {
          type: FormReducer.DATA as FormReducer.FILE,
          payload: fakeFile,
        })
      ).toThrow('wrong type');
    });
  });
});

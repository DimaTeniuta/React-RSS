import React, { createContext, FC, ReactNode, useReducer } from 'react';
import { ActionFormData, ActionFormFile } from 'types/formProviderTypes';
import { FormData } from 'types/formTypes';
import { reducerFormData, reducerFormFile } from './formReducer';

interface FormContextType {
  file: File;
  data: FormData[];
  dispatchFormFile: React.Dispatch<ActionFormFile>;
  dispatchFormData: React.Dispatch<ActionFormData>;
}

type FormProviderProps = {
  children: ReactNode;
};

export const defaultFileName = 'defaultName';

export const initialFormFile = new File(['start'], `${defaultFileName}.png`, { type: 'image/png' });
const initialFormData: FormData[] = [];

export const FormContext = createContext<FormContextType>({
  file: initialFormFile,
  data: [],
  dispatchFormFile: () => null,
  dispatchFormData: () => null,
});

export const FormProvider: FC<FormProviderProps> = ({ children }): JSX.Element => {
  const [data, dispatchFormData] = useReducer(reducerFormData, initialFormData);
  const [file, dispatchFormFile] = useReducer(reducerFormFile, initialFormFile);

  return (
    <FormContext.Provider value={{ data, file, dispatchFormFile, dispatchFormData }}>
      {children}
    </FormContext.Provider>
  );
};

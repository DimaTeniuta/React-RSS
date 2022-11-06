import React, { createContext, FC, ReactNode, useReducer } from 'react';
import { ActionForm } from 'types/formProviderTypes';
import { FormData } from 'types/formTypes';
import { FormState, reducerForm } from './formReducer';

interface FormContextType {
  formState: FormState;
  dispatchForm: React.Dispatch<ActionForm>;
}

type FormProviderProps = {
  children: ReactNode;
};

export const defaultFileName = 'defaultName';

export const initialFormFile = new File(['start'], `${defaultFileName}.png`, { type: 'image/png' });
const initialFormData: FormData[] = [];

const initialForm = {
  data: initialFormData,
  file: initialFormFile,
};

export const FormContext = createContext<FormContextType>({
  formState: initialForm,
  dispatchForm: () => null,
});

export const FormProvider: FC<FormProviderProps> = ({ children }): JSX.Element => {
  const [formState, dispatchForm] = useReducer(reducerForm, initialForm);

  return (
    <FormContext.Provider value={{ formState, dispatchForm }}>{children}</FormContext.Provider>
  );
};

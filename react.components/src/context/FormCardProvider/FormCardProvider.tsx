import React, { FC, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface FormsProviderProps {
  children: ReactNode;
}

export const FormCardProvider: FC<FormsProviderProps> = ({ children }): JSX.Element => {
  const method = useForm();

  return <FormProvider {...method}>{children}</FormProvider>;
};

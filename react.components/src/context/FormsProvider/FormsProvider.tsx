import React, { FC, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface FormsProviderProps {
  children: ReactNode;
}

export const FormsProvider: FC<FormsProviderProps> = ({ children }) => {
  const method = useForm();
  return <FormProvider {...method}>{children}</FormProvider>;
};

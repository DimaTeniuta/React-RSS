import React, { FC, ReactNode } from 'react';
import { FormProvider } from './FormProvider/FormProvider';
import { FormsProvider } from './FormsProvider/FormsProvider';
import MainProvider from './MainProvider/MainProvider';

type ProviderProps = {
  children: ReactNode;
};

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <MainProvider>
      <FormProvider>
        <FormsProvider>{children}</FormsProvider>
      </FormProvider>
    </MainProvider>
  );
};

export default Provider;

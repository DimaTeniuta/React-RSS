import React, { FC, ReactNode } from 'react';
import { FormCardProvider } from './FormCardProvider/FormCardProvider';
import MainProvider from './MainProvider/MainProvider';

type ProviderProps = {
  children: ReactNode;
};

const Provider: FC<ProviderProps> = ({ children }): JSX.Element => {
  return (
    <MainProvider>
      <FormCardProvider>{children}</FormCardProvider>
    </MainProvider>
  );
};

export default Provider;

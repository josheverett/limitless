'use client';

import React from 'react';
import { useAppContext } from '@/hooks/use-app-context';

type ContextProps = {
  children: React.ReactNode;
};

export const Context = ({ children }: ContextProps) => {
  const { AppContext, ...values } = useAppContext();

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

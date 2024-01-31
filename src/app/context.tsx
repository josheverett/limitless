'use client';

import React, { useState, createContext } from 'react';

export type AppContextProps = {
  force4k: boolean;
  setForce4k: (force4k: boolean) => void
};

export const AppContext = createContext<AppContextProps>({
  force4k: false,
  setForce4k: (_: boolean) => {},
});

type AppContextProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [force4k, setForce4k] = useState(false);
  const value: AppContextProps = { force4k, setForce4k };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

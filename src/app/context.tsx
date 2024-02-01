'use client';

import React, { useState, useEffect, createContext } from 'react';

export type AppContextProps = {
  force4k: boolean;
  setForce4k: (force4k: boolean) => void
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void
};

export const AppContext = createContext<AppContextProps>({
  force4k: false,
  setForce4k: (_: boolean) => {},
  fullscreen: false,
  setFullscreen: (_: boolean) => {},
});

type AppContextProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [force4k, setForce4k] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const value: AppContextProps = {
    force4k,
    setForce4k,
    fullscreen,
    setFullscreen,
  };

  useEffect(() => {
    document.body.classList.toggle('force4k', force4k);
  }, [force4k]);


  useEffect(() => {
    if (fullscreen) {
      document.body.requestFullscreen();
    }

    if (!fullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [fullscreen]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

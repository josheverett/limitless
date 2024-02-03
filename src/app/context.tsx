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
    if (fullscreen) {
      document.body.requestFullscreen();
    }

    if (!fullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [fullscreen]);

  // This is here to handle the user manually exiting fullscreen.
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setFullscreen(false);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

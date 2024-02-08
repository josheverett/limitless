'use client';

import React, { useState, useEffect, createContext } from 'react';
import { useLocalStorage } from '@/hooks/use-localstorage';

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

const LOCAL_STORAGE_KEY_4K = 'limiteless-force4k';

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [force4k, setForce4k] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const storage = useLocalStorage();

  const value: AppContextProps = {
    force4k,
    setForce4k: (enable: boolean) => {
      storage.setItem(LOCAL_STORAGE_KEY_4K, String(enable));
      return setForce4k(enable);
    },
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

  useEffect(() => {
    const savedForce4k = storage.getItem(LOCAL_STORAGE_KEY_4K);
    if (savedForce4k === 'true') setForce4k(true);
  }, [storage]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

'use client';

import React, { useState, useEffect, createContext } from 'react';
import moment, { Moment } from 'moment';
import { useLocalStorage } from '@/hooks/use-localstorage';

export type AppContextProps = {
  countdown: Moment;
  force4k: boolean;
  setForce4k: (force4k: boolean) => void;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
};

// This fixed future date is used as the default date on first render,
// to avoid SSR mismatch errors.
const A_FISHFUL_OF_DOLLARS = moment('3000-01-01T00:00:00-05:00');

export const AppContext = createContext<AppContextProps>({
  countdown: A_FISHFUL_OF_DOLLARS,
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
  const [countdown, setCountdown] = useState(A_FISHFUL_OF_DOLLARS);
  const storage = useLocalStorage();


  const value: AppContextProps = {
    countdown,
    force4k,
    setForce4k: (enable: boolean) => {
      storage.setItem(LOCAL_STORAGE_KEY_4K, String(enable));
      return setForce4k(enable);
    },
    fullscreen,
    setFullscreen,
  };

  // Dates are random per app load, so they need to be set client side to
  // avoid SSR mismatch errors.
  useEffect(() => {
    // It is intentional that the below values are shared between daily
    // and weekly. The countdowns should always match up except for days.
    // The ranges ("x to y") are just to make for better looking numbers. :P

    // Days from now. 3 to 5. Only applies to weekly.
    const randomDay = Math.floor(Math.random() * 3) + 3;
    // Hours from now. 6 to 18.
    const randomHour = Math.floor(Math.random() * 13) + 6;
    // Minutes from now. 15 to 45.
    const randomMinute = Math.floor(Math.random() * 31) + 15;

    const countdown_ = moment()
      .add(randomDay, 'days')
      .hour(randomHour)
      .minute(randomMinute);

    setCountdown(countdown_);
  }, []);

  // We manage decrementing the countdown here so all the countdown timers
  // throughout the app stay synced up.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prev) => prev.clone().subtract(1, 'seconds'));
    }, 1000);
    return () => clearInterval(intervalId);
  });

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
